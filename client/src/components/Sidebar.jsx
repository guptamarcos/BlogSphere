import { FiHome, FiFileText, FiMessageCircle } from "react-icons/fi";
import { SidebarLink,CategoriesLink } from "./Index.jsx";
import { UserContext } from "../context/UserContext.jsx";
import { useContext } from "react";

function Sidebar() {
  
  // GETTING USER 
  const { user } = useContext(UserContext);
  return (
    <aside className="fixed mt-[10vh] py-8 px-4 w-[20vw] h-[90vh] bg-white border-r border-gray-200 z-10">
      {/* SIDEBAR LINKS */}
   
      <nav className="space-y-4">
        <SidebarLink value="Home" Icon={FiHome} path="/blogsphere"/>
        {user && <SidebarLink value="Blogs" Icon={FiFileText} path="/blogsphere/allblogs"/>}
        {user && <SidebarLink value="Comments" Icon={FiMessageCircle} path="/blogsphere/allcomments"/>}
      </nav>
      
      {/* CATEGORIES HEADING */}
      <h5 className="mt-10 mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">
        Categories
      </h5>

      {/* CATEGORIES LINKS */}
       
      <CategoriesLink/>
    </aside>
  );
}

export default Sidebar;
