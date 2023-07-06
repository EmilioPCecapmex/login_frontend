import { Routes, Route, BrowserRouter as Router, HashRouter } from "react-router-dom";
import "./Globals.css"
import CatApps from "./screens/Aplicaciones/CatApp";
import { E404 } from "./screens/Errors/E404";
import { Forgot } from "./screens/Forgot/Forgot";
import { Login } from "./screens/Login/Login";
import Solicitudes from "./screens/solicitudes/Solicitudes";
import Users from "./screens/Users/Users";
import "./Fonts.css";
import { Documentos } from "./screens/ValidadorDE/Documentos";
import { SolicitudUsuarios } from "./screens/SolicitudDeUsuarios/SolicitudUsuarios";
import Catalogos from "./screens/Catalogos/Catalogos";

const App = () => {
//   const handleFilterChange = () => {
 
// };

  return (
     <HashRouter basename={"/"}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<E404 />} />
          <Route path="/recovery" element={<Forgot />} />
          <Route path="/admin" element={<Users />} />
          <Route path="/solicitudes" element={<Solicitudes />} />
          <Route path="/app" element={<CatApps />} />
          <Route path="/validador" element={<Documentos />} />
          <Route path="/catalogos" element={<Catalogos/>} />
          <Route path="/generarSolicitud" element={<SolicitudUsuarios handleDialogClose={()=>{}} modoModal={false} token={""} idUsuarioSolicitante={""} idApp={""}/>} />
        </Routes>
      </HashRouter>
  );
};

export default App;
