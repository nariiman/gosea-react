import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  const hideRoutes = ["/signin", "/signup"];
  const shouldHideUI = hideRoutes.includes(pathname);

  return (
    <>
      {!shouldHideUI && <Header />}
      <div className="page-container">
        {/* {!shouldHideUI && <Breadcrumbs />} */}
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
