import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Grid } from "@mui/material";
import logo from "../assets/logo.svg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function AppsModal({
  openM,
  closeM,
  type,
  text,
  apps,
}: {
  openM: boolean;
  closeM: Function;
  type: string;
  text: string;
  apps: Object;
}) {
  const navigate = useNavigate();

  const closeModal = () => {
    // localStorage.clear();
    closeM();
  };

  const openPage = (t: string, idapp: string) => {
    closeM();
    if (t !== "./admin") {
      window.location.assign(
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
      navigate(t);
    }
  };
  return (
    <Dialog open={openM} fullScreen>
      <Grid>
        <Grid container item xs={12}>
          <Grid
            className="logoLogin"
            container
            item
            xs={12}
            justifyContent="center"
            alignItems="flex-end"
          >
            <img
              src={logo}
              style={{ objectFit: "fill", width: "100%", height: "100%" }}
            />
          </Grid>
        </Grid>

        <Grid
          container
          className="ApssLoginElementos"
          item
          xs={12}
          sx={{ bgcolor: "#EEEEEE" }}
          paddingTop={1}
          paddingBottom={5}
        >
          <Typography variant="h5" className="NombreApp" sx={{ width: "100%" }}>
            Favor de seleccionar la plataforma a la que deseas ingresar
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              item
              container
              paddingTop={3}
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              justifyContent={"space-evenly"}
            >
              {Object.values(apps)?.map((item) => {
                return (
                  <>
                    <Grid
                      item
                      xs={2}
                      sm={4}
                      md={4}
                      key={item.IdApp}
                      sx={{ justifyContent: "space-evenly" }}
                      onClick={() => {
                        openPage(item.Path, item.IdApp);
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
                              <Box sx={{ width: "100%", height: "200px" }}>
                                <Typography variant="h5" className="NombreApp">
                                  {item?.Nombre}
                                </Typography>
                                <Typography
                                  variant="h5"
                                  className="DescripcionApp"
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
          </Box>
        </Grid>
        <Grid
          paddingTop={2}
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid item>
            <Button
              className="cancelarAppLogin"
              onClick={() => closeModal()}
              startIcon={<ArrowBackIcon />}
            >
              Regresar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
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
