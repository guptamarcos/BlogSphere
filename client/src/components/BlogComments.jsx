import { FaRegComments } from "react-icons/fa";
import { CommentCard } from "./Index.jsx";

function BlogComments() {
  return (
    <>
      <h5 className="flex items-center gap-2">
        <FaRegComments className="text-violet-600 text-2xl" />
        Comments
      </h5>

      <form>
        <label htmlFor="comment" className="text-lg">Comment</label>
        <textarea id="comment" placeholder="Type Your Comment..."
          className="w-full h-[20vh] my-2 text-lg p-3 rounded-md border border-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-violet-400 ">
        </textarea>

        <button className="text-lg p-2 rounded-md cursor-pointer bg-violet-400 text-amber-100">
          Add Comment
        </button>

      </form>

      <p className="text-xl my-4">1 Comments</p>

      <CommentCard/>
    </>
  );
}

export default BlogComments;
