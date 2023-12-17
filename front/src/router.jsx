import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import App from "./template/App";
import Ticket from "./pages/Ticket";
import DIsplay from "./pages/Display";
import Call from "./pages/Call";
import Entry from "./template/Entry";
import Test from "./test";
import Responsable from "./pages/responsable";



const router=createBrowserRouter([
    
    {
        path : '/',
        element: <App/>,
        children:[
            {
                path:'/',
                element:<Ticket/>,
                children:[
                    {
                      path:'/test',
                      element:<Test/>
                    }
                ]
            },
            {
                path:'/display',
                element:<DIsplay/>
            },
            {
                path:'/call',
                element:<Call/>
            },
            {
                path:'/manager',
                element:<Responsable/>
            },
        ]
    },
    
    {
        path : '/',
        element:<Entry/>,
        children:[
            {
                path:'/login',
                element:<Login/>
            },
        ]
    }

])

export default router