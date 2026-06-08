import { BlogComments, RelatedBlogs } from "./Index.jsx";
import { FaRegCalendarAlt, FaRegHeart,FaHeart, FaRegComment} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetBlogInfo, UpdateBlogLikes } from "../api/blogApi.jsx";


function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState({}); 
  const [isLiked, setIsLiked] = useState(true);
  const [blogLikes, setBlogLikes] = useState(0);

  async function getBlogInfo () {
    try{
      let res = await GetBlogInfo(id);
      setBlog(res?.data);
      setBlogLikes(res?.data?.likes);
    }catch(err){
      console.log(err);
    }
  }

  async function handleLikes(){
    try{
      let res = await UpdateBlogLikes(id, { isLiked });
      setBlogLikes(res.likes);
      setIsLiked((prev)=> !prev);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getBlogInfo();
  },[id]);

  return (
    <main className="py-[3rem] h-max border-b border-gray-200 flex justify-evenly">
      <div className="w-[50vw] p-[2rem] border-2 border-gray-200 rounded-md text-2xl font-semibold">
        {/* BLOG HEADING */}
        <h1 className="text-3xl">{blog?.title}</h1>

        <div className="my-4 flex justify-between">
          {/* USERNAME, IMAGE, CALENDAR */}
          <div className="flex gap-4 items-center">
            <img src="/default_user.svg" className="h-[9vh] w-[4.5vw] border-1 border-gray-200 rounded-[50%] cursor-pointer"></img>
            <div>
              <h6 className="text-lg">{blog?.owner?.username}</h6>
              <p className="text-base flex items-center gap-2">
                <FaRegCalendarAlt />
                <span className="text-gray-500 font-semibold">
                  {new Date(blog.createdAt).toLocaleDateString("en-GB",{
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </p>
            </div>
          </div>

          {/* LIKES AND COMMENTS */}
          <div className="flex items-center justify-end gap-10 text-xl">
            {isLiked ? (
              <p><FaRegHeart onClick={handleLikes} className="inline-block cursor-pointer"/> {blogLikes}</p>
            ):(
              <p><FaHeart onClick={handleLikes} className="inline-block cursor-pointer text-red-500"/> {blogLikes}</p>
            )}
            <p>
              <FaRegComment className="inline-block" /> {blog.allComments?.length}
            </p>
          </div>

        </div>

        {/* BLOG IMAGE */}
        <img src="https://i.pravatar.cc/150" className="h-[55vh] w-[40vw] rounded-md"></img>
        
        {/* BLOG CONTENT */}
        <p className="mt-4 text-lg text-left">
          {blog?.content}
        </p>

        <hr className="my-4 border-none h-[1.5px] bg-gray-200"/>
        
        {/*  BLOG COMMENT SECTION */}
        <BlogComments blogId={blog._id} allComments={blog.allComments} getBlogInfo={getBlogInfo}/>

      </div>
      
      {/* RELATED BLOGS */}
      <RelatedBlogs id={id}/>

    </main>
  );
}

export default BlogDetail;
