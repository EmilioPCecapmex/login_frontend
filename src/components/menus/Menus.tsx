import { Box, Button, Card, CardContent, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getRoles } from "../Roles/RolesServices";
import { useEffect, useState } from "react";
import MUIXDataGrid from "../dataGridGenerico/MUIXDataGrid";
import AppsIcon from '@mui/icons-material/Apps';
import SettingsIcon from '@mui/icons-material/Settings';
import { createMenuRol, deleteMenuRol, getMenus, getMenusRol } from "./MenusServices";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import SecurityIcon from '@mui/icons-material/Security';
import { Permisos } from "../Permisos/Permisos";

export interface IMenus {
    Descripcion: string,
    Id: string,
    Menu: string,
    IdRelacion:string
}

export function Menus({ open, closeModal, idRol, rol, idApp }: { open: boolean, closeModal: Function, idRol: string, rol: string, idApp: string }) {
    document.title = "Roles";

    const [menus, setMenus] = useState<Array<IMenus>>([])
    const [menusRol, setMenusRol] = useState<Array<IMenus>>([])
    const [menusFaltantes, setMenusFaltantes] = useState<Array<IMenus>>([])
    const [banderaMenus, setBanderaMenus] = useState(false);
    const [menu,setMenu]=useState<IMenus>({Descripcion:"",Id:"",Menu:"",IdRelacion:""})
    const [openPermisos,setOpenPermisos]=useState(false)

    function obtenerDatos(){
        getMenus(idApp, setMenus, () => { setBanderaMenus(true) })
        getMenusRol(idRol, setMenusRol)
    }

    useEffect(() => {
        obtenerDatos();
    }, [])

    useEffect(() => {
        // Obtener la diferencia entre los arrays
        const diferenciaMenus = menus.filter((menu) => !menusRol.find((menuRol) => menuRol.Id === menu.Id));
    
        // Actualizar el estado con los menús faltantes
        setMenusFaltantes(diferenciaMenus);
      }, [menus, menusRol]);

    return (
        <Dialog open={open} fullScreen>
            {!banderaMenus ?
                <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", opacity: "90" }}>
                    <CircularProgress size={300} /> menus
                </Box>
                :
                <Grid container sx={{ width: "100%", height: "100%" }}>
                    <Grid container item xl={12} sx={{ height: "8vh", display: "flex", justifyContent: "center", alignItems: "center", bgcolor: '#c4a57b' }}>
                        <Grid item xl={1} sx={{ height: "8vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        </Grid>
                        <Grid item xl={10} sx={{ height: "8vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography fontFamily={"Montserrat-Regular"} fontSize={50}> MENUS </Typography>
                        </Grid>
                        <Grid item xl={1} sx={{ height: "8vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <IconButton onClick={() => { closeModal() }}><CloseIcon style={{ fontSize: 50 }} /> </IconButton>
                        </Grid>
                    </Grid>



                    <Grid container item xl={12} sx={{ height: "92vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Card sx={{ height: "90%", width: "95%", boxShadow: 10, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                            {/* este box es la leyenda que se encuentra arriba a la izquierda */}
                            <Grid container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", height: "10%" }}>

                                <Grid item xl={2} xs={12} md={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <AppsIcon style={{ fontSize: "60px" }} />
                                </Grid>

                                <Grid item xl={8} xs={12} md={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                                    <Typography fontFamily={"Montserrat-Bold"} fontSize={40}>{rol}</Typography>
                                </Grid>

                                <Grid item xl={2} xs={12} md={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    {/* <Button
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
                                        registrar aplicación
                                    </Button> */}
                                </Grid>


                            </Grid>

                            {menus.length === 0 ?
                                <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", }}>
                                    <Typography fontFamily={"Montserrat-Bold"} fontSize={50}>Sin Información registrada </Typography>
                                </Box>
                                :
                                // roles[0].ControlInterno

                                // <MUIXDataGrid id={Math.random} columns={columns} rows={roles} camposCsv={camposCsv} />

                                <Grid container sx={{ display: "flex", width: "100%", height: "90%", justifyContent: "space-around", alignItems: "center" }}>
                                    <Grid container item xl={5} sx={{ display: "flex", height: "90%", border: "1px  solid",overflow:"auto",alignContent:"flex-start",justifyContent:"center" }}>
                                    {menusRol.map((menu)=>{ return(
                                        
                                        <Grid container item xl={11} sx={{display:"flex",height:"12%",border:"1px solid", bgcolor: '#c4a57b',boxShadow: 10, borderRadius:2,alignItems:"center",justifyContent:"space-around",mt:"2vh"}}>
                                            <Grid item  xl={9}><Typography fontFamily={"Montserrat-Ligth"} fontSize={20}>{menu.Descripcion}</Typography></Grid>
                                            <Grid item  xl={2} sx={{display:"flex"}}> 
                                            <Tooltip title={"Administrar permisos de "+ menu.Descripcion}>
                                                    <IconButton onClick={()=>{setMenu(menu);setOpenPermisos(true)}}>
                                                        <SecurityIcon style={{ fontSize: 50 }}/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title={"Quitar acceso a menu "+ menu.Descripcion}>
                                                    <IconButton onClick={()=>{deleteMenuRol(menu.IdRelacion,obtenerDatos)}}>
                                                        <HighlightOffIcon style={{ fontSize: 50 }}/>
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid>
                                        </Grid>
                                    )})}  
                                    </Grid>
                                    <Grid container item xl={5} sx={{ display: "flex", height: "90%", border: "1px  solid",overflow:"auto",alignContent:"flex-start",justifyContent:"center" }}>
                                    {menusFaltantes.map((menu)=>{ return(
                                        
                                        <Grid container item xl={11} sx={{display:"flex",height:"12%",border:"1px solid", bgcolor: '#c4a57b',boxShadow: 10, borderRadius:2,alignItems:"center",justifyContent:"space-around",mt:"2vh"}}>
                                            <Grid item  xl={1}> 
                                                <Tooltip title={"Dar acceso a menu "+ menu.Descripcion}>
                                                    <IconButton onClick={()=>{createMenuRol(idRol,menu.Id,localStorage.getItem("IdUsuario")||"",obtenerDatos)}}>
                                                        <ControlPointIcon style={{ fontSize: 50 }}/>
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid>
                                            <Grid item  xl={10} sx={{display:"flex",justifyContent:"flex-end"}}><Typography fontFamily={"Montserrat-Ligth"} fontSize={30}>{menu.Descripcion}</Typography></Grid>
                                            
                                        </Grid>
                                    )})}  
                                    </Grid>
                                </Grid>

                            }

                        </Card>
                    </Grid>
                </Grid>}
                {openPermisos && <Permisos open={openPermisos} closeModal={()=>{setOpenPermisos(false)}} menu={menu} idApp={idApp} idRol={idRol}></Permisos>}
        </Dialog>
    )
}

