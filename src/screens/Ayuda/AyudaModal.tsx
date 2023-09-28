import { Button, Collapse, Divider, Grid, IconButton, List, ListItemButton, ListItemText, TextField, Tooltip, Typography } from "@mui/material";
import ModalForm from "../Componentes/ModalForm";
import Ayuda from "./Ayuda";
import SliderProgress from "../Componentes/SliderProgress";
import { TooltipPersonalizado } from "../Componentes/CustomizedTooltips";
import { useState } from "react";
import { RESPONSEGUIARAPIDA, RESPONSEPREGUNTASFRECUENTES, RESPONSEVIDEOS } from "../Interfaces/UserInfo";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UploadIcon from "@mui/icons-material/Upload";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HelpIcon from "@mui/icons-material/Help";
import { VisualizadorAyudas } from "../Componentes/VisualizadorAyudas";
import SelectValues from "../Interfaces/Share";
import SelectFrag from "../Componentes/SelectFrag";
import MUIXDataGrid from "../../components/MUIXDataGrid";

export const AyudasModal = ({
    IdMenu,
    //modo,
    TabValue,
    handleClose,
    tipo,
    dt,
    open,
  }: {
    IdMenu: string;
    //modo: string;
    TabValue:string;
    tipo: number;
    handleClose: Function;
    dt: any;
    open: boolean;
  }) => {


    const [dataVideos, setDataVideos] = useState<Array<RESPONSEVIDEOS>>([]);
    const [modo, setModo] = useState<string>("");
    const [URLVideo, setURLVideo] = useState<string>("");
    // const [open, setOpen] = React.useState(false);
    const [openCarga, setOpenCarga] = useState(false);
    const [idMenu, setIdMenu] = useState<string>("");
    const [dataPreguntasFrecuentes, setDataPreguntasFrecuentes] = useState<Array<RESPONSEPREGUNTASFRECUENTES>>([]);
    const [openMenu, setOpenMenu] = useState(-1);
    const [dataGuiaRapida, setDataGuiaRapida] = useState<Array<RESPONSEGUIARAPIDA>>([]);
    const [menus, setMenus] = useState<SelectValues[]>([]);
    
    const [newVideo, setNewVideo] = useState(Object);
    const [nombreArchivo, setNombreArchivo] = useState("");
    const [pregunta, setPregunta] = useState("");
    const [respuesta, setRespuesta] = useState("");


    // function enCambioFile(event: any) {
    //   setslideropen(true);
    //   if (
    //     event?.target?.files[0] &&
    //     event.target.files[0].type.split("/")[0] == "video"
    //   ) {
    //     setNombreArchivo(event?.target?.value?.split("\\")[2]);
    //     let file = event?.target!?.files[0]!;
    //     setVideoPreview(URL.createObjectURL(event.target.files[0]));
    //     setNewVideo(file);
    //     setslideropen(false);
    //   } else if (
    //     event?.target?.files[0] &&
    //     event.target.files[0].type == "application/pdf"
    //   ) {
    //     setNombreArchivo(event?.target?.value?.split("\\")[2]);
    //     let file = event?.target!?.files[0]!;
    //     setVideoPreview(URL.createObjectURL(event.target.files[0]));
    //     setNewVideo(file);
    //     setslideropen(false);
    //   } else {
    //     Swal.fire("¡No es un archivo valido!", "", "warning");
    //     setslideropen(false);
    //   }
    //   setslideropen(false);
    // }
    // const handleSend = () => {
    //   setOpenCarga(true);
    // };
  
    // const loadFilter = (operacion: number) => {
    //   let data = { NUMOPERACION: operacion };
    //   ShareService.SelectIndex(data).then((res) => {
    //     if (operacion == 42) {
    //       setMenus(res.RESPONSE);
    //       if (value == "pregunta") {
    //         consulta(IdMenu ? IdMenu : idMenu == "false" ? "" : idMenu, "4");
    //       }
    //       if (value == "guia") {
    //         consulta(IdMenu ? IdMenu : idMenu == "false" ? "" : idMenu, "11");
    //       }
    //       if (value == "video") {
    //         consulta(IdMenu ? IdMenu : idMenu == "false" ? "" : idMenu, "12");
    //       }
    //     }
    //   });
    // };
  
    // const SaveVideo = (cerrar: boolean) => {
    //   ValidaSesion();
    //   setVideoPreview("");
    //   setslideropen(true);
    //   console.log("Save Video");
    //   console.log(newVideo);
    //   const formData = new FormData();
    //   formData.append("NUMOPERACION", value == "video" ? "1" : "2");
    //   formData.append("VIDEO", newVideo, nombreArchivo);
    //   formData.append("PREGUNTA", pregunta);
    //   formData.append("CHUSER", user.Id);
    //   formData.append("CHID", idMenu);
    //   formData.append("NAME", nombreArchivo);
    //   formData.append("TOKEN", JSON.parse(String(getToken())));
    //   console.log(formData);
  
    //   let config = {
    //     method: "post",
    //     maxBodyLength: Infinity,
    //     url: process.env.REACT_APP_APPLICATION_BASE_URL + "AdminAyudas",
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       "X-Requested-With": "XMLHttpRequest",
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //     data: formData,
    //   };
  
    //   axios
    //     .request(config)
    //     .then((res) => {
    //       if (res.data.SUCCESS || res.data.RESPONSE) {
    //         Toast.fire({
    //           icon: "success",
    //           title: "Archivo Cargado ",
    //         });
    //         if (cerrar) {
    //           handleClose();
    //         } else {
    //           handleLimpiaCampos();
    //           if (value == "pregunta") {
    //             consulta(IdMenu ? IdMenu : idMenu == "false" ? "" : idMenu, "4");
    //           }
    //           if (value == "guia") {
    //             consulta(IdMenu ? IdMenu : idMenu == "false" ? "" : idMenu, "11");
    //           }
    //           if (value == "video") {
    //             consulta(IdMenu ? IdMenu : idMenu == "false" ? "" : idMenu, "12");
    //           }
    //         }
  
    //         setslideropen(false);
    //         setNombreArchivo("");
    //         setNewVideo(null);
    //       }
    //       if (!res.data.SUCCESS) {
    //         Toast.fire({
    //           icon: "error",
    //           title: "Error Carga de Archivo",
    //         });
    //         if (cerrar) {
    //           handleClose();
    //         } else {
    //           handleLimpiaCampos();
    //         }
  
    //         setslideropen(false);
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       setslideropen(false);
    //     });
  
    //   // handleClose();
    // };
  
    // const consulta = (idMenu: string, numOp: string) => {
    //   setslideropen(true);
  
    //   let data = {
    //     NUMOPERACION: numOp,
    //     CHID: idMenu == "false" ? "" : idMenu,
    //   };
  
    // }




    

    // const handleCloseModal = () => {
    //   setOpen(false);
    // };

    const handleFilterChange2 = (v: string) => {
      setIdMenu(v);
      // if (value == "pregunta") {
      //   consulta(IdMenu ? IdMenu : v == "false" ? "" : v, "4");
      // }
      // if (value == "guia") {
      //   consulta(IdMenu ? IdMenu : v == "false" ? "" : v, "11");
      // }
      // if (value == "video") { 
      //   consulta(IdMenu ? IdMenu : v == "false" ? "" : v, "12");
      // }
    };


    return (
      <ModalForm title={modo} handleClose={handleClose}>
        
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={12} md={6.5} lg={8.2}>
          <Typography variant="h6">Menú</Typography>
          <SelectFrag
            value={IdMenu ? IdMenu : idMenu}
            options={menus}
            onInputChange={handleFilterChange2}
            placeholder={"Seleccione Menú"}
            disabled={!!IdMenu}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={5.5}
          lg={3.8}
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          paddingTop={3}
        >
          {TabValue !== "Preguntas" ? (
            <Button
              hidden
              disabled={modo == "Editar Nombre Video" || !TabValue}
              component="label"
              className="cancelar"
            >
              Seleccionar {TabValue}
              <input
                hidden
                accept={TabValue == "Videos" ? "video/*" : "application/pdf"}
                // onChange={(v) => {
                //   enCambioFile(v);
                // }}
                type="file"
              />
            </Button>
          ) : (
            ""
          )}

          {TabValue == "Videos" ? (
            <>
              <Button
                disabled={
                  !idMenu || idMenu == "false" || !nombreArchivo //||
                  // !newVideo ||
                  // !TabValueDepartamento
                }
                className="guardar"
                // onClick={() => SaveVideo(false)}
              >
                Guardar
              </Button>
              {IdMenu ? (
                <Button
                  disabled={
                    !idMenu || idMenu == "false" || !nombreArchivo || !newVideo
                  }
                  className="guardar"
                  // onClick={() => SaveVideo(true)}
                >
                  Guardar y cerrar
                </Button>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}

          {TabValue == "Guias" ? (
            <>
              <Button
                // disabled={
                //   !idMenu ||
                //   idMenu == "false" ||
                //   !nombreArchivo ||
                //   !pregunta //||
                //  // !newVideo ||
                //  // !TabValueDepartamento
                // }
                className="guardar"
                // onClick={() => SaveVideo(false)}
              >
                Guardar
              </Button>
              {IdMenu ? (
                <Button
                  disabled={
                    !idMenu ||
                    idMenu == "false" ||
                    !nombreArchivo ||
                    !pregunta ||
                    !newVideo
                  }
                  className="guardar"
                  // onClick={() => SaveVideo(true)}
                >
                  Guardar y cerrar
                </Button>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}

          {TabValue == "Preguntas" ? (
            <>
              <Button
                disabled={
                  !idMenu ||
                  idMenu == "false" ||
                  // !TabValueDepartamento ||
                  !pregunta ||
                  !respuesta
                }
                className="guardar"
                // onClick={() => SavePreguntasFrecuentes(false)}
              >
                Guardar
              </Button>
              {IdMenu ? (
                <Button
                  disabled={
                    !idMenu || idMenu == "false" || !pregunta || !respuesta
                  }
                  className="guardar"
                  // onClick={() => SavePreguntasFrecuentes(true)}
                >
                  Guardar y cerrar
                </Button>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </Grid>
      </Grid>

      {TabValue == "Videos" || TabValue == "Guias" ? (
        <>
          <Grid container>
            <Grid>
              <Typography variant="h6">Nombre del archivo: </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
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
          {TabValue == "Guias" ? (
            <Grid container>
              <Grid>
                <Typography variant="h6">
                  Pregunta / Titulo de guia:{" "}
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
                  onChange={(v) => setPregunta(v.target.value)}
                  sx={{ paddingBottom: "10px" }}
                />
              </Grid>
            </Grid>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}

      {TabValue == "Preguntas" ? (
        <>
          <Grid container>
            <Grid>
              <Typography variant="h6">Pregunta</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
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

          <Grid container>
            <Grid>
              <Typography variant="h6">Respuesta</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
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
          {/* <Grid item xs={12}>
            <MUIXDataGrid columns={columnsPreguntas} rows={preguntas} />
          </Grid> */}
        </>
      ) : (
        ""
      )}

      {/* {value == "video" || value == "guia" ? (
        <Grid container>
          <Grid item xs={12}>
            <MUIXDataGrid
              columns={value == "video" ? columnsVideo : columnsGuia}
              rows={preguntas}
            />
          </Grid>
          <div className="containerModalCargarVideos">
            <div className="containerPreVisualizarVideo">
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Grid className="contenedorDeReproductorVideo" item xs={12}>
                  {value == "video" ? (
                    <video
                      loop
                      autoPlay
                      width={"100%"}
                      height={"100%"}
                      hidden={
                        modo == "Editar Nombre Video" ||
                        videoPreview?.length == 0
                      }
                      src={videoPreview}
                      id="videoPlayer"
                      controls
                    />
                  ) : (
                    <object
                      className="responsive-iframe"
                      data={videoPreview}
                      type="text/html"
                    ></object>
                  )}
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
      ) : (
        ""
      )} */}
      <Grid>
    </Grid>



      </ModalForm>





    );
  };
  
  export default AyudasModal;
  