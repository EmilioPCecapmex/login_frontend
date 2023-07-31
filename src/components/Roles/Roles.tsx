import { Box, Button, Card, CardContent, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import MUIXDataGrid from "../dataGridGenerico/MUIXDataGrid";
import AppsIcon from '@mui/icons-material/Apps';
import SettingsIcon from '@mui/icons-material/Settings';
import { Menus } from "../menus/Menus";
import { getRoles } from "./RolesServices";

interface IRol {
    ControlInterno: string,
    Deleted: number,
    Descripcion: string,
    Id: string,
    Nombre: string,
}



const camposCsv = ["Nombre", "Descripcion", "ControlInterno", "Deleted"];

export function Roles({ open, closeModal, idApp, app }: { open: boolean, closeModal: Function, idApp: string, app: string }) {
    document.title = "Roles";

    const [roles, setRoles] = useState<Array<IRol>>([])
    const [bandera, setBandera] = useState(false);

    const [openMenus, setOpenMenu] = useState(false);
    const [idRol, setIdRol] = useState("")
    const [rol, setRol] = useState("")

    const columns = [
        {
            field: "acciones",
            headerName: "Acciones",
            width: 175,
            headerAlign: "left",
            hideable: false,
            renderCell: (cellValues: any) => {
                return (
                    <Box>
                        <Tooltip title={"Editar"}>
                            <IconButton
                                sx={{ color: "black" }}
                                onClick={(event) => {
                                    //   setuuid(cellValues.row.uuid);
                                    //   setCve(cellValues.row.Cve);
                                    //   setNombre(cellValues.row.Nombre);
                                    //   setDireccion(cellValues.row.Direccion);
                                    //   setTelefono(cellValues.row.Telefono);
                                    //   setTipoDependencia(cellValues.row.uuidTipoDependencia);
                                    //   setTitularDependencia(cellValues.row.uuidTitular);
                                    //   setSecretaria(cellValues.row.uuidSecretaria);
                                    //   setCreadoPor(cellValues.row.CreadoPor);
                                    //   setModificadoPor(cellValues.row.ModificadoPor);
                                    //   setEliminadoPor(cellValues.row.EliminadoPor);
                                    //   handleOpen();
                                }}
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={"Editar acceso a Menus"}>
                            <IconButton sx={{ color: "black" }}
                                onClick={(event) => {


                                    if (cellValues.row.Id) {
                                        setIdRol(cellValues.row.Id)
                                    }

                                    if (cellValues.row.Descripcion) {
                                        setRol(cellValues.row.Descripcion)
                                    }

                                    setOpenMenu(true);
                                    // handleDelete(event, cellValues);
                                }
                                }
                            >
                                <SettingsIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={"Eliminar"}>
                            <IconButton sx={{ color: "black" }}
                                onClick={(event) => {
                                    // handleDelete(event, cellValues);
                                }
                                }
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>

                    </Box>
                );
            },
        },
        {
            field: "Id",
            headerName: "Id",
            width: 250,
            hideable: false,
            headerAlign: "left",

        },
        {
            field: "Nombre",
            headerName: "Nombre",
            width: 200,
            hideable: false,
            headerAlign: "left",
        },
        {
            field: "Descripcion",
            headerName: "Descripcion",
            width: 400,
            hideable: false,
            headerAlign: "left",
        },
        {
            field: "ControlInterno",
            headerName: "Control Interno",
            width: 400,
            hideable: false,
            headerAlign: "left",
        },
        {
            field: "Deleted",
            headerName: "Eliminado",
            width: 150,
            hideable: false,
            headerAlign: "left",
        }
    ];

    useEffect(() => {
        getRoles(idApp, setRoles, () => setBandera(true))
    }, [])

    useEffect(() => {
        console.log("roles", roles);

    }, [roles])

    return (
        <Dialog open={open} fullScreen>
            {!bandera ?
                <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", opacity: "90" }}>
                    <CircularProgress size={300} />
                </Box>
                :
                <Grid container sx={{ width: "100%", height: "100%" }}>
                    <Grid container item xl={12} sx={{ height: "8vh", display: "flex", justifyContent: "center", alignItems: "center", bgcolor: '#c4a57b' }}>
                        <Grid item xl={1} sx={{ height: "8vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        </Grid>
                        <Grid item xl={10} sx={{ height: "8vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography fontFamily={"Montserrat-Regular"} fontSize={50}> ROLES </Typography>
                        </Grid>
                        <Grid item xl={1} sx={{ height: "8vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <IconButton onClick={() => { closeModal() }}><CloseIcon style={{ fontSize: 50 }} /> </IconButton>
                        </Grid>
                    </Grid>



                    <Grid container item xl={12} sx={{ height: "92vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Card sx={{ height: "90%", width: "95%", boxShadow: 10 }}>
                            {/* este box es la leyenda que se encuentra arriba a la izquierda */}
                            <Grid container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", height: "10%" }}>

                                <Grid item xl={2} xs={12} md={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <AppsIcon style={{ fontSize: "60px" }} />
                                </Grid>

                                <Grid item xl={8} xs={12} md={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Typography fontFamily={"Montserrat-Bold"} fontSize={40}>{app}</Typography>
                                </Grid>

                                <Grid item xl={2} xs={12} md={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Button
                                        className="aceptar"
                                        variant="text"
                                    // onClick={(event) => handleNewBtnClick(event)}
                                    // sx={{
                                    //     fontFamily: "MontserratBold",
                                    //     backgroundColor: "#DFA94F",
                                    //     color: "#000001",
                                    //     fontSize: "10px",
                                    //     boxShadow: 4,
                                    // }}
                                    // startIcon={<AddIcon />}
                                    >
                                        Agragar Rol
                                    </Button>
                                </Grid>


                            </Grid>

                            {roles.length === 0 ?
                                <Box sx={{ width: "100%", height: "90%", display: "flex", justifyContent: "center", alignItems: "center", }}>
                                    <Typography fontFamily={"Montserrat-Bold"} fontSize={50}>Sin Información registrada </Typography>
                                </Box>
                                :
                                // roles[0].ControlInterno
                                <Box sx={{ width: "100%", height: "90%", display: "flex", justifyContent: "center", alignItems: "flex-start", }}>
                                    <MUIXDataGrid id={Math.random} columns={columns} rows={roles} camposCsv={camposCsv} />
                                </Box>



                            }

                        </Card>



                    </Grid>
                </Grid>}
            {openMenus && <Menus open={openMenus} closeModal={() => { setOpenMenu(false) }} idRol={idRol} rol={rol} idApp={idApp} />}
        </Dialog>
    )
}

