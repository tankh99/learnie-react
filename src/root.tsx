import { Outlet, Link } from 'react-router-dom';
import Navbar from './components/navigation/navbar';
import { Button } from './components/ui/button';

function RootPage() {
  return (
    <div>
      <Navbar/>

      <div className='px-7 py-4'>
        <Outlet/>
      </div>
    </div>
  );
}

export default RootPage;
