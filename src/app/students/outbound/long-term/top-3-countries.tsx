import { InfoPage } from "@/components/info-page";
import { top3CountriesContent } from "@/lib/data/student-info/outbound/long-term/top-3-countries";

export default function Top3CountriesScreen() {
  return <InfoPage content={top3CountriesContent} />;
}
