import { Routes, Route, Outlet, Link } from "react-router-dom";
import { BodyMap } from './bodyMap/BodyMap';
import Result from "./result/Result";
import ImgUpload from "./ImgUpload/ImgUpload"; 

function App() {
    return(
        <div>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="image-upload" element={<ImgUpload />} />
                    <Route path="human-model" element={<BodyMap />} />
                    <Route path="result" element={<Result />} />
                    
                </Route>
            </Routes>
        </div>
    )
    
}
function Layout() {
    return (
      <div>
        {/* A "layout route" is a good place to put markup you want to
            share across all the pages on your site, like navigation. */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to="/human-model">Human Model</Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to="/image-upload">Image Upload</Link>
                </li>
                
            </ul>
          </div>
        </nav>
  
        {/* An <Outlet> renders whatever child route is currently active,
            so you can think about this <Outlet> as a placeholder for
            the child routes we defined above. */}
        <Outlet />
      </div>
    );
  }
function Home() {
    return (
        <div className="container">
          <h2>Home</h2>
        </div>
    );
}
export default App;
