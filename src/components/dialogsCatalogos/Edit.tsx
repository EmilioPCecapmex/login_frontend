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
}: {
  open: boolean;
  setOpen: Function;
  elemento: IModify;
  catalogo: string;
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
  });

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
  }, [catalogo, open]);

  useEffect(() => {
    setNuevoElemento(elementoVacio);
  }, [catalogo]);

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
        <Typography>{ruta}</Typography>
        <Typography>
          {`${
            elemento.NombreCorto || elemento.Clave || elemento.Referencia
          } - `}
          {elemento.Nombre || elemento.Descripcion}
        </Typography>
        {["1", "4"].includes(catalogo) && (
          <TextField
            sx={{ mt: 1, width: "100%" }}
            title="Nombre"
            placeholder="Nombre"
            value={nuevoElemento.Nombre}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento,
                Nombre: v.target.value.replaceAll("'", "").replaceAll('"', ""),
              });
            }}
          />
        )}
        {["2"].includes(catalogo) && (
          <TextField
            multiline
            sx={{ mt: 1, width: "100%" }}
            title="Clave"
            placeholder="Clave"
            value={nuevoElemento.Clave}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento,
                Clave: v.target.value.replaceAll("'", "").replaceAll('"', ""),
              });
            }}
          />
        )}
        {["2", "3", "4", "5"].includes(catalogo) && (
          <TextField
            multiline
            sx={{ mt: 1, width: "100%" }}
            title="Descripcion"
            placeholder="Descripcion"
            value={nuevoElemento.Descripcion}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento,
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
            sx={{ mt: 1, width: "100%" }}
            title="Abreviatura"
            placeholder="Abreviatura"
            value={nuevoElemento.NombreCorto}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento,
                NombreCorto: v.target.value
                  .replaceAll("'", "")
                  .replaceAll('"', ""),
              });
            }}
          />
        )}
        {["1", "3"].includes(catalogo) && (
          <TextField
            multiline
            sx={{ mt: 1, width: "100%" }}
            title="Titular / Responsable"
            placeholder="Titular / Responsable"
            value={nuevoElemento.IdTitular}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento,
                IdTitular: v.target.value
                  .replaceAll("'", "")
                  .replaceAll('"', ""),
              });
            }}
          />
        )}
        {["1"].includes(catalogo) && (
          <TextField
            multiline
            sx={{ mt: 1, width: "100%" }}
            title="Pertenece A"
            placeholder="Pertenece A"
            value={nuevoElemento.PerteneceA}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento,
                PerteneceA: v.target.value
                  .replaceAll("'", "")
                  .replaceAll('"', ""),
              });
            }}
          />
        )}
        {["1"].includes(catalogo) && (
          <TextField
            multiline
            sx={{ mt: 1, width: "100%" }}
            title="Direccion"
            placeholder="Direccion"
            value={nuevoElemento.Direccion}
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
        {["4"].includes(catalogo) && (
          <TextField
            multiline
            sx={{ mt: 1, width: "100%" }}
            title="Control Interno"
            placeholder="Control Interno"
            value={nuevoElemento.ControlInterno}
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
        {["5"].includes(catalogo) && (
          <TextField
            multiline
            sx={{ mt: 1, width: "100%" }}
            title="Referencia"
            placeholder="Referencia"
            value={nuevoElemento.Referencia}
            onChange={(v) => {
              setNuevoElemento({
                ...nuevoElemento,
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
        <Button className="aceptar">Editar</Button>
      </DialogActions>
    </Dialog>
  );
};

// falta
// catalogos titulares, pertenece A, direccion,
// cambiar nombre de variable IdResponsable de /uresponsable por IdTitular como en /secretaria
