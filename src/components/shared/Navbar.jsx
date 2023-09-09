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
    "h-10 w-full flex text-center items-center hover:bg-mainYellow hover:cursor-pointer transition-all duration-200 select-none flex justify-center";

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
        <div className="flex gap-32 items-center h-full relative z-50">
          <div className="h-full">
            <img src={logo} alt="Logo" className="h-full" />
          </div>
          <div className="h-full ">
            <ul className="flex text-lg text-slate-100 h-full">
              <li className="">
                <div className={navBarMainLinks} onClick={handleFirstLinkClick}>
                  {" "}
                  بينات الطلاب{" "}
                </div>
              </li>

              <li>
                <div
                  className={navBarMainLinks}
                  onClick={handleSecondLinkClick}
                >
                  {" "}
                  بينات الطالبات{" "}
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
        className={` w-full px-10 text-slate-100 fixed ${
          firstLinkClicked ? "top-16" : "top-0"
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
      <div
        className={`fixed w-full px-10 text-slate-100  ${
          secondLinkClicked ? "top-16" : "top-0"
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
      <div
        className={`fixed w-full px-10 text-slate-100  ${
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
