import RotaryStudents
import SwiftUI

/// For students coming to the Netherlands: this year's class and the pages
/// on welcome, flight, language, insurance and travel. The earlier classes
/// are the toolbar's button.
struct InboundView: View {
    private let currentClass = ExchangeStudent.years(.inbound).first.map { StudentClass(direction: .inbound, year: $0) }

    var body: some View {
        List {
            if let currentClass {
                Section("Studenten") {
                    NavigationLink(value: currentClass) {
                        ClassRow(studentClass: currentClass)
                    }
                }
            }
            Section("Wat je moet weten") {
                ForEach(InboundGuide.allCases) { guide in
                    NavigationLink(value: guide) {
                        GuideRow(guide: guide)
                    }
                }
            }
        }
        .navigationTitle(Text("Naar Nederland"))
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                NavigationLink(value: StudentsPage.earlierInbounds) {
                    Label("Eerdere klassen", systemImage: "clock.arrow.circlepath")
                }
                .help(Text("Eerdere klassen"))
            }
        }
    }
}

#Preview {
    NavigationStack {
        InboundView()
    }
}
