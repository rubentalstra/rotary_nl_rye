import { InfoPage } from "@/components/info-page";
import { selectionDayContent } from "@/lib/data/student-info/outbound/long-term/selection-day";

export default function SelectionDayScreen() {
  return <InfoPage content={selectionDayContent} />;
}
