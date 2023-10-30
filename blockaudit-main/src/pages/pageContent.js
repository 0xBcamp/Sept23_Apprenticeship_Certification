'use client'
import { Box, Flex, Heading, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import Navbar from '../components/Navbar';
import TeamMember from '../components/TeamMember';
import dynamic from 'next/dynamic';

const DynamicPage = dynamic(() => import('./page'), { ssr: false });

const PageContent = () => {
  return (
    <>
      <Navbar />
      <Box padding="6rem 2rem 2rem 2rem">
        <Heading textAlign="center">Smart Contract Audits by blockAudit</Heading>
        <Text textAlign="center" mt="4">
        Smart contract security is paramount in the blockchain industry, as inadequate security measures can lead to devastating consequences such as theft, fraud, and the compromise of sensitive information. <br></br>  <br></br> Without a thorough security review, vulnerabilities within smart contracts can be exploited by malicious actors, resulting in substantial financial losses and reputational damage.  <br></br> <br></br> Our team is dedicated to ensuring the highest level of security for smart contracts, providing comprehensive audits that identify and mitigate potential risks, thereby safeguarding our clients' assets and ensuring the integrity of their transactions. Through our rigorous assessment processes, we deliver actionable insights and recommendations, empowering our clients to deploy secure and reliable smart contracts that inspire trust and confidence among their users.
          {/* Add more content */}
        </Text>
        <Flex justifyContent="center" flexWrap="wrap" mt="4">
          <TeamMember imageUrl="/alfaqi.png" name="Alfaqi" />
          <TeamMember imageUrl="/harold.png" name="Harold" />
          <TeamMember imageUrl="/theresa.png" name="Theresa" />
          <TeamMember imageUrl="/manraj.png" name="Manraj" />
          <TeamMember imageUrl="/aliraza.png" name="Ali Raza" />
          {/* Add more members */}
        </Flex>
        <Heading textAlign="center" mt="8">Our Team Checks For Below Exploits and Zero-Days</Heading>
        <Text textAlign="center" mt="4">
          We meticulously audit smart contracts for a range of vulnerabilities, including...
          {/* Add more content */}
        </Text>
        <Table variant="simple" size="md" mt="4">
          <Thead>
            <Tr>
              <Th>Security Issue Type</Th>
              <Th>Issue Description</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Reentrancy</Td>
              <Td>A situation where a vulnerable smart contract function makes an external call to a malicious contract, temporarily giving up control of the transaction flow. The malicious contract then repeatedly calls the original smart contract function before it finishes executing while draining its funds.</Td>
            </Tr>
            <Tr>
              <Td>Flash Loan Attack</Td>
              <Td>A situation where an attacker takes out a flash loan (a form of uncollateralized lending) from a lending protocol and uses it in conjunction with various types of gimmickry to manipulate the market in their favor.</Td>
            </Tr>
            <Tr>
              <Td>Sybil Attack</Td>
              <Td>An attack where an attacker creates multiple identities to gain a disproportionately large influence.</Td>
            </Tr>
            <Tr>
              <Td>Front Run/Sandwich</Td>
              <Td>An attack where an attacker exploits the predictability of the transaction order.</Td>
            </Tr>
            <Tr>
              <Td>Denial of Service</Td>
              <Td>An attack that disrupts the normal functioning of a system or network by flooding it with traffic.</Td>
            </Tr>
            <Tr>
              <Td>Operational Security</Td>
              <Td>Concerns related to the implementation and management of security practices.</Td>
            </Tr>
            {/* Add more rows */}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default PageContent;
