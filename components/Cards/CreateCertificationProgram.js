// import { useEffect } from "react";

// import dotenv from "dotenv";
// dotenv.config();

// import { Web3Storage } from "web3.storage";
// import { Modal, useNotification } from "web3uikit";

// import networkMapping from "@/constants/networkMapping.json";
// import eventConnectAbi from "@/constants/EventConnect.json";
// import { useMoralis, useWeb3Contract } from "react-moralis";

// export default ({
//   name,
//   date,
//   duration,
//   description,
//   stream,
//   account,
//   uploadFile,
//   poapID,
//   isVisible,
//   onClose,
// }) => {
//   //   const { chainId } = useMoralis();

//   //   const chainIdString = chainId ? parseInt(chainId).toString() : "31337";
//   //   const eventConnectAddress = networkMapping[chainIdString].EventConnect[0];

//   // Get the last Event index
//   const { runContractFunction: getEventIndex } = useWeb3Contract({
//     abi: eventConnectAbi,
//     contractAddress: eventConnectAddress,
//     functionName: "getEventIndex",
//   });

//   //   const { runContractFunction } = useWeb3Contract();

//   const dispatch = useNotification();

//   // Add Event
//   //   async function addEvent(fullCID) {
//   //     const addEventOptions = {
//   //       abi: eventConnectAbi,
//   //       contractAddress: eventConnectAddress,
//   //       functionName: "addEvent",
//   //       params: {
//   //         eventURI: fullCID,
//   //         streamKey: stream.streamKey,
//   //         poapID: poapID,
//   //       },
//   //     };

//   //     await runContractFunction({
//   //       params: addEventOptions,
//   //       onSuccess: (tx) => handleSuccess(tx),
//   //       onError: (error) => {
//   //         console.log(error);
//   //       },
//   //     });

//   //     console.log("Event Added!");
//   //   }

//   //   const handleSuccess = async (tx) => {
//   //     await tx.wait(1);
//   //     dispatch({
//   //       type: "success",
//   //       message: "The operation was successful",
//   //       title: "Successful",
//   //       position: "topR",
//   //     });
//   //     onClose && onClose();
//   //     alert("Done!");
//   //     window.location.reload();
//   //   };

//   /**
//    * CID Section
//    */
//   const token = process.env.NEXT_PUBLIC_WEB3_STORAGE_API_TOKEN;
//   const client = new Web3Storage({ token });

//   const prefix = "https://";
//   const suffix = ".ipfs.w3s.link";

//   let cid;
//   const metadataTemplate = {
//     eventID: "",
//     name: "",
//     date: "",
//     duration: "",
//     description: "",
//     banner: "",
//     playbackId: "",
//   };

//   async function createNewEvent() {
//     /*
//      * Storing Files (Uploading to IPFS)
//      */
//     console.log(`Uploading ${uploadFile.name}...`);

//     cid = await client.put([uploadFile], {
//       wrapWithDirectory: false,
//     });
//     console.log(`Getting files of ${cid}`);

//     await setMetadata();
//   }

//   async function setMetadata() {
//     let metadata = { ...metadataTemplate };

//     console.log(`Working on ${uploadFile.name}...`);
//     console.log(uploadFile.name);

//     metadata.eventID = `${await getEventIndex()}`;
//     metadata.name = name;
//     metadata.date = date;
//     metadata.duration = duration;
//     metadata.description = description;
//     metadata.banner = `${prefix}${cid}${suffix}`;
//     metadata.playbackId = stream.playbackId;

//     await setJsonFile(metadata);
//   }

//   async function setJsonFile(metadata) {
//     console.log(`Writing JSON file: ${metadata.name}.json`);
//     const buffer = Buffer.from(JSON.stringify(metadata));
//     const files = [new File([buffer], `${metadata.name}.json`)];
//     cid = await client.put(files, { wrapWithDirectory: false });
//     console.log(`Done writing JSON file: ${metadata.name}.json`);

//     addEvent(`${prefix}${cid}${suffix}`);
//     onClose && onClose();
//   }

//   useEffect(() => {
//     createNewEvent();
//   }, []);
//   return (
//     <>
//       <Modal
//         isVisible={isVisible}
//         onCancel={onClose}
//         onOk={onClose}
//         onCloseButtonPressed={onClose}
//         title="Last step, Check a Banner for your Event"
//         okText="Done"
//         cancelText="Close"
//       >
//         <p>Name: {name}</p>
//         <p>Date: {date}</p>
//         <p>Duration: {duration}</p>
//         <p>Description: {description}</p>
//         <p>Event By: {account}</p>
//       </Modal>
//     </>
//   );
// };
