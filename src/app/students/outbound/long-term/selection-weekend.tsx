import { InfoPage } from "@/components/info-page";
import { selectionWeekendContent } from "@/lib/data/student-info/outbound/long-term/selection-weekend";

export default function SelectionWeekendScreen() {
  return <InfoPage content={selectionWeekendContent} />;
}
