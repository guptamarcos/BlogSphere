import { FaTrash } from "react-icons/fa";
import axios from "axios";
const commonStyle =
  "h-full w-full flex justify-start items-center px-4 py-3 border-r border-amber-50";

function CommentTableRow({commentValue,getUserBlogsComments}) {

  async function handleDelete(){
    try{
      await axios.delete(`http://localhost:4000/api/blogs/${commentValue.blogId._id}/comments/${commentValue._id}`, {withCredentials: true});
      getUserBlogsComments();
    }catch(err){
      console.log(err);
    }
  }

  return (
    <section className="grid grid-cols-8 border-b border-gray-200">
      {/*  BLOG */}
      <div className={`col-start-1 col-end-4 ${commonStyle}`}>
        {commentValue.blogId.title}
      </div>

      {/* COMMENT BY */}
      <div className={`col-start-4 col-end-5 ${commonStyle}`}>
       {commentValue.owner.username}
      </div>

      {/* DATE */}
      <div className={`col-start-5 col-end-6 ${commonStyle}`}>
        {new Date(commentValue.createdAt).toLocaleString("en-GB")}
      </div>

      {/* COMMENT */}
      <div className={`col-start-6 col-end-8 ${commonStyle}`}>
        {commentValue.content}
      </div>

      {/* ACTIONS BUTTONS*/}
      <div className="flex items-center justify-evenly">
        <button onClick={handleDelete} className="text-red-500 p-2 border border-gray-300 mx-[0.5rem] rounded-md hover:text-red-600 cursor-pointer">
          <FaTrash size={16} />
        </button>
      </div>

    </section>
  );
}

export default CommentTableRow;
