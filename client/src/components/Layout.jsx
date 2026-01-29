import { Navbar, Sidebar ,Footer,ProfilePopup } from "./Index.jsx";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { ShowProfilePopup } from "../context/ShowProfilePopupContext.jsx";


function Layout() {
  const {showProfilePopup} = useContext(ShowProfilePopup);
  return (
    <>
      <Navbar/>
      <Sidebar/>
      <div className="relative h-full w-full pt-[10vh] pl-[20vw] flex flex-col">
        <Outlet/>
        <Footer/>
        {showProfilePopup && <ProfilePopup/>}
      </div>
    </>
  );
}

export default Layout;
