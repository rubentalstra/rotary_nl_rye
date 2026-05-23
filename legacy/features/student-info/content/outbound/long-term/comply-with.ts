import type { InfoPageContent } from "../../../types";

export const complyWithContent: InfoPageContent = {
  pageKey: "outbound-comply-with",
  header: {
    icon: "checkmark-done-outline",
    title: "Voldoen aan",
    subtitle: "Wat je nodig hebt om in aanmerking te komen",
  },
  sections: [
    {
      id: "requirements",
      blocks: [
        {
          id: "requirements-text",
          type: "text",
          content:
            "Zit je op het VMBO, HAVO of VWO dan kun je na selectie voor deze uitwisseling in aanmerking komen. Je hebt wel een Rotaryclub nodig die jou wil voordragen: een support club. Dat betekent niet dat de club jouw kosten betaalt, maar de club is verantwoordelijk voor de terug ontvangst van een jaarkind uit het buitenland. Als jij weggaat komt er ook een buitenlandse scholier terug. Een diploma is geen vereiste om je op te geven; je kunt nl ook je schoolprogramma onderbreken. Soms is dat zelfs een voordeel. In het buitenland worden namelijk vaak strenge leeftijdsgrenzen gesteld om tot een school te worden toegelaten. En om deel te kunnen nemen aan de schoolsporten is het soms beter om nog geen diploma te hebben.",
        },
      ],
    },
    {
      id: "age-requirements",
      blocks: [
        {
          id: "age-highlight",
          type: "highlight",
          items: [
            {
              icon: "calendar-outline",
              title: "Leeftijd",
              value: "15 - 18 jaar",
            },
            {
              icon: "school-outline",
              title: "Opleiding",
              value: "VMBO, HAVO of VWO",
            },
            {
              icon: "people-outline",
              title: "Support Club",
              value: "Rotaryclub sponsoring",
            },
          ],
        },
        {
          id: "age-note",
          type: "card",
          icon: "information-circle-outline",
          iconColor: "info",
          accentColor: "info",
          content:
            "Dit zijn indicatieve leeftijdsgrenzen voor overheidsscholen. Soms is enige flexibiliteit mogelijk.",
        },
      ],
    },
  ],
};
