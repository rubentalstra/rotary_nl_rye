/**
 * Emergency feature types
 */

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
  icon: string;
  contacts: EmergencyContact[];
}
