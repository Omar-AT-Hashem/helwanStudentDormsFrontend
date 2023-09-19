import {useState} from 'react';
import SearchForStudents from '../../components/minicomponent/SearchForStudents';
import Records from "../../assets/fakeData/Records.json"
import holidayData from "../../assets/fakeDaTA/holidatData.json"





const Asbsenteeism = () => {
    const [student, setStudent] = useState({name: "wrwer"})
    return (

       
        <div className=' pt-16 flex flex-row w-full h-screen '  >
            
          <div className='w-64'>
            <SearchForStudents setStudent={setStudent} />
         </div>
                
           
            <div className=' flex-1'>
                <div className='  bg-sky-700 w-full h-10 text-fuchsia-50 text-center text-2xl '>
                الغياب والتصاريح - جامعة حلوان
                </div>

                <div className="Data">
                    {
                        Records.map(record => {
                            return(
                                <div className="box" key={record.id }>
                                    <form className="flex flex-col  py-2 2xl:text-3xl text-2xl	pr-8	">
                                        

                                        
                                           <label className='mb-4 '><span className='text-red-700'>اسم المستخدم :</span> <strong>{record.الاسم}</strong></label>
                                    


                                            <label className='mb-4'> النوع :<strong>{record.النوع}</strong></label>
                                             
                                             <div className='mb-4'>
                                              <label className=' ml-10'> من تاريخ : <strong>{record['من تاريخ ']}</strong></label>
                                              <label className=' mr-10'> الحصول على وجبه :<strong>{record['الحصول وجبه']}</strong></label>
                                            </div>
                                    
                                            <div className='mb-2'>
                                               <label className='ml-10'> الى تاريخ : <strong>{record['الى تاريخ']}</strong></label>
                                               <label className='mr-9'>الحصول على وجبه:<strong>{record['الحصول على وجبه']}</strong></label>
                                            </div>


                                               <label className='mb-2'>تاريخ السداد :<strong>{record['تاريخ  السداد']}</strong></label>



                                             <label className='mb-2'> رقم قيمه السداد :<strong>{record['رقم قسيمه السداد']}</strong></label>
                                     
 
                                             <label className='mb-2'> تاريخ السداد :<strong>{record['تاريخ السداد']}</strong></label>
                                

                                            <label className='mb-2'> ملاحظات :<strong>{record.ملاحظات}</strong></label>
                                            <label></label>
                                           
                                            <div class="flex justify-center">
                                              <button class="bg-blue-500 hover:opacity-70 hover:cursor-pointer transition-all duration-200  text-white font-bold py-2 px-4 rounded mx-2">تعديل</button>
                                              <button class="bg-orange-500 hover:opacity-70 hover:cursor-pointer transition-all duration-200 text-white font-bold py-2 px-4 rounded mx-2">اغلاق</button>
                                              <button class="bg-red-500 hover:opacity-70 hover:cursor-pointer transition-all duration-200 text-white font-bold py-2 px-4 rounded mx-2">حذف</button>
                                            </div>

                                              
                                            
                                        
                                   </form>
                                <div>
                                   <table className="table-auto w-4/5 mx-auto">
                                      <thead>
                                        <tr>
                                           <th className="px-4 py-2">النوع</th>
                                           <th className="px-4 py-2">من تاريخ</th>
                                           <th className="px-4 py-2" >حتى تاريخ<button className="bg-blue-500 hover:opacity-70 hover:cursor-pointer transition-all duration-200 text-white font-bold py-2 px-4 rounded mx-2">اضافه</button></th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                            {holidayData.map((item) => (
                                           <tr key={item.id}>
                                               <td className="border px-4 py-2">{item.Kind}</td>
                                               <td className="border px-4 py-2">{item.startDate}</td>
                                               <td className="border px-4 py-2">{item.endDate}</td>
                                          </tr>
                                       ))}
                                      </tbody>
                                    </table>
                                 </div>
         </div>                                
                            
                            )

                        }
                            
                            )
                    }

                </div>
            </div>
        </div>
    );
};

export default Asbsenteeism;