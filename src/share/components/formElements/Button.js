import React from "react";
import { Link } from "react-router-dom";

import './Button.scss';

const Button = (props) => {
  const className = `button ${props.className}`;
  if (props.to) {
    return (
      <Link to={props.to} exact={props.exact} className={className}>
        {props.children}
      </Link>
    );
  }
  return (
    <button
      type={props.type}
      className={className}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
