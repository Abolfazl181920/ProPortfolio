import "./FormCover.scss";

//form cover component
//this component can accept type and onClose props
//value of type prop should be one of these: close, pending, success, error
const FormCover = (props) => {
  let element = null;
  if (props.type === "pending") {
    element = (
      <>
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h1>sending your inputs...</h1>
        <button onClick={props.onClose}>cancel</button>
      </>
    );
  } else if (props.type === "success") {
    element = (
      <>
        <svg
          className="checkmark correct"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className="checkmark__circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className="checkmark__check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
        <h1>your inputs were sent successfuly!</h1>
        <button onClick={props.onClose}>close</button>
      </>
    );
  } else if (props.type === "error") {
    element = (
      <>
        <svg
          className="checkmark error"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className="checkmark__circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className="checkmark__check"
            fill="none"
            d="M16 16 36 36 M36 16 16 36"
          />
        </svg>
        <h1>something went wrong. please try again.</h1>
        <div>
          <button className="try-again" type="submit">
            try again
          </button>
          <button onClick={props.onClose}>close</button>
        </div>
      </>
    );
  }

  return (
    <div
      className={`app__footer-form-cover ${
        props.type === "close" ? "close" : "open"
      }`}
    >
      {element}
    </div>
  );
};

export default FormCover;
