import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserDetails from './components/userDetails.jsx'
import {store} from './store.js'


import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { Provider } from 'react-redux'
import Taskboard from './components/Taskboard.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/userDetails",
    element: <UserDetails/>,
  },
  {
    path: "/Taskboard",
    element: <Taskboard/>,
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  </Provider>
)