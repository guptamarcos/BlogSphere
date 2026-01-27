import { NavLink } from "react-router-dom";
import { FiEdit, FiLogOut, FiUser } from "react-icons/fi";

function ProfilePopup() {
  return (
    <div className="absolute h-max w-[15vw] py-4 px-1 top-16 right-4 
      border border-gray-200 rounded-lg bg-gray-50 shadow-md z-50">

      {/* User Info */}
      <div className="px-4">
        <p className="text-gray-900 font-semibold">
          Gauri Shankar
        </p>
        <p className="text-sm text-gray-500">
          guptamarcos@gmail.com
        </p>
      </div>

      {/* Links */}
      <div className="my-3 py-2 border-y border-gray-200">
        <NavLink to="/" className="flex gap-2 items-center py-2 px-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-md transition">
          <FiUser />
          <span>Profile</span>
        </NavLink>

        <NavLink to="/" className="flex gap-2 items-center py-2 px-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-md transition">
          <FiEdit />
          <span>Create Blog</span>
        </NavLink>
      </div>

      {/* Logout */}
      <button type="button" className="w-[100%] flex gap-2 items-center px-3 py-2 cursor-pointer text-red-600  hover:bg-red-50 hover:text-red-700 rounded-md transition">
        <FiLogOut />
        <span>Logout</span>
      </button>
    </div>
  );
}

export default ProfilePopup;
