import { Home,LogIn, Signup } from "./components/Index.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/blogsphere/signup" element={<Signup/>} />
        <Route path="/blogsphere/logIn" element={<LogIn/>} />
      </Routes>
    </>
  )
}

export default App;
