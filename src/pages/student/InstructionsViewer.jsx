import React, { useState, useEffect } from 'react';

function InstructionsViewer() {
  // Define state variables for instructions and errors
  const [instructions, setInstructions] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Use the useEffect hook to fetch data when the component mounts
    fetch('/api/instructions')
      .then((response) => {
        // Check if the response status is okay; otherwise, throw an error
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Check if the data contains instructions
        if (data && data.Instructions) {
          // Set the instructions state with the data
          setInstructions(data.Instructions);
        } else {
          // Set an error message if instructions are not found
          setError('Instructions not found in the response');
        }
      })
      .catch((error) => {
        // Handle errors that may occur during the fetch
        setError('An error occurred while fetching instructions');
        console.error(error);
      });
  }, []); // The empty dependency array ensures this effect runs once after the initial render

  // Render the component content
  if (error) {
    // If an error occurred, display an error message
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  // If loading is complete and no errors, display the instructions
  return (
    <div>
      <h1>Instructions</h1>
      <p>{instructions}</p>
    </div>
  );
}

export default InstructionsViewer;
