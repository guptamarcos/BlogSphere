import { NavLink ,useNavigate} from "react-router-dom";
import { FiEdit, FiLogOut, FiUser } from "react-icons/fi";
import axios from "axios";
import { useContext, useRef, useEffect} from "react";
import { UserContext } from "../context/UserContext";
import { ShowProfilePopup } from "../context/ShowProfilePopupContext";

function ProfilePopup() {
  const navigate = useNavigate();
  const { user, getUser } = useContext(UserContext);
  const { setShowProfilePopup, imgRef } = useContext(ShowProfilePopup);
  const element = useRef();

  useEffect(()=>{
    const handlePopup = (evt) =>{
      
      // CHECK ELEMENT.CURRENT IS UNDEFINED OR NOT 
      // CHECK POP UP NOT CONTAIN THE CURRENT ELEMENT 
      if(!element.current?.contains(evt.target) && !imgRef.current?.contains(evt.target) ){
        setShowProfilePopup(false);
      }
    }
    document.addEventListener("mousedown", handlePopup);

    return ()=>{
      document.removeEventListener("mousedown", handlePopup);
    } 
  },[]);

  async function handleLogout(){
    try{
      await axios.post("http://localhost:4000/api/auth/logout",{},{withCredentials: true});
      setShowProfilePopup(false);
      await getUser();
      navigate("/blogsphere");
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="fixed h-max w-[15vw] py-4 px-1 top-16 right-4 
      border border-gray-200 rounded-lg bg-gray-50 shadow-md z-50" ref={element}>

      {/* User Info */}
      <div className="px-4">
        <p className="text-lg text-gray-900 font-semibold">
          {user.username}
        </p>
        <p className="text-sm text-gray-500">
          {user.email}
        </p>
      </div>

      {/* Links */}
      <div className="my-3 py-2 border-y border-gray-200">
        <NavLink to="/blogsphere/user/profile" onClick={()=>setShowProfilePopup(false)} className="flex gap-2 items-center py-2 px-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-md transition">
          <FiUser />
          <span>Profile</span>
        </NavLink>

        <NavLink to="/blogsphere/newBlog"  onClick={()=>setShowProfilePopup(false)} className="flex gap-2 items-center py-2 px-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-md transition">
          <FiEdit />
          <span>Create Blog</span>
        </NavLink>
      </div>

      {/* Logout */}
      <button type="button" onClick={handleLogout} className="w-[100%] flex gap-2 items-center px-3 py-2 cursor-pointer text-red-600  hover:bg-red-50 hover:text-red-700 rounded-md transition">
        <FiLogOut />
        <span>Logout</span>
      </button>
    </div>
  );
}

export default ProfilePopup;
