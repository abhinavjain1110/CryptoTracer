import React, { useState } from 'react';
import { QrReader } from '@cmdnio/react-qr-reader';
import { useNavigate } from 'react-router-dom';

const ScanAddr = () => {
  const [data, setData] = useState('No result');
  const navigate = useNavigate();

  const handleScan = (result) => {
    if (result) {
      setData(result?.text);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2>Scan QR Code</h2>
      <div style={{ width: '300px', margin: 'auto' }}>
        <QrReader
          delay={300}
          onError={handleError}
          onResult={handleScan}
          style={{ width: '100%' }}
        />
      </div>
      <p className="mt-3">Scanned data: {data}</p>
      <button className="btn btn-primary mt-3" onClick={handleBack}>Back to Home</button>
    </div>
  );
};

export default ScanAddr;
