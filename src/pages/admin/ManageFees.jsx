import { useEffect, useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../components/minicomponent/Loading.jsx";

const ManageFees = () => {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const [fees, setFees] = useState([]);
  const [selectedFee, setSelectedFee] = useState();

  const [feeData, setFeeData] = useState({
    feeName: "",
    necessaryForNutrition: "",
    feeToAdd: "",
  });

  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    setLoading((prev) => prev + 1);
    axios
      .get(`${API_ROUTE}/v1/fee/`)
      .then((res) => {
        setLoading((prev) => prev - 1);
        setFees(res.data);
        console.log(res.data);
        return;
      })
      .catch((err) => {
        setLoading((prev) => prev - 1);
        if (err && err.code === "ERR_BAD_REQUEST") {
          return;
        }
        toast.dismiss();
        return toast("حدث خطأ");
      });
  }, []);

  const handleChange = (e) => {
    setFeeData({
      ...feeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = () => {
    setEditable(true);
  };

  const handleSaveClick = () => {
    setLoading((prev) => prev + 1);
    if (feeData.feeName != "" && feeData.necessaryForNutrition != "") {
      axios
        .put(`${API_ROUTE}/v1/fee/`, {
          id: selectedFee,
          name: feeData.feeName,
          necessaryForNutrition: feeData.necessaryForNutrition,
        })
        .then(() => {
          setLoading((prev) => prev - 1);
          setFeeData({
            feeName: feeData.feeName,
            necessaryForNutrition: feeData.necessaryForNutrition,
            feeToAdd: "",
          });
          setFees((prev) => {
            prev = prev.map((ele) => {
              if (ele.id == selectedFee) {
                ele = {
                  ...ele,
                  name: feeData.feeName,
                  necessaryForNutrition: feeData.necessaryForNutrition,
                };
              }
              return ele;
            });
            return prev;
          });
          toast.dismiss();
          return toast("تعديل بنجاح");
        })
        .catch((err) => {
          setLoading((prev) => prev - 1);
          if (err && err.code === "ERR_BAD_REQUEST") {
            return;
          }
          toast.dismiss();
          return toast("حدث خطأ");
        });
    } else {
      toast.dismiss();
      toast("ادخل اسم الرسوم");
    }
    setEditable(false);
  };

  const handleAddFee = () => {
    setLoading((prev) => prev + 1);
    if (feeData.feeToAdd != "") {
      axios
        .post(`${API_ROUTE}/v1/fee/`, { name: feeData.feeToAdd })
        .then((res) => {
          setLoading((prev) => prev - 1);
          setFees((prev) => {
            prev = [
              ...prev,
              {
                id: res.data.id,
                name: feeData.feeToAdd,
                necessaryForNutrition: "no",
              },
            ];
            return prev;
          });
          setFeeData({
            feeName: "",
            necessaryForNutrition: "",
            feeToAdd: "",
          });
          toast.dismiss();
          return toast("اضافه بنجاح");
        })
        .catch((err) => {
          setLoading((prev) => prev - 1);
          if (err && err.code === "ERR_BAD_REQUEST") {
            return;
          }
          toast.dismiss();
          return toast("حدث خطأ");
        });
    } else {
      toast.dismiss();
      toast("ادخل اسم الرسوم");
    }
  };

  const handleDeleteClick = () => {
    setLoading((prev) => prev + 1);
    axios
      .delete(`${API_ROUTE}/v1/fee/${selectedFee}`)
      .then(() => {
        setLoading((prev) => prev - 1);
        setFees((prev) => {
          let i = prev.findIndex((ele) => ele.id == selectedFee);
          prev.splice(i, 1);
          return prev;
        });
        setSelectedFee();
        setFeeData({
          feeName: "",
          necessaryForNutrition: "",
          feeToAdd: "",
        });
        toast.dismiss();
        return toast("ازاله بنجاح");
      })
      .catch((err) => {
        setLoading((prev) => prev - 1);
        if (err && err.code === "ERR_BAD_REQUEST") {
          return;
        }
        toast.dismiss();
        return toast("حدث خطأ");
      });
  };

  const handleSideFeeClick = (fee) => {
    setSelectedFee(fee.id);
    setFeeData({
      feeName: fee.name,
      necessaryForNutrition: fee.necessaryForNutrition,
      feeToAdd: "",
    });
  };

  return (
    <div className="pt-16 flex flex-row w-full h-screen ">
      <Toaster
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #A9872D",
            backgroundColor: "#A9872D",
            padding: "16px",
            color: "white",
            fontWeight: "Bold",
            marginTop: "65px",
            textAlign: "center",
          },
        }}
      />
      {loading > 0 && Loading}
      <div className="w-64">
        {/*------------------------- Sidebar ------------------------*/}
        <div className="w-64">
          <div>
            {/*-------------------------start Sidebar towns ----------------*/}
            <div className="mt-10 select-none">
              <div className="flex flex-col mt-24 mr-5">
                <div className="flex flex-col gap-1 hover:">
                  {fees.map((fee) => (
                    <div
                      key={`fee-side-${fee.id}`}
                      className="w-28 cursor-pointer hover:bg-slate-100"
                      onClick={() => handleSideFeeClick(fee)}
                    >
                      <span>{fee.name}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    className=" flex items-center justify-center w-6 h-6 bg-blue-700 font-bold text-white text-2xl rounded-sm"
                    onClick={handleAddFee}
                  >
                    +
                  </button>
                  <input
                    type="text"
                    name="feeToAdd"
                    value={feeData.feeToAdd}
                    onChange={handleChange}
                    required
                    className=" bg-slate-100 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>
            </div>
            {/*-------------------------end  Sidebar towns ----------------*/}
          </div>
        </div>
        {/* -------------------end Sidebar ---------------------*/}
      </div>
      <div className=" flex-1 pt-4">
        <div className="bg-mainBlue mx-4 h-10 text-fuchsia-50 text-center text-2xl mt-4 rounded-lg text-mr-1">
          الرسوم - جامعة حلوان
        </div>
        {selectedFee && (
          <div>
            <div className="mr-10 mt-10 flex flex-col gap-4">
              <div>
                <label className="mb-4 mr-20 font-bold text-2xl">
                  اسم الرسوم :
                </label>
                <input
                  type="text"
                  name="feeName"
                  value={feeData.feeName}
                  onChange={handleChange}
                  required
                  disabled={!editable}
                  className="w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-6"
                />
              </div>
              <div className="flex">
                <label className="mb-4 mr-20 font-bold text-2xl">
                  اجباري للتغذيه:
                </label>
                {editable ? (
                  <div>
                    <input
                      type="radio"
                      name="necessaryForNutrition"
                      value="yes"
                      onChange={handleChange}
                      required
                      className="mr-4 text-xl"
                    />
                    <label className="mr-2 text-xl">نعم</label>
                    <input
                      type="radio"
                      name="necessaryForNutrition"
                      value="no"
                      onChange={handleChange}
                      required
                      className="mr-4"
                    />
                    <label className="mr-2">لا</label>
                  </div>
                ) : (
                  <span className="mt-1 mr-2 text-xl ">
                    {feeData.necessaryForNutrition == "yes" ? "نعم" : "لا"}
                  </span>
                )}
              </div>
            </div>
            <div className="mr-32 mt-5">
              {!editable && (
                <button
                  className="font-bold text-white text-xl bg-green-700 hover:opacity-70 hover:pointer transition-all duration-200 w-20 h-10 rounded-md"
                  onClick={handleEditClick}
                >
                  تعديل
                </button>
              )}
              {!editable && (
                <button
                  className="font-bold text-white text-xl bg-red-700 hover:opacity-70 hover:pointer transition-all duration-200 w-20 h-10 rounded-md mr-10"
                  onClick={handleDeleteClick}
                >
                  ازاله
                </button>
              )}
              {editable && (
                <button
                  className="font-bold text-white text-xl bg-blue-700 hover:opacity-70 hover:pointer transition-all duration-200 w-20 h-10 rounded-md"
                  onClick={handleSaveClick}
                >
                  حفظ
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageFees;
