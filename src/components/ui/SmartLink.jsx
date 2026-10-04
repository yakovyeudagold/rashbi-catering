import { Link, useLocation } from "react-router-dom";
import { scrollToTarget } from "../../motion/smoothScroll.js";

export default function SmartLink({ to, onClick, children, ...props }) {
  const { pathname } = useLocation();
  const [path, hash] = to.split("#");

  function handleClick(event) {
    onClick?.(event);
    if (event.defaultPrevented || !hash) return;
    if (path === "" || path === pathname) {
      event.preventDefault();
      scrollToTarget(hash);
    }
  }

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
