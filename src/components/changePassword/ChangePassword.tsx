import {Button, Dialog, Grid, IconButton, InputAdornment, TextField, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useState } from "react"
import { alertaError } from "../alertas/toast";
import { changePassword } from "./ServicesChangePassword";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


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
              alertaError("Carácter inválido.")
            }
    }
    function validacionesDeCapos(){
       if( password===""){  alertaError("Ingrese constraseña actual."); return false}
       if( newPassword==="") {  alertaError("Ingrese la nueva constraseña."); return false}
       if( newPasswordConfirmed===""){  alertaError("Ingrese la nueva constraseña."); return false}
       if(newPassword!==newPasswordConfirmed){  alertaError("Asegúrate de que la nueva contraseña y su confirmación sean idénticas."); return false}
       if(newPassword===password){  alertaError("La nueva contraseña no puede ser igual a la contraseña actual. Por favor, elige una contraseña diferente."); return false}
       return true;
    }

    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showNewPasswordConfirmed, setShowNewPasswordConfirmed] = useState(false);

    return (
        <Dialog
        open={true}
        onClose={()=>onClose(false)}
        maxWidth={false} // Evita que el diálogo tenga un ancho máximo
        PaperProps={{
          style: {
            width: isSmallScreen?'95vw':'40vw', // 60% del ancho de la ventana
            height: isSmallScreen?'60vh':'50vh', // 60% de la altura de la ventana
          },
        }}
      >
            <Grid container xl={12} lg={12} md={12} sm={12} xs={12} sx={{ width: "100%", height: "100%", display: "flex",justifyContent:"center",alignContent:"center" }}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ height:  "20%",display:"flex",alignItems:"center",justifyContent:"center", borderBottom:"solid 1px" }}>
                    <Typography fontFamily={"'Montserrat', sans-serif"}
                        sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            textAlign: "center",
                            fontSize: [20, 25, 30, 30, 30], // Tamaños de fuente para diferentes breakpoints
                            color: "#AF8C55",
                            width:"100%"
                        }}
                    >
                        Cambiar Contraseña
                    </Typography>
                </Grid>


                <Grid item xl={8} lg={8} md={8} sm={11} xs={11} sx={{ height: "20%",display:"flex",alignItems:"center",justifyContent:"center" }}>
                    
                    <TextField
                   
                    fullWidth
                    label="Contraseña Actual:"
                    value={password}
                    onChange={(e)=>{validaPassword(e.target.value,setPassword)}}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                     />
                </Grid>


                <Grid item xl={8} lg={8} md={8} sm={11} xs={11} sx={{ height: "20%",display:"flex",alignItems:"center",justifyContent:"center", }}>
                <TextField
                fullWidth
                    label="Nueva Contraseña:"
                    value={newPassword}
                    onChange={(e)=>{validaPassword(e.target.value,setNewPassword)}}
                    type={showNewPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              edge="end"
                            >
                              {showNewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                     />
                </Grid>


                <Grid item xl={8} lg={8} md={8} sm={11} xs={11} sx={{ height: "20%",display:"flex",alignItems:"center",justifyContent:"center", }}>
                <TextField
                fullWidth
                    label="Confirmar Nueva Contraseña:"
                    value={newPasswordConfirmed}
                    onChange={(e)=>{validaPassword(e.target.value,setNewPasswordConfirmed)}}
                    type={showNewPasswordConfirmed ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowNewPasswordConfirmed(!showNewPasswordConfirmed)}
                              edge="end"
                            >
                              {showNewPasswordConfirmed ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                     />
                </Grid>


                <Grid item container xl={12} lg={12} md={12} sm={12} xs={12} sx={{ height: "20%",display:"flex",justifyContent:"flex-end",alignItems:"center" }}>
                        <Grid item xl={3} lg={3} md={4} sm={6} xs={6} sx={{ height: "20%",display:"flex",justifyContent:"center",alignItems:"center" }}>
                            <Button className="cancelar" onClick={()=>onClose(false)}>Cancelar</Button>
                        </Grid>
                        <Grid item xl={3} lg={3} md={4} sm={6} xs={6} sx={{ height: "20%",display:"flex",justifyContent:"center",alignItems:"center" }}>
                        <Button className="aceptar" 
                        onClick={()=>{
                            if(validacionesDeCapos()){
                                changePassword({ContrasenaActual:password,ContrasenaNueva:newPassword},onClose);
                            }
                        }}
                        >Aceptar</Button>
                        </Grid>
                </Grid>
            </Grid>

        </Dialog>)
}