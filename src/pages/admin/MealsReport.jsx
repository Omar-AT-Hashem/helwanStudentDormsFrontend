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

// Selector Component
const Selector = ({ label, options, onSelect }) => {
  return (
    <div>
      <label>{label}</label>
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
    <div>
      <Selector
        label="العام الأكاديمى"
        options={['2022', '2023', '2024']}
        onSelect={setAcademicYear}
      />
      <Selector
        label="الكلية"
        options={['College A', 'College B', 'College C']}
        onSelect={setCollege}
      />
      <div>
        <label>الفترة</label>
        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
      </div>
      <div>
        <label>إلى</label>
        <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
      </div>
      <Selector
        label="الوجبة"
        options={['Breakfast', 'Lunch', 'Dinner']}
        onSelect={setMealType}
      />

      <button style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '5px', margin: '5px', border: 'none', cursor: 'pointer' }} onClick={filterStatistics}>عرض الإحصائيات</button>

      {/* Print Button */}
      <button style={{ backgroundColor: '#28a745', color: '#fff', padding: '10px 20px', borderRadius: '5px', margin: '5px', border: 'none', cursor: 'pointer' }} onClick={handlePrint}>طباعة</button>

      {/* Display statistics */}
      {statistics && (
        <div>
          <h2>إحصائيات استلام الوجبات</h2>
          <table>
            <thead>
              <tr>
                <th>التاريخ</th>
                <th>الكلية</th>
                <th>نوع الوجبة</th>
                <th>عدد الوجبات المستلمة</th>
              </tr>
            </thead>
            <tbody>
              {statistics.map((stat, index) => (
                <tr key={index}>
                  <td>{stat.date}</td>
                  <td>{stat.college}</td>
                  <td>{stat.mealType}</td>
                  <td>{stat.mealsReceived}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
