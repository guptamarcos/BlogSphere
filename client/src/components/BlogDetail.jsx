import { BlogComments, RelatedBlogs } from "./Index.jsx";
import { FaRegCalendarAlt, FaRegHeart, FaRegComment} from "react-icons/fa";

function BlogDetail() {
  return (
    <main className="py-[3rem] h-max border-b border-gray-200 flex justify-evenly">
      <div className="w-[50vw] p-[2rem] border-2 border-gray-200 rounded-md text-2xl font-semibold">
        {/* BLOG HEADING */}
        <h1 className="text-3xl">Top 10 Tv Shows Can't Miss This Year</h1>

        <div className="my-4 flex justify-between">
          {/* USERNAME, IMAGE, CALENDAR */}
          <div className="flex gap-4 items-center">
            <img src="/default_user.svg" className="h-[9vh] w-[4.5vw] border-1 border-gray-200 rounded-[50%] cursor-pointer"></img>
            <div>
              <h6 className="text-lg">Gauri Shankar</h6>
              <p className="text-base flex items-center gap-2">
                <FaRegCalendarAlt />
                <span className="text-gray-500 font-semibold">
                  26 January 2026
                </span>
              </p>
            </div>
          </div>

          {/* LIKES AND COMMENTS */}
          <div className="flex items-center justify-end gap-10 text-xl">
            <p>
              <FaRegHeart className="inline-block cursor-pointer" /> 1
            </p>
            <p>
              <FaRegComment className="inline-block" /> 1
            </p>
          </div>

        </div>

        {/* BLOG IMAGE */}
        <img src="https://i.pravatar.cc/150" className="h-[55vh] w-[40vw] rounded-md"></img>
        
        {/* BLOG CONTENT */}
        <p className="mt-4 text-lg text-left">
          In today’s digital world, blogs are more than just articles on a
          screen. They are a medium to share knowledge, ideas, and personal
          experiences. A good blog educates readers while keeping them engaged.
          Consistency plays a key role in building a loyal audience. Clear
          structure and simple language improve readability. Visual elements
          enhance the overall user experience. Quality content always matters
          more than quantity. Readers appreciate honesty and originality in
          writing. SEO helps blogs reach the right audience organically.
          Comments create interaction between writers and readers. Engagement
          builds trust and a sense of community. Regular updates keep the
          content fresh and relevant. Every blog reflects the writer’s
          perspective and passion. Over time, blogging improves communication
          skills. Ultimately, a blog is a powerful tool for digital expression.
        </p>

        <hr className="my-4 border-none h-[1.5px] bg-gray-200"/>
        
        {/*  BLOG COMMENT SECTION */}
        <BlogComments/>

      </div>
      
      {/* RELATED BLOGS */}
      <RelatedBlogs />

    </main>
  );
}

export default BlogDetail;
