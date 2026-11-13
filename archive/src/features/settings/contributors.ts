export interface Contributor {
  id: string;
  name: string;
  role: string;
  location: string;
}

export const contributors: Contributor[] = [
  { id: "1", name: "Ruben Talstra", role: "Lead Developer", location: "Netherlands" },
  { id: "2", name: "_Bnkn_", role: "Developer", location: "Germany" },
  { id: "3", name: "Believer", role: "Developer", location: "India" },
  { id: "4", name: "Frosted Fox", role: "UI Developer", location: "Netherlands" },
];
