import React, { forwardRef } from "react";

interface InputProps {
  type?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  min?: string | number;
  max?: string | number;
  step?: number;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      id,
      name,
      placeholder,
      value,
      onChange,
      className = "",
      min,
      max,
      step,
      disabled = false,
      success = false,
      error = false,
      hint,
      ...rest
    },
    ref
  ) => {
    let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${className}`;

    if (disabled) {
      inputClasses += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed`;
    } else if (error) {
      inputClasses += ` border-error-500`;
    } else if (success) {
      inputClasses += ` border-success-500`;
    } else {
      inputClasses += ` border-gray-300`;
    }

    return (
      <div className="relative">
        <input
          ref={ref}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={inputClasses}
          {...rest}
        />

        {hint && <p className="mt-1 text-xs text-gray-500 absolute">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;