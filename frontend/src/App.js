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
import { Routes, Route, useNavigate } from 'react-router-dom';
import TransactionFlowChart from './TransactionFlowChart';
import AddressDetail from './AddressDetail'; // Ensure this is imported correctly
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const App = () => {
  const [address, setAddress] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFetchTransactions = async () => {
    setLoading(true);
    try {
      const [txResponse, balResponse] = await Promise.all([
        axios.get(`http://localhost:5000/api/transactions/${address}`),
        axios.get(`http://localhost:5000/api/balance/${address}`)
      ]);

      console.log('Transaction Response:', txResponse.data);
      console.log('Balance Response:', balResponse.data);

      const allTransactions = [...txResponse.data.received, ...txResponse.data.sent];
      setTransactions(allTransactions.slice(0, 100));

      const balanceWei = balResponse.data.balance;
      console.log('Balance Wei:', balanceWei);
      setBalance(balanceWei ? parseFloat(balanceWei) : 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  /* const weiToEth = (wei) => {
    const eth = wei / 1e18;
    console.log('ETH Value:', eth);
    return eth.toFixed(4);
  }; */

  // Generate Google search link
  const googleSearchLink = address ? `https://www.google.com/search?q=Ethereum+address+${encodeURIComponent(address)}` : '#';

  return (
    <div className="container">
      <h1 className="text-center" style={{ fontWeight: 'bold', marginBottom: '3' }}>
        <a href='/' style={{ color: 'black', textDecoration: 'none' }}>Crypto Transaction Flow</a>
      </h1>
      <div className="input-group mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Ethereum Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-dark mx-3" onClick={handleFetchTransactions} disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Transactions'}
          </button>
        </div>
      </div>
      {balance !== null && (
        <div className="mb-3">
          {/* <h4>Balance: {(balance)} ETH</h4> */}
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Address</th>
                <th>Balance (ETH)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{address}</td>
                <td>{(balance)}</td>
              </tr>
            </tbody>
          </table>
          {/* Google search link */}
          <div className="mt-3">
            <a href={googleSearchLink} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
              Search Address on Google
            </a>
          </div>
        </div>
      )}
      <div className="chart-container">
        <Routes>
          <Route
            path="/"
            element={
              <TransactionFlowChart
                transactions={transactions}
                title="Transaction Flow"
                onNodeClick={(nodeAddress) => navigate(`/history/${nodeAddress}`)}
              />
            }
          />
          <Route path="/history/:addressId" element={<AddressDetail />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;














