import React from 'react';

type FormInputProps = {
  type?: string; 
  placeholder?: string;
  text?: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
};

const FormInput = ({ text, onChange, placeholder, type }: FormInputProps) => {
  return (
    <div>
      <input
        type={type}
        value={text}
        onChange={onChange}
        className="border border-gray-400 py-[7px] px-2 w-56"
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
