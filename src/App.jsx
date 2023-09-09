import Footer from "./components/shared/Footer.jsx";
import { Navbar } from "./components/shared/Navbar.jsx";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
          <Navbar />
          <Outlet />
          <Footer />
          

    </>
  );
}

export default App;
