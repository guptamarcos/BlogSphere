import { useParams } from "react-router-dom";
import { MdGridView } from "react-icons/md";
import { HomeCard } from "./Index.jsx";

function Category(){
    const { categoryName } = useParams();
    return (
        <main className="min-h-[90vh] py-[2rem] px-[4rem] ">
            <h1 className="text-3xl font-semibold text-violet-600 flex gap-2 items-center">
                <MdGridView/> 
                {categoryName}
            </h1>
            <hr className="text-gray-300 my-4"/>
            <div className="grid grid-cols-3 gap-8">
               <HomeCard/>
               <HomeCard/>
            </div>
        </main>
    )
}

export default Category;