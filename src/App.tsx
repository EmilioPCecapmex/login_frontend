import { HashRouter, Route, Routes } from "react-router-dom";
import "./Fonts.css";
import "./Globals.css";
import CatApps from "./screens/Aplicaciones/CatApp";
import Catalogos from "./screens/Catalogos/Catalogos";
import { E404 } from "./screens/Errors/E404";
import { Forgot } from "./screens/Forgot/Forgot";
import { Login } from "./screens/Login/Login";
import { SolicitudUsuario } from "./screens/SolicitudDeUsuarios/SolicitudUsuario";
import Users from "./screens/Users/Users";
import { Documentos } from "./screens/ValidadorDE/Documentos";
import Solicitudes from "./screens/solicitudes/Solicitudes";
import Ayuda from "./screens/Ayuda/Ayuda";
import { ActividadUsuarios } from "./screens/ActividadUsuarios/ActividadUsuarios";


const App = () => {
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
        <Route path="/catalogos" element={<Catalogos />} />
        <Route path="/ayuda" element={<Ayuda/>} />
        <Route path="/actividad-usuarios" element={<ActividadUsuarios/>} />
        <Route
          path="/generarSolicitud"
          element={
            <SolicitudUsuario
              handleDialogClose={() => {}}
              modoModal={false}
              token={""}
              idUsuarioSolicitante={""}
              idUsuarioModificado={""}
              idApp={localStorage.getItem("IdApp")!}
            />
          }
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
