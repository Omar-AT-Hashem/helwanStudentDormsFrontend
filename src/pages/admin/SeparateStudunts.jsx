import { useState } from "react";
import SearchForStudents from "../../components/minicomponent/SearchForStudents";

const SeparateStudunts = () => {
  const [student, setStudent] = useState({ name: "wrwer" });
  return (
    <div className="pt-16 flex flex-row w-full h-screen ">
      <div className="w-64">
        <SearchForStudents setStudent={setStudent} />
      </div>
      <div className=" bg-zinc-900 flex-1">
        <div className="  bg-sky-700 w-full h-10 text-fuchsia-50 text-center text-2xl">
          فصل الطلاب - جامعة حلوان
        </div>

        <div className="text-white px-5">{student.name}</div>
      </div>
    </div>
  );
};

export default SeparateStudunts;
