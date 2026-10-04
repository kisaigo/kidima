export type Artisan = {
  id: string;
  name: string;
  category: string;
  district: string;
  city: string;
  services: string[];
  bio: string;
  demo: true;
};

// Illustrations d’interface seulement : aucun profil, avis ou disponibilité réelle.
export const artisans: Artisan[] = [
  {
    id: "plombier-1",
    name: "Profil plomberie A",
    category: "Plomberie",
    district: "Quartier d’exemple",
    city: "N’Djaména",
    services: ["Recherche de fuite", "Robinetterie", "Canalisations"],
    bio: "Présentation de démonstration d’un service de plomberie.",
    demo: true,
  },
  {
    id: "plombier-2",
    name: "Profil plomberie B",
    category: "Plomberie",
    district: "Quartier d’exemple",
    city: "N’Djaména",
    services: ["Évier et sanitaires", "Installation", "Dépannage"],
    bio: "Présentation de démonstration d’un service de plomberie.",
    demo: true,
  },
  {
    id: "electricien-1",
    name: "Profil électricité A",
    category: "Électricité",
    district: "Quartier d’exemple",
    city: "N’Djaména",
    services: ["Installation", "Éclairage", "Diagnostic électrique"],
    bio: "Présentation de démonstration d’un service électrique.",
    demo: true,
  },
  {
    id: "clim-1",
    name: "Profil climatisation A",
    category: "Climatisation",
    district: "Quartier d’exemple",
    city: "N’Djaména",
    services: ["Entretien", "Réparation", "Installation"],
    bio: "Présentation de démonstration d’un service de climatisation.",
    demo: true,
  },
  {
    id: "telephone-1",
    name: "Profil réparation A",
    category: "Réparation téléphone",
    district: "Quartier d’exemple",
    city: "N’Djaména",
    services: ["Écran", "Batterie", "Diagnostic"],
    bio: "Présentation de démonstration d’un service de réparation téléphone.",
    demo: true,
  },
];

export const categories = [
  { id: "all", label: "Tous les métiers" },
  { id: "Plomberie", label: "Plomberie" },
  { id: "Électricité", label: "Électricité" },
  { id: "Climatisation", label: "Climatisation" },
  { id: "Réparation téléphone", label: "Téléphone" },
];
