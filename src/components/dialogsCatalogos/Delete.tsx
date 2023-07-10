import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
    EliminarCatalogo
} from "../../services/catalogosService";
import { IModify } from "./Edit";

export const Delete = ({
  open,
  setOpen,
  Id,
  catalogo,
  elemento,
  reloadData,
}: {
  open: boolean;
  setOpen: Function;
  Id: string;
  catalogo: string;
  elemento: IModify;
  reloadData: Function
}) => {
  //------------------------Cambiar nombres-------------------------------------
  const elementoVacio = {
    IdSecretaria: "", //elemento.IdSecretaria,
    Nombre: "", //elemento.Nombre,
    NombreCorto: "", //elemento.NombreCorto,
    IdTitular: "", //elemento.IdTitular,
    PerteneceA: "", //elemento.PerteneceA,
    Direccion: "", //elemento.Direccion,
    IdModificador: "", //elemento.IdModificador,
    IdUResponsable: "", //elemento.IdUResponsable,
    Clave: "", //elemento.Clave,
    Descripcion: "", //elemento.Descripcion,
    IdDepartamento: "", //elemento.IdDepartamento,
    IdResponsable: "", //elemento.IdResponsable,
    IdRol: "", //elemento.IdRol,
    ControlInterno: "", //elemento.ControlInterno,
    IdDependencia: "", //elemento.IdDependencia,
    Telefono: "", //elemento.Telefono,
    IdTipoDependencia: "", //elemento.IdTipoDependencia,
    IdPerfil: "", //elemento.IdPerfil,
    Referencia: "", //elemento.ref,
  };

  const [cargarElemento, setCargarElemento] = useState<IModify>({
    IdSecretaria: "", //elemento.IdSecretaria,
    Nombre: "", //elemento.Nombre,
    NombreCorto: "", //elemento.NombreCorto,
    IdTitular: "", //elemento.IdTitular,
    PerteneceA: "", //elemento.PerteneceA,
    Direccion: "", //elemento.Direccion,
    IdModificador: localStorage.getItem("IdUsuario") || "", //elemento.IdModificador,
    IdUResponsable: "", //elemento.IdUResponsable,
    Clave: "", //elemento.Clave,
    Descripcion: "", //elemento.Descripcion,
    IdDepartamento: "", //elemento.IdDepartamento,
    IdResponsable: "", //elemento.IdResponsable,
    IdRol: "", //elemento.IdRol,
    ControlInterno: "", //elemento.ControlInterno,
    IdDependencia: "", //elemento.IdDependencia,
    Telefono: "", //elemento.Telefono,
    IdTipoDependencia: "", //elemento.IdTipoDependencia,
    IdPerfil: "", //elemento.IdPerfil,
    Referencia: "", //elemento.ref,
  });

  //------------------------CATALOGOS-------------------------------------------

  const [ruta, setRuta] = useState("");

  useEffect(() => {
    setCargarElemento(elemento);
    switch (catalogo) {
      case "1":
        setRuta("delete-secretaria");
        break;
      case "2":
        setRuta("delete-uresponsable");
        break;
      case "3":
        setRuta("delete-departamento");
        break;
      case "4":
        setRuta("delete-rol");
        break;
      case "5":
        setRuta("delete-perfil");
        break;
      case "6":
        setRuta("delete-dependencia");
        break;
      case "7":
        setRuta("delete-tipodependencia");
        break;

      default:
        setRuta("/");
        break;
    }
  }, [catalogo, open]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogTitle sx={{display:"flex",justifyContent:"center"}}> ¿Deseas eliminar este elemento?</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        
       
       
        {/* {["1", "4", "6"].includes(catalogo) && (
          <TextField
            sx={{ mt: 3, width: "100%" }}
            variant="standard"
            title="Nombre"
            label="Nombre"
            placeholder="Nombre"
            value={cargarElemento.Nombre || ""}
          />
        )}
        {["2"].includes(catalogo) && (
          <TextField
            multiline
            sx={{ mt: 3, width: "100%" }}
            variant="standard"
            title="Clave"
            label="Clave"
            placeholder="Clave"
            value={cargarElemento.Clave || ""}
          />
        )}
        {["2", "3", "4", "5"].includes(catalogo) && (
          <TextField
            multiline
            sx={{ mt: 3, width: "100%" }}
            variant="standard"
            title="Descripcion"
            label="Descripcion"
            placeholder="Descripcion"
            value={cargarElemento.Descripcion || ""}
            onChange={(v) => {
              setCargarElemento({
                ...cargarElemento,
                IdModificador: localStorage.getItem("IdUsuario") || "",
                Descripcion: v.target.value
                  .replaceAll("'", "")
                  .replaceAll('"', ""),
              });
            }}
          />
        )}
        {["1", "3"].includes(catalogo) && (
          <TextField
            multiline
            sx={{ mt: 3, width: "100%" }}
            variant="standard"
            title="Abreviatura"
            label="Abreviatura"
            placeholder="Abreviatura"
            value={cargarElemento.NombreCorto || ""}
            onChange={(v) => {
              setCargarElemento({
                ...cargarElemento,
                IdModificador: localStorage.getItem("IdUsuario") || "",
                NombreCorto: v.target.value
                  .replaceAll("'", "")
                  .replaceAll('"', ""),
              });
            }}
          />
        )} */}

       
      </DialogContent>
      <DialogActions>
        <Button className="cancelar" onClick={() => setOpen(false)}>
          Cancelar
        </Button>
        <Button className="aceptar" 
        onClick={()=>{
            EliminarCatalogo(ruta,Id,setOpen,reloadData)
        }}>
            Aceptar</Button>
      </DialogActions>
    </Dialog>
  );
};
