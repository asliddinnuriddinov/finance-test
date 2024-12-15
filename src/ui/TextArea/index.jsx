import React, { forwardRef } from 'react';
import { Form } from 'react-bootstrap';

const TextArea = forwardRef(({
  label,
  placeholder = '',
  className = '',
  disabled = false,
  error = '',
  required = false,
  rows = 3,
  name = '',
  ...rest
}, ref) => {
  return (
    <Form.Group className={className}>
      {label && (
        <Form.Label>
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </Form.Label>
      )}
      <Form.Control
        ref={ref}
        as="textarea"
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        isInvalid={!!error}
        name={name}
        {...rest}
      />
      {error && (
        <Form.Control.Feedback style={{marginLeft: '0.55rem'}} type="invalid">
          {error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;
