import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardContent, IconButton, Tooltip, Button, Typography, TextField, FormGroup, FormControlLabel, Switch, List, ListItemButton, ListItemText, Divider, FormControl, InputLabel, Select, MenuItem, } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/header";
import { ISolicitud } from "./ISolicitud";
import { IApps } from "./IApps";
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import CommentIcon from '@mui/icons-material/Comment';


export const Solicitudes = () => {

    const [solicitudes, setSolicitudes] = useState<Array<ISolicitud>>([])

    const [solicitudesFiltered, setSolicitudesFiltered] = useState<Array<ISolicitud>>(solicitudes)

    const [apps, setApps] = useState<Array<IApps>>([])

    const getApps = () => {
        axios
            .get("http://10.200.4.105:5000/api/apps", {
                headers: {
                    Authorization: localStorage.getItem("jwtToken") || "",
                },
            })
            .then((r) => {
                if (r.status === 200) {
                    setApps(r.data.data);
                }
                else {
                    console.log(r.data.data);
                }
            });
    };

    const getSolicitudes = () => {
        axios
            .get("http://localhost:5000/api/solicitudes", {
                params: {
                    IdUsuario: localStorage.getItem("IdUsuario"),
                },
                headers: {
                    Authorization: localStorage.getItem("jwtToken") || "",
                },
            })
            .then((r) => {
                if (r.status === 200) {
                    setSolicitudes(r.data.data);
                    console.log(r.data.data);
                }
                else {
                    console.log(r.data.data);
                }
            });
    };

    useEffect(() => {
        getApps()
        getSolicitudes()
    }, [])




    const navigate = useNavigate();
    //registro seleccionado
    const [selectedIndex, setSelectedIndex] = useState(0);
    //filtrado port aplicacion
    const [appSelectedIndex, setAppSelectedIndex] = useState("");



    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });


    //cuando se seleciona un filtro, se establece en el primer registro
    useEffect(() => {

        setSelectedIndex(0)
        setSolicitudesFiltered([])
        console.log("hola");

    }, [appSelectedIndex])



    return (
        <Box sx={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            flexDirection: "column"
        }}>
            <Header />
            <Box sx={{
                height: "90vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Box sx={{
                    height: "95%",
                    width: "95%",
                    border: "1px solid #b3afaf",
                    display: "flex",

                }}>
                    {/* Lateral  filtro y lista de informacion*/}
                    <Box sx={{ width: "30%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Box sx={{ width: "95%", height: "15%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <FormControl fullWidth sx={{ bgcolor: "#ECE8DA", borderRadius: ".4vw", boxShadow: "15" }}>
                                <InputLabel>Filtar por aplicacion</InputLabel>
                                <Select
                                    value={appSelectedIndex}
                                    label="Filtar por aplicacion"
                                >
                                    {apps.map((item, x) => {
                                        return (<MenuItem key={x} value={item.Id} onClick={() => { setAppSelectedIndex(item.Id); }}>{item.Nombre}</MenuItem>)
                                    })}


                                </Select>
                            </FormControl>

                        </Box>
                        <Box sx={{
                            width: "95%", height: "79%", display: "flex", alignItems: "center", pb: 2, bgcolor: "#ECE8DA", boxShadow: "15",
                            pt: 2,
                            borderRight: "solid 1px",
                            overflow: "auto",
                            borderRadius: ".4vw",
                            borderColor: "#BCBCBC",
                            "&::-webkit-scrollbar": {
                                width: ".3vw",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "rgba(0,0,0,.5)",
                                outline: "1px solid slategrey",
                                borderRadius: 10,
                            },
                        }}>
                            <List component="nav" aria-label="main mailbox folders"
                                sx={{ width: "100%", height: "100%", borderRadius: ".4vw", }}
                            >
                                <Divider />
                                {solicitudes?.map((item, x) => {


                                    return (
                                        <Box key={x}>
                                            <ListItemButton
                                                key={x}
                                                onClick={() => { setSelectedIndex(x); }}
                                                sx={{
                                                    pl: 2,
                                                    "&.Mui-selected ": {
                                                        backgroundColor: "#c4a57b",
                                                    },
                                                    "&.Mui-selected:hover": {
                                                        backgroundColor: "#cbcbcb",
                                                    },
                                                }}
                                                selected={selectedIndex === x ? true : false}
                                            >
                                                <ListItemText primary={"Nombre: " + item.IdUsuario}
                                                    secondary={
                                                        <Fragment>
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                {"Aplicacion: " + item.IdApp}
                                                            </Typography><br />


                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                {"Registrado por: " + item.ModificadoPor}
                                                            </Typography>
                                                            <br />

                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                {"Tipo de solicitud: " + item.TipoSolicitud}
                                                            </Typography>

                                                        </Fragment>

                                                    }
                                                />

                                            </ListItemButton>
                                            <Divider />
                                        </Box>
                                    )
                                })}

                            </List>

                        </Box>
                    </Box>

                    {solicitudes.length != 0 ? <Box sx={{ width: "70%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <Box sx={{ width: "90%", height: "95%", display: "flex", flexDirection: "column", alignItems: "center", border: "1px solid #b3afaf", borderRadius: "15px", boxShadow: "15" }}>
                            {/* Id: "3",
                            IdUsuario: "687456444958566474",
                            DatosAdicionales: "Ut consequat semper viverra nam libero justo. Magna sit amet purus gravida quis blandit. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Morbi enim nunc faucibus a pellentesque sit amet. Nibh nisl condimentum id venenatis. Mauris vitae ultricies leo integer malesuada nunc vel risus. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Adipiscing elit pellentesque habitant morbi tristique. Magna etiam tempor orci eu lobortis. Fames ac turpis egestas sed tempus. Volutpat lacus laoreet non curabitur gravida. Augue eget arcu dictum varius duis at consectetur. Nunc consequat interdum varius sit amet mattis",
                            Estatus: "0",
                            TipoSolicitud: "Nunc consequat interdum",
                            CreadoPor: "Proin fermentum leo vel orci porta non. Eu ultrices vitae auct",
                            FechaDeCreacion: "XX/XX/XXXX",
                            UltimaModificacion: "XX/XX/XXXX",
                            ModificadoPor: "Ut consequat semper viverra nam libero justo",
                            IdApp: "YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY" */}

                            <Box sx={{ width: "100%", height: "100%", bgcolor: "#ECE8DA", borderRadius: "15px", opacity: "80%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", boxShadow: "15" }}>

                                {selectedIndex < 0 ?
                                    <Box sx={{ width: "100%", height: "80%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                                        <InfoTwoToneIcon sx={{ width: "100%", height: "80%", opacity: "20%" }} />
                                        <Typography fontFamily="MontserratBold">Sin información</Typography>
                                        <Typography fontFamily="MontserratBold">Seleccione un registro para visualizar la información</Typography>
                                    </Box> :
                                    <Box sx={{ width: "98%", height: "95%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", bgcolor: "#FBFBFB", borderRadius: "15px" }}>
                                        <Box sx={{ width: "98%", height: "95%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                                            <Box sx={{ width: "100%", height: "15%", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                                                <TextField
                                                    label="Aplicación"
                                                    InputProps={{ readOnly: true, }}
                                                    sx={{ fontFamily: "MontserratSemiBold", fontSize: "1.5vw", width: "32.5%" }}
                                                    value={solicitudes[(selectedIndex)].IdApp}
                                                    variant="standard" />
                                                <TextField
                                                    label="Enviado por"
                                                    InputProps={{ readOnly: true, }}
                                                    sx={{ fontFamily: "MontserratSemiBold", fontSize: "1.5vw", width: "32.5%" }}
                                                    value={solicitudes[(selectedIndex)].ModificadoPor}
                                                    variant="standard" />
                                                <TextField
                                                    label="Fecha de registro"
                                                    InputProps={{ readOnly: true, }}
                                                    sx={{ fontFamily: "MontserratSemiBold", fontSize: "1.5vw", width: "10%" }}
                                                    value={solicitudes[(selectedIndex)].UltimaModificacion}
                                                    variant="standard" />

                                                <Box sx={{ width: "5%" }}>
                                                    <IconButton ><CommentIcon fontSize="large" />
                                                    </IconButton></Box>

                                            </Box>
                                            <Box sx={{ width: "100%", height: "15%", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                                                <TextField
                                                    label="Nombre(s)"
                                                    InputProps={{ readOnly: true, }}
                                                    sx={{ fontFamily: "MontserratSemiBold", fontSize: "1.5vw", width: "25%" }}
                                                    value={solicitudes[(selectedIndex)].IdUsuario} variant="standard" />

                                                <TextField
                                                    label="Apellido  paterno"
                                                    InputProps={{ readOnly: true, }}
                                                    sx={{ fontFamily: "MontserratSemiBold", fontSize: "1.5vw", width: "25%" }}
                                                    value={solicitudes[(selectedIndex)].IdUsuario} variant="standard" />

                                                <TextField
                                                    label="Apellido Materno"
                                                    InputProps={{ readOnly: true, }}
                                                    sx={{ fontFamily: "MontserratSemiBold", fontSize: "1.5vw", width: "25%" }}
                                                    value={solicitudes[(selectedIndex)].IdUsuario}
                                                    variant="standard" />
                                            </Box>
                                            <Box sx={{ width: "100%", height: "15%", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                                                <TextField 
                                                label="Usuario " 
                                                InputProps={{ readOnly: true, }} 
                                                sx={{ fontFamily: "MontserratSemiBold", fontSize: "1.5vw", width: "25%" }} 
                                                value={solicitudes[(selectedIndex)].IdUsuario} 
                                                variant="standard" />
                                                <TextField 
                                                label="Correo electrónico " 
                                                InputProps={{ readOnly: true, }} 
                                                sx={{ fontFamily: "MontserratSemiBold", fontSize: "1.5vw", width: "25%" }} 
                                                value={solicitudes[(selectedIndex)].IdUsuario} 
                                                variant="standard" />
                                                <TextField 
                                                label="Celular" 
                                                InputProps={{ readOnly: true, }} 
                                                sx={{ fontFamily: "MontserratSemiBold", fontSize: "1.5vw", width: "25%" }} 
                                                value={solicitudes[(selectedIndex)].IdUsuario} 
                                                variant="standard" />
                                            </Box>
                                            <Box sx={{ width: "100%", height: "15%", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                                                <TextField 
                                                label="Curp " 
                                                InputProps={{ readOnly: true, }} 
                                                sx={{ fontFamily: "MontserratSemiBold", fontSize: "1.5vw", width: "25%" }} 
                                                value={solicitudes[(selectedIndex)].IdUsuario} 
                                                variant="standard" />
                                                <TextField 
                                                label="RFC " 
                                                InputProps={{ readOnly: true, }} 
                                                sx={{ fontFamily: "MontserratSemiBold", fontSize: "1.5vw", width: "25%" }} 
                                                value={solicitudes[(selectedIndex)].IdUsuario} 
                                                variant="standard" />
                                                <TextField 
                                                label="Teléfono" 
                                                InputProps={{ readOnly: true, }} 
                                                sx={{ fontFamily: "MontserratSemiBold", fontSize: "1.5vw", width: "25%" }} 
                                                value={solicitudes[(selectedIndex)].IdUsuario} 
                                                variant="standard" />
                                            </Box>

                                            <Box sx={{ width: "100%", height: "30%", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                                                <TextField
                                                    multiline
                                                    rows={8}
                                                    label="Información adicional "
                                                    sx={{ fontFamily: "MontserratSemiBold", fontSize: "1.5vw", width: "90%" }}
                                                    value={solicitudes[(selectedIndex)].IdUsuario}
                                                    variant="filled" />
                                            </Box>
                                            <Box sx={{ width: "100%", height: "10%", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                                                <Box sx={{ display: "flex", width: "10%", mr: "8vw" }}>
                                                    <IconButton
                                                        onClick={() => {
                                                            let a = (selectedIndex)
                                                            a--;
                                                            if (a >= 0)
                                                                setSelectedIndex(a)
                                                        }}
                                                    ><SkipPreviousIcon fontSize="large" /></IconButton>
                                                    <IconButton
                                                        onClick={() => {
                                                            let a = (selectedIndex)
                                                            a = a + 1;
                                                            if (a < solicitudes.length)
                                                                setSelectedIndex(a)
                                                        }}
                                                    ><SkipNextIcon fontSize="large" /></IconButton>
                                                </Box>
                                                <Box sx={{ display: "flex", width: "30%", justifyContent: "space-evenly" }}>
                                                    <Button variant="contained" color="error">Rechazar</Button>
                                                    <Button variant="contained" color="success">Aceptar</Button>
                                                </Box>


                                            </Box>
                                        </Box>

                                    </Box>
                                }


                            </Box>

                        </Box>
                    </Box> :
                        <Box sx={{ width: "70%", height: "100%", bgcolor: "#ECE8DA", borderRadius: "15px", opacity: "80%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", boxShadow: "15" }}>
                            <Box sx={{ width: "100%", height: "80%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                                <InfoTwoToneIcon sx={{ width: "100%", height: "80%", opacity: "20%" }} />
                                <Typography fontFamily="MontserratBold">Sin información</Typography>
                                <Typography fontFamily="MontserratBold">Seleccione un registro para visualizar la información</Typography>
                            </Box>
                        </Box>

                    }



                </Box>

            </Box>


        </Box>
    );
}

export default Solicitudes;




