import {Button, Dialog, Grid, TextField, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useState } from "react"
import { alertaError } from "../alertas/toast";
import { changePassword } from "./ServicesChangePassword";


export const ChangePassword = ({ onClose }: { onClose: Function }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [password,setPassword]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [newPasswordConfirmed,setNewPasswordConfirmed]=useState("");

    function validaPassword(cadena:string,setState:Function){
            if (cadena === ''||/^[a-zA-Z0-9]+$/.test(cadena)) {
              setState(cadena)
            } else {
              alertaError("caracter invalido")
            }
    }
    return (
        <Dialog
        open={true}
        onClose={()=>onClose}
        maxWidth={false} // Evita que el diálogo tenga un ancho máximo
        PaperProps={{
          style: {
            width: isSmallScreen?'95vw':'60vw', // 60% del ancho de la ventana
            height: '60vh', // 60% de la altura de la ventana
          },
        }}
      >
            <Grid container sx={{ width: "100%", height: "60vh", display: "flex",justifyContent:"center",alignContent:"center" }}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ height: "12vh",display:"flex",alignItems:"center",justifyContent:"center", borderBottom:"solid 1px" }}>
                    <Typography fontFamily={"'Montserrat', sans-serif"}
                        sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            textAlign: "center",
                            fontSize: [15, 25, 30, 30, 30], // Tamaños de fuente para diferentes breakpoints
                            color: "#AF8C55",
                            width:"100%"
                        }}
                    >
                        Cambiar Contraseña
                    </Typography>
                </Grid>


                <Grid item xl={8} lg={8} md={8} sm={11} xs={11} sx={{ height: "12vh",display:"flex",alignItems:"center",justifyContent:"center" }}>
                    <TextField
                    fullWidth
                    label="Constraseña Actual:"
                    value={password}
                    onChange={(e)=>{validaPassword(e.target.value,setPassword)}}
                     />
                </Grid>


                <Grid item xl={8} lg={8} md={8} sm={11} xs={11} sx={{ height: "12vh",display:"flex",alignItems:"center",justifyContent:"center", }}>
                <TextField
                fullWidth
                    label="Nueva Contraseña:"
                    value={newPassword}
                    onChange={(e)=>{validaPassword(e.target.value,setNewPassword)}}
                     />
                </Grid>


                <Grid item xl={8} lg={8} md={8} sm={11} xs={11} sx={{ height: "12vh",display:"flex",alignItems:"center",justifyContent:"center", }}>
                <TextField
                fullWidth
                    label="Confirmar Nueva Constraseña:"
                    value={newPasswordConfirmed}
                    onChange={(e)=>{validaPassword(e.target.value,setNewPasswordConfirmed)}}
                     />
                </Grid>


                <Grid item container xl={12} lg={12} md={12} sm={12} xs={12} sx={{ height: "12vh",display:"flex",justifyContent:"flex-end",alignItems:"center" }}>
                        <Grid item xl={3} lg={3} md={4} sm={6} xs={6} sx={{ height: "12vh",display:"flex",justifyContent:"center",alignItems:"center" }}>
                            <Button className="cancelar">Cancelar</Button>
                        </Grid>
                        <Grid item xl={3} lg={3} md={4} sm={6} xs={6} sx={{ height: "12vh",display:"flex",justifyContent:"center",alignItems:"center" }}>
                        <Button className="aceptar" 
                        onClick={()=>{
                            if(newPassword===newPasswordConfirmed){
                                changePassword();
                            }else{
                                alertaError("Asegúrate de que la nueva contraseña y su confirmación sean idénticas.");
                            }
                        }}
                        >Aceptar</Button>
                        </Grid>
                </Grid>
            </Grid>

        </Dialog>)
}