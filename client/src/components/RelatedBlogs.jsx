function RelatedBlogs() {
  return (
    <div className="w-[20vw] h-max p-[1rem] border-2 border-gray-200 rounded-md">
      {/* RELATED BLOGS HEADING */}
      <h2 className="text-2xl font-semibold">Related Blogs</h2>

      <div className="mt-4 flex items-center gap-2 cursor-pointer">
        <img
          src="https://i.pravatar.cc/150"
          className="h-[10vh] w-[5vw] rounded-md"
        ></img>
        <h4 className="text-lg font-semibold">
          Top 10 Tv shows You can't miss this year
        </h4>
      </div>

      <div className="mt-4 flex items-center gap-2 cursor-pointer">
        <img
          src="https://i.pravatar.cc/150"
          className="h-[10vh] w-[5vw] rounded-md"
        ></img>
        <h4 className="text-lg font-semibold">
          Top 10 Tv shows You can't miss this year
        </h4>
      </div>

    </div>
  );
}

export default RelatedBlogs;