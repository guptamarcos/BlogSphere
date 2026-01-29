import { CiSearch } from "react-icons/ci";
import { FiUserPlus, FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { ShowProfilePopup } from "../context/ShowProfilePopupContext.jsx";


function Navbar() {
  const { user } = useContext(UserContext);
  const { setShowProfilePopup } = useContext(ShowProfilePopup);
  
  return (
    <header className="fixed h-[10vh] w-full bg-[#F9FAFB] border-b-2 border-b-[#E5E7EB] z-10">
      <nav className="h-full w-full px-[4rem] flex justify-between items-center">
        <h1 className="text-[#1D4ED8] font-bold text-4xl hover:text-[#1E40AF]">
          BlogSphere
        </h1>
        <form className="flex items-center">
          <input
            placeholder="Search here..."
            className="w-[25rem] rounded-xl px-[1rem] py-[0.4rem] bg-gray-100 text-[#111827] border border-[#D1D5DB]"
          />
          <button className="rounded-xl px-[0.8rem] py-[0.4rem] ml-2 bg-[#FFFFFF] text-[#4B5563] border border-[#D1D5DB] cursor-pointer">
            <CiSearch className="text-2xl" />
          </button>
        </form>
        {!user && 
        <div>
          <Link
            to="/blogsphere/signup"
            className="bg-[#2563EB] text-base text-[#FFFFFF] mr-2 px-[0.8rem] py-[0.5rem] rounded-xl hover:bg-[#1E40AF]"
          >
            <FiUserPlus className="inline-block mr-2 text-xl" />
            Sign Up
          </Link>
          <Link
            to="/blogsphere/logIn"
            className="bg-transparent text-base border px-[0.8rem] py-[0.5rem] rounded-xl border-[#CBD5E1] text-[#374151] hover:bg-[#F1F5F9] hover:text-[#1D4ED8]"
          >
            <FiLogIn className="inline-block mr-2 text-xl" />
            Log In
          </Link>
        </div>
        }

        {user && <img src="https://i.pravatar.cc/150" className="h-[8vh] w-[4vw] rounded-[50%] cursor-pointer" onClick={()=>setShowProfilePopup((prev)=>!prev)}></img>}
      </nav>
    </header>
  );
}

export default Navbar;
