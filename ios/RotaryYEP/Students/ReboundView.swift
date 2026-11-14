import RotaryStudents
import SwiftUI

/// The rebounds: outbounds back from their exchange year, per country they
/// went to or per year, searchable.
struct ReboundView: View {
    var body: some View {
        StudentListView(
            title: LocalizedStringResource("Rebound", comment: "Rebound: the screen's title."),
            students: ExchangeStudent.rebounds(on: .now),
            footer: LocalizedStringResource("Rebounds zijn outbounds die terug zijn van hun uitwisselingsjaar.", comment: "Rebound: what a rebound is, under the list.")
        )
    }
}

#Preview {
    NavigationStack {
        ReboundView()
    }
}
