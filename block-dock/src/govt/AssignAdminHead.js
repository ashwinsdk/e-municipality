import React, { useEffect, useState } from 'react';
import './css/style.css';
import { ethers } from "ethers";
import { useNavigate } from 'react-router-dom';



const AssignAdminHead = () => {

  const navigate = useNavigate();

  const [adminHead, setAdminHead] = useState({
    address: '',
    position: 'Municipality Head',
  });
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');


  //const PUBLIC_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  //Sepolia 
  const PUBLIC_ADDRESS = "0x26b01E3AD38E32645f308d11C81575D03f126da9";
  //const PUBLIC_ADDRESS = "0xb93E6A9CA2C59267cBfb484Ac0F24440B19574ca";

  const transfer = require("./contracts/GrievanceSystem.json");
  const ABI = transfer.abi;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminHead((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  useEffect(() => {
    async function init() {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);
        await provider.send('eth_requestAccounts', []);  // Request accounts from MetaMask
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(PUBLIC_ADDRESS, ABI, signer);
        setContract(contract);
        const accounts = await provider.listAccounts();
        setAccount(accounts[0]);
      } else {
        console.error('Ethereum provider is not available');
      }
    }
    init();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you would typically send the adminDetails to the server
    console.log('Assigned Admin Head Details:', adminHead);
    alert('Admin Head assigned successfully!');
  };

  const updateAdminHead = async () => {
    try {
      const tx = await contract.assignAdminHead(adminHead.address);
      await tx.wait();  // Wait for the transaction to be mined
      console.log('Admin Head updated successfully');
      setAdminHead(adminHead);
      navigate("/admin-govt-home")
    } catch (err) {
      console.error('Error updating admin head:', err);
    }
  };

  return (
    <div className="assign-admin-head">
      <header className="header">
        <h1>Block-Dock</h1>
      </header>

      <div className="register-container">
        <div className="register">
          <h2>👨🏻‍✈️ Assign Admin Head</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Metamask Address:
              <input
                type="text"
                name="address"
                value={adminHead.address}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Position:
              <input
                type="text"
                name="position"
                value={adminHead.position}
                readOnly
              />
            </label>

            <div className="button-group">
              <button type="submit" onClick={updateAdminHead}>Assign Admin Head</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AssignAdminHead;