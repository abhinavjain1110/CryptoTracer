import React, { useState } from 'react';
import { QrReader } from '@cmdnio/react-qr-reader';
import { useNavigate } from 'react-router-dom';

const ScanAddr = () => {
  const [data, setData] = useState('No result');
  const [copyButtonText, setCopyButtonText] = useState('Copy');
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

  const handleCopy = () => {
    navigator.clipboard.writeText(data).then(() => {
      setCopyButtonText('Copied!');
      setTimeout(() => setCopyButtonText('Copy'), 2000);
    });
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
      <div className="mt-3">
        <h3>Scanned data:</h3>
        <div className="input-group">
          <input type="text" className="form-control form-control-lg" value={data} readOnly />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary mx-3" type="button" onClick={handleCopy}>
              {copyButtonText}
            </button>
          </div>
        </div>
      </div>
      <button className="btn btn-dark mt-3" onClick={handleBack}>Back to Home</button>
    </div>
  );
};

export default ScanAddr;
