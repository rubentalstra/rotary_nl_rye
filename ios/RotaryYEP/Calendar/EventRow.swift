import RotaryCalendar
import SwiftUI

/// An event in a list: its date badge, the title, when and where.
struct EventRow: View {
    let event: CalendarEvent
    let isOngoing: Bool

    var body: some View {
        HStack(spacing: 14) {
            DateBadge(event: event)
            VStack(alignment: .leading, spacing: 3) {
                HStack(spacing: 8) {
                    EventTitle(event: event)
                        .font(.headline)
                    if isOngoing {
                        Text("Nu")
                            .font(.caption.weight(.semibold))
                            .padding(.horizontal, 8)
                            .padding(.vertical, 2)
                            .foregroundStyle(.white)
                            .background(.green, in: .capsule)
                    }
                }
                Label {
                    EventWhen(event: event, style: .short)
                } icon: {
                    Image(systemName: event.isAllDay ? "calendar" : "clock")
                        .foregroundStyle(.tint)
                }
                .font(.subheadline.weight(.medium))
                if let location = event.location {
                    Label {
                        Text(verbatim: location)
                    } icon: {
                        Image(systemName: "mappin.and.ellipse")
                    }
                    .font(.footnote)
                    .foregroundStyle(.secondary)
                }
            }
            .labelStyle(.titleAndIcon)
            .imageScale(.small)
        }
        .padding(.vertical, 4)
    }
}

/// The event's title, or "Evenement" when it has none.
struct EventTitle: View {
    let event: CalendarEvent

    var body: some View {
        if let title = event.title {
            Text(verbatim: title)
        } else {
            Text("Evenement")
        }
    }
}

/// The first day as a small calendar page: the month on top, the day large.
struct DateBadge: View {
    let event: CalendarEvent
    var size: CGFloat = 52
    /// On the page's background (a header) the badge gets a card colour;
    /// in a list row it gets the row's secondary colour.
    var isOnPage = false

    var body: some View {
        if let start = event.start() {
            VStack(spacing: 0) {
                Text(start, format: .dateTime.month(.abbreviated))
                    .font(.caption2.weight(.bold))
                    .textCase(.uppercase)
                    .foregroundStyle(.white)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 2)
                    .background(.tint)
                Text(start, format: .dateTime.day())
                    .font(.system(size: size * 0.42, weight: .semibold, design: .rounded))
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            }
            .frame(width: size, height: size)
            .background(isOnPage ? AnyShapeStyle(Color(.secondarySystemGroupedBackground)) : AnyShapeStyle(.background.secondary))
            .clipShape(.rect(cornerRadius: size * 0.22))
            .accessibilityHidden(true)
        }
    }
}

/// When an event is: "13 – 15 nov" or "12 dec" for days, "10:00 – 14:00" for times.
struct EventWhen: View {
    enum Style {
        case short
        case long
    }

    let event: CalendarEvent
    let style: Style

    var body: some View {
        switch event.timing {
        case .allDay(let first, let last):
            if let start = Calendar.current.date(from: first), let end = Calendar.current.date(from: last) {
                if first == last {
                    style == .short ? Text("Hele dag") : Text(start, format: .dateTime.weekday(.wide).day().month(.wide).year())
                } else {
                    Text("\(start, format: dayFormat) – \(end, format: dayFormat)", comment: "An event's first and last day, such as 13 Nov – 15 Nov.")
                }
            }
        case .timed(let start, let end):
            Text("\(start, format: .dateTime.hour().minute()) – \(end, format: .dateTime.hour().minute())", comment: "An event's start and end time, such as 10:00 – 14:00.")
        }
    }

    private var dayFormat: Date.FormatStyle {
        style == .short ? .dateTime.day().month(.abbreviated) : .dateTime.weekday(.abbreviated).day().month(.wide)
    }
}
