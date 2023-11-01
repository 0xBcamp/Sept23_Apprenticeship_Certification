import AllRep from "../Home/AllRep";

export default ({ address }) => {
  // const { searchedAddress } = address;

  return (
    <table className="table h-full">
      <tbody>
        <tr>
          <td className="justify-center h-full items-center">
            <AllRep address={address} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};
