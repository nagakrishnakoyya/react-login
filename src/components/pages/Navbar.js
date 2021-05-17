import { Link, useHistory } from "react-router-dom";
import Logo from "../../logo.svg";

const Navbar = ({ setAuth }) => {
  const histoty = useHistory();
  const logoutUser = () => {
    setAuth(false);
    localStorage.removeItem("access_token");
    histoty.push("/");
  };
  return (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark">
      <Link className="navbar-brand" to="/home">
        <img src={Logo} style={{ height: 40 }} alt="Logo" />
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/home">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <button className="btn btn-info" onClick={logoutUser}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
