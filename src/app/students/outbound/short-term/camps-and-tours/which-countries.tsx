import { InfoPage } from "@/components/info-page";
import { whichCountriesContent } from "@/lib/data/student-info/outbound/short-term/camps-and-tours/which-countries";

export default function WhichCountriesScreen() {
  return <InfoPage content={whichCountriesContent} />;
}
