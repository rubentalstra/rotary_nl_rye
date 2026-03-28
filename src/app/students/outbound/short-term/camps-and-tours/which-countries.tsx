import { InfoPage } from "@/components/info-page";
import { campsWhichCountriesContent } from "@/lib/data/student-info/outbound/short-term/camps-and-tours/which-countries";

export default function WhichCountriesScreen() {
  return <InfoPage content={campsWhichCountriesContent} />;
}
