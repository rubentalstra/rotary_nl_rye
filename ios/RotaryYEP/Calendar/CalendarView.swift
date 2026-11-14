import RotaryCalendar
import SwiftUI

/// The MDJC calendar: what is happening now and what is coming, as a list or
/// as a month with the event days marked; each event opens its details.
struct CalendarView: View {
    enum Mode: Hashable {
        case list
        case month
    }

    @State private var model = CalendarModel()
    @State private var mode: Mode = .list

    var body: some View {
        content
            .navigationTitle(Text("Agenda"))
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Link(destination: CalendarFeed.subscriptionURL) {
                        Label("Abonneer in Agenda", systemImage: "calendar.badge.plus")
                    }
                    .help(Text("Abonneer in Agenda"))
                }
            }
            .safeAreaBar(edge: .top) {
                Picker(selection: $mode) {
                    Label("Lijst", systemImage: "list.bullet").tag(Mode.list)
                    Label("Maand", systemImage: "calendar").tag(Mode.month)
                } label: {
                    Text("Weergave")
                }
                .pickerStyle(.segmented)
                .padding(.horizontal)
            }
            .navigationDestination(for: CalendarEvent.self) { event in
                EventDetailView(event: event)
            }
            .task {
                model.startLoading()
            }
    }

    @ViewBuilder private var content: some View {
        switch model.state {
        case .loading where model.events.isEmpty:
            ProgressView("Agenda laden…")
                .frame(maxWidth: .infinity, maxHeight: .infinity)
        case .failed(let error):
            ContentUnavailableView {
                Label(error == .offline ? "Geen verbinding" : "Agenda niet beschikbaar", systemImage: error == .offline ? "wifi.slash" : "exclamationmark.triangle")
            } description: {
                Text(error == .offline ? "Maak verbinding met internet om de agenda te laden." : "De agenda kon niet worden geladen. Probeer het later opnieuw.")
            } actions: {
                Button("Probeer opnieuw") {
                    Task { await model.load() }
                }
                .buttonStyle(.borderedProminent)
            }
        default:
            switch mode {
            case .list: EventList(model: model)
            case .month: MonthCalendar(model: model)
            }
        }
    }
}

/// What is happening now, then what is coming per month; past events behind
/// a button.
private struct EventList: View {
    @Bindable var model: CalendarModel

    var body: some View {
        List {
            if !model.ongoing.isEmpty {
                Section("Nu bezig") {
                    ForEach(model.ongoing) { event in
                        NavigationLink(value: event) {
                            EventRow(event: event, isOngoing: true)
                        }
                    }
                }
            }
            ForEach(model.months) { month in
                Section {
                    ForEach(month.events) { event in
                        NavigationLink(value: event) {
                            EventRow(event: event, isOngoing: false)
                        }
                    }
                } header: {
                    if let date = Calendar.current.date(from: month.id) {
                        Text(date, format: .dateTime.month(.wide).year())
                    }
                }
            }
            if !model.showsPastEvents, model.pastEventCount > 0 {
                Section {
                    Button {
                        withAnimation {
                            model.showsPastEvents = true
                        }
                    } label: {
                        Label("Toon \(model.pastEventCount) afgelopen evenementen", systemImage: "clock.arrow.circlepath")
                    }
                }
            }
        }
        .overlay {
            if model.ongoing.isEmpty, model.months.isEmpty, model.pastEventCount == 0 {
                ContentUnavailableView("Geen evenementen", systemImage: "calendar", description: Text("Er staan geen evenementen in de agenda."))
            }
        }
        .refreshable {
            await model.load()
        }
    }
}

/// A month with the event days marked, and the picked day's events below it.
private struct MonthCalendar: View {
    @Bindable var model: CalendarModel

    var body: some View {
        List {
            Section {
                EventMonthView(eventDays: model.eventDays, selectedDay: $model.selectedDay)
                    .frame(minHeight: 380)
            }
            if model.selectedDay != nil {
                Section {
                    if model.selectedDayEvents.isEmpty {
                        Text("Geen evenementen op deze dag.")
                            .foregroundStyle(.secondary)
                    }
                    ForEach(model.selectedDayEvents) { event in
                        NavigationLink(value: event) {
                            EventRow(event: event, isOngoing: false)
                        }
                    }
                } header: {
                    if let day = model.selectedDay, let date = Calendar.current.date(from: day) {
                        Text(date, format: .dateTime.weekday(.wide).day().month(.wide))
                    }
                }
            }
        }
        .refreshable {
            await model.load()
        }
    }
}

#Preview {
    NavigationStack {
        CalendarView()
    }
}
