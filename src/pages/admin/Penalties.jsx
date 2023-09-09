import React from 'react';
import SearchForStudents from '../../components/minicomponent/SearchForStudents';

const Penalties = () => {
    return (
        <div className=' pt-16 flex flex-row w-full h-screen '  >
            <div className= "bg-gray-800 w-1/5">
                <div className='  bg-sky-700 w-full h-10 text-fuchsia-50 text-center text-2xl'>
                    الجزاءات
                </div>
                <SearchForStudents />
                
            </div>
            <div className=' bg-zinc-900 w-4/5'>
                <div className='  bg-sky-700 w-full h-10 text-fuchsia-50 text-center text-2xl'>
                الجزاءات - جامعة حلوان
                </div>

            </div>
        </div>
    );
};

export default Penalties;