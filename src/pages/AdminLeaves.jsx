import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminLeaves = () => {
  const [leaves, setLeaves] = useState([]);

  // Fetch all employee leave requests from backend
  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/leave/all');
      setLeaves(response.data);
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  // Handle Approve or Reject Actions
  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/leave/status/${id}`, { status });
      alert(`Leave request ${status} successfully!`);
      fetchLeaves(); // Refresh table data
    } catch (error) {
      alert("Failed to update status.");
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ borderBottom: '2px solid #28a745', paddingBottom: '10px', color: '#333' }}>
        Admin Dashboard - All Leave Requests
      </h2>
      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: '12px' }}>Start Date</th>
            <th style={{ padding: '12px' }}>End Date</th>
            <th style={{ padding: '12px' }}>Reason</th>
            <th style={{ padding: '12px' }}>Status</th>
            <th style={{ padding: '12px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px' }}>{new Date(leave.startDate).toLocaleDateString()}</td>
              <td style={{ padding: '12px' }}>{new Date(leave.endDate).toLocaleDateString()}</td>
              <td style={{ padding: '12px' }}>{leave.reason}</td>
              <td style={{ padding: '12px', fontWeight: 'bold', color: leave.status === 'Pending' ? '#ffc107' : leave.status === 'Approved' ? '#28a745' : '#dc3545' }}>
                {leave.status}
              </td>
              <td style={{ padding: '12px', display: 'flex', gap: '10px' }}>
                {leave.status === 'Pending' && (
                  <>
                    <button onClick={() => handleStatusUpdate(leave._id, 'Approved')} style={{ padding: '6px 12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                      Approve
                    </button>
                    <button onClick={() => handleStatusUpdate(leave._id, 'Rejected')} style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                      Reject
                    </button>
                  </>
                )}
                {leave.status !== 'Pending' && <span style={{ color: '#666', fontSize: '14px' }}>Decision Taken</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminLeaves;