/**
 * Inbound students data (Class of 2026-2027)
 * Students coming TO the Netherlands
 */

import type { Student } from "../types";
import { generateStudentId } from "../types";

/**
 * Raw inbound student data (without IDs - generated dynamically)
 */
type InboundStudentData = Omit<Student, "id" | "type">;

const inboundStudentData: InboundStudentData[] = [
  {
    name: "Abril Giuliano",
    bio: "Hallo, ik ben Abril Giuliano. Ik ben 16 jaar en kom uit Argentinië. Ik woon momenteel in Enschede.\n\nIk heb ervoor gekozen om op uitwisseling te gaan om mensen van over de hele wereld te leren kennen en nieuwe culturen en talen te ontdekken.\n\nIk vind het erg leuk om te hockeyen, te sporten in het algemeen en tijd door te brengen met mijn vrienden.\n\nIk ben heel dankbaar dat ik de kans heb gekregen om deze ervaring mee te maken en een nieuw land en een nieuwe cultuur te leren kennen.\n\nIk hoop dat dit jaar in Nederland onvergetelijk wordt en dat ik vriendschappen voor het leven zal opbouwen.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/26-27/abril-giuliano.png",
    homeCountryCode: "ar",
    hostCountryCode: "nl",
    year: "2026-2027",
  },
  {
    name: "Agustina Pavez",
    bio: "Hallo! Mijn naam is Agustina pavez, ik ben 17 jaar oud, ik kom uit Chili en ik ben in het uitwisselingsjaar 2026-2027 in Nederlands!!\n\nIk heb ervoor gekozen om op uitwisseling te gaan omdat ik het een interessante uitdaging vond die mij zou helpen om mezelf verder te ontwikkelen als persoon. Ik wilde graag uit mijn comfortzone stappen, nieuwe mensen ontmoeten en een andere cultuur leren kennen.\n\nIn mijn vrije tijd doe ik graag aan sport. Mijn favoriete sport is handbal en ik vind het leuk om actief bezig te zijn. Daarnaast hou ik ervan om uit te gaan, sociaal te zijn en tijd door te brengen met mijn familie en vrienden. Ik vind het ook leuk om nieuwe dingen te proberen en nieuwe mensen te leren kennen.\n\nIk ben erg blij en dankbaar dat ik deze bijzondere ervaring in Nederland mag meemaken. Ik heb hier al veel mooie momenten beleefd en ik hoop nog veel meer herinneringen te maken, nieuwe vrienden te leren kennen en veel te leren over de Nederlandse cultuur.\n\nIk wil eigenlijk helemaal niet dat mijn uitwisselingsjaar eindigt, omdat ik nu al weet dat ik deze ervaring en alle mensen die ik hier heb leren kennen heel erg ga missen.\n\nIk hoop dat mijn uitwisselingsjaar een mooie, bijzondere en onvergetelijke ervaring wordt!",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/26-27/agustina-pavez.jpg",
    homeCountryCode: "cl",
    hostCountryCode: "nl",
    year: "2026-2027",
  },
  {
    name: "Amelia Hinckley",
    bio: "HI my name is Amelia hinckley but most people call me Mia. I’m 17 years old. I’m from the Utah in the United States. I like doing a lot of things some of my favorite are hanging out with friends, hiking,  reading, drawing, and playing my violin. I don’t have anything to specific that I’m excited for but I want to see as much of the Netherlands as possible I want to see a lot of art and I want to try as many new things as possible.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/26-27/amelia-hinckley.jpg",
    homeCountryCode: "us",
    hostCountryCode: "nl",
    year: "2026-2027",
  },
  {
    name: "Bella-Ann Hedderman",
    bio: "Hello! I am Bella-Ann Hedderman and I am from Pennsylvania in the US. I love theater and colorguard! I love to sing and dance a lot! Colorguard is a sport with the marching band where you spin flags and other props to convey a story. I really like talking with everyone so never be afraid to talk to me! This year I am excited to learn about anything I can!",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/26-27/bella-ann-hedderman.jpg",
    homeCountryCode: "us",
    hostCountryCode: "nl",
    year: "2026-2027",
  },
  {
    name: "Caro Campos",
    bio: "Vanuit Mexico naar Nederland: ik ben Caro Campos, een Mexicaans meisje dat erg trots is op haar land, haar tradities en haar gewoonten. Mexico is verdeeld in 32 deelstaten, en één daarvan is Hidalgo, de staat waar ik vandaan kom. In deze staat ligt mijn stad, Tulancingo de Bravo.\n\nOp mijn zeventiende kan ik zeggen dat ik mezelf goed genoeg ken om te weten dat een van de dingen die ik het leukst vind, films en series kijken is. Ik vind het ook erg leuk om te tekenen en om nieuwe hobby’s te ontdekken. Ik vind het interessant om meer te weten te komen over de culturen van andere landen en de verschillen tussen ons te ontdekken, maar ook om te zien welke dingen we met elkaar gemeen hebben.\n\nDaarnaast heb ik veel interesse in Internationale Betrekkingen, vooral in diplomatie en in het begrijpen van hoe landen met elkaar omgaan. Ik vind het interessant om verschillende perspectieven, culturen en geschiedenissen te leren kennen en te begrijpen hoe landen, ondanks hun verschillen, met elkaar kunnen communiceren, samenwerken en door middel van dialoog naar oplossingen kunnen zoeken. Ik denk dat deze uitwisseling een mooie kans is om meer over deze interesse te leren, niet alleen vanuit wat ik in een klaslokaal kan leren, maar ook door een andere cultuur daadwerkelijk te ervaren en te leren kennen.\n\nWat ik van dit jaar hoop, is veel meer dan alleen een nieuwe taal leren of een nieuw land leren kennen. Ik hoop mezelf beter te leren kennen, uit mijn comfortzone te stappen en te leren omgaan met situaties die ik misschien nooit eerder had verwacht mee te maken.\n\nIk wil mensen uit verschillende delen van de wereld leren kennen, van hun culturen leren en tegelijkertijd een stukje van mijn eigen cultuur met hen delen. Ik wil een stukje van Mexico met me meenemen en tegelijkertijd naar huis terugkeren met een klein stukje van iedere plek, persoon en ervaring die deel uitmaakt van dit jaar.\n\nIk weet dat er geweldige momenten zullen zijn, maar ook moeilijke momenten, en ik wil van al deze ervaringen leren. Uiteindelijk hoop ik terug te kunnen kijken en te voelen dat dit jaar mij heeft geholpen om te groeien, zelfstandiger te worden en nieuwe dingen over de wereld en over mezelf te ontdekken.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/26-27/caro-campos.jpg",
    homeCountryCode: "mx",
    hostCountryCode: "nl",
    year: "2026-2027",
  },
  {
    name: "Charli",
    bio: "Hoi hoi! Ik ben Charli en ik kom uit Canada! Ik been achttien jaar oud en ik ben heel enthousiast om hier in Nederland te wonen!It has always been my dream to travel the world and learn about different cultures and Rotary has given me this incredible opportunity to do so. In Canada I play softball and Ringette (similar to ice hockey) but I wanted to try something new and am now playing field hockey-it’s been so much fun!I hope by the end of the year I’ve grown into a new version of myself-in the best way possible. I want to make a life for myself here and make meaningful connections with new friends and family. I want to fully immerse myself in the Dutch culture and by the end of the year be able to express myself clearly in Dutch. I’m so excited for this new chapter!",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/26-27/charli.jpg",
    homeCountryCode: "ca",
    hostCountryCode: "nl",
    year: "2026-2027",
  },
  {
    name: "Elena",
    bio: "Hi, I’m Elena and I’m from Italy! I’m 17 years old, and I decided to embark on this experience after essentially living for three months alongside an American girl who was doing her year abroad with Rotary. She was actually staying with my cousins—who live in the apartment right below mine—so I was very much a part of that experience too. Seeing her joy, her independence, and her enthusiasm really excited me, and I’m so happy to be here! Speaking of family, mine isn't very big: I have wonderful parents, an older sister who is 23, and an older brother who is almost 27. I’m the youngest!I have a very close bond with my siblings—so close, in fact, that we even got a matching tattoo together! I also have a really strong bond with my parents, something I’ve come to appreciate even more while being away from them. Of course, my family also includes my aunts, uncles, and cousins; as I mentioned earlier, they live in the apartment below mine, so we all grew up together like siblings in the courtyard shared with my grandparents, who live right next door. All in all, we’re a very close-knit family. A little about me: I attend a technical high school specializing in graphic design, and I’m currently in my fourth year. I’m completing this fourth year here in the Netherlands, and when I return to Italy, I’ll have to take a short test to move up to the next grade without losing the year I spent here. I like my school and what I do because I’m a very creative person full of ideas. I enjoy drawing, painting, and making things by hand; in fact, I created some decorated wooden pieces featuring my host family's names for them. I really love hands-on activities. In my free time, I watch a lot of movies and TV series—I’m a huge fan—and I also love baking and, above all, hanging out with friends. Friends are essential to me, and mine are like a second family.The night before I left, they serenaded me outside my house, singing all those sad songs that always make you cry! They gave me the strength and courage to set off. I also really love animals—especially kittens—and this year in Italy, I took up Pilates with my sister. I played volleyball for eleven years, but due to various issues—both physical and emotional—I had to quit, and it’s a bit of a sore subject for me now. Since then, I haven't been able to bring myself to start another team sport, so I turned to Pilates instead—which, I have to say, I really enjoy! I’m expecting lots of new experiences and changes from this trip, but above all, a lot of personal growth. I know that when I return home, I’ll be much more responsible, mature, and mindful. Change and the future have always been my biggest fears. Through this experience, I’m overcoming that fear; it certainly isn't easy—in fact, there are moments when I wonder if I made the right decision—but I know that’s normal. After all, I decided to go live on my own for a year at seventeen, and I’m proud of myself just for that. So, I think that’s everything you need to know about me!\n\nThanks you so much!\n\nElena",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/26-27/elena-it.jpg",
    homeCountryCode: "it",
    hostCountryCode: "nl",
    year: "2026-2027",
  },
  {
    name: "Elena",
    bio: "Ik ben Elena, ik ben 16 jaar oud en ik kom uit Tucumán, Argentinië, een plek vol bergen, muziek, traditie en veel persoonlijkheid. Maar als er iets is dat mij echt definieert, dan is het wel dat ik nooit tevreden ben met altijd op dezelfde plek blijven.Ik dans Argentijnse folklore sinds ik 3 jaar oud was, en na vele jaren leren heb ik onlangs een van mijn grote doelen bereikt: mezelf ontvangen als leraar folklore. Dans is een groot deel van wie ik ben en ook een van mijn favoriete manieren om een stukje Argentinië overal ter wereld mee te nemen.Ik hou van uitdagingen, nieuwe mensen ontmoeten, sporten - vooral volleybal en voetbal - en ervaringen die me uit mijn comfortzone halen. Daarom beleefde ik uiteindelijk een van de grootste avonturen van mijn leven: Argentinië verlaten en naar Nederland reizen voor een uitwisseling.Ik ben nieuwsgierig, energiek en nogal avontuurlijk. Ik zeg graag dat ik naar Nederland ben gekomen om de wereld te leren kennen, maar ik ben waarschijnlijk ook gekomen om een nieuwe versie van mezelf te ontdekken. En terwijl ik nieuwe culturen, talen en manieren van leven leer, heb ik een extra missie: ervoor zorgen dat iedereen die ik ontmoet een beetje meer weet over Argentinië. 🇦🇷🌍",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/26-27/elena-ar.png",
    homeCountryCode: "ar",
    hostCountryCode: "nl",
    year: "2026-2027",
  },
  {
    name: "Hannah Masters",
    bio: "Hoi! Ik heet Hannah Masters en ik ben 16 jaar oud. Ik kom uit Brantford, Ontario, in Canada.\n\nI chose to participate in a Rotary Youth Exchange to gain independence, immerse myself in a new culture, and connect with my familial roots here. I truly believe that gaining global perspectives and maintaining an open mind as an exchange student offers lessons that go far beyond what a traditional classroom can teach. In fact, during my very first month, I’ve already loved biking to school and getting to know my amazing host family!\n\nIn my free time, I enjoy sewing clothes and quilts, gardening, spending time with my extended family and playing the contrabass in my Canadian school band.\n\nI am so grateful for my home and host Rotary Clubs for making this opportunity possible. Over the coming months, I look forward to having detailed conversations in Dutch, becoming a more resilient and independent version of myself, and building lifelong friendships with both locals and fellow exchange students.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/26-27/hannah-masters.png",
    homeCountryCode: "ca",
    hostCountryCode: "nl",
    year: "2026-2027",
  },
  {
    name: "Irene",
    bio: "Hi, I am Irene, but everyone calls me Nene. I am sixteen years old and from Genoa, a coastal city in northern Italy surrounded by mountains.\n\nI live in the city center with my family and our 13-year-old cat, Futura. My 21-year-old sister, Elisabetta, studies at university and has been my comfort person since I was born. My dad is a fireman and my mom is a social worker; they always support me.\n\nFor 13 years, I practiced various styles of dance, though hip-hop was my favorite and the one I continued dancing until this summer. Another very important hobby of mine is theater; when I was little I did musicals, while in recent years I've done improv. This has allowed a more creative and curious part of me to develop.\n\nMy favorite subjects are math and science, so I will definitely do something related to those at university, maybe even outside of Italy. My passion for travel started thanks to my parents, who by taking me and my sister with them on every adventure showed me how wonderful it is to discover a new culture and new places with your own eyes, and to realize that perhaps the most beautiful place in existence isn't necessarily the one where we live, but rather that there is so much outside of it.\n\nI am very happy to have the opportunity to discover another culture with new habits and customs, but above all to rediscover myself and new hobbies that I might not have discovered in Italy. Ever since I was little, whenever I am in a new place I imagine my life if I had been born there, who my friends would be, and what my routine would be. This year abroad gives me the chance to discover a new routine in a new country. I hope to get to know a new culture deeply and immerse myself totally in it for a year.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/26-27/irene.jpg",
    homeCountryCode: "it",
    hostCountryCode: "nl",
    year: "2026-2027",
  },
  {
    name: "Júlia",
    bio: "Hoi, ik ben Júlia, ik ben 17 jaar oud en kom uit Brazilië. Momenteel woon ik in Uden, in het zuiden van Nederland. In mijn vrije tijd kijk ik graag films en houd van koken, lezen en sporten. Ik heb besloten deel te nemen aan reen uitwisselingsprogramma omdat ik uit mijn comfortzone wilde stappen en een nieuwe taal en cultuur wilde leren kennen. Tijdens mijn uitwisselingsjaar hoop ik veel te leren, zelfstandiger te worden, nieuwe vrienden te maken en onvergetelijke herinneringen te creëren.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/26-27/julia.jpg",
    homeCountryCode: "br",
    hostCountryCode: "nl",
    year: "2026-2027",
  },
  {
    name: "Liz",
    bio: "Hi! My name is Liz, I’m 16 and I’m from Barcelona, Spain.\n\nI’ve been doing aerial silks for four years, and it’s probably one of the things I enjoy the most. I also love watching movies and playing some videogames. My favorites foods are carbonara and sushi, so hopefully I can find some good places in the Netherlands.\n\nI decided to do this exchange because I wanted to do something different and have a cool experience. I’m excited to meet new people, see what life is like in the Netherlands and just experience a lot of new things. I’d also love to visit lots of places while I’m there and come back home with a bunch of good memories.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/26-27/liz.jpg",
    homeCountryCode: "es",
    hostCountryCode: "nl",
    year: "2026-2027",
  },
  {
    name: "Lorenzo",
    bio: "Hoi! I’m Lorenzo, I’m 16 years old, and I’m an exchange student from Brazil, from the city of Assis, São Paulo! 🇧🇷\n\nI’m really interested in art, architecture, international relations, music, and traveling. I play the violin, and I really enjoy discovering new places, learning about different cultures, and meeting new people.\n\nI’m spending my exchange year living in Bennekom and going to school in Wageningen. I’m especially excited to experience the Dutch culture at all, travel around Europe, make new friends, and, of course, learn Dutch!\n\nDoei!",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/26-27/lorenzo.jpg",
    homeCountryCode: "br",
    hostCountryCode: "nl",
    year: "2026-2027",
  },
  {
    name: "Martina Caglieris",
    bio: "Hallo, ik ben Martina Caglieris. Ik ben 16 jaar oud en kom uit Argentinië. Op dit moment woon ik in Oosterhout.\n\nIk heb ervoor gekozen om op uitwisseling te gaan omdat ik graag nieuwe mensen wil ontmoeten, andere culturen wil ontdekken en mijn Nederlands wil verbeteren.\n\nIn mijn vrije tijd doe ik graag aan sport. Ik doe aan gymnastiek en vind het leuk om actief bezig te zijn. Daarnaast vind ik het leuk om tijd door te brengen met mijn vrienden en nieuwe dingen te proberen.\n\nIk ben erg blij en dankbaar dat ik deze bijzondere ervaring in Nederland mag meemaken. Ik hoop veel mooie herinneringen te maken, nieuwe vrienden te leren kennen en veel te leren over de Nederlandse cultuur.\n\nIk hoop dat mijn uitwisselingsjaar een mooie en onvergetelijke ervaring",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/26-27/martina-caglieris.jpg",
    homeCountryCode: "ar",
    hostCountryCode: "nl",
    year: "2026-2027",
  },
  {
    name: "Naya",
    bio: "Hoi hoii! Ik ben Naya, ik ben 15 jaar oud en kom uit Surabaya, Indonesië District 3420. Ik ben dit jaar in Hengelo District 1560 als uitwisselingsstudent. Ik zit op het Montessori College Twente in 4 VWO. Ik vind het leuk om piano te spelen, muziek te luisteren en nieuwe mensen te leren kennen. Ik kijk ernaar uit om dit jaar veel nieuwe dingen te leren en Nederland beter te leren kennen! 🇮🇩🇳🇱\n\nMijn Insta: @nayanaarnederland :DD",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/26-27/naya.jpg",
    homeCountryCode: "id",
    hostCountryCode: "nl",
    year: "2026-2027",
  },
  {
    name: "Onbekend (Los Angeles)",
    bio: "I have lived in Los Angeles, USA all my life and I came to the Netherlands for the gezellig atmosphere, bike culture, and more sustainable way of life. I’m excited to learn Dutch, get involved in my area, and have new experiences. I enjoy working with nature, learning languages, and programming",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/26-27/onbekend-los-angeles.jpg",
    homeCountryCode: "us",
    hostCountryCode: "nl",
    year: "2026-2027",
  },
  {
    name: "Paola",
    bio: "Mijn naam is Paola en ik kom uit Brazilië. Ik ben 18 jaar oud en ik woon momenteel in Nederland als uitwisselingsstudent. Ik ben een nieuwsgierig en sociaal persoon, hoewel ik soms een beetje verlegen ben als ik iemand voor het eerst ontmoet. Ik vind het leuk om nieuwe plekken te ontdekken, foto’s te maken en verschillende dingen te beleven. Muziek is altijd een belangrijk onderdeel van mijn leven geweest, vooral musicals. Ik speel keyboard in de band van mijn vader. Daarnaast doe ik al jarenlang aan synchroonzwemmen, wat een groot deel van mijn leven is.\n\nIk heb ervoor gekozen om op uitwisseling te gaan omdat ik uit mijn comfortzone wilde stappen en wilde ervaren hoe het is om in een ander land te wonen. Ik kijk ernaar uit om meer over Nederland, de tradities en het dagelijks leven te leren, maar ook om een beetje van de Braziliaanse cultuur te delen met de mensen die ik ontmoet. Ik hoop dat dit jaar mij leert omgaan met nieuwe situaties, zelfstandiger te worden en de wereld vanuit een ander perspectief te bekijken. Als mijn uitwisseling voorbij is, hoop ik dat ik als persoon ben gegroeid, onvergetelijke herinneringen heb gemaakt en vriendschappen heb opgebouwd die ik nog lang zal behouden.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/26-27/paola.jpg",
    homeCountryCode: "br",
    hostCountryCode: "nl",
    year: "2026-2027",
  },
  {
    name: "Parker Johnson",
    bio: "Hallo iedereen! Mijn naam is Parker Johnson, ik ben 17 jaar oud en ik kom uit East Wenatchee, in Amerika. Ik verblijf in de stad Almere voor mijn uitwisselingsprogramma.Er zijn veel redenen waarom ik uitwisselingsstudent wilde worden en bij Rotary wilde komen. Mijn ouders moedigden me altijd aan om de wereld buiten mijn stadje te verkennen en verschillende culturen te begrijpen. Mijn moeder maakte in haar tijd deel uit van Rotary en was zelf een uitwisselingsstudent. Op een avond bracht ze het idee ter sprake om een uitwisselingsstudent te worden, en eerlijk gezegd aarzelde ik eerst een beetje. Maar kort daarna ontmoette ik enkele uitwisselingsstudenten in mijn district, en het inspireerde me echt om er zelf een te worden. Ik wilde mijn cultuur en tradities delen, stereotypen doorbreken en vriendschappen sluiten van over de hele wereld. Ik wilde ook leren over verschillende culturen en manieren van leven in vergelijking met de mijne. Het is echt prachtig om vriendschappen op te bouwen met zulke geweldige mensen door deze geweldige ervaring die ik zo dankbaar ben te hebben.Nederland is zo'n mooie plek met zijn architectuur, toegankelijke plaatsen en heerlijk eten. Ik hoop een impact te hebben in mijn gemeenschap en school, en wat ik leer van mijn uitwisseling te nemen en het te delen met mensen in mijn stad. Hoe dan ook, ik ben zo opgewonden voor mijn uitwisselingsjaar en de once-in-a-lifetime ervaringen!",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/26-27/parker-johnson.jpg",
    homeCountryCode: "us",
    hostCountryCode: "nl",
    year: "2026-2027",
  },
  {
    name: "Quinten Van Geloven",
    bio: "Hallo, ik ben Quinten Van Geloven. Ik kom uit Canada en ben 17 jaar oud. Ik houd van muziek luisteren en maken, koken en werken op de boerderij.\n\nIk vind het geweldig om dit jaar in Nederland te zijn en meer te leren over de cultuur en de taal. Ik heb voor deze uitwisseling gekozen om te ontdekken wat voor persoon ik wil worden door opnieuw contact te maken met mijn wortels; mijn grootouders zijn namelijk vanuit Haarlem naar Canada geëmigreerd.\n\nIk ben erg benieuwd hoe dit jaar zal verlopen en ik ben blij dat ik hier ben.\n\nIk hoop nog meer prachtige herinneringen te maken, een nieuwe taal te leren en blijvende vriendschappen te sluiten.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/26-27/quinten-van-geloven.jpg",
    homeCountryCode: "ca",
    hostCountryCode: "nl",
    year: "2026-2027",
  },
  {
    name: "Romane Perrée",
    bio: "Hallo, mijn naam is Romane Perrée; ik ben 16 jaar en kom uit Frankrijk, om precies te zijn uit Normandië. Ik verblijf een jaar in Nederland. Ik ga dit jaar in Leeuwarden wonen. In mijn vrije tijd houd ik van zwemmen, de zee, lezen, naar muziek luisteren, films kijken en sporten. Ik ben dan ook blij dat ik dicht bij de zee woon. Nederland was mijn eerste keuze omdat ik graag in Gent wil studeren en daarom Nederlands moet leren. Ik heb de Nederlandse cultuur ontdekt toen ik begon met het leren van de taal en dat beviel me goed.  Ik hoop dit jaar vloeiend Nederlands te leren spreken, de cultuur te leren kennen, mooie vriendschappen te sluiten, kortom: me thuis te voelen in Nederland.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/26-27/romane-perree.jpg",
    homeCountryCode: "fr",
    hostCountryCode: "nl",
    year: "2026-2027",
  },
  {
    name: "Ryu",
    bio: "Hi everyone! My name is Ryu, I’m 15 years old, and I’m from Thailand. I’m currently doing a Rotary Youth Exchange in the Netherlands and staying in Alphen aan den Rijn.\n\nI enjoy playing sports like badminton and volleyball, and I also like bouldering, and hanging out with friends. I’m really excited to experience Dutch culture, meet new people, and make new friends during my exchange year. I’m looking forward to having lots of new experiences and memories here!",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/26-27/ryu.jpg",
    homeCountryCode: "th",
    hostCountryCode: "nl",
    year: "2026-2027",
  },
  {
    name: "Sam",
    bio: "Hey, I’m Sam, and I’m from California in the US. I enjoy music, art, photography and traveling. I can play the bass guitar and the tuba, and was learning piano before leaving for exchange. I’m excited to be able to explore this year, and to meet new people.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/26-27/sam.jpg",
    homeCountryCode: "us",
    hostCountryCode: "nl",
    year: "2026-2027",
  },
  {
    name: "Telma Ulvila",
    bio: "Ik heet Telma Ulvila en ik kom uit Finland. Ik ben zeventien jaar. Mijn hobby's zijn zingen, lezen en bakken. Ik hou ook van wandelen en fietsen.\n\nIk wilde graag op uitwisseling gaan omdat ik erg geïnteresseerd ben in andere culturen en talen. Ik wilde ook graag nieuwe mensen leren kennen en zelfstandiger worden.\n\nDit jaar kijk ik ernaar uit om meer over Nederland te leren, nieuwe dingen te proberen en nieuwe plekken te bezoeken.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/26-27/telma-ulvila.png",
    homeCountryCode: "fi",
    hostCountryCode: "nl",
    year: "2026-2027",
  },
];

/**
 * Current inbound students (with dynamically generated IDs, unique per home country)
 */
export const inboundStudents: Student[] = inboundStudentData.map((data) => ({
  ...data,
  id: generateStudentId(`${data.name} ${data.homeCountryCode}`, "inbound"),
  type: "inbound" as const,
}));
