import { FaTrash } from "react-icons/fa";

const commonStyle =
  "h-full w-full flex justify-start items-center px-4 py-3 border-r border-amber-50";

function CommentTableRow() {
  return (
    <section className="grid grid-cols-8 border-b border-gray-200">
      {/*  BLOG */}
      <div className={`col-start-1 col-end-4 ${commonStyle}`}>
        Top 10 TV Shows Can't Miss This Year
      </div>

      {/* COMMENT BY */}
      <div className={`col-start-4 col-end-5 ${commonStyle}`}>
        Demo 
      </div>

      {/* DATE */}
      <div className={`col-start-5 col-end-6 ${commonStyle}`}>
        12-20-2024
      </div>

      {/* COMMENT */}
      <div className={`col-start-6 col-end-8 ${commonStyle}`}>
        top-10-tv-shows-can't-miss-this-year-741930
      </div>

      {/* ACTIONS BUTTONS*/}
      <div className="flex items-center justify-evenly">
        <button className="text-red-500 p-2 border border-gray-300 mx-[0.5rem] rounded-md hover:text-red-600 cursor-pointer">
          <FaTrash size={16} />
        </button>
      </div>

    </section>
  );
}

export default CommentTableRow;
