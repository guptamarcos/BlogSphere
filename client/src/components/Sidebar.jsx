import { FiHome, FiFileText, FiMessageCircle } from "react-icons/fi";
import { SidebarLink,CategoriesLink } from "./Index.jsx";
import { UserContext } from "../context/UserContext.jsx";
import { useContext,useEffect, useState } from "react";
import axios from "axios";

function Sidebar() {
  
  // GETTING USER 
  const { user } = useContext(UserContext);

  const [allCategory, setAllCategory] = useState([]);
  async function getAllCategory(){
    try{
      let res = await axios.get("http://localhost:4000/api/blogs/getAllCategory", {withCredentials: true});
      setAllCategory(res.data.data);
    }catch(err){
      console.log(err);
    }
  }
  
  useEffect(()=>{
    getAllCategory();
  },[]);

  return (
    <aside className="fixed mt-[10vh] py-8 px-4 w-[20vw] h-[90vh] bg-white border-r border-gray-200 z-10">
      {/* SIDEBAR LINKS */}
   
      <nav className="space-y-4">
        <SidebarLink value="Home" Icon={FiHome} path="/blogsphere"/>
        {user && <SidebarLink value="Blogs" Icon={FiFileText} path="/blogsphere/user/blogs"/>}
        {user && <SidebarLink value="Comments" Icon={FiMessageCircle} path={`/blogsphere/user/${user._id}/allBlogs/allComments`}/>}
      </nav>
      
      {/* CATEGORIES HEADING */}
      <h5 className="mt-10 mb-4 text-lg font-semibold text-gray-500 uppercase tracking-wide">
        Categories
      </h5>

      {/* CATEGORIES LINKS */}
       
      <CategoriesLink allCategory={allCategory}/>
    </aside>
  );
}

export default Sidebar;
