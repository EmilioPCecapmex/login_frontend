import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import SafetyCheckOutlinedIcon from "@mui/icons-material/SafetyCheckOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Tooltip,
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
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { TimelineOppositeContent } from "@mui/lab";
import { GridCloseIcon } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";

const styleTextField = {
  borderTop: "1px groove",
  borderBottom: "1px ",
  padding: "8px",
  textAlign: "left",
};

function IconSwitch({ Movimiento }: { Movimiento: string }) {
  if (Movimiento.toUpperCase().includes("CREACIÓN"))
    return <BorderColorOutlinedIcon />;
  else if (Movimiento.toUpperCase().includes("ASIGNACIÓN"))
    return <VerifiedUserOutlinedIcon />;
  else if (Movimiento.toUpperCase().includes("MODIFICACIÓN"))
    return <ManageSearchOutlinedIcon />;
  // else if (Movimiento.toUpperCase().includes("AUTORIZACIÓN"))
  //   return <SafetyCheckOutlinedIcon />;
  // else if (Movimiento.toUpperCase().includes("AUTORIZADA"))
  //   return <VerifiedUserOutlinedIcon />;
  else if (Movimiento.toUpperCase().includes("ELIMINACIÓN"))
    return <HighlightOffIcon />;
  
  else return <HelpOutlineOutlinedIcon />;
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
            <TimelineItem>
              <TimelineOppositeContent
                sx={{ m: "auto 0" }}
                align="right"
                variant="body2"
                color="text.secondary"
              >
                <Typography variant="h6" component="span">
                  {step.Fecha}
                </Typography>
                <Typography> {step.Hora}</Typography>
                {/* <Typography>Because you need strength</Typography> */}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="primary">
                  <IconSwitch Movimiento={step.Accion} />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <Typography variant="h6" component="span">
                  {step.Accion}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </>
    );
  };

  return (
    <Dialog open={true} fullScreen>
      <Grid
          container
          sx={{
            width: "100%",
            height: "100%",
            display:'flex',
            justifyContent:'center',
            alignItems:'flex-start'
          }}
        >
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{
              height: "8vh",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              borderBottom: "1px solid",
            }}
          >
            <Grid
              item
              xs={8}
              sm={8}
              md={10}
              lg={10}
              xl={10}
              sx={{
                height: "8vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography fontFamily={"'Montserrat', sans-serif"}
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textAlign: "center",
                  fontSize: [30, 30, 30, 30, 40], // Tamaños de fuente para diferentes breakpoints
                  color: "#AF8C55"
                }}
              >
                Historial de movimientos del registro
              </Typography>
            </Grid>
            <Grid
              item
              xs={2}
              sm={2}
              md={1}
              lg={1}
              xl={1}
              sx={{
                height: "8vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Tooltip title="Salir">
                <IconButton

                  onClick={() => {
                    closeModal();
                  }}
                >
                  <CloseIcon sx={{
                    fontSize: '24px', // Tamaño predeterminado del icono
                    '@media (max-width: 600px)': {
                      fontSize: 30, // Pantalla extra pequeña (xs y sm)
                    },
                    '@media (min-width: 601px) and (max-width: 960px)': {
                      fontSize: 30, // Pantalla pequeña (md)
                    },
                    '@media (min-width: 961px) and (max-width: 1280px)': {
                      fontSize: 40, // Pantalla mediana (lg)
                    },
                    '@media (min-width: 1281px)': {
                      fontSize: 40, // Pantalla grande (xl)
                    },
                  }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>

                <Grid
                  item
                  container
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}

                  sx={{
                    display: "flex",
                    height: "90%",
                    overflow: "auto",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <Timeline position="right" sx={{height:'100%'}}>
                    <TrazabilidadStepper />
                  </Timeline>

              </Grid>
        </Grid>



    </Dialog>
  );
};
