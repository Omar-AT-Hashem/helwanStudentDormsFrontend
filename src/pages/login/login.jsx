import mainImage from "../../assets/login/loginMainImage.jpeg"

export default function Login() {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full overscroll-none	'>
            <div className='bg-mainBlue flex flex-col justify-center'>
                <form className='max-w-[400px] w-full mx-auto bg-gray-500 p-8 px-8 rounded-lg'>
                    <h2 className='text-4xl '>تسجيل دخول</h2>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>اسم المستخدم</label>
                        <input className='loginLabel' type="text" />
                    </div>

                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>كلمه السر</label>
                        <input className='loginLabel' type="password" />
                    </div>
                    <div className=' text-gray-400 flex justify-between p-2'>
                        <button className='bg-mainYellow w-full my-5 py-2 shadow-teal-500/50 hover:shadow-teal-500/40 font-semibold rounded-lg'>تسجيل دخول</button>
                    </div>
                </form>
            </div>


            <div className='hidden sm:block'>
                <img className='w-full h-full object-cover' src={mainImage} alt="Main image" />
            </div>
        </div>
    )
}