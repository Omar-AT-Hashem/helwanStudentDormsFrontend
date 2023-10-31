import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { API_ROUTE } from "../../config/env";
import axios from "axios";

function WhenToApply() {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const [objects, setObjects] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_ROUTE}/v1/application-date`)
      .then((res) => {
        return setObjects(res.data);
      })
      .catch((err) => {
        if (err && err.code === "ERR_BAD_REQUEST") {
          return;
        }
        toast.dismiss();
        return toast("Something went wrong");
      });
  }, []);

  return (
    <div className="pt-32 min-w-[500px] md:min-w-[800px] w-fit mx-auto">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    تاريخ الانتهاء
                  </th>
                  <th scope="col" className="px-6 py-4">
                    تاريخ البدء
                  </th>
                  <th scope="col" className="px-6 py-4">
                    نوع الطالب
                  </th>
                </tr>
              </thead>
              <tbody>
                {objects.map((date, index) => (
                  <tr
                    key={`${date.id}--da-${index}`}
                    className="border-b border-neutral-300 bg-neutral-50 text-neutral-800 dark:bg-neutral-50"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      {date.endDate}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {date.startDate}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {date.studentType}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhenToApply;
