import { useToast } from '@/components/ui/use-toast';
import { auth } from '@/lib/firebsae/config';
import { Navigate, Outlet } from 'react-router';

type P = {
}

export default function ProtectedRoute({}: P) {
  const { toast } = useToast();
  const isAuthenticated = auth.currentUser !== null;
  if (!isAuthenticated) {
    toast({
      title: "Unauthorized",
      description: "You are not authorized to view this page. Please login to continue.",
      variant: "destructive"
    })
  }
  return isAuthenticated ? <Outlet/> : <Navigate to="/login" replace/>
}
