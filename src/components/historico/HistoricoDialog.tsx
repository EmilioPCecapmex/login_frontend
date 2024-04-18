import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import SafetyCheckOutlinedIcon from "@mui/icons-material/SafetyCheckOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  IHApp,
  IHMenu,
  IHRol,
  IHRolMenu,
  IHistorico,
  isIHApp,
  isIHMenu,
  isIHPermiso,
  isIHRol,
  isIHRolMenu,
} from "../../Interfaces/Historico";
import { getMovimientosTrazabilidad } from "../../services/hisotoricoService";

const styleTextField={ borderTop: '1px groove', borderBottom: '1px ', padding: '8px', textAlign: 'left' }

function IconSwitch({ Movimiento }: { Movimiento: string }) {
  if (Movimiento.toUpperCase().includes("CREACIÓN"))
    return <BorderColorOutlinedIcon style={{ fontSize: "5em" }} />;
  else if (Movimiento.toUpperCase().includes("ASIGNACIÓN"))
    return <VerifiedUserOutlinedIcon style={{ fontSize: "5em" }} />;
  else if (Movimiento.toUpperCase().includes("MODIFICACIÓN"))
    return <ManageSearchOutlinedIcon style={{ fontSize: "5em" }} />;
  else if (Movimiento.toUpperCase().includes("AUTORIZACIÓN"))
    return <SafetyCheckOutlinedIcon style={{ fontSize: "5em" }} />;
  else if (Movimiento.toUpperCase().includes("AUTORIZADA"))
    return <VerifiedUserOutlinedIcon style={{ fontSize: "5em" }} />;
  else return <HelpOutlineOutlinedIcon style={{ fontSize: "5em" }} />;
}

export const HistoricoDialog = ({
  st,
  Id,
  closeModal,
}: {
  st: string;
  Id: string;
  closeModal: Function;
}) => {
  const [trazabilidad, setTrazabilidad] = useState<IHistorico[]>([]);
  useEffect(() => {
    getMovimientosTrazabilidad(Id, setTrazabilidad);
  }, []);

  const ImprimirContenido = (contenido: string) => {
    let auxContendio = JSON.parse(contenido);
    if (isIHApp(contenido))
      return (
        <>
          <Typography sx={styleTextField}>
            {`Nombre: `}

            {`${auxContendio.Nombre}`}
          </Typography>
          <Typography sx={styleTextField}>
            {`Descripción: `}

            {`${auxContendio.Descripcion}`}
          </Typography>
          <Typography sx={styleTextField}>
            {`Ruta: `}

            {`${auxContendio.Path}`}
          </Typography>
          <Typography sx={styleTextField}>
            {`Estado: `}

            {auxContendio.EstaActivo ? "Activo" : "Inactivo"}
          </Typography>
        </>
      );
    else if (isIHRol(contenido))
      return (
        <>
          <Typography sx={styleTextField}>
            {`Nombre: `}

            {`${auxContendio.Nombre}`}
          </Typography>
          <Typography sx={styleTextField}>
            {`Descripción: `}

            {`${auxContendio.Descripcion}`}
          </Typography>
          <Typography sx={styleTextField}>
            {`Control Interno: `}

            {`${auxContendio.ControlInterno}`}
          </Typography>
          <Typography sx={styleTextField}>
            {`App: `}

            {auxContendio.App}
          </Typography>
        </>
      );
    else if (isIHRolMenu(contenido))
      return (
        <>
          <Typography sx={styleTextField}>
            {`Rol: `}

            {`${auxContendio.Rol}`}
          </Typography>
          <Typography sx={styleTextField}>
            {`Menu asignado: `}

            {`${auxContendio.Menu}`}
          </Typography>

          <Typography sx={styleTextField}>
            {`App: `}

            {auxContendio.App}
          </Typography>
        </>
      );
    else if (isIHMenu(contenido))
      return (
        <>
          <Typography sx={styleTextField}>
            {`Menu: `}

            {`${auxContendio.Menu}`}
          </Typography>
          <Typography sx={styleTextField}>
            {`Descripcion: `}

            {`${auxContendio.Descripcion}`}
          </Typography>
          <Typography sx={styleTextField}>
            {`Nivel: `}

            {`${auxContendio.Nivel}`}
          </Typography>
          <Typography sx={styleTextField}>
            {`Orden: `}

            {`${auxContendio.Orden}`}
          </Typography>
          <Typography sx={styleTextField}>
            {`MenuPadre: `}

            {`${auxContendio.MenuPadre}`}
          </Typography>
          <Typography sx={styleTextField}>
            {`Icon: `}

            {`${auxContendio.Icon}`}
          </Typography>
          <Typography sx={styleTextField}>
            {`Ruta: `}

            {`${auxContendio.Path}`}
          </Typography>
          <Typography sx={styleTextField}>
            {`Control Interno: `}

            {`${auxContendio.ControlInterno}`}
          </Typography>

          <Typography sx={styleTextField}>
            {`App: `}

            {auxContendio.App}
          </Typography>
        </>
      );
    else if (isIHPermiso(contenido)) return <></>;
  };

  const TrazabilidadStepper = () => {
    return (
      <>
        {trazabilidad.map((step, index) => {
          console.log(step.Contenido);

          let auxContenido: IHApp | IHRol | IHRolMenu | IHMenu = JSON.parse(
            step.Contenido
          );

          return (
            <Grid
              item
              container
              xs={11.5}
              sm={11.5}
              md={11}
              lg={10}
              xl={10}
              key={index}
              sx={{
                display: "flex",
                justifyContent: [
                  "space-between",
                  "space-evenly",
                  "space-evenly",
                  "space-evenly",
                  "space-evenly",
                ],
                mb: "5vh",
                alignItems: "center",
                border: "solid 1px",
                // bgcolor:'red'
              }}
            >
              <Grid
              item
              xs={4}
              sm={4}
              md={4}
              lg={4}
              xl={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection:'column',
                  // bgcolor:'green'
                }}
              >
                <Grid sx={{border: '1px dashed', display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection:'column',width:'90%',pt:'2vh',pb:'2vh'}}>
                <IconSwitch Movimiento={step.Accion} />
                <Typography sx={{mt:'1vh'}}>
                  {`Acción:`}

                  {` ${step.Accion}`}
                </Typography>
                </Grid>
              </Grid>
              <Grid
               item
               xs={7}
               sm={7}
               md={7}
               lg={7}
               xl={7}
                sx={{
                  justifyContent: ["", "center", "center", "center", "center"],
                  alignItems: "center",
                  ml: ["2", "", "", "2vw", ""],flexWrap:'wrap'
                }}
              >
                <Typography sx={{...styleTextField,borderTop:'0px solid'}}>
                  {`Modulo:`}

                  {` ${step.Tabla}`}
                </Typography>

                {ImprimirContenido(step.Contenido)}
                <Typography sx={styleTextField}>
                  {`Usuario: `}

                  {`${step.Modificador}`}
                </Typography>
                <Typography sx={styleTextField}>
                  {`Fecha de Modificación: `}

                  {`${step.Fecha}`}
                </Typography>
                <Typography sx={{...styleTextField,borderBottom:'0px solid'}}>
                  {`Hora de Modificación: `}

                  {`${step.Hora}`}
                </Typography>
                {/* Agrega más detalles según tus necesidades */}
              </Grid>
            </Grid>
          );
        })}
      </>
    );
  };

  return (
    <Dialog open={true} fullScreen>
      <DialogTitle>Historial de movimientos del documento</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <Grid
          xs={12}
          sm={12}
          md={12}
          lg={12}
          container
          item
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            container
            item
            sx={{
              height: "90%",
              overflow: "auto",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <TrazabilidadStepper />
          </Grid>

          <Grid
            sx={{
              justifyContent: "center",
              alignItems: "flex-end",
              display: "flex",
              height: "10%",
            }}
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
          >
            <Button
              fullWidth
              className="cancelar"
              variant="contained"
              onClick={() => closeModal()}
            >
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Cerrar
              </Typography>{" "}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
