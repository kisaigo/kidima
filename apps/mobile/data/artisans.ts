export type Artisan = {
  id: string;
  name: string;
  category: string;
  district: string;
  city: string;
  phone: string;
  experienceYears: number;
  services: string[];
  hours: Record<string, string>;
  rating: number;
  reviewCount: number;
  jobsCompleted: number;
  verified: boolean;
  availableToday: boolean;
  priceRange: string;
  bio: string;
  photo: string;
};

export const artisans: Artisan[] = [
  {
    id: "plombier-1",
    name: "Ali Plomberie",
    category: "Plomberie",
    district: "Moursal",
    city: "N'Djaména",
    phone: "+235 20 12 34 56",
    experienceYears: 6,
    services: ["Recherche de fuite", "Robinetterie", "Canalisations"],
    hours: { lun: "08:00–17:00", mar: "08:00–17:00", mer: "08:00–17:00", jeu: "08:00–17:00", ven: "08:00–17:00" },
    rating: 4.8,
    reviewCount: 28,
    jobsCompleted: 74,
    verified: true,
    availableToday: true,
    priceRange: "1 500 à 4 000 FCFA",
    bio: "J’interviens dans les quartiers de N’Djaména pour les réparations courantes et l’installation sanitaire. Le diagnostic est expliqué avant chaque intervention.",
    photo: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "plombier-2",
    name: "Ousmane Plomberie",
    category: "Plomberie",
    district: "Quartier central",
    city: "N'Djaména",
    phone: "+235 21 88 77 66",
    experienceYears: 12,
    services: ["Évier et sanitaires", "Installation", "Dépannage"],
    hours: { lun: "07:00–18:00", mar: "07:00–18:00", mer: "07:00–18:00", jeu: "07:00–18:00", ven: "07:00–18:00" },
    rating: 4.9,
    reviewCount: 46,
    jobsCompleted: 132,
    verified: true,
    availableToday: true,
    priceRange: "1 200 à 5 500 FCFA",
    bio: "Artisan plombier, j’accompagne les particuliers pour l’entretien, le dépannage et les travaux d’installation.",
    photo: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "electricien-1",
    name: "Karim Électricité",
    category: "Électricité",
    district: "Moursal",
    city: "N'Djaména",
    phone: "+235 22 99 00 11",
    experienceYears: 8,
    services: ["Installation", "Éclairage", "Diagnostic électrique"],
    hours: { lun: "08:00–17:00", mar: "08:00–17:00", mer: "08:00–17:00", jeu: "08:00–17:00", ven: "08:00–17:00" },
    rating: 4.7,
    reviewCount: 19,
    jobsCompleted: 61,
    verified: true,
    availableToday: false,
    priceRange: "1 800 à 6 000 FCFA",
    bio: "Dépannage, mise en sécurité et installation électrique pour les logements et petits commerces.",
    photo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "clim-1",
    name: "Nina Clim",
    category: "Climatisation",
    district: "Quartier central",
    city: "N'Djaména",
    phone: "+235 23 44 55 66",
    experienceYears: 5,
    services: ["Entretien", "Réparation", "Installation"],
    hours: { lun: "09:00–18:00", mar: "09:00–18:00", mer: "09:00–18:00", jeu: "09:00–18:00", ven: "09:00–18:00" },
    rating: 4.9,
    reviewCount: 15,
    jobsCompleted: 42,
    verified: true,
    availableToday: true,
    priceRange: "35 000 à 80 000 FCFA",
    bio: "Entretien et réparation de climatiseurs avec un devis clair avant le début des travaux.",
    photo: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "telephone-1",
    name: "Thomas Réparation",
    category: "Réparation téléphone",
    district: "Moursal",
    city: "N'Djaména",
    phone: "+235 24 55 66 77",
    experienceYears: 3,
    services: ["Écran", "Batterie", "Diagnostic"],
    hours: { lun: "10:00–19:00", mar: "10:00–19:00", mer: "10:00–19:00", jeu: "10:00–19:00", ven: "10:00–19:00" },
    rating: 4.6,
    reviewCount: 12,
    jobsCompleted: 38,
    verified: true,
    availableToday: true,
    priceRange: "4 000 à 25 000 FCFA",
    bio: "Diagnostic et réparation de téléphones avec une estimation du coût avant intervention.",
    photo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=85",
  },
];

export const categories = [
  { id: "all", label: "Tous les métiers" },
  { id: "Plomberie", label: "Plomberie" },
  { id: "Électricité", label: "Électricité" },
  { id: "Climatisation", label: "Climatisation" },
  { id: "Réparation téléphone", label: "Téléphone" },
];