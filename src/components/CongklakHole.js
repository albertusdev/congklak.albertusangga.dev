import React from "react";
import PropTypes from "prop-types";

function CongklakHole(props) {
  return (
    <button
      {...props}
      className={
        "congklak-hole" +
        (props.focused ? " congklak-hole-focused" : "") +
        ` ${props.className}`
      }
      disabled={props.disabled}
      onClick={props.onClick}
      style={{
        transition: `${props.delay / 1000}s`
      }}
    >
      {props.value}
    </button>
  );
}

CongklakHole.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  focused: PropTypes.bool,
  delay: PropTypes.number.isRequired
};

CongklakHole.defaultProps = {
  className: "",
  disabled: false,
  focused: false,
  delay: 0
};

export default CongklakHole;
