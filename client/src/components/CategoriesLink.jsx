import { NavLink } from "react-router-dom";
import { BsCircle } from "react-icons/bs";


function CategoriesLink({allCategory}){

  return (
      <ul className="pl-2">
      {allCategory?.map((value, idx) => {
        return (
          <li key={idx} className="mt-4 text-base">
            <NavLink  to={`/blogsphere/blog/category/${value}`} className={({ isActive }) => `flex items-center gap-3 ${isActive ? "text-indigo-600" : "text-gray-600"}`}>
              <BsCircle size={8} />
              <span className="capitalize">{value}</span>
            </NavLink>
          </li>
        );
      })}
    </ul>
  )
}

export default CategoriesLink;