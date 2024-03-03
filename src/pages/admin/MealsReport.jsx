import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";
import { API_ROUTE } from "../../config/env.js";
const fakeStatistics = [
  { date: '2024-01-01', college: 'College A', mealType: 'Breakfast', mealsReceived: 50 },
  { date: '2024-01-01', college: 'College A', mealType: 'Lunch', mealsReceived: 80 },
  { date: '2024-01-01', college: 'College A', mealType: 'Dinner', mealsReceived: 70 },
  { date: '2024-01-02', college: 'College A', mealType: 'Breakfast', mealsReceived: 60 },
  { date: '2024-01-02', college: 'College A', mealType: 'Lunch', mealsReceived: 90 },
  { date: '2024-01-02', college: 'College A', mealType: 'Dinner', mealsReceived: 75 },
];

const Selector = ({ label, options, onSelect }) => {
  return (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ marginRight: '10px', fontWeight: 'bold' }}>{label}</label>
      <select onChange={(e) => onSelect(e.target.value)}>
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export function MealsReport(props){
  const [academicYear, setAcademicYear] = useState('');
  const [college, setCollege] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [mealType, setMealType] = useState('');
  const [statistics, setStatistics] = useState(null);

  // Function to filter statistics based on selected options
  const filterStatistics = () => {
    let filteredData = fakeStatistics.filter(stat => {
      return (
        (!academicYear || stat.date.includes(academicYear)) &&
        (!college || stat.college === college) &&
        (!startDate || stat.date >= startDate) &&
        (!endDate || stat.date <= endDate) &&
        (!mealType || stat.mealType === mealType)
      );
    });
    setStatistics(filteredData);
  };

  // Function to handle printing
  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Selector
        label="العام الأكاديمي"
        options={['2022', '2023', '2024']}
        onSelect={setAcademicYear}
      />
      <Selector
        label="الكلية"
        options={['College A', 'College B', 'College C']}
        onSelect={setCollege}
      />
      <div style={{ display: 'flex', marginBottom: '15px' }}>
        <div style={{ marginRight: '15px' }}>
          <label style={{ fontWeight: 'bold' }}>البداية</label>
          <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
        </div>
        <div>
          <label style={{ fontWeight: 'bold' }}>النهاية</label>
          <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
        </div>
      </div>
      <Selector
        label="نوع الوجبة"
        options={['Breakfast', 'Lunch', 'Dinner']}
        onSelect={setMealType}
      />

      <button style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '5px', margin: '10px 0', border: 'none', cursor: 'pointer' }} onClick={filterStatistics}>عرض الإحصائيات</button>

      {/* Print Button */}
      <button style={{ backgroundColor: '#28a745', color: '#fff', padding: '10px 20px', borderRadius: '5px', margin: '5px 0', border: 'none', cursor: 'pointer' }} onClick={handlePrint}>طباعة</button>

      {/* Display statistics */}
      {statistics && (
        <div>
          <h2 style={{ marginTop: '20px', fontWeight: 'bold' }}>إحصائيات استلام الوجبات</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>التاريخ</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>الكلية</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>نوع الوجبة</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>عدد الوجبات المستلمة</th>
              </tr>
            </thead>
            <tbody>
              {statistics.map((stat, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{stat.date}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{stat.college}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{stat.mealType}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{stat.mealsReceived}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
