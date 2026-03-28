import { InfoPage } from "@/components/info-page";
import { travelContent } from "@/lib/data/student-info/inbound/long-term/travel";

export default function TravelScreen() {
  return <InfoPage content={travelContent} />;
}
