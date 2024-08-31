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
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import TransactionFlowChart from './TransactionFlowChart';
// import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
// import './styles.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const App = () => {
//   const [address, setAddress] = useState('');
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleFetchTransactions = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:5000/api/transactions/${address}?limit=100`);
//       const allTransactions = [...response.data.received, ...response.data.sent];
//       setTransactions(allTransactions.slice(0, 100)); // Limit to 100 transactions
//     } catch (error) {
//       console.error('Error fetching transactions:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h1 className="text-center" style={{ fontWeight: 'bold', marginBottom: '2' }}>
//         Crypto Transaction Flow
//       </h1>
//       <div className="input-group mb-3">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Enter Ethereum Address"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//         />
//         <div className="input-group-append">
//           <button className="btn btn-dark mx-3" onClick={handleFetchTransactions} disabled={loading}>
//             {loading ? 'Loading...' : 'Fetch Transactions'}
//           </button>
//         </div>
//       </div>
//       <div className="chart-container">
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <TransactionFlowChart
//                 transactions={transactions}
//                 title="Transaction Flow"
//                 onNodeClick={(nodeAddress) => navigate(`/history/${nodeAddress}`)}
//               />
//             }
//           />
//           <Route path="/history/:addressId" element={<AddressDetail />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// const AddressDetail = () => {
//   const { addressId } = useParams();
//   const [transactionHistory, setTransactionHistory] = useState([]);
//   const navigate = useNavigate(); // Import useNavigate

//   useEffect(() => {
//     const fetchTransactionHistory = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/transactions/${addressId}?limit=100`);
//         const allTransactions = [...response.data.received, ...response.data.sent];
//         setTransactionHistory(allTransactions);
//       } catch (error) {
//         console.error('Error fetching transaction history:', error);
//       }
//     };

//     fetchTransactionHistory();
//   }, [addressId]);

//   return (
//     <div className="container mt-5">
//       <h2>Transaction History for Address: {addressId}</h2>
//       <TransactionFlowChart
//         transactions={transactionHistory}
//         //title={`${addressId}`}
//         onNodeClick={(nodeAddress) => navigate(`/history/${nodeAddress}`)}
//       />
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionFlowChart from './TransactionFlowChart';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ScanAddr from './ScanAddr';

const App = () => {
  const [address, setAddress] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/transactions/${address}?limit=100`);
      const allTransactions = [...response.data.received, ...response.data.sent];
      setTransactions(allTransactions.slice(0, 100)); // Limit to 100 transactions
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center" style={{ fontWeight: 'bold', marginBottom: '2' }}>
        Crypto Transaction Flow
      </h1>
      <div className="input-group mb-3">
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
          <button className="btn btn-primary ml-2" onClick={() => navigate('/scanaddr')}>
            Scan Address
          </button>
        </div>
      </div>
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
          <Route path="/scanaddr" element={<ScanAddr />} />
        </Routes>
      </div>
    </div>
  );
};

const AddressDetail = () => {
  const { addressId } = useParams();
  const [transactionHistory, setTransactionHistory] = useState([]);
  const navigate = useNavigate(); // Import useNavigate

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/transactions/${addressId}?limit=100`);
        const allTransactions = [...response.data.received, ...response.data.sent];
        setTransactionHistory(allTransactions);
      } catch (error) {
        console.error('Error fetching transaction history:', error);
      }
    };

    fetchTransactionHistory();
  }, [addressId]);

  return (
    <div className="container mt-5">
      <h2>Transaction History for Address: {addressId}</h2>
      <TransactionFlowChart
        transactions={transactionHistory}
        //title={`${addressId}`}
        onNodeClick={(nodeAddress) => navigate(`/history/${nodeAddress}`)}
      />
    </div>
  );
};

export default App;







