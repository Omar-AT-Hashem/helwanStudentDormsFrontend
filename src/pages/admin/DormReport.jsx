import React, { useState, useEffect } from 'react';
import { API_ROUTE } from "../../config/env.js";
import axios from "axios";
export function DormReport(props) {
  const [dormData, setDormData] = useState([]);

  useEffect(() => {
    // Call backend API to fetch dorm data
    fetchDormData();
  }, []);

  // Function to fetch dorm data from backend
  const fetchDormData = () => {
    // Placeholder API call, replace with actual API call later
    const fakeDormData = [
      { city: 'المدينة أ', gender: 'ذكر', buildings: ['مبنى 1', 'مبنى 2'], rooms: 50, beds: 100 },
      { city: 'المدينة أ', gender: 'أنثى', buildings: ['مبنى 3'], rooms: 60, beds: 120 },
      { city: 'المدينة ب', gender: 'ذكر', buildings: ['مبنى 4', 'مبنى 5'], rooms: 40, beds: 80 },
      { city: 'المدينة ب', gender: 'أنثى', buildings: ['مبنى 6'], rooms: 55, beds: 110 },
    ];
    setDormData(fakeDormData);
  };

  const calculateTotal = (field) => {
    return dormData.reduce((total, dorm) => total + dorm[field], 0);
  };

  // Function to join buildings
  const joinBuildings = (buildings) => {
    return buildings.join(', ');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ direction: 'rtl', textAlign: 'right' }}>
      <h2 style={{ color: '#007bff' }}>معلومات السكن</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd', marginBottom: '20px' }}>
        <thead style={{ backgroundColor: '#f2f2f2' }}>
          <tr>
            <th style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>المدينة</th>
            <th style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>النوع</th>
            <th style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>المبنى</th>
            <th style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>الغرف</th>
            <th style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>الأسرة</th>
          </tr>
        </thead>
        <tbody>
          {dormData.map((dorm, index) => (
            <tr key={index}>
              <td style={{ padding: '10px', textAlign: 'center' }}>{dorm.city}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{dorm.gender}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{joinBuildings(dorm.buildings)}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{dorm.rooms}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{dorm.beds}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="3" style={{ padding: '10px', textAlign: 'center', borderTop: '1px solid #ddd' }}>المجموع</td>
            <td style={{ padding: '10px', textAlign: 'center', borderTop: '1px solid #ddd' }}>{calculateTotal('rooms')}</td>
            <td style={{ padding: '10px', textAlign: 'center', borderTop: '1px solid #ddd' }}>{calculateTotal('beds')}</td>
          </tr>
        </tbody>
      </table>
      <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={handlePrint}>طباعة</button>
    </div>
  );
};
