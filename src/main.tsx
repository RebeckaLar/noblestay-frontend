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
import StayListingsPage from './pages/StayListingsPage'
import Modal from 'react-modal'
import { UserProvider } from './contexts/UserContext'
import HostingPage from './pages/HostingsPage'
import BookingsPage from './pages/BookingsPage'
import AuthLayout from './layouts/AuthLayout'
import BookingConfirmedPage from './pages/BookingConfirmedPage'

Modal.setAppElement('#root')

const router = createBrowserRouter([
  {
    path: '/', 
    element: 
    <UserProvider>
    <StayProvider>
      <RoomProvider>
        <BookingProvider>
          <RootLayout />
        </BookingProvider>
      </RoomProvider>
    </StayProvider>
    </UserProvider>
    ,
    children: [
      { 
        index: true, 
        element: <HomePage /> 
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/hostings',
            element: <HostingPage />
          },
          {
            path: '/bookings',
            element: <BookingsPage />
          },
          {
            path: '/bookingconfirmed/:id',
            element: <BookingConfirmedPage />
          }
        ]
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
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
