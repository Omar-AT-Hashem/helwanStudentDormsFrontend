import { useEffect, useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import axios from "axios";
export default function PermissionReport(props) {
  const dataSets = {
    "بيانات أساسية": [
      { username: "مستخدم1", field: "مجال1", permission: "صلاحية1" },
      { username: "مستخدم2", field: "مجال2", permission: "صلاحية2" },
      { username: "مستخدم3", field: "مجال3", permission: "صلاحية3" },
    ],
    السكن: [
      { username: "مستخدم4", field: "مجال4", permission: "صلاحية4" },
      { username: "مستخدم5", field: "مجال5", permission: "صلاحية5" },
    ],
    تقارير: [{ username: "مستخدم6", field: "مجال6", permission: "صلاحية6" }],
    احصائيات: [
      { username: "مستخدم7", field: "مجال7", permission: "صلاحية7" },
      { username: "مستخدم8", field: "مجال8", permission: "صلاحية8" },
    ],
    تطبيقات: [
      { username: "مستخدم9", field: "مجال9", permission: "صلاحية9" },
      { username: "مستخدم10", field: "مجال10", permission: "صلاحية10" },
    ],
    "فصل الطلاب": [
      { username: "مستخدم11", field: "مجال11", permission: "صلاحية11" },
    ],
    الجزاءات: [
      { username: "مستخدم12", field: "مجال12", permission: "صلاحية12" },
      { username: "مستخدم13", field: "مجال13", permission: "صلاحية13" },
    ],
    الغياب: [{ username: "مستخدم14", field: "مجال14", permission: "صلاحية14" }],
    الرسوم: [{ username: "مستخدم15", field: "مجال15", permission: "صلاحية15" }],
    "بيان الحالة": [
      { username: "مستخدم16", field: "مجال16", permission: "صلاحية16" },
    ],
    "بيان الرسوم": [
      { username: "مستخدم17", field: "مجال17", permission: "صلاحية17" },
      { username: "مستخدم18", field: "مجال18", permission: "صلاحية18" },
    ],
  };

  const [selectedDataSet, setSelectedDataSet] = useState("");
  const [tableData, setTableData] = useState([]);

  const handleDataSetChange = (e) => {
    const selected = e.target.value;
    setSelectedDataSet(selected);
    setTableData(dataSets[selected]);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="printableArea" className="">
      <style>
        {`
          body {
            font-family: Arial, sans-serif;
          }
          h1 {
            text-align: center;
            margin-bottom: 20px;
          }
          select {
            margin: 10px;
            padding: 5px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: center;
          }
          th {
            background-color: #f2f2f2;
          }
          tbody tr:nth-child(even) {
            background-color: #f2f2f2;
          }
          button {
            margin: 20px auto;
            display: block;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
          }
          button:hover {
            background-color: #45a049;
          }
        `}
      </style>
      <h1>صفحة الصلاحيات</h1>
      <select value={selectedDataSet} onChange={handleDataSetChange}>
        <option value="">اختر مجموعة البيانات</option>
        {Object.keys(dataSets).map((dataset, index) => (
          <option key={index} value={dataset}>
            {dataset}
          </option>
        ))}
      </select>
      {tableData.length > 0 && (
        <div>
          <table>
            <thead>
              <tr>
                <th>اسم المستخدم</th>
                <th>المجال</th>
                <th>الصلاحية</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.username}</td>
                  <td>{row.field}</td>
                  <td>{row.permission}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handlePrint}>طباعة</button>
        </div>
      )}
    </div>
  );
}
