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
import { createCatalogo, getCatalogo, modificarCatalogo } from "../../services/catalogosService";
import { IDepartamento, IDependencia, IPerfil, IRol, ISecretaria, ITpoDependencia, IUResponsable, IUsuarios } from "../../screens/SolicitudDeUsuarios/ICatalogos";

export interface IModify {
  IdSecretaria: string;
  Nombre: string;
  NombreCorto: string;
  IdTitular: string;
  PerteneceA: string;
  Direccion: string;
  CreadoPor: string;
  IdUResponsable: string;
  Clave: string;
  Descripcion: string;
  IdDepartamento: string;
  IdResponsable: string;
  IdRol: string;
  ControlInterno: string;
  IdDependencia: string;
  Telefono: string;
  IdTipoDependencia: string;
  IdPerfil: string;
  Referencia: string;
}

export const Create = ({
  open,
  setOpen,
  catalogo,
  reloadData
}: {
  open: boolean;
  setOpen: Function;
  catalogo: string;
  reloadData: Function
}) => {
  const elementoVacio = {
    IdSecretaria: "", //elemento.IdSecretaria,
    Nombre: "", //elemento.Nombre,
    NombreCorto: "", //elemento.NombreCorto,
    IdTitular: "", //elemento.IdTitular,
    PerteneceA: "", //elemento.PerteneceA,
    Direccion: "", //elemento.Direccion,
    CreadoPor: "", //elemento.CreadoPor,
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

  const [nuevoElemento, setNuevoElemento] = useState<IModify>({
    IdSecretaria: "", //elemento.IdSecretaria,
    Nombre: "", //elemento.Nombre,
    NombreCorto: "", //elemento.NombreCorto,
    IdTitular: "", //elemento.IdTitular,
    PerteneceA: "", //elemento.PerteneceA,
    Direccion: "", //elemento.Direccion,
    CreadoPor: localStorage.getItem("IdUsuario")||'', //elemento.CreadoPor,
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
  const [tpoDependencias, setTpoDependencias] = useState<Array<ITpoDependencia>>([]);
  const [perfiles, setPerfiles] = useState<Array<IPerfil>>([]);
  const [secretarias, setSecretarias] = useState<Array<ISecretaria>>([]);
  const [uResponsables, setUResponsables] = useState<Array<IUResponsable>>([]);

  const [dependenciasFiltered, setDependenciasFiltered] = useState<Array<IDependencia>>([]);
  const [secretariasFiltered, setSecretariasFiltered] = useState<Array<ISecretaria>>([]);
  const [usuarios,setUsuarios]=useState<Array<IUsuarios>>([])

  useEffect(() => {
      setDependenciasFiltered(dependencias)
  }, [dependencias])
  useEffect(() => {
      setSecretariasFiltered(secretarias)
  }, [secretarias])
  //elementos seleccionados
  const [departamento, setDepartamento] = useState<IDepartamento>({
      Id: '',
      Descripcion: '',
      NombreCorto: '',
      IdResponsable: '',
      Responsable: '',
      UltimaActualizacion: '',
      FechaCreacion: '',
      ModificadoPor: '',
      Modificador: '',
      CreadoPor: '',
      Creador: '',
      Deleted:'',
  });
  const [dependencia, setDependencia] = useState<IDependencia>({
      Id: '',
      Nombre: '',
      Direccion: '',
      Telefono: '',
      IdTipoDependencia: '',
      TipoDependencia: '',
      IdTitular: '',
      Titular: '',
      IdPerteneceA: '',
      PerteneceA: '',
      Deleted:'',
  });

  const [tpoDependencia, setTpoDependencia] = useState<ITpoDependencia>({
    Id: '',
    Nombre: '',
    Descripcion:'',
    Deleted:'',
});


  const [rol, setRol] = useState<IRol>({
      ControlInterno: '',
      Deleted:'',
      Descripcion: '',
      Id: '',
      Nombre: ''
  });
  const [perfil, setPerfil] = useState<IPerfil>({
      Deleted:'',
      Descripcion: '',
      Id: '',
      Referencia: '',
  });
  const [uResponsable, setUResponsable] = useState<IUResponsable>({
      Clave: '',
      Deleted:'',
      Descripcion: '',
      Id: '',
  })
  const [secretaria, setSecretaria] = useState<ISecretaria>({
      Deleted:'',
      Direccion: '',
      Id: '',
      IdTitular: '',
      Nombre: '',
      Nombre_corto: '',
      PerteneceA: '',
      Titular: ''
  })

  const [titular,setTitular]=useState<IUsuarios>({
    Id:"",
    Nombre:""
  })
  useEffect(() => {
      if (dependencia.Id != '') {
          let aux = secretarias.find((sec) => sec.Id === dependencia.IdPerteneceA)
         
          if (aux !== undefined) {
              setSecretaria(aux);
          }
      }
      else { setSecretariasFiltered(secretarias) }
  }, [dependencia.Id])


  useEffect(() => {
      if (secretaria.Id !== '') {
          setDependenciasFiltered(dependencias.filter((obj) => obj.IdPerteneceA === secretaria.Id))
      }
      else { setSecretariasFiltered(secretarias) }
  }, [secretaria])

  useEffect(() => {
      if (dependenciasFiltered.find((obj) => obj === dependencia) === undefined)
          setDependencia({
              Id: '',
              Nombre: '',
              Direccion: '',
              Telefono: '',
              IdTipoDependencia: '',
              TipoDependencia: '',
              IdTitular: '',
              Titular: '',
              IdPerteneceA: '',
              PerteneceA: '',
              Deleted:'',
          })

  }, [dependenciasFiltered])

  useEffect(() => {
    getCatalogo("departamentos", setDepartamentos)
    getCatalogo("roles", setRoles)
    getCatalogo("dependencias", setDependencias)
    getCatalogo("perfiles", setPerfiles)
    getCatalogo("secretarias", setSecretarias)
    getCatalogo("uresponsables", setUResponsables)
    getCatalogo("usuarios-asignables",setUsuarios)
    getCatalogo("tipodependencias",setTpoDependencias)
}, []);

useEffect(() => {
  let aux=secretarias.find((item)=>  item.Id===nuevoElemento.PerteneceA);
  if(aux!==undefined){
    setSecretaria(aux)
  }
}, [nuevoElemento.PerteneceA, secretarias])



useEffect(() => {
  let aux=usuarios.find((item)=>  item.Id===nuevoElemento.IdResponsable);
  if(aux!==undefined){
    setTitular(aux)}
    else{
      aux=usuarios.find((item)=>  item.Id===nuevoElemento.IdTitular);
      if(aux!==undefined){
        setTitular(aux)}
  }
}, [nuevoElemento.IdResponsable, nuevoElemento.IdTitular, usuarios])

//------------------------CATALOGOS-------------------------------------------

  const [ruta, setRuta] = useState("");

  useEffect(() => {
    switch (catalogo) {
      case "1":
        setRuta("/create-secretaria");
        break;
      case "2":
        setRuta("/create-uresponsable");
        break;
      case "3":
        setRuta("/create-departamento");
        break;
      case "4":
        setRuta("/create-rol");
        break;
      case "5":
        setRuta("/create-perfil");
        break;
      case "6":
        setRuta("/create-dependencia");
        break;
      case "7":
        setRuta("/create-tipodependencia");
        break;
       
      default:
        setRuta("/");
        break;
    }

    
  }, [catalogo, open]);

  useEffect(() => {
    setNuevoElemento(elementoVacio);
  }, [catalogo]);

  useEffect(() => {
    setNuevoElemento({...nuevoElemento,PerteneceA:secretaria.Id})
  }, [secretaria])

  useEffect(() => {
    setNuevoElemento(elementoVacio)
  }, [])
  
  


  
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogTitle>Crear elemento:</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {["1", "4","6","7"].includes(catalogo) && (
          <TextField
            sx={{ mt: 3, width: "100%" }}
            title="Nombre"
            label="Nombre"
            placeholder="Nombre"
            value={nuevoElemento.Nombre||""}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento,CreadoPor: localStorage.getItem("IdUsuario")||'',
                Nombre: v.target.value.replaceAll("'", "").replaceAll('"', ""),
              });
            }}
          />
        )}
        {["2"].includes(catalogo) && (
          <TextField
            multiline
            sx={{ mt: 3, width: "100%" }}
            title="Clave"
            label="Clave"
            placeholder="Clave"
            value={nuevoElemento.Clave||""}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento,CreadoPor: localStorage.getItem("IdUsuario")||'',
                Clave: v.target.value.replaceAll("'", "").replaceAll('"', ""),
              });
            }}
          />
        )}
        {["2", "3", "4", "5","7"].includes(catalogo) && (
          <TextField
            multiline
            sx={{ mt: 3, width: "100%" }}
            title="Descripcion"
            label="Descripcion"
            placeholder="Descripcion"
            value={nuevoElemento.Descripcion||""}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento,CreadoPor: localStorage.getItem("IdUsuario")||'',
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
            value={nuevoElemento.NombreCorto||""}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento,CreadoPor: localStorage.getItem("IdUsuario")||'',
                NombreCorto: v.target.value
                  .replaceAll("'", "")
                  .replaceAll('"', ""),
              });
            }}
          />
        )}
        {["1", "3","6"].includes(catalogo) && (
          <Grid  sx={{ mt: 3, width: "100%" }}>
          <Typography variant="body2"> Titular / Responsable: </Typography>
          <Autocomplete
              options={usuarios}
              getOptionLabel={(usuarios) => usuarios.Nombre || 'Seleccione titular'}
              value={titular}
              onChange={(event, newValue) => {
                  if (newValue != null) { setTitular(newValue);  setNuevoElemento({...nuevoElemento,IdTitular:newValue.Id,IdResponsable:newValue.Id,CreadoPor: localStorage.getItem("IdUsuario")||''});  
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
          // <TextField
          //   multiline
          //   sx={{ mt: 3, width: "100%" }}
          //   title="Titular / Responsable"
          //   label="Titular / Responsable"
          //   placeholder="Titular / Responsable"
          //   value={nuevoElemento.IdTitular||""}
          //   onChange={(v) => {
          //     setNuevoElemento({
          //       ...nuevoElemento,
          //       IdTitular: v.target.value
          //         .replaceAll("'", "")
          //         .replaceAll('"', ""),
          //     });
          //   }}
          // />
        )}
      {["6"].includes(catalogo) && (<Grid  sx={{ mt: 3, width: "100%" }}>
                        <Typography variant="body2">Tipo de dependencia:</Typography>
                        <Autocomplete
                            options={tpoDependencias}
                            getOptionLabel={(tpodependencia) => tpodependencia.Nombre || 'Seleccione tipo de dependencia'}
                            value={tpoDependencia}
                            onChange={(event, newValue) => {
                                if (newValue != null) { setTpoDependencia(newValue);  
                                  setNuevoElemento({...nuevoElemento,CreadoPor: localStorage.getItem("IdUsuario")||'',IdTipoDependencia:newValue.Id});
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
        )}
        {["1","6"].includes(catalogo) && (<Grid  sx={{ mt: 3, width: "100%" }}>
                        <Typography variant="body2">Pertenece a la secretaria:</Typography>
                        <Autocomplete
                            options={secretariasFiltered}
                            getOptionLabel={(secretaria) => secretaria.Nombre || 'Seleccione secretaria'}
                            value={secretaria}
                            onChange={(event, newValue) => {
                                if (newValue != null) { setSecretaria(newValue);  
                                  setNuevoElemento({...nuevoElemento,CreadoPor: localStorage.getItem("IdUsuario")||''});
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
          // <TextField
          //   multiline
          //   sx={{ mt: 3, width: "100%" }}
          //   title="Pertenece A"
          //   label="Pertenece A"
          //   placeholder="Pertenece A"
          //   value={nuevoElemento.PerteneceA||""}
          //   onChange={(v) => {
          //     setNuevoElemento({
          //       ...nuevoElemento,
          //       PerteneceA: v.target.value
          //         .replaceAll("'", "")
          //         .replaceAll('"', ""),
          //     });
          //   }}
          // />
        )}
        {["1","6"].includes(catalogo) && (
          <TextField
            multiline
            sx={{ mt: 3, width: "100%" }}
            title="Direccion"
            label="Direccion"
            placeholder="Direccion"
            value={nuevoElemento.Direccion||""}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento,CreadoPor: localStorage.getItem("IdUsuario")||'',
                Direccion: v.target.value
                  .replaceAll("'", "")
                  .replaceAll('"', ""),
              });
            }}
          />
        )}
         {["6"].includes(catalogo) && (
          <TextField
            multiline
            sx={{ mt: 3, width: "100%" }}
            title="Telefono"
            label="Telefono"
            placeholder="Telefono"
            value={nuevoElemento.Telefono||""}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento,CreadoPor: localStorage.getItem("IdUsuario")||'',
                Telefono: v.target.value.replaceAll("'", "").replaceAll('"', ""),
              });
            }}
          />
        )}
        {["4"].includes(catalogo) && (
          <TextField
            multiline
            sx={{ mt: 3, width: "100%" }}
            title="Control Interno"
            label="Control Interno"
            placeholder="Control Interno"
            value={nuevoElemento.ControlInterno||""}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento,CreadoPor: localStorage.getItem("IdUsuario")||'',
                ControlInterno: v.target.value
                  .replaceAll("'", "")
                  .replaceAll('"', ""),
              });
            }}
          />
        )}
        {["5"].includes(catalogo) && (
          <TextField
            multiline
            sx={{ mt: 3, width: "100%" }}
            title="Referencia"
            label="Referencia"
            placeholder="Referencia"
            value={nuevoElemento.Referencia||""}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento,CreadoPor: localStorage.getItem("IdUsuario")||'',
                Referencia: v.target.value
                  .replaceAll("'", "")
                  .replaceAll('"', ""),
              });
            }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button className="cancelar" onClick={() => setOpen(false)}>
          Cancelar
        </Button>
        <Button className="aceptar" onClick={()=>{createCatalogo(ruta,{...nuevoElemento},setOpen,reloadData)
        }}>Agregar</Button>
      </DialogActions>
    </Dialog>
  );
};

// falta
// catalogos titulares, pertenece A, direccion,
// cambiar nombre de variable IdResponsable de /uresponsable por IdTitular como en /secretaria
