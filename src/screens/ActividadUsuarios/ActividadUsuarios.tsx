import React, { useState, useEffect } from "react";
import AppsIcon from "@mui/icons-material/Apps";
import {
  CardContent,
  Grid,
  Tooltip,
  Typography,
  TextField,
  Button,
  Hidden,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs"; // Importar dayjs
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MUIXDataGrid from "../../components/dataGridGenerico/MUIXDataGrid";
import { Header } from "../../components/header";
import { getActividadUsuarios } from "../../services/hisotoricoService";
import SearchIcon from '@mui/icons-material/Search';

export const ActividadUsuarios = () => {
  const camposCsv = [
    "Nombre",
    "Descripcion",
    "Path",
    "NombreUsuario",
    "estatusLabel",
  ];

  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs()); // Inicializar con el día de hoy
  const [selectedDateEnd, setSelectedDateEnd] = useState<Dayjs | null>(dayjs()); 
  // Estado de la fecha

  const columns = [
    {
      field: "NombreUsuario",
      headerName: "Nombre Usuario",
      width:350,
      hideable: false,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "App",
      headerName: "App",
      width:750,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "Accion",
      headerName: "Accion",
      width:300,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Fecha",
      headerName: "Fecha",
      width:200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Hora",
      headerName: "Hora",
      width:200,
      headerAlign: "center",
      align: "center",
    },
  ];

  // Aquí es el consumo del endpoint para obtener el listado de apps de la base de datos

  const fetchActividadUsuarios = async () => {
    const data = await getActividadUsuarios(selectedDate,selectedDateEnd); // Llamar a la función asíncrona
    setRows(data); // Actualizar el estado con los datos obtenidos
  };
  useEffect(() => {
    fetchActividadUsuarios();
  }, []); // Llamar al endpoint cuando cambia la fecha seleccionada

  return (
    <Grid container sx={{ width: "100vw", height: "100vh" }}>
      <Header menuActual={"Actividad de Usuarios"} />

      {/* Esta configuración es del box que va a contener el card principal */}
      <Grid
        sx={{
          height: "90%",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container sx={{ height: "84vh", width: "100vw" }}>
          <Grid
          item container
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
             
            }}
          > <Hidden smDown>
            <Grid
              item
              sx={{
                display: "flex",
                
                alignItems: "center",
              }}
            >
              <Tooltip title="Menu actual: Actividad de Usuarios">
                <CardContent>
                  <AppsIcon
                    sx={{ color: "#AF8C55", fontSize: [30, 30, 30, 40, 40] }}
                  />
                </CardContent>
              </Tooltip>

              <Typography
                fontFamily={"'Montserrat', sans-serif"}
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textAlign: "center",
                  fontSize: [30, 30, 30, 30, 40], // Tamaños de fuente para diferentes breakpoints
                  color: "#AF8C55",
                }}
              >
                Actividad de Usuarios
              </Typography>
            </Grid>
            </Hidden>
            {/* Componente de selector de fecha */}
            <Grid item xs={12}
                lg={5}
                md={5}
                sm={12} container sx={{ display: "flex", justifyContent: "space-around"}}>
              <Grid
                xs={5}
                lg={3}
                md={3}
                sm={5}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                  <DatePicker
                    label="Selecciona la fecha inicial"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)} // Actualizar el estado al seleccionar la fecha
                    slotProps={{ textField: { fullWidth: true } }} // Utiliza slotProps para personalizar TextField
                  />
                </LocalizationProvider>
              </Grid>
              <Grid
                xs={5}
                lg={3}
                md={3}
                sm={5}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                  <DatePicker
                    label="Selecciona la fecha final"
                    value={selectedDateEnd}
                    onChange={(newValue) => setSelectedDateEnd(newValue)} // Actualizar el estado al seleccionar la fecha
                    slotProps={{ textField: { fullWidth: true } }} // Utiliza slotProps para personalizar TextField
                  />
                </LocalizationProvider>
              </Grid>
              <Grid
                xs={11}
                lg={2}
                md={2}
                sm={11} sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Button
                      className="aceptar"
                      variant="text"
                      onClick={() => {
                        fetchActividadUsuarios();
                      }}
                      sx={{
                        fontFamily: "MontserratBold",
                        backgroundColor: "#DFA94F",
                        color: "#000001",
                        boxShadow: 4,
                        padding: ["1vw", "1vw", "1vw", ".8vw", ".8vw"],
                        width: ["100%", "90%", "auto", "auto", "auto"],
                        mt:["1vh","0vh","0vh","0vh","0vh"]
                      }}
                      startIcon={<SearchIcon />}
                    >
                      <Typography
                        sx={{
                          fontSize: [".7rem", ".7rem", ".7rem", "1rem", "1rem"],
                        }}
                      >
                        Buscar
                      </Typography>
                    </Button>
              </Grid>

            </Grid>
          </Grid>

          <Grid item sx={{ width: "100vw", height: "71vh" }}>
            <MUIXDataGrid
              id={(row: any) => row.Id}
              columns={columns}
              rows={rows}
              camposCsv={camposCsv}
              exportTitle={"Catálogo de Aplicaciones"}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
