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
    handleClose,
    tipo,
    dt,
    open,
  }: {
    IdMenu: string;
    //modo: string;
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
    const [value, setValue] = useState("");
    const [newVideo, setNewVideo] = useState(Object);
    const [nombreArchivo, setNombreArchivo] = useState("");
    const [pregunta, setPregunta] = useState("");
    const [respuesta, setRespuesta] = useState("");





    

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
          {value !== "pregunta" ? (
            <Button
              hidden
              disabled={modo == "Editar Nombre Video" || !value}
              component="label"
              className="cancelar"
            >
              Seleccionar {value}
              <input
                hidden
                accept={value == "video" ? "video/*" : "application/pdf"}
                // onChange={(v) => {
                //   enCambioFile(v);
                // }}
                type="file"
              />
            </Button>
          ) : (
            ""
          )}

          {value == "video" ? (
            <>
              <Button
                disabled={
                  !idMenu || idMenu == "false" || !nombreArchivo //||
                  // !newVideo ||
                  // !valueDepartamento
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

          {value == "guia" ? (
            <>
              <Button
                // disabled={
                //   !idMenu ||
                //   idMenu == "false" ||
                //   !nombreArchivo ||
                //   !pregunta //||
                //  // !newVideo ||
                //  // !valueDepartamento
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

          {value == "pregunta" ? (
            <>
              <Button
                disabled={
                  !idMenu ||
                  idMenu == "false" ||
                  // !valueDepartamento ||
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

      {value == "video" || value == "guia" ? (
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
          {value == "guia" ? (
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

      {/* {value == "pregunta" ? (
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
          <Grid item xs={12}>
            <MUIXDataGrid columns={columnsPreguntas} rows={preguntas} />
          </Grid>
        </>
      ) : (
        ""
      )} */}

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
  