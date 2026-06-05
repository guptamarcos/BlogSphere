import { NavLink } from "react-router-dom";

function SidebarLink({value,Icon,path}) {
  return (
    <NavLink to={path} end={path==="/blogsphere"} className={({ isActive }) =>`flex items-center gap-3 text-lg ${isActive ? "text-blue-600" : "text-gray-700"}`}>
      <Icon className="text-lg" />
      <span className="capitalize">{value}</span>
    </NavLink>
  );
}

export default SidebarLink;
