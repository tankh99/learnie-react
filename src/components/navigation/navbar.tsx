import { useLocation, useNavigation, useNavigate } from "react-router"
import { ChevronLeft } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  // TODO: This doesn't result in an always correct back logic. To find a better condition
  const canGoBack = location.key !== "default";
  return (
    <div className="flex items-center justify-between py-2">
      <ChevronLeft 
        className="cursor-pointer" 
        onClick={() => navigate(-1)} 
        visibility={!canGoBack ? "hidden" : ""} />
      <p className="font-bold">Learnie</p>
      <div></div>
    </div>
  )
}
