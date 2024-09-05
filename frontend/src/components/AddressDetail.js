/* import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddressDetail = () => {
  const { addressId } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/transactions/${addressId}`);
        setTransactions(response.data.received.concat(response.data.sent)); // Combine received and sent transactions
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [addressId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Transactions for Address: {addressId}</h2>
      <ul className="list-group">
        {transactions.map((tx, index) => (
          <li key={index} className="list-group-item">
            From: {tx.from}, To: {tx.to}, Amount: {tx.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressDetail;


 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import TransactionFlowChart from './TransactionFlowChart';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const AddressDetail = () => {
  const { addressId } = useParams();
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [creditScore, setCreditScore] = useState(null);
  const [balance, setBalance] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const [txResponse, balResponse] = await Promise.all([
          axios.get(`http://localhost:5000/api/transactions/${addressId}`),
          axios.get(`http://localhost:5000/api/balance/${addressId}`)
        ]);

        const allTransactions = [...txResponse.data.received, ...txResponse.data.sent];
        setTransactionHistory(allTransactions);

        const balanceWei = balResponse.data.balance;
        console.log('Fetched Balance:', balanceWei);
        setBalance(balanceWei ? parseFloat(balanceWei) : 0);
        const mockCreditScore = (Math.random() * (10-1)+1).toFixed(2);
        setCreditScore(mockCreditScore);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTransactionHistory();
  }, [addressId]);

  const googleSearchLink = addressId ? `https://www.google.com/search?q=${encodeURIComponent(addressId)}` : '#';
  const etherscanSearchLink = addressId ? `https://sepolia.etherscan.io/address/${encodeURIComponent(addressId)}` : '#';


  return (
    <div className="container">
      <h2>Transaction History for Address: {addressId}</h2>
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
                <td>{addressId}</td>
                <td>{(balance)}</td>
                <td style={{ color: creditScore < 4 ? 'green' : creditScore < 8 ? 'yellow' : 'red' }}>
                  {creditScore}
                </td>
              </tr>
            </tbody>
          </table>
          {/* Google search link */}
          <div className="mt-3">
            <a href={googleSearchLink} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
              Search on Google
            </a>
            <span className="mx-2"></span> {/* Added space between buttons */}
            <a href={etherscanSearchLink} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
              Search on Etherscan
            </a>
          </div>
        </div>
      )}
      <TransactionFlowChart
        transactions={transactionHistory}
        onNodeClick={(nodeAddress) => navigate(`/history/${nodeAddress}`)}
      />
    </div>
  );
};

export default AddressDetail;
