import logo from "../../assets/auxillary/helwanLogo.jpg";


export const Navbar = () => {

  const navBarMainLinks =
    "hover:bg-mainYellow hover:cursor-pointer h-full flex items-center px-6 transition-all duration-200";

  return (
    <nav className="h-16 bg-mainBlue">
      <div className="flex gap-32 items-center h-full">
        <div className="h-full">
          <img src={logo} alt="Logo" className="h-full" />
        </div>
        <div className="h-full ">
          <ul className="flex  text-lg text-slate-100 h-full">
            <li className={navBarMainLinks}> بينات الطلاب </li>
            <li className={navBarMainLinks}> بينات الطالبات </li>
            <li className={navBarMainLinks}> الإشراف على النظام </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
