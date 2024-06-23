import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Learnie</h1>
      <div>
        <Link to="/notes">
          <Button>Notes</Button>
        </Link>
      </div>
    </div>
  )
}
