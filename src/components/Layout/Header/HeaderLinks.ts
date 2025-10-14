// HeaderLinks.ts
import { UserIcon, PlaneIcon, PlusIcon, BoardIcon } from "@/components/icons";

export const HeaderLinks = [
  { 
    href: "/", 
    label: "Main", 
    icon: false, 
    inHeader: true, 
    inMenu: false 
  },
  {
    href: "/example",
    label: "Example",
    icon: BoardIcon,
    inHeader: true,
    inMenu: "mobile",
  },
  {
    href: "/create",
    label: "Create",
    icon: PlusIcon,
    inHeader: true,
    inMenu: "mobile",
  },
  {
    href: "/stats",
    label: "My Stats",
    icon: UserIcon,
    inHeader: false,
    inMenu: "always",
  },
  {
    href: "/trips",
    label: "My Trips",
    icon: PlaneIcon,
    inHeader: false,
    inMenu: "always",
  },
];
