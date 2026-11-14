import RotaryStudents
import SwiftUI

/// Where a student is in their exchange year, as a coloured capsule with a
/// symbol: on its way, on exchange, or back (a rebound).
struct StatusBadge: View {
    let student: ExchangeStudent
    let status: ExchangeStatus

    init(student: ExchangeStudent, on date: Date = .now) {
        self.student = student
        self.status = student.status(on: date)
    }

    var body: some View {
        Label {
            Text(title)
        } icon: {
            Image(systemName: systemImage)
        }
        .font(.subheadline.weight(.semibold))
        .foregroundStyle(color)
        .padding(.horizontal, 12)
        .padding(.vertical, 6)
        .background(color.opacity(0.14), in: .capsule)
    }

    private var title: LocalizedStringResource {
        switch (student.direction, status) {
        case (.outbound, .upcoming): LocalizedStringResource("Vertrekt binnenkort", comment: "Student status: an outbound whose exchange year abroad has not begun.")
        case (.outbound, .onExchange): LocalizedStringResource("Nu op exchange", comment: "Student status: an outbound abroad now.")
        case (.outbound, .returned): LocalizedStringResource("Rebound", comment: "Student status: an outbound back from their exchange.")
        case (.inbound, .upcoming): LocalizedStringResource("Komt binnenkort", comment: "Student status: an inbound whose exchange year in the Netherlands has not begun.")
        case (.inbound, .onExchange): LocalizedStringResource("In Nederland", comment: "Student status: an inbound in the Netherlands now.")
        case (.inbound, .returned): LocalizedStringResource("Weer thuis", comment: "Student status: an inbound who has gone home after their year.")
        }
    }

    private var systemImage: String {
        switch status {
        case .upcoming: "clock"
        case .onExchange: student.direction == .outbound ? "airplane" : "house"
        case .returned: "arrow.uturn.backward.circle"
        }
    }

    private var color: Color {
        switch status {
        case .upcoming: .orange
        case .onExchange: .green
        case .returned: .blue
        }
    }
}
