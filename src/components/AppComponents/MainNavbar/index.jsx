import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../providers/globalContextProvider";
import { Navbar, NavbarContentLeft, NavbarContentRight, NavbarLinksHrz, NavbarLinksTextBtnSmall } from "../../UI/components/navbar/navbar";
import { LogoShield } from "../../UI/objects/Logo";
import { Button } from "../../UI/objects/buttons";

export const MainNavbar = () => {
  //guardar contexto global
  const context = useGlobalContext();
  console.log('context',context);

  const handleSignOut = (e) => {
    e.preventDefault();
    //seteo signout y account en localStorage y context
    const stringifiedSignOut = JSON.stringify(true);
    localStorage.setItem('CMSign-out',stringifiedSignOut);
    context.setSignOut(true);
    localStorage.removeItem('CMAccount');
    context.setAccount({});
  }

  return (
    <>
      <Navbar>
        <NavbarContentLeft>
          <Link to='/main' className='cm-o-logo'>
            <LogoShield />
            Club Manager
          </Link>
        </NavbarContentLeft>
        <NavbarContentRight>
          <NavbarLinksHrz>
            <li>
              <NavbarLinksTextBtnSmall>
                {context.account.desc_nombre}
              </NavbarLinksTextBtnSmall>
            </li>
          </NavbarLinksHrz>
          <Button
            onClick={handleSignOut}>Sign Out</Button>
        </NavbarContentRight>
      </Navbar>
    </>
  );
}