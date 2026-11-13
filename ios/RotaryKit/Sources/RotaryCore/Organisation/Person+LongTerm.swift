import Foundation

/// The Long Term Exchange team. A person in more than one team is defined in the
/// first team they belong to and referenced by the others (`ContactGroup.members`).
extension Person {
    static let toonTerEllen = Person(
        name: PersonNameComponents(givenName: "Toon", familyName: "ter Ellen"),
        roles: [.outboundCoordinator],
        phone: "+31613602987",
        email: "longtermout@rotaryyep.nl",
        photoURL: URL(string: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/organization/long-term/toon-ter-ellen.jpg"),
        bio: "Mijn naam is Toon ter Ellen, coördinator outbound van het Rotary Longterm Exchange Program.\n\nZelf ben ik in 2016-2017 een jaar op exchange geweest. Toen heb ik een jaar in Brazilië gewoond, de beste ervaring van mijn leven. Deze ervaring heeft me er ook toe gedreven me te blijven inzetten voor de Rotary Youth Exchange.\n\nIn het dagelijks leven ben ik fiscalist, houd ik van reizen, koken en sporten.\n\nVoor mijn tijd bij de MDJC ben ik vier jaar lid en bestuur geweest van Rotex, de vereniging van oud-uitwisselingsstudenten.\n\nDit programma is een geweldig en voor iedereen die de kans krijgt heb ik maar één advies: doen!"
    )

    static let sandraCoolsWemer = Person(
        name: PersonNameComponents(givenName: "Sandra", familyName: "Cools-Wemer"),
        roles: [.inboundCoordinator],
        phone: "+31625530062",
        email: "longtermin@rotaryyep.nl",
        club: "Rotaryclub Lingewaard-Bemmel",
        district: "1550",
        photoURL: URL(string: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/organization/sandra-cools-wemer.jpeg"),
        bio: "Ik ben Sandra Cools, woonachtig in Haalderen met mijn man. Altijd als dierenarts gewerkt, maar in 2024 vervroegd uitgetreden. Vandaar deze nieuwe uitdaging als inboundcoördinator.\n\nIk ben sinds de oprichting van onze club in 2004 al Rotarian, en sindsdien ook ClubJeugdCommissaris. Via samenwerking met 7 andere clubs in onze omgeving hebben wij als kleine club altijd het hele jeugdprogramma kunnen continueren. Vandaar dat ik ook in aanraking ben gekomen met de long term exchange. Mijn zoon Jesse is een jaar in Australië geweest en mijn dochter Maaike een jaar naar Italië, en dat heeft ze veel gebracht. Wij hebben ondertussen twee exchange dames uit Paraguay en één uit Frankrijk gehad, en in 25-26 hebben we Camilla uit Indonesië in huis gehad. Tevens hebben we via NGE en de vroegere GSE veel jonge studenten 2-3 weken lang thuis mogen ontvangen.\n\nIk hou van tennissen, scubadiving, trailrunning en wandelen. Reizen en gezellig samenzijn met vrienden staan ook vaak op de agenda."
    )

    static let jitteWigbold = Person(
        name: PersonNameComponents(givenName: "Jitte", familyName: "Wigbold"),
        roles: [.inboundCoordinator],
        phone: "+31627908753",
        photoURL: URL(string: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/organization/jitte-wigbold.jpg")
    )

    static let jetBebseler = Person(
        name: PersonNameComponents(givenName: "Jet", familyName: "Bebseler"),
        roles: [.inboundCoordinator],
        phone: "+31640638088",
        photoURL: URL(string: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/organization/jet-bebseler.jpg")
    )

    static let benMureau = Person(
        name: PersonNameComponents(givenName: "Ben", familyName: "Mureau"),
        roles: [.administratorLongTerm],
        phone: "+31651911244",
        email: "longtermadmin@rotaryyep.nl",
        club: "RC Oldenzaal",
        district: "1560 OOST-NEDERLAND",
        photoURL: URL(string: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/organization/long-term/ben-mureau.jpg"),
        bio: "Mijn naam is Ben Mureau en ik verzorg sinds enkele jaren de visa voor de inbounds en de verzekeringen voor de in- en outbounds."
    )

    static let bettyRijkmansSiemens = Person(
        name: PersonNameComponents(givenName: "Betty", familyName: "Rijkmans-Siemens"),
        roles: [.coordinatorOrientationCourse, .coordinatorSummerCampsAbroad],
        phone: "+31629523379",
        email: "doc@rotaryyep.nl",
        club: "Rotaryclub Meppel",
        district: "1590 NOORD-NEDERLAND",
        photoURL: URL(string: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/organization/long-term/betty-rijkmans-siemen.jpeg"),
        bio: "Jarenlang was ik docent voortgezet onderwijs en werkte altijd met veel plezier met middelbare scholieren."
    )

    static let basSiebring = Person(
        name: PersonNameComponents(givenName: "Bas", familyName: "Siebring"),
        roles: [.coordinatorOrientationCourse],
        phone: "+31618022550",
        email: "doc@rotaryyep.nl",
        photoURL: URL(string: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/organization/long-term/bas-siebring.jpeg"),
        bio: "Mijn naam is Bas Siebring. In het dagelijks leven ben ik docent scheikunde."
    )

    static let hillekeVanDerVeer = Person(
        name: PersonNameComponents(givenName: "Hilleke", familyName: "van der Veer"),
        roles: [.nationalCounselor],
        phone: "+31638300427",
        email: "hillekevdveer@gmail.com",
        photoURL: URL(string: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/organization/long-term/hilleke-van-der-veer-2.jpg"),
        bio: "Mijn naam is Hilleke van der Veer en ik ben de landelijke counselor van de inbounds."
    )

    static let christianVanDam = Person(
        name: PersonNameComponents(givenName: "Christian", familyName: "van Dam"),
        roles: [.nationalCounselor],
        phone: "+31620956610",
        email: "c.vandam@outlook.com",
        photoURL: URL(string: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/organization/christian-van-dam.jpg")
    )

    static let rubenTalstra = Person(
        name: PersonNameComponents(givenName: "Ruben", familyName: "Talstra"),
        roles: [.webAppMaster],
        phone: "+31611212774",
        email: "RubenTalstra1211@outlook.com",
        photoURL: URL(string: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/organization/long-term/ruben-talstra.jpg"),
        bio: "Mijn naam is Ruben Talstra en ik ben de web-app master van de long term exchange."
    )
}
