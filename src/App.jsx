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
import Privacy from "./Pages/Privacy";
import HelpSupport from "./Pages/HelpSupport";
import Notification from "./Pages/Notification";

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
      { path: 'privacy', element: <Privacy /> },
      {path:'notification',element: <Notification/>},
      { path: '*', element: <NotFound /> },
    ]
  }])


  return <>
    <RouterProvider router={router}></RouterProvider>
  </>

}

export default App
