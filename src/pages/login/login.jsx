import mainImage from "../../assets/login/loginMainImage.jpeg";

export default function Login() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full overscroll-none	">
      <div className="bg-mainBlue flex flex-col justify-center px-4">
        <form className="flex items-center max-w-[400px] w-full mx-auto bg-gray-500 p-8 px-8 rounded-lg 2xl:max-w-[600px] 2xl:h-[600px] ">
          <div className="w-full">
            <h2 className="text-4xl 2xl:text-6xl">تسجيل دخول</h2>
            <div className="flex flex-col text-slate-300 py-2 2xl:text-3xl">
              <label>اسم المستخدم</label>
              <input className="loginLabel" type="text" />
            </div>

            <div className="flex flex-col text-slate-300 py-2 2xl:text-3xl">
              <label>كلمه السر</label>
              <input className="loginLabel" type="password" />
            </div>
            <div className="flex justify-between p-2">
              <button className="bg-mainYellow w-full my-5 py-2 hover:opacity-70 font-semibold rounded-lg text-slate-200 transition-all duration-200">
                تسجيل دخول
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="hidden md:block">
        <img
          className="w-full h-full object-cover"
          src={mainImage}
          alt="Main image"
        />
      </div>
    </div>
  );
}
