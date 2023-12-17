import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './template/App.jsx'
import './index.css'
import { BrowserRouter,Router,RouterProvider } from "react-router-dom";
import router from './router.jsx'
import { ContextProvider } from './contexts/ContextProvider.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode li>
    {/* <BrowserRouter>
      <App/>
    </BrowserRouter> */}
    <ContextProvider>
      <RouterProvider router={router}/>
    </ContextProvider>
  </React.StrictMode>,
)
