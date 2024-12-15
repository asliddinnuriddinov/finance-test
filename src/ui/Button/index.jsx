import React from 'react';
import { Button as BootstrapButton, Spinner } from 'react-bootstrap';

const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  className = '',
  disabled = false,
  loading = false,
  size = '',
  block,
  onClick,
  ...rest
}) => {
  const classes = [
    className,
    block ? 'w-100' : ''
  ].filter(Boolean).join(' ');

  return (
    <BootstrapButton
      variant={variant}
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      size={size}
      {...rest}
    >
      {loading ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="me-2"
          />
      ) : children}
    </BootstrapButton>
  );
};

export default Button;
