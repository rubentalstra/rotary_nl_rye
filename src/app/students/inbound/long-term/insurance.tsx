import { InfoPage } from "@/components/info-page";
import { insuranceContent } from "@/lib/data/student-info/inbound/long-term/insurance";

export default function InsuranceScreen() {
  return <InfoPage content={insuranceContent} />;
}
