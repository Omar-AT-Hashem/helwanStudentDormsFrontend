import  { useState } from 'react';
import axios from 'axios';

function SearchByNationalId() {
  // State variables to manage national ID input, result (name and address), and errors.
  const [nationalId, setNationalId] = useState(0); // Initialize as 0 or an appropriate default value.
  const [result, setResult] = useState({ name: '', address: '' });
  const [error, setError] = useState('');

  // Function to handle the "Search" button click.
  const handleSearch = async () => {
    try {
      // Send a GET request to the backend API, passing the national ID as a query parameter.
      const response = await axios.get(`/api/search/${nationalId}`);
      
      // Assuming the API returns both name and address, extract them from the response.
      const { name, applicationStatus } = response.data;
      
      // Update the result state with the retrieved name and address, and clear any previous errors.
      setResult({ name, applicationStatus });
      setError('');
    } catch (error) {
      // Handle any errors that occur during the API request.
      console.error('Error:', error);
      
      // Set an error message to display to the user.
      setError('An error occurred while fetching the data.');
    }
  };

  return (
    <div>
      <h1>Search by National ID</h1>
      {/* Input field for entering the national ID */}
      <input
        type="number"
        placeholder="Enter National ID"
        value={nationalId}
        onChange={(e) => setNationalId(e.target.valueAsNumber)}
      />
      
      {/* Button to trigger the search */}
      <button onClick={handleSearch}>Search</button>
      
      {/* Display error message if an error occurs */}
      {error && <p>Error: {error}</p>}
      
      {/* Display the retrieved name if available */}
      {result.name && <p>Name: {result.name}</p>}
      
      {/* Display the retrieved address if available */}
      {result.address && <p>Address: {result.address}</p>}
    </div>
  );
}

export default SearchByNationalId;
