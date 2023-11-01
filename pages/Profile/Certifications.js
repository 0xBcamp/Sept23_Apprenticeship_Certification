import AllCert from "../Home/AllCert";

export default ({ address }) => {
  // const { searchedAddress } = address;

  return (
    <table className="table h-full">
      <tbody>
        <tr>
          <td className="justify-center h-full items-center">
            <AllCert address={address} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};
