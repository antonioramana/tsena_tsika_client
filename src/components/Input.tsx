import React from "react";

export default function Input({
  id,
  type,
  value,
  placeholder,
  label,
  icon,
  error,
  onChange,
  required = false,
}: {
  id: string;
  type: string;
  value: string;
  placeholder: string;
  label: string;
  icon?: React.ReactNode; 
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  
}) {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-lg font-medium">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>} {/* Indicateur pour les champs obligatoires */}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-2 text-myYellow">
            {icon}
          </span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          className="w-full px-10 py-3 border border-myYellow rounded-md focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-myYellow/50 transition-all duration-300 ease-in-out transform focus:scale-105"
          onChange={onChange}
          required={required} 
        />
      </div>
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
}
