import React from "react";
import PropTypes from "prop-types";

function CongklakHole(props) {
  return (
    <button
      className={
        "congklak-hole" + (props.focused ? " congklak-hole-focused" : "")
      }
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

CongklakHole.propTypes = {
  value: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  focused: PropTypes.bool
};

CongklakHole.defaultProps = {
  disabled: false,
  focused: false
};

export default CongklakHole;
