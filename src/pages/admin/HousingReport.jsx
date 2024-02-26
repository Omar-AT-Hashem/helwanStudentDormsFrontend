import React, { useState, useEffect } from 'react';
import { API_ROUTE } from "../../config/env.js";
import axios from "axios";export function App(props) {
    const [selectedHousingTypes, setSelectedHousingTypes] = useState([]);
    const [year, setYear] = useState('2024');
    const [reportData, setReportData] = useState(null);

    const generateReport = () => {
        // Reset report data
        setReportData(null);

        const data = {
            "وافد و قدامى": {
                "سكن عادي": {"مرفوض": 5, "تحت الاستعراض": 10, "في انتظار التنسيق": 15, "في انتظار السكن": 20},
                "سكن مميز (ذكور)": {"مرفوض": 3, "تحت الاستعراض": 6, "في انتظار التنسيق": 9, "في انتظار السكن": 12},
                "سكن مميز (إناث)": {"مرفوض": 2, "تحت الاستعراض": 4, "في انتظار التنسيق": 6, "في انتظار السكن": 8}
            },
            "وافد و جدد": {
                "سكن عادي": {"مرفوض": 10, "تحت الاستعراض": 20, "في انتظار التنسيق": 30, "في انتظار السكن": 40},
                "سكن مميز (ذكور)": {"مرفوض": 6, "تحت الاستعراض": 12, "في انتظار التنسيق": 18, "في انتظار السكن": 24},
                "سكن مميز (إناث)": {"مرفوض": 4, "تحت الاستعراض": 8, "في انتظار التنسيق": 12, "في انتظار السكن": 16}
            },
            "جدد و مصري": {
                "سكن عادي": {"مرفوض": 7, "تحت الاستعراض": 14, "في انتظار التنسيق": 21, "في انتظار السكن": 28},
                "سكن مميز (ذكور)": {"مرفوض": 5, "تحت الاستعراض": 10, "في انتظار التنسيق": 15, "في انتظار السكن": 20},
                "سكن مميز (إناث)": {"مرفوض": 3, "تحت الاستعراض": 6, "في انتظار التنسيق": 9, "في انتظار السكن": 12}
            },
            "مصري و قدامى": {
                "سكن عادي": {"مرفوض": 9, "تحت الاستعراض": 18, "في انتظار التنسيق": 27, "في انتظار السكن": 36},
                "سكن مميز (ذكور)": {"مرفوض": 7, "تحت الاستعراض": 14, "في انتظار التنسيق": 21, "في انتظار السكن": 28},
                "سكن مميز (إناث)": {"مرفوض": 4, "تحت الاستعراض": 8, "في انتظار التنسيق": 12, "في انتظار السكن": 16}
            },
        };

        // Updated filtering logic (for fake database)
        const filteredData = {};
        selectedHousingTypes.forEach(type => {
            if (data[type]) {
                Object.keys(data[type]).forEach(category => {
                    if (!filteredData[category]) {
                        filteredData[category] = {};
                    }
                    Object.keys(data[type][category]).forEach(status => {
                        if (!filteredData[category][status]) {
                            filteredData[category][status] = 0;
                        }
                        filteredData[category][status] += data[type][category][status];
                    });
                });
            }
        });

        setReportData(filteredData);
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif' }}>
            <h1>تقرير السكن</h1>
            <div style={{ marginBottom: '20px' }}>
                <label style={{ marginRight: '10px' }}><input type="checkbox" value="وافد و قدامى" checked={selectedHousingTypes.includes("وافد و قدامى")} onChange={() => handleCheckboxChange("وافد و قدامى")} /> وافد و قدامى</label>
                <label style={{ marginRight: '10px' }}><input type="checkbox" value="وافد و جدد" checked={selectedHousingTypes.includes("وافد و جدد")} onChange={() => handleCheckboxChange("وافد و جدد")} /> وافد و جدد</label>
                <label style={{ marginRight: '10px' }}><input type="checkbox" value="جدد و مصري" checked={selectedHousingTypes.includes("جدد و مصري")} onChange={() => handleCheckboxChange("جدد و مصري")} /> جدد و مصري</label>
                <label style={{ marginRight: '10px' }}><input type="checkbox" value="مصري و قدامى" checked={selectedHousingTypes.includes("مصري و قدامى")} onChange={() => handleCheckboxChange("مصري و قدامى")} /> مصري و قدامى</label>
            </div>
            <div style={{ marginBottom: '20px' }}>
                <select value={year} onChange={(e) => setYear(e.target.value)}>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                </select>
            </div>
            <button style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={generateReport}>عرض التقرير</button>

            {reportData &&
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th style={{ padding: '8px', textAlign: 'right' }}>نوع السكن</th>
                            <th style={{ padding: '8px', textAlign: 'right' }}>مرفوض</th>
                            <th style={{ padding: '8px', textAlign: 'right' }}>تحت الاستعراض</th>
                            <th style={{ padding: '8px', textAlign: 'right' }}>في انتظار التنسيق</th>
                            <th style={{ padding: '8px', textAlign: 'right' }}>في انتظار السكن</th>
                            <th style={{ padding: '8px', textAlign: 'right' }}>المجموع</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(reportData).map((category, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={{ padding: '8px', textAlign: 'right' }}>{category}</td>
                                <td style={{ padding: '8px', textAlign: 'right' }}>{reportData[category]["مرفوض"]}</td>
                                <td style={{ padding: '8px', textAlign: 'right' }}>{reportData[category]["تحت الاستعراض"]}</td>
                                <td style={{ padding: '8px', textAlign: 'right' }}>{reportData[category]["في انتظار التنسيق"]}</td>
                                <td style={{ padding: '8px', textAlign: 'right' }}>{reportData[category]["في انتظار السكن"]}</td>
                                <td style={{ padding: '8px', textAlign: 'right' }}>
                                    {reportData[category]["مرفوض"] +
                                    reportData[category]["تحت الاستعراض"] +
                                    reportData[category]["في انتظار التنسيق"] +
                                    reportData[category]["في انتظار السكن"]}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }

            <button style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#008CBA', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => window.print()}>طباعة التقرير</button>
        </div>
    );

    function handleCheckboxChange(type) {
        if (selectedHousingTypes.includes(type)) {
            setSelectedHousingTypes(selectedHousingTypes.filter(housingType => housingType !== type));
        } else {
            setSelectedHousingTypes([...selectedHousingTypes, type]);
        }
    }
}
