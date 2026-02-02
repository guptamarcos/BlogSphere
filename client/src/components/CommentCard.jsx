import { FaRegCalendarAlt} from "react-icons/fa";

function CommentCard() {
  return (
    <div className="mt-2 p-4 rounded-md border border-gray-200">
      <div className="flex gap-4 items-center">
        <img src="/default_user.svg" className="h-[8] w-[4vw] border-1 border-gray-200 rounded-[50%] cursor-pointer"></img>
        <div>
          <h6 className="text-base font-semibold">Gauri Shankar</h6>
          <p className="text-base flex items-center gap-2">
            <FaRegCalendarAlt />
            <span className="text-sm text-gray-500 font-semibold">
              26 January 2026
            </span>
          </p>
        </div>
      </div>
      <p className="pl-4 mt-2 text-lg text-gray-600">Good Post!!</p>
    </div>
  );
}

export default CommentCard;
