import React, { useState } from 'react';
import './SendFunds.css';

const SendFunds = () => {
  const [formData, setFormData] = useState({
    municipality: '',
    amount: '',
    purpose: '',
    date: ''
  });

  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Function to send funds to the municipality, e.g., API call to backend server
    console.log('Sending funds:', formData);

    // Simulate sending funds and show a confirmation message
    setConfirmationMessage(`Funds of ₹${formData.amount} sent to ${formData.municipality} for ${formData.purpose} on ${formData.date}`);
    setFormData({
      municipality: '',
      amount: '',
      purpose: '',
      date: ''
    });
  };

  return (
    <div className="send-funds">
      <h2>Send Funds</h2>
      <form className="send-funds-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="municipality">Municipality:</label>
          <input
            type="text"
            id="municipality"
            name="municipality"
            value={formData.municipality}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="purpose">Purpose:</label>
          <input
            type="text"
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="button">Send Funds</button>
      </form>
      {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}
    </div>
  );
};

export default SendFunds;