import React, { useState, useEffect } from 'react';


function WhenToApply() {
  // State to hold the applying time data and error messages
  const [applyingTime, setApplyingTime] = useState([]);
  const [error, setError] = useState(null);

  // Effect to fetch college application schedule data from the server
  useEffect(() => {
    fetch('/api/college-data') // Replace with actual API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setApplyingTime(data)) // Update state with the fetched data
      .catch((error) => {
        console.error('Error fetching college data:', error);
        setError('An error occurred while fetching data. Please try again later.');
      });
  }, []); // Empty dependency array, runs once on component mount

  return (
    <div className="ApplyDate">
      <h1>College Application Schedule</h1>
      {error ? (
        // Display an error message if there's an error
        <p className="error">{error}</p>
      ) : (
        // Display the table if there's no error
        <table>
          <thead>
            <tr>
              <th>Gender</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {applyingTime.map((entry, index) => (
              // Map through the applyingTime data and render table rows
              <tr key={index}>
                <td>{entry.gender}</td>
                <td>{entry.status}</td>
                <td>{entry.start_date}</td>
                <td>{entry.end_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default WhenToApply;
