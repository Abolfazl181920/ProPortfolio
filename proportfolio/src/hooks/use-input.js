import { useCallback } from "react";
import { useState } from "react";

//a custom hook for input validation
//validate should be a function that return true or false and it gets the current value of an input
//require should be true or false to declare that the user should fill this input or not
const useInput = (validate, require) => {
  const [value, setValue] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [hasError, setHasError] = useState(require);
  const [isTouched, setIsTouched] = useState(false);

  //a function to store users entered value
  const onChangeHandler = (e) => {
    if (validate(e.target.value)) {
      setHasError(false);
      setIsFormValid(true);
    } else if (!validate(e.target.value)) {
      if (!require && e.target.value.trim() === "") {
        setHasError(false);
        setIsFormValid(false);
      } else {
        setHasError(true);
        setIsFormValid(false);
      }
    }
    setValue(e.target.value);
  };

  //a function to store that user touched the input for the first time
  const onBlurHandler = () => {
    setIsTouched(true);
  };

  //a function to reset all of the states to the default value
  const reset = useCallback(() => {
    setValue("");
    setIsFormValid(false);
    setHasError(require);
    setIsTouched(false);
  }, [require]);

  //returning all the values that i may need
  return {
    hasError,
    isTouched,
    isFormValid,
    value,
    setValue,
    setHasError,
    setIsFormValid,
    onChangeHandler,
    onBlurHandler,
    setIsTouched,
    reset,
  };
};

export default useInput;
