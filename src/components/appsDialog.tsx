import { Close as CloseIcon, Margin } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
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
      maxWidth="md"
      aria-labelledby="edit-dialog-title"
      aria-describedby="edit-dialog-description"
    >
      <DialogTitle
        id="edit-dialog-title"
        sx={{ fontFamily: "MontserratSemiBold" }}
      >
        Aplicaciones a las que tiene acceso {props.usuario.NombreUsuario}
        <IconButton
          aria-label="close"
          onClick={() => props.handleAppsDialogClose()}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container direction={"column"} justifyContent={"center"}>
          {apps.map((app: any) =>
            app.active ? (
              <Grid
                item
                xs={10}
                md={10}
                key={app.Id}
                justifyContent={"center"}
                alignItems={"center"}
                display={"flex"}
              >
                {/* <FormGroup sx={{ width: "100%" }}>
                  <FormControlLabel
                    control={
                      <Switch
                        defaultChecked={app.active}
                        checked={app.active}
                        // onChange={(v) => handleCheck(v.target.checked, app.Id)}
                      />
                    }
                    label={app.Nombre}
                  />
                </FormGroup> */}
                <Box
                  onClick={(v) => {
                    props.handleAppsDialogClose();
                    props.setIdApp(app.Id);
                  }}
                  sx={{
                    display: "flex",
                    borderRadius: "10px",
                    border: "solid 1px",
                    width: "100%",
                    cursor: "pointer",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: "2vh",
                  }}
                >
                  <Typography sx={{}}> {app.Nombre} </Typography>
                </Box>
              </Grid>
            ) : null
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          onClick={() => props.handleAppsDialogClose()}
          sx={{ fontFamily: "MontserratRegular" }}
        >
          Cerrar
        </Button>
        {/* <Button
          onClick={() => handleUpdateBtn()}
          sx={{ fontFamily: "MontserratRegular" }}
        >
          Actualizar
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};
