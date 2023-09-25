import { Close, Margin } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Usuario } from "../screens/Users/Users";

export interface AppsDialogProps {
  appsDialogOpen: boolean;
  handleAppsDialogClose: Function;
  usuario: Usuario | any;
  setIdApp: Function;
}

export const AppsDialog = (props: AppsDialogProps) => {
  const [apps, setApps] = useState([]);

  const getAllApps = (appsUser: any) => {
    axios({
      method: "get",
      url: process.env.REACT_APP_APPLICATION_DEV + "/api/apps",
      params: { IdUsuario: localStorage.getItem("IdUsuario") },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
      .then(function (response) {
        const appsTemp = response.data.data.map((app: any) => {
          app.active = appsUser.find((el: any) => el === app.Id) !== undefined;
          return app;
        });
        setApps(appsTemp);
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Mensaje",
          text: "(" + error.response.status + ") " + error.response.data.msg,
        });
      });
  };

  const getAllAppsUser = () => {
    const data = {
      IdUsuario: props.usuario.Id,
    };

    axios({
      method: "post",
      url: process.env.REACT_APP_APPLICATION_DEV + "/api/user-apps",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
      data: data,
    })
      .then(function (response) {
        if (response.data.data) {
          const appsUser = response.data.data.map((app: any) => {
            return app.IdApp;
          });
          getAllApps(appsUser);
        } else getAllApps([]);
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Mensaje",
          text: "(" + error.response.status + ") " + error.response.data.msg,
        });
      });
  };

  const handleCheck = (active: boolean, id: string) => {
    const index = apps.findIndex((app: any) => {
      return app.Id === id;
    });
    let appsTemp: any = apps;
    appsTemp[index].active = active;
    setApps(appsTemp);
  };

  useEffect(() => {
    getAllAppsUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateBtn = () => {
    const data = {
      IdUsuario: props.usuario.Id,
      IdUsuarioModificador: localStorage.getItem("IdUsuario"),
      Apps: apps.map((app: any) => {
        return { IdApp: app.Id, Vincular: app.active ? 1 : 0 };
      }),
    };

    axios({
      method: "post",
      url: process.env.REACT_APP_APPLICATION_DEV + "/api/manage-links",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
      data: data,
    })
      .then(function (response) {
        props.handleAppsDialogClose();
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Mensaje",
          text: "(" + error.response.status + ") " + error.response.data.msg,
        });
      });
  };

  return (
    <Dialog
      open={props.appsDialogOpen}
      onClose={() => props.handleAppsDialogClose()}
      fullWidth={true}
      maxWidth="lg"
      aria-labelledby="edit-dialog-title"
      aria-describedby="edit-dialog-description"
    >
      <DialogTitle
        id="edit-dialog-title"
        sx={{ fontFamily: "MontserratSemiBold" }}
      >
        <Grid container sx={{ width: "100%" }}>
          <Grid item xl={11}
            xs={11}
            lg={11}
            md={11}
            sm={11}>
            <Typography fontFamily={"'Montserrat', sans-serif"}
                    sx={{
                      // whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textAlign: "center",
                      fontSize: [15, 15, 15, 20, 20], // Tamaños de fuente para diferentes breakpoints
                      padding: "1rem"
                    }}>Aplicaciones a las que tiene acceso {props.usuario.NombreUsuario}</Typography>
          </Grid>
          <Grid item xl={1}
            xs={1}
            lg={1}
            md={1}
            sm={1}
            sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Tooltip title="Salir">
            <IconButton  onClick={() => props.handleAppsDialogClose()}>
              <Close sx={{
                fontSize: '24px', // Tamaño predeterminado del icono
                '@media (max-width: 600px)': {
                  fontSize: 25, // Pantalla extra pequeña (xs y sm)
                },
                '@media (min-width: 601px) and (max-width: 960px)': {
                  fontSize: 25, // Pantalla pequeña (md)
                },
                '@media (min-width: 961px) and (max-width: 1280px)': {
                  fontSize: 30, // Pantalla mediana (lg)
                },
                '@media (min-width: 1281px)': {
                  fontSize: 30, // Pantalla grande (xl)
                },
              }} />
            </IconButton>
            </Tooltip>
          </Grid>
        </Grid>


      </DialogTitle>

      <DialogContent dividers>
        <Grid container direction={"column"} justifyContent={"center"} >
          {apps.map((app: any) =>
            app.active ? (
              <Grid
                item container
                xs={10}
                md={10}
                key={app.Id}
                justifyContent={"center"}
                alignItems={"center"}
                display={"flex"}
              >

                <Grid
                  item
                  xl={10}
                  xs={10}
                  lg={10}
                  md={10}
                  sm={10}
                  onClick={(v) => {
                    props.handleAppsDialogClose();
                    props.setIdApp(app.Id);
                  }}
                  component="button"
                  className="aceptar"
                  sx={{
                    display: "flex",
                    borderRadius: "5px",
                    border: "solid 1px",
                    cursor: "pointer",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: "2vh",
                  }}
                >
                  <Typography fontFamily={"'Montserrat', sans-serif"}
                    sx={{
                      // whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textAlign: "center",
                      fontSize: [12, 12, 12, 15, 15], // Tamaños de fuente para diferentes breakpoints
                      padding: "1rem"
                    }}> {app.Nombre} </Typography>
                </Grid>
              </Grid>
            ) : null
          )}
        </Grid>
      </DialogContent>

    </Dialog>
  );
};
