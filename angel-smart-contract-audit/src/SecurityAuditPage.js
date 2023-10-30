import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';



const SecurityAuditPage = () => {
    const data = [
        { name: 'Bugs', value: 10},
        { name: 'Clean', value: 90 },
    ];

    const COLORS = ['red', 'green'];

    return (
        <div className="page-container" style={{ color: 'white', display: 'flex', flexDirection: 'column' }}>

            <div style={{ width: '100%' }}>
            <h1>Smart Contract Security Review: Angel Crowd Funding Project</h1>
            </div>

            <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ width: '30%', marginRight: '10px' }}>
                    <h2>Table of Contents</h2>
                    <ul>
                        <li>
                            <a href="#overview">Overview</a>
                        </li>
                        <li>
                            <a href="#scope">Scope</a>
                        </li>
                        <li>
                            <a href="#functionality">Functionality</a>
                        </li>
                        <li>
                            <a href="#bugs">Bugs</a>
                            <ul>
                                <li><a href="#critical-bugs">Critical Bugs</a></li>
                                <li><a href="#high-impact-bugs">High Impact Bugs</a></li>
                                <li><a href="#medium-impact-bugs">Medium Impact Bugs</a></li>
                                <li><a href="#common-vulnerabilities">Common Vulnerabilities</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#future-improvements">Future Improvements</a>
                        </li>
                        <li>
                            <a href="#disclaimer">Disclaimer</a>
                        </li>
                    </ul>
            </div>

                <div style={{ width: '70%' }}>
                    <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={140}
                                fill="#8884d8"
                                label
                            >
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
                </div>
            </div>

            <div style={{ width: '100%' }}>
            <h2 id="overview">Overview:</h2>
            <p>
                The Angel crowdfunding platform is a decentralized ecosystem designed to revolutionize project funding and community engagement. Leveraging blockchain technology, the platform introduces the AngelDollar (ADT) and AngelGovernanceToken (AGT) contracts, providing users with a secure and transparent environment for supporting various projects and participating in governance decisions. With the AngelDollar serving as the native token for transactions and contributions, participants can seamlessly engage in fundraising activities while earning rewards. The AngelGovernanceToken enables users to actively contribute to platform governance, fostering a collaborative and inclusive decision-making process. The LockTokens contract facilitates the seamless conversion of AngelDollar tokens to AngelGovernanceToken tokens, enhancing user accessibility and promoting a vibrant and dynamic community-driven ecosystem. With its innovative approach to crowdfunding and community empowerment, the platform aims to foster a more inclusive and transparent funding landscape for diverse projects and initiatives.
            </p>
            <h2 id="scope">Scope:</h2>
            <p>
                The below 3 solidity smart contracts were reviewed:
            </p>
            <ul>
                <li>
                    <a href="https://github.com/0xBcamp/Sept23_Crowdfunding/blob/master/contracts/AngelDollar.sol" target="_blank" rel="noopener noreferrer">AngelDollar.sol</a>
                    <p>This contract represents the native token of the crowdfunding platform. It serves as a medium of exchange within the ecosystem and can be used for various purposes, including supporting projects, participating in fundraising campaigns, or receiving rewards for contributions. The contract allows for the creation, transfer, and management of the AngelDollar token.</p>
                </li>
                <li>
                    <a href="https://github.com/0xBcamp/Sept23_Crowdfunding/blob/master/contracts/AngelGovernanceToken.sol" target="_blank" rel="noopener noreferrer">AngelGovernanceToken.sol</a>
                    <p>The AngelGovernanceToken is an essential component for platform governance. Holders of this token are granted voting rights and may participate in decision-making processes related to the crowdfunding platform. The contract enables minting, burning, and transferring of the governance tokens, ensuring that participants have the necessary resources to influence platform decisions.</p>
                </li>
                <li>
                    <a href="https://github.com/0xBcamp/Sept23_Crowdfunding/blob/master/contracts/LockTokens.sol" target="_blank" rel="noopener noreferrer">LockTokens.sol</a>
                    <p>This contract facilitates the exchange of AngelDollar tokens for AngelGovernanceToken tokens at a predetermined swap ratio. It ensures a mechanism for users to convert their AngelDollars into governance tokens, enabling them to engage in platform governance activities. The contract provides the functionality to update the swap ratio, giving the platform flexibility to adjust the conversion rate based on various factors.</p>
                </li>
            </ul>


            <h2 id="functionality">Functionality:</h2>
            <ol>
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

                <h2 id="bugs">Bugs:</h2>
                <ol>
                    <li>
                        <b id="critical-bugs">Critical Bugs:</b>
                        <ul>
                            <li>
                                Unbounded Minting in AngelDollar Contract:
                                <p>The mint function does not have a maximum supply check, potentially leading to unintended inflation.</p>
                                <p><b>Impact:</b> This could result in an unrestricted token supply, leading to devaluation of the token and loss of investor confidence.</p>
                                <p><b>Suggested Resolution:</b> Implement a maximum supply check in the mint function to prevent uncontrolled inflation.</p>
                                <p><b>Security Issue Type:</b> Operational Security</p>
                                <p>Example Code Snippet:</p>
                                <code>{"function mint(address account, uint256 value) public onlyOwner { if (account == address(0)) {revert ERC20InvalidReceiver(address(0)); } _update(address(0), account, value); }"}</code>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <b id="high-impact-bugs">High Impact Bugs:</b>
                        <ul>
                            <li>
                                Missing Input Validation in LockTokens Contract:
                                <p>The swap function lacks input validation, which may lead to arithmetic underflows or overflows.</p>
                                <p><b>Impact:</b> This vulnerability could allow attackers to manipulate the swap ratio, leading to an incorrect number of tokens being transferred.</p>
                                <p><b>Suggested Resolution:</b> Implement comprehensive input validation checks to ensure secure and accurate token swapping.</p>
                                <p><b>Security Issue Type:</b> Operational Security</p>
                                <p>Example Code Snippet:</p>
                                <code>{"function swap(uint256 amountAngelDollar, address senderAddress, address governanceTknContract) external { require(amountAngelDollar >= 30, 'Amount must be greater than 30'); require(angelDollar.balanceOf(senderAddress) >= amountAngelDollar, 'Insufficient AngelDollar balance'); // Rest of the function... }"}</code>
                            </li>
                            <li>
                                Negative Swap Ratios in LockTokens Contract:
                                <p>The updateSwapRatio function does not check for negative swap ratios, potentially causing unexpected behavior.</p>
                                <p><b>Impact:</b> This could lead to erroneous swap ratios and result in unintended token distribution, affecting the token economy.</p>
                                <p><b>Suggested Resolution:</b> Implement checks to prevent negative swap ratios and ensure the ratio remains within valid boundaries.</p>
                                <p><b>Security Issue Type:</b> Operational Security</p>
                                <p>Example Code Snippet:</p>
                                <code>{"function updateSwapRatio(uint256 newRatio) external onlyOwner { require(newRatio > 0, 'Swap ratio must be greater than 0'); swapRatio = newRatio; }"}</code>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <b id="medium-impact-bugs">Medium Impact Bugs:</b>
                        <ul>
                            <li>
                                Improper Access Control in AngelGovernanceToken Contract:
                                <p>The setLockTokensContract function lacks proper access control, potentially allowing unauthorized users to modify the lockTokensContract address.</p>
                                <p><b>Impact:</b> This vulnerability could allow malicious actors to manipulate the locking mechanism, leading to unauthorized access to locked tokens.</p>
                                <p><b>Suggested Resolution:</b> Implement access control measures to restrict modifications to the lockTokensContract address.</p>
                                <p><b>Security Issue Type:</b> Operational Security</p>
                                <p>Example Code Snippet:</p>
                                <code>{"modifier onlyOwner() { if(i_owner!=msg.sender) revert NotOwner(); _; }"}</code>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <b id="common-vulnerabilities">Common Vulnerabilities:</b>
                        <ul>
                            <li>
                                Failed Token Transfer Handling:
                                <p>Contracts do not handle failed token transfers, resulting in potential locked funds without corresponding token issuance.</p>
                                <p><b>Impact:</b> This could lead to loss of funds and potential discrepancies in the token balance, affecting user trust and the overall token economy.</p>
                                <p><b>Suggested Resolution:</b> Implement robust error handling mechanisms to manage and handle failed token transfers effectively.</p>
                                <p><b>Security Issue Type:</b> Operational Security</p>
                                <p>Example Code Snippet:</p>
                                <code>{"function transfer(address recipient, uint256 amount) public override returns (bool) { require(/*transferEnabled || */msg.sender == i_owner || msg.sender == lockTokensContract, 'Transfers are not enabled.'); _transfer(_msgSender(), recipient, amount); return true; }"}</code>
                            </li>
                            <li>
                                Input Validation Checks:
                                <p>Contracts lack comprehensive input validation checks, leaving them vulnerable to various potential vulnerabilities.</p>
                                <p><b>Impact:</b> Insufficient input validation checks could expose contracts to multiple attack vectors, leading to potential token manipulation and unauthorized transactions.</p>
                                <p><b>Suggested Resolution:</b> Implement thorough input validation checks across all functions to ensure the security and integrity of the smart contracts.</p>
                                <p><b>Security Issue Type:</b> Operational Security</p>
                                <p>Example Code Snippet:</p>
                                <code>{"function swap(uint256 amountAngelDollar, address senderAddress, address governanceTknContract) external { require(amountAngelDollar >= 30, 'Amount must be greater than 30'); require(angelDollar.balanceOf(senderAddress) >= amountAngelDollar, 'Insufficient AngelDollar balance'); // Rest of the function... }"}</code>
                            </li>
                        </ul>
                    </li>
                </ol>

            <h2 id="future-improvements">Future Improvements:</h2>
            <ul>
                <li>Conduct further testing to ensure the robustness and security of the contract.</li>
                <li>Implement additional error handling and logging mechanisms to enhance contract reliability.</li>
            </ul>

            <h2 id="disclaimer">Disclaimer:</h2>
            <p>Usage of this contract is at your own risk. The development team is not liable for any losses or damages incurred while interacting with the contract.</p>
            </div>
        </div>
    );
};

export default SecurityAuditPage;