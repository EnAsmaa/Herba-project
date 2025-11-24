import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Aos from "aos";
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Herbas from './components/Herbas/Herbas';
import Activity from './components/Activity/Activity';
import ContactUs from './components/ContactUs/ContactUs';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Cart from './components/Cart/Cart';
import Profile from './components/Profile/Profile';
import NotFound from './components/NotFound/NotFound';
import Shop from './components/Shop/Shop';
import Consultation from './components/Consultation/Consultation';
import AiTools from './components/AiTools/AiTools';

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
      { path: 'contactus', element: <ContactUs /> },
      { path: '*', element: <NotFound /> },
    ]
  }])


  return <>
    <RouterProvider router={router}></RouterProvider>
  </>

}

export default App
