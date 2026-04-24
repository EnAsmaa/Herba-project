import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Aos from "aos";
import Layout from './components/Layout';
import Home from './Pages/Home';
import Herbas from './Pages/Herbas';
import HerbaDetails from './Pages/HerbaDetails';
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
import PrivacyPage from "./Pages/PrivacyPage";
import HelpSupport from "./Pages/HelpSupport";
import Notification from "./Pages/Notification";
import PremiumPage from "./Pages/PremiumPage";
import FavoritePage from "./components/FavoritePage";
import DoctorInfo from "./Pages/DoctorInfo"
import IdealWeightCalc from "./Pages/IdealWeightCalc"
import ImageAnalysis from "./Pages/ImageAnalysis"
import UserDashboard from "./Pages/UserDashboard"
function App() {


  Aos.init()

  const router = createBrowserRouter([{
    path: '', element: <Layout />, children: [
      { index: true, element: <Home /> },
      { path: 'herbas', element: <Herbas /> },
      { path: 'cart', element: <Cart /> },
      { path: 'profile', element: <Profile /> },
      { path: 'activity', element: <Activity /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'aitools', element: <AiTools /> },
      { path: 'store', element: <Shop /> },
      { path: 'consultation', element: <Consultation /> },
      { path: 'helpSupport', element: <HelpSupport /> },
      { path: 'settings', element: <Settings /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'herbas-details', element: <HerbaDetails /> },
      { path: 'premium', element: <PremiumPage /> },
      { path: 'notification', element: <Notification /> },
      { path: 'favorites', element: <FavoritePage /> },
      { path: 'doctorinfo', element: <DoctorInfo /> },
      { path: 'weight-calc', element: <IdealWeightCalc /> },
      { path: 'image-analysis', element: <ImageAnalysis /> },
      { path: 'user-dashboard', element: <UserDashboard /> },



      { path: '*', element: <NotFound /> },
    ]
  }])


  return <>
    <RouterProvider router={router}></RouterProvider>
  </>

}

export default App
