const Button = ({ text }) => {
  return (
    <button className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-5 py-2 rounded-lg">
      {text}
    </button>
  );
};

export default Button;