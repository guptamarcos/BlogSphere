import { BlogTableRow } from "./Index.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";
import { GetUserBlogs } from "../api/userApi.jsx";

function AllBlogsTable() {
  const [userBlogs, setUserBlogs] = useState([]);
  const navigate = useNavigate();

  async function getUserAllBlogs(){
    try{
      const res = await GetUserBlogs();
      setUserBlogs(res?.data);      
    }catch(err){
      console.log(err);
    }
   }
  
  useEffect(()=>{
    getUserAllBlogs();
  },[]);
  
  
  return (
    <main className="min-h-[70vh] w-full border-b py-[3rem] px-[3rem] border-gray-200">
      <div className="border border-gray-200 p-[1.5rem] rounded-lg">
        <button type="button" onClick={()=> navigate("/blogsphere/newBlog")} className="text-amber-200 bg-violet-500 py-[0.4rem] px-[0.6rem] rounded-md cursor-pointer">
          Add Blog
        </button>
        <div className="border border-gray-200 mt-[1.5rem] rounded-md">

          {/* HEADER  */}
          <header className="grid grid-cols-8 border-b border-gray-200 bg-gray-100 text-lg text-gray-500 font-semibold">
            <div className="p-4 col-start-1 col-end-2">Author</div>
            <div className="p-4 col-start-2 col-end-3">Category Name</div>
            <div className="p-4 col-start-3 col-end-5">Title</div>
            <div className="p-4 col-start-5 col-end-7">Slug</div>
            <div className="p-4 col-start-7 col-end-8">Dated</div>
            <div className="p-4">Action</div>
          </header>
          
          {/* ALL BLOGS ROWS */}
          {userBlogs.map((blog)=>{
            return <BlogTableRow blog={blog} key={blog._id} getUserBlogs={getUserAllBlogs}/>
          })}
          
        </div>
      </div>
    </main>
  );
}

export default AllBlogsTable;
