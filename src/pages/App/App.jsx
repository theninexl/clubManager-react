
import { BrowserRouter, Navigate, useRoutes } from 'react-router-dom';
import { GlobalContextProvider, InitializeLocalStorage, useGlobalContext } from '../../providers/globalContextProvider';
import TopNav from '../../components/TopNav';
import Login from '../Login';
import Home from '../Home';
import '../../scss/styles.scss';
import NotificationsPage from '../Notifications';
import ManageUsersPage from '../ManageUsers';
import EditUsersPage from '../EditUsers';
import ManagePlayersPage from '../ManagePlayers';
import NewPlayerPage from '../NewPlayer';
import EditPlayerPage from '../EditPlayer';
import ManageTeamsPage from '../ManageTeams';
import ManageIntermediariesPage from '../ManageIntermediaries';
import EditTeamPage from '../EditTeam';
import NewTeamPage from '../NewTeam';
import EditIntermediaryPage from '../EditIntermediary';
import NewIntermediaryPage from '../NewIntermediary';


const AppRoutes = () => {
  //guardar contexto global
  const context = useGlobalContext()
  //evalua signout
  const signOUT = localStorage.getItem('CMSign-out');
  const parsedSignOut = JSON.parse(signOUT);
  const isUserSignOut = context.signOut || parsedSignOut;


  let routes = useRoutes([
    {path: '/', element: !isUserSignOut ? 
      <Navigate replace to={'/main'} /> : <Navigate replace to={'/login'} /> },
    { path: '/login', element: isUserSignOut ?
      <Login /> : <Navigate replace to={'/main'} /> },
    { path: '/main', element: !isUserSignOut ?
      <>
        <TopNav />
        <Home />
      </> : <Navigate replace to={'/login'} /> },
    { path: '/notifications', element: !isUserSignOut ?
    <>
      <TopNav />
      <NotificationsPage />
    </> : <Navigate replace to={'/login'} /> },
    { path: '/manage-users', element: !isUserSignOut ?
    <>
      <TopNav />
      <ManageUsersPage />
    </> : <Navigate replace to={'/login'} /> },
    { path: '/edit-users', element: !isUserSignOut ?
    <>
      <TopNav />
      <EditUsersPage />
    </> : <Navigate replace to={'/login'} /> },
    { path: '/manage-players', element: !isUserSignOut ?
    <>
      <TopNav />
      <ManagePlayersPage />
    </> : <Navigate replace to={'/login'} /> },
    { path: '/new-player', element: !isUserSignOut ?
    <>
      <TopNav />
      <NewPlayerPage />
    </> : <Navigate replace to={'/login'} /> },
    { path: '/edit-player', element: !isUserSignOut ?
    <>
      <TopNav />
      <EditPlayerPage />
    </> : <Navigate replace to={'/login'} /> },
    { path: '/manage-teams', element: !isUserSignOut ?
    <>
      <TopNav />
      <ManageTeamsPage/>
    </> : <Navigate replace to={'/login'} /> },
    { path: '/edit-team', element: !isUserSignOut ?
    <>
      <TopNav />
      <EditTeamPage/>
    </> : <Navigate replace to={'/login'} /> },
    { path: '/new-team', element: !isUserSignOut ?
    <>
      <TopNav />
      <NewTeamPage/>
    </> : <Navigate replace to={'/login'} /> },
    { path: '/manage-intermediaries', element: !isUserSignOut ?
    <>
      <TopNav />
      <ManageIntermediariesPage/>
    </> : <Navigate replace to={'/login'} /> },
    { path: '/edit-intermediary', element: !isUserSignOut ?
    <>
      <TopNav />
      <EditIntermediaryPage/>
    </> : <Navigate replace to={'/login'} /> },
    { path: '/new-intermediary', element: !isUserSignOut ?
    <>
      <TopNav />
      <NewIntermediaryPage/>
    </> : <Navigate replace to={'/login'} /> },
  ])
  return routes;
}


export default function App() {
  InitializeLocalStorage();

  return (
    <>    
    <GlobalContextProvider>  
      <BrowserRouter>   
        <AppRoutes />
      </BrowserRouter>
    </GlobalContextProvider>
    </>
  )
}
