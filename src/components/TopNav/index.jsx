import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../providers/globalContextProvider";
import { useGetData } from "../../hooks/useGetData"
import { Navbar, NavbarContentLeft, NavbarContentRight, NavbarLinksHrz, NavbarLinksTextBtnSmall } from "../UI/components/navbar/navbar";
import { LogoShield } from "../UI/objects/Logo";
import { IconButtonSmallPrimary } from "../UI/objects/buttons";
import { SymbolGroup, SymbolNotifications, SymbolSettings } from "../UI/objects/symbols";
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
  //evaluar signout
  const signOUT = localStorage.getItem('CMSign-out');
  const parsedSignOut = JSON.parse(signOUT);
  const isUserSignOut = parsedSignOut;
  //estados locales
  const [userBoxOpen, setUserBoxOpen] = useState(false);
  const [headerEntities, setHeaderEntities] = useState();
  const [settingsBoxOpen, setSettingsBoxOpen] = useState(false);
  //leer pathname actual y manejar navegacion
  const path = useLocation().pathname;
  const navigate = useNavigate();

  //pedir notificaciones
  // const getNotifications = useGetData('notifications/getAll');

  // useEffect(()=> {
  //   if (getNotifications.responseGetData) {
  //     if (getNotifications.responseGetData?.response?.status === 401) {
  //       //seteo signout y account en localStorage y context
  //       const stringifiedSignOut = JSON.stringify(true);
  //       localStorage.setItem('CMSign-out',stringifiedSignOut);
  //       context.setSignOut(true);
  //       localStorage.removeItem('CMAccount');
  //       context.setAccount({});
  //       navigate('/login');
  //     } else if (getNotifications.responseGetData?.data?.status == 'ok') {
  //       console.log('notificaciones pedidas desde TopNav', getNotifications.responseGetData)
  //       context.setNotifications(getNotifications.responseGetData.data.data);
  //       const unReadNotifs = context.notifications.filter(notif => (notif.flag_leido === false || notif.flag_leido === null));
  //       context.setUnreadNotifications(unReadNotifs.length)
  //     }
  //   }
  //  },[getNotifications.responseGetData])

   //pedir entidades header
   const getHeaderDetail = useGetData('header/getDetail');

   useEffect(()=> {
    if (getHeaderDetail.responseGetData) {
      console.log('Header Detail', getHeaderDetail.responseGetData);
      if (getHeaderDetail.responseGetData.status === 401) {
        //seteo signout y account en localStorage y context
        const stringifiedSignOut = JSON.stringify(true);
        localStorage.setItem('CMSign-out',stringifiedSignOut);
        context.setSignOut(true);
        localStorage.removeItem('CMAccount');
        context.setAccount({});
        navigate('/login');
      } else if (getHeaderDetail.responseGetData.status === 200) {
        if (getHeaderDetail.responseGetData?.data?.notificaciones[0].contador != 0) {
          context.setUnreadNotifications(getHeaderDetail.responseGetData?.data?.notificaciones[0].contador)
        }
        context.setEntities(getHeaderDetail.responseGetData?.data?.entidades);
      }
     }
    },[getHeaderDetail.responseGetData])



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
            className='cm-o-overlay__option'
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

  //manejar click en el boton de usuario
  const handleSettingsBox = (e) => {
    e.preventDefault();
    setSettingsBoxOpen(!settingsBoxOpen);
  }

  //manejar apertura caja de logout
  const renderSettingsBox = () => {
    if (settingsBoxOpen) {
      return (
        <div className={settingsBoxOpen ? 'cm-c-overlay--settingsOptions' : 'cm-u-inactive'}>
          <Link 
            className='cm-o-overlay__option'
            onClick={(e)=>{
              e.preventDefault();
              navigate('/settings-irpf');
              setSettingsBoxOpen(!setSettingsBoxOpen);
            }}>
            <div className='notification--text'>Conf. IRPF</div>
          </Link>
          <Link 
            className='cm-o-overlay__option'
            onClick={(e)=>{
              e.preventDefault();
              navigate('/settings-clauses');
              setSettingsBoxOpen(!setSettingsBoxOpen);
            }}>
            <div className='notification--text'>Conf. Clausulas</div>
          </Link>
        </div>
      );
    }
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

  useEffect(()=>{
    // console.log(context.entities)
    if (context.entities) {
      context.setActiveEntity(context?.entities[0]?.id_entidad)
    } 
  },[context.entities])
  

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
                  style={{width:'350px'}}
                  value={context.activeEntity}
                  onChange={(e) => {
                    context.setActiveEntity(e.target.value);                    
                  }}>
                  { context.entities?.map(item => {
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
                <IconButtonSmallPrimary
                  className={settingsBoxOpen ? 'active' : ''}
                  onClick={handleSettingsBox} >
                  <SymbolSettings/>
                </IconButtonSmallPrimary>
              </li>
              <li>
                {renderNotificationsBtn()}
              </li>
            </NavbarLinksHrz>
          </NavbarContentRight>
        </Navbar>
        {renderLogoutBox()}
        {renderSettingsBox()}
      </RegularContainer>
    </RegularHeader>
  );
}