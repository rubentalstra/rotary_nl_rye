import { InfoPage } from "@/components/info-page";
import { welcomeContent } from "@/lib/data/student-info/inbound/long-term/welcome";

export default function WelcomeScreen() {
  return <InfoPage content={welcomeContent} />;
}
