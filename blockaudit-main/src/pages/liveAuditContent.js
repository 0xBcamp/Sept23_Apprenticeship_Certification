import React, { useState } from 'react';
import { Box, Heading, Textarea, Select, Button, Text } from "@chakra-ui/react";
import Navbar from '../components/Navbar';

const securityTypes = [
  "Reentrancy",
  "Flash Load/Whale",
  "Sybil Attacks",
  "Front run/sandwhich",
  "Denial of Service",
  "Operational Security"
];

const LiveAuditContent = () => {
  const [selectedType, setSelectedType] = useState("");
  const [code, setCode] = useState("");
  const [report, setReport] = useState("");

  const handleSecurityTypeChange = (event) => {
    setSelectedType(event.target.value);
  }

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  }

  const generateReport = () => {
    setReport(`Report for ${selectedType}`);
  }

  return (
    <>
      <Navbar />
      <Box maxW="1200px" margin="auto" padding="2rem" mt="6rem" color="black" bg="gray.800">
        <Heading as="h1" color="white">Live Audit</Heading>
        
        <Textarea
          value={code}
          onChange={handleCodeChange}
          placeholder="Enter your Solidity code here..."
          mt="2rem"
          minHeight="300px"
          color="green.400" // Mimic Solidity highlighting
          bg="gray.900"
        />
        
        <Select mt="2rem" bg="gray.700" color="white" borderColor="gray.600" onChange={handleSecurityTypeChange}>
          <option value="" disabled>Select Security type</option>
          {securityTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </Select>

        <Button mt="2rem" colorScheme="teal" onClick={generateReport}>Generate Report</Button>
        
        <Box mt="2rem" p="2rem" border="1px solid #E2E8F0">
          <Text color="white">{report}</Text>
        </Box>
        
        <Button mt="2rem" colorScheme="teal">Download as CSV</Button>
      </Box>
    </>
  );
};

export default LiveAuditContent;
