// HeaderLinks.ts
import { UserIcon, PlaneIcon, PlusIcon, BoardIcon, AboutIcon } from "@/components/icons";

export const HeaderLinks = [
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
    href: "/about",
    label: "About",
    icon: AboutIcon,
    inHeader: true,
    inMenu: "mobile",
  },
  {
    href: "/trips",
    label: "My Trips",
    icon: PlaneIcon,
    inHeader: false,
    inMenu: "always",
  },
  {
    href: "/stats",
    label: "My Stats",
    icon: UserIcon,
    inHeader: false,
    inMenu: "always",
  }
];
