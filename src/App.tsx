import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { E404 } from "./screens/Errors/E404";
import { Forgot } from "./screens/Forgot/Forgot";
import { Login } from "./screens/Login/Login";
import Users from "./screens/Users/Users";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Login />} />
          <Route path="recovery" element={<Forgot />} />
          <Route path="admin" element={<Users />} />
          <Route path="*" element={<E404 />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
