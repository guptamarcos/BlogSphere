import { Hero, LogIn, Signup, Layout, AllBlogs, AllComments, Category} from "./components/Index.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/blogsphere" element={<Layout />}>
          <Route index element={<Hero />} />
          <Route path="allblogs" element={<AllBlogs />} />
          <Route path="allcomments" element={<AllComments />} />
          <Route path="category/:categoryName" element={<Category />} />
        </Route>
        <Route path="/blogsphere/signup" element={<Signup />} />
        <Route path="/blogsphere/logIn" element={<LogIn />} />
      </Routes>
    </>
  );
}

export default App;
