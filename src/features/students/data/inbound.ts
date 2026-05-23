/**
 * Inbound students data (Class of 2025-2026)
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
    name: "Alejandra Lopez Avilla",
    bio: "Ik ben Alejandra López Avila en ik kom uit Tucumán, Argentinië. Ik ben 16 jaar oud en ik woon in een klein stadje genaamd Spanbroek. Ik heb niet veel hobby's, maar ik ben begonnen met tennissen toen ik hier aankwam.\n\nI was inspired by my older siblings to join the Rotary Youth Exchange. I wanted to learn another culture and language, it's a way to open your mind and connect with the world. It's definitely a once in a lifetime experience that I get to live.\n\nI hope that by the end of the year I grow up and mature as a person, also learn how to speak fluent dutch and integrate to the culture.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/25-26/alejandra-lopez-avilla.jpg",
    homeCountryCode: "ar",
    hostCountryCode: "nl",
    year: "2025-2026",
  },
  {
    name: "Alma Agoston",
    bio: "Ik ben Alma, ik ben 17 jaar en ik kom uit Italië, uit Verona. Ik hou van dansen en piano spelen.\n\nI decided to do an exchange year because I believe that this is an opportunity that can change your life. By travelling you get to know so much more about the world, about new cultures, about new people and yourself too.\n\nI really hope that by the end of the year I'll be very sad to go back home, and that might sound weird, but that means that I've had tons of fun here in the Netherlands, and which I'm already having after two months.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/25-26/alma-agoston.jpg",
    homeCountryCode: "it",
    hostCountryCode: "nl",
    year: "2025-2026",
  },
  {
    name: "Alois Meunier",
    bio: "Ik ben Aloïs Meunier. Ik koom uit Frankrijk. Ik ben 17 jaar oud. Mijn hobbies zijn: muziek luisteren, singen en triathlon.\n\nI joined this exchange because my professionnal project is to become a mathematics teacher in the university here in Netherlands.\n\nI expect to be fluent in Dutch and to know in which university I want to go in Netherlands.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/25-26/alois-meunier.jpg",
    homeCountryCode: "fr",
    hostCountryCode: "nl",
    year: "2025-2026",
  },
  {
    name: "Andre Moreno",
    bio: "Ik ben André Moreno, Ik ben 16 jaar oud en ik kom uit Brazilië en in Nederland ik woon in Gemert, Ik speel basketbal.\n\nI join in the exchange for to learn a new culture and a new language.\n\nI expect a nice year with a lot of new experiences.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/25-26/andre-moreno.jpg",
    homeCountryCode: "br",
    hostCountryCode: "nl",
    year: "2025-2026",
  },
  {
    name: "Angelica Manetti",
    bio: "Ik ben Angelica Manetti, ik kom uit Italië, ik ben zeventien jaar oud en mijn hobby's zijn koken en volleybal.\n\nWhy did you join this exchange?\nI decided to take part in this exchange program to discover new cultures and traditions, but above all for personal growth—to push myself out of my comfort zone and prove to myself that I can do it. Before leaving, I knew it would be very difficult, but I also knew I could handle it, and I still believe that now, because opportunities like this aren't available to everyone.\n\nWhat you expect to be at the end of the year.\nBy the end of the year, I expect to have learned English very well—and, above all, to be able to speak Dutch well. I also expect to leave the Netherlands feeling nostalgic for the friends I've made during the year, especially the other exchange students. I hope to have learned what it really means to be away for a year from my friends and from the things we hold dearest.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/25-26/angelica-manetti.jpg",
    homeCountryCode: "it",
    hostCountryCode: "nl",
    year: "2025-2026",
  },
  {
    name: "Anna Julia Lima",
    bio: "Ik ben Anna en ik kom uit Brazilië. Ik ben zestien jaar oud en ik woon nu in Nederland voor mijn uitwisseling. Ik vind het leuk om nieuwe mensen te leren kennen en meer over de Nederlandse cultuur te ontdekken. In mijn vrije tijd maak ik graag foto's, reis ik naar nieuwe plekken en hou ik van mode. Ook luister ik graag naar muziek en breng ik tijd door met mijn vrienden.\n\nIk doe mee aan dit uitwisselingsprogramma omdat ik een nieuwe cultuur wil leren kennen, mijn Engels wil verbeteren en Nederlands wil leren spreken. Ik wil ook zelfstandiger worden en mensen uit verschillende landen ontmoeten. Aan het einde van het jaar verwacht ik dat ik veel over mezelf heb geleerd, mooie herinneringen heb gemaakt, beter Nederlands kan spreken en meer zelfvertrouwen heb gekregen.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/25-26/anna-julia-lima.jpg",
    homeCountryCode: "br",
    hostCountryCode: "nl",
    year: "2025-2026",
  },
  {
    name: "Aranzazu Urruti",
    bio: "Mijn naam is Zazu. Ik kom uit Argentinië. Ik ben 17 jaar oud. Ik hou van paardrijden en tennissen.\n\nIt's something I've always wanted to do, I am always interested in learning about other cultures.\n\nBecome a more confident, more dependent person and have overcome fears.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/25-26/aranzazu-urruti.jpg",
    homeCountryCode: "ar",
    hostCountryCode: "nl",
    year: "2025-2026",
  },
  {
    name: "Augusto Ziulkoski Gehlen",
    bio: "Hoi!! Ik ben Guto, ik ben 17 jaar oud en ik kom uit het zuiden van Brazilië. Ik woon nu in Epe. Mijn hobby's zijn koken, volleybal spelen, atletiek en mountainbiking. Ik wilde de uitwisseling graag doen, omdat ik van nieuwe culturen kan leren en van reizen houd. Aan het einde van het uitwisselingsjaar hoop ik Nederlands te kunnen spreken, leuke nieuwe mensen hebben ontmoet en een zelfstandiger persoon te zijn.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/25-26/augusto-ziulkoski-gehlen.jpg",
    homeCountryCode: "br",
    hostCountryCode: "nl",
    year: "2025-2026",
  },
  {
    name: "Bautistia Fidalgo",
    bio: "Hallo, ik ben Bautista fidalgo, ik kom uit Argentinië en ik ben 18 jaar oud, ik ben erg blij dat ik de kans krijg om een uitwisseling naar Nederland te doen, het is een prachtig land met een heel andere cultuur.\n\nDe reden voor deze uitwisseling was om uit mijn comfortzone te komen en kansen te krijgen om hier te studeren en de taal te leren.\n\nIk hou van bergbeklimmen, muziek luisteren, sky, surfen en ik hou van vliegtuigen.\n\nIk mis mijn vrienden en familie uit Argentinië heel erg, maar ik ontmoet mooie mensen en maak banden waarvan ik denk dat ze voor altijd zullen zijn\n\nTegen het einde van dit jaar hoop ik veel landen te zien en lekker te eten.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/25-26/bautistia-fidalgo.jpg",
    homeCountryCode: "ar",
    hostCountryCode: "nl",
    year: "2025-2026",
  },
  {
    name: "Caitlyn Bonass",
    bio: "Ik heet Caitlyn Bonass! Ik kom uit Missouri, Verenigde Staten. Ik ben achttien jaar. Ik speel volleybal, ik haak en ik zit bij scouting.\n\nI learned about RYE through a RYLA camp in Oklahoma and knew I wanted to go on exchange after meeting the students there from around the world. I'm really excited to be in the Netherlands and can't wait to learn all about the culture and language here! I want to make a difference in the world and there is no better way to try than to understand what you want to change!\n\nI love the opportunity to improve myself and learn through experience. I want to leave a long lasting impression on the people I meet and prove that an open mind and a determination to learn can take you anywhere!",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/25-26/caitlyn-bonass.jpg",
    homeCountryCode: "us",
    hostCountryCode: "nl",
    year: "2025-2026",
  },
  {
    name: "Camilla Purnomo",
    bio: "Hallo! Mijn naam is Camilla Putri Purnomo. Ik kom uit Indonesië, uit Semarang, een stad in Centraal Java met ongeveer drie miljoen inwoners. Ik ben zestien jaar oud, en ik word zeventien op elf november. In mijn vrije tijd kook ik graag en speel ik badminton. Mijn lievelingseten hier in Nederland is op dit moment kapsalon!\n\nI joined this exchange to learn more about the Netherlands and its culture. Even though the Dutch and Indonesia share a complex history, I want to promote peace and understanding between our countries. I also hope to build many meaningful connections, new families and friends, and to experience life from a completely different perspective.\n\nBy the end of the year, I hope to speak Dutch fluently and earn a Dutch language certificate. I also wish to discover a new version of myself, one that has grown through the challenges and differences between Indonesia and the Netherlands. Most of all, I hope to create beautiful and everlasting memories during my exchange year.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/25-26/camilla-purnomo.jpg",
    homeCountryCode: "id",
    hostCountryCode: "nl",
    year: "2025-2026",
  },
  {
    name: "Chelsea Armstrong",
    bio: "Ik ben Chelsea Armstrong. Ik kom uit Canada. Ik ben zestien jaar oud. Ik speel piano, en ik hou van kunst, lezen, wandelen, en in de natuur zijn.\n\nI first learned about the rotary youth exchange because my step brother went on an exchange to Switzerland. I decided to go on an exchange as well because I thought it was a really great opportunity to meet people from all over the world, learn a new language and experience being immersed in a new culture, and just to be able to try new things and step outside my comfort zone.\n\nAt the end of the year I hope I am able to speak Dutch, and I also hope that I will have made lots of amazing memories! I want to make lasting connections with all kinds of different people, and I already know that by the end of the year I will not want to leave all the people I will have met! I will have lived a completely different life, and a part of me will always be in the Netherlands.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/25-26/chelsea-armstrong.jpg",
    homeCountryCode: "ca",
    hostCountryCode: "nl",
    year: "2025-2026",
  },
  {
    name: "Cristina de Palma",
    bio: "Ik ben Cristina, ik kom uit Italië, ik ben zeventien jaar oud en ik hou van lezen, koken en boksen.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/25-26/cristina-de-palma.jpg",
    homeCountryCode: "it",
    hostCountryCode: "nl",
    year: "2025-2026",
  },
  {
    name: "Dante Peruzzo",
    bio: "Hallo! Ik ben Dante Peruzzo! Ik kom uit Argentinië. Ik ben 15 jaar. Ik vind kunst en gim leuke.\n\nI joined the exchange because my sister made two exchanges before, and she had a really good time, so I wanted to have a great time too.\n\nMy objective for the exange is to be a more sociable person, learn Dutch, make many friends and learn about the Dutch culture.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/25-26/dante-peruzzo.jpg",
    homeCountryCode: "ar",
    hostCountryCode: "nl",
    year: "2025-2026",
  },
  {
    name: "Decker Gilette",
    bio: "Hallo! Ik ben Decker. Ik ben 17 en ik kom uit California in de Verenigde Staten. Ik speel graag tennis en athletics. I chose to join the exchange in order to see the world from a new perspective and make life-long friends. I expect to be able to hold conversations in Dutch and understand more complex words. I also expect to have made a new family on the other side of the world.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/25-26/decker-gilette.jpg",
    homeCountryCode: "us",
    hostCountryCode: "nl",
    year: "2025-2026",
  },
  {
    name: "Ellie Fiano",
    bio: "Hoi hoi! Ik ben Ellie Fiano en ik ben zeventien. Ik kom uit America van een kleine staat heet Leavenworth in Washington State. Ik woon nu in Dronrijp in Friesland en het is een echt mooi dorp. Mijn hobby's zijn dans (ballet, jazz, en contemporary), piano, en schrijven!\n\nI joined the Rotary Exchange Program because I wanted to explore a place different than my hometown. Leavenworth is a very small place to live where everyone knows everyone and while it is a beautiful place, I wanted to be surrounded with something new. At the end of the year, I hope to have achieved at least B2 proficiency in Dutch and have made connections that I can return to here in the Netherlands. I wish to have grown as a person and feel more comfortable outside of my comfort zone, which I have already started to achieve!",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/25-26/ellie-fiano.jpg",
    homeCountryCode: "us",
    hostCountryCode: "nl",
    year: "2025-2026",
  },
  {
    name: "Gabriela Nadalini",
    bio: "Ik ben Gabriela, ik ben zeventien jaar oud en ik woon nu in Oudenbosch en Etten-Leur. Ik speel tennis en lees graag boeken. I wanted to do an exchange year because I think it's a once in a lifetime opportunity, and I've always wanted to travel and know more cultures. By the end of the year I expect to know how to speak Dutch and to have had the best year ever.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/25-26/gabriela-nadalini.jpg",
    homeCountryCode: "br",
    hostCountryCode: "nl",
    year: "2025-2026",
  },
  {
    name: "Jonah Favaro",
    bio: "Hoi, ik ben Jonah. Ik kom uit Idaho in de Verenigde Staten. Ik ben zestien jaar oud, en mijn hobby's zijn vintage winkelen en sporten. I joined the rotary youth exchange program for a couple of different reasons. My best friend made rotary youth exchange seem like something that could change a person's life, and I was interested in a change. She was very inspirational, and pushed me into making a choice I didn't even know I could make. Now that I'm on exchange, I also can realize that I joined to give that same change to everyone I could. Either that be through putting a good image on rotary itself, helping in my host community, or even just talking about it to anyone I know. I hope to embark on this exchange with this idea in mind until my exchange ends, and possibly even after. So, by the end of this year, I hope that I can proudly say that this year I was a good ambassador to my country, made the most of my exchange as possible, and integrated as much as possible into my host culture. I not only want to say it, but I would also like to show it, through the friends ive made and families I've stayed with and through what I've learned within ten months.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/25-26/jonah-favaro.jpg",
    homeCountryCode: "us",
    hostCountryCode: "nl",
    year: "2025-2026",
  },
  {
    name: "Joshua Bolke",
    bio: "Hallo ik ben Josh, ik heb 16 jaar en ik kom uit New York. Mijn hobbies zijn hardlopen een fietsen. I joined this exchange to be able to able to step outside my comfort zone and experience new things. I hope to be able to grow as a person developing new skills and improving my language capabilities.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/25-26/joshua-bolke.jpg",
    homeCountryCode: "us",
    hostCountryCode: "nl",
    year: "2025-2026",
  },
  {
    name: "Juan Agreda",
    bio: "Hallo allemaal, mijn naam is Juan Manuel Agreda Alván. Ik kom uit Peru, ik ben 17 jaar oud en ik hou erg van sporten, vooral van competitieve sporten zoals volleybal en voetbal. Ik dans ook een traditionele dans uit mijn land, de Marinera.\n\nWaarom heb je meegedaan aan het uitwisselingsprogramma?\n\nOmdat ik meer plekken wilde zien. Ik heb ook een droom: 1.000.000 mensen helpen, en dankzij deze fantastische uitwisseling zal ik veel leren, zodat ik veel mensen in Peru kan helpen.\n\nWat hoop je tegen het einde van het jaar bereikt te hebben?\n\nTegen het einde van het jaar wil ik een compleet ander persoon zijn, volwassener zijn en mensen veel sneller kunnen helpen dan ik nu doe. Ik heb ook geleerd dat elke prestatie een heel, heel moeilijk pad kent, zoals niet bij je ouders en familie kunnen zijn, of niet bij je vrienden kunnen zijn. Maar de rest is er, en ik, net als iedereen bij Rotary, ben klaar om deze uitdaging aan te gaan.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/25-26/juan-agreda.jpg",
    homeCountryCode: "pe",
    hostCountryCode: "nl",
    year: "2025-2026",
  },
  {
    name: "Justine Overbeck Chilcoat",
    bio: "Ik ben Justine. Ik kom uit de United States, uit California. Ik ben Achttien. Mijn hobby's zijn kust, zingen, zwemmen, en lezen.\n\nWhy did you join this exchange? - I did this exchange because I really wanted to push myself out of my comfort zone, to experience something entirely new, and to also explore a new culture and learn a new language. The majority of my family has also gone on exchange and have been a part of rotary and hearing their stories also inspired me to do this.\n\nWhat do you expect to be at the end of the year? - At the end of this I definitely expect to be a bit of a new person. To be more independent, hopefully a little more outgoing, and of course to at least be able to speak the Dutch language at a beginner level. I also expect to have some great families and friends at the end of the year that I can always come back and see.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/25-26/justine-overbeck-chilcoat.jpg",
    homeCountryCode: "us",
    hostCountryCode: "nl",
    year: "2025-2026",
  },
  {
    name: "Kaera Yata",
    bio: "Hi!!! I'm Kaera Yata. I came from Japan. I am 16 years old. My hobby is to draw pictures. I came here because I wanted to find the difference between the other countries. My goal from this year is I want to speak Dutch fluently.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/25-26/kaera-yata.jpg",
    homeCountryCode: "jp",
    hostCountryCode: "nl",
    year: "2025-2026",
  },
  {
    name: "Kolby Orriss",
    bio: "Ik ben Kolby. I kom uit Alberta, Canada. Ik ben 17 jaar oud. Sinds ik in Nederland ben, ben ik lid geworden van een handbalteam.\n\nI joined this exchange for the same reasons many of us did: to see the world, experience a new culture, and meet new people. But beyond that, I wanted to challenge myself—to discover who I am outside the expectations of friends, family, and teachers. It is a fresh start, an opportunity to explore who I am and who I can become.\n\nBy the end of the year, I hope to be able to hold conversations in Dutch and form connections with so many people from all different backgrounds. I want to grow in every aspect of myself, becoming unrecognizable in the best way possible. I hope to have a heart full of gratitude for every moment I have experience here and to carry that thankfulness with me always.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/25-26/kolby-orriss.jpg",
    homeCountryCode: "ca",
    hostCountryCode: "nl",
    year: "2025-2026",
  },
  {
    name: "Lalo Montiel",
    bio: "Ik heet Lalo Montiel. Ik ben zeventien jaar oud en ik kom uit Tulancingo, een stad in de deelstaat Hidalgo in Mexico. Ik ben een vriendelijke en nieuwsgierige persoon die graag nieuwe dingen leert en openstaat voor andere culturen.\n\nIk kom uit Tulancingo, een mooie stad omringd door bergen. De mensen daar zijn erg vriendelijk en de Mexicaanse cultuur is warm en kleurrijk. In mijn stad is eten heel belangrijk, en er is altijd muziek en gezelligheid.\n\nIk ben zeventien jaar oud en ik zit nog op de middelbare school. Dit uitwisselingsjaar is een groot avontuur voor mij.\n\nIk hou heel veel van muziek, want het helpt mij om te ontspannen en mezelf te uiten. Ik kijk ook graag films in mijn vrije tijd, en ik speel en kijk graag voetbal. Muziek, sport en films maken mij altijd blij.\n\nWhy did you join this exchange?\nIk heb besloten om aan dit uitwisselingsprogramma mee te doen omdat ik unieke ervaringen wilde opdoen en wilde zien hoe mensen in andere delen van de wereld hun leven leiden. Ik wil leren van andere culturen en mijn manier van denken verbreden.\n\nWhat do you expect to be at the end of the year?\nAan het einde van het jaar hoop ik dat ik als persoon gegroeid ben, dat ik meer over mezelf heb geleerd en dat ik veel bijzondere mensen heb ontmoet die ik voor de rest van mijn leven zal blijven herinneren.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/25-26/lalo-montiel.jpg",
    homeCountryCode: "mx",
    hostCountryCode: "nl",
    year: "2025-2026",
  },
  {
    name: "Santiago Cuello",
    bio: "Ik ben Santiago Cuello, Ik kom uit Chile vanuit de stad Iquique. Ik ben 16 jaar, ik hou van surfen, atletiek, en piano spelen en ik woon hier in Woudenberg.\n\nI wanted to go on an exchange because I wanted to live a new life, try new cultures, learn new languages and try to gather more maturity and see life in multiple ways. I have been interested in going into an exchange for a long time and also thinking about how my life would be without my family and friends. But I would admit that Netherlands wasn't my first choice, it was never a place that I imagined that I would end up doing an exchange, but here I am and I have to say that I was prove that I deserved to be here and that was the correct choice to stick with this country and explore something completely new and learn all from 0. I expect that at the end of my exchange a new person arrive to Chile, a person that learned all that its needed to grow and with knowledge about a totally new language and culture, also I want to get more information about medicine in the different ways that exist, learn more about the human brain and how to become a great neurosurgeon that had lived through an exchange and changed the way he sees life and people. I also want to give the best of myself in this country so people can get to know me better and realize that I am a fun person. Lastly I want to say that I want to bring things that will innovate my life in Chile or maybe tell knowledge that in my country is totally unknown, I want to arrive as a new person, a Santiago that has seen the life in a way that maybe people from my age doesn't see it as I saw it, I want to get to know abilities or things that I never thought that I was going to be able to do, like living a new life by my own, without the presence of my parents or family.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/25-26/santiago-cuello.jpg",
    homeCountryCode: "cl",
    hostCountryCode: "nl",
    year: "2025-2026",
  },
  {
    name: "Santiago Galvis Mora",
    bio: "Hallo Mijn naam is Santiago en ik kom uit Colombia. Ik ben 17 jaar oud. Mijn hobby's zijn muziek luisteren en vechtsporten.\n\nI joined this exchange because I wanted to learn about a new culture and improve my English and Dutch.\n\nAt the end of the year, I hope to be more independent, confident, and have many good memories from my time in the Netherlands.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/25-26/santiago-galvis-mora.jpg",
    homeCountryCode: "co",
    hostCountryCode: "nl",
    year: "2025-2026",
  },
  {
    name: "Silas Iverson",
    bio: "Hoi! Ik ben Silas Iverson, ik ben vijftien jaar oud, ik kom uit New Mexico, VS, en ik woon nu in Enkhuizen. Mijn hobbies zijn zwemmen, DJing, Formula 1 kijken, en sim racing. Ik heb dit exchange gedaan omdat ik wil graag de hele wereld te zien, en Nederland is echt zo anders dan thuis. At the end of the exchange, I hope to be a better, wiser, more experienced, and knowledgeable person.",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/25-26/silas-iverson.jpg",
    homeCountryCode: "us",
    hostCountryCode: "nl",
    year: "2025-2026",
  },
  {
    name: "Valentina Flores Ultramari",
    bio: "Hoi! Ik ben Valentina Flores Ultramari en ik ben 15 jaar. Ik kom uit Curitiba, in het zuiden van Brazilië. En ik woon nu in Nijkerk. Mijn hobby's zijn basketbal spelen en piano spelen. It has always been my dream to go on a long term exchange and I couldn't be more excited to be able to do it here in the Netherlands. I am really appreciative to get to know more about the Dutch culture and to experience daily life in this amazing country. At the end of the year, I expect to be able to communicate and understand Dutch, to have made connections for my whole life, as well as to have grown as a person during the year, being more confident about my decisions and having more responsibility about myself. Overall, to be able to look back at it as the best year of my life!",
    imageUrl:
      "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/images/inbound/long-term/25-26/valentina-flores-ultramari.jpg",
    homeCountryCode: "br",
    hostCountryCode: "nl",
    year: "2025-2026",
  },
];

/**
 * Current inbound students (with dynamically generated IDs)
 */
export const inboundStudents: Student[] = inboundStudentData.map((data) => ({
  ...data,
  id: generateStudentId(data.name, "inbound"),
  type: "inbound" as const,
}));
