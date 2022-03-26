import { useState } from "react";
import FormCover from "../FormCover/FormCover";
import Button from "../Input/Button";
import Input from "../Input/Input";
import "./Form.scss";

const Form = () => {
  const [emailInput, setEmailInput] = useState({ value: "", isValid: false });
  const [fullnameInput, setFullnameInput] = useState({
    value: "",
    isValid: false,
  });
  const [explanationInput, setExplanationInput] = useState({
    value: "",
    isValid: false,
  });
  const [type, setType] = useState({ type: "close", abort: null });

  //a function to make the submit button disable or enable
  const validate = () =>
    emailInput.isValid && fullnameInput.isValid && explanationInput.isValid;

  //a function to send users entered informations to the API
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const datas = new FormData(e.target);

      //abort controller to cancel the sending request
      const abortController = new AbortController();
      //setting the abort controller in state to access that in cover component and display the sending request cover
      setType((prevState) => {
        return { type: "pending", abort: abortController };
      });

      //send users entered datas to the api
      const response = await fetch(e.target.action, {
        method: e.target.method,
        body: datas,
        headers: {
          Accept: "application/json",
        },
        signal: abortController.signal,
      });

      if (!response.ok) throw new Error();

      //display the success cover to user
      setType((prevState) => {
        return { ...prevState, type: "success" };
      });
    } catch (error) {
      //if error is the error that aborting a sending request will throw, dont display error cover
      if (error !== "DOMException: The user aborted a request.")
        //display error cover
        setType((prevState) => {
          return { ...prevState, type: "error" };
        });
    }
  };

  return (
    <form
      action="https://formspree.io/f/xpzbjwnq"
      method="POST"
      onSubmit={formSubmitHandler}
      className="app__footer-form"
    >
      <FormCover
        type={type.type}
        onClose={() => {
          //if user click cancel, it means the sending request should be abort and then close the cover
          if (type.type === "pending") type.abort.abort();
          setType((prevState) => {
            return { ...prevState, type: "close" };
          });
        }}
      />
      {/* all the inputs with validation and etc */}
      <div className="app__footer-form-input-container">
        {/* fullname input */}
        <Input
          validate={(value) => value}
          require={true}
          changeValue={(value) => {
            setFullnameInput((prevState) => {
              return { ...prevState, value };
            });
          }}
          changeIsValid={(isValid) => {
            setFullnameInput((prevState) => {
              return { ...prevState, isValid };
            });
          }}
          name="fullname"
          htmlFor="fullname"
          label="fullname"
          type="text"
          placeholder="please enter your fullname"
          getError={() => <p>please enter your fullname</p>}
        />
      </div>
      <div className="app__footer-form-input-container">
        {/* email input */}
        <Input
          validate={(value) =>
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              value
            )
          }
          require={true}
          changeValue={(value) => {
            setEmailInput((prevState) => {
              return { ...prevState, value };
            });
          }}
          changeIsValid={(isValid) => {
            setEmailInput((prevState) => {
              return { ...prevState, isValid };
            });
          }}
          htmlFor="email"
          label="email"
          type="text"
          placeholder="please enter your email"
          getError={(value) => {
            if (value.trim() === "") return <p>please enter your email</p>;
            else return <p>please enter a correct email</p>;
          }}
          name="email"
        />
      </div>
      <div className="app__footer-form-input-container">
        {/* explanation input */}
        <Input
          validate={(value) => value.length >= 16}
          require={true}
          changeValue={(value) => {
            setExplanationInput((prevState) => {
              return { ...prevState, value };
            });
          }}
          changeIsValid={(isValid) => {
            setExplanationInput((prevState) => {
              return { ...prevState, isValid };
            });
          }}
          htmlFor="explanation"
          label="message"
          type="explanation"
          placeholder="please enter your message."
          getError={(value) => (
            <p>{`please enter your message with enough characters. remaining characters: ${
              16 - value.length
            }`}</p>
          )}
          name="message"
        />
      </div>
      <div className="app__footer-form-action-container">
        <Button validate={validate} text="send" />
      </div>
    </form>
  );
};

export default Form;
