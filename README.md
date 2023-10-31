# BlockBadge

BlockBadge is a blockchain-based certifications and reputation web application, designed to efficiently, securely, and transparently connect recruiters and employers to applicants. The unique feature of BlockBadge lies in its attestation-based system, utilizing Ethereum Attestation Service (EAS) where reputation and certification data are created based on attestations from verified Ethereum addresses. BlockBadge relies on the security, transparency, and immutability of the blockchain, as well as the strength and reputability of blockchain-based attestations made by verified participants in the network.

![BlockBadge Logo](link_to_your_logo.png)

> Proof of Excellence, Verified Securely

This project was created during the BCamp Apprenticeship, which combines elements of both a traditional internship and a hackathon to provide a personalized learning experience, professional networking opportunities, insights into blockchain development, and job opportunities.

## BCamp Assignments

| Week | Description | Presenation/GitHub Link |
|------|-------------|-----------------|
| 2 | Project Proposal | [Link to Google Doc](#) |
| 3 | Pseudo Smart Contract Code | [Link to Google Doc](#) |
| 4 | Smart Contract Tests | [Link to Google Doc](#) |
| 5 | Front-End Development | [Link to Google Doc](#) |
| 6 | Smart Contract Security | [Link to Google Doc](#) |

## Table of Contents
- [Installation & Running the Application](#installation--running-the-application)
- [Usage](#usage)
- [Enhanced Insights into BlockBadge](#enhanced-insights-into-blockbadge)
- [User Experience](#user-experience)
- [Streamlined Architecture](#streamlined-architecture)
- [Integrated Technologies](#integrated-technologies)
- [Collaborators](#collaborators)
- [License](#license)

## Installation & Running the Application

1. Download the project repository by either [downloading the zip file](https://github.com/0xBcamp/Sept23_Apprenticeship_Certification/archive/refs/heads/main.zip) or using Git to [clone the repository](https://github.com/0xBcamp/Sept23_Apprenticeship_Certification.git) (green "<>Code" button > Clone with HTTPS, SSH, or GitHub CLI)
2. Navigate to the project directory in your terminal: **cd Sept23_Apprenticeship_Certification**
3. After installing the dependencies, start the app: **npm run dev**
4. Open your web browser and go to: [http://localhost:3000](http://localhost:3000)

Make sure you have Node.js and other necessary dependencies installed and linked.

## Usage

BlockBadge provides the following functionalities:

- Connect your crypto wallet to perform transactions
- Utilize the Blockchain Naming Service (BNS) to register your account
- Make attestations via certifications or reputation attestations
- Navigate your dynamic profile to review your certifications and reputation attestations


## Enhanced Insights into BlockBadge

### What

BlockBadge serves as an all-in-one recruiting solution, providing comprehensive credential verification and applicant reputation assessment.

### Why

In response to the inefficiencies and opacity of traditional tech recruiting methods, BlockBadge strives to introduce a new standard of transparency in verifying skills and conducting background checks.

### How

We prioritize transparency, security, and robust data validation by leveraging Blockchain-based Attestation, supported by the Ethereum Attestation Service.

### Solutions Offered

- Streamlined Employment Evaluation Processes
- Elimination of Dependence on Applicant Tracking Systems (ATS)
- Simplified Referral Assessment Procedures
- Direct, Trustworthy Interaction without Third-Party Intermediaries

## User Experience

### Employer/Recruiter Experience

| Key Features/Functionalities |
|-----------------------------|
| Transparent Verification Process |
| Streamlined Skill Evaluation |
| Access to Validated Candidate Data |

### Applicant Experience

| Key Features/Functionalities |
|-----------------------------|
| Secure and Transparent Profile Management |
| Easy Reputation and Certification Attestation Process |
| Real-Time Notifications for Verification Updates |

## Streamlined Architecture

BlockBadge's streamlined architecture comprises:

- Smart contracts for certifications, incorporating a resolver contract that whitelists specific addresses (e.g., BCamp mentors for BCamp apprentices)
- Smart contracts for reputations, enabling direct and seamless attestations
- Two distinct schemas for both certifications and reputations within the Ethereum Attestation Service (EAS) infrastructure
- EAS Software Development Kit (SDK) for direct and secure attestations

## Integrated Technologies

- Solidity Smart Contracts for both Certifications and Reputation Attestation
- Ethereum Attestation Service (EAS) Architecture and SDK
- React and Next.js for the Front-End Interface
- Tailwind CSS for an intuitive and streamlined styling experience
- Notable additions:
  - Apollo Client for efficient data fetching and management
  - Web3Modal for simplified Ethereum wallet integration and management
  - Wagmi for Ethereum-based application integration and configuration

## Collaborators

- Harold: BCamp Mentor
- Aliraza: Full-Stack Developer & Security Architect
- Alfaqi: Front-End Developer
- Manraj: Back-End Developer
- Theresa: Project Manager & Code Reviewer

## License

This project is licensed under the [MIT](https://opensource.org/licenses/MIT) License - see the [LICENSE](LICENSE) file for details.
