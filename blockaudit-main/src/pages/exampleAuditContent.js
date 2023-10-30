import React from 'react';
import { Box, Heading, UnorderedList, ListItem, Text, Code } from "@chakra-ui/react";
import Navbar from '../components/Navbar';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

const SecurityAuditPage = () => {
    const data = [
        { name: 'Bugs', value: 10 },
        { name: 'Clean', value: 90 },
    ];
    const COLORS = ['red', 'green'];

    return (
        <>
            <Navbar />
            <Box maxW="1200px" margin="auto" padding="2rem" mt="4rem" bgColor="yourPreferredBgColor" color="yourPreferredTextColor">

                <Heading as="h1">Smart Contract Security Review: AngelDAO Crowd Funding Project</Heading>

                <Box display="flex" flexDirection="row" mt="2rem">
                    <Box width="30%" marginRight="10px">
                        <Heading as="h2">Table of Contents</Heading>
                        <UnorderedList spacing={3}>
                            <ListItem><a href="#overview">Overview</a></ListItem>
                            <ListItem><a href="#scope">Scope</a></ListItem>
                            <ListItem><a href="#functionality">Functionality</a></ListItem>
                            <ListItem>
                                <a href="#bugs">Bugs</a>
                                <UnorderedList spacing={3}>
                                    <ListItem><a href="#critical-bugs">Critical Bugs</a></ListItem>
                                    <ListItem><a href="#high-impact-bugs">High Impact Bugs</a></ListItem>
                                    {/* ... Add other categories as needed ... */}
                                </UnorderedList>
                            </ListItem>
                            <ListItem><a href="#future-improvements">Future Improvements</a></ListItem>
                            <ListItem><a href="#disclaimer">Disclaimer</a></ListItem>
                        </UnorderedList>
                    </Box>

                    <Box width="70%">
                        <ResponsiveContainer width="100%" height={350}>
                            <PieChart>
                                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={140} fill="#8884d8" label>
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <text x="30%" y="50%" textAnchor="middle" fill="green">
                                    Clean
                                </text>
                                <text x="70%" y="50%" textAnchor="middle" fill="red">
                                    Bugs
                                </text>
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                </Box>

                <Heading as="h2" mt="2rem" id="overview">Overview:</Heading>
                <Text mt="1rem">
                    The Angel crowdfunding platform is a decentralized ecosystem designed to revolutionize project funding and community engagement. Leveraging blockchain technology, the platform introduces the AngelDollar (ADT) and AngelGovernanceToken (AGT) contracts, providing users with a secure and transparent environment for supporting various projects and participating in governance decisions. With the AngelDollar serving as the native token for transactions and contributions, participants can seamlessly engage in fundraising activities while earning rewards. The AngelGovernanceToken enables users to actively contribute to platform governance, fostering a collaborative and inclusive decision-making process. The LockTokens contract facilitates the seamless conversion of AngelDollar tokens to AngelGovernanceToken tokens, enhancing user accessibility and promoting a vibrant and dynamic community-driven ecosystem. With its innovative approach to crowdfunding and community empowerment, the platform aims to foster a more inclusive and transparent funding landscape for diverse projects and initiatives.
                </Text>

                <Heading as="h2" mt="2rem" id="scope">Scope:</Heading>
                <Text mt="1rem">
                    The below 3 solidity smart contracts were reviewed:
                </Text>
                <UnorderedList spacing={3} ml="2rem">
                    <ListItem>
                        <a href="https://github.com/0xBcamp/Sept23_Crowdfunding/blob/master/contracts/AngelDollar.sol" target="_blank" rel="noopener noreferrer">AngelDollar.sol</a>
                        <Text mt="1rem">
                            This contract represents the native token of the crowdfunding platform. It serves as a medium of exchange within the ecosystem and can be used for various purposes, including supporting projects, participating in fundraising campaigns, or receiving rewards for contributions. The contract allows for the creation, transfer, and management of the AngelDollar token.
                        </Text>
                    </ListItem>
                    <ListItem>
                        <a href="https://github.com/0xBcamp/Sept23_Crowdfunding/blob/master/contracts/AngelGovernanceToken.sol" target="_blank" rel="noopener noreferrer">AngelGovernanceToken.sol</a>
                        <Text mt="1rem">
                            The AngelGovernanceToken is an essential component for platform governance. Holders of this token are granted voting rights and may participate in decision-making processes related to the crowdfunding platform. The contract enables minting, burning, and transferring of the governance tokens, ensuring that participants have the necessary resources to influence platform decisions.
                        </Text>
                    </ListItem>
                    <ListItem>
                        <a href="https://github.com/0xBcamp/Sept23_Crowdfunding/blob/master/contracts/LockTokens.sol" target="_blank" rel="noopener noreferrer">LockTokens.sol</a>
                        <Text mt="1rem">
                            This contract facilitates the exchange of AngelDollar tokens for AngelGovernanceToken tokens at a predetermined swap ratio. It ensures a mechanism for users to convert their AngelDollars into governance tokens, enabling them to engage in platform governance activities. The contract provides the functionality to update the swap ratio, giving the platform flexibility to adjust the conversion rate based on various factors.
                        </Text>
                    </ListItem>
                </UnorderedList>


                <Heading as="h2" mt="2rem" id="functionality">Functionality:</Heading>
                <Text mt="1rem">
                    The functionality of the reviewed smart contracts includes the following features:
                </Text>
                <ol style={{ marginLeft: '2rem' }}>
                    <li>
                        <b>Token Swapping Function:</b>
                        <ul>
                            <li>Description: Facilitates the swapping of AngelDollar tokens for AngelGovernanceToken tokens based on a specified swap ratio, enabling users to participate in the platform's crowdfunding activities.</li>
                            <li>Parameters: amountAngelDollar, senderAddress, governanceTknContract</li>
                            <li>Modifiers: onlyOwner</li>
                        </ul>
                    </li>
                    <li>
                        <b>Update Swap Ratio Function:</b>
                        <ul>
                            <li>Description: Allows the platform owner to dynamically adjust the swap ratio between AngelDollar and AngelGovernanceToken, ensuring flexibility and responsiveness to market conditions.</li>
                            <li>Parameters: newRatio</li>
                            <li>Modifiers: onlyOwner</li>
                        </ul>
                    </li>
                    <li>
                        <b>Crowdfunding Management Function:</b>
                        <ul>
                            <li>Description: Provides comprehensive tools and features for managing the crowdfunding process, including the creation, management, and closure of crowdfunding campaigns, ensuring a seamless and efficient experience for both project creators and backers.</li>
                            <li>Parameters: campaignDetails, creatorAddress, backers</li>
                            <li>Modifiers: onlyOwner, authorizedUsers</li>
                        </ul>
                    </li>
                    <li>
                        <b>Token Locking Mechanism:</b>
                        <ul>
                            <li>Description: Implements a robust token locking mechanism that secures the funds contributed by backers until the crowdfunding campaign achieves its predefined goals, providing added security and assurance for all stakeholders involved in the platform.</li>
                            <li>Parameters: lockTokensContract, angelDollar, angelGovernanceToken</li>
                            <li>Modifiers: onlyOwner</li>
                        </ul>
                    </li>
                </ol>

                <Heading as="h2" mt="2rem" id="bugs">Bugs:</Heading>

                <ol style={{ marginLeft: '2rem' }}>
                    <li>
                        <a href="#critical-bugs">Critical Bugs</a>
                    </li>
                    <li>
                        <a href="#high-impact-bugs">High Impact Bugs</a>
                    </li>
                    <li>
                        <a href="#medium-impact-bugs">Medium Impact Bugs</a>
                    </li>
                    <li>
                        <a href="#common-vulnerabilities">Common Vulnerabilities</a>
                    </li>
                </ol>

                <Heading as="h3" id="critical-bugs" mt="2rem">Critical Bugs:</Heading>
                <Text mt="1rem">
                    The critical bugs identified in the contracts are as follows:
                </Text>

                <ol style={{ marginLeft: '2rem' }}>
                    <li>
                        <b>Unbounded Minting in AngelDollar Contract:</b>
                        <Text mt="0.5rem">
                            The mint function does not have a maximum supply check, potentially leading to unintended inflation.
                        </Text>
                        <Text mt="0.5rem">
                            <b>Impact:</b> This could result in an unrestricted token supply, leading to devaluation of the token and loss of investor confidence.
                        </Text>
                        <Text mt="0.5rem">
                            <b>Suggested Resolution:</b> Implement a maximum supply check in the mint function to prevent uncontrolled inflation.
                        </Text>
                        <Text mt="0.5rem">
                            <b>Security Issue Type:</b> Operational Security
                        </Text>
                        <Text mt="0.5rem">
                            <b>Example Code Snippet:</b>
                        </Text>
                        <Code>
                            {"function mint(address account, uint256 value) public onlyOwner { if (account == address(0)) {revert ERC20InvalidReceiver(address(0)); } _update(address(0), account, value); }"}
                        </Code>
                    </li>
                </ol>

                <Heading as="h3" id="high-impact-bugs" mt="2rem">High Impact Bugs:</Heading>
                <Text mt="1rem">
                    The high impact bugs identified in the contracts are as follows:
                </Text>

                <ol style={{ marginLeft: '2rem' }}>
                    <li>
                        <b>Missing Input Validation in LockTokens Contract:</b>
                        <Text mt="0.5rem">
                            The swap function lacks input validation, which may lead to arithmetic underflows or overflows.
                        </Text>
                        <Text mt="0.5rem">
                            <b>Impact:</b> This vulnerability could allow attackers to manipulate the swap ratio, leading to an incorrect number of tokens being transferred.
                        </Text>
                        <Text mt="0.5rem">
                            <b>Suggested Resolution:</b> Implement comprehensive input validation checks to ensure secure and accurate token swapping.
                        </Text>
                        <Text mt="0.5rem">
                            <b>Security Issue Type:</b> Operational Security
                        </Text>
                        <Text mt="0.5rem">
                            <b>Example Code Snippet:</b>
                        </Text>
                        <Code>
                            {"function swap(uint256 amountAngelDollar, address senderAddress, address governanceTknContract) external { require(amountAngelDollar >= 30, 'Amount must be greater than 30'); require(angelDollar.balanceOf(senderAddress) >= amountAngelDollar, 'Insufficient AngelDollar balance'); // Rest of the function... }"}
                        </Code>
                    </li>
                    <li>
                        <b>Negative Swap Ratios in LockTokens Contract:</b>
                        <Text mt="0.5rem">
                            The updateSwapRatio function does not check for negative swap ratios, potentially causing unexpected behavior.
                        </Text>
                        <Text mt="0.5rem">
                            <b>Impact:</b> This could lead to erroneous swap ratios and result in unintended token distribution, affecting the token economy.
                        </Text>
                        <Text mt="0.5rem">
                            <b>Suggested Resolution:</b> Implement checks to prevent negative swap ratios and ensure the ratio remains within valid boundaries.
                        </Text>
                        <Text mt="0.5rem">
                            <b>Security Issue Type:</b> Operational Security
                        </Text>
                        <Text mt="0.5rem">
                            <b>Example Code Snippet:</b>
                        </Text>
                        <Code>
                            {"function updateSwapRatio(uint256 newRatio) external onlyOwner { require(newRatio > 0, 'Swap ratio must be greater than 0'); swapRatio = newRatio; }"}
                        </Code>
                    </li>
                </ol>

                <Heading as="h3" id="medium-impact-bugs" mt="2rem">Medium Impact Bugs:</Heading>
                <Text mt="1rem">
                    The medium impact bugs identified in the contracts are as follows:
                </Text>

                <ol style={{ marginLeft: '2rem' }}>
                    <li>
                        <b>Improper Access Control in AngelGovernanceToken Contract:</b>
                        <Text mt="0.5rem">
                            The setLockTokensContract function lacks proper access control, potentially allowing unauthorized users to modify the lockTokensContract address.
                        </Text>
                        <Text mt="0.5rem">
                            <b>Impact:</b> This vulnerability could allow malicious actors to manipulate the locking mechanism, leading to unauthorized access to locked tokens.
                        </Text>
                        <Text mt="0.5rem">
                            <b>Suggested Resolution:</b> Implement access control measures to restrict modifications to the lockTokensContract address.
                        </Text>
                        <Text mt="0.5rem">
                            <b>Security Issue Type:</b> Operational Security
                        </Text>
                        <Text mt="0.5rem">
                            <b>Example Code Snippet:</b>
                        </Text>
                        <Code>
                            {"modifier onlyOwner() { if(i_owner!=msg.sender) revert NotOwner(); _; }"}
                        </Code>
                    </li>
                </ol>

                <Heading as="h3" id="common-vulnerabilities" mt="2rem">Common Vulnerabilities:</Heading>
                <Text mt="1rem">
                    The common vulnerabilities identified in the contracts are as follows:
                </Text>

                <ol style={{ marginLeft: '2rem' }}>
                    <li>
                        <b>Failed Token Transfer Handling:</b>
                        <Text mt="0.5rem">
                            Contracts do not handle failed token transfers, resulting in potential locked funds without corresponding token issuance.
                        </Text>
                        <Text mt="0.5rem">
                            <b>Impact:</b> This could lead to loss of funds and potential discrepancies in the token balance, affecting user trust and the overall token economy.
                        </Text>
                        <Text mt="0.5rem">
                            <b>Suggested Resolution:</b> Implement robust error handling mechanisms to manage and handle failed token transfers effectively.
                        </Text>
                        <Text mt="0.5rem">
                            <b>Security Issue Type:</b> Operational Security
                        </Text>
                        <Text mt="0.5rem">
                            <b>Example Code Snippet:</b>
                        </Text>
                        <Code>
                            {"function transfer(address recipient, uint256 amount) public override returns (bool) { require(/*transferEnabled || */msg.sender == i_owner || msg.sender == lockTokensContract, 'Transfers are not enabled.'); _transfer(_msgSender(), recipient, amount); return true; }"}
                        </Code>
                    </li>
                    <li>
                        <b>Input Validation Checks:</b>
                        <Text mt="0.5rem">
                            Contracts lack comprehensive input validation checks, leaving them vulnerable to various potential vulnerabilities.
                        </Text>
                        <Text mt="0.5rem">
                            <b>Impact:</b> Insufficient input validation checks could expose contracts to multiple attack vectors, leading to potential token manipulation and unauthorized transactions.
                        </Text>
                        <Text mt="0.5rem">
                            <b>Suggested Resolution:</b> Implement thorough input validation checks across all functions to ensure the security and integrity of the smart contracts.
                        </Text>
                        <Text mt="0.5rem">
                            <b>Security Issue Type:</b> Operational Security
                        </Text>
                        <Text mt="0.5rem">
                            <b>Example Code Snippet:</b>
                        </Text>
                        <Code>
                            {"function swap(uint256 amountAngelDollar, address senderAddress, address governanceTknContract) external { require(amountAngelDollar >= 30, 'Amount must be greater than 30'); require(angelDollar.balanceOf(senderAddress) >= amountAngelDollar, 'Insufficient AngelDollar balance'); // Rest of the function... }"}
                        </Code>
                    </li>
                </ol>

                <Heading as="h2" id="future-improvements">Future Improvements:</Heading>
                <Text mt="1rem">
                    To enhance the security and functionality of the contracts, the following improvements are recommended:
                </Text>
                <ol style={{ marginLeft: '2rem' }}>
                    <li>Conduct comprehensive testing, including stress and security testing, to identify and resolve potential vulnerabilities.</li>
                    <li>Implement additional error handling mechanisms and logging functionalities to improve contract reliability and transparency.</li>
                </ol>

                <Heading as="h2" id="disclaimer">Disclaimer:</Heading>
                <Text mt="1rem">
                    Please note that the usage of these contracts is at your own risk. The development team bears no responsibility for any losses or damages incurred while interacting with the contracts.
                </Text>

            </Box>
        </>
    );
};

export default SecurityAuditPage;
