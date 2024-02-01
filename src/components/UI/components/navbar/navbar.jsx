import { Link } from "react-router-dom";

export const Navbar = ({ children }) => {
  return (
    <div className={`cm-c-navbar`}>
      { children }
    </div>
  );
}

export const NavbarContentLeft = ({ children }) => {
  return (
    <div className={`cm-c-navbar__left`}>
      { children }
    </div>
  );
}

export const NavbarContentRight = ({ children }) => {
  return (
    <div className={`cm-c-navbar__right`}>
      { children }
    </div>
  );
}

export const NavbarLinksHrz = ({ children }) => {
  return (
    <ul className='navbar-links-hrz'>
      { children }
    </ul>
  );
}

export const NavbarLinksVert = ({ children }) => {
  return (
    <ul className='navbar-links-vert'>
      { children }
    </ul>
  );
}

export const NavbarLinksTextBtnSmall = ({ children, id }) => {
  return (
    <Link className='navbar-links__textbutt-small' id={id}>
      { children }
    </Link>
  );
}

