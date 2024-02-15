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
  createCatalogo,
  getCatalogo,
  modificarCatalogo,
} from "../../services/catalogosService";
import { IUsuarios } from "../../screens/SolicitudDeUsuarios/ICatalogos";
import { IModifica } from "../../screens/Catalogos/Catalogos";
import { alertaInformativa } from "../alertas/toast";

export interface IModify {
  Entidad: { Id: string; Nombre: string };
  TipoEntidad: { Id: string; Nombre: string };
  Nombre: string;
  Titular: { Id: string; Nombre: string };
  Direccion: string;
  Telefono: string;
  PerteneceA: { Id: string; Nombre: string };
  ControlInterno: string;
  ClaveSiregob: string;
  Descripcion: string;
  IdUsuario: string;
}

export interface IEntidad {
  Id: string;
  Nombre: string;
}

export const Create = ({
  open,
  setOpen,
  catalogo,
  data,
}: {
  open: boolean;
  setOpen: Function;
  catalogo: string;
  data: IModifica;
}) => {

  const [nuevoElemento, setNuevoElemento] = useState({
    Entidad: { Id: data.Id, Nombre: data.Nombre },
    TipoEntidad: { Id: data.IdTipoEntidad, Nombre: data.NombreTipoEntidad },
    Nombre: data.Nombre,
    Titular: { Id: data.IdTitular, Nombre: data.Titular },
    Direccion: data.Direccion,
    Telefono: data.Telefono,
    PerteneceA: {
      Id: data.IdEntidadPerteneceA,
      Nombre: data.EntidadPerteneceA,
    },
    ControlInterno: data.ControlInterno,
    ClaveSiregob: data.ClaveSiregob,
    Descripcion: data.Descripcion,
    IdUsuario: localStorage.getItem("IdUsuario")!,
  });

  const [Elemento,setElemento]=useState({
    Entidad: { Id: data.Id, Nombre: data.Nombre },
    TipoEntidad: { Id: data.IdTipoEntidad, Nombre: data.NombreTipoEntidad },
    Nombre: data.Nombre,
    Titular: { Id: data.IdTitular, Nombre: data.Titular },
    Direccion: data.Direccion,
    Telefono: data.Telefono,
    PerteneceA: {
      Id: data.IdEntidadPerteneceA,
      Nombre: data.EntidadPerteneceA,
    },
    ControlInterno: data.ControlInterno,
    ClaveSiregob: data.ClaveSiregob,
    Descripcion: data.Descripcion,
    IdUsuario: localStorage.getItem("IdUsuario")!,
  });

  function MismoObjeto(objetoA:any, objetoB:any) {
    // Convertimos los objetos a cadenas JSON y luego las comparamos
    const jsonStringA = JSON.stringify(objetoA);
    const jsonStringB = JSON.stringify(objetoB);
  
    // Comparamos las cadenas JSON
    return jsonStringA === jsonStringB;
  }
  
  //------------------------CATALOGOS-------------------------------------------

  const [usuarios, setUsuarios] = useState<Array<IUsuarios>>([]);
  const [entidades, setEntidades] = useState<Array<IEntidad>>([]);
  const [tipoEntidades, setTipoEntidades] = useState<Array<IEntidad>>([]);

  useEffect(() => {
    getCatalogo("usuarios-asignables", setUsuarios, "", "");
    getCatalogo("lista-entidades-select", setEntidades, "", "");
    getCatalogo("lista-tipo-entidades", setTipoEntidades, "", "");
  }, []);


  //------------------------CATALOGOS-------------------------------------------

  const [ruta, setRuta] = useState("");

  useEffect(() => {
    if (data.Id !== "") {
      switch (catalogo) {
        case "TipoEntidades":
          setRuta("/editar-tipo-entidad");
          break;
        case "Entidades":
          setRuta("/editar-entidad");
          break;
        default:
          setRuta("/");
          break;
      }
    } else {
      switch (catalogo) {
        case "TipoEntidades":
          setRuta("/create-tipo-entidad");
          break;
        case "Entidades":
          setRuta("/create-entidad");
          break;
        default:
          setRuta("/");
          break;
      }
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
      <DialogTitle>
        {data.Id !== "" ? "Editar Elemento:" : "Crear Elemento:"}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {["TipoEntidades", "Entidades"].includes(catalogo) && (
          <TextField
            multiline
            sx={{ mt: 3, width: "100%" }}
            title="Nombre"
            label="Nombre"
            placeholder="Nombre"
            value={nuevoElemento.Nombre || ""}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento,
                Nombre: v.target.value.replaceAll("'", "").replaceAll('"', ""),
              });
            }}
          />
        )}
        {["Entidades"].includes(catalogo) && (
          <TextField
            multiline
            sx={{ mt: 3, width: "100%" }}
            title="Dirección"
            label="Dirección"
            placeholder="Dirección"
            value={nuevoElemento.Direccion || ""}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento,
                Direccion: v.target.value
                  .replaceAll("'", "")
                  .replaceAll('"', ""),
              });
            }}
          />
        )}
        {["Entidades"].includes(catalogo) && (
          <TextField
            multiline
            sx={{ mt: 3, width: "100%" }}
            title="Teléfono"
            label="Teléfono"
            placeholder="Teléfono"
            value={nuevoElemento.Telefono || ""}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento,
                Telefono: v.target.value
                  .replace(/[^\d]/g, "") // Elimina todos los caracteres que no sean dígitos
                  .slice(0, 10),
              });
            }}
          />
        )}
        {["Entidades"].includes(catalogo) && (
          <Grid sx={{ mt: 3, width: "100%" }}>
            <Typography variant="body2"> Tipo de Entidad: </Typography>
            <Autocomplete
              noOptionsText="No se encontraron opciones"
              clearText="Borrar"
              closeText="Cerrar"
              openText="Abrir"
              options={tipoEntidades}
              getOptionLabel={(usuarios) => usuarios.Nombre}
              value={nuevoElemento.TipoEntidad}
              onChange={(event, v) => {
                if (v != null) {
                  setNuevoElemento({
                    ...nuevoElemento,
                    TipoEntidad: { Id: v.Id, Nombre: v.Nombre },
                  });
                }
              }}
              renderInput={(params) => (
                <TextField key={params.id} {...params} variant="outlined" />
              )}
              isOptionEqualToValue={(option, value) =>
                option.Nombre === value.Nombre || value.Nombre === ""
              }
            />
          </Grid>
        )}
        {["Entidades"].includes(catalogo) && (
          <Grid sx={{ mt: 3, width: "100%" }}>
            <Typography variant="body2"> Titular: </Typography>
            <Autocomplete
              noOptionsText="No se encontraron opciones"
              clearText="Borrar"
              closeText="Cerrar"
              openText="Abrir"
              options={usuarios}
              getOptionLabel={(usuarios) => usuarios.Nombre}
              value={nuevoElemento.Titular}
              onChange={(event, v) => {
                if (v != null) {
                  setNuevoElemento({
                    ...nuevoElemento,
                    Titular: { Id: v.Id, Nombre: v.Nombre },
                  });
                }
              }}
              renderInput={(params) => (
                <TextField key={params.id} {...params} variant="outlined" />
              )}
              isOptionEqualToValue={(option, value) =>
                option.Nombre === value.Nombre || value.Nombre === ""
              }
            />
          </Grid>
        )}
        {["Entidades"].includes(catalogo) && (
          <Grid sx={{ mt: 3, width: "100%" }}>
            <Typography variant="body2"> Pertenece A: </Typography>
            <Autocomplete
              noOptionsText="No se encontraron opciones"
              clearText="Borrar"
              closeText="Cerrar"
              openText="Abrir"
              options={entidades}
              getOptionLabel={(entidades) => entidades.Nombre}
              value={nuevoElemento.PerteneceA}
              onChange={(event, v) => {
                if (v != null) {
                  setNuevoElemento({
                    ...nuevoElemento,
                    PerteneceA: { Id: v.Id, Nombre: v.Nombre },
                  });
                }
              }}
              renderInput={(params) => (
                <TextField key={params.id} {...params} variant="outlined" />
              )}
              isOptionEqualToValue={(option, value) =>
                option.Nombre === value.Nombre || value.Nombre === ""
              }
            />
          </Grid>
        )}
        {["Entidades"].includes(catalogo) && (
          <TextField
            multiline
            sx={{ mt: 3, width: "100%" }}
            title="Control Interno"
            label="Control Interno"
            placeholder="Control Interno"
            value={nuevoElemento.ControlInterno || ""}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento,
                ControlInterno: v.target.value
                  .replaceAll("'", "")
                  .replaceAll('"', ""),
              });
            }}
          />
        )}
        {["Entidades"].includes(catalogo) && (
          <TextField
            multiline
            sx={{ mt: 3, width: "100%" }}
            title="Clave Siregob"
            label="Clave Siregob"
            placeholder="Clave Siregob"
            value={nuevoElemento.ClaveSiregob || ""}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento,
                ClaveSiregob: v.target.value
                  .replaceAll("'", "")
                  .replaceAll('"', ""),
              });
            }}
          />
        )}
        {["TipoEntidades"].includes(catalogo) && (
          <TextField
            multiline
            sx={{ mt: 3, width: "100%" }}
            title="Descripción"
            label="Descripción"
            placeholder="Descripción"
            value={nuevoElemento.Descripcion || ""}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento,
                IdUsuario: localStorage.getItem("IdUsuario") || "",
                Descripcion: v.target.value
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
        <Button
          className="aceptar"
          onClick={() => {
            if(MismoObjeto(nuevoElemento,Elemento)){
              alertaInformativa("No se detectaron cambios")
            }else{
              data.Id !== ""
              ? modificarCatalogo(
                  ruta,
                  {
                    Id: data.Id,
                    Nombre: nuevoElemento.Nombre,
                    Descripcion: nuevoElemento.Descripcion,
                    Direccion: nuevoElemento.Direccion,
                    Telefono: nuevoElemento.Telefono,
                    IdTipoEntidad: nuevoElemento.TipoEntidad.Id,
                    IdTitular: nuevoElemento.Titular.Id,
                    PerteneceA: nuevoElemento.PerteneceA.Id,
                    ControlInterno: nuevoElemento.ControlInterno,
                    ClaveSiregob: nuevoElemento.ClaveSiregob,
                    IdUsuario: localStorage.getItem("IdUsuario"),
                  },
                  setOpen
                )
              : createCatalogo(
                  ruta,
                  {
                    Nombre: nuevoElemento.Nombre,
                    Descripcion: nuevoElemento.Descripcion,
                    Direccion: nuevoElemento.Direccion,
                    Telefono: nuevoElemento.Telefono,
                    IdTipoEntidad: nuevoElemento.TipoEntidad.Id,
                    IdTitular: nuevoElemento.Titular.Id,
                    PerteneceA: nuevoElemento.PerteneceA.Id,
                    ControlInterno: nuevoElemento.ControlInterno,
                    ClaveSiregob: nuevoElemento.ClaveSiregob,
                    IdUsuario: localStorage.getItem("IdUsuario"),
                  },
                  setOpen
                );
            }
            
          }}
        >
          { data.Id !== ""?"Editar":"Agregar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// falta
// catalogos titulares, pertenece A, direccion,
// cambiar nombre de variable IdResponsable de /uresponsable por IdTitular como en /secretaria
