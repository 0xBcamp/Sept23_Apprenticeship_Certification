import { EAS } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import { createContext } from "react";
import dotenv from "dotenv";
import { gql } from "@apollo/client";
dotenv.config();

export const ContractContext = createContext();
export const ContractContextProvider = ({ children }) => {
  /**
   * EAS SDK Part
   */
  const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

  const getProvider = () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    return provider;
  };

  const getSigner = async () => {
    const provider = getProvider();
    const signer = await provider.getSigner();
    return signer;
  };

  const getMyAddress = async () => {
    // setAccountAddress(await getSigner().getAddress());
    let myAddress = await getSigner();
    myAddress = await myAddress.getAddress();
    return myAddress;
  };

  const contractConnected = async (providerOrSigner) => {
    try {
      const eas = new EAS(EASContractAddress);
      eas.connect(providerOrSigner);
      return eas;
    } catch (error) {
      console.log("Something went wrong while connecting to contract", error);
    }
  };

  const contractConnectedToSigner = async () => {
    try {
      const contract = await contractConnected(await getSigner());
      return contract;
    } catch (error) {
      console.log("Something went wrong while connecting to contract", error);
      return error;
    }
  };

  const contractConnectedToProvider = async () => {
    try {
      const contract = await contractConnected(getProvider());
      return contract;
    } catch (error) {
      console.log("Something went wrong while connecting to contract", error);
      return error;
    }
  };

  async function makeOnChainAttestation(
    schemaID,
    recipientAddress,
    revocable = false,
    encodedData
  ) {
    try {
      const contract = await contractConnectedToSigner();
      const tx = await contract.attest({
        schema: schemaID,
        data: {
          recipient: recipientAddress,
          expirationTime: 0,
          revocable: revocable,
          data: encodedData,
        },
      });
      const newAttestId = await tx.wait();
      return newAttestId;
    } catch (error) {
      console.log(
        "Something went wrong while making OnChain Attestation",
        error
      );
      return error;
    }
  }

  async function makeOnChainAttestationWithoutClicking(
    schemaID,
    recipientAddress,
    revocable = false,
    encodedData
  ) {
    try {
      const signer = new ethers.Wallet(
        process.env.NEXT_PUBLIC_PRIVATE_KEY,
        getProvider()
      );
      const contract = await contractConnected(signer);

      const tx = await contract.attest({
        schema: schemaID,
        data: {
          recipient: recipientAddress,
          expirationTime: 0,
          revocable: revocable,
          data: encodedData,
        },
      });
      const newAttestId = await tx.wait();
      return newAttestId;
    } catch (error) {
      console.log(
        "Something went wrong while making OnChain Attestation",
        error
      );
      return error;
    }
  }

  //   async function makeOnChainMultiAttestation(
  //     schemaID,
  //     recipientAddress,
  //     revocable = false,
  //     encodedData
  //   ) {
  //     try {
  //       const contract = await contractConnectedToSigner();
  //       const tx = await contract.multiAttest({
  //         schema: schemaID,
  //         data: [
  //           {
  //             recipient: recipientAddress[0],
  //             expirationTime: 0,
  //             revocable: revocable,
  //             data: encodedData,
  //           },
  //           {
  //             recipient: recipientAddress[1],
  //             expirationTime: 0,
  //             revocable: revocable,
  //             data: encodedData,
  //           },
  //         ],
  //       });
  //       const newAttestId = await tx.wait();
  //       return newAttestId;
  //     } catch (error) {
  //       console.log(
  //         "Something went wrong while making OnChain Attestation",
  //         error
  //       );
  //       return error;
  //     }
  //   }

  async function makeOffChainAttestation(
    schemaID,
    recipientAddress,
    revocable = false,
    encodedData
  ) {
    try {
      const signer = new ethers.Wallet(
        process.env.NEXT_PUBLIC_PRIVATE_KEY,
        getProvider()
      );

      const contract = await contractConnectedToProvider();
      const offchain = await contract.getOffchain();
      const offchainAttestation = await offchain.signOffchainAttestation(
        {
          recipient: recipientAddress,
          expirationTime: 0,
          time: Math.floor(new Date() / 1000),
          revocable: revocable,
          version: 1,
          nonce: 0,
          schema: schemaID,
          refUID:
            "0x0000000000000000000000000000000000000000000000000000000000000000",
          data: encodedData,
        },
        signer
      );
      console.log(offchainAttestation);
      return offchainAttestation;
    } catch (error) {
      console.log(
        "Something went wrong while making OffChain Attestation",
        error
      );
      return error;
    }
  }

  async function getOnChainAttestation(uid) {
    const contract = await contractConnectedToProvider();
    try {
      // const uid =
      //   "0x78b53af05a9ab1ac5ec5a3f9fe7e977a96a2a6e1b32b9f1504d6b1459dab1f43";
      const attestation = await contract.getAttestation(uid);

      return attestation;
    } catch (error) {
      console.log(
        "Something went wrong while getting OnChain Attestation",
        error
      );
      return error;
    }
  }
  /**
   * GraphQL Part
   */

  const GET_ATTESTER_REPUTATION_QUERY = gql`
    query GroupByAttestation(
      $by: [AttestationScalarFieldEnum!]!
      $account: String
      $schema: String
    ) {
      groupByAttestation(
        by: $by
        where: {
          attester: { equals: $account }
          schema: { is: { id: { equals: $schema } } }
        }
      ) {
        id
      }
    }
  `;

  const GET_RECIPIENT_REPUTATION_QUERY = gql`
    query GroupByAttestation(
      $by: [AttestationScalarFieldEnum!]!
      $account: String
      $schema: String
    ) {
      groupByAttestation(
        by: $by
        where: {
          recipient: { equals: $account }
          schema: { is: { id: { equals: $schema } } }
        }
      ) {
        id
      }
    }
  `;

  const GET_ATTESTER_QUERY = gql`
    query GroupByAttestation(
      $by: [AttestationScalarFieldEnum!]!
      $account: String
    ) {
      groupByAttestation(by: $by, where: { attester: { equals: $account } }) {
        id
      }
    }
  `;

  const GET_RECIPIENT_QUERY = gql`
    query GroupByAttestation(
      $by: [AttestationScalarFieldEnum!]!
      $account: String
    ) {
      groupByAttestation(by: $by, where: { recipient: { equals: $account } }) {
        id
      }
    }
  `;

  const GET_ATTESTATIONS_QUERY = gql`
    query Attestations($account: String, $schema: String) {
      attestations(
        where: {
          schemaId: { equals: $schema }
          recipient: { equals: $account }
        }
      ) {
        # id
        # recipient
        decodedDataJson
        attester
        # time
        timeCreated
      }
    }
  `;

  return (
    <ContractContext.Provider
      value={{
        makeOnChainAttestation,
        makeOffChainAttestation,
        // makeOnChainMultiAttestation,
        makeOnChainAttestationWithoutClicking,
        getOnChainAttestation,
        getMyAddress,
        GET_ATTESTATIONS_QUERY,
        GET_ATTESTER_QUERY,
        GET_RECIPIENT_QUERY,
        GET_ATTESTER_REPUTATION_QUERY,
        GET_RECIPIENT_REPUTATION_QUERY,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
