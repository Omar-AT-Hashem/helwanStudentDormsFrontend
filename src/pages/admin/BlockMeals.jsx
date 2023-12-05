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
              <div className="box h-full flex-1" key={record.id}>
                < div className="bg-mainBlue w-full h-10 text-fuchsia-50 text-center text-2xl mt-8 rounded-lg text-mr-1">
                    حجب الوجبات - جامعة حلوان
                </div>
                <div className="flex flex-col  py-2 2xl:text-3xl text-2xl	pr-8">
                  <label className="mb-4 ">
                    <span className="font-bold text-2xl">اسم المستخدم :</span>{" "}
                    <strong>{record.الاسم}</strong>
                  </label>

                  <div className="mb-4">
                    <label className=" font-bold text-2xl"> من تاريخ : </label>
                    <input
                      type="date"
                      name="fromDate"
                      onChange={handleChange}
                      required
                      className="border text-xl text-gray-400 mr-4"
                    ></input>
                  </div>

                  <div className="mb-2">
                    <label className="font-bold text-2xl"> الى تاريخ :</label>
                    <input
                      type="date"
                      name="toDate"
                      required
                      onChange={handleChange}
                      className="border text-xl text-gray-400 mr-4"
                    ></input>
                  </div>

                  <div>
                    <label className="font-bold text-2xl"> الوجبات:</label>
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
                      className="form-radio h-5 w-5 text-gray-600 mr-10 text-xl text-gray-400"
                      value="dinner"
                      onChange={handleChange}
                    ></input>
                    <label>عشاء</label>
                  </div>

                  <div className="mb-2">
                    <label className="font-bold text-2xl">السبب :</label>
                    <input
                      type="text"
                      required
                      value={form.reason}
                      name="reason"
                      onChange={handleChange}
                      className="border border-gray-400 text-xl text-gray-400 mr-4"
                    ></input>
                  </div>
                  <div className="flex items-center w-full ">
                    <button 
                  className="w-40 h-10 bg-red-600 rounded-md hover:opacity-70 transition-all duration-200  hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-green-500 rounded ml-10 mt-4 center"
                  onClick={handleAddDelete}
                    >
                      ازاله
                    </button>
                    <button
                  className="w-40 h-10 bg-green-600 rounded-md hover:opacity-70 transition-all duration-200  hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
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
                  className="w-20 h-8 bg-red-600 rounded-md hover:opacity-70 transition-all duration-200  hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded m-4"
                  onClick={handleAddDelete}
                              name={index}
                            >حذف</button>
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
