import { useParams } from "react-router-dom";

function Category(){
    const { categoryName } = useParams();
    return (
        <div className="min-h-[90vh] bg-amber-400">This is {categoryName} route</div>
    )
}

export default Category;