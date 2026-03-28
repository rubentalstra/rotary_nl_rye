import { InfoPage } from "@/components/info-page";
import { familyComplyWithContent } from "@/lib/data/student-info/outbound/short-term/family-to-family/comply-with";

export default function ComplyWithScreen() {
  return <InfoPage content={familyComplyWithContent} />;
}
