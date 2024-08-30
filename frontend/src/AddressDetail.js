import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddressDetail = () => {
  const { addressId } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://backend:5000192.168.29.169:34000/api/transactions/${addressId}`);
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
