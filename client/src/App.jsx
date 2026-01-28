import {
  Hero,
  LogIn,
  Signup,
  Layout,
  AllBlogs,
  AllComments,
  Category,
} from "./components/Index.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext.jsx";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          {/* REDIRECT TO THE "localhost:5173/blogsphere" INSTEAD OF "localhost:5173"  */}
          <Route path="/" element={<Navigate to="/blogsphere" replace />} />

          <Route path="/blogsphere" element={<Layout />}>
            <Route index element={<Hero />} />
            <Route path="allblogs" element={<AllBlogs />} />
            <Route path="allcomments" element={<AllComments />} />
            <Route path="category/:categoryName" element={<Category />} />
          </Route>
          <Route path="/blogsphere/signup" element={<Signup />} />
          <Route path="/blogsphere/logIn" element={<LogIn />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
