import React from "react";
import { useState } from "react";

export const Test = () => {
  const [count, setCount] = useState(0);

  const addCount = () => {
    setCount((prev) => prev + 1);
  };
  const minusCount = () => {
    setCount((prev) => prev - 1);
  };

  console.log(count);
  return (
    <div className="ltr-local p-16 bg-slate-950">
      <div className="flex gap-10">
        <span
          className="bg-red-600 w-20 rounded-full cursor-pointer text-white flex justify-center"
          onClick={minusCount}
        >
          -
        </span>
        <span className="bg-gray-600 w-20 rounded-full cursor-pointer text-white flex justify-center">
          {count}
        </span>
        <span
          className="bg-blue-500 w-20 rounded-full cursor-pointer text-white flex justify-center"
          onClick={addCount}
        >
          +
        </span>
      </div>
      <div className="m-10 flex flex-col  gap-10 w-60">
        <input type="text" name="" />
        <input type="text" name="" />
        <input type="text" name="" />
      </div>
    </div>
  );
};
