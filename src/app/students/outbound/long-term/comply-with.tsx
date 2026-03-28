import { InfoPage } from "@/components/info-page";
import { complyWithContent } from "@/lib/data/student-info/outbound/long-term/comply-with";

export default function ComplyWithScreen() {
  return <InfoPage content={complyWithContent} />;
}
