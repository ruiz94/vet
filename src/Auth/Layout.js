import React from "react";

import "./Layout.scss";

const Layout = ({ children }) => {
  return (
    <div className="layout-auth">
      <div className="card">{children}</div>
    </div>
  );
};

export default Layout;
