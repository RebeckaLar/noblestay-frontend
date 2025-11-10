import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import RootLayout from './layouts/RootLayout'
import HomePage from './pages/HomePage'
import StayDetailsPage from './pages/StayDetailsPage'
import { StayProvider } from './contexts/StayContext'
// import App from './App.tsx'

const router = createBrowserRouter([
  {
    path: '/', 
    element: 
    <StayProvider>
      <RootLayout />
    </StayProvider>

    ,
    children: [
      { 
        index: true, 
        element: <HomePage /> 
      },
      {
        path: 'stays/:id',
        element: <StayDetailsPage />,
      }
    ]
    //allt i children kmr renderas ut i outlet i layouten
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>,
)
