import { InfoPage } from "@/components/info-page";
import { howToSignUpContent } from "@/lib/data/student-info/outbound/long-term/how-to-sign-up";

export default function HowToSignUpScreen() {
  return <InfoPage content={howToSignUpContent} />;
}
