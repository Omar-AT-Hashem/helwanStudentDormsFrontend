import { useState } from "react";
import MainSideBar from "../../components/minicomponent/MainSideBar";
import Records from "../../assets/fakeData/Records.json";

const BlockMeals = () => {
  const [form, setForm] = useState({});
  const [objects, setObjects] = useState([]);
  //const [deletedObjects, setDeletedObjects] = useState([]);/////////////////////////////////

  const handleChange = (e) => {
    e.preventDefault();
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  console.log(objects);

  const handleAddDelete = (e) => {
    setObjects((prev) => {
      prev.splice(e.target.name, 1);
      return [...prev];
    });
  };
  


  const handleSubmit = (e) => {
    e.preventDefault();
    setObjects((prev) => {
      return [...prev, form];
    });
    setForm({
      toDate: "",
      fromDate: "",
      reason: "",
      meal: "",
    });
  };

  return (
    <div className="pt-20 flex flex-row w-full h-screen ">
      <div className=" flex-1">
        <div className="Data">
          {Records.map((record) => {
            return (
              <div className="box" key={record.id}>
                <div className="flex flex-col  py-2 2xl:text-3xl text-2xl	pr-8">
                  <label className="mb-4 ">
                    <span className="text-red-700">اسم المستخدم :</span>{" "}
                    <strong>{record.الاسم}</strong>
                  </label>

                  <div className="mb-4">
                    <label className=" ml-10"> من تاريخ : </label>
                    <input
                      type="date"
                      name="fromDate"
                      onChange={handleChange}
                      required
                      className="border border-gray-400"
                    ></input>
                  </div>

                  <div className="mb-2">
                    <label className="ml-10"> الى تاريخ :</label>
                    <input
                      type="date"
                      name="toDate"
                      required
                      onChange={handleChange}
                      className="border border-gray-400"
                    ></input>
                  </div>

                  <div>
                    <label className="mb-2"> الوجبات:</label>
                    <input
                      id="radio1"
                      type="radio"
                      name="meal"
                      className="form-radio h-5 w-5 text-gray-600 mr-10"
                      value="lunch"
                      onChange={handleChange}
                    ></input>
                    <label>غداء</label>
                    <input
                      id="radio2"
                      type="radio"
                      name="meal"
                      className="form-radio h-5 w-5 text-gray-600 mr-10"
                      value="dinner"
                      onChange={handleChange}
                    ></input>
                    <label>عشاء</label>
                  </div>

                  <div className="mb-2">
                    <label className="ml-10">السبب :</label>
                    <input
                      type="text"
                      required
                      value={form.reason}
                      name="reason"
                      onChange={handleChange}
                      className="border border-gray-400 "
                    ></input>
                  </div>
                  <div>
                    <button 
                    className="bg-blue-500 hover:opacity-70 hover:cursor-pointer transition-all duration-200  text-white font-bold py-2 px-4 rounded mx-2 w-20 mt-10 "
                    onClick={handleAddDelete}
                    >
                      ازاله
                    </button>
                    <button
                      className="bg-blue-500 hover:opacity-70 hover:cursor-pointer transition-all duration-200  text-white font-bold py-2 px-4 rounded mx-2 w-20 mt-10"
                      onClick={handleSubmit}
                    >
                      اضافه
                    </button>
                  </div>
                </div>
                <div>
                  <table className="table-auto w-4/5 mx-auto">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">من تاريخ</th>
                        <th className="px-4 py-2">الى تاريخ</th>
                        <th className="px-4 py-2">الوجبه</th>
                        <th className="px-4 py-2">السبب</th>
                      </tr>
                    </thead>
                    <tbody>
                      {objects.length > 0 &&
                        objects.map((object, index) => (
                          <tr key={`blk-meal-ind${index}`}>
                            <td>{object.fromDate}</td>
                            <td>{object.toDate}</td>
                            <td>{object.meal}</td>
                            <td>{object.reason}</td>
              
                           <button
                              className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                              onClick={handleAddDelete}
                              name={index}
                            ></button>
                          </tr>
                        ))}
                        

                    </tbody>    
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlockMeals;
