const resom = () => {
    const handleClick = () => {
        // button click logic 
        alert('Button Clicked!');
      };

    return (
      <div className="p-4">     
        <div className="flex mb-4">   
        <label className="mr-2">اسم الرسوم</label>
        <label > رسوم الاقامة</label>
        </div>

        <div className="flex mb-4">   
        <label className="mr-2">اجباري للتغذية؟</label>
        <label > نعم</label>
        </div>

        <div className="flex mb-4">   
        <label className="mr-2">نوع الدفع </label>
        <label > شهري</label>
        </div>

        <div className="flex mb-4">   
        <label className="mr-2"> الجنسية</label>
        <label > وافد</label>
        </div>

        <div className="flex mb-4">   
        <label className="mr-2">داخل/خارج الجامعة </label>
        <label > طلاب في الجامعة</label>
        </div>

        <div className="flex mb-4">   
        <label className="mr-2">اقسام الكلية </label>
        <label > الكل</label>
        </div>

        <div className="flex mb-4">   
        <label className="mr-2">التقدير للقدامي </label>
        <label > الكل</label>
        </div>

        <div className="flex mb-4">   
        <label className="mr-2"> شعبة الثانوية العامة للجدد</label>
        <label > الكل</label>
        </div>

        <div className="flex mb-4">   
        <label className="mr-2"> التقديم</label>
        <label > الكل</label>
        </div>

        <div className="flex mb-4">   
        <label className="mr-2"> نوع القبول</label>
        <label > مقبول</label>
        </div>

        <div className="flex mb-4">   
        <label className="mr-2"> نوع السكن</label>
        <label > سكن مميز ثلاثي</label>
        </div>

        <div className="flex mb-4">   
        <label className="mr-2">سكن بتغذية </label>
        <label > سكن بتغذية</label>
        </div>

        <div className="flex mb-4">   
        <label className="mr-2"> السكن في الاعوام السابقة</label>
        <label > الكل</label>
        </div>

        <div className="flex mb-4">   
        <label className="mr-2"> المبلغ</label>
        <label > 2000</label>
        </div>

        <div className="flex mb-4">   
        <label className="mr-2">نوع الرسوم</label>
        <label > رسوم اقامة</label>
        </div>

        <div className="flex mb-4">   
        <label className="mr-2"> فعال</label>
        <label > لا</label>
        </div>

       

        <div className="mb-4">
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded mr-2" onClick={handleClick}>تعديل</button>
          <button className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded" onClick={handleClick}>اغلاق</button>
        </div>
     </div>
      );
};

export default resom;
