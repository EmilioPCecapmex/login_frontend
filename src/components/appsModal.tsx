import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Card, CardContent, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { getUserDetail } from "../screens/Login/Login";
import { DialogMantenimiento } from "./dialogMantenimiento/DialogMantenimiento";
import { useState } from "react";

export default function AppsModal({
  openM,
  closeM,
  type,
  text,
  apps,
  idUsuario
}: {
  openM: boolean;
  closeM: Function;
  type: string;
  text: string;
  apps: Object;
  idUsuario: string;
}) {
  const navigate = useNavigate();

  const[openDialogMantenimiento,setOpenDialogMantenimiento]=useState(false)

  const handleCloseDialogMantenimiento=()=>{
    setOpenDialogMantenimiento(false)
  }

  const closeModal = () => {
    closeM();
  };

  const openPage = (t: string, idapp: string) => {
    closeM();
    if (t !== "./admin") {
      window.location.replace(
        t +
        "?jwt=" +
        localStorage.getItem("jwtToken") +
        "&rf=" +
        localStorage.getItem("refreshToken") +
        "&IdApp=" +
        idapp
      );
      // localStorage.clear();
    } else if (t === "./admin") {
      getUserDetail(localStorage.getItem("IdUsuario") || "", idapp);
      localStorage.setItem("IdApp", idapp)
      navigate(t);
    }
  };
  return (
    <>
      <Dialog open={openM} fullScreen>
        <Grid
          container
          sx={{
            display: "flex",
            maxHeightheight: "100vh",
            maxWidthwidth: "100vw",
          }}
        >
          <Grid
            className="logoLogin"
            container
            item
            xl={12}
            xs={12}
            lg={12}
            md={12}
            sm={12}
            justifyContent="center"
            alignItems="flex-end"
            sx={{ maxHeight: "12vh" }}
          >
            <img
              src={logo}
              style={{ objectFit: "fill", width: "100%", height: "100%" }}
            />
          </Grid>

          <Grid
            container
            className="ApssLoginElementos"
            item
            xl={12}
            xs={12}
            lg={12}
            md={12}
            sm={12}
            sx={{ bgcolor: "#EEEEEE", height: "78vh" }}
            paddingTop={1}
            paddingBottom={5}
          >
            <Typography
              variant="h5"
              className="NombreApp"
              sx={{ width: "100%", height: "10vh" }}
            >
              Favor de seleccionar la plataforma a la que deseas ingresar
            </Typography>

            <Grid
              item
              container
              paddingTop={3}
              spacing={{ xs: 2, md: 3 }}
              justifyContent={"space-evenly"}
              sx={{
                display: "flex",
                overflowY: "auto",
                maxHeight: "65vh",
                minHeight: "65vh",
              }}
            >
              {Object.values(apps)?.map((item, index) => {
                console.log('app', item);
                console.log('index', index);

                return (
                  <>
                    <Grid
                      item
                      xl={5}
                      xs={8}
                      lg={5}
                      md={5}
                      sm={8}
                      key={item.IdApp}
                      sx={{ justifyContent: "space-evenly" }}
                      onClick={() => {
                        item.EstaActivo === 1 ? openPage(item.Path, item.IdApp) : setOpenDialogMantenimiento(true);
                      }}
                    >
                      <Card className="GridAplicacionesAcceso">
                        <CardContent
                          className="GridAplicacionesAcceso"
                          sx={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                paddingTop: "3%",
                              }}
                            >
                              <Box sx={{ width: "95%", height: "200px" }}>
                                <Typography
                                  variant="h5"
                                  className="NombreApp"
                                  sx={{
                                    // whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    // textOverflow: "ellipsis",
                                  }}
                                >
                                  {item?.Nombre}
                                </Typography>
                                <Typography
                                  variant="h5"
                                  className="DescripcionApp"
                                  sx={{
                                    // whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    // textOverflow: "ellipsis",
                                  }}
                                >
                                  {item?.Descripcion}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </Grid>

          <Grid
            item
            xl={12}
            xs={12}
            lg={12}
            md={12}
            sm={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "10vh",
            }}
          >
            <Button
              className="cancelarAppLogin"
              onClick={() => closeModal()}
              startIcon={<ArrowBackIcon />}
            >
              Regresar
            </Button>
          </Grid>
        </Grid>
      </Dialog>
      <DialogMantenimiento open={openDialogMantenimiento} handleClose={handleCloseDialogMantenimiento}/>
    </>
  );
}

export interface Usuario {
  Id: string;
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  NombreUsuario: string;
  CorreoElectronico: string;
  UltimoInicioDeSesion: string;
  EstaActivo: number;
  CreadoPor: string;
  ModificadoPor: string;
  Deleted: number;
  NombreCreadoPor: string;
  NombreModificadoPor: string;
}
