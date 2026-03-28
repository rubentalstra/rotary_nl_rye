import { InfoPage } from "@/components/info-page";
import { languageContent } from "@/lib/data/student-info/inbound/long-term/language";

export default function LanguageScreen() {
  return <InfoPage content={languageContent} />;
}
