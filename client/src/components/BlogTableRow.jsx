import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const commonStyle =
  "h-full w-full flex justify-start items-center px-2 py-6 border-r border-amber-50";

function BlogTableRow() {
  const navigate = useNavigate();

  return (
    <section className="grid grid-cols-8 border-b border-gray-200">
      {/* AUTHOR */}
      <div className={`col-start-1 col-end-2 ${commonStyle}`}>
        Gauri Shankar
      </div>

      {/* CATEGORY NAME */}
      <div className={`col-start-2 col-end-3 ${commonStyle}`}>
        Entertainment
      </div>

      {/* TITLE */}
      <div className={`col-start-3 col-end-5 ${commonStyle}`}>
        Top 10 TV Shows Can't Miss This Year
      </div>

      {/* SLUG */}
      <div className={`col-start-5 col-end-7 ${commonStyle}`}>
        top-10-tv-shows-can't-miss-this-year-741930
      </div>

      {/* DATE */}
      <div className={`col-start-7 col-end-8 ${commonStyle}`}>20-12-2024</div>

      {/* ACTIONS BUTTONS*/}
      <div className="flex items-center justify-evenly">
        <button onClick={()=> navigate("/blogsphere/blogDetail")} className="text-blue-500 p-2 border border-gray-300 rounded-md hover:text-blue-700 cursor-pointer">
          <FaEye size={16}/>
        </button>
        <button onClick={()=> navigate("/blogsphere/editBlog")} className="text-green-500 p-2 border border-gray-300 mx-[0.5rem] rounded-md hover:text-green-700 cursor-pointer">
          <FaEdit size={16} />
        </button>
        <button className="text-red-500 p-2 border border-gray-300 rounded-md hover:text-red-700 cursor-pointer">
          <FaTrash size={16} />
        </button>
      </div>
    </section>
  );
}

export default BlogTableRow;
