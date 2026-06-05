import { FaRegComments } from "react-icons/fa";
import { CommentCard } from "./Index.jsx";
import axios from "axios";
import { useEffect, useState} from "react";

function BlogComments({blogId, allComments, getBlogInfo}) {
  const [commentContent, setCommentContent] = useState("");
  
  async function handleSubmit(evt){
    evt.preventDefault();

    try{
      if (!commentContent.trim()) return;
      let res = await axios.post(`http://localhost:4000/api/blogs/${blogId}/comments`, {commentContent}, {withCredentials: true});   
      setCommentContent(""); 
      getBlogInfo();
    }catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <h5 className="flex items-center gap-2">
        <FaRegComments className="text-violet-600 text-2xl" />
        Comments
      </h5>

      <form onSubmit={handleSubmit}>
        <label htmlFor="comment" className="text-lg">Comment</label>
        <textarea id="comment" placeholder="Type Your Comment..." name="comment" required 
          value={commentContent} onChange={(evt)=> setCommentContent(evt.target.value)}
          className="w-full h-[20vh] my-2 text-lg p-3 rounded-md border border-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-violet-400 ">
        </textarea>

        <button className="text-lg p-2 rounded-md cursor-pointer bg-violet-400 text-amber-100">
          Add Comment
        </button>

      </form>

      <p className="text-xl my-4">{allComments?.length} Comments</p>
       
      {allComments?.map((comment)=>{
        return <CommentCard comment={comment} key={comment._id} getBlogInfo={getBlogInfo}/>
      })}
      
    </>
  );
}

export default BlogComments;
