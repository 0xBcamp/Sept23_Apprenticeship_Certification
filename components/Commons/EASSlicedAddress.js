export default ({ Address }) => {
  return (
    <p>
      <b>{Address.slice(0, 6) + "..." + Address.slice(38, 42)}</b>
    </p>
  );
};
