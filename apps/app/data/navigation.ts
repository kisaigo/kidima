import type { IconName } from "../components/icons";

type AppTab = { label: string; icon: IconName; route: string };

export const APP_TABS: readonly AppTab[] = [
  { label: "Accueil", icon: "home", route: "/" },
  { label: "Artisans", icon: "users", route: "/artisans" },
  { label: "Demandes", icon: "create", route: "/demande" },
  { label: "Activité", icon: "list", route: "/demandes" },
  { label: "Profil", icon: "user", route: "/profil" },
] as const;
