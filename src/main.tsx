import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import RootLayout from './layouts/RootLayout'
import HomePage from './pages/HomePage'
import StayDetailsPage from './pages/StayDetailsPage'
import { StayProvider } from './contexts/StayContext'
import { RoomProvider } from './contexts/RoomContext'
import { BookingProvider } from './contexts/BookingContext'
import BookingReview from './pages/BookingReviewPage'
import PrivateRoute from './components/PrivateRoute'
import StayListingsPage from './pages/StayListingsPage'
import CreateStayPage from './pages/CreateStayPage'
// import App from './App.tsx'

const router = createBrowserRouter([
  {
    path: '/', 
    element: 
    <StayProvider>
      <RoomProvider>
        <BookingProvider>
          <RootLayout />
        </BookingProvider>
      </RoomProvider>
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
      },
      {
        path: 'booking-review',
        element: <BookingReview />
      },
      {
        path: 'stays',
        element: <StayListingsPage />
      },
      {
        path: 'create',
        element: <CreateStayPage />
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
