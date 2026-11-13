import Foundation

/// The members of the MDJC, the Multi-District Youth Committee. A person in more than one team is defined in the
/// first team they belong to and referenced by the others (`ContactGroup.members`).
extension Person {
    static let barbaraTusveld = Person(
        name: PersonNameComponents(givenName: "Barbara", familyName: "Tusveld"),
        roles: [.chairYouthExchange],
        phone: "+31655128529",
        email: "chair@rotaryyep.nl",
        club: "RC Lelystad",
        district: "1590 NOORD-NEDERLAND",
        photoURL: URL(string: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/organization/long-term/barbara-tusveld.jpg"),
        bio: "Als voorzitter van de Rotary Youth Exchange Nederlands ben ik enorm trots dat we met ons team elk jaar 30-40 longterm studenten, 10-15 Shorterm exchangers en veel scholieren die onze buitenlandse kampen bezoeken en onze Summercamps die georganiseerd worden door Nederlandse Rotary clubs voor buitenlandse scholieren.\n\nHet is een \"lifetime in a year\" en een geweldige mooie ervaring. Zelf ben ik op exchange geweest in Amerika, al weer een \"tijdje\" geleden. Nog steeds ga ik jaarlijks naar mijn stadje terug. Het is een tweede thuis.\n\nOnze kinderen zijn beiden op uitwisseling geweest en ook zijn we bonusouder van veel buitenlandse scholieren geweest waar we een hele fijne band mee hebben opgebouwd.\n\nAl ruim 10 jaar ben ik betrokken bij dit mooie programma en geniet van ons team en wat we voor een grote groep scholieren kunnen betekenen."
    )

    static let clasineScheepers = Person(
        name: PersonNameComponents(givenName: "Clasine", familyName: "Scheepers"),
        roles: [.secretaryMDJC],
        phone: "+31652710977",
        email: "secretary@rotaryyep.nl",
        club: "RC Huizen",
        district: "1570 MIDDEN-NEDERLAND",
        photoURL: URL(string: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/organization/long-term/clasine-schepers.png"),
        bio: "Sinds 2017 ben ik lid van team Longterm. Ongelofelijk leuk om Nederlandse jongeren te begeleiden in hun avontuur voor jaaruitwisseling en om buitenlandse jongeren vervolgens hier in Nederland te ontvangen die een jaar lang worden ondergedompeld in hagelslag, stroopwafels en (het aller moeilijkst) de Nederlandse taal. Zo gaaf om dit elke keer met ons team te organiseren en te regelen. Begin 2021 ben ik secretaris MDJC – weer een nieuwe avontuur.\n\nIn mijn familie zijn er velen inmiddels op exchange geweest waaronder mijn man en dochter. Een van de gastgezinnen uit Amerika bezoeken we nog jaarlijks. Je krijgt er echt een nieuwe familie bij. Zelf hebben we nu drie keer een exchange student in huis gehad. Dan merk je van dichtbij waar ze tegenaan lopen in een nieuwe omgeving, andere cultuur en met een vreemde taal. Fijn om hen te helpen hun weg te vinden, een verrijking van je eigen leven."
    )

    static let evertMarseille = Person(
        name: PersonNameComponents(givenName: "Evert", familyName: "Marseille"),
        roles: [.treasurer],
        email: "finance@rotaryyep.nl",
        club: "RC Lelystad",
        district: "1590 Noord Nederland",
        photoURL: URL(string: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/organization/evert-marseille.jpg"),
        bio: "Sinds 1988 ben ik Rotary lid en ondanks mijn gevorderde leeftijd ben ik in juni 2023 door mijn clubgenoot Barbara gevraagd om penningmeester te worden. Bestuurlijk bezig zijn is mij met de paplepel ingegoten, dus ik vind het een hele eer om als oudje bezig te kunnen zijn met de ontwikkeling van jonge mensen die door een uitwisseling levenservaring kunnen opdoen.\n\nIn mijn actieve beroepsperiode was ik accountant en heb ik ook nog 20 jaar deel uitgemaakt van de Lelystadse gemeenteraad.\n\nIk ben gehuwd en heb 3 kinderen en 6 kleinkinderen. Wij hebben zelf ook veel mooie reizen gemaakt en daarmee ervaren hoe belangrijk het is om te zien hoe het leven in geheel andere landen is.\nHelaas is dit door de ziekte van mijn echtgenote niet meer mogelijk. Alle reden voor mij om mij naast mijn taak als mantelzorger ook op bestuurlijk gebied in te zetten."
    )

    static let margaOosterveld = Person(
        name: PersonNameComponents(givenName: "Marga", familyName: "Oosterveld"),
        roles: [.chairLongTerm, .coordinatorAmericasAsiaEurope],
        phone: "+31629586813",
        email: "marga_bart@yahoo.com",
        club: "Rotary Club Oosterwolde",
        district: "1590 NOORD-NEDERLAND",
        photoURL: URL(string: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/organization/long-term/marga-oosterveld.jpg"),
        bio: "Hallo, ik ben een oud uitwisselingsstudent of exchangee zoals dat heet. In het jaar 1988 - 1989 ben ik met Rotary een jaar naar het buitenland geweest. \"Class of 89\" noemen ze dat in Amerika. Eigenlijk wilde ik graag naar het noordoosten, maar ik kwam terecht in het zuidwesten van de USA. Totaal anders dan Nederland met indianen en cowboys, midden in de woestijn en in de bergen. Het is niet altijd makkelijk en soms best wel even slikken, maar als je dat lukt, heb je de tijd van je leven. Nu ben ik contactpersoon tussen de districten in de USA, Canada en Zuid Afrika om Rotary Clubs te vinden die willen uitwisselen met Nederland voor a lifetime in a year !!"
    )

    static let ernstZiengs = Person(
        name: PersonNameComponents(givenName: "Ernst", familyName: "Ziengs"),
        roles: [.districtYouthCommissioner(district: 1550)],
        phone: "+31653985449",
        email: "ernstziengs@icloud.com",
        club: "RC Weert-Land van Horne",
        district: "1550",
        photoURL: URL(string: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/organization/long-term/ernst-ziengs.jpeg"),
        bio: "Mijn naam is Ernst Ziengs. 53 jaar oud en woon in Weert samen met mijn vrouw Ellen en onze zonen Tijn (16) en Vigo. Ben ongeveer 10 jaar lid van Rotary Weert-Land van Horne. Daar ook voorzitter geweest en via Rotary en rechtstreeks doe ik veel vrijwilligerswerk. Zes jaar geleden heb ik wat tegenslag gehad met mijn gezondheid. Gevolg is dat ik opnieuw moest leren spreken, lopen en veel dingen opnieuw moest leren doen. In dit \"terug komen\" ben ik enorm geholpen door mijn gezin, vrienden en familie. Bij al die hulpvaardige mensen horen ook zeker mensen van de Rotary.\n\nIn mijn wil terug te komen in het leven speelt jeugd een voorname rol. Ik werk 2 dagen per week bij Fontys in Eindhoven. Jonge mensen iets proberen over te dragen kennis en vaardigheden houdt mijzelf ook jong en actief in deze tijd. Precies mijn ambitie als DJC van district 1550."
    )

    static let stevenStolp = Person(
        name: PersonNameComponents(givenName: "Steven", familyName: "Stolp"),
        roles: [.districtYouthCommissioner(district: 1560), .activitiesInbounds],
        phone: "+310630569469",
        email: "djc@rotary-d1560.nl",
        club: "RC Bennekom",
        district: "1560 OOST-NEDERLAND",
        photoURL: URL(string: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/organization/long-term/steven-stolp.png"),
        bio: "Als scholier had ik geen flauw benul van het bestaan van uitwisselingen. In mijn studententijd heb ik dat ingehaald door mijn eigen exchanges te organiseren, (korter) werken en later studeren in (zuid) Frankrijk en vervolgens langer naar Ouagadougou in Burkina Faso, West-Afrika. Buiten de Nederlandse context ontwikkel je je net wat anders. Dat gun ik iedereen, en de wereld.\n\nIn het dagelijks leven werk ik in de gezondheidszorg als bedrijfskundige in verschillende rollen. De \"net iets andere blik\" komt daar van pas. Daarnaast sport ik graag en volgens sommigen veel, het liefst met gezinsleden of vrienden.\n\nIn mijn vrije tijd wil ik vooral met plezier aan leuke dingen bijdragen. Daarom ben ik van \"de activiteiten\". Met het team van de long term exchange, Rotex (oud exchangestudenten) en de uitwisselingsstudenten ondernemen we samen van alles. Daarbij hebben we lol en leren we elke dag weer van alles van elkaar."
    )

    static let ernaVanDijk = Person(
        name: PersonNameComponents(givenName: "Erna", familyName: "van Dijk"),
        roles: [.districtYouthCommissioner(district: 1570)],
        phone: "+31612300695",
        email: "djc@rotary-d1570.nl",
        club: "Scherpenzeel- Woudenberg",
        district: "1570",
        photoURL: URL(string: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/organization/long-term/erna-van-dijk.jpg"),
        bio: "Ik ben Erna van Dijk. Sinds 2013 ben ik lid van de Rotary en sinds 1 juli 2023 District Jeugd Commissaris van D1570. In 1987-88 heb ik zelf meegedaan aan een uitwisselingsprogramma en heb ik een jaar in El Paso, Texas gewoond. Ik heb dit als een hele waardevolle periode ervaren en wil graag mijn steentje bijdragen om jongeren ook een fantastische buitenland ervaring te laten hebben.\n\nIn het dagelijks leven ben ik werkzaam als bedrijfsarts. Ik woon samen met mijn vriend, mijn zoon en zijn zoon en 2 dochters. Een samengesteld gezin dus.\n\nRotary is mijn grootste hobby, maar daarnaast ben ik ook lid van toastmasters. Verder vul ik mijn vrije tijd met tuinieren, wandelen, dansen en mijn kippen, katten en hond."
    )

    static let marioMeeuwse = Person(
        name: PersonNameComponents(givenName: "Mario", familyName: "Meeuwse"),
        roles: [.districtYouthCommissioner(district: 1580)],
        phone: "+31629541915",
        email: "mario.meeuwse@rabobank.nl",
        club: "RC Haarlemmermeer",
        district: "1580",
        photoURL: URL(string: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/organization/mario-meeuwse.jpg"),
        bio: "Mijn naam is Mario Meeuwse en ik ben District Jeugd Commissaris van District 1580.\nGedurende mijn Rotaract lidmaatschap en later Rotary heb ik veel uitwisselingen meegemaakt.\nDaarnaast was ik actief in voor de Rotary Youth Leadership Award commissie in District 1610.\nOok heb ik veel internationale activiteiten bijgewoond zoals (wereld)congressen en (district)conferenties.\nZelf heb ik een Group Study Exchange gedaan naar Japan, waar ik met veel dankbaarheid en plezier op terugkijk.\nEen geweldige ervaring naar een land met een heel andere cultuur met enthousiaste mensen binnen de Rotary familie.\nDaarom wil ik ook een steentje bijdragen aan uitwisselingen en de jeugd een onvergetelijke ervaring bezorgen."
    )

    static let judithSiebring = Person(
        name: PersonNameComponents(givenName: "Judith", familyName: "Siebring"),
        roles: [.districtYouthCommissioner(district: 1590), .coordinatorLatinAmerica, .coordinatorLatinAmericaEurope],
        phone: "+31652682275",
        email: "judith@talaria.eu",
        club: "RC Emmen-'t Loo",
        district: "1590 NOORD-NEDERLAND",
        photoURL: URL(string: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/organization/long-term/judith-siebring.jpg"),
        bio: "Mijn naam is Judith Siebring, outbound Coördinator longterm RYE voor de regio's Midden- en Zuid-Amerika.\n\nOp mijn 16e (lang geleden… ;-)) ben ik een jaar naar London, Ontario, Canada geweest op uitwisseling via de Rotary. Ik heb een fantastisch jaar gehad waar ik nog ontzettend vaak aan terugdenk. Het heeft ook veel impact gehad op latere keuzes en ervaringen in mijn leven. Reizen, andere mensen, talen en culturen leren kennen; het zit in mijn bloed. Zo heb ik tijdens mijn studie ook nog een jaar in Uruguay in Zuid-Amerika gestudeerd, en heb ik later nog in Canada en Nieuw-Zeeland gewoond en gewerkt. Inmiddels woon ik alweer een aantal jaar in Emmen en ben daar lid geworden van Rotaryclub Emmen-'t Loo. Ik ben blij dat ik nu mijn steentje kan bijdragen aan het RYE-programma als jeugdcommissaris in mijn club, gastouder én als outbound Coördinator voor de regio's Midden- en Zuid-Amerika. Ik kijk er naar uit om jongeren een stapje op weg te helpen naar en tijdens het jaar van hun leven, met al z'n ups en downs. Daarnaast ben ik blij dat ik de kans krijg om mijn Spaans een beetje te oefenen en contacten te onderhouden met mijn 'Rotary collega's' in het prachtige Zuid-Amerika."
    )

    static let ericKamst = Person(
        name: PersonNameComponents(givenName: "Eric", familyName: "Kamst"),
        roles: [.districtYouthCommissioner(district: 1600)],
        phone: "+31618124627",
        email: "djc@rotary-d1600.nl",
        club: "RC Rijswijk",
        district: "1600",
        photoURL: URL(string: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/organization/eric-kamst.jpg"),
        bio: "Met veel enthousiasme ben ik zomer 2026 Jeugd Commissaris van Zuid Holland geworden. Ik kom uit het onderwijs en het helpen van jeugd en jongeren vind ik fijn om te doen. Sinds mei 2023 ben ik lid van RC Rijswijk. Ik ben vader van een volwassen en zelfstandige dochter en zoon en heb een relatie. Mijn woonplaats is Rockanje. Mijn werk richt zich momenteel op kwaliteitsmanagement in onderwijs, aangevuld met het trainen/coachen van teams op samenwerking en een psychosociaal veilige cultuur."
    )

    static let thijsKaas = Person(
        name: PersonNameComponents(givenName: "Thijs", familyName: "Kaas"),
        roles: [.districtYouthCommissioner(district: 1610)],
        email: "thijs@petillant.nl",
        club: "RC Roosendaal",
        district: "1610",
        photoURL: URL(string: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/organization/thijs-kaas.jpeg"),
        bio: "Sinds kort fungeer ik als DJC voor D1610, hierbij moet ik mijn weg nog wel een beetje vinden maar het is een leuke uitdaging.\n\nAl sinds 1999 met heel veel plezier lid van Rotary, en wel club Roosendaal, een organisatie die ook mij veel heeft gebracht onder meer ook door deel te nemen aan diverse programma's en de verschillende commissies. Rotary is een krachtige organisatie waar ik graag mijn bijdrage lever waar mogelijk."
    )
}
