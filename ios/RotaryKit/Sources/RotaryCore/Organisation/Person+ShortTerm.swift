import Foundation

/// The Short Term Exchange team. A person in more than one team is defined in the
/// first team they belong to and referenced by the others (`ContactGroup.members`).
extension Person {
    static let janVanAller = Person(
        name: PersonNameComponents(givenName: "Jan", familyName: "van Aller"),
        roles: [.coordinatorFamilyToFamily],
        phone: "+31630005630",
        email: "gjvanaller@gmail.com",
        club: "RC Haarlem-Centrum",
        district: "1580 NOORD-HOLLAND",
        photoURL: URL(string: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/organization/short-term/jan-van-aller.jpg"),
        bio: "Ik ben Jan van Aller, assistent bij het Short Term Exchange Programma.\n\nIn 2021 verscheen een landelijke oproep om de gelederen van het RYEX-werk te komen versterken."
    )

    static let willemijnVanWaes = Person(
        name: PersonNameComponents(givenName: "Willemijn", familyName: "van Waes"),
        roles: [.coordinatorFamilyToFamily],
        email: "F2F@rotaryyep.nl",
        photoURL: URL(string: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/organization/short-term/willemijn-van-waes.jpeg")
    )

    static let marjaHofland = Person(
        name: PersonNameComponents(givenName: "Marja", familyName: "Hofland"),
        roles: [.inboundCoordinatorSummerCamps],
        phone: "+31610902939",
        email: "campsandtours@rotaryyep.nl",
        photoURL: URL(string: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/organization/marja-hofland.jpg")
    )
}
