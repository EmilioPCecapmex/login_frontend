import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IPerfil } from "./Perfiles";
import { alertaError } from "../alertas/toast";
import {
  createPerfiles,
  deletePerfiles,
  modifyPerfiles,
} from "./PerfilesServices";

export interface IElemento {
  Id: string;
  Descripcion: string;
  Referencia: string;
  IdUsuario: string;
  IdApp: string;
}

export const PerfilDialog = ({
  open,
  closeDialog,
  movimiento,
  reloadData,
  IdApp,
}: {
  open: boolean;
  closeDialog: Function;
  movimiento: string;
  reloadData: IPerfil;
  IdApp: string;
}) => {
  const elementoVacio = {
    Id: "",
    Descripcion: "",
    Referencia: "",
    IdUsuario: "",
    IdApp: "",
  };

  const [nuevoElemento, setNuevoElemento] = useState<IElemento>({
    ...elementoVacio,
    IdUsuario: localStorage.getItem("IdUsuario") || "",
    IdApp: IdApp,
  });

  useEffect(() => {
    if (reloadData && (movimiento === "editar" || movimiento === "eliminar")) {
      setNuevoElemento({
        ...reloadData,
        IdUsuario: localStorage.getItem("IdUsuario") || "",
        IdApp: IdApp,
      });
    }
  }, []);

  function sendRequest() {
    switch (movimiento) {
      case "editar":
        modifyPerfiles(nuevoElemento, closeDialog);
        break;
      case "agregar":
        createPerfiles(nuevoElemento, closeDialog);
        break;
      case "eliminar":
        deletePerfiles(nuevoElemento, closeDialog);
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
          title="Descripcion"
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
          title="Referencia"
          label="Referencia"
          placeholder="Referencia"
          value={nuevoElemento.Referencia || ""}
          onChange={(v) => {
            setNuevoElemento({
              ...nuevoElemento,
              Referencia: v.target.value
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
              nuevoElemento.Referencia === ""
            ) {
              alertaError("Captura todos los datos");
            } else {
              sendRequest();
            }
          }}
        >
          {movimiento.toUpperCase()}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
