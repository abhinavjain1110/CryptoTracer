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
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import TransactionFlowChart from './components/TransactionFlowChart';
import AddressDetail from './components/AddressDetail'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/styles.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import UpcomingFeatures from './components/UpcomingFeatures';
import ScanAddr from './components/ScanAddr';

const App = () => {
  const [address, setAddress] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(null);
  const [creditScore, setCreditScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleFetchTransactions = async () => {
    setLoading(true);
    try {
      const [txResponse, balResponse] = await Promise.all([
        axios.get(`http://localhost:5000/api/transactions/${address}`),
        axios.get(`http://localhost:5000/api/balance/${address}`)
      ]);

      const allTransactions = [...txResponse.data.received, ...txResponse.data.sent];
      setTransactions(allTransactions.slice(0, 100));

      const balanceWei = balResponse.data.balance;
      setBalance(balanceWei ? parseFloat(balanceWei) : 0);

      const mockCreditScore = (Math.random() * (10 - 7) + 7).toFixed(2);
      setCreditScore(mockCreditScore);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const isUpcomingFeaturesPage = location.pathname === '/upcoming-features';

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <div className="container flex-grow-1">
        <Routes>
          {!isUpcomingFeaturesPage && (
            <>
              <Route
                path="/"
                element={
                  <>
                    <h1 className="text-center" style={{ fontWeight: 'bold', marginBottom: '3', fontFamily: 'sans-serif' }}>
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
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>Address</th>
                              <th>Balance (ETH)</th>
                              <th>Risk Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{address}</td>
                              <td>{balance}</td>
                              <td style={{ color: creditScore < 4 ? 'green' : creditScore < 8 ? 'orange' : 'red' }}>
                                {creditScore}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                    <TransactionFlowChart
                      transactions={transactions}
                      onNodeClick={(nodeAddress) => navigate(`/history/${nodeAddress}`)}
                    />
                  </>
                }
              />
              <Route path="/history/:addressId" element={<AddressDetail />} />
            </>
          )}
          <Route path="/qr-scanner" element={<ScanAddr />} /> 
          <Route path="/upcoming-features" element={<UpcomingFeatures />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;















