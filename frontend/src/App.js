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
      const response = await axios.get(`http://localhost:5000/api/transactions/${address}`);
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
import React, { useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import TransactionFlowChart from './TransactionFlowChart';
import AddressDetail from './AddressDetail';
import 'bootstrap/dist/css/bootstrap.min.css';

//const BACKEND_SERVER_URL = process.env.BACKEND_SERVER_URL || "192.168.29.169:34000";

const App = () => {
  const [address, setAddress] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:34000/api/transactions/${address}`);
      // Combine received and sent transactions into a single array
      const allTransactions = [...response.data.received, ...response.data.sent];
      setTransactions(allTransactions);
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
        <TransactionFlowChart transactions={transactions} title="Transaction Flow" />
      </div>
      <Routes>
        <Route path="/address/:addressId" element={<AddressDetail />} />
      </Routes>
    </div>
  );
};

export default App;
