import React, { useEffect } from 'react';

export default function excludedCities(props) {

    const data = [
      { governorate:'القاهره', distance: '22 كم' },
       { governorate:'الجيزه', distance: '25 كم' },
      { governorate:'القليوبيه', distance: '51 كم' }
    ];

    const tableStyle = {
      width: '100%',
      borderCollapse: 'collapse',
      border: '1px solid #ddd'
    };

    const thTdStyle = {
      padding: '8px',
      textAlign: 'center'
    };

    const evenRowStyle = {
      backgroundColor: '#f2f2f2'
    };

    const printTable = () => {
      window.print();
    };

    useEffect(() => {
      window.printTable = printTable;
    }, []);

    return (
      <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px auto', padding: '20px' }}>
        <h1>المحافظات المستبعده </h1>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>المحافظات</th>
              <th style={thTdStyle}>المسافة</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} style={index % 2 === 0 ? evenRowStyle : {}}>
                <td style={thTdStyle}>{item.governorate}</td>
                <td style={thTdStyle}>{item.distance}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={printTable} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>طباعة</button>
      </div>
    );
}
