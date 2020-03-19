import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ disabled, height, icon, onClick, text, type }) => (
  <button
    disabled={disabled}
    className={`button button--${type} button--${height}`}
    onClick={onClick}
    type="button"
  >
    {text}
    {icon && <img alt="icon" className="button__icon" src={icon} />}
  </button>
);

Button.defaultProps = {
  disabled: false,
  height: 'normal',
  icon: undefined,
  type: 'primary'
};

Button.propTypes = {
  disabled: PropTypes.bool,
  height: PropTypes.oneOf(['small', 'normal']),
  icon: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary'])
};

export default Button;
