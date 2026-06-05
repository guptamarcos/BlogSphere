import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function RelatedBlogs({ id }) {
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getRelatedBlogs() {
      try {
        let res = await axios.get(
          `http://localhost:4000/api/blogs/${id}/relatedBlogs`,
          { withCredentials: true },
        );
        setRelatedBlogs(res.data.relatedBlogs);
      } catch (err) {
        console.log(err);
      }
    }
    getRelatedBlogs();
  }, []);

  return (
    <div className="w-[20vw] h-max p-[1rem] border-2 border-gray-200 rounded-md">
      {/* RELATED BLOGS HEADING */}
      <h2 className="text-2xl font-semibold">Related Blogs</h2>
      {relatedBlogs?.map((blog) => (
        
        <div key={blog._id} className="mt-4 flex items-center gap-2 cursor-pointer" onClick={()=> navigate(`/blogsphere/blog/${blog._id}`)}>
          <img
            src="https://i.pravatar.cc/150"
            className="h-[10vh] w-[5vw] rounded-md"
          ></img>
          <h4 className="text-lg font-semibold">
            {blog.title}
          </h4>
        </div>
      ))}
    </div>
  );
}

export default RelatedBlogs;
