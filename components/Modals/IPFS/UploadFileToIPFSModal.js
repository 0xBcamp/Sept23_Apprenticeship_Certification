import { useEffect, useState } from "react";

import dotenv from "dotenv";
dotenv.config();

import { Web3Storage } from "web3.storage";
import WaitModal from "../WaitModal";
import SuccessModal from "../SuccessMarkModal";
import { createBlockBadgeSBTContract } from "../../../utils/contractUtils";

export default ({ name, date, uploadFile, onClose }) => {
  const [open, setOpen] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const getLastID = async () => {
    const contract = await createBlockBadgeSBTContract();
    const lastID = await contract.getLastTokenId();

    return Number(lastID);
  };

  if (!uploadFile) return;
  /**
   * CID Section
   */

  // Your keys must be stored in .env file and do not share it over Internet
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ1MTVjODI4ZjEzQzFGOENDMjg3ODIxYjNhOTVjMzc1NDIxYjk1NjMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODU1NTAzMTczMDIsIm5hbWUiOiJpcGZzIn0.iyWgJIYFT6R2NEbuETvJB_4B70Q77KxyO54N08jERjM";
  const client = new Web3Storage({ token });

  const prefix = "https://";
  const prefixIPFS = "ipfs://";

  const suffix = ".ipfs.w3s.link";

  let cid;
  const metadataTemplate = {
    id: "",
    name: "",
    description: "",
    image: "",
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
    const lastID = await getLastID();
    metadata.id = lastID;
    metadata.name = lastID + "-" + name;
    metadata.date = date;
    metadata.image = `${prefixIPFS}${cid}`;

    await setJsonFile(metadata);
  }

  async function setJsonFile(metadata) {
    console.log(`Writing JSON file: ${metadata.name}.json`);
    const buffer = Buffer.from(JSON.stringify(metadata));
    const files = [new File([buffer], `${metadata.name}.json`)];
    cid = await client.put(files, { wrapWithDirectory: false });
    console.log(`Done writing JSON file: ${metadata.name}.json`);
    console.log(`${prefix}${cid}${suffix}`);
    // returnUploadedFile(`${prefix}${cid}${suffix}`);
    setOpen(false);
    onClose && onClose(`${prefixIPFS}${cid}`);
    setTimeout(function () {
      setShowSuccess(false);
    }, 1500);
    setShowSuccess(true);
  }

  useEffect(() => {
    createNewEvent();
  }, []);
  return (
    <>
      <WaitModal open={open} onClose={onClose} />

      {showSuccess && <SuccessModal open={showSuccess} onClose={showSuccess} />}
    </>
  );
};
