<<<<<<< HEAD
export default ({ Address }) => {
  return (
    <p>
      <b>{Address.slice(0, 6) + "..." + Address.slice(38, 42)}</b>
    </p>
  );
};
=======
export default ({ Address }) => {
  return <p>{Address.slice(0, 6) + "..." + Address.slice(38, 42)}</p>;
};
>>>>>>> origin/alfaqi
