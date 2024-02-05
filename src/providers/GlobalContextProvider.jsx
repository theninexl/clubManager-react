import React, { useContext, useState } from "react";

const globalContext = React.createContext();

export const useGlobalContext = () => {
  return useContext(globalContext);
}

export const InitializeLocalStorage = () => {
  const accountInLocalStorage = localStorage.getItem('CMAccount');
  const signOutInLocalStorage = localStorage.getItem('CMSign-out');
  let parsedAccount = null;
  let parsedSignOut = null;

  if (!accountInLocalStorage) {
    localStorage.setItem('CMAccount', JSON.stringify({}));
    parsedAccount = {};
  } else {
    parsedAccount = JSON.parse(accountInLocalStorage);
  }

  if (!signOutInLocalStorage) {
    localStorage.setItem('CMSign-out', JSON.stringify({}));
    parsedSignOut = {};
  } else {
    parsedSignOut = JSON.parse(signOutInLocalStorage);
  }
}

export const GlobalContextProvider = ({ children }) => {
  //acount
  const [account, setAccount] = useState({});
  //signout
  const [signOut, setSignOut] = useState(false);

  //notificaciones
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  //uploadedDocs new Player
  const [fileNewPlayerUploaded, setFileNewPlayerUploaded] = useState([]);

  return (
    <globalContext.Provider 
      value={{
        account,
        setAccount,
        signOut,
        setSignOut,
        notifications,
        setNotifications,
        unreadNotifications,
        setUnreadNotifications,
        fileNewPlayerUploaded,
        setFileNewPlayerUploaded
      }}
    >
      {children}
    </globalContext.Provider>
  );
}