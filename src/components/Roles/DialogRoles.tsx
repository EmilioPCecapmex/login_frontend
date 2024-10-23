import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { alertaError } from "../alertas/toast";
import { IRol } from "./Roles";
import { createRol, deleteRol, modifyRol } from "./RolesServices";

interface IElemento {
  Id: string;
  Nombre: string;
  Descripcion: string;
  ControlInterno: string;
  IdUsuario: string;
  IdApp: string;
}

export const DialogRoles = ({
  open,
  closeDialog,
  movimiento,
  reloadData,
  IdApp,
}: {
  open: boolean;
  closeDialog: Function;
  movimiento: string;
  reloadData: IRol;
  IdApp: string;
}) => {
  const elementoVacio = {
    Id: "",
    Nombre: "",
    Descripcion: "",
    ControlInterno: "",
    IdUsuario: "",
    IdApp: "",
  };

  const [nuevoElemento, setNuevoElemento] = useState<IElemento>({
    ...elementoVacio,
    IdUsuario: localStorage.getItem("IdUsuario") || "",
    IdApp: IdApp,
  });

  useEffect(() => {
    if (reloadData && (movimiento === "Editar" || movimiento === "Eliminar")) {
      setNuevoElemento({
        ...reloadData,
        IdUsuario: localStorage.getItem("IdUsuario") || "",
        IdApp: IdApp,
      });
    }
  }, []);

  function sendRequest() {
    switch (movimiento) {
      case "Editar":
        modifyRol(nuevoElemento, closeDialog);
        break;
      case "Agregar":
        createRol(nuevoElemento, closeDialog);
        break;
      case "Eliminar":
        deleteRol(nuevoElemento, closeDialog);
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
      <DialogTitle>{movimiento.toUpperCase() + " " + "ELEMENTO:"}</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
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
          InputProps={{ readOnly: movimiento === "eliminar" }}
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
          InputProps={{ readOnly: movimiento === "eliminar" }}
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
          InputProps={{ readOnly: movimiento === "eliminar" }}
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
              nuevoElemento.Nombre === "" ||
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
};
