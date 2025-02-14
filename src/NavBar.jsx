import { Link } from "react-router-dom";
// import "./App.css";
import "./NavBar.css";
function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/new">New</Link>
    </nav>
  );
}

export default NavBar;
