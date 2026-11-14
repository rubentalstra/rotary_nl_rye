import RotaryCamps
import SwiftUI

/// The filters and order of the camps, in one toolbar menu as Mail and Files
/// keep theirs: the symbol fills while a filter is on.
struct CampFilterMenu: View {
    @Bindable var model: CampsModel

    var body: some View {
        Menu {
            Picker(selection: $model.order) {
                Label("Datum", systemImage: "calendar").tag(CampsModel.Order.date)
                Label("Prijs", systemImage: "eurosign").tag(CampsModel.Order.price)
            } label: {
                Label("Sorteer op", systemImage: "arrow.up.arrow.down")
            }
            .pickerStyle(.menu)

            Section {
                if let ages = model.availableAges {
                    Picker(selection: $model.age) {
                        Text("Elke leeftijd").tag(Int?.none)
                        ForEach(Array(ages), id: \.self) { age in
                            Text("\(age) jaar").tag(Int?.some(age))
                        }
                    } label: {
                        Label("Mijn leeftijd", systemImage: "person")
                    }
                    .pickerStyle(.menu)
                }
                Menu {
                    Button("Alle landen") {
                        model.countries = []
                    }
                    ForEach(model.availableCountries, id: \.self) { country in
                        Toggle(isOn: $model[country: country]) {
                            Text(verbatim: "\(country.flag) \(country.name)")
                        }
                    }
                } label: {
                    Label("Landen", systemImage: "globe.europe.africa")
                }
            }

            Section {
                Toggle(isOn: $model.hidesFullCamps) {
                    Label("Verberg volle kampen", systemImage: "person.crop.circle.badge.xmark")
                }
                Toggle(isOn: $model.showsPastCamps) {
                    Label("Toon afgelopen kampen", systemImage: "clock.arrow.circlepath")
                }
            }

            if model.isFiltered {
                Button(role: .destructive) {
                    model.clearFilters()
                } label: {
                    Label("Wis filters", systemImage: "xmark.circle")
                }
            }
        } label: {
            Label("Filter", systemImage: model.isFiltered ? "line.3.horizontal.decrease.circle.fill" : "line.3.horizontal.decrease.circle")
        }
    }
}
