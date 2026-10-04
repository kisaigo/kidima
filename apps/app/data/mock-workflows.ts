export type DemoRequestStatus = "Exemple à examiner" | "Exemple en attente" | "Exemple terminé";

export type DemoRequest = {
  reference: string;
  service: string;
  category: string;
  dateLabel: string;
  locationLabel: string;
  artisanLabel: string;
  status: DemoRequestStatus;
  summary: string;
};

export type DemoQuote = {
  reference: string;
  requestReference: string;
  artisanLabel: string;
  service: string;
  dateLabel: string;
  status: string;
  amountLabel: string;
  validityLabel: string;
  lineItems: { label: string; amountLabel: string }[];
};

export type DemoComplaint = {
  reference: string;
  title: string;
  dateLabel: string;
  subject: string;
  status: "Exemple reçu" | "Exemple en cours" | "Exemple clos";
  description: string;
  response: string;
  timeline: { title: string; dateLabel: string }[];
};

// Illustrative UI fixtures only: never imply a real request, offer, payment or support action.
export const demoRequests: DemoRequest[] = [
  {
    reference: "EXEMPLE-DEM-01",
    service: "Recherche de fuite",
    category: "Plomberie",
    dateLabel: "Date d’exemple · 04 oct. 2026",
    locationLabel: "Quartier d’exemple · N’Djaména",
    artisanLabel: "Aucun profil associé",
    status: "Exemple à examiner",
    summary: "Scénario fictif pour illustrer une demande sans transmission.",
  },
  {
    reference: "EXEMPLE-DEM-02",
    service: "Installation d’éclairage",
    category: "Électricité",
    dateLabel: "Date d’exemple · 02 oct. 2026",
    locationLabel: "Quartier d’exemple · N’Djaména",
    artisanLabel: "Profil artisan d’exemple",
    status: "Exemple en attente",
    summary: "Scénario fictif ; aucun artisan n’a reçu cette demande.",
  },
];

export const demoQuotes: DemoQuote[] = [
  {
    reference: "EXEMPLE-DEV-01",
    requestReference: "EXEMPLE-DEM-02",
    artisanLabel: "Profil artisan d’exemple",
    service: "Installation d’éclairage · exemple",
    dateLabel: "Date d’exemple · 03 oct. 2026",
    status: "Exemple · aucun devis transmis",
    amountLabel: "Montant non renseigné",
    validityLabel: "Validité non renseignée",
    lineItems: [
      { label: "Prestation illustrée", amountLabel: "Non renseigné" },
      { label: "Matériel illustré", amountLabel: "Non renseigné" },
    ],
  },
];

export const demoComplaints: DemoComplaint[] = [
  {
    reference: "EXEMPLE-SIG-01",
    title: "Correction d’une information de profil",
    dateLabel: "Date d’exemple · 02 oct. 2026",
    subject: "Profil artisan d’exemple · Plomberie",
    status: "Exemple en cours",
    description: "Scénario fictif illustrant le suivi d’un signalement. Aucun dossier réel n’a été créé.",
    response: "Message d’exemple : aucun échange avec une équipe support n’a eu lieu.",
    timeline: [
      { title: "Réception illustrée", dateLabel: "Date d’exemple" },
      { title: "Étape de traitement illustrée", dateLabel: "Non réelle" },
    ],
  },
  {
    reference: "EXEMPLE-SIG-02",
    title: "Demande de retrait d’une fiche fictive",
    dateLabel: "Date d’exemple · 01 oct. 2026",
    subject: "Profil artisan d’exemple · Électricité",
    status: "Exemple reçu",
    description: "Scénario fictif destiné à prévisualiser une fiche de suivi, sans traitement réel.",
    response: "Aucune réponse n’a été envoyée ; ce contenu illustre seulement l’interface.",
    timeline: [{ title: "Réception illustrée", dateLabel: "Date d’exemple" }],
  },
  {
    reference: "EXEMPLE-SIG-03",
    title: "Mise à jour d’une zone de démonstration",
    dateLabel: "Date d’exemple · 28 sept. 2026",
    subject: "Profil artisan d’exemple · Climatisation",
    status: "Exemple clos",
    description: "Scénario entièrement fictif : aucune vérification ou modification n’a été faite.",
    response: "Message de clôture fictif, sans action correspondante.",
    timeline: [
      { title: "Étape illustrative", dateLabel: "Date d’exemple" },
      { title: "Clôture illustrative", dateLabel: "Non réelle" },
    ],
  },
];
