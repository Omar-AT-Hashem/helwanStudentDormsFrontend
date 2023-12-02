import { useState } from "react";
import SearchForStudents from "../../components/minicomponent/SearchForStudents";

const Penalties = () => {
  const [student, setStudent] = useState({ name: "wrwer" });
  const [form, setForm] = useState({});
  const [objects, setObjects] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  //console.log(objects);


  const handleSubmit = (e) => {
    e.preventDefault();
    setObjects((prev) => {
      return [...prev, form];
    });
    setForm({
      type: "",
      reason: "",
      Date: "",
    });
  };


  return (
    <div className="pt-16 flex flex-row w-full h-screen ">
      <div className="w-64">
        <SearchForStudents setStudent={setStudent} />
      </div>
      <div className=" bg-white-900 flex-1">
        <div className="  bg-sky-700 w-full h-10 text-fuchsia-50 text-center text-2xl">
          الجزاءات - جامعة حلوان
        </div>
        <div className="text-white px-5">{student.name}</div>



            <div className="mb-4">
            <label className=" ml-10"> الاسم  : </label>
              <input
                type="text"
                id="name"
                name="name"
                value={student.name}
                // Add onChange handler to update the state
                readOnly
                className="border border-gray-400"
                />
            </div>
            

              <div className="mb-2">
              <label className="ml-10">نوع الجزاء :</label>
              <select
                required
                // value={form.reason}
                name="type"
                onChange={handleChange}
                className="border border-gray-400"
              >
                <option value="option1">السبب الأول</option>
                <option value="option2">السبب الثاني</option>
                <option value="option3">السبب الثالث</option>
              </select>
            </div>


            <div className="mb-2">
                    <label className="ml-10">السبب :</label>
                    <input
                      type="text"
                      required
                      //value={form.reason}
                      name="reason"
                      onChange={handleChange}
                      className="border border-gray-400 "
                    ></input>
                  </div>

            <div className="mb-4">
                    <label className=" ml-10"> التاريخ : </label>
                    <input
                      type="date"
                      name="Date"
                      onChange={handleChange}
                      required
                      className="border border-gray-400"
                    ></input>
                  </div>

                  <div className="mb-2">
                    <label className="ml-10">الالغاء :</label>
                    <input
                      type="text"
                      required
                      //value={form.reason}
                      name="delete"
                      onChange={handleChange}
                      className="border border-gray-400 "
                    ></input>
                  </div>


                  <button 
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={handleSubmit}
                  >
                    حفظ
                  </button>
      


                 <table className="table-auto w-4/5 mx-auto">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">النوع </th>
                        <th className="px-4 py-2">السبب</th>
                        <th className="px-4 py-2"> التاريخ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {objects.length > 0 &&
                        objects.map((object, index) => (
                          <tr key={`blk-meal-ind${index}`}>
                            <td>{object.type}</td>
                            <td>{object.reason}</td>
                            <td>{object.Date}</td>
              
                    
                          </tr>
                        ))}
                        

                    </tbody>    
                        </table>
             






       
            

         
          </div>
        </div>
    
    
  );
};

export default Penalties;
