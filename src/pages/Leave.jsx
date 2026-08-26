import React, { useState } from 'react';
import axios from 'axios';

const Leave = () => {
  const [formData, setFormData] = useState({
    startdate: '',
    enddate: '',
    reason: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Connecting to your live Node.js backend
      const response = await axios.post('http://localhost:5000/api/leave/apply', {
        userId: "64b0f1a2c3d4e5f6a7b8c9d0", // Demo User ID
        startDate: formData.startdate,
        endDate: formData.enddate,
        reason: formData.reason
      });

      if (response.status === 201 || response.status === 200) {
        alert("Leave Request Submitted Successfully to Database!");
        setFormData({ startdate: '', enddate: '', reason: '' }); // Clears form fields
      }
    } catch (error) {
      console.error("Backend Error:", error);
      alert(error.response?.data?.message || "Server Error occurred while applying leave!");
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>Apply for Leave</h2>
      
      <form onSubmit={handleSubmit} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Start Date:</label>
          <input 
            type="date" 
            name="startdate" 
            value={formData.startdate} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>End Date:</label>
          <input 
            type="date" 
            name="enddate" 
            value={formData.enddate} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Reason for Leave:</label>
          <textarea 
            name="reason" 
            value={formData.reason} 
            onChange={handleChange} 
            required 
            rows="4"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
          />
        </div>

        <button 
          type="submit" 
          style={{ padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Submit Leave Request
        </button>
      </form>
    </div>
  );
};

export default Leave;