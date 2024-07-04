import { useIsLoggedIn } from '@/api/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { auth } from '@/lib/firebsae/config';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';

type P = {
}

export default function ProtectedRoute({}: P) {
  const { toast } = useToast();
  const [isLoggedIn, authReady] = useIsLoggedIn();

  useEffect(() => {
    if (authReady && !isLoggedIn) {
      toast({
        title: "Unauthorized",
        description: "You are not authorized to view this page. Please login to continue.",
        variant: "destructive"
      })
    }
  }, [authReady, isLoggedIn])

  if (!authReady) {
    return <div>Loading...</div>
  }

  if (!auth.currentUser) {
    return <Navigate to="/login" replace/>
  } else {
    return <Outlet/>
  }
}
