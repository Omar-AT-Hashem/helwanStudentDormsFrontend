import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import AmiriRegular from './Amiri-Regular.ttf'; // Change it to the correct path
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../../components/minicomponent/Loading.jsx';

export function IdGenerator(props) {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStudentData(); // Fetch student data when the component mounts
  }, []);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('change it to the correct api'); 
      setStudentData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching student data:', error);
      setLoading(false);
      toast.error('Failed to fetch student data'); // Display error toast notification
    }
  };

  const handlePrintPDF = async () => {
    try {
      const fontBase64 = await getFileAsBase64(AmiriRegular); // Convert font file to base64

      const doc = new jsPDF({ orientation: 'landscape', unit: 'cm', format: [9, 6] }); // Set dimensions (9 cm width, 6 cm height) - 3:2 ratio

      // Embedding the Amiri font with proper encoding
      doc.addFileToVFS('Amiri-Regular.ttf', fontBase64);
      doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');

      // Set font to Amiri for Arabic text
      doc.setFont('Amiri');

      // Set background colors
      doc.setFillColor(144, 238, 144); // Set light green color for the top fifth
      doc.rect(0, 0, 9, 1.2, 'F'); // Draw rectangle for the top fifth of the card
      doc.setFillColor(173, 216, 230); // Set light blue color for the bottom four-fifths
      doc.rect(0, 1.2, 9, 4.8, 'F'); // Draw rectangle for the bottom four-fifths of the card

      // Write university name
      doc.setTextColor(0, 0, 0); // Set text color to black
      doc.setFontSize(16);
      doc.text(1, 0.6, studentData?.university || 'جامعه حلوان'); // Use fetched university name or fallback to default

      // Adjusted position and size for photo
      const photoWidth = 2.5; // Width of the photo
      const photoHeight = 3; // Height of the photo
      const photoX = 0.5; // Adjusted distance from the left edge
      const photoY = 1.5; // Adjusted distance from the top edge
      doc.rect(photoX, photoY, photoWidth, photoHeight); // Draw rectangle for photo frame

      // Output the name next to the photo without overlapping
      doc.setTextColor(0, 0, 0); // Set text color to black
      doc.setFontSize(12);
      doc.text(photoX + photoWidth + 0.5, photoY + 0.5, `الاسم: ${studentData?.name || 'اسم الطالب'}`, null, null, 'right'); // Use fetched student name or fallback to default

      doc.save('id-card.pdf'); // Download the PDF
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF'); // Display error toast notification
    }
  };

  // Function to convert file to base64
  const getFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      axios.get(file, { responseType: 'blob' })
        .then(response => {
          const reader = new FileReader();
          reader.readAsDataURL(response.data);
          reader.onload = () => resolve(reader.result.split(',')[1]);
          reader.onerror = (error) => reject(error);
        })
        .catch(error => reject(error));
    });
  };

  return (
    <div className="id-generator" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', padding: '1rem' }}>
      <h2 className="title">ID Generator</h2>
      {loading ? <Loading /> : null} {/* Display loading indicator if data is being fetched */}
      <div className="card" style={{ backgroundColor: 'lightblue', width: '9cm', height: '6cm', position: 'relative', marginBottom: '1rem' }}>
        <div className="top-fifth" style={{ width: '100%', height: '20%', backgroundColor: 'lightgreen' }}></div>
        <p className="university-name arabic-text" style={{ fontFamily: 'Amiri, serif', position: 'absolute', top: '0.5cm', left: '0.5cm', fontSize: '16px', fontWeight: 'bold', margin: '0' }}>{studentData?.university || 'جامعه حلوان'}</p>
        <div className="photo-frame" style={{ width: '2.5cm', height: '3cm', position: 'absolute', top: '1.5cm', left: '0.5cm', border: '1px solid black' }}></div>
        <p className="name arabic-text" style={{ fontFamily: 'Amiri, serif', position: 'absolute', top: '1.5cm', right: '3.5cm', fontSize: '12px', fontWeight: 'bold', margin: '0' }}>الاسم: {studentData?.name || 'اسم الطالب'}</p>
      </div>
      <button className="print-btn" onClick={handlePrintPDF} style={{ backgroundColor: 'lightgreen', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s', ':hover': { backgroundColor: 'darkgreen' } }}>
        Print ID Card (PDF)
      </button>
      <Toaster /> {/* Toast container for displaying notifications */}
    </div>
  );
}
