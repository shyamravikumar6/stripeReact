import React from 'react';

const Field = ({
    label,
    id,
    type,
    placeholder,
    required,
    autoComplete,
    value,
    className,

    onChange
  }) => (
    <div  className={className}>
      <label htmlFor={id} className='FormRowLabel'>
        {label}
      </label>
      <input
        className='FormRowInput'
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
      />
    </div>
  );

  export default Field;