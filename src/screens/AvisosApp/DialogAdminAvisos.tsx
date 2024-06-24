import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { alertaError } from "../../components/alertas/toast";
import CustomizedDate from "../Componentes/CustomizedDate";
import { createAdminAvisos, editarAviso } from "./AdminAvisosServices";
import { GridCloseIcon } from "@mui/x-data-grid";

export const DialogAdminAvisos = ({
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
  reloadData: any;

}) => {


  const [content, setContent] = useState("");
  const [FInicio, setFInicio] = useState<Dayjs | null>();
  const [FFin, setFFin] = useState<Dayjs | null>();
  const [Titulo, setTitulo] = useState("");

  const handleChange = (v: any) => {
    setContent(v);
  };
  const handleFilterFInicio = (v: any) => {
    setFInicio(v);
  };
  const handleFilterFFin = (v: any) => {
    setFFin(v);
  };

  function sendRequest() {
    let obj = {
      FechaFin: FFin ? dayjs(FFin).format('YYYY-MM-DD HH:mm:ss') : null,
      FechaInicio: FInicio ? dayjs(FInicio).format('YYYY-MM-DD HH:mm:ss') : null,
      Id: movimiento === 'Editar' ? reloadData.Id || "" : '',
      IdApp: IdApp,
      IdUsuario: localStorage.getItem("IdUsuario") || "",
      TextoInc: content,
      Titulo: Titulo
    }
    switch (movimiento) {

      case "Editar":
        editarAviso(obj, closeDialog);
        break;
      case "Agregar":
        createAdminAvisos(obj, closeDialog);
        break;
      default:
        alertaError();
    }
  }

  useEffect(() => {

    if (Object.keys(reloadData).length === 0) {

    } else {
      setContent(reloadData?.TextoInc);
      setFInicio(dayjs(reloadData?.FechaInicio, 'DD-MM-YYYY'));
      setFFin(dayjs(reloadData?.FechaFin, 'DD-MM-YYYY'));
      setTitulo(reloadData?.Titulo);

    }
  }, []);

  return (

    <Dialog
      open={open}
      onClose={() => {
        closeDialog(false);
      }}
      maxWidth={"xl"}
    >
      {/* <DialogTitle sx={{display:"flex",width:"100%", justifyContent:"space-between"}}>
        {`${movimiento} Aviso`} 
        <GridCloseIcon/>
      </DialogTitle> */}

      <DialogContent sx={{ minHeight:"600px",mt:"1vh" }}>

        <Grid container spacing={2} sx={{ padding: "2%", display: "flex", flexDirection: ["column-reverse", "column-reverse", "row"] }}>
          <Grid item
            xl={9}
            xs={12}
            lg={9}
            md={9}
            sm={12}>
            <ReactQuill
              value={content || ""}
              theme="snow" // Tema del editor ('snow' o 'bubble')       
              modules={{
                toolbar: [
                  [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                  [{ size: [] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{ 'list': 'ordered' }, { 'list': 'bullet' },
                  { 'indent': '-1' }, { 'indent': '+1' }],
                  ['link', 'image', 'video'],
                  ['clean']],
              }}
              formats={[
                'header', 'font', 'size',
                'bold', 'italic', 'underline', 'strike', 'blockquote',
                'list', 'bullet', 'indent',
                'link', 'image', 'video'
              ]}
              onChange={handleChange}
              style={{ height: '500px' }} // Ajusta la altura del editor según tus necesidades
              placeholder="Escribe algo aquí..."      // Agrega estilos personalizados para las imágenes dentro del editor  
            />
          </Grid>
          <Grid item
            xl={3}
            xs={12}
            lg={3}
            md={3}
            sm={12}>
            <Grid item
              xl={12}
              xs={12}
              lg={12}
              md={12}
              sm={12}>
              <TextField
                multiline
                inputProps={{ maxLength: 200 }}
                sx={{ mt: 3, width: "100%" }}
                title="Titulo"
                label="Título"
                placeholder="Título"
                value={Titulo}
                onChange={(v) => { setTitulo(v.target.value) }}
              />
            </Grid>

            <Grid item container
              xl={12}
              xs={12}
              lg={12}
              md={12}
              sm={12} sx={{ display: "flex", flexDirection: ["column", "row", "column",], mt: "1vh" }}>
              <Grid item
                xl={12}

                lg={12}
                md={6}
                sm={6} xs={12}>
                <CustomizedDate
                  value={FInicio}
                  label={"Fecha Inicio"}
                  onchange={
                    handleFilterFInicio
                  }
                  disabled={false}
                />
              </Grid>
              <Grid item
                xl={12}

                lg={12}
                md={6}
                sm={6} xs={12}>
                <CustomizedDate
                  value={FFin}
                  label={"Fecha Fin"}
                  onchange={handleFilterFFin}
                  disabled={false}
                />
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </DialogContent>

      <DialogActions>
        <Button className="cancelar" onClick={() => closeDialog(false)}>
          Cancelar
        </Button>
        <Button
          className="aceptar"
          onClick={() => { sendRequest(); }}
        >
          {movimiento}
        </Button>
      </DialogActions>
    </Dialog>


  );


}