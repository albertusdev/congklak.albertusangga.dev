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
  focused: PropTypes.bool
};

CongklakHole.defaultProps = {
  className: "",
  disabled: false,
  focused: false
};

export default CongklakHole;
