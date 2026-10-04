export type DemoService = { id: string; title: string; active: boolean };

export const demoProfessionalProfile = {
  displayName: "Profil professionnel d’exemple",
  trade: "Métier non choisi",
  description: "Présentation fictive. Les informations ne correspondent pas à une entreprise réelle.",
  area: "Zone d’exemple · N’Djaména",
  verification: "Aucune vérification réelle",
} as const;

export const demoProfessionalServices: DemoService[] = [
  { id: "service-demo-1", title: "Service de démonstration A", active: true },
  { id: "service-demo-2", title: "Service de démonstration B", active: false },
];

export const demoWeekdays = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
] as const;
