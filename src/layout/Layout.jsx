import { Outlet } from "react-router-dom";
// import Header from "../components/header/Header";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

function Layout() {
  return (
    <div className="flex flex-col h-screen">
      {/* <Header /> */}
     <div>
     <Navbar />
     </div>
      <div className="mt-5 mb-5">
      {/* flex-1 overflow-y-auto p-4 bg-gray-100 mt-12 mb-12 */}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
