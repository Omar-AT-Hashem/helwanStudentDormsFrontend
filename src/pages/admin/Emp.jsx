import { BoxSelect } from 'lucide-react';
import React from 'react';

const Emp = () => {
    return (
        <div className=' mt-20 flex flex-row w-full h-screen '  >
            <div className= "bg-gray-800 w-1/5">
                <div className='  bg-sky-700 w-full h-10 text-fuchsia-50 text-center text-2xl'>
                    بيانات اساسية
                </div>
                <div className=' flex flex-col'>
                    <form>
                    <div className=' m-1'>
                <label className='  text-white' for="years">العام الدراسي </label>
                
                    <select className=' mr-2'  name="years" id="years">
                    <option value="">2022-2023</option>
                    <option value="">2023-2024</option>
                    
                    </select>
                    </div>
                    <div className=' m-1'>
                    <label className='  text-white ro' for="college"> الكلية</label>

                    <select className=' mx-2'  name="college" id="college">
                    <option value="">الحاسبات والذكاء الاصطناعي</option>
                    <option value="">الاداب</option>
                    
                    </select>
                    </div>
                    <div className=' text-white'>
                        <input className='mx-2 ' type='radio' id="inuniversity" name="checkInUniversity" value="inuniversity"></input>
                        <label for="inuniversity">طلاب الجامعة</label>

                        <input className=' mx-2' type='radio'  id="outuniversity" name="checkInUniversity" value="outuniversity"></input>
                        <label for ="outuniversity">من خارج الجامعة</label>
                     </div> 
                     <div className=' text-white'>
                        <input className=' mx-2' type='radio'id="egyption" name="checkegyption" value="egyption"></input>
                        <label for ="egyption">مصري</label>

                        <input className=' mx-2 mr-10' type='radio'id="outegyption" name="checkegyption" value="outegyption"></input>
                        <label for ="outegyption">وافد</label>
                     </div> 
                     <div className=' text-white'>
                        <input className=' mx-2' type='radio'id="applicants" name="checkapplicants" value="applicants"></input>
                        <label for ="applicants">متقدمين</label>

                        <input className=' mx-2 mr-10' type='radio'id="accepted" name="checkapplicants" value="accepted"></input>
                        <label for ="accepted">مقبولين</label>
                     </div>  
                     <div className=' text-slate-50 grid grid-cols-4'>
                        <input type="checkbox" id="old" name="old" value="old"></input>
                        <label for="old"> قدامي</label>

                        <input type="checkbox" id="new" name="new" value="new"></input>
                        <label for="new"> جدد</label>

                        <input type="checkbox" id="normal" name="normal" value="normal"></input>
                        <label for="normal"> سكن عادي</label>

                        <input type="checkbox" id="special" name="special" value="special"></input>
                        <label for="special"> سكن مميز</label>

                        <input type="checkbox" id="unstill" name="unstill" value="unstill"></input>
                        <label for="unstill"> غير ساكنين</label>

                        <input type="checkbox" id="still" name="still" value="still"></input>
                        <label for="still"> ساكنين</label>

                        <input type="checkbox" id="evacution" name="evacution" value="evacution"></input>
                        <label for="evacution"> اخلاء</label>

                        

                     </div>
                     <div >
                     <label className=' text-slate-50 mr-3' for="nationalId">البحث بالرقم القومي</label>
                     <input className='m-2' type="text" id="nationalId" name="nationalId"></input>
                     <button className=' text-slate-50 mr-2 px-1 border-2 rounded bg-orange-500 hover:bg-lime-900 ' type="button" onclick="">عرض</button>
                     </div>

                    </form>
                </div>

            </div>
            <div className=' bg-zinc-900 w-4/5'>
                <div className='  bg-sky-700 w-full h-10 text-fuchsia-50 text-center text-2xl'>
                بيانات اساسية - جامعة حلوان
                </div>

            </div>
        </div>
    );
};

export default Emp;