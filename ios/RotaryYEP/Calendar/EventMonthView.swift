import SwiftUI
import UIKit

/// The system's month calendar (UICalendarView): a dot under every day with
/// an event, and the picked day bound to `selectedDay`.
struct EventMonthView: UIViewRepresentable {
    let eventDays: Set<DateComponents>
    @Binding var selectedDay: DateComponents?

    func makeUIView(context: Context) -> UICalendarView {
        let view = UICalendarView()
        view.calendar = .current
        view.locale = .current
        view.fontDesign = .rounded
        view.delegate = context.coordinator
        let selection = UICalendarSelectionSingleDate(delegate: context.coordinator)
        selection.selectedDate = selectedDay
        view.selectionBehavior = selection
        view.setContentCompressionResistancePriority(.defaultLow, for: .horizontal)
        return view
    }

    func updateUIView(_ view: UICalendarView, context: Context) {
        let changed = context.coordinator.eventDays != eventDays
        context.coordinator.eventDays = eventDays
        context.coordinator.selection = $selectedDay
        if changed {
            view.reloadDecorations(forDateComponents: Array(eventDays), animated: true)
        }
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(eventDays: eventDays, selection: $selectedDay)
    }

    final class Coordinator: NSObject, UICalendarViewDelegate, UICalendarSelectionSingleDateDelegate {
        var eventDays: Set<DateComponents>
        var selection: Binding<DateComponents?>

        init(eventDays: Set<DateComponents>, selection: Binding<DateComponents?>) {
            self.eventDays = eventDays
            self.selection = selection
        }

        func calendarView(_ calendarView: UICalendarView, decorationFor dateComponents: DateComponents) -> UICalendarView.Decoration? {
            let day = DateComponents(year: dateComponents.year, month: dateComponents.month, day: dateComponents.day)
            return eventDays.contains(day) ? .default(color: .tintColor, size: .medium) : nil
        }

        func dateSelection(_ selection: UICalendarSelectionSingleDate, didSelectDate dateComponents: DateComponents?) {
            self.selection.wrappedValue = dateComponents.map { DateComponents(year: $0.year, month: $0.month, day: $0.day) }
        }
    }
}
