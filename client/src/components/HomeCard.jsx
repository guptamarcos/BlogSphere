import { FaRegCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function HomeCard(){
   const navigate = useNavigate();
    return (
       <div onClick={()=> navigate("/blogsphere/blogDetail")} className="rounded-xl h-[55vh] border-2 border-[#E5E7EB] hover:border-2 hover:border-violet-300 hover:scale-101 duration-300 ease-in-out cursor-pointer p-4">
         <header className="flex items-center gap-6">
            <img src="https://i.pravatar.cc/150" className="h-[8vh] w-[4vw] border rounded-[50%]"></img>
            <h4 className="text-lg font-semibold text-gray-600">
               <i>Gauri Shankar</i>
            </h4>
         </header>
         <img src="./placeholderImage.png" className="h-[25vh] w-full border border-gray-200 rounded-xl my-4"></img>
         <p className="flex items-center gap-2">
            <FaRegCalendarAlt/> 
            <span className="text-gray-500 font-semibold">26 January 2026</span>
         </p>
         <h2 className="font-semibold text-xl mt-2">Top 10 Tv's Shows You Can't Miss This Year</h2>
       </div>
    )
}

export default HomeCard;