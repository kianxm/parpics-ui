import { useState } from "react";

export const useForm = (callback: () => void, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = event.target;

    setValues({
      ...values,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
