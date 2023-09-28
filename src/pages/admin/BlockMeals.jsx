import { useState } from "react";
import SearchForStudents from "../../components/minicomponent/SearchForStudents";
import Records from "../../assets/fakeData/Records.json";
import holidayData from "../../assets/fakeDaTA/holidatData.json";
import React from "react";

const BlockMeals = () => {
  const [student, setStudent] = useState({ name: "wrwer" });
  return (
    <div className="pt-16 flex flex-row w-full h-screen ">
      <div className="w-64">
        <SearchForStudents setStudent={setStudent} />
      </div>
      <div className=" flex-1">
        <div className="  bg-sky-700 w-full h-10 text-fuchsia-50 text-center text-2xl ">
          حجب الوجبات - جامعة حلوان
        </div>

        <div className="Data">
          {Records.map((record) => {
            return (
              <div className="box" key={record.id}>
                <form className="flex flex-col  py-2 2xl:text-3xl text-2xl	pr-8	">
                  <label className="mb-4 ">
                    <span className="text-red-700">اسم المستخدم :</span>{" "}
                    <strong>{record.الاسم}</strong>
                  </label>

                  <div className="mb-4">
                    <label className=" ml-10"> من تاريخ : </label>
                    <input
                      type="text"
                      className="border border-gray-400"
                    ></input>
                  </div>

                  <div className="mb-2">
                    <label className="ml-10"> الى تاريخ :</label>
                    <input
                      type="text"
                      className="border border-gray-400"
                    ></input>
                  </div>

                  <div>
                    <label className="mb-2"> الوجبات:</label>
                    <input
                      id="radio1"
                      type="radio"
                      name="radio-group"
                      class="form-radio h-5 w-5 text-gray-600 mr-10"
                      value="lunch"
                    ></input>
                    <label>غداء</label>
                    <input
                      id="radio2"
                      type="radio"
                      name="radio-group"
                      class="form-radio h-5 w-5 text-gray-600 mr-10"
                      value="dinner"
                    ></input>
                    <label>عشاء</label>
                  </div>

                  <div className="mb-2">
                    <label className="ml-10">السبب :</label>
                    <input
                      type="text"
                      className="border border-gray-400 "
                    ></input>
                  </div>
                  <button class="bg-blue-500 hover:opacity-70 hover:cursor-pointer transition-all duration-200  text-white font-bold py-2 px-4 rounded mx-2 w-20 mt-10 ">
                    تعديل
                  </button>
                </form>
                <div>
                  <table className="table-auto w-4/5 mx-auto">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">من تاريخ</th>
                        <th className="px-4 py-2">الى تاريخ</th>
                        <th className="px-4 py-2">
                          الوجبه
                          <button class="bg-blue-500 hover:opacity-70 hover:cursor-pointer transition-all duration-200 text-white font-bold py-2 px-4 rounded mx-2 mr-10">
                            اضافه
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr></tr>
                      <tr></tr>
                      <tr></tr>
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
