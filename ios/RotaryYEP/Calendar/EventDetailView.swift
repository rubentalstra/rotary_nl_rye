import EventKit
import EventKitUI
import RotaryCalendar
import SwiftUI

/// Everything about one event: when, where (with a way to Maps), and a way to
/// put it in the person's own calendar. Online meeting links are left out on
/// purpose: people do not join meetings from this app.
struct EventDetailView: View {
    let event: CalendarEvent
    @State private var addsToCalendar = false

    var body: some View {
        List {
            Section {
                EventHeader(event: event)
                    .listRowBackground(Color.clear)
            }
            Section("Wanneer") {
                LabeledContent {
                    EventWhen(event: event, style: .long)
                        .multilineTextAlignment(.trailing)
                } label: {
                    Label(event.isAllDay ? "Datum" : "Tijd", systemImage: event.isAllDay ? "calendar" : "clock")
                }
                if case .timed(let start, _) = event.timing {
                    LabeledContent {
                        Text(start, format: .dateTime.weekday(.wide).day().month(.wide).year())
                    } label: {
                        Label("Datum", systemImage: "calendar")
                    }
                }
                if event.isAllDay, event.dayCount() > 1 {
                    LabeledContent {
                        Text(event.dayCount(), format: .number)
                    } label: {
                        Label("Dagen", systemImage: "sun.max")
                    }
                }
            }
            if let location = event.location {
                Section("Waar") {
                    LabeledContent {
                        Text(verbatim: location)
                    } label: {
                        Label("Locatie", systemImage: "mappin.and.ellipse")
                    }
                    if let maps = mapsURL(for: location) {
                        Link(destination: maps) {
                            Label("Open in Kaarten", systemImage: "map")
                        }
                    }
                }
            }
            if let notes = event.notes {
                Section("Over dit evenement") {
                    EventNotes(text: notes)
                }
            }
            Section {
                Button {
                    addsToCalendar = true
                } label: {
                    Label("Zet in mijn agenda", systemImage: "calendar.badge.plus")
                }
            }
        }
        .navigationTitle(Text("Evenement"))
        .navigationBarTitleDisplayMode(.inline)
        .sheet(isPresented: $addsToCalendar) {
            AddToCalendarSheet(event: event)
                .ignoresSafeArea()
        }
    }

    /// Apple Maps searching for the location.
    private func mapsURL(for location: String) -> URL? {
        var components = URLComponents(string: "https://maps.apple.com/")
        components?.queryItems = [URLQueryItem(name: "q", value: location)]
        return components?.url
    }
}

/// The date badge large, the title, and whether it is happening now.
private struct EventHeader: View {
    let event: CalendarEvent

    var body: some View {
        VStack(spacing: 12) {
            DateBadge(event: event, size: 84, isOnPage: true)
            EventTitle(event: event)
                .font(.title2.bold())
                .multilineTextAlignment(.center)
            EventWhen(event: event, style: .short)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity)
    }
}

/// An event's description: plain text, or the little HTML Google keeps in
/// it, read with the system's HTML import.
private struct EventNotes: View {
    let text: String

    var body: some View {
        Text(attributed)
            .textSelection(.enabled)
    }

    private var attributed: AttributedString {
        guard text.contains("<"),
              let data = text.data(using: .utf8),
              let html = try? NSAttributedString(data: data, options: [.documentType: NSAttributedString.DocumentType.html, .characterEncoding: String.Encoding.utf8.rawValue], documentAttributes: nil)
        else { return AttributedString(text) }
        var plain = AttributedString(html.string.trimmingCharacters(in: .whitespacesAndNewlines))
        plain.font = .body
        return plain
    }
}

/// The system's sheet for adding an event to one of the person's calendars.
/// Since iOS 17 it runs outside the app, so the app needs no calendar access.
private struct AddToCalendarSheet: UIViewControllerRepresentable {
    let event: CalendarEvent
    @Environment(\.dismiss) private var dismiss

    func makeUIViewController(context: Context) -> EKEventEditViewController {
        let store = EKEventStore()
        let draft = EKEvent(eventStore: store)
        draft.title = event.title
        draft.location = event.location
        draft.isAllDay = event.isAllDay
        draft.startDate = event.start()
        // An all-day event ends on its last day in EventKit.
        draft.endDate = event.isAllDay ? event.end().flatMap { Calendar.current.date(byAdding: .second, value: -1, to: $0) } : event.end()
        let controller = EKEventEditViewController()
        controller.eventStore = store
        controller.event = draft
        controller.editViewDelegate = context.coordinator
        return controller
    }

    func updateUIViewController(_ controller: EKEventEditViewController, context: Context) {}

    func makeCoordinator() -> Coordinator {
        Coordinator(dismiss: dismiss)
    }

    final class Coordinator: NSObject, EKEventEditViewDelegate {
        let dismiss: DismissAction

        init(dismiss: DismissAction) {
            self.dismiss = dismiss
        }

        func eventEditViewController(_ controller: EKEventEditViewController, didCompleteWith action: EKEventEditViewAction) {
            dismiss()
        }
    }
}
