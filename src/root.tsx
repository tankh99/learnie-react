import { Outlet, Link } from 'react-router-dom';
import Navbar from './components/navigation/navbar';

function RootPage() {
  return (
    <div>
      <Navbar/>
      <Link to={"/test"}>To test</Link>
      <Outlet/>
    </div>
  );
}

export default RootPage;
