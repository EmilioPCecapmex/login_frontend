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
import { EliminarCatalogo } from "../../services/catalogosService";
import { IModify } from "./Create";

export const Delete = ({
  open,
  setOpen,
  Id,
  catalogo,
  reloadData,
}: {
  open: boolean;
  setOpen: Function;
  Id: string;
  catalogo: string;
  reloadData: Function;
}) => {
  //------------------------CATALOGOS-------------------------------------------

  const [ruta, setRuta] = useState("");

  useEffect(() => {
    switch (catalogo) {
      case "TipoEntidades":
        setRuta("eliminar-tipo-entidad");
        break;
      case "Entidades":
        setRuta("eliminar-entidad");
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
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
        {" "}
        ¿Deseas eliminar este elemento?
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      ></DialogContent>
      <DialogActions>
        <Button className="cancelar" onClick={() => setOpen(false)}>
          Cancelar
        </Button>
        <Button
          className="aceptar"
          onClick={() => {
            EliminarCatalogo(ruta, Id, setOpen, reloadData);
          }}
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
