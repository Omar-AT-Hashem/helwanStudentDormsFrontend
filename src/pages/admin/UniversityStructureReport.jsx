import React, { useEffect, useState } from 'react';
import axios from "axios";
import { API_ROUTE } from "../../config/env.js";
export function UniversityStructureReport(props) {
  const [selectedOption, setSelectedOption] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state
const options = [
  { label: "الفنون الجميلة", courses: [{ name: "تاريخ الفن", code: "AH101" }, { name: "تقنيات الرسم", code: "DT201" }] },
  { label: "الرياضة للبنات", courses: [{ name: "التربية الرياضية", code: "PE301" }, { name: "الجمباز", code: "GY401" }] },
  { label: "الرياضة للبنين", courses: [{ name: "كرة القدم", code: "FB501" }, { name: "كرة السلة", code: "BB601" }] },
  { label: "الطب والصيدلة", courses: [{ name: "التشريح", code: "AN102" }, { name: "الصيدلة", code: "PH202" }] },
  { label: "الحقوق", courses: [{ name: "القانون الدستوري", code: "CL303" }, { name: "القانون الجنائي", code: "CR403" }] },
  { label: "السياحة", courses: [{ name: "إدارة السياحة", code: "TM504" }, { name: "خدمات الضيافة", code: "HS604" }] },
  { label: "الخدمة الاجتماعية", courses: [{ name: "نظريات العمل الاجتماعي", code: "SW105" }, { name: "تنمية المجتمع", code: "CD205" }] },
  { label: "التجارة", courses: [{ name: "أساسيات التسويق", code: "MF106" }, { name: "إدارة الأعمال", code: "BM206" }] },
  { label: "السينما", courses: [{ name: "دراسات السينما", code: "FS307" }, { name: "كتابة السيناريو", code: "SC407" }] },
  { label: "معهد الملكية الفكرية", courses: [{ name: "قانون الملكية الفكرية", code: "IP508" }, { name: "قانون البراءات", code: "PL608" }] },
  { label: "الدراسات العليا", courses: [{ name: "أساليب البحث", code: "RM109" }, { name: "الإحصاء المتقدم", code: "AS209" }] },
  { label: "التكنولوجيا", courses: [{ name: "علم الحاسوب", code: "CS310" }, { name: "تقنية المعلومات", code: "IT410" }] },
  { label: "الفيزياء التجريبية", courses: [{ name: "الفيزياء التجريبية", code: "EP111" }, { name: "مختبر الكيمياء", code: "CL211" }] },
  { label: "الهندسة الصناعية", courses: [{ name: "الهندسة الصناعية", code: "IE312" }, { name: "عمليات التصنيع", code: "MP412" }] },
  { label: "الهندسة في حلوان", courses: [{ name: "الهندسة المدنية", code: "CE413" }, { name: "الهندسة البيئية", code: "EE513" }] },
  { label: "الهندسة في المطرية", courses: [{ name: "الهندسة الميكانيكية", code: "ME514" }, { name: "الهندسة الكهربائية", code: "EE614" }] },
  { label: "التمريض", courses: [{ name: "أساسيات التمريض", code: "NF115" }, { name: "تقنيات رعاية المرضى", code: "PT215" }] },
  { label: "الفنون التطبيقية", courses: [{ name: "الفنون التطبيقية", code: "AA316" }, { name: "مبادئ التصميم", code: "DP416" }] },
  { label: "العلوم", courses: [{ name: "الأحياء", code: "BI417" }, { name: "الكيمياء", code: "CH517" }] },
  { label: "علم الحاسبات", courses: [{ name: "برمجة الحاسب", code: "CP318" }, { name: "هياكل البيانات", code: "DS418" }] },
  { label: "التربية", courses: [{ name: "نظريات التربية", code: "ET119" }, { name: "تطوير المناهج", code: "CD219" }] },
  { label: "التربية الفنية", courses: [{ name: "تربية الفنون البصرية", code: "VA320" }, { name: "تربية الحرف اليدوية", code: "CE420" }] },
  { label: "التربية الموسيقية", courses: [{ name: "نظريات الموسيقى", code: "MT121" }, { name: "تقنيات الآلات الموسيقية", code: "IT221" }] },
  { label: "الاقتصاد المنزلي", courses: [{ name: "الاقتصاد المنزلي", code: "HE322" }, { name: "تمويل الأسرة", code: "FF422" }] },
  { label: "معهد التمريض", courses: [{ name: "أخلاقيات التمريض", code: "NE123" }, { name: "التمريض الجراحي", code: "MSN223" }] },
  { label: "الآداب", courses: [{ name: "الأدب العربي", code: "AL324" }, { name: "الأدب الإنجليزي", code: "EL424" }] },
];


  useEffect(() => {
    // Simulate fetching data from backend
    setTimeout(() => {
      setCourses(options[0].courses); // Initially, setting courses to the first option's courses
      setLoading(false); // Set loading state to false after data is fetched
    }, 1000); // Simulating a 1 second delay
  }, []); // Empty dependency array to ensure the effect runs only once

  const handleChange = (event) => {
    const selectedOption = event.target.value;
    const selectedCourses = options.find(option => option.label === selectedOption).courses;
    setSelectedOption(selectedOption);
    setCourses(selectedCourses);
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      direction: 'rtl',
      fontFamily: 'Arial, sans-serif',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>نظام الدورات الجامعية</h2>
      <label htmlFor="options" style={{
        display: 'block',
        marginBottom: '10px',
        fontWeight: 'bold',
      }}>اختر الكلية:</label>
      <select id="options" value={selectedOption} onChange={handleChange} style={{
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
      }}>
        <option value="">الكليات</option>
        {options.map((option, index) => (
          <option key={index} value={option.label}>{option.label}</option>
        ))}
      </select>
      {selectedOption && (
        <>
          {loading ? (
            <div style={{
              marginTop: '20px',
              fontStyle: 'italic',
              color: '#888',
              textAlign: 'center',
            }}>جار التحميل...</div>
          ) : (
            <>
              {courses.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                  <h3 style={{ marginBottom: '15px', fontWeight: 'bold' }}>الدورات:</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {courses.map((course, index) => (
                      <li key={index} style={{ marginBottom: '10px', fontSize: '16px' }}>
                        <span style={{ fontWeight: 'bold', marginRight: '10px' }}>{course.name}</span>
                        <span style={{ color: '#666' }}>-</span>
                        <span style={{ marginLeft: '10px' }}>{course.code}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
