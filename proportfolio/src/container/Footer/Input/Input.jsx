import { useEffect } from "react";
import useInput from "../../../hooks/use-input";

//an input component to make the web app cleaner for validating and etc
const Input = (props) => {
  //all the values that the component can get from props
  const {
    validate,
    require,
    changeValue,
    changeIsValid,
    htmlFor,
    label,
    type,
    placeholder,
    getError,
    name
  } = props;

  //using useInput custom hook
  const {
    hasError,
    isFormValid,
    isTouched,
    onBlurHandler,
    value,
    onChangeHandler,
  } = useInput(validate, require);

  //useEffect should execute just if value, hasError and isFormValid have different values
  useEffect(() => {
    changeValue?.(value);
    changeIsValid?.(!hasError && isFormValid);
  }, [value, hasError, isFormValid]);

  return (
    <>
      <label htmlFor={htmlFor}>
        {label}
        {require && (
          <span>
            <sup>*</sup>
          </span>
        )}
      </label>
      {type === "explanation" ? (
        <textarea
          type={type}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          placeholder={placeholder}
          id={htmlFor}
          value={value}
          name={name}
        ></textarea>
      ) : (
        <input
          type={type}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          placeholder={placeholder}
          id={htmlFor}
          value={value}
          name={name}
        />
      )}

      {hasError && !isFormValid && isTouched ? getError(value) : ""}
    </>
  );
};

export default Input;
