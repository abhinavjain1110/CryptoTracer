import React, { useState } from 'react';
import axios from 'axios';
import TransactionFlowChart from './TransactionFlowChart';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [address, setAddress] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/transactions/${address}`);
      const allTransactions = [...response.data.received, ...response.data.sent];
      setTransactions(allTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="container mt-1" style={{ backgroundColor: '#3D3A4A', color: 'white' }}> {/* Dark background with neon blue text */}
      <h1 className="text-center">Crypto Transaction Flow</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Ethereum Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-secondary" onClick={handleFetchTransactions} disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Transactions'}
          </button>
          <button className="btn btn-primary ml-2" onClick={() => navigate('/scanaddr')}>
            Scan Address
          </button>
        </div>
      </div>
      <div className="chart-container">
        <TransactionFlowChart transactions={transactions} title="Transaction Flow" />
      </div>
    </div>
  );
};
export default Home;