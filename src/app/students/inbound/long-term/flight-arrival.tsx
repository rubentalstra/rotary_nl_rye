import { InfoPage } from "@/components/info-page";
import { flightArrivalContent } from "@/lib/data/student-info/inbound/long-term/flight-arrival";

export default function FlightArrivalScreen() {
  return <InfoPage content={flightArrivalContent} />;
}
