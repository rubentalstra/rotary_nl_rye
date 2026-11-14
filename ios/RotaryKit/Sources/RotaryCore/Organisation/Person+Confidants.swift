import Foundation

/// The independent confidants: not part of Rotary and not in the Contact tab,
/// so they are defined here with the emergency group they belong to.
extension Person {
    static let paulineMemelink = Person(
        name: PersonNameComponents(givenName: "Pauline", familyName: "Memelink"),
        roles: [.lawyer],
        phone: "06 24 23 56 24",
        email: "p.memelink@t-mobilethuis.nl"
    )

    static let reinoutVriesendorp = Person(
        name: PersonNameComponents(givenName: "Reinout", familyName: "Vriesendorp"),
        roles: [.doctorsOffice],
        phone: "0182 61 26 76",
        email: "info@medischcentrumwest.org"
    )
}
