import { NavLink } from "react-router-dom";
import { FiHome, FiFileText, FiMessageCircle } from "react-icons/fi";
import { BsCircle } from "react-icons/bs";

const SideBarLink = [["Home", FiHome,""],["Blogs", FiFileText,"allblogs"],["Comments", FiMessageCircle,"allcomments"]];
const CategoriesLink = ["Business","Education & Career","Entertainment","Fashion & Beauty","Food & Drinks"];

function Sidebar() {
  return (
    <aside className="fixed mt-[10vh] py-8 px-4 w-[20vw] h-[90vh] bg-white border-r border-gray-200 z-20">
      {/* SIDEBAR LINKS */}

      <nav className="space-y-4">
        {SideBarLink.map((value, idx) => {
          const Icon = value[1];
          const path = value[2];
          return (
            <NavLink key={idx} to={path ? `/blogsphere/${path}`:"/blogsphere"} end={path === ""} className={({ isActive }) =>`flex items-center gap-3 ${isActive ? "text-blue-600" : "text-gray-700"}`}>
              <Icon className="text-lg" />
              <span>{value[0]}</span>
            </NavLink>
          );
        })}
      </nav>

      <h5 className="mt-10 mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">
        Categories
      </h5>

      {/* CATEGORIES LINKS */}

      <ul className="pl-2">
        {CategoriesLink.map((value, idx) => {
          return (
            <li key={idx} className="mt-4 text-base">
              <NavLink  to={`/blogsphere/category/${value}`} className={({ isActive }) => `flex items-center gap-3 ${isActive ? "text-indigo-600" : "text-gray-600"}`}>
                <BsCircle size={8} />
                <span>{value}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default Sidebar;
