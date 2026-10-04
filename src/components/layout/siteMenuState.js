import { createContext, useContext } from "react";

export const SiteMenuContextValue = createContext({
  open: false,
  openMenu: () => {},
  closeMenu: () => {},
});

export function useSiteMenu() {
  return useContext(SiteMenuContextValue);
}
