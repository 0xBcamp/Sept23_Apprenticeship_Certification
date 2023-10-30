// import AddProgramCard from "/components/Cards/AddProgramCard";
// import StudentsRegistrationCard from "/components/Cards/StudentsRegistrationCard";
import { Button } from "@mui/material";
import { useState } from "react";
export default () => {
  const [selectOne, setSelectOne] = useState(0);
  return (
    <main className="flex flex-col gap-2 items-center p-12 ">
      <p>Welcome Mentor</p>
      <Button onClick={() => setSelectOne(1)}>Add new program</Button>
      <p>or</p>
      <Button onClick={() => setSelectOne(2)}>Register to program</Button>

      {/* {selectOne == 1 && <AddProgramCard />}
      {selectOne == 2 && <StudentsRegistrationCard />} */}
    </main>
  );
};
