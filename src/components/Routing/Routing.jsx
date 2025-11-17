import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../Layout/Layout'
import Home from './../Home/Home';
import Herbas from './../Herbas/Herbas';
import Activity from '../Activity/Activity';
import Features from './../Features/Features';
import ContactUs from './../ContactUs/ContactUs';
import Login from './../Login/Login';
import Register from './../Register/Register';
import Cart from './../Cart/Cart';
import Profile from './../Profile/Profile';
import NotFound from './../NotFound/NotFound';
import Shop from '../Shop/Shop';
import Consultation from '../Consultation/Consultation';


export default function Routing() {
    const router = createBrowserRouter([{
      path: '', element: <Layout/>, children:[
        {index:true, element:<Home/>},
        {path:'herbas', element:<Herbas/>},
        {path:'cart', element:<Cart/>},
        {path:'profile', element:<Profile/>},
        {path:'activity', element:<Activity/>},
        {path:'login', element:<Login/>},
        {path:'register', element:<Register/>},
        {path:'features', element:<Features/>},
        {path:'store', element:<Shop/>},
        {path:'consultation', element:<Consultation/>},
        {path:'contactus', element:<ContactUs/>},
        {path:'*', element:<NotFound/>},
      ]
    }])


    return<>
      <RouterProvider router={router}></RouterProvider>
    </>
}
