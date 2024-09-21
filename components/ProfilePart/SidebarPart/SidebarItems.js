export default ({ text, active, onClickFunc }) => {
  return (
    <li
      onClick={onClickFunc}
      className={`
relative flex items-center py-2 px-3 my-1 text-white
font-medium cursor-pointer
${active ? "border-l-4 border-blue-900" : "hover:border-l-4 border-blue-900"}
`}
    >
      <span className="w-auto ml-3">{text}</span>
    </li>
  );
};
