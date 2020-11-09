import React from "react";
import PropTypes from "prop-types";

const Body = ({ children }) => {
  return <div>{children}</div>;
};

Body.propTypes = {
  children: PropTypes.element.isRequired
};

export default Body;
