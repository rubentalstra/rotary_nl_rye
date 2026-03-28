import { InfoPage } from "@/components/info-page";
import { familyCountriesPreferenceContent } from "@/lib/data/student-info/outbound/short-term/family-to-family/countries-preference";

export default function CountriesPreferenceScreen() {
  return <InfoPage content={familyCountriesPreferenceContent} />;
}
