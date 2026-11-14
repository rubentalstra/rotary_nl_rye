import RotaryCamps
import SwiftUI

/// The summer camps and tours abroad: searchable, filtered from the toolbar,
/// in sections per month, each opening its details and invitation.
struct CampsView: View {
    @State private var model = CampsModel()

    var body: some View {
        content
            .navigationTitle(Text("Zomerkampen"))
            .searchable(text: $model.query, prompt: Text("Kamp of land"))
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    CampFilterMenu(model: model)
                }
            }
            .navigationDestination(for: Camp.self) { camp in
                CampDetailView(camp: camp)
            }
            .task {
                model.startLoading()
            }
    }

    @ViewBuilder private var content: some View {
        switch model.state {
        case .loading where model.camps.isEmpty:
            ProgressView("Kampen laden…")
                .frame(maxWidth: .infinity, maxHeight: .infinity)
        case .failed(let error):
            CampsUnavailableView(error: error) {
                Task { await model.load() }
            }
        default:
            CampList(model: model)
        }
    }
}

/// The camps in sections per month, or in one list when ordered by price.
private struct CampList: View {
    let model: CampsModel

    var body: some View {
        List {
            if model.order == .date {
                ForEach(model.months) { month in
                    Section {
                        ForEach(month.camps) { camp in
                            NavigationLink(value: camp) {
                                CampRow(camp: camp)
                            }
                        }
                    } header: {
                        MonthHeader(month: month.id)
                    }
                }
            } else {
                ForEach(model.visibleCamps) { camp in
                    NavigationLink(value: camp) {
                        CampRow(camp: camp)
                    }
                }
            }
            if !model.showsPastCamps, model.pastCampCount > 0 {
                Section {
                    Button {
                        withAnimation {
                            model.showsPastCamps = true
                        }
                    } label: {
                        Label("Toon \(model.pastCampCount) afgelopen kampen", systemImage: "clock.arrow.circlepath")
                    }
                }
            }
        }
        .overlay {
            if model.visibleCamps.isEmpty, model.showsPastCamps || model.pastCampCount == 0 {
                if !model.query.isEmpty {
                    ContentUnavailableView.search(text: model.query)
                } else {
                    ContentUnavailableView {
                        Label("Geen kampen", systemImage: "tent")
                    } description: {
                        Text("Geen kamp past bij je filters.")
                    } actions: {
                        Button("Wis filters") {
                            model.clearFilters()
                        }
                    }
                }
            }
        }
        .refreshable {
            await model.load()
        }
        .animation(.default, value: model.visibleCamps)
    }
}

/// "Juli 2026" above the camps that start that month.
private struct MonthHeader: View {
    let month: DateComponents

    var body: some View {
        if let date = Calendar.current.date(from: month) {
            Text(date, format: .dateTime.month(.wide).year())
        }
    }
}

/// Why the camps could not be shown, and a way to try again.
private struct CampsUnavailableView: View {
    let error: CampFeed.LoadError
    let retry: () -> Void

    var body: some View {
        ContentUnavailableView {
            Label(error == .offline ? "Geen verbinding" : "Kampen niet beschikbaar", systemImage: error == .offline ? "wifi.slash" : "exclamationmark.triangle")
        } description: {
            Text(error == .offline ? "Maak verbinding met internet om de zomerkampen te laden." : "De lijst met zomerkampen kon niet worden gelezen. Probeer het later opnieuw.")
        } actions: {
            Button("Probeer opnieuw", action: retry)
                .buttonStyle(.borderedProminent)
        }
    }
}

#Preview {
    NavigationStack {
        CampsView()
    }
}
