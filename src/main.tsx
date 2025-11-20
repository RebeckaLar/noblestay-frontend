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
import CreateStayForm from './components/CreateStayForm'
// import App from './App.tsx'

import Modal from 'react-modal'
import { UserProvider } from './contexts/UserContext'
import Profile from './pages/Profile'
import HostingPage from './pages/HostingsPage'
import BookingsPage from './pages/BookingsPage'
import AuthLayout from './layouts/AuthLayout'

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
            path: '/profile',
            element: <Profile />
          },
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
      // {
      //   path: 'profile',
      //   element: 
      //   <PrivateRoute>
      //     <Profile />
      //   </PrivateRoute>
      // },
      // {
      //   path: 'create',
      //   element: 
      //   <PrivateRoute>
      //     <CreateStayForm />
      //   </PrivateRoute>
      // },
      {
        path: 'bookings',
        element: 
        <PrivateRoute>
          <BookingsPage />
        </PrivateRoute>
      },
      {
        path: 'hostings',
        element: 
        <PrivateRoute>
          <HostingPage />
        </PrivateRoute>
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
