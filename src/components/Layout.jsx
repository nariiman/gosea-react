import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="page-container">
        <Breadcrumbs />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
