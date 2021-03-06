import "./Footer.scss";

import * as React from "react";
const logo = require("@fider/assets/images/logo-small.png");

export const Footer = () => {
  return (
    <div id="c-footer">
      <div className="ui container">
        <a target="_blank" href="https://getfider.com/">
          <img src={logo} alt="Fider" />
          <span>Powered by Fider</span>
        </a>
      </div>
    </div>
  );
};
