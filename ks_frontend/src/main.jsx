
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './store.js'

import App from './App.jsx'
import Login from './components/auth/Login.jsx'
import Register from './components/auth/Register.jsx'
import Property from './components/dashboard/Property.jsx'
import Profile from './components/dashboard/Profile.jsx'
import Hero from './components/dashboard/Hero.jsx'
import AddProperty from './components/dashboard/AddProperty.jsx'
import ViewProperty from './components/dashboard/ViewProperty.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: '/home',
        element: <Hero />,
        children: [
          {
            path: '',
            element: <Navigate to="/home/property" replace />,
          },
          {
            path: 'property',
            element: <Property />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'addproperty',
            element: <AddProperty />,
          },
          {
            path:"viewproperty",
            element:<ViewProperty></ViewProperty>
          }
        ],
      },
    ],}
  ])
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
