import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const imgStyle = {
        width: '100px', // Adjust the width as needed
        height: '120px', // Adjust the height as needed
        borderRadius: '50%', // Make the image circular
    };

    const cellStyle = {
        border: '1px solid black',
        padding: '10px',
        color: 'black',
    };


    return (
        <div className="page-container">
            <h1 style={{ color: 'white' }}>Smart Contract Security Reviews by the BlockBadge Team</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ margin: '20px' }}>
                    <img src="harold.png" alt="Harold" style={imgStyle} />
                    <p style={{ color: 'white' }}>Harold</p>
                </div>
                <div style={{ margin: '20px' }}>
                    <img src="manraj.png" alt="Manraj" style={imgStyle} />
                    <p style={{ color: 'white' }}>Manraj</p>
                </div>
                <div style={{ margin: '20px' }}>
                    <img src="aliraza.png" alt="Aliraza" style={imgStyle} />
                    <p style={{ color: 'white' }}>Aliraza</p>
                </div>
                <div style={{ margin: '20px' }}>
                    <img src="alfaqi.png" alt="Alfaqi" style={imgStyle} />
                    <p style={{ color: 'white' }}>Alfaqi</p>
                </div>
                <div style={{ margin: '20px' }}>
                    <img src="theresa.png" alt="Theresa" style={imgStyle} />
                    <p style={{ color: 'white' }}>Theresa</p>
                </div>
            </div>
            <p style={{ color: 'white' }}>
                Smart contract security is paramount in the blockchain industry, as inadequate security measures can lead to devastating consequences such as theft, fraud, and the compromise of sensitive information. <br></br>  <br></br> Without a thorough security review, vulnerabilities within smart contracts can be exploited by malicious actors, resulting in substantial financial losses and reputational damage.  <br></br> <br></br> Our team is dedicated to ensuring the highest level of security for smart contracts, providing comprehensive audits that identify and mitigate potential risks, thereby safeguarding our clients' assets and ensuring the integrity of their transactions. Through our rigorous assessment processes, we deliver actionable insights and recommendations, empowering our clients to deploy secure and reliable smart contracts that inspire trust and confidence among their users.
            </p>

            <h2 id="check-for" style={{ color: 'white' }}>Our Security Team Checks for the Below Issues, and More...</h2>
            <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '20px' }}>
                <tr style={{ backgroundColor: 'lightgrey' }}>
                    <th style={cellStyle}>Security Issue Type</th>
                    <th style={cellStyle}>Issue Description</th>
                </tr>
                <tr style={{ backgroundColor: 'white' }}>
                    <td style={cellStyle}>Reentrancy Attack</td>
                    <td style={cellStyle}>A situation where a vulnerable smart contract function makes an external call to a malicious contract, temporarily giving up control of the transaction flow. The malicious contract then repeatedly calls the original smart contract function before it finishes executing while draining its funds.</td>
                </tr>
                <tr style={{ backgroundColor: 'lightgrey' }}>
                    <td style={cellStyle}>Flash Loan Attack</td>
                    <td style={cellStyle}>A situation where an attacker takes out a flash loan (a form of uncollateralized lending) from a lending protocol and uses it in conjunction with various types of gimmickry to manipulate the market in their favor.</td>
                </tr>
                <tr style={{ backgroundColor: 'white' }}>
                    <td style={cellStyle}>Sybil Attack</td>
                    <td style={cellStyle}>An attack where an attacker creates multiple identities to gain a disproportionately large influence.</td>
                </tr>
                <tr style={{ backgroundColor: 'lightgrey' }}>
                    <td style={cellStyle}>Front Run/Sandwich</td>
                    <td style={cellStyle}>An attack where an attacker exploits the predictability of the transaction order.</td>
                </tr>
                <tr style={{ backgroundColor: 'white' }}>
                    <td style={cellStyle}>Denial of Service</td>
                    <td style={cellStyle}>An attack that disrupts the normal functioning of a system or network by flooding it with traffic.</td>
                </tr>
                <tr style={{ backgroundColor: 'lightgrey' }}>
                    <td style={cellStyle}>Operational Security</td>
                    <td style={cellStyle}>Concerns related to the implementation and management of security practices.</td>
                </tr>
            </table>



            <p style={{ color: 'white' }}> See our <span></span>
                <Link to="/security-audit" style={{ color: 'white' }}>
                    Example Audit
                </Link>
                <span></span> for the Angel Crowdfunding Project.
            </p>
        </div>
    );
};

export default HomePage;



