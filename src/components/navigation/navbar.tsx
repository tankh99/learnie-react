import { useNavigate } from "react-router"
import { ChevronLeft } from 'lucide-react'
import { Button } from "../ui/button";
import { useSignout } from "@/api/hooks/useAuth";
import { isAuthenticated } from "@/api/hooks/auth";

export default function Navbar() {
  const navigate = useNavigate();
  
  const canGoBack = window.history.length > 2

  const signoutMutation = useSignout();

  const onSignOut = async () => {
    signoutMutation.mutate();
  }

  return (
    <div className="flex items-center justify-between py-2 px-2">
      <ChevronLeft 
        className="cursor-pointer" 
        onClick={() => navigate(-1)} 
        visibility={!canGoBack ? "hidden" : ""} />
      <p className="font-bold">Learnie</p>
      <div>
        {isAuthenticated() 
          ? <Button onClick={onSignOut}>Sign out</Button>
          : ""
        }
      </div>
    </div>
  )
}
