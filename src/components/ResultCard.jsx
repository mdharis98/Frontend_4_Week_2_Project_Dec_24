import React from 'react';
import './ResultCard.css';


function ResultCard({ office, pincode }) {
  return (
    <div className="result-card">
      <p><strong>Name:</strong> {office.Name}</p>
      <p><strong>Pincode:</strong> {pincode}</p>
      <p><strong>District:</strong> {office.District}</p>
      <p><strong>State:</strong> {office.State}</p>
    </div>
  );
}

export default ResultCard;
