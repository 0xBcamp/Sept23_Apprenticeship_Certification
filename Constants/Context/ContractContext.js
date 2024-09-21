import { EAS } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import { createContext, useState } from "react";
import dotenv from "dotenv";
import { gql } from "@apollo/client";
dotenv.config();

export const ContractContext = createContext();
export const ContractContextProvider = ({ children }) => {
  const [addressFromSearchbar, setAddressFromSearchbar] = useState("");
  const [bnsFromSearchbar, setBNSFromSearchbar] = useState("");

  // async function makeOnChainAttestationWithoutClicking(
  //   schemaID,
  //   recipientAddress,
  //   revocable = false,
  //   encodedData
  // ) {
  //   try {
  //     const signer = new ethers.Wallet(
  //       process.env.NEXT_PUBLIC_PRIVATE_KEY,
  //       getProvider()
  //     );
  //     const contract = await contractConnected(signer);

  //     const tx = await contract.attest({
  //       schema: schemaID,
  //       data: {
  //         recipient: recipientAddress,
  //         expirationTime: 0,
  //         revocable: revocable,
  //         data: encodedData,
  //       },
  //     });
  //     const newAttestId = await tx.wait();
  //     return newAttestId;
  //   } catch (error) {
  //     console.log(
  //       "Something went wrong while making OnChain Attestation",
  //       error
  //     );
  //     return error;
  //   }
  // }

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
  // {
  //   recipient: recipientAddress[0],
  //   expirationTime: 0,
  //   revocable: revocable,
  //   data: encodedData,
  // },
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
        id
        # recipient
        decodedDataJson
        attester
        # time
        txid
        timeCreated
      }
    }
  `;

  const GET_ATTESTATION_QUERY = gql`
    query Attestation($id: String) {
      attestation(where: { id: $id }) {
        decodedDataJson
        timeCreated
        txid
      }
    }
  `;

  return (
    <ContractContext.Provider
      value={{
        addressFromSearchbar,
        setAddressFromSearchbar,
        bnsFromSearchbar,
        setBNSFromSearchbar,
        GET_ATTESTATION_QUERY,
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
