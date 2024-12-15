import React, { forwardRef } from 'react';
import { Form } from 'react-bootstrap';

const Select = forwardRef(({ 
  label,
  value, 
  onChange, 
  options = [], 
  className = '',
  disabled = false,
  error = '',
  required = false,
  name = ''
}, ref) => {
  return (
    <Form.Group className={className}>
      {label && (
        <Form.Label>
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </Form.Label>
      )}
      <Form.Select
        ref={ref}
        value={value}
        onChange={onChange}
        disabled={disabled}
        isInvalid={!!error}
        name={name}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
      {error && (
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
});

Select.displayName = 'Select';

export default Select;
