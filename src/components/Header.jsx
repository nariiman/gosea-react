import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Header() {
  const { user, logout, loading } = useAuth();

  if (loading) return null;

  const getDisplayName = (user) =>
    user?.displayName || user?.email?.split("@")[0] || "User";

  const getInitials = (user) => {
    const name = getDisplayName(user);
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="main-header">
      <div className="container header-content">
        {/* Logo */}
        <div className="logo">
          <Link to="/">Shorely</Link>
        </div>

        {/* Navigation */}
        <nav className="nav-links">
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
            {user && (
              <li>
                <Link to="/bookings">My Bookings</Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div className="auth-buttons">
          {user ? (
            <>
              <div className="user-info">
                {user.photoURL ? (
                  <img className="avatar" src={user.photoURL} alt="User" />
                ) : (
                  <div className="avatar fallback">{getInitials(user)}</div>
                )}
                <span className="user-name">{getDisplayName(user)}</span>
              </div>
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
