import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../providers/globalContextProvider";
import { useGetData } from "../../hooks/useGetData"
import { Api } from "../../services/api";
import { Navbar, NavbarContentLeft, NavbarContentRight, NavbarLinksHrz, NavbarLinksTextBtnSmall } from "../UI/components/navbar/navbar";
import { LogoShield } from "../UI/objects/Logo";
import { IconButtonSmallPrimary } from "../UI/objects/buttons";
import { SymbolGroup, SymbolNotifications } from "../UI/objects/symbols";
import { RegularContainer } from "../UI/layout/containers";
import { RegularHeader } from "../UI/layout/headers";
import { SelectIcon } from "../UI/components/form simple/formSimple";
import { NotificationsBubble } from "../UI/objects/notificationsBubble";


export default function TopNav () {
  //guardar contexto global
  const context = useGlobalContext();
  //evaluar account
  const account = localStorage.getItem('CMAccount');
  const parsedAccount = JSON.parse(account);
  const token = parsedAccount.token;
  //evaluar signout
  const signOUT = localStorage.getItem('CMSign-out');
  const parsedSignOut = JSON.parse(signOUT);
  const isUserSignOut = parsedSignOut;
  //estados locales
  const [userBoxOpen, setUserBoxOpen] = useState(false);
  const [headerEntities, setHeaderEntities] = useState();
  //leer pathname actual y manejar navegacion
  const path = useLocation().pathname;
  const navigate = useNavigate();

  //pedir notificaciones
  const getNotifications = useGetData('notifications/getAll');

  useEffect(()=> {
    if (getNotifications.responseGetData) {
      // console.log(getNotifications.responseGetData.data.data);
      context.setNotifications(getNotifications.responseGetData.data.data);
      const unReadNotifs = context.notifications.filter(notif => notif.leido === false);
      context.setUnreadNotifications(unReadNotifs.length)
    }
   },[getNotifications.responseGetData])

   //pedir entidades header
   const getEntities = useGetData('header/getDetail');

   useEffect(()=> {
     if (getEntities.responseGetData) {
       setHeaderEntities(getEntities.responseGetData.data.entidades);
     }
    },[getEntities.responseGetData])



  //manejar click en el boton de usuario
  const handleLogoutBox = (e) => {
    e.preventDefault();
    setUserBoxOpen(!userBoxOpen);
  }
  //manejar apertura caja de logout
  const renderLogoutBox = () => {
    if (!isUserSignOut) {
      return (
        <div className={userBoxOpen ? 'cm-c-overlay--activeUser' : 'cm-u-inactive'}>
          <Link 
            className='cm-o-overlay__notification'
            onClick={handleSignOut}>
            <div className='notification--text'>Salir</div>
          </Link>
        </div>
      );
    }
  }

  //manejar signOut
  const handleSignOut = (e) => {
    e.preventDefault();
    //seteo signout y account en localStorage y context
    const stringifiedSignOut = JSON.stringify(true);
    localStorage.setItem('CMSign-out',stringifiedSignOut);
    context.setSignOut(true);
    localStorage.removeItem('CMAccount');
    context.setAccount({});
  }

  //manejar enlace boton de usuarios
  const handleManageUsersBtn = (e) => {
    e.preventDefault();
    if (path === '/manage-users') {
      window.history.back();
    } else {
      navigate('/manage-users');
    }
  }
  
  //renderizar boton de usuarios
  const renderManageUsersBtn = () => {
    const isManageUsersActive = path.includes('/manage-users');
    return (
      <IconButtonSmallPrimary
        className={isManageUsersActive ? 'active' : ''}
        onClick={handleManageUsersBtn} >
        <SymbolGroup />
      </IconButtonSmallPrimary>
    );
  }

  //manejar enlace boton notificaciones
  const handleNotificationsBtn = (e) => {
    e.preventDefault();
    if (path === '/notifications') {
      window.history.back();
    } else {
      navigate('/notifications');
    } 
  }

  //renderizar boton notificaciones
  const renderNotificationsBtn = () => {
    const isNotificationsActive = path.includes('/notifications');
    return(
      <IconButtonSmallPrimary
        className={isNotificationsActive ? 'active' : ''}
        onClick={handleNotificationsBtn} >
        <SymbolNotifications />
        {renderNotificationsBubble()}
      </IconButtonSmallPrimary>
    );
  }

  //render notifications bubble si hay más de 1
  const renderNotificationsBubble = () => {
    // console.log('notifsBubble');
    if (context.unreadNotifications > 0) {
      return (
        <NotificationsBubble>{context.unreadNotifications}</NotificationsBubble>
      );
    }
  }

  useEffect(()=>{
    renderNotificationsBubble();
  },[path])
  

  return (    
    <RegularHeader>
      <RegularContainer>
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
                <SelectIcon
                  style={{width:'350px'}}>
                  { headerEntities?.map(item => {
                    return (
                      <option key={item.id_entidad} value={item.id_entidad}>{item.desc_entidad}</option>
                    );
                  })}
                </SelectIcon>
              </li>
              <li>
                <NavbarLinksTextBtnSmall
                  className={userBoxOpen ? 'active' : ''}
                  onClick={handleLogoutBox}>
                  {parsedAccount ? parsedAccount.desc_nombre: 'Username'}
                </NavbarLinksTextBtnSmall>
              </li>
              <li>
                {renderManageUsersBtn()}
              </li>
              <li>
                {renderNotificationsBtn()}
              </li>
            </NavbarLinksHrz>
          </NavbarContentRight>
        </Navbar>
        {renderLogoutBox()}
      </RegularContainer>
    </RegularHeader>
  );
}