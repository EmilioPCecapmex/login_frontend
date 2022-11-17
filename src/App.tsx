import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import CatApps from "./screens/Aplicaciones/CatApp";
import { E404 } from "./screens/Errors/E404";
import { Forgot } from "./screens/Forgot/Forgot";
import { Login } from "./screens/Login/Login";
import Solicitudes from "./screens/solicitudes/Solicitudes";
import Users from "./screens/Users/Users";
import "./Fonts.css";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Login />} />
          <Route path="recovery" element={<Forgot />} />
          <Route path="admin" element={<Users />} />
          <Route path="solicitudes" element={<Solicitudes />} />
          <Route path="*" element={<E404 />} />
          <Route path="app" element={<CatApps />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
