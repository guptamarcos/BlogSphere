import { NavLink } from "react-router-dom";
import { BsCircle } from "react-icons/bs";

const CategoriesList = ["Business","Education & Career","Entertainment","Fashion & Beauty","Food & Drinks"];

function CategoriesLink(){
    return (
       <ul className="pl-2">
        {CategoriesList.map((value, idx) => {
          return (
            <li key={idx} className="mt-4 text-base">
              <NavLink  to={`/blogsphere/category/${value}`} className={({ isActive }) => `flex items-center gap-3 ${isActive ? "text-indigo-600" : "text-gray-600"}`}>
                <BsCircle size={8} />
                <span>{value}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    )
}

export default CategoriesLink;