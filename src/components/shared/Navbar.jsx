import { Link } from "react-router-dom";
import LogoBlack from "../../assets/auxillary/helwanLogo.jpg";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [servicesClicked, setServicesClicked] = useState(false);
  const [aboutClicked, setAboutClicked] = useState(false);
  const [careersClicked, setCareersClicked] = useState(false);
  const [portalClicked, setPortalClicked] = useState(false);

  const handleNavMenuClick = () => {
    setNavMenuOpen(!navMenuOpen);
  };

  const HandleExitClick = () => {
    setNavMenuOpen(false);
    setServicesClicked(false);
    setAboutClicked(false);
    setCareersClicked(false);
    setPortalClicked(false);
  };

  const handleServicesClick = () => {
    setServicesClicked(!servicesClicked);
    setAboutClicked(false);
    setCareersClicked(false);
    setPortalClicked(false);
  };
  const handleAboutClick = () => {
    setAboutClicked(!aboutClicked);
    setServicesClicked(false);
    setCareersClicked(false);
    setPortalClicked(false);
  };
  const handleCareersClick = () => {
    setCareersClicked(!careersClicked);
    setServicesClicked(false);
    setAboutClicked(false);
    setPortalClicked(false);
  };
  const handlePortalClick = () => {
    setPortalClicked(!portalClicked);
    setServicesClicked(false);
    setAboutClicked(false);
    setCareersClicked(false);
  };

  {
    /*tailwind repeated classnames*/
  }
  const navLinkClass =
    "mx-4 flex items-center h-full hover:cursor-pointer flex-col justify-center  transition-all duration-200 w-fit group font-semibold";

  const itemClass =
    "w-full py-4 hover:bg-mainYellow text-center transition-all duration-200  group";

  const navLinkSideMenuClass =
    "my-4 flex items-center h-full hover:cursor-pointer flex-col justify-center  transition-all duration-200 w-fit group font-semibold relative bg-mainBlue w-full";

  const growingLineClass =
    "group w-0 group-hover:w-20 h-[2px] bg-mainYellow transition-all duration-400 origin-left justify-start ";

  const growingLineMenuClass =
    "group w-0 group-hover:w-24 h-[2px] bg-mainTheme transition-all duration-400 origin-left justify-start  mr-5";

  const shevronClass = "group-hover:text-mainYellow";

  return (
    <>
      {/* Navbar*/}
      <nav className="fixed top-0 bg-[#235787] z-50">
        <div className="flex justify-between items-center w-screen  px-6 h-20  relative">
          {/* Logo*/}
          <div>
            <Link to="/">
              <img src={LogoBlack} alt="logo" className="h-[75px]" />
            </Link>
          </div>

          <Menu
            size={28}
            className="text-white lg:hidden mr-3 hover:cursor-pointer hover:opacity-80 transition-all h-full "
            onClick={handleNavMenuClick}
          />
          {/* NavLinks*/}
          <div className="h-full hidden lg:block">
            <ul className="flex h-full text-white">
              {/* Services*/}
              <li>
                <div className={navLinkClass}>
                  <div className="flex items-center">
                    <p>itemsMenu 1</p>
                    <ChevronDown size={18} className={shevronClass} />
                  </div>
                  <span className={growingLineClass}></span>
                  {/*Submenu*/}
                  <ul className="bg-mainBlue flex  items-center  absolute left-0 w-screen top-full h-0 group-hover:h-14 transition-all duration-200 overflow-hidden ">
                    <Link
                      to="/services/fire-and-life-safety-systems"
                      className={itemClass}
                    >
                      item 1
                    </Link>

                    <Link to="services/security-systems" className={itemClass}>
                      item 2
                    </Link>
                    <Link to="services/passive-fire" className={itemClass}>
                      item 3
                    </Link>
                    <Link to="services/monitoring" className={itemClass}>
                      item 4
                    </Link>
                    <div className={`${itemClass} group`}>
                      <div>item 8</div>
                      <ul className="bg-mainBlue flex flex-col items-center absolute w-full top-full h-0 group-hover:h-52 transition-all duration-200 overflow-hidden">
                        <Link className={itemClass}> link1 </Link>
                        <Link className={itemClass}> link2 </Link>
                        <Link className={itemClass}> link3 </Link>
                        <Link className={itemClass}> link4 </Link>
                      </ul>
                    </div>
                    <Link to="services/monitoring" className={itemClass}>
                      item 5
                    </Link>
                    <Link to="services/monitoring" className={itemClass}>
                      item 6
                    </Link>
                    <Link to="services/monitoring" className={itemClass}>
                      item 7
                    </Link>

                    <Link to="services/monitoring" className={itemClass}>
                      item 9
                    </Link>
                    <Link to="services/monitoring" className={itemClass}>
                      item 10
                    </Link>
                  </ul>
                </div>
              </li>

              {/*Portal*/}
              <li>
                <Link
                  target="_blank"
                  to="https://esft.onuptick.com/login/?next=/newcustomerportal/?"
                  className={navLinkClass}
                >
                  <div className="flex items-center">
                    <p>تسجيل دخول الطلاب</p>
                    <ChevronDown size={18} className={shevronClass} />
                  </div>
                  <span className={growingLineClass}></span>
                  {/*Submenu*/}
                  <ul className="bg-mainBlue flex  items-center  absolute left-0 w-screen border-gray-300 top-full h-0 group-hover:h-10  transition-all duration-200 overflow-hidden">
                    <Link
                      target="_blank"
                      to="https://esft.onuptick.com/login/?next=/newcustomerportal/?"
                      className="w-full py-4 hover:bg-mainTheme hover:text-white text-center transition-all duration-200"
                    >
                      Customer
                    </Link>
                    <Link
                      target="_blank"
                      to="https://esft.onuptick.com/login/?next=/newcustomerportal/?"
                      className="py-4 hover:bg-mainTheme hover:text-white w-full text-center transition-all duration-200"
                    >
                      Supplier
                    </Link>
                    <Link
                      target="_blank"
                      to="https://esft.onuptick.com/login/?next=/newcustomerportal/?"
                      className="py-4 hover:bg-mainTheme hover:text-white w-full text-center transition-all duration-200"
                    >
                      Employee
                    </Link>
                  </ul>
                </Link>
              </li>

              {/* About */}
              <li>
                <Link to="/about" className={navLinkClass}>
                  <div className="flex items-center">
                    <p>تقديم طلب للالتحاق بالمدن الجامعيه</p>
                    <ChevronDown size={18} className={shevronClass} />
                  </div>
                  <span className={growingLineClass}></span>
                  {/*Submenu*/}
                  <ul className="bg-mainBlue flex  items-center  absolute left-0 w-screen border-gray-300 top-full h-0 group-hover:h-10  transition-all duration-200 overflow-hidden">
                    <Link
                      to="/about/accreditations"
                      className="py-4 hover:bg-mainTheme hover:text-white w-full text-center transition-all duration-200 "
                    >
                      Accreditations
                    </Link>
                    <Link
                      to="/about/policies"
                      className="py-4 hover:bg-mainTheme hover:text-white w-full text-center transition-all duration-200"
                    >
                      Policies
                    </Link>
                  </ul>
                </Link>
              </li>

              {/* Careers */}
              <li>
                <Link to="/work-with-us" className={navLinkClass}>
                  <div className="flex items-center">
                    <p>مواعيد التقديم للمدن الجامعيه</p>
                    <ChevronDown size={18} className={shevronClass} />
                  </div>
                  <span className={growingLineClass}></span>
                  {/*Submenu*/}
                  <ul className="bg-mainBlue flex  items-center  absolute left-0 w-screen border-gray-300 top-full h-0 group-hover:h-10  transition-all duration-200 overflow-hidden">
                    <Link
                      to="/work-with-us"
                      className="py-4 hover:bg-mainYellow hover:text-white w-full text-center transition-all duration-200"
                    >
                      Work With Us
                    </Link>
                  </ul>
                </Link>
              </li>

              {/* Contact */}
            </ul>
          </div>

          {/* NavSideMenu */}
          <div
            className={`bg-mainBlue h-screen top-0 absolute flex items-center justify-center px-4 lg:hidden ${
              navMenuOpen ? "left-0" : "-left-full"
            } py-4 transition-all duration-300`}
          >
            <X
              size={28}
              className="absolute top-4 left-4 text-white hover:cursor-pointer hover:opacity-80"
              onClick={HandleExitClick}
            />
            <ul className="flex flex-col h-full mt-20 items-center text-white">
              {/* Home*/}
              <li>
                <div className={navLinkSideMenuClass}>
                  <div className="flex items-center mr-5">
                    <Link to="/" onClick={HandleExitClick}>
                      <p>مواعيد التقديم للمدن الجامعيه</p>
                    </Link>
                  </div>
                  <span className={`${growingLineMenuClass}`}></span>
                </div>
              </li>

              {/* Services*/}
              <li>
                <div className={navLinkSideMenuClass}>
                  <div className="flex items-center">
                    <div>
                      <p>ارشادات التقدم و الاقرارات</p>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`${shevronClass} ${
                        servicesClicked ? "rotate-180" : "rotate-0"
                      } transition-all duration-200 ml-2 hover:bg-slate-400 hover:rounded-full`}
                      onClick={handleServicesClick}
                    />
                  </div>
                  <span className={growingLineMenuClass}></span>
                  {/*Submenu*/}
                  <ul
                    className={`bg-white flex flex-col items-center   w-52 border-gray-300  transition-all h-0 duration-200 overflow-hidden ${
                      servicesClicked ? "h-56 border-t mb-3" : "h-0"
                    }`}
                  >
                    <Link
                      to="/services/fire-and-life-safety-systems"
                      className="py-4 hover:bg-mainTheme hover:text-white w-full text-center transition-all duration-200"
                      onClick={HandleExitClick}
                    >
                      Fire & Life Safety
                    </Link>
                    <Link
                      to="/services/security-systems"
                      className="py-4 hover:bg-mainTheme hover:text-white w-full text-center transition-all duration-200 "
                      onClick={HandleExitClick}
                    >
                      Security Systems
                    </Link>
                    <Link
                      to="/services/passive-fire"
                      className="py-4 hover:bg-mainTheme hover:text-white w-full text-center transition-all duration-200 "
                      onClick={HandleExitClick}
                    >
                      Passive Fire
                    </Link>
                    <Link
                      to="/services/monitoring"
                      className="py-4 hover:bg-mainTheme hover:text-white w-full text-center transition-all duration-200 "
                      onClick={HandleExitClick}
                    >
                      Monitoring
                    </Link>
                  </ul>
                </div>
              </li>

              {/* Portal*/}
              <li>
                <div className={navLinkSideMenuClass}>
                  <div className="flex items-center">
                    <Link
                      onClick={HandleExitClick}
                      target="_blank"
                      to="https://esft.onuptick.com/login/?next=/newcustomerportal/?"
                    >
                      <p>تقديم طلب للالتحاق بالمدن الجامعيه</p>
                    </Link>
                    <ChevronDown
                      size={18}
                      className={`${shevronClass} ${
                        portalClicked ? "rotate-180" : "rotate-0"
                      } transition-all duration-200 ml-2 hover:bg-gray-300 hover:rounded-full`}
                      onClick={handlePortalClick}
                    />
                  </div>
                  <span className={growingLineMenuClass}></span>
                  {/*Submenu*/}
                  <ul
                    className={`bg-white flex flex-col items-center   w-52 border-gray-300  transition-all h-0 duration-200 overflow-hidden ${
                      portalClicked ? "h-[169px] border-t mb-3" : "h-0"
                    }`}
                  >
                    <Link
                      target="_blank"
                      to="https://esft.onuptick.com/login/?next=/newcustomerportal/?"
                      className="py-4 hover:bg-mainTheme hover:text-white w-full text-center transition-all duration-200"
                      onClick={HandleExitClick}
                    >
                      Customer
                    </Link>
                    <Link
                      target="_blank"
                      to="https://esft.onuptick.com/login/?next=/newcustomerportal/?"
                      className="py-4 hover:bg-mainTheme hover:text-white w-full text-center transition-all duration-200 "
                      onClick={HandleExitClick}
                    >
                      Supplier
                    </Link>
                    <Link
                      target="_blank"
                      to="https://esft.onuptick.com/login/?next=/newcustomerportal/?"
                      className="py-4 hover:bg-mainTheme hover:text-white w-full text-center transition-all duration-200 "
                      onClick={HandleExitClick}
                    >
                      Employee
                    </Link>
                  </ul>
                </div>
              </li>

              {/* About */}
              <li>
                <div className={navLinkSideMenuClass}>
                  <div className="flex items-center">
                    <Link to="/about" onClick={HandleExitClick}>
                      <p>تسجيل دخول الطلاب</p>
                    </Link>
                    <ChevronDown
                      size={18}
                      className={`${shevronClass} ${
                        aboutClicked ? "rotate-180" : "rotate-0"
                      } transition-all duration-200 ml-2 hover:bg-slate-400 hover:rounded-full`}
                      onClick={handleAboutClick}
                    />
                  </div>
                  <span className={growingLineMenuClass}></span>
                  {/*Submenu*/}
                  <ul
                    className={`bg-white flex flex-col items-center   w-52 border-gray-300  transition-all h-0 duration-200 overflow-hidden ${
                      aboutClicked ? "h-28 border-t mb-3" : "h-0"
                    }`}
                  >
                    <Link
                      to="/about/accreditations"
                      className="py-4 hover:bg-mainTheme hover:text-white w-full text-center transition-all duration-200 "
                      onClick={HandleExitClick}
                    >
                      Accreditations
                    </Link>
                    <Link
                      to="/about/policies"
                      className="py-4 hover:bg-mainTheme hover:text-white w-full text-center transition-all duration-200"
                      onClick={HandleExitClick}
                    >
                      Policies
                    </Link>
                  </ul>
                </div>
              </li>

              {/* Careers */}
              <li>
                <div className={navLinkSideMenuClass}>
                  <div className="flex items-center">
                    <Link to="/work-with-us" onClick={HandleExitClick}>
                      <p>الاستعلام عن القبول بالمدن الجامعيه</p>
                    </Link>
                    <ChevronDown
                      size={18}
                      className={`${shevronClass} ${
                        careersClicked ? "rotate-180" : "rotate-0"
                      } transition-all duration-200 ml-2 hover:bg-slate-400 hover:rounded-full`}
                      onClick={handleCareersClick}
                    />
                  </div>
                  <span className={growingLineMenuClass}></span>
                  {/*Submenu*/}
                  <ul
                    className={`bg-white flex flex-col items-center   w-52 border-gray-300  transition-all h-0 duration-200 overflow-hidden ${
                      careersClicked ? "h-16 border-t mb-3" : "h-0"
                    }`}
                  >
                    <Link
                      to="/work-with-us"
                      className="py-4 hover:bg-mainTheme hover:text-white w-full text-center transition-all duration-200"
                      onClick={HandleExitClick}
                    >
                      Work With Us
                    </Link>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
