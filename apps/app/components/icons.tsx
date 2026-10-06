import {
  ArrowDownUp,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  FilePlus2,
  Filter,
  House,
  ListChecks,
  MapPin,
  MessageCircle,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  UserRound,
  UsersRound,
  X,
  Wrench,
  Zap,
  Wind,
  Smartphone,
  Hammer,
  Scissors,
  Paintbrush,
} from "lucide-react-native";
import { colors } from "../constants/theme";

const iconSet = {
  arrowDownUp: ArrowDownUp,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  badgeCheck: BadgeCheck,
  bell: Bell,
  calendar: CalendarDays,
  check: Check,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  help: CircleHelp,
  clock: Clock3,
  create: FilePlus2,
  filter: Filter,
  home: House,
  list: ListChecks,
  location: MapPin,
  message: MessageCircle,
  search: Search,
  settings: Settings,
  shield: ShieldCheck,
  sliders: SlidersHorizontal,
  star: Star,
  user: UserRound,
  users: UsersRound,
  wrench: Wrench,
  zap: Zap,
  wind: Wind,
  smartphone: Smartphone,
  hammer: Hammer,
  scissors: Scissors,
  paintbrush: Paintbrush,
  close: X,
};

export type IconName = keyof typeof iconSet;

export function AppIcon({
  name,
  size = 20,
  color = colors.textSecondary,
  strokeWidth = 1.8,
}: {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  const IconComponent = iconSet[name];
  return <IconComponent size={size} color={color} strokeWidth={strokeWidth} aria-hidden />;
}
