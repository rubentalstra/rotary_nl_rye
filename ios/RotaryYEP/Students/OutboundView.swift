import RotaryCore
import RotaryStudents
import SwiftUI

/// For Dutch students going abroad: this year's class first, then the three
/// programmes, each opening a page with everything about going on it.
struct OutboundView: View {
    private let currentClass = ExchangeStudent.years(.outbound).first.map { StudentClass(direction: .outbound, year: $0) }

    var body: some View {
        List {
            if let currentClass {
                Section("Studenten") {
                    NavigationLink(value: currentClass) {
                        ClassRow(studentClass: currentClass)
                    }
                }
            }
            Section("Programma's") {
                ForEach(ExchangeProgramme.allCases) { programme in
                    NavigationLink(value: StudentsPage.outbound(programme)) {
                        ProgrammeRow(programme: programme)
                    }
                }
            }
        }
        .navigationTitle(Text("Op exchange"))
    }
}

#Preview {
    NavigationStack {
        OutboundView()
    }
}
