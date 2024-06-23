import { Outlet } from 'react-router-dom';
import Navbar from './components/navigation/navbar';
import { Toaster } from './components/ui/toaster';

function RootPage() {
  return (
    <div>
      <Navbar/>
      <div className='px-6 py-4'>
        <Outlet/>
      </div>
      <Toaster/>
    </div>
  );
}

export default RootPage;
