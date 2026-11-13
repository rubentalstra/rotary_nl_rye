import Foundation

/// The independent confidants: not part of Rotary and not in the Contact tab,
/// so they are defined here with the emergency group they belong to.
extension Person {
    static let paulineMemelink = Person(
        name: PersonNameComponents(givenName: "Pauline", familyName: "Memelink"),
        roles: [.lawyer],
        phone: "+31624235624",
        email: "p.memelink@t-mobilethuis.nl"
    )

    static let reinoutVriesendorp = Person(
        name: PersonNameComponents(givenName: "Reinout", familyName: "Vriesendorp"),
        roles: [.doctorsOffice],
        phone: "+31182612676",
        email: "info@medischcentrumwest.org"
    )
}
