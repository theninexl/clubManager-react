import React, { useContext, useState } from "react";

const globalContext = React.createContext();

export const useGlobalContext = () => {
  return useContext(globalContext);
}

export const InitializeLocalStorage = () => {
  console.log('inicializo LS');
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
  console.log('parsedAccount',parsedAccount);

  if (!signOutInLocalStorage) {
    localStorage.setItem('CMSign-out', JSON.stringify({}));
    parsedSignOut = {};
  } else {
    parsedSignOut = JSON.parse(signOutInLocalStorage);
  }

  console.log('parsedSignOut',parsedSignOut);
}

export const GlobalContextProvider = ({ children }) => {

  //acount
  const [account, setAccount] = useState({});
  //signout
  const [signOut, setSignOut] = useState(false);

  return (
    <globalContext.Provider 
      value={{
        account,
        setAccount,
        signOut,
        setSignOut
      }}
    >
      {children}
    </globalContext.Provider>
  );
}