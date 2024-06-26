import { Autocomplete, Button, Grid, TextField, Typography } from "@mui/material";
import ModalForm from "../Componentes/ModalForm";
import SliderProgress from "../Componentes/SliderProgress";
import { useEffect, useState } from "react";
import { createAyuda, getMenus, saveFile } from "./ServicesAyuda";
import { alertaError } from "../../components/alertas/toast";

export interface ILista {
  Id: string;
  Label: string;
}

export const newILista={ Id: "", Label: "" }

export interface Tabla {
  Opcion: string;
  IdMenu: string;
}

export interface IFile { archivo: File; nombreArchivo: string }

export const AyudasModal = ({
  TabValue,
  handleClose,
}: {
  TabValue: string;
  handleClose: Function;
}) => {

  const [menu, setMenu] = useState<ILista>({ Id: "", Label: "" });
  const [menus, setMenus] = useState<ILista[]>([]);

  const [newVideo, setNewVideo] = useState<File>(new File([], ""));
  const [nombreArchivo, setNombreArchivo] = useState("");
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState("");

  const [videoPreview, setVideoPreview] = useState("");
  const [slideropen, setslideropen] = useState(false);

  function enCambioFile(event: any) {
    if (
      event?.target?.files[0] &&
      event.target.files[0].type.split("/")[0] === "video"
    ) {
      setNombreArchivo(event?.target?.value?.split("\\")[2]);
      let file = event?.target!?.files[0]!;
      setNewVideo(file);
      setVideoPreview(URL.createObjectURL(event.target.files[0]));

    } else if (
      event?.target?.files[0] &&
      event.target.files[0].type === "application/pdf"
    ) {
      setNombreArchivo(event?.target?.value?.split("\\")[2]);
      let file = event?.target!?.files[0]!;
      setVideoPreview(URL.createObjectURL(event.target.files[0]));

      setNewVideo(file);
    } else {
      alertaError("¡No es un archivo valido!")

    }
  }

  useEffect(() => { getMenus(setMenus) }, [])

  return (

    <ModalForm title="Administración de Ayudas" handleClose={handleClose}>
      <SliderProgress open={slideropen} texto={"Cargando..."}></SliderProgress>
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid
          container
          item
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          direction="row"
          justifyContent="center"
          alignItems="center"

        >
          <Grid item
            xl={7}
            lg={7}
            md={7}
            sm={7}
            xs={11}>
            <Typography variant="h6">Menú</Typography>
            <Autocomplete
              noOptionsText="No se encontraron opciones"
              clearText="Borrar"
              closeText="Cerrar"
              openText="Abrir"
              options={menus}
              getOptionLabel={(menu) =>
                menu.Label || "Seleccione Menú"
              }
              value={menu}
              onChange={(event, newValue) => {
                if (newValue != null) {
                  setMenu(newValue);
                }
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

          <Grid
            item
            xl={4}
            lg={4}
            md={4}
            sm={4}
            xs={11}
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            paddingTop={3}
          >


            {TabValue !== "Preguntas" ? (

              <Button
                variant="contained"
                className="aceptar"
                component="label"
                sx={{textTransform:"none"}}
              >
                Seleccionar {TabValue === "Videos" ? "Video" : "Guía"}
                <input
                  hidden
                  accept={TabValue === "Videos" ? "video/*" : "application/pdf"}
                  onChange={(v) => {
                    enCambioFile(v);
                  }}
                  type="file"
                />
              </Button>

            ) : (
              ""
            )}

            {TabValue === "Videos" && nombreArchivo !== '' ? (
              <>
                <Button
                  sx={{textTransform:"none"}}
                  className="aceptar"
                  onClick={() => {
                    if (menu.Id !== "") {
                      setslideropen(true)

                      saveFile(TabValue, { nombreArchivo: nombreArchivo, archivo: newVideo }, menu.Id, pregunta, respuesta, handleClose);

                    }
                    else {
                      alertaError("Seleccione un menú")
                    }
                  }

                  }
                >
                  Guardar
                </Button>
              </>
            ) : (
              ""
            )}

            {TabValue === "Guias" && nombreArchivo !== '' ? (
              <>
                <Button

                  className="aceptar"
                  onClick={() => {
                    if (menu.Id !== "") {
                      if (pregunta !== "") {
                        setslideropen(true)

                        saveFile(TabValue, { nombreArchivo: nombreArchivo, archivo: newVideo }, menu.Id, pregunta, respuesta, handleClose)
                      }
                      else {
                        alertaError("Escriba título de guía")
                      }
                    }
                    else {
                      alertaError("Seleccione un menú")
                    }
                  }

                  }
                >
                  Guardar
                </Button>
              </>
            ) : (
              ""
            )}

            {TabValue === "Preguntas" ? (
              <>
                <Button

                  className="cancelar"
                  onClick={() => {
                    if (menu.Id !== "") {
                      if (pregunta !== "") {
                        if (respuesta !== "") {
                          setslideropen(true)

                          let datos = {
                            IdMenu: menu.Id,
                            Pregunta: pregunta,
                            Texto: respuesta,
                            RutaGuia: "",
                            RutaVideo: "",
                            NombreArchivo: "",
                            NombreArchivoServidor: "",
                            IdUsuario: localStorage.getItem("IdUsuario") || ""
                          }
                          createAyuda(datos, handleClose)
                        }
                        else {
                          alertaError("Escriba una respuesta")

                        }
                      }
                      else {
                        alertaError("Escriba una pregunta")
                      }
                    }
                    else {
                      alertaError("Seleccione un menú")
                    }
                  }

                  }
                >
                  Guardar Pregunta
                </Button>
              </>
            ) : null}
          </Grid>
        </Grid>

        {TabValue === "Videos" || TabValue === "Guias" ? (
          <>

            <Grid container
              xl={11}
              lg={11}
              md={11}
              sm={11}
              xs={11}>
              <Grid>
                <Typography variant="h6">Nombre del archivo: </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled
                  margin="dense"
                  id="nombreEvento"
                  value={nombreArchivo}
                  fullWidth
                  variant="outlined"
                  size="small"
                  onChange={(v) => setNombreArchivo(v.target.value)}
                  sx={{ paddingBottom: "10px" }}
                />
              </Grid>
            </Grid>
            {TabValue === "Guias" ? (
              <Grid container item
                xl={11}
                lg={11}
                md={11}
                sm={11}
                xs={11}>
                <Grid>
                  <Typography variant="h6">
                    Pregunta / Título de guia:
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    id="nombreEvento"
                    value={pregunta}
                    fullWidth
                    variant="outlined"
                    size="small"
                    inputProps={{ maxLength: 300 }}


                    onChange={(v) => setPregunta(v.target.value)}
                    sx={{ paddingBottom: "10px" }}
                  />
                </Grid>
              </Grid>
            ) : (
              ""
            )}
          </>
        ) : null}

        {TabValue === "Preguntas" ? (
          <>
            <Grid container item
              xl={11}
              lg={11}
              md={11}
              sm={11}
              xs={11}>
              <Grid>
                <Typography variant="h6">Pregunta</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputProps={{ maxLength: 300 }}
                  margin="dense"
                  id="nombreEvento"
                  value={pregunta}
                  fullWidth
                  variant="outlined"
                  size="small"
                  onChange={(v) => setPregunta(v.target.value)}
                  sx={{ paddingBottom: "10px" }}
                />
              </Grid>
            </Grid>

            <Grid container item
              xl={11}
              lg={11}
              md={11}
              sm={11}
              xs={11}>
              <Grid>
                <Typography variant="h6">Respuesta</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputProps={{ maxLength: 700 }}
                  margin="dense"
                  id="nombreEvento"
                  value={respuesta}
                  fullWidth
                  variant="outlined"
                  size="small"
                  onChange={(v) => setRespuesta(v.target.value)}
                  sx={{ paddingBottom: "10px" }}
                />
              </Grid>
            </Grid>
          </>
        ) : null}

        {TabValue === "Videos" || TabValue === "Guias" ?

          (<Grid container item height={"90vh"} width={"100vw"} sx={{ display: "flex", justifyContent: "Center", alignItems: "center" }}>

            {TabValue === "Videos" ? (
              <video
                loop
                autoPlay
                width={"98%"}
                height={"98%"}
                src={videoPreview}
                id="videoPlayer"
                controls
              />
            ) : (
              <iframe
                src={videoPreview}
                width="98%"
                height="98%"
                title="PDF Viewer"
              ></iframe>
            )}
          </Grid>) :
          null}

        <Grid>
        </Grid>
      </Grid>
    </ModalForm>
  );
};

export default AyudasModal;
