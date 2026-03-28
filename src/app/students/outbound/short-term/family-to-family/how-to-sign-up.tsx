import { InfoPage } from "@/components/info-page";
import { familyHowToSignUpContent } from "@/lib/data/student-info/outbound/short-term/family-to-family/how-to-sign-up";

export default function HowToSignUpScreen() {
  return <InfoPage content={familyHowToSignUpContent} />;
}
