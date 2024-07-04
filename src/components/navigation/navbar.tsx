import { useNavigate } from "react-router"
import { ChevronLeft } from 'lucide-react'
import { Button } from "../ui/button";
import { useIsLoggedIn, useSignout } from "@/api/hooks/useAuth";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, authReady] = useIsLoggedIn();
  
  const canGoBack = window.history.state.idx > 0

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
        {isLoggedIn
          ? <Button onClick={onSignOut}>Sign out</Button>
          : ""
        }
      </div>
    </div>
  )
}
