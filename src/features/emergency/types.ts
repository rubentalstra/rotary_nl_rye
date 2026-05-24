import type { IconName } from "@/lib/icons";

export interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  email?: string;
}

export interface EmergencySection {
  id: string;
  title: string;
  description?: string;
  icon: IconName;
  contacts: EmergencyContact[];
}
