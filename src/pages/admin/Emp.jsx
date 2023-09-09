
const Emp = () => {
    return (
        <div className=' mt-20 flex flex-row w-full h-screen '  >
            <div className= "bg-gray-800 w-1/5">
                <div className='  bg- w-full h-10 text-fuchsia-50 text-center text-2xl overflow-scroll'>
                    بيانات اساسية
                </div>
                <div className=' flex flex-col'>
                    <form>
                    <div className=' m-1'>
                <label className='  text-white' htmlFor="years">العام الدراسي </label>
                
                    <select className=' mr-2'  name="years" id="years">
                    <option value="">2022-2023</option>
                    <option value="">2023-2024</option>
                    
                    </select>
                    </div>
                    <div className=' m-1'>
                    <label className='  text-white ro' htmlFor="college"> الكلية</label>

                    <select className=' mx-2'  name="college" id="college">
                    <option value="">الحاسبات والذكاء الاصطناعي</option>
                    <option value="">الاداب</option>
                    
                    </select>
                    </div>
                    <div className=' text-white'>
                        <input className='mx-2 ' type='radio' id="inuniversity" name="checkInUniversity" value="inuniversity"></input>
                        <label htmlFor="inuniversity">طلاب الجامعة</label>

                        <input className=' mx-2' type='radio'  id="outuniversity" name="checkInUniversity" value="outuniversity"></input>
                        <label htmlFor ="outuniversity">من خارج الجامعة</label>
                     </div> 
                     <div className=' text-white'>
                        <input className=' mx-2' type='radio'id="egyption" name="checkegyption" value="egyption"></input>
                        <label htmlFor ="egyption">مصري</label>

                        <input className=' mx-2 mr-10' type='radio'id="outegyption" name="checkegyption" value="outegyption"></input>
                        <label htmlFor ="outegyption">وافد</label>
                     </div> 
                     <div className=' text-white'>
                        <input className=' mx-2' type='radio'id="applicants" name="checkapplicants" value="applicants"></input>
                        <label htmlFor ="applicants">متقدمين</label>

                        <input className=' mx-2 mr-10' type='radio'id="accepted" name="checkapplicants" value="accepted"></input>
                        <label htmlFor ="accepted">مقبولين</label>
                     </div>  
                     <div className=' text-slate-50 grid grid-cols-4'>
                        <input type="checkbox" id="old" name="old" value="old"></input>
                        <label htmlFor="old"> قدامي</label>

                        <input type="checkbox" id="new" name="new" value="new"></input>
                        <label htmlFor="new"> جدد</label>

                        <input type="checkbox" id="normal" name="normal" value="normal"></input>
                        <label htmlFor="normal"> سكن عادي</label>

                        <input type="checkbox" id="special" name="special" value="special"></input>
                        <label htmlFor="special"> سكن مميز</label>

                        <input type="checkbox" id="unstill" name="unstill" value="unstill"></input>
                        <label htmlFor="unstill"> غير ساكنين</label>

                        <input type="checkbox" id="still" name="still" value="still"></input>
                        <label htmlFor="still"> ساكنين</label>

                        <input type="checkbox" id="evacution" name="evacution" value="evacution"></input>
                        <label htmlFor="evacution"> اخلاء</label>

                        

                     </div>
                     <div >
                     <label className=' text-slate-50 mr-3' htmlFor="nationalId">البحث بالرقم القومي</label>
                     <input className='m-2' type="text" id="nationalId" name="nationalId"></input>
                     <button className=' text-slate-50 mr-2 px-1 border-2 rounded bg-orange-500 hover:bg-lime-900 ' type="button" onClick="">عرض</button>
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