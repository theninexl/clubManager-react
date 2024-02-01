import { useContext } from 'react';
import { BrowserRouter, Navigate, useRoutes } from 'react-router-dom';
import { GlobalContextProvider, InitializeLocalStorage, useGlobalContext } from '../../providers/globalContextProvider';
import Login from '../Login';
import Home from '../Home';
import '../../scss/styles.scss';

const AppRoutes = () => {
  //guardar contexto global
  const context = useGlobalContext()
  //evalua signout
  const signOUT = localStorage.getItem('CMSign-out');
  const parsedSignOut = JSON.parse(signOUT);
  const isUserSignOut = context.signOut || parsedSignOut;

  console.log('context.signOut',context.signOut);
  console.log('parsedSignOut',parsedSignOut);
  console.log('isUserSignOut',isUserSignOut);

  let routes = useRoutes([
    {path: '/', element: !isUserSignOut ? 
      <Navigate replace to={'/main'} /> 
      : 
      <Navigate replace to={'/login'} /> 
    },
    { path: '/login', element: isUserSignOut ?
      <Login />
      :
      <Navigate replace to={'/main'} />
    },
    { path: '/main', element: !isUserSignOut ?
      <Home />
      :
      <Navigate replace to={'/login'} />
    },
  ])
  return routes;
}


export default function App() {

  InitializeLocalStorage();

  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </GlobalContextProvider>
  )
}
