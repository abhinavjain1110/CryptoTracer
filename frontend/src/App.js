/* import React, { useState } from 'react';
import axios from 'axios';
import TransactionFlowChart from './TransactionFlowChart';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [address, setAddress] = useState('');
  const [transactions, setTransactions] = useState({ received: [], sent: [] });
  const [loading, setLoading] = useState(false);

  const handleFetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://192.168.29.169:34000/api/transactions/${address}`);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
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
          <button className="btn btn-primary" onClick={handleFetchTransactions} disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Transactions'}
          </button>
        </div>
      </div>
      <div className="chart-container">
        <TransactionFlowChart transactions={transactions.received} title="Received Transactions" />
        <TransactionFlowChart transactions={transactions.sent} title="Sent Transactions" />
      </div>
    </div>
  );
};

export default App;
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionFlowChart from './TransactionFlowChart';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import './styles.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [address, setAddress] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://192.168.29.169:34000/api/transactions/${address}?limit=100`);
      const allTransactions = [...response.data.received, ...response.data.sent];
      setTransactions(allTransactions.slice(0, 100)); // Limit to 100 transactions
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-3">
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
          <button className="btn btn-primary" onClick={handleFetchTransactions} disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Transactions'}
          </button>
        </div>
      </div>
      <div className="chart-container" >
        <Routes>
          <Route path="/" element={<TransactionFlowChart transactions={transactions} title="Transaction Flow" onNodeClick={(nodeAddress) => navigate(`/history/${nodeAddress}`)} />} />
          <Route path="/history/:addressId" element={<AddressDetail />} />
        </Routes>
      </div>
      {/*<Footer />  Ensure the footer is here, outside of the Routes */}
    </div>
  );
};

const AddressDetail = () => {
  const { addressId } = useParams();
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const response = await axios.get(`http://192.168.29.169:34000/api/address/${addressId}?limit=100`);
        setTransactionHistory(response.data);
      } catch (error) {
        console.error('Error fetching transaction history:', error);
      }
    };

    fetchTransactionHistory();
  }, [addressId]);

  return (
    <div className="container mt-5">
      <h2>Transaction History for Address: {addressId}</h2>
      <ul>
        {transactionHistory.map((tx, index) => (
          <li key={index}>{tx.details}</li>
        ))}
      </ul>
    </div>
  );
};

/* const Footer = () => (
  <footer className="footer mt-auto py-3 text-center">
    <div className="container">
      <span className="text-muted">Developed by Abhinav Jain. Check out the code on <a href="https://github.com/your-github-repo" target="_blank" rel="noopener noreferrer">GitHub</a>.</span>
    </div>
  </footer>
);
 */
export default App;






