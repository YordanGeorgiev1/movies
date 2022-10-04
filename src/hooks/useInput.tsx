import React, { useState } from "react";

const useInput = (validateValue: (value: string) => {}) => {
    const [enteredValue, setEnteredValue] = useState<string>("");
    const [isTouched, setIsTouched] = useState<boolean>(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const getValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredValue(e.target.value);
      };
    
    const inputBlurHandler = () => {
        setIsTouched(true);
    };

    const resetValue = () => {
        setEnteredValue('');
        setIsTouched(false);
    };

    return {
        value: enteredValue,
        hasError,
        getValue,
        inputBlurHandler,
        resetValue
    }
};

export default useInput;