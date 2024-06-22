import { Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <div>
      Main page and prob navbar?
      <Link to={"/test"}>To test</Link>
      <Outlet/>
    </div>
  );
}

export default App;
