
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
import Body from './components/dashboard/Body.jsx'
import Property from './components/dashboard/Property.jsx'
import Profile from './components/dashboard/Property.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        element: <Body />,
        children: [
          {
            path: 'property',
            element: <Property />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
        ],
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
