import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DeleteBlog } from "../api/blogApi.jsx";

const commonStyle =
  "h-full w-full flex justify-start items-center px-4 py-6 border-r border-amber-50";

function BlogTableRow({blog, getUserAllBlogs}) {
  const navigate = useNavigate();

  async function handleDelete(){
    try{
      await DeleteBlog(blog?._id)
    }catch(err){
      console.log(err);
    }
  }

  return (
    <section className="grid grid-cols-8 border-b border-gray-200">
      {/* AUTHOR */}
      <div className={`col-start-1 col-end-2 ${commonStyle}`}>
        {blog.owner.username}
      </div>

      {/* CATEGORY NAME */}
      <div className={`col-start-2 col-end-3 ${commonStyle}`}>
        {blog.category}
      </div>

      {/* TITLE */}
      <div className={`col-start-3 col-end-5 ${commonStyle}`}>
        {blog.title}
      </div>

      {/* SLUG */}
      <div className={`col-start-5 col-end-7 ${commonStyle}`}>
        {blog.title}
      </div>

      {/* DATE */}
      <div className={`col-start-7 col-end-8 ${commonStyle}`}>{new Date(blog.createdAt).toLocaleString("en-GB")}</div>

      {/* ACTIONS BUTTONS*/}
      <div className="flex items-center justify-evenly">
        <button onClick={()=> navigate(`/blogsphere/blog/${blog._id}`)} className="text-blue-500 p-2 border border-gray-300 rounded-md hover:text-blue-700 cursor-pointer">
          <FaEye size={16}/>
        </button>
        <button onClick={()=> navigate(`/blogsphere/blog/edit/${blog._id}`)} className="text-green-500 p-2 border border-gray-300 mx-[0.5rem] rounded-md hover:text-green-700 cursor-pointer">
          <FaEdit size={16} />
        </button>
        <button onClick={handleDelete} className="text-red-500 p-2 border border-gray-300 rounded-md hover:text-red-700 cursor-pointer">
          <FaTrash size={16} />
        </button>
      </div>
    </section>
  );
}

export default BlogTableRow;
