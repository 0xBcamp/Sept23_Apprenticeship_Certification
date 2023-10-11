export default ({ Address }) => {
  return <p>{Address.slice(0, 6) + "..." + Address.slice(38, 42)}</p>;
};
