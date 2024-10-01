import { useLocation, useNavigate } from "react-router-dom";
import { Navbar, NavbarLinksVert } from "../UI/components/navbar/navbar";
import { ButtonCatGhost, ButtonCatGhostDisabled } from "../UI/objects/buttons";
import { useEffect, useState } from "react";

export const AsideMenu = () => {
  //leer pathname actual y manejar navegacion
  const path = useLocation().pathname;
  const navigate = useNavigate();
  //estados locales
  const [currentUrl, setCurrentUrl] = useState();
  
  useEffect(() => {
    setCurrentUrl(path);
  },[])

  return (
    <Navbar
      className='cm-u-spacer-mt-bigger'
      style={{padding: '0 0 0 32px'}}>
      <NavbarLinksVert>
        <li>
          <ButtonCatGhost
            className={currentUrl === '/manage-players' ? 'active' : ''}
            onClick={() => navigate('/manage-players')}>
              Plantilla
          </ButtonCatGhost></li>
        <li>
          <ButtonCatGhost
            className={currentUrl === '/manage-teams' || currentUrl === '/manage-intermediaries' ? 'active' : ''}
            onClick={() => navigate('/manage-teams')}>
              Gestión relacional</ButtonCatGhost>
        </li>
        <li>
        <ButtonCatGhost
            className={currentUrl === '/manage-payments' || currentUrl === '/manage-player-payments' ? 'active' : ''}
            onClick={() => navigate('/manage-payments')}>
              Calendario de pagos</ButtonCatGhost>
        </li>
        <li>
          <a href="https://app.powerbi.com/groups/9a54adbd-f6d7-4d48-af9c-98adcc824741/reports/e1f3bb35-9edf-4ada-ab3d-f31e27f5ae51/ReportSectionb8f71aa00eee26f7eb14?experience=power-bi" target="_blank" rel="noopener noreferrer">
            <ButtonCatGhost>
              Tesoreria
            </ButtonCatGhost>
          </a>
        </li>
        <li>
          <a href="https://app.powerbi.com/groups/9a54adbd-f6d7-4d48-af9c-98adcc824741/reports/e1f3bb35-9edf-4ada-ab3d-f31e27f5ae51/ReportSection?experience=power-bi" target="_blank" rel="noopener noreferrer">
            <ButtonCatGhost>
              Reporting
            </ButtonCatGhost>
          </a>
        </li>
        <li><ButtonCatGhostDisabled>Scouting</ButtonCatGhostDisabled></li>
        <li><ButtonCatGhostDisabled>Simula tu plantilla</ButtonCatGhostDisabled></li>
      </NavbarLinksVert>
    </Navbar>
  );
}