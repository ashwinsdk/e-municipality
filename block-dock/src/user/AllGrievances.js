import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import './css/style.css';
const transfer = require("./contracts/GrievanceSystem.json");
const contractABI = transfer.abi;
//import contractABI from './contracts/GrievanceSystem.json'; // Import the ABI
//const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
//Sepolia 
const contractAddress = "0x26b01E3AD38E32645f308d11C81575D03f126da9";
//const contractAddress = "0xb93E6A9CA2C59267cBfb484Ac0F24440B19574ca";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const contract = new ethers.Contract(contractAddress, contractABI, signer);
function AllGrievances() {
    const [grievances, setGrievances] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchGrievances = async () => {
            if (!window.ethereum) {
                alert("Please install MetaMask!");
                return;
            }
            try {
                // Assuming your contract has a method `getGrievances` that fetches grievances
                const grievancesData = await contract.viewGrievances(); // Adjust based on actual function
                setGrievances(grievancesData);
                console.log("Grievances Data:", grievancesData);
            } catch (error) {
                console.error("Error fetching grievances:", error);
                alert("An error occurred while fetching grievances.");
            }
        };

        fetchGrievances();
    }, []);

    return (
        <div className="people-data-container">
            <header className="header">
                <h1>Block-Dock</h1>
            </header>

            <main className="content">
                <h2>ALL Grievances</h2>
                <div className="people-data-list">
                    <table className="people-data-table">
                        <thead>
                            <tr>
                                <th>Address</th>
                                <th>Name</th>
                                <th>Details</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grievances.length > 0 ? (
                                grievances.map((grievance, index) => (
                                    <tr key={index}>
                                        <td>{grievance.user || 'N/A'}</td>
                                        <td>{grievance.name || 'N/A'}</td>
                                        <td>{grievance.details || 'N/A'}</td>
                                        <td>{grievance.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No grievances found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default AllGrievances;