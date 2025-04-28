"use client";

const DateInput = ({
  label,
  name,
  value,
  onChange,
  min,
  error,
  disabled = false,
  placeholder,
  required = false,
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={name} className="text-gray-700 font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 ${
          error ? "border-red-500" : "border-gray-300"
        } ${disabled ? "bg-gray-100 text-gray-500" : "bg-white"}`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <p className="text-xs text-gray-500">Format: YYYY-MM-DD</p>
    </div>
  );
};

export default DateInput;
