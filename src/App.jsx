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
import Profile from './Pages/Profile';
import NotFound from './Pages/NotFound';
import Market from './Pages/Market';
import Consultation from './Pages/Consultation/Consultation';
import AiTools from './components/AiTools';
import PrivacyPage from "./Pages/PrivacyPage";
import HelpSupport from "./Pages/HelpSupport";
import Notification from "./Pages/Notification";
import PremiumPage from "./Pages/PremiumPage";
import FavoritePage from "./components/FavoritePage";
import IdealWeightCalc from "./Pages/IdealWeightCalc"
import ImageAnalysis from "./Pages/ImageAnalysis"
import UserDashboard from "./Pages/UserDashboard"
import NutritionCalculator from "./Pages/NutritionCalculator"
import ConsultationDetails from "./Pages/Consultation/AskConsultation";
import ReplyConsultation from "./Pages/Consultation/ReplyConsultation";
import { useTranslation } from "react-i18next";
import ProtectedRoot from "./components/ProtectedRoot";
import AskConsultation from "./Pages/Consultation/AskConsultation";
import MyConsultations from "./Pages/Consultation/MyConsultations";
import Cart from "./components/Cart";
import OrderSuccess from "./Pages/OrderSuccess";
function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir =
      i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  Aos.init();
  const router = createBrowserRouter([{
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectedRoot allowedRoles={['user', 'doctor']}><Home /></ProtectedRoot> },
      { path: 'herbas', element: <ProtectedRoot allowedRoles={['user', 'doctor']}><Herbas /></ProtectedRoot> },
      { path: 'cart', element: <ProtectedRoot allowedRoles={['user', 'doctor']}><Cart /></ProtectedRoot> },
      { path: 'profile', element: <ProtectedRoot allowedRoles={['user', 'doctor']}><Profile /></ProtectedRoot> },
      { path: 'activity', element: <ProtectedRoot allowedRoles={['user', 'doctor']}><Activity /></ProtectedRoot> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'aitools', element: <ProtectedRoot allowedRoles={['user', 'doctor']}><AiTools /></ProtectedRoot> },
      { path: 'market', element: <ProtectedRoot allowedRoles={['user', 'doctor']}><Market /></ProtectedRoot> },
      { path: 'consultation', element: <ProtectedRoot allowedRoles={['user', 'doctor']}> <Consultation /></ProtectedRoot> },
      { path: 'helpSupport', element: <ProtectedRoot allowedRoles={['user', 'doctor']}><HelpSupport /></ProtectedRoot> },
      { path: 'privacy', element: <ProtectedRoot allowedRoles={['user', 'doctor']}><PrivacyPage /></ProtectedRoot> },
      { path: 'herbas-details/:id', element: <ProtectedRoot allowedRoles={['user', 'doctor']}><HerbaDetails /></ProtectedRoot> },
      { path: 'premium', element: <ProtectedRoot allowedRoles={['user', 'doctor']}><PremiumPage /></ProtectedRoot> },
      { path: 'notification', element: <ProtectedRoot allowedRoles={['user', 'doctor']}><Notification /></ProtectedRoot> },
      { path: 'favorites', element: <ProtectedRoot allowedRoles={['user', 'doctor']}><FavoritePage /></ProtectedRoot> },
      { path: 'weight-calc', element: <ProtectedRoot allowedRoles={['user', 'doctor']}><IdealWeightCalc /></ProtectedRoot> },
      { path: 'image-analysis', element: <ProtectedRoot allowedRoles={['user', 'doctor']}><ImageAnalysis /></ProtectedRoot> },
      { path: 'user-dashboard', element: <ProtectedRoot allowedRoles={['user', 'doctor']}><UserDashboard /></ProtectedRoot> },
      { path: 'nutrition', element: <ProtectedRoot allowedRoles={['user', 'doctor']}><NutritionCalculator /></ProtectedRoot> },
      { path: 'ask-consultation/:id', element: <ProtectedRoot allowedRoles={['user']}><AskConsultation /></ProtectedRoot> },
      { path: 'reply-consultation', element: <ProtectedRoot allowedRoles={['doctor']}><ReplyConsultation /></ProtectedRoot> },
      { path: 'my-consultation', element: <ProtectedRoot allowedRoles={['user', 'doctor']}><MyConsultations /></ProtectedRoot> },
      { path: 'order-success', element: <ProtectedRoot allowedRoles={['user', 'doctor']}><OrderSuccess /></ProtectedRoot> },

      { path: '*', element: <NotFound /> },
    ]
  }])


  return <>
    <RouterProvider router={router}></RouterProvider>
  </>

}

export default App
