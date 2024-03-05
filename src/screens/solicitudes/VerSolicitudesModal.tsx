import { Grid, TextField } from "@mui/material";
import {
  IDetalleSolicitud,
  iDetalleUsuario,
  iOnChangeInfo,
} from "./ISolicitud";

const VerSolicitudesModal = ({
  detalleSolicitud,
  // comentCount,
  onChangeInfo,
  detalleUsuario,
  solicitudSeleccionada,
}: {
  detalleSolicitud: IDetalleSolicitud;
  // comentCount: number;
  onChangeInfo: iOnChangeInfo;
  detalleUsuario: iDetalleUsuario;
  solicitudSeleccionada: string;
}) => {
  return (
    <>
      <Grid
        container
        // display={"grid"}
        // gridTemplateColumns={"repeat(3, 1fr)"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        height={"70%"}
        overflow={"auto"}
        // xs={12}
        // sm={12}
        // md={12}
        // xl={12}
        // lg={12}
      >
        <Grid item xl={3.5} lg={3.5} md={3.5} sm={3.5} xs={12} >
          <label>APLICACIÓN</label>
          <TextField
            fullWidth
            inputProps={{ style: { fontSize: "0.9rem" } }}
            value={detalleSolicitud?.NombreApp || ""}
            variant="standard"
          />
        </Grid>
        <Grid item xl={3.5} lg={3.5} md={3.5} sm={3.5} xs={12}>
          <label className="textoGridSolicitudes">SOLICITADO POR</label>
          <TextField
            fullWidth
            inputProps={{ style: { fontSize: "0.9rem" } }}
            value={detalleSolicitud?.NombreSolicitante || ""}
            variant="standard"
          />
        </Grid>
        <Grid item xl={3.5} lg={3.5} md={3.5} sm={3.5} xs={12}>
          <label className="textoGridSolicitudes">FECHA DE REGISTRO</label>
          <TextField
            fullWidth
            inputProps={{ style: { fontSize: "0.9rem" } }}
            sx={{
              fontFamily: "MontserratSemiBold",
              fontSize: "1.5vw",
            }}
            value={detalleSolicitud?.FechaDeCreacion.split("T")[0]}
            variant="standard"
          />
        </Grid>
        <Grid item xl={3.5} lg={3.5} md={3.5} sm={3.5} xs={12}>
          <label className="textoGridSolicitudes">NOMBRE(S)</label>
          <TextField
            fullWidth
            inputProps={{ style: { fontSize: "0.9rem" } }}
            sx={{
              fontFamily: "MontserratSemiBold",
              fontSize: "1.5vw",
              backgroundColor: onChangeInfo.Nombre ? "#fde6a2" : null,
            }}
            value={detalleSolicitud?.Nombre || ""}
            variant="standard"
            helperText={onChangeInfo.Nombre ? detalleUsuario.Nombre : null}
          />
        </Grid>
        <Grid item xl={3.5} lg={3.5} md={3.5} sm={3.5} xs={12}>
          <label className="textoGridSolicitudes">APELLIDO PATERNO</label>
          <TextField
            fullWidth
            inputProps={{ style: { fontSize: "0.9rem" } }}
            sx={{
              fontFamily: "MontserratSemiBold",
              fontSize: "1.5vw",
              backgroundColor: onChangeInfo.ApellidoPaterno ? "#fde6a2" : null,
            }}
            value={detalleSolicitud?.ApellidoPaterno || ""}
            variant="standard"
            helperText={
              onChangeInfo.ApellidoPaterno
                ? detalleUsuario.ApellidoPaterno
                : null
            }
          />
        </Grid>
        <Grid item xl={3.5} lg={3.5} md={3.5} sm={3.5} xs={12}>
          <label className="textoGridSolicitudes">APELLIDO MATERNO</label>
          <TextField
            fullWidth
            inputProps={{ style: { fontSize: "0.9rem" } }}
            sx={{
              fontFamily: "MontserratSemiBold",
              fontSize: "1.5vw",
              backgroundColor: onChangeInfo.ApellidoMaterno ? "#fde6a2" : null,
            }}
            value={detalleSolicitud?.ApellidoMaterno || ""}
            variant="standard"
            helperText={
              onChangeInfo.ApellidoMaterno
                ? detalleUsuario.ApellidoMaterno
                : null
            }
          />
        </Grid>
        <Grid item xl={3.5} lg={3.5} md={3.5} sm={3.5} xs={12}>
          <label className="textoGridSolicitudes">NOMBRE USUARIO</label>
          <TextField
            fullWidth
            inputProps={{ style: { fontSize: "0.9rem" } }}
            sx={{
              fontFamily: "MontserratSemiBold",
              fontSize: "1.5vw",
              backgroundColor: onChangeInfo.NombreUsuario ? "#fde6a2" : null,
            }}
            value={detalleSolicitud?.NombreUsuario || ""}
            variant="standard"
            helperText={
              onChangeInfo.NombreUsuario ? detalleUsuario.NombreUsuario : null
            }
          />
        </Grid>
        <Grid item xl={3.5} lg={3.5} md={3.5} sm={3.5} xs={12}>
          <label className="textoGridSolicitudes">CORREO ELECTRÓNICO</label>
          <TextField
            fullWidth
            inputProps={{ style: { fontSize: "0.9rem" } }}
            sx={{
              fontFamily: "MontserratSemiBold",
              fontSize: "1.5vw",
              backgroundColor: onChangeInfo.CorreoElectronico
                ? "#fde6a2"
                : null,
            }}
            value={detalleSolicitud?.CorreoElectronico || ""}
            variant="standard"
            helperText={
              onChangeInfo.CorreoElectronico
                ? detalleUsuario.CorreoElectronico
                : null
            }
          />
        </Grid>
        <Grid item xl={3.5} lg={3.5} md={3.5} sm={3.5} xs={12}>
          <label className="textoGridSolicitudes">PUESTO</label>
          <TextField
            fullWidth
            inputProps={{ style: { fontSize: "0.9rem" } }}
            sx={{
              fontFamily: "MontserratSemiBold",
              fontSize: "1.5vw",
              backgroundColor: onChangeInfo.Puesto ? "#fde6a2" : null,
            }}
            value={detalleSolicitud?.Puesto || ""}
            variant="standard"
            helperText={onChangeInfo.Puesto ? detalleUsuario.Puesto : null}
          />
        </Grid>
        <Grid item xl={3.5} lg={3.5} md={3.5} sm={3.5} xs={12}>
          <label className="textoGridSolicitudes">CELULAR</label>
          <TextField
            fullWidth
            inputProps={{ style: { fontSize: "0.9rem" } }}
            sx={{
              fontFamily: "MontserratSemiBold",
              fontSize: "1.5vw",
              backgroundColor: onChangeInfo.Celular ? "#fde6a2" : null,
            }}
            value={detalleSolicitud?.Celular || ""}
            variant="standard"
            helperText={onChangeInfo.Celular ? detalleUsuario.Celular : null}
          />
        </Grid>
        <Grid item xl={3.5} lg={3.5} md={3.5} sm={3.5} xs={12}>
          <label className="textoGridSolicitudes">TÉLEFONO</label>
          <TextField
            fullWidth
            inputProps={{ style: { fontSize: "0.9rem" } }}
            sx={{
              fontFamily: "MontserratSemiBold",
              fontSize: "1.5vw",
              backgroundColor: onChangeInfo.Telefono ? "#fde6a2" : null,
            }}
            value={detalleSolicitud?.Telefono || ""}
            variant="standard"
            helperText={onChangeInfo.Telefono ? detalleUsuario.Telefono : null}
          />
        </Grid>
        <Grid item xl={3.5} lg={3.5} md={3.5} sm={3.5} xs={12}>
          <label className="textoGridSolicitudes">EXTENSIÓN</label>
          <TextField
            fullWidth
            inputProps={{ style: { fontSize: "0.9rem" } }}
            sx={{
              fontFamily: "MontserratSemiBold",
              fontSize: "1.5vw",
              backgroundColor: onChangeInfo.Ext ? "#fde6a2" : null,
            }}
            value={detalleSolicitud?.Ext || ""}
            variant="standard"
            helperText={onChangeInfo.Ext ? detalleUsuario.Ext : null}
          />
        </Grid>
        <Grid item xl={3.5} lg={3.5} md={3.5} sm={3.5} xs={12}>
          <label className="textoGridSolicitudes">CURP</label>
          <TextField
            fullWidth
            inputProps={{ style: { fontSize: "0.9rem" } }}
            sx={{
              fontFamily: "MontserratSemiBold",
              fontSize: "1.5vw",
              backgroundColor: onChangeInfo.Curp ? "#fde6a2" : null,
            }}
            value={detalleSolicitud?.Curp || ""}
            variant="standard"
            helperText={onChangeInfo.Curp ? detalleUsuario.Curp : null}
          />
        </Grid>
        <Grid item xl={3.5} lg={3.5} md={3.5} sm={3.5} xs={12}>
          <label className="textoGridSolicitudes">RFC</label>
          <TextField
            fullWidth
            inputProps={{ style: { fontSize: "0.9rem" } }}
            sx={{
              fontFamily: "MontserratSemiBold",
              fontSize: "1.5vw",
              backgroundColor: onChangeInfo.Rfc ? "#fde6a2" : null,
            }}
            value={detalleSolicitud?.Rfc || ""}
            variant="standard"
            helperText={onChangeInfo.Rfc ? detalleUsuario.Rfc : null}
          />
        </Grid>
        <Grid item xl={3.5} lg={3.5} md={3.5} sm={3.5} xs={12}>
          <label className="textoGridSolicitudes">TIPO DE USUARIO</label>
          <TextField
            fullWidth
            inputProps={{ style: { fontSize: "0.9rem" } }}
            sx={{
              fontFamily: "MontserratSemiBold",
              fontSize: "1.5vw",
              backgroundColor: onChangeInfo.Ext ? "#fde6a2" : null,
            }}
            value={detalleSolicitud?.TpoUsuario || ""}
            variant="standard"
            helperText={onChangeInfo.Ext ? detalleUsuario.Ext : null}
          />
        </Grid>
        <Grid item xl={3.5} lg={3.5} md={3.5} sm={3.5} xs={12}>
          <label className="textoGridSolicitudes">ROLES</label>
          {JSON.parse(detalleSolicitud?.Roles)?.map(
            (rol: any, index: number) => (
              <TextField
                key={index}
                fullWidth
                inputProps={{ style: { fontSize: "0.9rem" } }}
                sx={{
                  fontFamily: "MontserratSemiBold",
                  fontSize: "1.5vw",
                  backgroundColor: onChangeInfo.Ext ? "#fde6a2" : null,
                }}
                value={rol.Descripcion || ""}
                variant="standard"
              />
            )
          ) || (
            <TextField
              fullWidth
              inputProps={{ style: { fontSize: "0.9rem" } }}
              sx={{
                fontFamily: "MontserratSemiBold",
                fontSize: "1.5vw",
                backgroundColor: onChangeInfo.Ext ? "#fde6a2" : null,
              }}
              value={"No Aplica"}
              variant="standard"
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default VerSolicitudesModal;
