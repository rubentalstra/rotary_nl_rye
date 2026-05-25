import { useLocaleContext } from "@/lib/i18n/locale-context";

export function useTranslation() {
  return useLocaleContext();
}
