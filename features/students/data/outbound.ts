/**
 * Outbound students data (Class of 2025-2026)
 * Students going FROM the Netherlands abroad
 */

import type { Student } from "../types";
import { generateStudentId } from "../types";

/**
 * Raw outbound student data (without IDs - generated dynamically)
 */
type OutboundStudentData = Omit<Student, "id" | "type">;

const outboundStudentData: OutboundStudentData[] = [
  {
    name: "Fleur Altena",
    bio: "Hee ik ben Fleur Altena en 18 jaar oud. Ik had nooit verwacht dat ik echt op Exchange zou gaan maar het is echt zo! Ik mag naar mijn droom locatie in Italië namelijk Cagliari, Sardinië! Ik kan niet wachten om Italiaans te leren spreken en de cultuur daar te ontdekken, maar het aller belangrijkste; ik kan niet wachten op een tweede thuis. Het jaar zal vast vol ups en downs zitten, maar het wordt het dubbel en dwars waard.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/25-26/fleur-altena.jpg",
    homeCountryCode: "nl",
    hostCountryCode: "it",
    year: "2025-2026",
  },
  {
    name: "Rachelle van Dam",
    bio: "Hoi!\n Ik ben Rachelle van Dam 16 jaar oud en woon in Lochem. Ik ga naar Canada district 5360 in de stad Cochrane. Toen ik klein was hoorde ik al veel verhalen van mijn familie over de Rotary, namelijk mijn moeder, vader en broer zijn ook met de Rotary een jaar op uitwisseling geweest. Sinds dat ik klein was wou ik dit ook altijd al doen. En nu is het zo ver! Ik hoop dat ik veel nieuwe dingen ga leren en ontdekken en dat ik mijn Engels kan verbeteren. Ook hoop ik dat ik vrienden voor het leven ga maken. Ik heb er ontzettend veel zin in en kan niet wachten!",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/25-26/rachelle-van-dam.png",
    homeCountryCode: "nl",
    hostCountryCode: "ca",
    year: "2025-2026",
  },
  {
    name: "Job Dekker",
    bio: "Hoi!\n Ik ben Job. Ik ben 16 jaar oud. Ik woon in Epe. Ik ga naar San Carlos de Bariloche in Argentinië. Ik heb al contact gehad met mijn gastfamilie. Ik ben daar, net als de plek waar ik naartoe ga, heel blij mee, want Bariloche is precies wat ik wilde. Ik kijk vooral uit naar ontdekken van de nieuwe cultuur en het leren van Spaans.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/25-26/job-dekker.png",
    homeCountryCode: "nl",
    hostCountryCode: "ar",
    year: "2025-2026",
  },
  {
    name: "Valentijn van Dijk",
    bio: "Olá,\n Ik ben Valentijn en ik ga volgend jaar naar Brazilië 🇧🇷! Ik ben 18 jaar oud en ik kom uit Scherpenzeel. Ik heb al een aantal jaar in gedachte dat ik graag op exchange zou willen en nu is het eindelijk zover. Veel mensen vertellen me dat ze het spannend zouden vinden, maar ik kijk er enkel naar uit. Ik ga verblijven in Bauru, een stad met 400.000 inwoners in het midden van de staat São Paul. Mijn gastmoeder heeft al contact opgezocht en ik heb al leuke gesprekken met haar gehad. Ik kijk erg uit naar mijn uitwisselingsjaar en het ontmoeten van mijn gastouders en gast club ( en niet te vergeten het lekkere weer ☀️😍).\n Tchau!",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/25-26/valentijn-van-dijk.jpg",
    homeCountryCode: "nl",
    hostCountryCode: "br",
    year: "2025-2026",
  },
  {
    name: "Niels Doejaaren",
    bio: "Hoi!\n Mijn naam is Niels Doejaaren, ik ben 16 jaar en ik ga dit jaar naar Italië!\n\n Een paar weken geleden kreeg ik te horen dat ik mocht gaan, en ik was helemaal opgelucht dat ik naar Italië mag gaan. Ik ben geplaatst in Sassari, Sardinië een van de grootste steden in het kleine Sardinië. Ik ben benieuwd hoe het cultuur zich verschilt van Italië zelf. En ik ben ook erg gedreven om Italiaans te kunnen spreken aan het eind van het jaar. Tot nu toe is het altijd wel gezellig geweest met de rotary en laatst hadden we de farewell party met alle outbounds die dit exchange jaar in Nederland zijn verbleven.\n\nArriverderci!",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/25-26/niels-doejaaren.png",
    homeCountryCode: "nl",
    hostCountryCode: "it",
    year: "2025-2026",
  },
  {
    name: "Ellemare Galema",
    bio: "Hallo allemaal!\nMijn naam is  Ellemare Galema en ik word in Juli 18 jaar. Ik woon in een dorpje naast Leeuwarden. In mijn vrije tijd spreek ik graag met mijn vrienden af, werk ik in een verzorgingshuis voor bejaarden en vind ik sporten super leuk. \n\nEind augustus vertrek naar Argentinië (Paraná, dat ligt ongeveer 6 uur rijden van Buenos Aires) in het jaar 2025-2026. Ik heb super veel zin om de Argentijnse cultuur te leren kennen,  vloeiend Spaans te leren spreken en nieuwe mensen te leren kennen. Ik heb inmiddels ook contact met mijn eerste gastgezin en ik krijg nu extra veel zin om in augustus te vertrekken! Mijn ouders krijgen een meisje uit de Verenigde Staten, deze leer ik ook kennen want na haar komst verrek ik twee weken later naar Argentinië. \n\nIn het voortraject ben ik er achter gekomen dat je super veel moet regelen maar leer je ook al veel mensen kennen uit je eigen land maar ook uit andere landen, hier leer je super veel van. De dagen en het weekend wordt je al een beetje voorbereid op je Exchange. \n\nIk ben super dankbaar dat ik naar Argentinië mag, ik heb er zin in!",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/25-26/ellemare-galema.jpg",
    homeCountryCode: "nl",
    hostCountryCode: "ar",
    year: "2025-2026",
  },
  {
    name: "Fem Govers",
    bio: "Ik ben Fem Govers, ik ben momenteel 16 jaar oud. Over ongeveer twee maanden vertrek ik naar Amerika! Ik ga wonen in Carlsbad, een stad aan de kust in Californië. Ik heb al contact gehad met mijn gastgezin en ze zijn echt superlief en enthousiast. Ze lijken het heel leuk te vinden dat ik bij hen kom wonen en dat maakt mij natuurlijk ook extra blij en enthousiast! Carlsbad ziet er prachtig uit en ligt vlak bij de oceaan, dus ik kan niet wachten om daar het leven te ervaren. Ik heb voor dit programma gekozen omdat ik heel graag een nieuwe cultuur wil leren kennen en mezelf echt wil uitdagen door uit mijn comfortzone te stappen. Ik kijk er vooral naar uit om nieuwe mensen te ontmoeten, het Amerikaanse schoolleven mee te maken, leuke uitstapjes te doen, en natuurlijk ook om de Amerikaanse natuur en cultuur te ontdekken. Op dit moment ben ik nog bezig met de laatste voorbereidingen zoals mijn visum, maar hopelijk land ik over ongeveer twee maanden in het zonnige Carlsbad!",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/25-26/fem-govers.jpg",
    homeCountryCode: "nl",
    hostCountryCode: "us",
    year: "2025-2026",
  },
  {
    name: "Fiene Hahn",
    bio: "Hii, ik ben Fiene Hahn, ik ben 16 jaar oud en ik ga in augustus 2025 voor 11 maanden lang naar Argentinië bij het stadje San Juan. ik heb hier ontzettend veel zin in en ik kan niet wachten om te gaan. Mijn gezin heeft op dit moment al bijna 3 maanden een Exchange student uit Argentinië. Hij verteld altijd dat dit zijn beste jaar van zijn leven is en heel veel plezier heeft in Nederland. Zelf krijg ik heel veel vragen of ik het spannend vind maar ik kan nu eigenlijk alleen maar zeggen dat ik er super veel zin in heb!!!",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/25-26/fiene-hahn.jpg",
    homeCountryCode: "nl",
    hostCountryCode: "ar",
    year: "2025-2026",
  },
  {
    name: "Teuntje Harmsma",
    bio: "Hii, \n Ik ben Teuntje, ik ben 16 jaar en ik woon in Bodegraven. Ik hou van pianospelen, afspreken met vriendinnen en mooie plekken bezoeken. Ik zit nu in mijn 4e jaar van het vwo. Ik zit op school in Woerden, en daardoor heb ik daar een Rotaryclub gevonden die mij wil sponsoren. Daar ben ik ze heel dankbaar voor. Ik ben op het idee gekomen om een jaaruitwisseling te doen met Rotary via mijn opa, die heel lang bij de Rotary heeft gezeten en me altijd over deze unieke kans vertelde. \n\nIk ga in het jaar 2025/2026 naar het prachtige stadje Cranbrook in Canada, British Columbia. Dit ligt in district 5080, een tweelanden-district met een deel van Canada (British Columbia) en een deel van de VS: Washington en Idaho. Cranbrook wordt omringd door de Purcell Mountains en de Rocky Mountains, en ligt op 4 uur rijden van de stad Calgary. De dichtstbijzijnde grens met de VS is 80 km. Cranbrook staat bekend als de zonnigste plaats in British Columbia. \n\nIk heb al contact gehad met mijn eerste hostfamilie en ze zijn superaardig. Ik heb enorm veel zin in dit avontuur! Ik kijk ernaar uit om een Canadese high school te ervaren (ik ga naar Mount Baker Secondary School), om nieuwe mensen te ontmoeten, om nieuwe gerechten te proberen, om wilde dieren te spotten, de Canadese cultuur te ontdekken, Canadese landschappen te bewonderen en me in te zetten als ambassadeur voor Rotary. Kortom: ik heb er superveel zin in! \n\nTwijfel niet om contact met me op te nemen voor vragen! Mijn telefoonnummer is 06 83352902 en mijn Instagram is 'teuntjeharmsma'.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/25-26/teuntje-harmsma.jpg",
    phone: "+31683352902",
    socialMedia: {
      instagram: "https://www.instagram.com/teuntjeharmsma/",
    },
    homeCountryCode: "nl",
    hostCountryCode: "ca",
    year: "2025-2026",
  },
  {
    name: "Nila Hernandez Camacho",
    bio: "Hoi! Ik ben Nila, 16 jaar, en ik woon in Almere, maar over minder dan twee maanden vertrek ik naar Indonesië! Ik heb net 5 havo afgerond en te horen gekregen dat in ben geslaagd, dus het avontuur gaat nu echt bijna beginnen! Ik ga wonen in Surabaya, de op één na grootste stad van het land, wat ligt op het eiland Java. Het wordt een enorm avontuur, want ik ben nog nooit in Azië geweest. In Surabaya zal ik naar SMA Trimurti gaan, een middelbare school midden in de stad. Ik kijk er ontzettend naar uit om de Indonesische cultuur, mensen, taal, het eten en het dagelijks leven te ontdekken en écht te ervaren. Sampai jumpa, Indonesia!",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/25-26/nila-hernandez-camacho.jpg",
    homeCountryCode: "nl",
    hostCountryCode: "id",
    year: "2025-2026",
  },
  {
    name: "David Holl",
    bio: "Hoi!\n\n Ik ben David, 17 jaar oud, en ik heb zojuist mijn eindexamens voor de havo afgerond. Ik woon in Etten-Leur (Noord-Brabant) samen met mijn twee broertjes en mijn zusje. In het schooljaar 2025-2026 ga ik op uitwisseling naar Kamloops, een dorpje in British Columbia, Canada! Kamloops heeft ongeveer 100.00 inwoners en ligt in district 5060, ongeveer drie uur rijden van de grens met de Verenigde Staten. Hier in Nederland speel ik tafeltennis en ga ik regelmatig naar de sportschool. Tijdens mijn uitwisseling hoop ik nieuwe sporten te ontdekken en deel te nemen aan sportactiviteiten op mijn Canadese school, Valleyview Secondary School. Op school zal ik een hoop sociale vakken volgen zoals outdoor education en career life connections zodat ik veel nieuwe dingen leer en veel nieuwe vrienden maak. Kamloops ligt in de bergen en heeft dus een groot aanbod aan bergsporten. Naast dit alles wil ik mijn Engels verbeteren, zelfstandiger worden en vooral heel veel plezier te maken! Met de steun van mijn fijne club hier in Nederland, mijn nieuwe club in Kamloops en mijn gastgezinnen heb ik er alle vertrouwen in dat dit een onvergetelijk jaar wordt! Na mijn uitwisseling ga ik Aerospace Engineering studeren in Delft. Mijn verbeterde Engels zal daar zeker van pas komen. Ik wens alle andere prebounds ook een fantastisch uitwisselingsjaar toe, en ik kijk nu al uit naar al jullie verhalen. Ik kan niet wachten tot dit avontuur gaat beginnen!",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/25-26/david-holl.png",
    homeCountryCode: "nl",
    hostCountryCode: "ca",
    year: "2025-2026",
  },
  {
    name: "Ben Hoogvliet",
    bio: "Hallo,\n Mijn naam is Ben. Ik ben 16 jaar oud en ik ga op 16 augustus naar Japan. Ik ga een jaar lang wonen in het stadje Nara, dicht bij Osaka en Kioto. Het is een jaar waar ik al twee jaar naar uitkijk, en ik ben superblij dat zo'n droom uitkomt. Ik zit nu op de middelbare school, 4 havo. Ik hou van boksen, surfen, gitaar spelen en ik ben al een jaar Japans aan het leren met een Japanse docent. Daardoor kan ik het eerste Japanse alfabet (hiragana) lezen. Ik woon in Voorschoten en heb twee zussen en één broer, waarvan er twee niet meer thuis wonen. Ik zit op school in Leiden, op het Agora Bonaventuracollege. Ik vind het supercool dat ik naar Japan mag gaan, dus ik ga er met trots naartoe en ik ga er een topjaar van maken!",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/25-26/ben-hoogvliet.png",
    homeCountryCode: "nl",
    hostCountryCode: "jp",
    year: "2025-2026",
  },
  {
    name: "Nilla Kamps",
    bio: "Olá,\n Ik ben Nilla, 17 jaar oud en ik kom uit Spanbroek (Noord-Holland). Ik ga op exchange naar Brazilië! Voor mijn exchange year 25/26 ga ik naar Brazilië! Ik heb er ontzettend veel zin in en kijk er naar uit om iedereen te ontmoeten. Ik kom in het plaatsje Ivoti, helemaal in het zuiden van Brazilië. Ik ben nu al bezig met online Portugese lessen van een Braziliaanse docent, drie keer in de week. Dat doe ik samen met andere exchange students uit Duitsland, Turkije en andere landen. Het Turkse en Duitse meisje worden ook gehost door mijn Braziliaanse Rotaryclub dus wij gaan elkaar snel echt ontmoeten. Deze week hoop ik mijn visum te krijgen want over een maand vlieg ik naar Brazilië. De tijd gaat snel nu! Het Portugees is nog wel een uitdaging maar ik ga ervan uit dat het helemaal goed komt als ik daar ben en niets anders hoor dan die taal. :-)",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/25-26/nilla-kamps.jpg",
    homeCountryCode: "nl",
    hostCountryCode: "br",
    year: "2025-2026",
  },
  {
    name: "Rozan Korevaar",
    bio: "Hoi!\n Ik ben Rozan en ben 16 jaar oud. Ik heb mijn 5e jaar havo af. Ik woon op dit moment in Maarssen en Haarzuilens en mag over een tijdje mijn nieuwe woonplek zien in Argentinië! Ik kijk er erg naar uit om naar mijn dorp San Antonio Oeste te gaan aan de kust in het rotary district 4921.  Ik kijk er erg naar uit om mijn lieve gastfamilies te ontmoeten en meer te leren over Argentinië. Ik hoop de taal goed onder de knie te krijgen en meer te weten te komen over de cultuur.  Dit jaar gaat een fantastisch avontuur worden en ik kijk er nu al enorm naar uit om te vertrekken. Groetjes Rozan",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/25-26/rozan-korevaar.jpg",
    homeCountryCode: "nl",
    hostCountryCode: "ar",
    year: "2025-2026",
  },
  {
    name: "Gabi Kovacs Astuto",
    bio: "Mijn naam is Gabi (kort voor Gabriela), ik ben 16 jaar oud en ik ben in Brazilië geboren maar ik woon al 12 jaar in Noord Brabant. Ik zit op een internationale school, speel piano en kunstschaatsen. In mijn vrije tijd lees en teken ik. En ik ga op uitwisseling bij Rotary in Italië.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/25-26/gabi-kovacs-astuto.jpg",
    homeCountryCode: "nl",
    hostCountryCode: "it",
    year: "2025-2026",
  },
  {
    name: "Jenna Krijnsen",
    bio: "Hoiii, \n\nIk ben Jenna. Ik ben zestien jaar oud. Ik woon op dit moment nog in Leeuwarden en zit in de vijfde van het VWO.\n\nIk ga volgend schooljaar een exchange year doen in Amerika!! Ik ga naar het kleine stadje Cato in de staat New York, het ligt dichter bij Canada dan New York City. De dichtstbijzijnde stad is Syracuse, dat is ook waar vlieg ik heen vanuit Amsterdam. Ik heb al veel informatie opgezocht over Cato en de omgeving ervan. Het is er erg mooi en de natuur is te vergelijken met Zweden en Denemarken. Ik heb zo veel zin om mijn Amerikaanse droom waar te maken! Op mijn school hebben ze veel sporten waaronder cheerleaden, dus ik hoop dat ik daar aan mee kan doen!\n\nIk ben heel benieuwd hoe mijn gastgezin zal zijn en ik heb heel erg veel zin om iedereen te ontmoeten!\n\nTot volgend jaar!",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/25-26/jenna-krijnsen.png",
    homeCountryCode: "nl",
    hostCountryCode: "us",
    year: "2025-2026",
  },
  {
    name: "Merel Mattijssen",
    bio: "Heyy,\nIk ben Merel, 17 jaar en ik kom uit Doornenburg. Ik vertrek op 6 augustus naar Los Gatos in California! Los Gatos is een klein gezellig stadje een uur van San Francisco. Tijdens mijn Exchange hoop ik veel van de Amerikaanse cultuur te zien, vloeiend Engels te gaan spreken, veel nieuwe vrienden te maken en nieuwe plaatsen te ontdekken. De school waar ik naartoe ga is Los Gatos Highschool, ik heb online gezien dat de school heel fanatiek met sport is dus ik ben heel benieuwd hoe dit gaat zijn. Ik heb helaas nog geen contact met mijn gastgezinnen gehad, dus dat is nog wel spannend. \n\nIk heb super veel zin om deze ervaring aan te gaan en ben benieuwd of dit echt een lifetime in a year word!",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/25-26/merel-mattijssen.jpg",
    homeCountryCode: "nl",
    hostCountryCode: "us",
    year: "2025-2026",
  },
  {
    name: "Guus Offerman",
    bio: "Hoi!\n\n Ik ben Guus ik ben 17 jaar oud en zit nu in m'n examenjaar havo 5. Ik ga dit jaar naar Vallenar een mooi stadje in het noorden van Chili 🇨🇱. Zuid Amerika is helemaal nieuw voor mij, dus ik ben super benieuwd hoe de cultuur verschilt met Nederland. Ook hoop ik mij echt thuis te voelen bij mijn gastgezin en op school. En natuurlijk veel nieuwe vrienden te maken, mooie plekken te zien en natuurlijk ook de Spaanse taal te leren.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/25-26/guus-offerman.jpg",
    homeCountryCode: "nl",
    hostCountryCode: "cl",
    year: "2025-2026",
  },
  {
    name: "Madelief van Oosterwijk",
    bio: "Hola!!\n Ik ben Madelief, 17 jaar en ik woon (nu nog) in Hengelo. Volgend jaar ga ik naar Mexico 🇲🇽! Ik ben geplaatst in Mexico stad en heb online al kennis gemaakt met mijn gastgezin. Ik ga over zo'n twee maanden weg en hoewel ik het erg spannend vind heb ik er super veel zin in! Ik heb al 2 vriendinnen in Mexico die dit jaar in Nederland op exchange zijn en een van hen woont ook dichtbij mijn gezin in Mexico stad. \n Voor nu weet ik nog niet zo goed wat ik kan verwachten van mijn exchange jaar, maar ik kan niet wachten tot ik dat mag gaan ontdekken!",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/25-26/madelief-van-oosterwijk.jpg",
    homeCountryCode: "nl",
    hostCountryCode: "mx",
    year: "2025-2026",
  },
  {
    name: "Willem Overmars",
    bio: "Hoi,\n\n Ik ben Willem Overmars, Ik ben 16 jaar oud en ik woon in Gemert, (Brabant). Ik ga dit jaar op exchange en ben geplaats in de stad Tulsa in Amerika. Ik hoop dit jaar echt veel nieuwe dingen te leren kennen over de cultuur te leren en ook veel dingen uit te proberen zoals nieuwe sporten en lekker eten. Ook hoop ik veel vrienden daar te maken, veel nieuwe dingen leren en het beste uit mezelf te halen. \nIk heb er echt heel veel zin in en ik kan niet wachten om op dat vliegtuig te stappen en gewoon te gaan!",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/25-26/willem-overmars.jpg",
    homeCountryCode: "nl",
    hostCountryCode: "us",
    year: "2025-2026",
  },
  {
    name: "Nina Rietveld",
    bio: "Hi!\n\n Mijn naam is Nina Rietveld en ik ga op uitwisseling naar Zürich in Zwitserland! Ik heb er enorm naar uitgekeken en ben super benieuwd wat dit jaar mij gaat brengen. Ik kan niet wachten om een nieuwe taal te leren, nieuwe vrienden te maken en vooral heel veel bijzondere ervaringen op te doen. Ik kom zelf uit het rustige dorpje Huizen, maar ik sta klaar voor dit nieuwe avontuur in een bruisende stad. Wil je mijn uitwisselingsjaar volgen? \nKijk dan op TikTok: unlimitedyep",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/25-26/nina-rietveld.jpg",
    homeCountryCode: "nl",
    hostCountryCode: "ch",
    year: "2025-2026",
  },
  {
    name: "Fenna Sanders",
    bio: "Hoi!!\n\n Ik ben Fenna Sanders, ik ben 16 jaar en ik kom uit Langedijk, een dorpje in Noord-Holland. Komend schooljaar ga ik iets doen waar ik al jarenlang van droom: ik ga op exchange naar de Verenigde Staten! Ik verblijf in het plaatsje Front Royal, in de staat Virginia. Het lijkt me een ontzettend leuke en mooie omgeving, en ik kan echt niet wachten om mijn gastgezinnen persoonlijk te ontmoeten! Het is al jaren mijn wens om op exchange te gaan en nu gaat die droom eindelijk in vervulling. Ik ben super enthousiast en hoop daar een onvergetelijk jaar te beleven, vol nieuwe ervaringen en avonturen. Mijn gastgezin is gelukkig net zo enthousiast als ik; ze hebben al allemaal leuke plannen met me gedeeld.Ik betrap mezelf er bijna dagelijks op dat ik op internet aan het zoeken ben naar wat er allemaal te doen is in Front Royal en de omgeving. Alles is nieuw voor me, dus ik wil er zoveel mogelijk van meemaken en ontdekken! De school waar ik heen ga is de Skyline High School. Ik zal daar het laatste jaar volgen, het zogenaamde senior year, wat volgens mij echt een bijzondere ervaring gaat worden.Ik kijk er enorm naar uit om nieuwe mensen te leren kennen, de Amerikaanse cultuur van dichtbij te ervaren en hopelijk vriendschappen voor het leven op te bouwen. Ik tel de dagen af tot mijn avontuur begint!",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/25-26/fenna-sanders.jpg",
    homeCountryCode: "nl",
    hostCountryCode: "us",
    year: "2025-2026",
  },
  {
    name: "Ray Sersté",
    bio: "Hoi hoi, ik ben Ray en ik ben 17 jaar jong. Ik woon in Breda en ben nu bezig met het afronden van 5 VWO. Na de middelbare school wil ik politicologie gaan studeren in Leiden. \n\n Voor mijn exchange zit ik een jaar in Frankrijk, in het stadje Laval in het westen van het land. Mijn vader is Franstalig, waardoor ik al goed Frans spreek. Ik hoop dat ik me hierdoor snel kan aanpassen en meer slang leren. \n\nIk heb ontzettend veel zin om nieuwe plekken te ontdekken en vrienden te maken. Als mensen mij vragen of ik het spannend vind om weg te gaan, is mijn antwoord: 'Nee!' Ik heb er vooral enorm veel zin in!",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/25-26/ray-serste.jpg",
    homeCountryCode: "nl",
    hostCountryCode: "fr",
    year: "2025-2026",
  },
  {
    name: "Sara Staubach",
    bio: "Mijn naam is Sara. Ik ben op dit moment 17 jaar oud en Ik kom uit het dorp Volendam in Noord-Holland. Over ongeveer een maand al ga ik naar Brazilië!! Ik ben de dagen aan het aftellen want ik wil al jaren lang op Exchange! Al sinds dat ik klein was, ben ik geïnteresseerd geweest in andere culturen en een Exchange is daar perfect voor. \nIk ga een jaar lang naar de prachtige stad Santos in district 4420! De stad ligt iets onder São Paulo en ik woon ongeveer 10 minuten van het strand af!! \nIk heb al contact met 2 van mijn host families en met 1 van hun gebeld. Ze zijn beide super aardig en verwelkomd. Ik kan niet wachten om ze in het echt te ontmoeten. \nIk heb erg veel zin om als nieuwe taal Portugees te leren spreken, de Braziliaanse cultuur te zien, nieuwe mensen leren, eten proeven en zelf proberen te maken, naar een nieuwe school te gaan en een geweldig jaar te beleven!",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/25-26/sara-staubach.png",
    homeCountryCode: "nl",
    hostCountryCode: "br",
    year: "2025-2026",
  },
  {
    name: "Yves Straathof",
    bio: "Hoi, ik ben Yves, ik ben 16 jaar en woon in Nijmegen. Ik zit in 5 havo en in mijn vrije tijd doe ik graag dingen met vrienden, speel ik voetbal of tennis en werk ik in de horeca. \n\nIn september vertrek ik naar brivio,  een klein dorpje tussen Milaan en Bergamo, in Italië. Ik heb super veel zin om de Italiaanse cultuur te ontdekken en om nieuwe mensen te ontmoeten.  \nIk heb al contact met mijn eerste gastgezin en heb daardoor nog meer zin gekregen om te gaan. \n\nIk hoop dat alle andere uitwisselingsstudenten ook een super leuk jaar hebben!",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/25-26/yves-straathof.jpg",
    homeCountryCode: "nl",
    hostCountryCode: "it",
    year: "2025-2026",
  },
  {
    name: "Simon Talstra",
    bio: "Hallo,\n Mijn naam is Simon, ik ben 16 jaar en ik woon in Drachten, Friesland. Ik ga komend schooljaar naar Victoria, Canada, dat ligt in de provincie British Columbia. Victoria is een grootstedelijk gebied en het is de hoofdstad British Columbia. \nIk kijk al een lange tijd uit om op Rotary exchange te gaan. Ik heb er heel veel zin in om naar Canada te gaan en daar veel vrienden te maken, en dat ik veel mooie ervaringen en avonturen kan beleven. Ik kijk er naar uit om naar een echte Canadese high school te gaan en vloeiend Engels te kunnen spreken. ",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/25-26/simon-talstra.jpg",
    homeCountryCode: "nl",
    hostCountryCode: "ca",
    year: "2025-2026",
  },
  {
    name: "Lisanne Verspui",
    bio: "Olá!\n\n Ik ben Lisanne Verspui en ik ben 16 jaar oud. Over een aantal weken begint mijn uitwisseling naar Brazilië. Ik ga naar een stad in het zuiden van Brazilië genaamd Curitiba. Een uitwisselingsjaar is al een lange tijd een droom voor mij die nu eindelijk uit mag gaan komen. Ik vind het ontzettend leuk om te reizen en nieuwe culturen leren kennen en daarom kijk ik ook ontzettend uit naar mijn vertrek. Ik kan niet wachten om vloeiend Portugees te leren spreken en nieuwe mensen te leren kennen. Ik heb al veel contact met mijn gastgezinnen en ik kijk er erg naar uit om iedereen in het echt te ontmoeten. Ik ben ontzettend dankbaar voor deze kans en kijk uit naar alle ervaringen, uitdagingen en herinneringen die daar op mijn pad gaan komen. \nAté breve!",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/25-26/lisanne-verspui.jpg",
    homeCountryCode: "nl",
    hostCountryCode: "br",
    year: "2025-2026",
  },
  {
    name: "Max Weijters",
    bio: "Hoi ik ben Max Weijters 17 jaar oud en woon in Zaandam. Ik zit nu op de koksopleiding op het mbo en ga aankomend schooljaar naar Brazilië vlakbij São Paulo. \nIk heb al contact gehad met m'n gastgezin en zijn echt heel gastvriendelijk. \nIk heb er super veel zin in om nieuwe vrienden te maken in een nieuw land met een warm cultuur.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/25-26/max-weijters.png",
    homeCountryCode: "nl",
    hostCountryCode: "br",
    year: "2025-2026",
  },
];

/**
 * Current outbound students (with dynamically generated IDs)
 */
export const outboundStudents: Student[] = outboundStudentData.map((data) => ({
  ...data,
  id: generateStudentId(data.name, "outbound"),
  type: "outbound" as const,
}));
