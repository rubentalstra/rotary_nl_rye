/**
 * Outbound students data (Class of 2026-2027)
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
    name: "Abe van Brenk",
    bio: "Hallo.\n\nMijn naam is Abe van Brenk. Ik ben 16 jaar oud en kom uit Enschede. Over ongeveer 2 maanden ga ik naar Brazilië. Ik ga naar het district 4670 en ga naar de stad Canela in de provincie Rio grande do sul. Ik ben nu al bezig met online Portugese les van een docent. Ik heb er ontzettend veel zin om de de stad te verkennen en mijn gastgezin in het echt te ontmoeten. Ik hoop dat ik op mijn exchange een nieuwe mooie cultuur ga ontdekken. Ik wilde altijd al en nieuwe taal leren dus ik hoop dat ik goed Portugees ga leren. Ik verwacht dat ik veel ga leren over het land, de mensen maar ook over mezelf en dat ik zal groeien in mijn sociale vaardigheden. Ik heb er ontzettend veel zin.",
    imageUrl: `https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/26-27/abe-van-brenk.png`,
    homeCountryCode: "nl",
    hostCountryCode: "br",
    year: "2026-2027",
  },
  {
    name: "Tess Doggen",
    bio: "Hola,\n\nMijn naam is Tess. Ik ben 15 jaar oud en woon in Wouw, een klein dorpje naast Roosendaal. Eind Augustus begin ik aan mijn Exchange avontuur in Argentinië! In Argentinië zal ik een jaar gaan wonen in het plaatsje Esperanza. Ook heb ik nu al contact met mij host-familie en ik kan niet wachten om hen eindelijk te ontmoeten! Ik hoop dat ik tijdens mijn reis in Argentinië volop de cultuur zal proeven (letterlijk en figuurlijk), heel veel leuke mensen leer kennen en natuurlijk de taal goed beheers tegen de tijd dat ik weer terugkom!!!",
    imageUrl: `https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/26-27/tess-doggen.png`,
    homeCountryCode: "nl",
    hostCountryCode: "ar",
    year: "2026-2027",
  },
  {
    name: "Gabriela de Winter",
    bio: "Ik ben Gabriëla de Winter, 17 jaar en ik kom uit Brabant. Rond 9 augustus vertrek ik naar Eureka in Californië, Amerika. Ik ga daar naar de high school in Eureka. Dat vind ik superleuk, maar ook best spannend, omdat alles natuurlijk anders zal zijn dan in Nederland. Eureka ligt aan de kust in Noord-Californië en is onder andere bekend als filmlocatie van One Battle After Another.\n\nTijdens mijn exchange hoop ik meer van het Amerikaanse leven mee te krijgen, mijn Engels te verbeteren en nieuwe mensen te ontmoeten. Ik kijk ernaar uit om te ontdekken hoe het is om op een Amerikaanse high school te zitten en om echt onderdeel te worden van het dagelijks leven daar.\n\nIk heb nog geen contact gehad met mijn gastgezin, dus daar ben ik heel benieuwd naar. Het voelt nog een beetje onwerkelijk, maar ik heb vooral heel veel zin in alles wat komen gaat!",
    imageUrl: `https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/26-27/gabriela-de-winter.png`,
    homeCountryCode: "nl",
    hostCountryCode: "us",
    year: "2026-2027",
  },
  {
    name: "Fiene Zwaan",
    bio: "Hoi! Ik ben Fiene, ik ben 17 jaar oud en ik zit in havo 5. Komend jaar ga ik op exchange naar Brazilië, naar de stad Bauru.\n\nIk kijk hier enorm naar uit, omdat Brazilië echt een droomland voor mij is. Het lijkt me geweldig om een nieuwe cultuur te ontdekken, de taal te leren en nieuwe mensen te ontmoeten. Ik heb veel zin in alle nieuwe ervaringen die ik daar ga meemaken en ik hoop dat het een onvergetelijk jaar wordt!",
    imageUrl: `https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/26-27/fiene-zwaan.png`,
    homeCountryCode: "nl",
    hostCountryCode: "br",
    year: "2026-2027",
  },
  {
    name: "Thijs Klapwijk",
    bio: "Hoi! Ik ben Thijs Klapwijk en volgend jaar ga ik op exchange naar Los Angeles in de Verenigde Staten. Basketbal speelt een grote rol in mijn leven en daarom kijk ik extra uit naar deze ervaring. In mijn vrije tijd ben ik veel bezig met basketbal, zowel kijken als spelen.\n\nIk kijk er enorm naar uit om de Amerikaanse basketbalcultuur van dichtbij mee te maken. Vooral lijkt het me gaaf om high school basketball te ervaren en te zien hoe groot de sport daar leeft.\n\nDaarnaast heb ik veel zin om nieuwe mensen te ontmoeten, mijn Engels te verbeteren en natuurlijk Los Angeles te ontdekken.\n\nIk heb superveel zin in dit avontuur en kan niet wachten tot het begint!",
    imageUrl: `https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/26-27/thijs-klapwijk.jpg`,
    homeCountryCode: "nl",
    hostCountryCode: "us",
    year: "2026-2027",
  },
  {
    name: "Sophie de Jong",
    bio: "Ik ben Sophie, ik ben 16 jaar oud en volgend jaar ga ik met Rotary Youth Exchange naar Amerika. Ik kijk hier enorm naar uit, omdat het een unieke kans is om een nieuwe cultuur te ontdekken, nieuwe mensen te ontmoeten en zelfstandiger te worden. Het lijkt me geweldig om op een Amerikaanse high school te zitten, mijn Engels te verbeteren en het echte Amerikaanse leven mee te maken. Natuurlijk vind ik het spannend, maar vooral heel leuk. Ik weet zeker dat dit een ervaring wordt die ik nooit zal vergeten.",
    imageUrl: `https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/26-27/sophie-de-jong.png`,
    homeCountryCode: "nl",
    hostCountryCode: "us",
    year: "2026-2027",
  },
  {
    name: "Evelien Schuurmans",
    bio: "Hii, ik ben Evelien, ik ben 16 jaar en woon op dit moment in Oosterhout, een kleine stad in Brabant. Vanaf eind augustus heb ik het geluk gekregen om in San Antonio Oeste te gaan wonen, een dorp in Argentinië!\n\nIk heb er al ontzettend veel zin in en kan niet wachten tot ik vertrek. Ik heb al contact met mijn eerste gastgezin, wat ik super leuk vind, want daardoor begint het al wel een beetje! Ik heb super veel zin om de Argentijnse cultuur te leren kennen, veel nieuwe mensen te ontmoeten en om natuurlijk Spaans te gaan leren. Ik ben super dankbaar dat ik naar Argentinië mag en kijk er heel erg naar uit!",
    imageUrl: `https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/26-27/evelien-schuurmans.png`,
    homeCountryCode: "nl",
    hostCountryCode: "ar",
    year: "2026-2027",
  },
  {
    name: "Tibbe Sinnige",
    bio: "Hoi! Ik ben Tibbe, ik ben 17 jaar. Ik woon momenteel nog in Heemstede maar over ongeveer twee maanden ga ik naar Mexico. Ik ga naar het stadje Metepec, dat ongeveer een uur rijden ligt van het centrum van Mexico-stad. Ik heb onlangs al contact gehad met mijn eerste gastgezin en die zijn erg leuk! Ik heb ontzettend veel zin om Spaans te leren en een nieuwe cultuur te ontdekken!",
    imageUrl: `https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/26-27/tibbe-sinnige.png`,
    homeCountryCode: "nl",
    hostCountryCode: "mx",
    year: "2026-2027",
  },
  {
    name: "Sjoerd Mertens",
    bio: "Hoi!\n\nMijn naam is Sjoerd en ik zit momenteel in 6 vwo in Nederland. In mijn vrije tijd houd ik mij graag bezig met sporten, school en tijd doorbrengen met vrienden en familie. Daarnaast vind ik op school geschiedenis altijd erg interessant.\n\nKomend jaar ga ik op exchange naar Colombia, naar district 4281, in Chía, vlak bij Bogotá. Ik kijk er erg naar uit om het dagelijks leven in Colombia te ervaren en vooral om de Latijns-Amerikaanse cultuur van dichtbij te leren kennen. Het lijkt me bijzonder om nieuwe mensen te ontmoeten, Spaans verder te ontwikkelen, naar school te gaan in een compleet andere omgeving en onderdeel te worden van een Colombiaanse familie en gemeenschap.\n\nIk hoop tijdens deze exchange veel te leren, mezelf verder te ontwikkelen en herinneringen te maken die ik mijn hele leven meeneem. Ik heb er ontzettend veel zin in.",
    imageUrl: `https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/26-27/sjoerd-mertens.png`,
    homeCountryCode: "nl",
    hostCountryCode: "co",
    year: "2026-2027",
  },
  {
    name: "Nine Jonkers",
    bio: "Hii, ik ben Nine en 16 jaar oud. Ik woon in het dorpje Bergen (nh) en zit in 5 vwo en volgend schooljaar ga ik naar Italië!\nIk weet nog niet welke plek exact, maar dat maakt het extra spannend.\nIk heb er onwijs veel zin in en ben erg benieuwd wat mij allemaal te wachten gaat staan! Vroeger droomde ik er al van om op exchange te gaan, maar wilde ik altijd naar de VS. Door de Rotary ben ik er achter gekomen dat er veel meer is dan alleen de VS en merkte ik dat Italië ook een heel leuk land is om naartoe te gaan! Zo kan ik nu mijn dromen waarmaken in een land dat beter bij mij past!\n\nMijn doel voor volgend jaar is het ontdekken van de Italiaanse cultuur, nieuwe mensen leren kennen en hopelijk vrienden voor het leven maken! Ik ben mega enthousiast en hoop een onvergetelijk jaar te beleven!\n\nArrivederci!",
    imageUrl: `https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/26-27/nine-jonkers.jpg`,
    homeCountryCode: "nl",
    hostCountryCode: "it",
    year: "2026-2027",
  },
  {
    name: "Tahnee van Wijngaarden",
    bio: "Ni hao,\n\nIk ben Tahnee, 16 jaar oud en ik word in augustus 17. In mijn vrije tijd speel ik het liefst hockey, ben ik graag actief bezig of doe ik wat met vrienden. Ik woon nu in Breda en ga komend jaar (2026-2027) op Rotary Youth Exchange naar Taiwan!\n\nVan kleins af aan spreekt de Chinese taal en cultuur mij al aan en nu kan ik dankzij de Rotary op een geweldig uitwisselingsjaar naar Taiwan. Ik kijk er ontzettend naar uit en kan niet wachten om Mandarijn te leren spreken. Ik heb ook heel veel zin om mijn gastgezin te leren kennen en ik ben heel benieuwd waar ik terecht kom. Het zal niet altijd makkelijk zijn, maar ik ben super dankbaar dat deze droom nu uit kan komen.",
    imageUrl: `https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/26-27/tahnee-van-wijngaarden.png`,
    homeCountryCode: "nl",
    hostCountryCode: "tw",
    year: "2026-2027",
  },
  {
    name: "Joep Greuter",
    bio: "Hoi ik ben Joep, een jongen van 17 jaar uit Enkhuizen. Ik zal volgend mijn leven tijdig verhuizen naar de suburbs van Philadelphia Pennsylvania te Abington (op 2 uur rijden met de auto vanaf NYC). Ik heb mijn eerste gastgezin al gesproken, hele gezellige mensen (een American-Ecuadorian family). Als ik aankom in Amerika gaan we vrijwel meteen met z'n allen kamperen, nog voordat school begint. Ik ben nog nooit in Amerika geweest dus ben erg benieuwd hoe het leven daar is. Ik kijk er erg naar uit om nieuwe mensen te ontmoeten en nieuwe vrienden te maken. Ook ben ik benieuwd of Amerika hele grote cultuur verschillen heeft met Nederland, want in het eerste opzicht zou je denken dat ze net zoals hier een westerse levensstijl hebben. Ik moet nog wachten op de papieren van m'n school dus kan nog niet aan de slag met m'n visum. Als dat nog lang duurt gaat het nog spannend worden. Gelukkig vlieg ik pas laat, want school begint pas op 8 september. Ik koop dat alles lukt en dat ik over een paar maanden kan aansluiten bij meerdere gezellige gastgezinnen aan de oostkust van Amerika.",
    imageUrl: `https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/26-27/joep-greuter.png`,
    homeCountryCode: "nl",
    hostCountryCode: "us",
    year: "2026-2027",
  },
  {
    name: "Kiki Heusinkveld",
    bio: "Sà wàt dii!\n\nMijn naam is Kiki Heusinkveld en ik woon in Haarlem. Ik ben 15 jaar oud en ik mag volgend schooljaar naar district 3350 Thailand (centraal Thailand) 🇹🇭.\n\nThailand was mijn eerste keus en ik kijk er erg naar uit, voornamelijk om de cultuur te leren door in een Thais dorp en Thais gezin te verblijven. Ik hoop dat ik veel mango's kan eten, en lekker Thaise noodles!\n\nIk ben de taal aan het leren en de uitspraak is wel ingewikkeld, maar ik heb er nog steeds vertrouwen in. Ik kijk er vooral heel erg naar uit om naartoe te gaan, hoewel ik het ook best spannend vind, ben ik heel benieuwd hoe het daar is.\n\nSawatdee!",
    imageUrl: `https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/26-27/kiki-heusinkveld.png`,
    homeCountryCode: "nl",
    hostCountryCode: "th",
    year: "2026-2027",
  },
  {
    name: "Puck Sjardijn",
    bio: "Heyy!\n\nIk ben Puck, 16 jaar oud en ik kom uit Maassluis, Zuid-Holland. Ik ga naar het district 5060, en ik kom terecht in Yakima, Washington State in Amerika. Het is al een lange tijd een hele grote droom van mij om op Exchange te gaan en nu is het eindelijk zover! Tijdens mijn Exchange hoop ik veel van de Amerikaanse cultuur te zien, mijn Engels te verbeteren, mooie plekken te ontdekken en nieuwe vrienden te maken! Ook hoop ik natuurlijk verschillende sporten te doen op school. Ik ben vooral heel benieuwd hoe de highschool in Amerika gaat zijn.\n\nIk heb super veel zin om deze ervaring aan te gaan en ik kan niet wachten tot ik vertrek! Ik tel de dagen af :)",
    imageUrl: `https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/26-27/puck-sjardijn.png`,
    homeCountryCode: "nl",
    hostCountryCode: "us",
    year: "2026-2027",
  },
  {
    name: "Niek Munsterhuis",
    bio: "Hola!\n\nIk ben Niek, 16 jaar en woon in Meppel. Ik zit nu in havo 5 en ga deze zomer naar District 4320 in Chili 🇨🇱! Ik ben zelf nog nooit in Zuid-Amerika geweest dus de cultuur is helemaal nieuw voor mij.\n\nIk kijk er naar uit om mijn gastclub en gastouders te ontmoeten. Ook hoop ik Spaans te leren, nieuwe vrienden te maken en nieuwe dingen te ontdekken.\n\nChao!",
    imageUrl: `https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/26-27/niek-munsterhuis.png`,
    homeCountryCode: "nl",
    hostCountryCode: "cl",
    year: "2026-2027",
  },
  {
    name: "Joy Zwart",
    bio: "Hoi, ik ben Joy, 17 jaar oud en ik kom uit Bennekom. Volgend jaar ga ik naar Brazilië! Ik heb ondertussen gehoord dat ik in de stad Santos zal verblijven, een stad dichtbij São Paulo. Ik woon dat ongeveer een kwartiertje lopen van het strand af! Ik heb ontzettend veel zin om nieuwe mensen te leren kennen, de Zuid-Amerikaanse keuken te ontdekken en na 6 jaar vwo een jaar lang iets compleet nieuws en anders te gaan doen!\n\nSinds een paar jaar droom ik ervan om naar het buitenland te gaan, dus ik ben enorm dankbaar en enthousiast dat dit binnenkort werkelijkheid kan worden voor mij! Tegelijkertijd komt er ook iemand uit Brazilië naar mijn familie in Nederland, wat het extra leuk maakt.",
    imageUrl: `https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/26-27/joy-zwart.jpg`,
    homeCountryCode: "nl",
    hostCountryCode: "br",
    year: "2026-2027",
  },
  {
    name: "Elma Faber",
    bio: "Hoooi, ik ben Elma Faber, 17 jaar oud en woon in Leeuwarden. Nadat ik mijn VWO examens heb afgerond neem ik een tussenjaar. In dat tussenjaar ga ik niet niks doen, maar ga ik een jaar naar Argentinië! In het schooljaar 2026-2027 ga ik van alles beleven in de stad Córdoba. Córdoba is een grote stad met een rijke geschiedenis van cultuur en een bijzondere architectuur.\n\nIk kijk er ontzettend naar uit de cultuur daar te ontdekken, Argentijnse vrienden te maken en de Spaanse taal te leren. Bovendien ben ik heel erg benieuwd naar de stad zelf en naar het dagelijks leven in zo'n ver en ander land. Ook wil ik de mensen daar, die niet zo veel met Nederland te maken hebben, een beetje bij leren over de Nederlandse taal, tradities en de stroopwafels!\n\nIk ga jullie zo goed mogelijk op de hoogte houden van mijn uitwisselingsjaar met Rotary. En zal mijn leuke verhalen en avonturen uit Argentinië delen met jullie.",
    imageUrl: `https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/26-27/elma-faber.jpg`,
    homeCountryCode: "nl",
    hostCountryCode: "ar",
    year: "2026-2027",
  },
  {
    name: "Emma van Zutphen",
    bio: "Hoi! Mijn naam is Emma, ik ben 17 jaar oud en kom uit Marum. Volgend schooljaar ga ik op exchange naar Prince George in Canada. Ik heb er vooral zin in om nieuwe mensen te ontmoeten, mijn Engels te verbeteren en het leven daar echt mee te maken. Ook lijkt het me leuk om naar een Canadese school te gaan en gewoon alles te ervaren. Ik kijk er echt enorm naar uit!!",
    imageUrl: `https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/26-27/emma-van-zutphen.png`,
    homeCountryCode: "nl",
    hostCountryCode: "ca",
    year: "2026-2027",
  },
  {
    name: "Carmen Brust",
    bio: "Hey!!\n\nIk ben Carmen Brust en wanneer ik op exchange ga, ben ik 17 jaar oud. Ik woon in Assen, in Drenthe, en ik houd enorm van kunst en muziek!\n\nOp 8 augustus vertrek ik met veel enthousiasme naar Spokane, Washington. Het is altijd al mijn droom geweest om op uitwisseling naar Amerika te gaan! Spokane is een grote en mooie stad waar veel te doen is. Mijn eerste gastgezin is ontzettend aardig en leuk. Ze nemen mij onder andere mee naar Seattle om familie te bezoeken. Ook gaat mijn gastbroer mij leren skiën. Dat vind ik best spannend, omdat ik het nog nooit heb gedaan, maar ik heb er heel veel zin en vertrouwen in!\n\nIn Spokane ga ik naar de North Central High School en ik ben ontzettend benieuwd naar het Amerikaanse schoolleven.\n\nIk ben heel blij en dankbaar dat ik deze kans heb gekregen van de Rotary. Ik kijk enorm uit naar alle leuke, leerzame en bijzondere momenten die ik daar ga beleven!",
    imageUrl: `https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/26-27/carmen-brust.jpg`,
    homeCountryCode: "nl",
    hostCountryCode: "us",
    year: "2026-2027",
  },
  {
    name: "Amber Groffen",
    bio: 'Hi!\n\nIk ben Amber Groffen, ik ben 18 jaar oud en ik woon in Baarle-Nassau (Noord-Brabant). Ik hou heel veel van concerten, films, kamperen en afspreken met vrienden.\n\nIk ga aankomend jaar naar Canada! Ik ga wonen in de stad Brantford, Ontario. Het ligt in district 7090, een multidistrict met een deel van Canada en een deel van de VS. Ze noemen zichzelf ook wel het "Best of Friends" district. Brantford ligt ongeveer anderhalf uur af van de stad Toronto en ongeveer een uur van Niagara Falls!\n\nIk kijk er heel erg naar uit om nieuwe mensen te ontmoeten. Maar ook om de Canadese cultuur en omgeving van Brantford te ontdekken! Ik heb nog geen contact gehad met mijn eerste gezin, maar ik weet inmiddels wel naar welke school ik ga dus het begint allemaal echt te worden.\n\nIk heb er heel veel zin in en ik hoop dat ik kan terugkomen met heel veel nieuwe herinneringen!',
    imageUrl: `https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/26-27/amber-groffen.jpg`,
    homeCountryCode: "nl",
    hostCountryCode: "ca",
    year: "2026-2027",
  },
  {
    name: "Doortje Paulis",
    bio: "Hoi!!\n\nIk ben Doortje, 17 jaar oud, en ik kom uit Echt, Limburg. Vanaf deze zomer ga ik op exchange naar Finland! Ik ga wonen in Petäjävesi, een klein dorpje in de buurt van Jyväskylä.\n\nIk heb er ontzettend veel zin in en kijk erg uit naar alle nieuwe ervaringen die mij daar te wachten staan. Vooral het oriëntatiekamp in de eerste week lijkt me super leuk, omdat ik daar andere exchange studenten uit de hele wereld kan ontmoeten. Ook hoop ik mee te gaan op de Laplandreis, waar ik heel benieuwd naar ben.\n\nTijdens mijn exchange wil ik graag nieuwe vrienden maken, meer leren over andere culturen en natuurlijk Finland echt leren kennen. En misschien ontmoet ik zelfs de kerstman!",
    imageUrl: `https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/26-27/doortje-paulis.jpg`,
    homeCountryCode: "nl",
    hostCountryCode: "fi",
    year: "2026-2027",
  },
  {
    name: "Stan Heeringa",
    bio: "Hallo!\n\nIk ben Stan, 16 jaar oud en ik zit in mijn examenjaar havo. In Augustus vertrek ik naar Calgary, Alberta, Canada. Ik woon nu in Harderwijk waar ik ook mijn sponserclub heb gevonden. Toen in het schooljaar 2024/2025 twee uitwisselingsstudenten van de Rotary naar Harderwijk kwamen wist ik zeker dat ik dit ook wilde doen.\n\nIk kan niet wachten om de Canadese cultuur te leren kennen, de grote stad Calgary te verkennen en de mooie natuur van Alberta te ontdekken. Ik heb de andere uitwisseling studenten uit mijn district al leren kennen net als mijn eerste gastgezin, iedereen is super enthousiast waar ik erg blij mee ben. Ik kijk uit naar de trips met de inbound studenten, deel te zijn van een gastgezin en om de echte Canadese high school mee te maken.\n\nIk ben heel benieuwd hoe het leven buiten mijn comfort zone gaat zijn, ik kan niet wachten!",
    imageUrl: `https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/26-27/stan-heeringa.jpg`,
    homeCountryCode: "nl",
    hostCountryCode: "ca",
    year: "2026-2027",
  },
  {
    name: "Sara Jansen",
    bio: "Hoi!\n\nIk ben Sara, 15 jaar oud en ik woon in Velp (NB). Ik vertrek in September naar Spanje en ik heb er super veel zin in!\n\nIk kan niet wachten om meer van de Spaanse cultuur en taal te leren en nieuwe mensen te ontmoeten. Ik ga naar district 2201, maar ik weet nog niet welke host club ik heb en wie mijn gastgezin wordt.\n\nIk ben super dankbaar dat ik naar Spanje mag en ik heb er super veel zin in!!",
    imageUrl: `https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/26-27/sara-jansen.jpg`,
    homeCountryCode: "nl",
    hostCountryCode: "es",
    year: "2026-2027",
  },
  {
    name: "Jasmijn Mees ten Oever",
    bio: "Hoiii, ik ben jasmijn, ik ben 17 jaar en ik woon in Hengelo. En ik ga volgend jaar naar dorpje mortagne-au-perche in district 1640, Frankrijk! Ik hoop dit jaar te bereiken om de cultuur van Frankrijk te leren kennen en herinneringen te maken die ik nooit ga vergeten. Ik kijk er erg naar uit om allemaal nieuwe dingen te zien en proberen",
    imageUrl: `https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/26-27/jasmijn-mees-ten-oever.jpg`,
    homeCountryCode: "nl",
    hostCountryCode: "fr",
    year: "2026-2027",
  },
  {
    name: "Madelief van den Born",
    bio: "Hey, ik ben Madelief!\n\nIk kom uit Almere en over ongeveer 2 en een halve maand ga ik op uitwisseling naar Surabaya in Indonesië. Dat is een hele grote stad op Java. Ik heb er heel veel zin in! Ik kijk er naar uit om een hele nieuwe cultuur en plek te leren kennen. Ook vind ik het super leuk dat ik een nieuwe taal mag leren en hoop ik veel nieuwe mensen te ontmoeten en vrienden te maken. Maar dat komt vast helemaal goed! Het zal hoe dan ook een avontuur worden ;)",
    imageUrl: `https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/26-27/madelief-van-den-born.png`,
    homeCountryCode: "nl",
    hostCountryCode: "id",
    year: "2026-2027",
  },
  {
    name: "Julie de Graaf",
    bio: "Heyy!! Ik ben Julie, ik ben 15 jaar oud (word 16 op mijn exchange) en woon in Utrecht. Ik zit nu in de 4de klas van het VWO en ga na mijn exchange naar de 5de.\n\nEergisteren hoorde ik dat ik in september naar Cagliari ga, op het Italiaanse eiland Sardinië! Italië was mijn eerste keuze en ik ben echt super blij dat ik daar heen mag!! Ik ging vroeger erg vaak met mijn ouders op vakantie naar Italië, maar ben nog nooit op Sardinië geweest, dus ik ben heel erg benieuwd hoe het daar is!\n\nIk heb vooral heel veel zin om Italiaans te leren en allemaal nieuwe mensen te leren kennen (en natuurlijk het eten, het weer & de cultuur)! Ik hou heel erg veel van koken & bakken en hoop dat ik daar erg veel nieuwe dingen ga leren, in de keuken en overall. Liefs & tot volgend jaar!!",
    imageUrl: `https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/outbound/long-term/26-27/julie-de-graaf.jpg`,
    homeCountryCode: "nl",
    hostCountryCode: "it",
    year: "2026-2027",
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
