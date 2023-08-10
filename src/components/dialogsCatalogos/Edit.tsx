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
import { getCatalogo, modificarCatalogo } from "../../services/catalogosService";
import { IDepartamento, IDependencia, IEntidadPadre, IPerfil, IRol, ISecretaria, ITpoDependencia, IUResponsable, IUsuarios } from "../../screens/SolicitudDeUsuarios/ICatalogos";

export interface IModify {
  IdSecretaria: string;
  Nombre: string;
  NombreCorto: string;
  IdTitular: string;
  PerteneceA: string;
  Direccion: string;
  IdModificador: string;
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

export const Edit = ({
  open,
  setOpen,
  elemento,
  catalogo,
  reloadData
}: {
  open: boolean;
  setOpen: Function;
  elemento: IModify;
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

  const [nuevoElemento, setNuevoElemento] = useState<IModify>({
    IdSecretaria: "", //elemento.IdSecretaria,
    Nombre: "", //elemento.Nombre,
    NombreCorto: "", //elemento.NombreCorto,
    IdTitular: "", //elemento.IdTitular,
    PerteneceA: "", //elemento.PerteneceA,
    Direccion: "", //elemento.Direccion,
    IdModificador: localStorage.getItem("IdUsuario") || '', //elemento.IdModificador,
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
  // const [departamentos, setDepartamentos] = useState<Array<IDepartamento>>([]);
  // const [roles, setRoles] = useState<Array<IRol>>([]);
  const [dependencias, setDependencias] = useState<Array<IDependencia>>([]);
  const [tpoDependencias, setTpoDependencias] = useState<Array<ITpoDependencia>>([]);
  const [entidadesPadres, setEntidadesPadres] = useState<Array<IEntidadPadre>>([{tipo:"", descripcion:"",value:""}])
  // const [perfiles, setPerfiles] = useState<Array<IPerfil>>([]);
  // const [secretarias, setSecretarias] = useState<Array<ISecretaria>>([]);
  // const [uResponsables, setUResponsables] = useState<Array<IUResponsable>>([]);

  const [dependenciasFiltered, setDependenciasFiltered] = useState<Array<IDependencia>>([]);
  // const [secretariasFiltered, setSecretariasFiltered] = useState<Array<ISecretaria>>([]);
  const [usuarios, setUsuarios] = useState<Array<IUsuarios>>([])

  useEffect(() => {
    setDependenciasFiltered(dependencias)
  }, [dependencias])
  // useEffect(() => {
  //     setSecretariasFiltered(secretarias)
  // }, [secretarias])
  //elementos seleccionados
  // const [departamento, setDepartamento] = useState<IDepartamento>({
  //     Id: '',
  //     Descripcion: '',
  //     NombreCorto: '',
  //     IdResponsable: '',
  //     Responsable: '',
  //     UltimaActualizacion: '',
  //     FechaCreacion: '',
  //     ModificadoPor: '',
  //     Modificador: '',
  //     CreadoPor: '',
  //     Creador: '',
  //     Deleted:'',
  // });
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
    Deleted: '',
  });

  const [tpoDependencia, setTpoDependencia] = useState<ITpoDependencia>({
    Id: '',
    Nombre: '',
    Descripcion: '',
    Deleted: '',
  });


  // const [rol, setRol] = useState<IRol>({
  //     ControlInterno: '',
  //     Deleted:'',
  //     Descripcion: '',
  //     Id: '',
  //     Nombre: ''
  // });
  // const [perfil, setPerfil] = useState<IPerfil>({
  //     Deleted:'',
  //     Descripcion: '',
  //     Id: '',
  //     Referencia: '',
  // });
  // const [uResponsable, setUResponsable] = useState<IUResponsable>({
  //     Clave: '',
  //     Deleted:'',
  //     Descripcion: '',
  //     Id: '',
  // })
  // const [secretaria, setSecretaria] = useState<ISecretaria>({
  //   Deleted: '',
  //   Direccion: '',
  //   Id: '',
  //   IdTitular: '',
  //   Nombre: '',
  //   Nombre_corto: '',
  //   PerteneceA: '',
  //   Titular: ''
  // })

  const [entidadPadre, setEntidadPadre] = useState<IEntidadPadre>({ tipo: "", value: "", descripcion: "" })

  const [titular, setTitular] = useState<IUsuarios>({
    Id: "",
    Nombre: ""
  })
  // useEffect(() => {
  //     if (dependencia.Id != '') {
  //         let aux = secretarias.find((sec) => sec.Id === dependencia.IdPerteneceA)

  //         if (aux !== undefined) {
  //             setSecretaria(aux);
  //         }
  //     }
  //     else { setSecretariasFiltered(secretarias) }
  // }, [dependencia.Id])


  // useEffect(() => {
  //     if (secretaria.Id !== '') {
  //         setDependenciasFiltered(dependencias.filter((obj) => obj.IdPerteneceA === secretaria.Id))
  //     }
  //     else { setSecretariasFiltered(secretarias) }
  // }, [secretaria])

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
        Deleted: '',
      })

  }, [dependenciasFiltered])

  useEffect(() => {
    // getCatalogo("departamentos", setDepartamentos)
    // getCatalogo("roles", setRoles)
    getCatalogo("dependencias", setDependencias)
    // getCatalogo("perfiles", setPerfiles)
    // getCatalogo("secretarias", setSecretarias)
    // getCatalogo("uresponsables", setUResponsables)
    getCatalogo("usuarios-asignables", setUsuarios)
    getCatalogo("tipodependencias", setTpoDependencias)
    getCatalogo("entidad-padre", setEntidadesPadres)
  }, []); 

  useEffect(() => {
    let aux = usuarios.find((item) => item.Id === nuevoElemento.IdResponsable);
    if (aux !== undefined) {
      setTitular(aux)
    }
    else {
      aux = usuarios.find((item) => item.Id === nuevoElemento.IdTitular);
      if (aux !== undefined) {
        setTitular(aux)
      }
    }
  }, [nuevoElemento.IdResponsable, nuevoElemento.IdTitular, usuarios])


  useEffect(() => {
    let aux = tpoDependencias.find((tpodep) => tpodep.Id === elemento.IdTipoDependencia)
    if (aux)
      setTpoDependencia(aux)
  }, [elemento.IdTipoDependencia])



  //------------------------CATALOGOS-------------------------------------------

  const [ruta, setRuta] = useState("");

  useEffect(() => {
    setNuevoElemento(elemento);
    switch (catalogo) {
      case "1":
        setRuta("/secretaria");
        break;
      case "2":
        setRuta("/uresponsable");
        break;
      case "3":
        setRuta("/departamento");
        break;
      case "4":
        setRuta("/rol");
        break;
      case "5":
        setRuta("/perfil");
        break;
      case "6":
        setRuta("/dependencia");
        break;
      case "7":
        setRuta("/tipodependencia");
        break;

      default:
        setRuta("/");
        break;
    }
    let aux=entidadesPadres.find((entidad)=>entidad.value===elemento.PerteneceA) 
    if(aux!== null && aux !==undefined){
      setEntidadPadre(aux)
    }
    

  }, [catalogo, open]);

  
  

  useEffect(() => {
    setNuevoElemento(elementoVacio);
  }, [catalogo]);

  useEffect(() => {
    if(entidadPadre.value!=="")
    setNuevoElemento({ ...nuevoElemento, PerteneceA: entidadPadre.value})
  }, [entidadPadre])




  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogTitle>Editar elemento:</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {["1", "4", "6", "7"].includes(catalogo) && (
          <TextField
            sx={{ mt: 3, width: "100%" }}
            title="Nombre"
            label="Nombre"
            placeholder="Nombre"
            value={nuevoElemento.Nombre || ""}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento, IdModificador: localStorage.getItem("IdUsuario") || '',
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
            value={nuevoElemento.Clave || ""}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento, IdModificador: localStorage.getItem("IdUsuario") || '',
                Clave: v.target.value.replaceAll("'", "").replaceAll('"', ""),
              });
            }}
          />
        )}
        {["2", "3", "4", "5", "7"].includes(catalogo) && (
          <TextField
            multiline
            sx={{ mt: 3, width: "100%" }}
            title="Descripción"
            label="Descripción"
            placeholder="Descripción"
            value={nuevoElemento.Descripcion || ""}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento, IdModificador: localStorage.getItem("IdUsuario") || '',
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
            value={nuevoElemento.NombreCorto || ""}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento, IdModificador: localStorage.getItem("IdUsuario") || '',
                NombreCorto: v.target.value
                  .replaceAll("'", "")
                  .replaceAll('"', ""),
              });
            }}
          />
        )}
        {["1", "3", "6"].includes(catalogo) && (
          <Grid sx={{ mt: 3, width: "100%" }}>
            <Typography variant="body2"> Titular / Responsable: </Typography>
            <Autocomplete
              noOptionsText='No se encontraron opciones'
              clearText="Borrar"
              closeText="Cerrar"
              options={usuarios}
              getOptionLabel={(usuarios) => usuarios.Nombre || 'Seleccione titular'}
              value={titular}
              onChange={(event, newValue) => {
                if (newValue != null) {
                  setTitular(newValue);
                  setNuevoElemento({ ...nuevoElemento, IdTitular: newValue.Id, IdResponsable: newValue.Id, IdModificador: localStorage.getItem("IdUsuario") || '' })
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
        {["6"].includes(catalogo) && (<Grid sx={{ mt: 3, width: "100%" }}>
          <Typography variant="body2">Tipo de dependencia:</Typography>
          <Autocomplete
            noOptionsText='No se encontraron opciones'
            
            clearText="Borrar"
            closeText="Cerrar"
            options={tpoDependencias}
            getOptionLabel={(tpodependencia) => tpodependencia.Nombre || 'Seleccione tipo de dependencia'}
            value={tpoDependencia}
            onChange={(event, newValue) => {
              if (newValue != null) {
                setTpoDependencia(newValue);
                setNuevoElemento({ ...nuevoElemento, IdModificador: localStorage.getItem("IdUsuario") || '', IdTipoDependencia: newValue.Id });
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
        {["6"].includes(catalogo) && (<Grid sx={{ mt: 3, width: "100%" }}>
          <Typography variant="body2">Pertenece a:</Typography>
          <Autocomplete
            noOptionsText='No se encontraron opciones'
            // groupBy={(options)=>options.tipo}
            clearText="Borrar"
            closeText="Cerrar"
            options={entidadesPadres || {tipo:"",descripcion:"",value:""}}
            getOptionLabel={(entidad) =>entidad.descripcion || 'Seleccione a quein pertenece'}
            value={entidadPadre}
            onChange={(event, newValue) => {
              if (newValue != null) {
                setEntidadPadre(newValue);
                setNuevoElemento({ ...nuevoElemento, IdModificador: localStorage.getItem("IdUsuario") || '' });
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
        {["1", "6"].includes(catalogo) && (
          <TextField
            multiline
            sx={{ mt: 3, width: "100%" }}
            title="Dirección"
            label="Dirección"
            placeholder="Dirección"
            value={nuevoElemento.Direccion || ""}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento, IdModificador: localStorage.getItem("IdUsuario") || '',
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
            title="Teléfono"
            label="Teléfono"
            placeholder="Teléfono"
            value={nuevoElemento.Telefono || ""}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento, IdModificador: localStorage.getItem("IdUsuario") || '',
                Telefono: v.target.value.replaceAll("'", "").replaceAll('"', ""),
              });
            }}
          />
        )}
        {["4","6"].includes(catalogo) && (
          <TextField
            multiline
            sx={{ mt: 3, width: "100%" }}
            title="Control Interno"
            label="Control Interno"
            placeholder="Control Interno"
            value={nuevoElemento.ControlInterno || ""}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento, IdModificador: localStorage.getItem("IdUsuario") || '',
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
            value={nuevoElemento.Referencia || ""}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento, IdModificador: localStorage.getItem("IdUsuario") || '',
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
        <Button className="aceptar" onClick={() => {
          modificarCatalogo(ruta, { ...nuevoElemento }, setOpen, reloadData)
        }}>Editar</Button>
      </DialogActions>
    </Dialog>
  );
};

// falta
// catalogos titulares, pertenece A, direccion,
// cambiar nombre de variable IdResponsable de /uresponsable por IdTitular como en /secretaria
