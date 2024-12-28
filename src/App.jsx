import React, { useState } from 'react';
import './App.css';
import Loader from './components/Loader.jsx';
import ResultCard from './components/ResultCard.jsx';


function App() {
  const [pincode, setPincode] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
  };

  const handleFilterChange = (e) => {
    const filter = e.target.value.toLowerCase();
    const filtered = data.filter((postOffice) =>
      postOffice.Name.toLowerCase().includes(filter)
    );
    setFilteredData(filtered);
  };

  const fetchPincodeData = async () => {
    if (pincode.length !== 6 || isNaN(pincode)) {
      setError('Please enter a valid 6-digit pincode.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const result = await response.json();

      if (result[0].Status === 'Success') {
        setData(result[0].PostOffice);
        setFilteredData(result[0].PostOffice);
      } else {
        setError('No data found for the entered pincode.');
        setData([]);
        setFilteredData([]);
      }
    } catch (err) {
      setError('An error occurred while fetching the data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1 className='heading'>Pincode Lookup</h1>

      <div className="pincode-input">
        <input
          type="text"
          placeholder="Enter Pincode"
          value={pincode}
          onChange={handlePincodeChange}
        />
        <button onClick={fetchPincodeData}>Lookup</button>
      </div>

      {error && <p className="error-message">{error}</p>}
      {loading && <Loader />}

      {data.length > 0 && (
        <div className="filter-input">
          <input
            type="text"
            placeholder="Filter by post office name"
            onChange={handleFilterChange}
          />
        </div>
      )}

      <div className="results">
        {filteredData.length > 0 ? (
          filteredData.map((office, index) => (
            <ResultCard key={index} office={office} pincode={pincode} />
          ))
        ) : (
          data.length > 0 && (
            <p className="no-results">Couldn’t find the postal data you’re looking for...</p>
          )
        )}
      </div>
    </div>
  );
}

export default App;