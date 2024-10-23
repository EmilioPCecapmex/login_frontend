import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { alertaError } from "../../components/alertas/toast";
import CustomizedDate from "../Componentes/CustomizedDate";
import { createAdminAvisos, editarAviso } from "./AdminAvisosServices";
import { GridCloseIcon } from "@mui/x-data-grid";
import { getListas } from "../../services/catalogosService";
import { ILista, newILista } from "../Ayuda/AyudaModal";

export const DialogAdminAvisos = ({
  open,
  closeDialog,
  IdApp,
  App,
  movimiento,
  reloadData,

}: { 
  open: boolean;
  closeDialog: Function;
  IdApp: string;
  App:string;
  movimiento: string;
  reloadData: any;

}) => {


  const [content, setContent] = useState("");
  const [FInicio, setFInicio] = useState<Dayjs | null>();
  const [FFin, setFFin] = useState<Dayjs | null>();
  const [Titulo, setTitulo] = useState("");
  const [apps, setApps] = useState<ILista[]>([]);
  const [appsSelected, setAppsSelected] = useState<ILista[]>([]);

 
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
    if (FInicio) {
      if (FInicio.isAfter(FFin)) {
        alertaError("¡Rango de fechas no válido!")

      } else {
        let obj = {
          FechaFin: FFin ? dayjs(FFin).format('YYYY-MM-DD HH:mm:ss') : null,
          FechaInicio: FInicio ? dayjs(FInicio).format('YYYY-MM-DD HH:mm:ss') : null,
          Id: movimiento === 'Editar' ? reloadData.Id || "" : '',
          Apps: JSON.stringify(appsSelected),
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

    }

  }

  useEffect(() => {
    getListas("Aplicaciones", "", setApps)
    if (Object.keys(reloadData).length === 0) {

    } else {
      setContent(reloadData?.TextoInc);
      setFInicio(dayjs(reloadData?.FechaInicio, 'DD-MM-YYYY'));
      setFFin(dayjs(reloadData?.FechaFin, 'DD-MM-YYYY'));
      setTitulo(reloadData?.Titulo);

    }

    if(App!=='' && IdApp!==''){
      setAppsSelected([{Label:App,Id:IdApp}])
    }
  }, []);

  return (

    <Dialog
    open={open}
    onClose={() => {
      closeDialog(false);
    }}
    maxWidth={"xl"}
    fullWidth={true}
    sx={{
      '& .MuiDialog-paper': {
        width: ['100vw', '100vw', '80vw'], // Ajuste responsivo del ancho
      },
    }}
  >
    <DialogContent sx={{ minHeight: "600px", mt: "1vh" }}>
      <Grid container spacing={2} sx={{ padding: "2%", display: "flex", flexDirection: ["column-reverse", "column-reverse", "row"] }}>
        <Grid item xl={8} xs={12} lg={8} md={8} sm={12}>
          <ReactQuill
            value={content || ""}
            theme="snow"
            modules={{
              toolbar: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                ['link', 'image', 'video'],
                ['clean'],
              ],
            }}
            formats={[
              'header', 'font', 'size',
              'bold', 'italic', 'underline', 'strike', 'blockquote',
              'list', 'bullet', 'indent',
              'link', 'image', 'video',
            ]}
            onChange={handleChange}
            style={{ height: '500px' }}
            placeholder="Escribe algo aquí..."
          />
        </Grid>
        <Grid item xl={4} xs={12} lg={4} md={4} sm={12}>
          <Grid item xl={12} xs={12} lg={12} md={12} sm={12}>
            <Typography variant="body2"> Aplicacion/es: </Typography>
            <Autocomplete
              noOptionsText="No se encontraron opciones"
              multiple
              
              clearText="Borrar"
              closeText="Cerrar"
              openText="Abrir"
              options={apps}
              getOptionLabel={(app) => app.Label}
              value={appsSelected}
              onChange={(event, v) => {
                if (v != null) {
                  setAppsSelected(v);
                }
              }}
              renderInput={(params) => (
                <TextField key={params.id} {...params} variant="outlined" sx={{ width: '100%',maxHeight:'200px', overflow:'auto'}} />
              )}
              isOptionEqualToValue={(option, value) =>
                option.Label === value.Label || value.Label === ""
              }
             
            />
          </Grid>
          <Grid item xl={12} xs={12} lg={12} md={12} sm={12}>
            <TextField
              multiline
              inputProps={{ maxLength: 200 }}
              sx={{ mt: 3, width: "100%" }}
              title="Titulo"
              label="Título"
              placeholder="Título"
              value={Titulo}
              onChange={(v) => { setTitulo(v.target.value); }}
            />
          </Grid>
  
          <Grid item container xl={12} xs={12} lg={12} md={12} sm={12} sx={{ display: "flex", flexDirection: ["column", "row", "column"], mt: "1vh" }}>
            <Grid item xl={12} lg={12} md={6} sm={6} xs={12}>
              <CustomizedDate
                value={FInicio}
                label={"Fecha Inicio"}
                onchange={handleFilterFInicio}
                disabled={false}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={6} sm={6} xs={12}>
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