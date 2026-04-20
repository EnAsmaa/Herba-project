import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Aos from "aos";
import Layout from './components/Layout';
import Home from './Pages/Home';
import Herbas from './Pages/Herbas';
import Activity from './components/Activity';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Cart from './components/Cart';
import Profile from './Pages/Profile';
import NotFound from './Pages/NotFound';
import Shop from './Pages/Shop';
import Consultation from './Pages/Consultation';
import AiTools from './components/AiTools';
import Settings from './Pages/Settings';
import HelpSupport from "./Pages/HelpSupport";
import Notification from "./Pages/Notification";
import UserDashboard from "./Pages/UserDashboard";
import HerbaDetails from "./Pages/HerbaDetails";
import DoctorInfo from "./Pages/DoctorInfo";
import FavoritePage from "./components/FavoritePage";
import PrivacyPage from "./Pages/PrivacyPage";
import PremiumPage from "./Pages/PremiumPage";

function App() {


  useEffect(() => {
    Aos.init({
      duration: 3000,
      offset: 100,
      easing: 'ease-out-back',
      once: false,
      mirror: true
    })
  }, [])

  const router = createBrowserRouter([{
    path: '', element: <Layout />, children: [
      { index: true, element: <Home /> },
      { path: 'herbas', element: <Herbas /> },
      { path: 'herbas-details', element: <HerbaDetails /> },
      { path: 'cart', element: <Cart /> },
      { path: 'profile', element: <Profile /> },
      { path: 'activity', element: <Activity /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'DoctorInfo', element: <DoctorInfo /> },
      { path: 'aitools', element: <AiTools /> },
      { path: 'store', element: <Shop /> },
      { path: 'consultation', element: <Consultation /> },
      { path: 'settings', element: <Settings /> },
      { path: 'userDashboard', element: <UserDashboard /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'helpSupport', element: <HelpSupport /> },
      {path:'notification',element: <Notification/>},
      {path:'favorites',element:<FavoritePage/>},
      {path:'premium',element:<PremiumPage/>},

      { path: '*', element: <NotFound /> },
    ]
  }])


  return <>
    <RouterProvider router={router}></RouterProvider>
  </>

}

export default App
