import {Button} from './components/ui/button';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div>
      <h1>Oops</h1>
      <p>Something went wrong</p>
      <Link to={".."} replace>
        <Button>
          Go Back
        </Button>
      </Link>
    </div>
  )
}
