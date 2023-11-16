import { useState, useEffect } from "react";
import { API_ROUTE } from "../../config/env.js";
import axios from "axios";

const SearchForStudents = ({ setSelectedStudent }) => {
  // State variables for filters
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedNationality, setSelectedNationality] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [initialStudents, setInitialStudents] = useState();

  // State variable for search query
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // State variable to hold the list of students based on filters
  const [filteredStudents, setFilteredStudents] = useState(initialStudents);

  useEffect(() => {
    axios
      .get(`${API_ROUTE}/v1/student`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => setInitialStudents(res.data));
  }, []);

  // Function to apply filters and update filteredStudents
  const applyFilters = () => {
    // Implement the logic to filter students based on selected filters
    let filteredList = initialStudents;

    if (selectedYear) {
      filteredList = filteredList.filter(
        (student) => student.year === selectedYear
      );
    }

    if (selectedCollege) {
      filteredList = filteredList.filter(
        (student) => student.college === selectedCollege
      );
    }

    if (selectedNationality) {
      filteredList = filteredList.filter(
        (student) => student.nationality === selectedNationality
      );
    }

    if (selectedStatus) {
      filteredList = filteredList.filter(
        (student) => student.applicationStatus === selectedStatus
      );
    }

    setFilteredStudents(filteredList);
  };

  // Function to search for students by national ID
  const searchStudents = () => {
    // Implement the logic to search for students by national ID
    const results = filteredStudents.filter((student) =>
      student.name.includes(searchQuery)
    );
    setSearchResults(results);
  };

  // Function to handle selecting a student
  const handleStudentClick = (studentId) => {
    setSelectedStudent(studentId);
  };

  return (
    <div className="flex flex-col w-64 z-30 mt-4 border h-full">
      <form className="mt-4 text-gray-200">
        <div className="m-1 text-gray-500">
          <label className="  text-gray-900" htmlFor="years">
            العام الدراسي{" "}
          </label>

          <select className=" mr-2 text-gray-500 border w-54" name="years" id="years">
            <option className ="text-gray-500"value="">2022-2023</option>
            <option value="">2023-2024</option>
          </select>
        </div>
        <div className="text-gray-500 m-1">
          <label className="ro text-gray-900" htmlFor="college">
            {" "}
            الكلية
          </label>

          <select className=" text-gray-500 mx-2 border" name="college" id="college">
            <option value="">الحاسبات والذكاء الاصطناعي</option>
            <option value="">الاداب</option>
          </select>
        </div>
        <div className=" text-gray-900">
          <input
            className="mx-2 "
            type="radio"
            id="inuniversity"
            name="checkInUniversity"
            value="inuniversity"
          ></input>
          <label htmlFor="inuniversity text-gray-900">طلاب الجامعة</label>

          <input
            className=" mx-2 "
            type="radio"
            id="outuniversity"
            name="checkInUniversity"
            value="outuniversity"
          ></input>
          <label htmlFor="outuniversity">من خارج الجامعة</label>
        </div>
        <div className=" text-gray-900">
          <input
            className=" mx-2"
            type="radio"
            id="egyption"
            name="checkegyption"
            value="egyption"
          ></input>
          <label htmlFor="egyption">مصري</label>

          <input
            className=" mx-2 mr-10"
            type="radio"
            id="outegyption"
            name="checkegyption"
            value="outegyption"
          ></input>
          <label htmlFor="outegyption">وافد</label>
        </div>
        <div className=" text-gray-900">
          <input
            className=" mx-2"
            type="radio"
            id="applicants"
            name="checkapplicants"
            value="applicants"
          ></input>
          <label htmlFor="applicants">متقدمين</label>

          <input
            className=" mx-2 mr-10"
            type="radio"
            id="accepted"
            name="checkapplicants"
            value="accepted"
          ></input>
          <label htmlFor="accepted">مقبولين</label>
        </div>
        <div className="text-gray-900 grid grid-cols-4 mt-4 mr-0">
          <input type="checkbox" id="old" name="old" value="old"></input>
          <label htmlFor="old"> قدامي</label>

          <input type="checkbox" id="new" name="new" value="new"></input>
          <label htmlFor="new"> جدد</label>

          <input
            type="checkbox"
            id="normal"
            name="normal"
            value="normal"
            
          ></input>
          <label  htmlFor="normal"> سكن عادي</label>

          <input
            type="checkbox"
            id="special"
            name="special"
            value="special"
          ></input>
          <label htmlFor="special"> سكن مميز</label>

          <input
            type="checkbox"
            id="unstill"
            name="unstill"
            value="unstill"
          ></input>
          <label htmlFor="unstill"> غير ساكنين</label>

          <input type="checkbox" id="still" name="still" value="still"></input>
          <label htmlFor="still"> ساكنين</label>

          <input
            type="checkbox"
            id="evacution"
            name="evacution"
            value="evacution"
          ></input>
          <label htmlFor="evacution"> اخلاء</label>
        </div>
        {/* Search bar */}
        <div>
          <label className="text-gray-900 mr-3" htmlFor="nationalId">
            البحث بالرقم القومي
          </label>
          <input
            className="mt-0  border text-gray-500"
            type="text"
            id="nationalId"
            name="nationalId"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* Add a "Search" button */}
          <button
            className="text-slate-50 mr-2 px-1 border-2 rounded bg-mainBlue hover:bg-lime-900"
            type="button"
            onClick={searchStudents}
          >
            بحث
          </button>
        </div>

        {/* Add a "تطبيق الفلتر" (Apply Filter) button */}
        <button
          className="text-slate-50 mr-2 px-1 border-2 rounded bg-mainBlue hover:bg-lime-900"
          type="button"
          onClick={applyFilters}
        >
          تطبيق الفلتر
        </button>

        <div className="mr-5 mt-4 h-64 overflow-y-scroll border text-gray-500">
          <ul>
            {searchResults.length > 0
              ? searchResults &&
                searchResults.map((student, index) => (
                  <li
                    key={index}
                    className="hover:cursor-pointer hover:bg-mainYellow"
                    onClick={() => handleStudentClick(student.id)}
                  >
                    {student.name}
                  </li>
                ))
              : filteredStudents &&
                filteredStudents.map((student, index) => (
                  <li
                    key={index}
                    className="hover:cursor-pointer hover:bg-mainYellow"
                    onClick={() => handleStudentClick(student.id)}
                  >
                    {student.name}
                  </li>
                ))}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default SearchForStudents;
