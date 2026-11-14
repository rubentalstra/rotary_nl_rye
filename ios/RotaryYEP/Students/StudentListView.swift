import RotaryStudents
import SwiftUI

/// Students in sections per country (or per exchange year, from the toolbar),
/// searchable by name or country; each opens their page.
struct StudentListView: View {
    let title: LocalizedStringResource
    let footer: LocalizedStringResource?
    @State private var model: StudentListModel

    init(title: LocalizedStringResource, students: [ExchangeStudent], footer: LocalizedStringResource? = nil) {
        self.title = title
        self.footer = footer
        self.model = StudentListModel(students: students)
    }

    var body: some View {
        List {
            ForEach(model.sections) { section in
                Section {
                    ForEach(section.students) { student in
                        NavigationLink(value: student) {
                            StudentRow(student: student, detail: rowDetail)
                        }
                    }
                } header: {
                    SectionHeader(id: section.id, count: section.students.count)
                }
            }
            if let footer, model.query.isEmpty {
                Section {
                } footer: {
                    Text(footer)
                }
            }
        }
        .navigationTitle(Text(title))
        .searchable(text: $model.query, prompt: Text("Naam of land"))
        .overlay {
            if model.sections.isEmpty, !model.query.isEmpty {
                ContentUnavailableView.search(text: model.query)
            }
        }
        .toolbar {
            if model.spansYears {
                ToolbarItem(placement: .topBarTrailing) {
                    Menu {
                        Picker(selection: $model.grouping) {
                            Label("Per land", systemImage: "globe").tag(StudentListModel.Grouping.country)
                            Label("Per uitwisselingsjaar", systemImage: "calendar").tag(StudentListModel.Grouping.year)
                        } label: {
                            Text("Groeperen")
                        }
                    } label: {
                        Label("Groeperen", systemImage: "line.3.horizontal.decrease")
                    }
                }
            }
        }
    }

    private var rowDetail: StudentRow.Detail {
        switch model.grouping {
        case .country: model.spansYears ? .year : .bio
        case .year: .country
        }
    }
}

/// A section's flag and country, or its exchange year, with how many
/// students it holds.
private struct SectionHeader: View {
    let id: StudentListModel.StudentSection.ID
    let count: Int

    var body: some View {
        HStack {
            switch id {
            case .country(let destination):
                Text(verbatim: "\(destination.flag)  \(destination.name)")
            case .year(let year):
                Text(verbatim: year.description)
            }
            Spacer()
            Text(count, format: .number)
                .monospacedDigit()
        }
    }
}
