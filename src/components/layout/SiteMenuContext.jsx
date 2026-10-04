import { useCallback, useMemo, useState } from "react";
import SiteMenu from "./SiteMenu.jsx";
import { SiteMenuContextValue } from "./siteMenuState.js";

export default function SiteMenuProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openMenu = useCallback(() => setOpen(true), []);
  const closeMenu = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ open, openMenu, closeMenu }), [open, openMenu, closeMenu]);

  return (
    <SiteMenuContextValue.Provider value={value}>
      {children}
      <SiteMenu />
    </SiteMenuContextValue.Provider>
  );
}
