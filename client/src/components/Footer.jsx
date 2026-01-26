import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="h-[20vh] bg-gray-50 flex flex-col justify-center items-center gap-y-[0.5rem] border-b-2 border-b-gray-200">
      <h5 className="text-lg text-gray-900">© 2026 BlogSphere</h5>

      <ul className="flex">
        <li className="text-lg text-gray-600 hover:text-gray-900 transition">
          <Link to="/">About&nbsp;</Link>
        </li>
        <li className="text-lg text-gray-500 hover:text-gray-700 transition">
          <Link to="/">| Privacy |</Link>
        </li>
        <li className="text-lg text-gray-600 hover:text-blue-600 transition">
          <Link to="https://github.com/guptamarcos/BlogSphere">&nbsp; GitHub</Link>
        </li>
      </ul>

      <p className="text-gray-500 text-lg">
        Write Freely, Share Widely
      </p>
    </footer>
  );
}

export default Footer;
