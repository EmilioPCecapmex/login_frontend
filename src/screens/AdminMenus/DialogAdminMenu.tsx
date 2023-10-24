import { Autocomplete, Button, Dialog, DialogActions, DialogContent, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { alertaError } from "../../components/alertas/toast";
import { createAdminMenu, editarMenu, getAdminMenu, getMenus, getMenusPadre } from "./AdminMenuServices";
import { setMenus } from "../../services/localStorage";

export interface IListaMenusPadre {
  Id: string;
  Label: string;
  Path: string;
}

export interface IElemento {
  Id: string;
  Menu: string;
  Descripcion: string;
  Nivel: number;
  Orden: number;
  MenuPadre: string;
  Icon: string;
  Path: string;
  ControlInterno: string;
  IdUsuario: string;
  IdApp: string;
}

export const DialogAdminMenu = (
  {
    open,
    closeDialog,
    IdApp,
    movimiento,
    reloadData,
  }: {
    open: boolean;
    closeDialog: Function;
    IdApp: string;
    movimiento: string;
    reloadData: IElemento;
  }
) => {

  const elementoVacio = {
    Id: "",
    Menu: "",
    Descripcion: "",
    Nivel: 0,
    Orden: 0,
    ControlInterno: "",
    MenuPadre: "",
    Icon: "",
    Path: "",
    IdUsuario: "",
    IdApp: "",
  };

  const [nuevoElemento, setNuevoElemento] = useState<IElemento>({
    ...elementoVacio,
    IdUsuario: localStorage.getItem("IdUsuario") || "",
    IdApp: IdApp,
  });
  const [menuPadre, setMenuPadre] = useState<IListaMenusPadre>({ Id: "", Label: "", Path: "" });
  const [menusPadre, setMenusPadre] = useState<IListaMenusPadre[]>([]);


  useEffect(() => {
    console.log("reloadData", reloadData);
    console.log("find",menusPadre.find((menu)=>menu.Id===reloadData.MenuPadre));
    
    if (reloadData && movimiento === "Editar") {
      setNuevoElemento(
        {
          ...reloadData,
          IdUsuario: localStorage.getItem("IdUsuario") || "",
          IdApp: IdApp,
        }
      )
    }

    getMenus(IdApp, setMenusPadre)
  }, [reloadData])


  useEffect(()=>{
    setMenuPadre(menusPadre.find((menu)=>menu.Id===reloadData.MenuPadre)||{ Id: "", Label: "", Path: "" })
  },[menusPadre])

  function sendRequest() {


    switch (movimiento) {
      case "Editar":
        editarMenu(nuevoElemento, closeDialog);
        break;
      case "Agregar":
        createAdminMenu(nuevoElemento, closeDialog);
        break;
      // case "Eliminar":
      //   //deleteRol(nuevoElemento, closeDialog);
      //   break;
      default:
        alertaError();
    }
  }

  const validarNumero = (v: string) => {
    if (/^(0|[1-9][0-9]*)$/.test(v)) {
      setNuevoElemento({
        ...nuevoElemento,
        Nivel: Number(v)

      });
   } else if (v.length === 0) {
    setNuevoElemento({...nuevoElemento,
      Nivel: Number("")});
    }
  };



  return (

    <Dialog
      open={open}
      onClose={() => {
        closeDialog(false);
      }}
      fullWidth
      maxWidth={"sm"}
    >

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          sx={{ mt: 3, width: "100%" }}
          title="Menu"
          label="Nombre de Menú"
          placeholder="Nombre de Menú"
          value={nuevoElemento.Menu || ""}
          onChange={(v) => {
            setNuevoElemento({
              ...nuevoElemento,
              Menu: v.target.value.replaceAll("'", "").replaceAll('"', ""),
            });
          }}
        //InputProps={{ readOnly: movimiento === "eliminar" }}
        />

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
              Descripcion: v.target.value
                .replaceAll("'", "")
                .replaceAll('"', ""),
            });
          }}
        //InputProps={{ readOnly: movimiento === "eliminar" }}
        />
        <TextField
          multiline
          sx={{ mt: 3, width: "100%" }}
          title="Nivel"
          label="Nivel"
          placeholder="Nivel"
          value={nuevoElemento.Nivel || ""}
          onChange={(v) => {
            validarNumero(v.target.value);
          }}
        //InputProps={{ readOnly: movimiento === "eliminar" }}
        />
        <TextField
          multiline
          sx={{ mt: 3, width: "100%" }}
          title="Orden"
          label="Orden"
          placeholder="Orden"
          value={nuevoElemento.Orden || ""}
          onChange={(v) => {
            console.log("v", v.target.value);

            setNuevoElemento({
              ...nuevoElemento,
              Orden: Number(v.target.value)
            });
          }}
        //InputProps={{ readOnly: movimiento === "eliminar" }}
        />
        <Grid item xs={12} md={12} lg={12} sx={{ mt: 3, width: "100%" }}>

          <Autocomplete
            fullWidth
            sx={{ width: "100%" }}
            noOptionsText="No se encontraron opciones"
            clearText="Borrar"
            closeText="Cerrar"
            openText="Abrir"

            options={menusPadre}
            getOptionLabel={(menuPadre) =>
              menuPadre.Label || "Seleccione Menú"
            }
            value={menuPadre}
            onChange={(event, newValue) => {
              //console.log("event",event);
              //console.log("newValue",newValue);
              console.log("label", newValue?.Label);
              setMenuPadre(newValue || { Id: "", Label: "", Path: "" })
              setNuevoElemento({ ...nuevoElemento, MenuPadre: newValue?.Id || "" })
              // setNuevoElemento({
              //   ...nuevoElemento,
              //   MenuPadre: v.target.value
              //     .replaceAll("'", "")
              //     .replaceAll('"', ""),
              // });
              // if (newValue != null) {
              //   setMenuPadre(newValue);

              // }

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

        <TextField
          multiline
          sx={{ mt: 3, width: "100%" }}
          title="Icon"
          label="Icon"
          placeholder="Icon"
          value={nuevoElemento.Icon || ""}
          onChange={(v) => {
            setNuevoElemento({
              ...nuevoElemento,
              Icon: v.target.value
                .replaceAll("'", "")
                .replaceAll('"', ""),
            });
          }}
        //InputProps={{ readOnly: movimiento === "eliminar" }}
        />
        <TextField
          multiline
          sx={{ mt: 3, width: "100%" }}
          title="Path"
          label="Path"
          placeholder="Path"
          value={nuevoElemento.Path || ""}
          onChange={(v) => {
            setNuevoElemento({
              ...nuevoElemento,
              Path: v.target.value
                .replaceAll("'", "")
                .replaceAll('"', ""),
            });
          }}
        //InputProps={{ readOnly: movimiento === "eliminar" }}
        />
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
        //InputProps={{ readOnly: movimiento === "eliminar" }}
        />
      </DialogContent>

      <DialogActions>
        <Button className="cancelar" onClick={() => closeDialog(false)}>
          Cancelar
        </Button>
        <Button
          className="aceptar"
          onClick={() => {
            // createCatalogo(ruta, { ...nuevoElemento }, setOpen, reloadData)
            if (
              nuevoElemento.Descripcion === "" ||
              //nuevoElemento.Menu === "" ||
              nuevoElemento.ControlInterno === ""
            ) {
              alertaError("Captura todos los datos");
            } else {
              sendRequest();
            }
          }}
        >
          {movimiento}
        </Button>
      </DialogActions>

    </Dialog>

  );
}