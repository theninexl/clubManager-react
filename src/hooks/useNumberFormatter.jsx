import { useState } from "react";

export function useNumberFormatter(initialValue = '') {
  const [value, setValue] = useState(initialValue);

  const formatNumber = (inputValue) => {
    const numericValue = inputValue.replace(/\D/g, '');
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formattedValue;
  };

  const handleChange = (event) => {
    setValue(formatNumber(event.target.value));
  };

  return {
    value,
    formatnr: handleChange,
  };
}