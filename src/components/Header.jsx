import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="main-header">
      <div className="container">
        <div className="logo">
          <Link to="/">Shorely</Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className="auth-buttons">
          {user ? (
            <>
              <span>Welcome, {user.email}</span>
              <button className="btn btn-outline" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="btn btn-outline">
                Sign In
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
