import { Routes, Route, Outlet, Link } from "react-router-dom";
import { BodyMap } from './bodyMap/BodyMap';
import Result from "./result/Result";

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
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/human-model">Human Model</Link>
            </li>
            <li>
              <Link to="/image-upload">Image Upload</Link>
            </li>
            <li>
              <Link to="/nothing-here">Nothing Here</Link>
            </li>
          </ul>
        </nav>
  
        <hr />
  
        {/* An <Outlet> renders whatever child route is currently active,
            so you can think about this <Outlet> as a placeholder for
            the child routes we defined above. */}
        <Outlet />
      </div>
    );
  }
function Home() {
    return (
        <div>
        <h2>Home</h2>
        </div>
    );
}
function ImgUpload() {
    return (
        <div>
            <h2>Upload Image</h2>
        </div>
    );
}
export default App;
