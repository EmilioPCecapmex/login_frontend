import {
    Box, Grid, Tooltip, Typography,
    IconButton,
    Button,
    TextField,
    List,
    ListItemButton,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    Checkbox,
    Badge,
    Hidden,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { COLOR } from '../styles/colors'
import { IDetalleSolicitud, iDetalleUsuario, iOnChangeInfo, ISolicitud } from './ISolicitud'
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import CommentIcon from "@mui/icons-material/Comment";
import CircularProgress from '@mui/material/CircularProgress';
import { CommentsDialog } from '../../components/commentsDialog';

 const VerSolicitudesModal = ({
        detalleSolicitud,
        comentCount,
        onChangeInfo,
        detalleUsuario,
        solicitudSeleccionada,
    }:
    {
            detalleSolicitud: Array<IDetalleSolicitud>;
            comentCount: number;
            onChangeInfo: iOnChangeInfo;
            detalleUsuario: iDetalleUsuario;
            solicitudSeleccionada: string;
        }) => {
    const [openComments, setOpenComments] = useState(false);
    const handleCloseComments = () => {
        setOpenComments(false);



    };

    return (
        <>
            <CommentsDialog open={openComments} close={handleCloseComments} solicitud={solicitudSeleccionada} />

            <Grid container 
            paddingLeft={1} paddingRight={1} 
            paddingTop={3}  rowSpacing={3} 
            paddingBottom={2}
            justifyContent="space-between">

                <Grid container item xs={12}  paddingRight={3}
                    direction="row"
                    justifyContent="flex-end" >
                    <Grid item paddingTop={2} >
                        <Tooltip title="Ver comentarios">
                            <Badge className='BotonColorPrimario' badgeContent={comentCount} color="primary">
                                <IconButton className='iconos-header' onClick={() => setOpenComments(true)}  color={comentCount!==0? "secondary":"default"}>
                                    <CommentIcon fontSize="large" />
                                </IconButton>
                            </Badge>
                        </Tooltip>
                    </Grid>
                </Grid>

                <Grid item  xs={12} sm={5.8} md={5.8}   lg={3.8} >
                    <label className="textoGridSolicitudes">
                        APLICACIÓN
                    </label>
                    <TextField
                        fullWidth
                        className="FieldTextGridSolicitudes"
                        InputProps={{ readOnly: true }}
                        sx={{
                            fontFamily: "MontserratSemiBold",
                            fontSize: "1.5vw",
                            bgcolor: null
                        }}
                        value={detalleSolicitud[0]?.NombreApp || ""}
                        variant="standard"

                    />
                </Grid>
                <Grid item xs={12} sm={5.8} md={5.8} lg={3.8}>
                    <label className="textoGridSolicitudes">
                        SOLICITADO POR
                    </label>
                    <TextField
                        fullWidth
                        sx={{
                            fontFamily: "MontserratSemiBold",
                            fontSize: "1.5vw",
                        }}
                        value={detalleSolicitud[0]?.NombreSolicitante || ""}
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={5.8}md={5.8} lg={3.8}>
                    <label className="textoGridSolicitudes">
                        FECHA DE REGISTRO
                    </label>
                    <TextField
                        fullWidth
                        InputProps={{ readOnly: true }}
                        sx={{
                            fontFamily: "MontserratSemiBold",
                            fontSize: "1.5vw",
                        }}
                        value={detalleSolicitud[0]?.FechaDeCreacion.split("T")[0]}
                        variant="standard"
                    />
                </Grid>




                <Grid item xs={12} sm={5.8} md={5.8} lg={3.8}>
                    <label className="textoGridSolicitudes">
                        NOMBRE(S)
                    </label>
                    <TextField
                        fullWidth
                        InputProps={{ readOnly: true }}
                        sx={{
                            fontFamily: "MontserratSemiBold",
                            fontSize: "1.5vw",
                            backgroundColor: onChangeInfo.Nombre ? "#fde6a2" : null,
                        }}
                        value={detalleSolicitud[0]?.Nombre || ""}
                        variant="standard"
                        helperText={onChangeInfo.Nombre ? detalleUsuario.Nombre : null}
                    />
                </Grid>
                <Grid item xs={12} sm={5.8} md={5.8} lg={3.8}>
                    <label className="textoGridSolicitudes">
                        APELLIDO PATERNO
                    </label>
                    <TextField
                        fullWidth
                        InputProps={{ readOnly: true }}
                        sx={{
                            fontFamily: "MontserratSemiBold",
                            fontSize: "1.5vw",
                            backgroundColor: onChangeInfo.ApellidoPaterno ? "#fde6a2" : null,
                        }}
                        value={detalleSolicitud[0]?.ApellidoPaterno || ""}
                        variant="standard"
                        helperText={onChangeInfo.ApellidoPaterno ? detalleUsuario.ApellidoPaterno : null}
                    />
                </Grid>
                <Grid item xs={12} sm={5.8} md={5.8} lg={3.8}>
                    <label className="textoGridSolicitudes">
                        APELLIDO MATERNO
                    </label>
                    <TextField
                        fullWidth
                        InputProps={{ readOnly: true }}
                        sx={{
                            fontFamily: "MontserratSemiBold",
                            fontSize: "1.5vw",
                            backgroundColor: onChangeInfo.ApellidoMaterno ? "#fde6a2" : null,
                        }}
                        value={detalleSolicitud[0]?.ApellidoMaterno || ""}
                        variant="standard"
                        helperText={onChangeInfo.ApellidoMaterno ? detalleUsuario.ApellidoMaterno : null}
                    />
                </Grid>

                <Grid item xs={12} sm={5.8} md={5.8}  lg={3.8}>
                    <label className="textoGridSolicitudes">
                        USUARIO
                    </label>
                    <TextField
                        fullWidth
                        InputProps={{ readOnly: true }}
                        sx={{
                            fontFamily: "MontserratSemiBold",
                            fontSize: "1.5vw",
                            backgroundColor: onChangeInfo.NombreUsuario ? "#fde6a2" : null,
                        }}
                        value={detalleSolicitud[0]?.NombreUsuario || ""}
                        variant="standard"
                        helperText={onChangeInfo.NombreUsuario ? detalleUsuario.NombreUsuario : null}
                    />
                </Grid>
                <Grid item xs={12} sm={5.8} md={5.8}   lg={3.8}  >
                    <label className="textoGridSolicitudes">
                        CORREO ELECTRÓNICO
                    </label>
                    <TextField
                        fullWidth
                        InputProps={{ readOnly: true }}
                        sx={{
                            fontFamily: "MontserratSemiBold",
                            fontSize: "1.5vw",
                            backgroundColor: onChangeInfo.CorreoElectronico ? "#fde6a2" : null,
                        }}
                        value={detalleSolicitud[0]?.CorreoElectronico || ""}
                        variant="standard"
                        helperText={onChangeInfo.CorreoElectronico ? detalleUsuario.CorreoElectronico : null}
                    />
                </Grid>
                
                <Grid item xs={12} sm={5.8} md={5.8} lg={3.8} >
                    <label className="textoGridSolicitudes">
                        PUESTO
                    </label>
                    <TextField
                        fullWidth
                        InputProps={{ readOnly: true }}
                        sx={{
                            fontFamily: "MontserratSemiBold",
                            fontSize: "1.5vw",
                            backgroundColor: onChangeInfo.Puesto ? "#fde6a2" : null,
                        }}
                        value={detalleSolicitud[0]?.Puesto || ""}
                        variant="standard"
                        helperText={onChangeInfo.Puesto ? detalleUsuario.Puesto : null}
                    />

                </Grid>
               
                <Grid item xs={12} sm={5.8} md={5.8} lg={3.8} >
                    <label className="textoGridSolicitudes">
                        CELULAR
                    </label>
                    <TextField
                        fullWidth
                        InputProps={{ readOnly: true }}
                        sx={{
                            fontFamily: "MontserratSemiBold",
                            fontSize: "1.5vw",
                            backgroundColor: onChangeInfo.Celular ? "#fde6a2" : null,
                        }}
                        value={detalleSolicitud[0]?.Celular || ""}
                        variant="standard"
                        helperText={onChangeInfo.Celular ? detalleUsuario.Celular : null}
                    />
                </Grid>
                <Grid item xs={12} sm={5.8} md={5.8} lg={3.8}>
                    <label className="textoGridSolicitudes">
                        TÉLEFONO
                    </label>
                    <TextField
                        fullWidth
                        InputProps={{ readOnly: true }}
                        sx={{
                            fontFamily: "MontserratSemiBold",
                            fontSize: "1.5vw",
                            backgroundColor: onChangeInfo.Telefono ? "#fde6a2" : null,
                        }}
                        value={detalleSolicitud[0]?.Telefono || ""}
                        variant="standard"
                        helperText={onChangeInfo.Telefono ? detalleUsuario.Telefono : null}
                    />
                </Grid>
                <Grid item xs={12} sm={5.8} md={5.8} lg={3.8}>
                    <label className="textoGridSolicitudes">
                        EXTENSIÓN
                    </label>
                    <TextField
                        fullWidth
                        InputProps={{ readOnly: true }}
                        sx={{
                            fontFamily: "MontserratSemiBold",
                            fontSize: "1.5vw",
                            backgroundColor: onChangeInfo.Ext ? "#fde6a2" : null,
                        }}
                        value={detalleSolicitud[0]?.Ext || ""}
                        variant="standard"
                        helperText={onChangeInfo.Ext ? detalleUsuario.Ext : null}
                    />
                </Grid>
                <Grid item xs={12} sm={5.8} md={5.8} lg={3.8}>
                    <label className="textoGridSolicitudes">
                        CURP
                    </label>
                    <TextField
                        fullWidth
                        InputProps={{ readOnly: true }}
                        sx={{
                            fontFamily: "MontserratSemiBold",
                            fontSize: "1.5vw",
                            backgroundColor: onChangeInfo.Curp ? "#fde6a2" : null,
                        }}
                        value={detalleSolicitud[0]?.Curp || ""}
                        variant="standard"
                        helperText={onChangeInfo.Curp ? detalleUsuario.Curp : null}
                    />
                </Grid>
                <Grid item xs={12} sm={5.8} md={5.8} lg={3.8} >
                    <label className="textoGridSolicitudes">
                        RFC
                    </label>
                    <TextField
                        fullWidth
                        InputProps={{ readOnly: true }}
                        sx={{
                            fontFamily: "MontserratSemiBold",
                            fontSize: "1.5vw",
                            backgroundColor: onChangeInfo.Rfc ? "#fde6a2" : null,
                        }}
                        value={detalleSolicitud[0]?.Rfc || ""}
                        variant="standard"
                        helperText={onChangeInfo.Rfc ? detalleUsuario.Rfc : null}
                    />
                </Grid>
                <Grid item xs={12} sm={5.8} md={5.8} lg={3.8}>
                    <label className="textoGridSolicitudes">
                    TpoUsuario
                    </label>
                    <TextField
                        fullWidth
                        InputProps={{ readOnly: true }}
                        sx={{
                            fontFamily: "MontserratSemiBold",
                            fontSize: "1.5vw",
                            backgroundColor: onChangeInfo.Ext ? "#fde6a2" : null,
                        }}
                        value={detalleSolicitud[0]?.TpoUsuario || ""}
                        variant="standard"
                        helperText={onChangeInfo.Ext ? detalleUsuario.Ext : null}
                    />
                </Grid>
                <Grid item xs={12} sm={5.8} md={5.8} lg={3.8}>
                    <label className="textoGridSolicitudes">
                    Secretaria
                    </label>
                    <TextField
                        fullWidth
                        InputProps={{ readOnly: true }}
                        sx={{
                            fontFamily: "MontserratSemiBold",
                            fontSize: "1.5vw",
                            backgroundColor: onChangeInfo.Ext ? "#fde6a2" : null,
                        }}
                        value={detalleSolicitud[0]?.Secretaria || ""}
                        variant="standard"
                        helperText={onChangeInfo.Ext ? detalleUsuario.Ext : null}
                    />
                </Grid>
                <Grid item xs={12} sm={5.8} md={5.8} lg={3.8}>
                    <label className="textoGridSolicitudes">
                    Dependencia
                    </label>
                    <TextField
                        fullWidth
                        InputProps={{ readOnly: true }}
                        sx={{
                            fontFamily: "MontserratSemiBold",
                            fontSize: "1.5vw",
                            backgroundColor: onChangeInfo.Ext ? "#fde6a2" : null,
                        }}
                        value={detalleSolicitud[0]?.Dependencia || ""}
                        variant="standard"
                        helperText={onChangeInfo.Ext ? detalleUsuario.Ext : null}
                    />
                </Grid>
                <Grid item xs={12} sm={5.8} md={5.8} lg={3.8}>
                    <label className="textoGridSolicitudes">
                    Departamento
                    </label>
                    <TextField
                        fullWidth
                        InputProps={{ readOnly: true }}
                        sx={{
                            fontFamily: "MontserratSemiBold",
                            fontSize: "1.5vw",
                            backgroundColor: onChangeInfo.Ext ? "#fde6a2" : null,
                        }}
                        value={detalleSolicitud[0]?.Departamento || ""}
                        variant="standard"
                        helperText={onChangeInfo.Ext ? detalleUsuario.Ext : null}
                    />
                </Grid>
                <Grid item xs={12} sm={5.8} md={5.8} lg={3.8}>
                    <label className="textoGridSolicitudes">
                    Rol
                    </label>
                    <TextField
                        fullWidth
                        InputProps={{ readOnly: true }}
                        sx={{
                            fontFamily: "MontserratSemiBold",
                            fontSize: "1.5vw",
                            backgroundColor: onChangeInfo.Ext ? "#fde6a2" : null,
                        }}
                        value={detalleSolicitud[0]?.Rol || ""}
                        variant="standard"
                        helperText={onChangeInfo.Ext ? detalleUsuario.Ext : null}
                    />
                </Grid>
                <Grid item xs={12} sm={5.8} md={5.8} lg={3.8}>
                    <label className="textoGridSolicitudes">
                        Perfil
                    </label>
                    <TextField
                        fullWidth
                        InputProps={{ readOnly: true }}
                        sx={{
                            fontFamily: "MontserratSemiBold",
                            fontSize: "1.5vw",
                            backgroundColor: onChangeInfo.Ext ? "#fde6a2" : null,
                        }}
                        value={detalleSolicitud[0]?.Perfil || ""}
                        variant="standard"
                        helperText={onChangeInfo.Ext ? detalleUsuario.Ext : null}
                    />
                </Grid>
                <Grid item xs={12} sm={5.8} md={5.8} lg={3.8}>
                    <label className="textoGridSolicitudes">
                    Unidad responsable
                    </label>
                    <TextField
                        fullWidth
                        InputProps={{ readOnly: true }}
                        sx={{
                            fontFamily: "MontserratSemiBold",
                            fontSize: "1.5vw",
                            backgroundColor: onChangeInfo.Ext ? "#fde6a2" : null,
                        }}
                        value={detalleSolicitud[0]?.UResponsable || ""}
                        variant="standard"
                        helperText={onChangeInfo.Ext ? detalleUsuario.Ext : null}
                    />
                </Grid>


{/* 
                <Grid item xs={12} >
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label={
                            <Typography
                                sx={{ fontFamily: "MontserratSemiBold" }}
                            >
                                INFORMACIÓN ADICIONAL
                            </Typography>
                        }
                        sx={{
                            fontFamily: "MontserratSemiBold",
                            fontSize: "1.5vw",
                        }}
                        value={detalleSolicitud[0]?.DatosAdicionales || ""}
                        variant="filled"
                    />
                </Grid> */}




            </Grid>
        </>
    )
}

export default VerSolicitudesModal