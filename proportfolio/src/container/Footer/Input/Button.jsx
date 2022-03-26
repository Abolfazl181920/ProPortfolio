//a simple submit button for submitting inputs based on users inputs
const Button = (props) => {
  return (
    <button
      disabled={!props.validate()}
      type="submit"
      className="w-[90%] sm:w-[50%] text-white flex justify-between items-center px-[10px] py-[5px] bg-green-700 rounded-[5px] mb-[10px]"
    >
      <p className="ml-[5px] w-[100%] text-center">{props.text}</p>
    </button>
  );
};

export default Button;
