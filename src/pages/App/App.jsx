import { BrowserRouter, Navigate, useRoutes } from 'react-router-dom';
import { GlobalContextProvider, InitializeLocalStorage } from '../../providers/globalContextProvider';
import { useEvaluateSignOut } from '../../hooks/useEvaluateSignOut';
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
import ManagePaymentsPage from '../ManagePayments';
import EditPlayerPaymentsPage from '../EditPlayerPayments';
import NewUserPage from '../NewUser';
import SettingsIRPFpage from '../SettingsIRPF';
import SettingsClausesPage from '../SettingsClauses';

const AppRoutes = () => {  
  const {isUserSignedOut} = useEvaluateSignOut();


  let routes = useRoutes([
    {path: '/', element: !isUserSignedOut ? 
      <Navigate replace to={'/manage-players'} /> : <Navigate replace to={'/login'} /> },
    { path: '/login', element: isUserSignedOut ?
      <Login /> : <Navigate replace to={'/manage-players'} /> },
    { path: '/main', element: !isUserSignedOut ?
      <>
        <TopNav />
        <Home />
      </> : <Navigate replace to={'/login'} /> },
    { path: '/notifications', element: !isUserSignedOut ?
    <>
      <TopNav />
      <NotificationsPage />
    </> : <Navigate replace to={'/login'} /> },
    { path: '/manage-users', element: !isUserSignedOut ?
    <>
      <TopNav />
      <ManageUsersPage />
    </> : <Navigate replace to={'/login'} /> },
    { path: '/new-user', element: !isUserSignedOut ?
    <>
      <TopNav />
      <NewUserPage />
    </> : <Navigate replace to={'/login'} /> },
    { path: '/edit-users', element: !isUserSignedOut ?
    <>
      <TopNav />
      <EditUsersPage />
    </> : <Navigate replace to={'/login'} /> },
    { path: '/manage-players', element: !isUserSignedOut ?
    <>
      <TopNav />
      <ManagePlayersPage />
    </> : <Navigate replace to={'/login'} /> },
    { path: '/new-player', element: !isUserSignedOut ?
    <>
      <TopNav />
      <NewPlayerPage />
    </> : <Navigate replace to={'/login'} /> },
    { path: '/edit-player', element: !isUserSignedOut ?
    <>
      <TopNav />
      <EditPlayerPage />
    </> : <Navigate replace to={'/login'} /> },
    { path: '/manage-teams', element: !isUserSignedOut ?
    <>
      <TopNav />
      <ManageTeamsPage/>
    </> : <Navigate replace to={'/login'} /> },
    { path: '/edit-team', element: !isUserSignedOut ?
    <>
      <TopNav />
      <EditTeamPage/>
    </> : <Navigate replace to={'/login'} /> },
    { path: '/new-team', element: !isUserSignedOut ?
    <>
      <TopNav />
      <NewTeamPage/>
    </> : <Navigate replace to={'/login'} /> },
    { path: '/manage-intermediaries', element: !isUserSignedOut ?
    <>
      <TopNav />
      <ManageIntermediariesPage/>
    </> : <Navigate replace to={'/login'} /> },
    { path: '/edit-intermediary', element: !isUserSignedOut ?
    <>
      <TopNav />
      <EditIntermediaryPage/>
    </> : <Navigate replace to={'/login'} /> },
    { path: '/new-intermediary', element: !isUserSignedOut ?
    <>
      <TopNav />
      <NewIntermediaryPage/>
    </> : <Navigate replace to={'/login'} /> },
    { path: '/manage-payments', element: !isUserSignedOut ?
    <>
      <TopNav />
      <ManagePaymentsPage/>
    </> : <Navigate replace to={'/login'} /> },
    { path: '/manage-player-payments', element: !isUserSignedOut ?
    <>
      <TopNav />
      <EditPlayerPaymentsPage/>
    </> : <Navigate replace to={'/login'} /> },
    { path: '/settings-irpf', element: !isUserSignedOut ?
      <>
        <TopNav />
        <SettingsIRPFpage />
      </> : <Navigate replace to={'/login'} /> },
    { path: '/settings-clauses', element: !isUserSignedOut ?
      <>
        <TopNav />
        <SettingsClausesPage />
      </> : <Navigate replace to={'/login'} /> },
  ])
  return routes;
}


export default function App() {  
  const publicPath = import.meta.env.VITE_PUBLIC_PATH;
  InitializeLocalStorage();

  return (
    <>    
    <GlobalContextProvider>  
      <BrowserRouter basename={publicPath}>   
        <AppRoutes />
      </BrowserRouter>
    </GlobalContextProvider>
    </>
  )
}
