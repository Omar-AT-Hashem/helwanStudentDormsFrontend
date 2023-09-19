const hagbwagabat = () => {
    const handleClick = () => {
        // button click logic 
        alert('Button Clicked!');
      };

    return (
      <div className="p-4">     
        <div className="flex mb-4">   
        <label className="mr-2">:الاسم</label>
        <label >  ابراهيم</label>
        </div>

        <div className="flex mb-4">   
        <label className="mr-2"> من تاريخ</label>
        <input
          type="date"
          id="date"
          name="date"
          className="border rounded-lg px-3 py-2 w-full"/>
        </div>

        <div className="flex mb-4">   
        <label className="mr-2"> الي تاريخ</label>
        <input
          type="date"
          id="date"
          name="date"
          className="border rounded-lg px-3 py-2 w-full"/>
        </div>

        <div className="mb-4">
        <label className="block font-bold mb-2">الوجابات</label>
        <div className="ml-4">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox" /> عشاء
          </label>
          <br />
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox" />  غذاء
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="block font-bold mb-2">السبب
        </label>
        <input
          type="text"
          className="border rounded-lg px-3 py-2 w-full"/>
      </div>


        <div className="mb-4">
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded mr-2" onClick={handleClick}>حفظ</button>
        </div>

     </div>
     );
};

export default hagbwagabat;
