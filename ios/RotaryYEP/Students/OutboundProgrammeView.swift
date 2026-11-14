import RotaryCore
import RotaryStudents
import SwiftUI

/// One programme for outbounds: its photos, this year's class for the year
/// exchange, the v13 pages on it, and the facts and costs on the programme's
/// own page; for the summer camps also this year's camps.
struct OutboundProgrammeView: View {
    let programme: ExchangeProgramme
    private let currentClass: StudentClass?

    init(programme: ExchangeProgramme) {
        self.programme = programme
        currentClass = programme == .longTerm
            ? ExchangeStudent.years(.outbound).first.map { StudentClass(direction: .outbound, year: $0) }
            : nil
    }

    var body: some View {
        List {
            if !programme.photos.isEmpty {
                Section {
                    PhotoGallery(photos: programme.photos)
                        .listRowInsets(EdgeInsets())
                    Text(programme.tagline)
                        .font(.title3.weight(.semibold))
                        .padding(.vertical, 4)
                }
            }
            if let currentClass {
                Section("Studenten") {
                    NavigationLink(value: currentClass) {
                        ClassRow(studentClass: currentClass)
                    }
                }
            }
            Section("Wat je moet weten") {
                ForEach(OutboundGuide.guides(for: programme)) { guide in
                    NavigationLink(value: guide) {
                        GuideRow(guide: guide)
                    }
                }
            }
            Section {
                NavigationLink(value: programme) {
                    Label("Leeftijd, kosten en bestemmingen", systemImage: "list.bullet.rectangle")
                }
                if programme == .summerCamps {
                    NavigationLink(value: HomeDestination.summerCamps) {
                        Label("Bekijk de zomerkampen", systemImage: "tent")
                    }
                }
            }
        }
        .navigationTitle(Text(programme.title))
    }
}

#Preview {
    NavigationStack {
        OutboundProgrammeView(programme: .longTerm)
    }
}
