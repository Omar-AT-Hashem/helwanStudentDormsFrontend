import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { API_ROUTE } from "../../config/env";
import axios from "axios";

export default function ManageCategories() {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const [objects, setObjects] = useState([]);
  const [deletedObjects, setDeletedObjects] = useState([]);
  const [preservedObjects, setPreservedObjects] = useState([]);
  const [updatedObjects, setUpdatedObjects] = useState([]);
  const [addedObjects, setAddedObjects] = useState([]);
  const [loading, setLoading] = useState([]);

  const [deletable, setDeletable] = useState();
  const [editable, setEditable] = useState();

  const handleCheckboxChange = (e) => {
    if (e.target.checked === true) {
      setDeletedObjects((prev) => [...prev, e.target.value]);
    } else if (e.target.checked === false) {
      let updateDeleted = deletedObjects;
      updateDeleted = updateDeleted.filter((ele) => {
        return ele !== e.target.value;
      });
      setDeletedObjects(updateDeleted);
    }
  };


  const handleInputChange = (e) => {
    const elementIndex = parseInt(e.target.name.split("-")[0]);
    const elementName = e.target.name.split("-")[1];

    if (e.target.type == "text") {
      if (elementName == "categoryName") {
        setObjects((prev) => {
          prev[elementIndex] = {
            ...prev[elementIndex],
            name: e.target.value,
          };
          return [...prev];
        });
      }
    }
    if (e.target.type == "select-one") {
      if (elementName == "categoryGovernorate") {
        setObjects((prev) => {
          prev[elementIndex] = {
            ...prev[elementIndex],
            governorate: e.target.value,
          };
          return [...prev];
        });
      }
    }

    setUpdatedObjects((prev) => [...prev, e.target.name]);
  };

  const handleEdit = () => {
    setPreservedObjects([...objects]);
    setEditable(!editable);
  };

  const handleDelete = () => {
    setDeletable(!deletable);
  };

  const handleCancel = () => {
    if (editable) {
      setObjects(preservedObjects);
    }
    setAddedObjects([]);
    setDeletedObjects([]);
    setDeletable(false);
    setEditable(false);
  };

  const handleSubmit = async () => {
    if (deletable) {
      try {
        deletedObjects.forEach((id) => {
          setLoading((prev) => prev + 1);
          axios
            .delete(`${API_ROUTE}/v1/category/${id}`)
            .then(() => {
              setLoading((prev) => prev - 1);
            })
            .catch(() => {
              setLoading((prev) => prev - 1);
            });
        });

        let deleted = objects;
        deleted = deleted.filter((instruction) => {
          return !deletedObjects.includes(`${instruction.id}`);
        });
        setObjects(deleted);
      } catch (err) {
        toast.dismiss();
        toast("Something went wrong");
      }
    }
    if (editable) {
      let unique = [...new Set(updatedObjects)];
      let updates = unique.map((ele) => {
        const i = parseInt(ele.split("-")[0]);
        return {
          id: objects[i].id,
          name: objects[i].name,
          governorate: objects[i].governorate,
        };
      });
      try {
        updates.forEach((update) => {
          setLoading((prev) => prev + 1);
          axios
            .put(`${API_ROUTE}/v1/category`, {
              id: update.id,
              name: update.name,
              governorate: update.governorate,
            })
            .then(() => {
              setLoading((prev) => prev - 1);
            })
            .catch(() => {
              setLoading((prev) => prev - 1);
            });
        });
      } catch (err) {
        toast.dismiss();
        toast("Something went wrong");
      }
    }

    setDeletable(false);
    setEditable(false);
  };

  const handleAdd = () => {
    setAddedObjects((prev) => [...prev, { name: "", governorate: "" }]);
  };
  const handleAddDelete = (e) => {
    setAddedObjects((prev) => {
      prev.splice(e.target.name, 1);
      return [...prev];
    });
  };
  
  const handleAddChange = (e) => {
    const elementIndex = parseInt(e.target.name.split("-")[0]);
    const elementName = e.target.name.split("-")[1];

    if (e.target.type == "text") {
      if (elementName == "categoryName") {
        setAddedObjects((prev) => {
          prev[elementIndex] = {
            ...prev[elementIndex],
            name: e.target.value,
          };
          return [...prev];
        });
      }
    }
    if (e.target.type == "select-one") {
      if (elementName == "categoryGovernorate") {
        setAddedObjects((prev) => {
          prev[elementIndex] = {
            ...prev[elementIndex],
            governorate: e.target.value,
          };
          return [...prev];
        });
      }
    }
  };

  const handleAddAll = async () => {
    //removes any empty instruction boxes before submission
    setAddedObjects((prev) => {
      prev = prev.filter((ele) => {
        return ele.name !== "" && ele.governorate !== "";
      });
      return [...prev];
    });

    let filteredAdded = addedObjects.filter((ele) => {
      return ele.name !== "" && ele.governorate !== "";
    });
    try {
      filteredAdded.forEach((addedObject) => {
        setLoading((prev) => prev + 1);
        axios
          .post(`${API_ROUTE}/v1/category`, {
            name: addedObject.name,
            governorate: addedObject.governorate,
          })
          .then((res) => {
            setLoading((prev) => prev - 1);

            setObjects((prev) => {
              return [
                ...prev,
                {
                  id: res.data.id,
                  name: addedObject.name,
                  governorate: addedObject.governorate,
                },
              ];
            });
          })
          .catch(() => {
            setLoading((prev) => prev - 1);
          });
      });

      setAddedObjects([]);
    } catch (err) {
      toast.dismiss();
      toast("Something went wrong");
    }
  };

  useEffect(() => {
    axios
      .get(`${API_ROUTE}/v1/category`)
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
    <div className="pt-20 w-screen min-h-screen ltr-local">
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

      <div className="mx-auto w-fit mt-20">
        {(objects && objects.length > 0) ||
        (addedObjects && addedObjects.length > 0) ? (
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-center text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          المحافظة
                        </th>
                        <th scope="col" className="px-6 py-4">
                          الاسم
                        </th>
                        {deletable && (
                          <th scope="col" className="px-6 py-4"></th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {objects.map((category, index) => (
                        <tr
                          key={`${category.id}--categ-${index}`}
                          className="border-b border-neutral-100 bg-neutral-50 text-neutral-800 dark:bg-neutral-50"
                        >
                          <td className="whitespace-nowrap px-6 py-4">
                            {!editable ? (
                              category.governorate
                            ) : (
                              <select
                                name={`${index}-categoryGovernorate`}
                                onChange={handleInputChange}
                                id="governorate"
                                value={category.governorate}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              >
                                <option selected>اختار محافظة</option>
                                <option value="القاهرة">القاهرة</option>
                                <option value="الإسكندرية">الإسكندرية</option>
                                <option value="الجيزة">الجيزة</option>
                                <option value="بورسعيد">بورسعيد</option>
                                <option value="السويس">السويس</option>
                                <option value="الإسماعيلية">الإسماعيلية</option>
                                <option value="أسيوط">أسيوط</option>
                                <option value="الزقازيق">الزقازيق</option>
                                <option value="دمياط">دمياط</option>
                                <option value="المنصورة">المنصورة</option>
                                <option value="سوهاج">سوهاج</option>
                                <option value="الأقصر">الأقصر</option>
                                <option value="بني سويف">بني سويف</option>
                                <option value="منيا">منيا</option>
                                <option value="قنا">قنا</option>
                                <option value="أسوان">أسوان</option>
                                <option value="البحيرة">البحيرة</option>
                                <option value="الفيوم">الفيوم</option>
                                <option value="كفر الشيخ">كفر الشيخ</option>
                                <option value="الغربية">الغربية</option>
                                <option value="الشرقية">الشرقية</option>
                                <option value="شمال سيناء">شمال سيناء</option>
                                <option value="جنوب سيناء">جنوب سيناء</option>
                                <option value="الوادي الجديد">
                                  الوادي الجديد
                                </option>
                                <option value="البحر الأحمر">
                                  البحر الأحمر
                                </option>
                              </select>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {!editable ? (
                              category.name
                            ) : (
                              <input
                                type="text"
                                value={category.name}
                                disabled={!editable}
                                className="bg-slate-400"
                                onChange={handleInputChange}
                                name={`${index}-categoryName`}
                              />
                            )}
                          </td>
                          {deletable && (
                            <td className="w-4 p-4">
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  value={category.id}
                                  onClick={handleCheckboxChange}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                                />
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                      {addedObjects &&
                        addedObjects.map((addedObject, index) => (
                          <tr
                            key={`date--${index}`}
                            className="border-b border-neutral-100 bg-neutral-50 text-neutral-800 dark:bg-neutral-50"
                          >
                            <td className="whitespace-nowrap px-6 py-4">
                              {" "}
                              <select
                                name={`${index}-categoryGovernorate`}
                                onChange={handleAddChange}
                                value={addedObject.governorate}
                                id="governorate"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              >
                                <option selected>اختار محافظة</option>
                                <option value="القاهرة">القاهرة</option>
                                <option value="الإسكندرية">الإسكندرية</option>
                                <option value="الجيزة">الجيزة</option>
                                <option value="بورسعيد">بورسعيد</option>
                                <option value="السويس">السويس</option>
                                <option value="الإسماعيلية">الإسماعيلية</option>
                                <option value="أسيوط">أسيوط</option>
                                <option value="الزقازيق">الزقازيق</option>
                                <option value="دمياط">دمياط</option>
                                <option value="المنصورة">المنصورة</option>
                                <option value="سوهاج">سوهاج</option>
                                <option value="الأقصر">الأقصر</option>
                                <option value="بني سويف">بني سويف</option>
                                <option value="منيا">منيا</option>
                                <option value="قنا">قنا</option>
                                <option value="أسوان">أسوان</option>
                                <option value="البحيرة">البحيرة</option>
                                <option value="الفيوم">الفيوم</option>
                                <option value="كفر الشيخ">كفر الشيخ</option>
                                <option value="الغربية">الغربية</option>
                                <option value="الشرقية">الشرقية</option>
                                <option value="شمال سيناء">شمال سيناء</option>
                                <option value="جنوب سيناء">جنوب سيناء</option>
                                <option value="الوادي الجديد">
                                  الوادي الجديد
                                </option>
                                <option value="البحر الأحمر">
                                  البحر الأحمر
                                </option>
                              </select>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <input
                                type="text"
                                value={addedObject.name}
                                name={`${index}-categoryName`}
                                className="bg-slate-300"
                                onChange={handleAddChange}
                              />
                            </td>
                            <button
                              className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                              onClick={handleAddDelete}
                              name={index}
                            >
                              X
                            </button>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {deletable && (
                <button
                  onClick={handleSubmit}
                  className="bg-red-600 w-36 h-10 rounded text-white hover:opacity-80 transition-all duration-200"
                >
                  حذف المُحدَد
                </button>
              )}
              {!deletable && !editable && addedObjects.length == 0 && (
                <button
                  onClick={handleDelete}
                  className="bg-red-600 w-36 h-10 rounded text-white hover:opacity-80 transition-all duration-200"
                >
                  حذف
                </button>
              )}
              {(deletable || editable || addedObjects.length > 0) && (
                <button
                  onClick={handleCancel}
                  className="bg-blue-600 w-36 h-10 rounded text-white hover:opacity-80 transition-all duration-200"
                >
                  إلغاء
                </button>
              )}{" "}
              {!editable && !deletable && (
                <button
                  onClick={handleAdd}
                  className="bg-blue-600 w-36 h-10 rounded text-white hover:opacity-80 transition-all duration-200"
                >
                  إضافة
                </button>
              )}
              {editable && (
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 w-36 h-10 rounded text-white hover:opacity-80 transition-all duration-200"
                >
                  ارسال
                </button>
              )}
              {!deletable && !editable && addedObjects.length == 0 && (
                <button
                  onClick={handleEdit}
                  className="bg-blue-600 w-36 h-10 rounded text-white hover:opacity-80 transition-all duration-200"
                >
                  تعديل
                </button>
              )}
              {addedObjects.length > 0 && (
                <button
                  onClick={handleAddAll}
                  className="bg-blue-600 w-36 h-10 rounded text-white hover:opacity-80 transition-all duration-200"
                >
                  إضافة الكل
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div>لا تتوفر بيانات</div>
            {!editable && !deletable && (
              <button
                onClick={handleAdd}
                className="bg-blue-600 w-36 h-10 rounded text-white hover:opacity-80 transition-all duration-200"
              >
                إضافة
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
