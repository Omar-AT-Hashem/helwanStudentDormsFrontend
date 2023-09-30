import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchForStudents from "../../components/minicomponent/SearchForStudents";

const IDCardGenerator = () => {
  const [studentDataList, setStudentDataList] = useState([]); // State to store multiple student data
  const [selectedStudent, setSelectedStudent] = useState();

  // Access the query parameter 'nationalId' from the URL
  const location = useLocation();
  const nationalId = new URLSearchParams(location.search).get("nationalId");

  useEffect(() => {
    if (nationalId) {
      const fetchData = async () => {
        try {
          // Fetch student data based on the national ID
          const response = await fetch(`/api/student?id=${nationalId}`); // Adjust the API endpoint
          if (!response.ok) {
            throw new Error(
              `Failed to fetch student data (${response.status})`
            );
          }
          const data = await response.json();
          // Append the new student data to the existing list
          setStudentDataList([...studentDataList, data]);
        } catch (error) {
          console.error("Error fetching student data:", error);
          // Handle errors, e.g., display an error message to the user
        }
      };

      fetchData();
    }
  }, [nationalId]);

  const handlePrint = () => {
    // Use window.print() to initiate the printing process for the entire page
    window.print();
  };

  const handleRemove = (index) => {
    // Remove a student's data from the list based on its index
    const updatedStudentDataList = [...studentDataList];
    updatedStudentDataList.splice(index, 1);
    setStudentDataList(updatedStudentDataList);
  };

  return (
    <div className="id-card-container mt-10">
      {/* Display multiple student ID cards */}
      <div className="w-64">
        <SearchForStudents setStudent={setSelectedStudent} />
      </div>

      {studentDataList.map((studentData, index) => (
        <div
          key={index}
          className="id-card"
          style={{
            width: "8.5cm",
            height: "5.5cm",
            backgroundColor: "lightblue",
          }}
        >
          {studentData ? (
            <div className="id-card-content" style={{ display: "flex" }}>
              <div
                className="id-card-image"
                style={{ width: "2cm", height: "3cm" }}
              >
                <img
                  src={studentData.imageUrl}
                  alt={studentData.name}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div className="id-card-details" style={{ padding: "1cm" }}>
                <h2>{studentData.name}</h2>
                <p>Collage: {studentData.collage}</p>
                <p>Grade: {studentData.grade}</p>
                <p>Year: {studentData.year}</p>
                <div>
                  <p>Building: {studentData.building}</p>
                  <p>Room Number: {studentData.roomNumber}</p>
                </div>
                <p>Barcode: {studentData.barcode}</p>
              </div>
            </div>
          ) : (
            <p>Loading student data...</p>
          )}
          <button onClick={() => handleRemove(index)}>Remove ID Card</button>
        </div>
      ))}
      <button onClick={() => handlePrint()}>Print All ID Cards</button>
    </div>
  );
};

export default IDCardGenerator;
