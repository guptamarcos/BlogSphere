import { Navbar, Sidebar ,Footer,ProfilePopup } from "./Index.jsx";
import { Outlet } from "react-router-dom";
import { useState } from "react";


function Layout() {
  const [showPopup,setShowPopup] = useState(false);
  return (
    <>
      <Navbar/>
      <Sidebar/>
      <div className="relative h-full w-full pt-[10vh] pl-[20vw] flex flex-col">
        <Outlet/>
        <Footer/>
        {showPopup && <ProfilePopup/>}
      </div>
    </>
  );
}

export default Layout;
