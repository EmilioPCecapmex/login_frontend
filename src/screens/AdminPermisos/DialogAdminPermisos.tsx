import { Button, Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { alertaError } from "../../components/alertas/toast";
import { createAdminPermiso, editarPermiso } from "./AdminPermisosServices";

export interface IElemento {
  Id: string;
  Permiso: string;
  IdMenu: string;
  Descripcion: string;
  ControlInterno: string;
  IdUsuario: string;
  IdApp: string;
}

export const DialogAdminPermisos = (
  {
    open,
    closeDialog,
    IdApp,
    movimiento,
    Menu,
    IdMenu,
    reloadData,
  }: {
    open: boolean;
    closeDialog: Function;
    IdApp: string;
    movimiento: string;
    Menu: string;
    IdMenu: string;
    reloadData: IElemento;
  }
) => {

  const elementoVacio = {
    Id: "",
    Permiso: "",
    IdMenu: "",
    Descripcion: "",
    ControlInterno: "",
    IdUsuario: "",
    IdApp: "",
  };

  const [nuevoElemento, setNuevoElemento] = useState<IElemento>({
    ...elementoVacio,
    IdUsuario: localStorage.getItem("IdUsuario") || "",
    IdApp: IdApp, IdMenu: IdMenu,
  });


  useEffect(() => {
    if (reloadData && movimiento === "Editar") {
      setNuevoElemento(
        {
          ...reloadData,
          IdUsuario: localStorage.getItem("IdUsuario") || "",
          IdApp: IdApp, IdMenu: IdMenu
        }
      )
    }
  }, []);

  function sendRequest() {

    switch (movimiento) {
      case "Editar":
        editarPermiso(nuevoElemento, closeDialog);
        break;
      case "Agregar":
        createAdminPermiso(nuevoElemento, closeDialog);
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
          inputProps={{ maxlength: 200 }}
          title="Permiso"
          label="Nombre de Permiso"
          placeholder="Nombre de Permiso"
          value={nuevoElemento.Permiso || ""}
          onChange={(v) => {
            setNuevoElemento({
              ...nuevoElemento,
              Permiso: v.target.value.replaceAll("'", "").replaceAll('"', ""),
            });
          }}
        />
        <TextField
          multiline
          sx={{ mt: 3, width: "100%" }}
          inputProps={{ maxlength: 200 }}
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
          inputProps={{ maxlength: 50 }}
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
            // createCatalogo(ruta, { ...nuevoElemento }, setOpen, reloadData)
            if (
              nuevoElemento.Descripcion === "" ||
              nuevoElemento.Permiso === "" ||
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