import React from "react";
import { Row, Col } from "web3uikit";

export default () => {
  return (
    <table style={{ width: "100%" }}>
      <tbody>
        <tr>
          <td rowSpan="3">First Col</td>
          <td colSpan="2">Second Col</td>
        </tr>
        <tr>
          <td>Row 1, Col 2</td>
          <td>Row 1, Col 3</td>
        </tr>
        <tr>
          <td>Row 2, Col 2</td>
          <td>Row 2, Col 3</td>
        </tr>
      </tbody>
    </table>
  );
};
