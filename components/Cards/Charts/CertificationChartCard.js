// import { CircularProgress } from "@nextui-org/react";
import { ContractContext } from "@/Context/ContractContext";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { SkeletonImageModal } from "@/components/Commons";
// import { motion } from "framer-motion";

export default () => {
  const [accountAddress, setAccountAddress] = useState("");
  const { GET_ATTESTER_QUERY, GET_RECIPIENT_QUERY, getMyAddress } =
    useContext(ContractContext);
  useEffect(() => {
    const func = async () => {
      setAccountAddress(await getMyAddress());
    };
    func();
  }, []);

  // const account = accountAddress
  //   ? accountAddress
  //   : "0x6A5951dA6E9F0871e7Fa4D4EE785db0B3489eBb6";
  const schema =
    "0x3969bb076acfb992af54d51274c5c868641ca5344e1aacd0b1f5e4f80ac0822f";
  const by = "id";

  const attesterCount = useQuery(GET_ATTESTER_QUERY, {
    variables: {
      by: by,
      account: accountAddress,
      // schema: schema,
    },
  });

  const attester = attesterCount.data?.groupByAttestation.length;

  const recipientCount = useQuery(GET_RECIPIENT_QUERY, {
    variables: {
      by: by,
      account: accountAddress,
      // schema: schema,
    },
  });

  const recipient = recipientCount.data?.groupByAttestation.length;

  return (
    <>
      {/* {attesterCount.loading && recipientCount.loading ? (
        <div>
          <SkeletonImageModal />
        </div>
      ) : (
        <CircularProgress
          label="Certifications"
          size="xl"
          value={attester}
          color="success"
          showValueLabel={true}
        />
      )} */}
      {/* <motion.div
        className="box"
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["0%", "0%", "50%", "50%", "0%"],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: 1,
          repeatDelay: 1,
        }}
      /> */}
    </>
  );
};
