import { useEffect } from "react";

import dotenv from "dotenv";
dotenv.config();

import { Web3Storage } from "web3.storage";
import { Modal } from "@mui/material";

export default ({ name, date, uploadFile, returnUploadedFile, onClose }) => {
  /**
   * CID Section
   */
  const token = process.env.NEXT_PUBLIC_WEB3_STORAGE_API_TOKEN;
  const client = new Web3Storage({ token });

  const prefix = "https://";
  const suffix = ".ipfs.w3s.link";

  let cid;
  const metadataTemplate = {
    name: "",
    date: "",
    imageurl: "",
  };

  async function createNewEvent() {
    /*
     * Storing Files (Uploading to IPFS)
     */
    console.log(`Uploading ${uploadFile.name}...`);

    cid = await client.put([uploadFile], {
      wrapWithDirectory: false,
    });
    console.log(`Getting files of ${cid}`);

    await setMetadata();
  }

  async function setMetadata() {
    let metadata = { ...metadataTemplate };

    console.log(`Working on ${uploadFile.name}...`);
    console.log(uploadFile.name);

    metadata.name = name;
    metadata.date = date;
    metadata.imageurl = `${prefix}${cid}${suffix}`;

    await setJsonFile(metadata);
  }

  async function setJsonFile(metadata) {
    console.log(`Writing JSON file: ${metadata.name}.json`);
    const buffer = Buffer.from(JSON.stringify(metadata));
    const files = [new File([buffer], `${metadata.name}.json`)];
    cid = await client.put(files, { wrapWithDirectory: false });
    console.log(`Done writing JSON file: ${metadata.name}.json`);
    console.log(`${prefix}${cid}${suffix}`);
    returnUploadedFile(`${prefix}${cid}${suffix}`);
    onClose && onClose();
  }

  useEffect(() => {
    createNewEvent();
  }, []);
  return <Modal onClose={onClose} />;
};
