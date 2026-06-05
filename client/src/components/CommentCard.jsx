import { FaRegCalendarAlt, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function CommentCard({ comment, getBlogInfo }) {
  const {user} = useContext(UserContext);
  async function handleDelete(){
    try{
      let res = await axios.delete(`http://localhost:4000/api/blogs/${comment.blogId}/comments/${comment._id}`, {withCredentials: true});;
      console.log(res);
      getBlogInfo();
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="mt-2 p-4 rounded-md border border-gray-200">
      {(user._id === comment?.owner?._id ) && (
        <div className="flex justify-between items-center">

          <div className="flex gap-4 items-center">
            <img src="/default_user.svg" className="h-[6] w-[3vw] border-1 border-gray-200 rounded-[50%] cursor-pointer"></img>
            <div>
              <h6 className="text-sm font-semibold">{comment.owner.username}</h6>
              <p className="text-xs flex items-center gap-2">
                <FaRegCalendarAlt />
                <span className="text-xs text-gray-500 font-semibold">
                  {new Date(comment?.createdAt).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </p>
            </div>
          </div>

          <button onClick={handleDelete} className="cursor-pointer text-red-600"><FaTrash size={14}/></button>
        </div>
      )}   


      {(user._id !== comment?.owner?._id ) && (
        <div className="flex gap-4 items-center">
          <img src="/default_user.svg" className="h-[6] w-[3vw] border-1 border-gray-200 rounded-[50%] cursor-pointer"></img>
          <div>
            <h6 className="text-sm font-semibold">{comment?.owner?.username}</h6>
            <p className="text-xs flex items-center gap-2">
              <FaRegCalendarAlt />
              <span className="text-xs text-gray-500 font-semibold">
                {new Date(comment?.createdAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </p>
          </div>
        </div>
      )}

      <p className="pl-4 mt-4 text-lg text-gray-600">{comment.content}</p>
    </div>
  );
}

export default CommentCard;
