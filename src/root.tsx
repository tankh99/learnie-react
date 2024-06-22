import { Outlet, Link } from 'react-router-dom';

function RootPage() {
  return (
    <div>
      Main page and prob navbar?
      <Link to={"/test"}>To test</Link>
      <Outlet/>
    </div>
  );
}

export default RootPage;
