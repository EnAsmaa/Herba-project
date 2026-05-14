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
import Market from './Pages/Market';
import Consultation from './Pages/Consultation';
import AiTools from './components/AiTools';
// import Settings from './Pages/Settings';
import PrivacyPage from "./Pages/PrivacyPage";
import HelpSupport from "./Pages/HelpSupport";
import Notification from "./Pages/Notification";
import PremiumPage from "./Pages/PremiumPage";
import FavoritePage from "./components/FavoritePage";
import DoctorInfo from "./Pages/DoctorInfo"
import IdealWeightCalc from "./Pages/IdealWeightCalc"
import ImageAnalysis from "./Pages/ImageAnalysis"
import UserDashboard from "./Pages/UserDashboard"
import NutritionCalculator from "./Pages/NutritionCalculator"
import ConsultationDetails from "./Pages/ConsultationDetails";
import { useTranslation } from "react-i18next";
import ProtectedRoot from "./components/ProtectedRoot";
function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir =
      i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  Aos.init();
  const router = createBrowserRouter([{
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectedRoot><Home /></ProtectedRoot> },
      { path: 'herbas', element: <ProtectedRoot><Herbas /></ProtectedRoot> },
      { path: 'cart', element:<ProtectedRoot><Cart /></ProtectedRoot> },
      { path: 'profile', element: <ProtectedRoot><Profile /></ProtectedRoot>},
      { path: 'activity', element: <ProtectedRoot><Activity /></ProtectedRoot>},
      { path: 'login', element:<Login/> },
      { path: 'register', element:<Register />},
      { path: 'aitools', element: <ProtectedRoot><AiTools /></ProtectedRoot> },
      { path: 'market', element: <ProtectedRoot><Market /></ProtectedRoot> },
      { path: 'consultation', element:<ProtectedRoot> <Consultation /></ProtectedRoot> },
      { path: 'helpSupport', element: <ProtectedRoot><HelpSupport /></ProtectedRoot> },
      { path: 'privacy', element: <ProtectedRoot><PrivacyPage /></ProtectedRoot> },
      { path: 'herbas-details/:id', element: <ProtectedRoot><HerbaDetails /></ProtectedRoot> },
      { path: 'premium', element: <ProtectedRoot><PremiumPage /></ProtectedRoot> },
      { path: 'notification', element: <ProtectedRoot><Notification /></ProtectedRoot> },
      { path: 'favorites', element: <ProtectedRoot><FavoritePage /></ProtectedRoot> },
      { path: 'doctorinfo', element: <ProtectedRoot><DoctorInfo /></ProtectedRoot> },
      { path: 'weight-calc', element: <ProtectedRoot><IdealWeightCalc /></ProtectedRoot> },
      { path: 'image-analysis', element: <ProtectedRoot><ImageAnalysis /></ProtectedRoot> },
      { path: 'user-dashboard', element: <ProtectedRoot><UserDashboard /></ProtectedRoot> },
      { path: 'nutrition', element: <ProtectedRoot><NutritionCalculator /></ProtectedRoot> },
      { path: 'consultation-details/:id', element: <ProtectedRoot><ConsultationDetails /></ProtectedRoot> },


      { path: '*', element: <NotFound /> },
    ]
  }])


  return <>
    <RouterProvider router={router}></RouterProvider>
  </>

}

export default App
