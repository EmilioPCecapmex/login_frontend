import { Autocomplete, Button, Dialog, DialogActions, DialogContent, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { alertaError } from "../../components/alertas/toast";
import { createAdminMenu, editarMenu, getMenus } from "./AdminMenuServices";
import { validarNumero } from "../../services/Validaciones";
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
      default:
        alertaError();
    }
  }

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
          inputProps={{ maxLength: 255 }}
        />

        <TextField
          multiline
          inputProps={{ maxLength: 200 }}
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
        />
        <TextField
          multiline
          sx={{ mt: 3, width: "100%" }}
          inputProps={{ maxLength: 11 }}
          title="Nivel"
          label="Nivel"
          placeholder="Nivel"
          value={nuevoElemento.Nivel || ""}
          onChange={(v) => {
            setNuevoElemento({
              ...nuevoElemento,
              Nivel: validarNumero(v.target.value,nuevoElemento.Nivel)
            });
          }}
        />
        <TextField
          multiline
          sx={{ mt: 3, width: "100%" }}
          inputProps={{ maxLength: 11 }}
          title="Orden"
          label="Orden"
          placeholder="Orden"
          value={nuevoElemento.Orden || ""}
          onChange={(v) => {
            setNuevoElemento({
              ...nuevoElemento,
              Orden: validarNumero(v.target.value,nuevoElemento.Orden)
            });
          }}
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
              setMenuPadre(newValue || { Id: "", Label: "", Path: "" })
              setNuevoElemento({ ...nuevoElemento, MenuPadre: newValue?.Id || "" })

            }}
            renderInput={(params) => (
              <TextField
                key={params.id}
                {...params}
                variant="outlined"
              />
            )}
          />

        </Grid>
        <TextField
          multiline
          sx={{ mt: 3, width: "100%" }}
          inputProps={{ maxLength: 50 }}
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
        />
        <TextField
          multiline
          sx={{ mt: 3, width: "100%" }}
          inputProps={{ maxLength: 100 }}
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
        />
        <TextField
          multiline
          sx={{ mt: 3, width: "100%" }}
          inputProps={{ maxLength: 50 }}
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
      </DialogContent>

      <DialogActions>
        <Button className="cancelar" onClick={() => closeDialog(false)}>
          Cancelar
        </Button>
        <Button
          className="aceptar"
          onClick={() => {
            if (
              nuevoElemento.Descripcion === "" ||
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