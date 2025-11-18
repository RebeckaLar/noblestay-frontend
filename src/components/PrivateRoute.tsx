import { useUser } from '@/contexts/UserContext';
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";

function PrivateRoute({ children }: PropsWithChildren) {
  const { currentUser } = useUser();
  
  if (!currentUser) {
    return <Navigate to="/" replace />;
  } else {
    return (
        <> 
          { children }
       </>
    )}
  }
export default PrivateRoute;