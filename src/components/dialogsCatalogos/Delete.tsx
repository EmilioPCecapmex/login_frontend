import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
    EliminarCatalogo,
  getCatalogo,
  modificarCatalogo,
} from "../../services/catalogosService";
import {
  IDepartamento,
  IDependencia,
  IPerfil,
  IRol,
  ISecretaria,
  ITpoDependencia,
  IUResponsable,
  IUsuarios,
} from "../../screens/SolicitudDeUsuarios/ICatalogos";
import { IModify } from "./Edit";

export const Delete = ({
  open,
  setOpen,
  Id,
  catalogo,
  elemento,
}: {
  open: boolean;
  setOpen: Function;
  Id: string;
  catalogo: string;
  elemento: IModify;
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
  const [departamentos, setDepartamentos] = useState<Array<IDepartamento>>([]);
  const [roles, setRoles] = useState<Array<IRol>>([]);
  const [dependencias, setDependencias] = useState<Array<IDependencia>>([]);
  const [tpoDependencias, setTpoDependencias] = useState<
    Array<ITpoDependencia>
  >([]);
  const [perfiles, setPerfiles] = useState<Array<IPerfil>>([]);
  const [secretarias, setSecretarias] = useState<Array<ISecretaria>>([]);
  const [uResponsables, setUResponsables] = useState<Array<IUResponsable>>([]);

  const [dependenciasFiltered, setDependenciasFiltered] = useState<
    Array<IDependencia>
  >([]);
  const [secretariasFiltered, setSecretariasFiltered] = useState<
    Array<ISecretaria>
  >([]);
  const [usuarios, setUsuarios] = useState<Array<IUsuarios>>([]);

//   useEffect(() => {
//     setDependenciasFiltered(dependencias);
//   }, [dependencias]);
//   useEffect(() => {
//     setSecretariasFiltered(secretarias);
//   }, [secretarias]);

  //elementos seleccionados
  const [departamento, setDepartamento] = useState<IDepartamento>({
    Id: "",
    Descripcion: "",
    NombreCorto: "",
    IdResponsable: "",
    Responsable: "",
    UltimaActualizacion: "",
    FechaCreacion: "",
    ModificadoPor: "",
    Modificador: "",
    CreadoPor: "",
    Creador: "",
    Deleted: "",
  });
  const [dependencia, setDependencia] = useState<IDependencia>({
    Id: "",
    Nombre: "",
    Direccion: "",
    Telefono: "",
    IdTipoDependencia: "",
    TipoDependencia: "",
    IdTitular: "",
    Titular: "",
    IdPerteneceA: "",
    PerteneceA: "",
    Deleted: "",
  });

  const [rol, setRol] = useState<IRol>({
    ControlInterno: "",
    Deleted: "",
    Descripcion: "",
    Id: "",
    Nombre: "",
  });
  const [perfil, setPerfil] = useState<IPerfil>({
    Deleted: "",
    Descripcion: "",
    Id: "",
    Referencia: "",
  });
  const [uResponsable, setUResponsable] = useState<IUResponsable>({
    Clave: "",
    Deleted: "",
    Descripcion: "",
    Id: "",
  });
  const [secretaria, setSecretaria] = useState<ISecretaria>({
    Deleted: "",
    Direccion: "",
    Id: "",
    IdTitular: "",
    Nombre: "",
    Nombre_corto: "",
    PerteneceA: "",
    Titular: "",
  });

  const [titular, setTitular] = useState<IUsuarios>({
    Id: "",
    Nombre: "",
  });

//   useEffect(() => {
//     if (dependencia.Id != "") {
//       let aux = secretarias.find((sec) => sec.Id === dependencia.IdPerteneceA);
//       console.log("aux", aux);
//       console.log("dependencia", dependencia);
//       console.log("secretarias", secretarias);
//       if (aux !== undefined) {
//         setSecretaria(aux);
//       }
//     } else {
//       setSecretariasFiltered(secretarias);
//     }
//   }, [dependencia.Id]);

//   useEffect(() => {
//     if (secretaria.Id !== "") {
//       setDependenciasFiltered(
//         dependencias.filter((obj) => obj.IdPerteneceA === secretaria.Id)
//       );
//     } else {
//       setSecretariasFiltered(secretarias);
//     }
//   }, [secretaria]);

//   useEffect(() => {
//     console.log(
//       "condicion",
//       secretariasFiltered.find((obj) => obj === secretaria)
//     );

//     if (dependenciasFiltered.find((obj) => obj === dependencia) === undefined)
//       setDependencia({
//         Id: "",
//         Nombre: "",
//         Direccion: "",
//         Telefono: "",
//         IdTipoDependencia: "",
//         TipoDependencia: "",
//         IdTitular: "",
//         Titular: "",
//         IdPerteneceA: "",
//         PerteneceA: "",
//         Deleted: "",
//       });
//   }, [dependenciasFiltered]);

  useEffect(() => {
    getCatalogo("departamentos", setDepartamentos);
    getCatalogo("roles", setRoles);
    getCatalogo("dependencias", setDependencias);
    getCatalogo("perfiles", setPerfiles);
    getCatalogo("secretarias", setSecretarias);
    getCatalogo("uresponsables", setUResponsables);
    getCatalogo("usuarios-asignables", setUsuarios);
    getCatalogo("tipodependencias", setTpoDependencias);
  }, []);

//   useEffect(() => {
//     let aux = secretarias.find((item) => item.Id === cargarElemento.PerteneceA);
//     if (aux !== undefined) {
//       setSecretaria(aux);
//     }
//   }, [cargarElemento.PerteneceA, secretarias]);

//   useEffect(() => {
//     let aux = usuarios.find((item) => item.Id === cargarElemento.IdResponsable);
//     if (aux !== undefined) {
//       setTitular(aux);
//     } else {
//       aux = usuarios.find((item) => item.Id === cargarElemento.IdTitular);
//       if (aux !== undefined) {
//         setTitular(aux);
//       }
//     }
//   }, [cargarElemento.IdResponsable, cargarElemento.IdTitular, usuarios]);

  //------------------------------Rutas---------------------------
  const [ruta, setRuta] = useState("");

  useEffect(() => {
    setCargarElemento(elemento);
    switch (catalogo) {
      case "1":
        setRuta("/delete-secretaria");
        break;
      case "2":
        setRuta("/delete-uresponsable");
        break;
      case "3":
        setRuta("/delete-departamento");
        break;
      case "4":
        setRuta("/delete-rol");
        break;
      case "5":
        setRuta("/delete-perfil");
        break;
      case "6":
        setRuta("/delete-dependencia");
        break;
      case "7":
        setRuta("/delete-tipodependencia");
        break;

      default:
        setRuta("/");
        break;
    }
  }, [catalogo, open]);

//   useEffect(() => {
//     setCargarElemento(elementoVacio);
//   }, [catalogo]);

//   useEffect(() => {
//     setCargarElemento({ ...cargarElemento });
//   }, [secretaria]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogTitle>Eliminar elemento:</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography>{ruta}</Typography>
        <Typography>Deseas eliminar este elemento?</Typography>
        <Typography>
          {`${
            elemento.NombreCorto || elemento.Clave || elemento.Referencia
          } - `}
          {elemento.Nombre || elemento.Descripcion}
        </Typography>
        {["1", "4", "6"].includes(catalogo) && (
          <TextField
            sx={{ mt: 3, width: "100%" }}
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
        )}

        {/* {["1","6"].includes(catalogo) && (<Grid  sx={{ mt: 3, width: "100%" }}>
                        <Typography variant="body2">Tipo de dependencia:</Typography>
                        <Autocomplete
                            options={tpoDependencias}
                            getOptionLabel={(tpodependencia) => tpodependencia.Nombre || 'Seleccione secretaria'}
                            value={secretaria}
                            onChange={(event, newValue) => {
                                if (newValue != null) { setSecretaria(newValue);  
                            //         setErrores({...errores, secretaria:{
                            //         valid:false,
                            //         text:"Ingresa secretaria valida"
                            // }})
                          }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    key={params.id}
                                    {...params}
                                    variant="outlined"
                                    // error={errores.secretaria.valid}
                                />
                            )}
                        />
                    </Grid>
        )} */}
      </DialogContent>
      <DialogActions>
        <Button className="cancelar" onClick={() => setOpen(false)}>
          Cancelar
        </Button>
        <Button className="aceptar" 
        onClick={()=>{
            EliminarCatalogo(ruta,Id)
        }}>
            Eliminar</Button>
        {/* console.log(nuevoElemento*/}
      </DialogActions>
    </Dialog>
  );
};
