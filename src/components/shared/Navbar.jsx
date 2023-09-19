import { Link } from "react-router-dom";
import logo from "../../assets/auxillary/helwanLogo.jpg";
import { useState } from "react";

export const Navbar = () => {
  const [firstLinkClicked, setFirstLinkClicked] = useState(false);
  const [secondLinkClicked, setSecondLinkClicked] = useState(false);
  const [thirdLinkClicked, setThirdLinkClicked] = useState(false);

  const navBarMainLinks =
    " hover:bg-mainYellow hover:cursor-pointer h-full flex items-center px-6 transition-all duration-200 select-none";
  const subBarLinks =
    "h-10 flex px-6 items-center hover:bg-mainYellow hover:cursor-pointer transition-all duration-200 select-none";
  const dropDownLinks =
    "h-9 w-full flex text-center items-center hover:bg-mainYellow hover:cursor-pointer transition-all duration-200 select-none flex justify-center";

  const handleFirstLinkClick = () => {
    setFirstLinkClicked(!firstLinkClicked);
    setSecondLinkClicked(false);
    setThirdLinkClicked(false);
  };
  const handleSecondLinkClick = () => {
    setFirstLinkClicked(false);
    setSecondLinkClicked(!secondLinkClicked);
    setThirdLinkClicked(false);
  };
  const handleThirdLinkClick = () => {
    setFirstLinkClicked(false);
    setSecondLinkClicked(false);
    setThirdLinkClicked(!thirdLinkClicked);
  };

  return (
    <>
      <nav className="h-16 bg-mainBlue z-50 w-screen fixed ">
        <div className="flex gap-32 items-center h-full relative z-20">
          <div className="h-full">
            <img src={logo} alt="Logo" className="h-full" />
          </div>
          <div className="h-full ">
            <ul className="flex text-lg text-slate-100 h-full">
              <li className="">
                <div className={navBarMainLinks} onClick={handleFirstLinkClick}>
                  {" "}
                  بيانات الطلاب{" "}
                </div>
              </li>

              <li>
                <div
                  className={navBarMainLinks}
                  onClick={handleSecondLinkClick}
                >
                  {" "}
                  بيانات الطالبات{" "}
                </div>
              </li>
              <li>
                {" "}
                <div className={navBarMainLinks} onClick={handleThirdLinkClick}>
                  {" "}
                  الإشراف على النظام{" "}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        className={` w-full px-10 text-slate-100 fixed z-40 ${
          firstLinkClicked ? "top-16" : "top-0"
        }  right-0 bg-mainBlue transition-all duration-200`}
      >
        <ul className="flex h-full items-center">
           <Link to="/basicdata" className={subBarLinks}>
            بيانات اساسية
           </Link>
          <Link to="/Housing" className={subBarLinks}>السكن</Link>
          <Link to="/Penalties" className={subBarLinks}>الجزاءات</Link>
          <Link to="/SeparateStudunts" className={subBarLinks}>فصل الطلاب</Link>
          <Link to="/Asbsenteeism" className={subBarLinks}>الغياب والتصاريح</Link>
          <Link to="/taxes" className={subBarLinks}>الرسوم</Link>
          <Link to="/status" className={subBarLinks}>بيان حالة</Link>
          <Link to="/taxesstatment" className={subBarLinks}>بيان بالرسوم</Link>
          <Link to="/blockmeals" className={subBarLinks}>حجب وجبات</Link>
          
          <div className="relative group">
          <li className={subBarLinks}>تطبيقات</li>
            <ul className="flex flex-col items-center absolute top-full -left-10 h-0 overflow-hidden group-hover:h-96 bg-mainBlue w-72 grid grid-cols-2 transition-all duration-200">
              <li className={dropDownLinks}>مراجعة طلبات الانترنت</li>
              <li className={dropDownLinks}>سحب الصور</li>
              <li className={dropDownLinks}>التنسيق</li>
              <li className={dropDownLinks}>تصريح جماعي</li>

              <li className={dropDownLinks}>قبول الحالات الخاصة</li>
              <li className={dropDownLinks}>حجز الوجبات (اكسيل)</li>
              <li className={dropDownLinks}>رفع الصور</li>
              <li className={dropDownLinks}>جزاء جماعي</li>
              <li className={dropDownLinks}>طباعة البطاقات</li>
              <li className={dropDownLinks}>تغيير نوع السكن لطالب</li>
              <li className={dropDownLinks}>اعادة الطباعة</li>
              <li className={dropDownLinks}>فصل جماعي</li>
              <li className={dropDownLinks}>استلام الوجبات باركود</li>
              <li className={dropDownLinks}>طباعة اخطار القبول</li>
              <li className={dropDownLinks}>استلام الوجبات(اكسيل)</li>
              <li className={dropDownLinks}>اعادة طباعةاخطار القبول</li>
              <li className={dropDownLinks}>حجز الوجبات بالباركود</li>
              <li className={dropDownLinks}>حالات البحث الاجتماعي</li>
              <li className={dropDownLinks}>اخلاء جماعي</li>



            </ul>
          </div>


          <div className="relative group">
            <li className={subBarLinks}>تقارير</li>
            <ul className="flex flex-col items-center absolute top-full -left-10 h-0 overflow-hidden group-hover:h-36 bg-mainBlue w-44 transition-all duration-200">
              <li className={dropDownLinks}>subitem 1</li>
              <li className={dropDownLinks}>subitem 1</li>
              <li className={dropDownLinks}>subitem 1</li>
              <li className={dropDownLinks}>subitem 1</li>
            </ul>
          </div>
          <div className="relative group">
            <li className={subBarLinks}>احصائيات</li>
            <ul className="flex flex-col items-center absolute top-full -left-10 h-0 overflow-hidden group-hover:h-36 bg-mainBlue w-44 transition-all duration-200">
              <li className={dropDownLinks}>subitem 1</li>
              <li className={dropDownLinks}>subitem 1</li>
              <li className={dropDownLinks}>subitem 1</li>
              <li className={dropDownLinks}>subitem 1</li>
            </ul>
          </div>
        </ul>
      </div>
      <div
        className={`fixed w-full px-10 text-slate-100 z-40  ${
          secondLinkClicked ? "top-16" : "top-0"
        }  right-0 bg-mainBlue transition-all duration-200`}
      >
                <ul className="flex h-full items-center">
          <Link to="/basicdata" className={subBarLinks}>
            بيانات اساسية
          </Link>
          
          <Link to="/Housing" className={subBarLinks}>السكن</Link>
          <Link to="/Penalties" className={subBarLinks}>الجزاءات</Link>
          <Link to="/SeparateStudunts" className={subBarLinks}>فصل الطلاب</Link>
          <Link to="/Asbsenteeism" className={subBarLinks}>الغياب والتصاريح</Link>
          <Link to="/taxes" className={subBarLinks}>الرسوم</Link>
          <Link to="/status" className={subBarLinks}>بيان حالة</Link>
          <Link to="/taxesstatment" className={subBarLinks}>بيان بالرسوم</Link>
          <Link to="/blockmeals" className={subBarLinks}>حجب وجبات</Link>
          <div className="relative group">
            <li className={subBarLinks}>تطبيقات</li>
            <ul className="flex flex-col items-center absolute top-full -left-10 h-0 overflow-hidden group-hover:h-96 bg-mainBlue w-72 grid grid-cols-2 transition-all duration-200">
              <li className={dropDownLinks}>مراجعة طلبات الانترنت</li>
              <li className={dropDownLinks}>سحب الصور</li>
              <li className={dropDownLinks}>التنسيق</li>
              <li className={dropDownLinks}>تصريح جماعي</li>

              <li className={dropDownLinks}>قبول الحالات الخاصة</li>
              <li className={dropDownLinks}>حجز الوجبات (اكسيل)</li>
              <li className={dropDownLinks}>رفع الصور</li>
              <li className={dropDownLinks}>جزاء جماعي</li>
              <li className={dropDownLinks}>طباعة البطاقات</li>
              <li className={dropDownLinks}>تغيير نوع السكن لطالب</li>
              <li className={dropDownLinks}>اعادة الطباعة</li>
              <li className={dropDownLinks}>فصل جماعي</li>
              <li className={dropDownLinks}>استلام الوجبات باركود</li>
              <li className={dropDownLinks}>طباعة اخطار القبول</li>
              <li className={dropDownLinks}>استلام الوجبات(اكسيل)</li>
              <li className={dropDownLinks}>اعادة طباعةاخطار القبول</li>
              <li className={dropDownLinks}>حجز الوجبات بالباركود</li>
              <li className={dropDownLinks}>حالات البحث الاجتماعي</li>
              <li className={dropDownLinks}>اخلاء جماعي</li>



            </ul>
          </div>


          <div className="relative group">
            <li className={subBarLinks}>تقارير</li>
            <ul className="flex flex-col items-center absolute top-full -left-10 h-0 overflow-hidden group-hover:h-36 bg-mainBlue w-44 transition-all duration-200">
              <li className={dropDownLinks}>subitem 1</li>
              <li className={dropDownLinks}>subitem 1</li>
              <li className={dropDownLinks}>subitem 1</li>
              <li className={dropDownLinks}>subitem 1</li>
            </ul>
          </div>
          <div className="relative group">
            <li className={subBarLinks}>احصائيات</li>
            <ul className="flex flex-col items-center absolute top-full -left-10 h-0 overflow-hidden group-hover:h-36 bg-mainBlue w-44 transition-all duration-200">
              <li className={dropDownLinks}>subitem 1</li>
              <li className={dropDownLinks}>subitem 1</li>
              <li className={dropDownLinks}>subitem 1</li>
              <li className={dropDownLinks}>subitem 1</li>
            </ul>
          </div>
        </ul>
      </div>
      <div
        className={`fixed w-full px-10 text-slate-100 z-40 ${
          thirdLinkClicked ? "top-16" : "top-0"
        }  right-0 bg-mainBlue transition-all duration-200`}
      >
        <ul className="flex h-full items-center">
          <li className={subBarLinks}>item 1</li>
          <div className="relative group">
            <li className={subBarLinks}>item 1</li>
            <ul className="flex flex-col items-center absolute top-full -left-10 h-0 overflow-hidden group-hover:h-36 bg-mainBlue w-44 transition-all duration-200">
              <li className={dropDownLinks}>subitem 1</li>
              <li className={dropDownLinks}>subitem 1</li>
              <li className={dropDownLinks}>subitem 1</li>
              <li className={dropDownLinks}>subitem 1</li>
            </ul>
          </div>
          <li className={subBarLinks}>item 1</li>
          <li className={subBarLinks}>item 1</li>
          <li className={subBarLinks}>item 1</li>
          <div className="relative group">
            <li className={subBarLinks}>item 1</li>
            <ul className="flex flex-col items-center absolute top-full -left-10 h-0 overflow-hidden group-hover:h-36 bg-mainBlue w-44 transition-all duration-200">
              <li className={dropDownLinks}>subitem 1</li>
              <li className={dropDownLinks}>subitem 1</li>
              <li className={dropDownLinks}>subitem 1</li>
              <li className={dropDownLinks}>subitem 1</li>
            </ul>
          </div>
          <li className={subBarLinks}>item 10</li>
        </ul>
      </div>
    </>
  );
};
