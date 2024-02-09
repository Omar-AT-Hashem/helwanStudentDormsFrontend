import { useEffect, useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ManageFees = () => {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const [settings, setSettings] = useState();

  useEffect(() => {
    axios
      .get(`${API_ROUTE}/v1/housing/towns-buildings-floors`)
      .then(() => {
        return;
      })
      .catch((err) => {
        if (err && err.code === "ERR_BAD_REQUEST") {
          return;
        }
        toast.dismiss();
        return toast("Something went wrong");
      });
  }, []);

  const handleChange = (e) => {
    let { name, value, type, checked } = e.target;
    checked = checked ? 1 : 0;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
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
      <div className="w-64">
        {/*------------------------- Sidebar ------------------------*/}
        <div className="w-64">
          <div>
            {/*-------------------------start Sidebar towns ----------------*/}
            <div className="mt-10 select-none">
              <div className="flex flex-col">
                {/*-------------------------side bar context for  future implementation ----------------*/}
                <div>side</div>
                <div>side</div>
                <div>side</div>
                <div>side</div>
                <div>side</div>
                <div>side</div>
              </div>
            </div>
            {/*-------------------------end  Sidebar towns ----------------*/}
          </div>
        </div>
        {/* -------------------end Sidebar ---------------------*/}
      </div>
      <div className=" flex-1 pt-4">
        <div className="bg-mainBlue mx-4 h-10 text-fuchsia-50 text-center text-2xl mt-4 rounded-lg text-mr-1">
          المصاريف - جامعة حلوان
        </div>
        <div className="mr-10 mt-10">
          <div>
            <label className="mb-4 mr-20">
              صله ولى الامر :
              <input
                type="text"
                name="startDate"
                value={settings}
                onChange={handleChange}
                required
                className="w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-6"
              />``
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageFees;
