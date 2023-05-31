import {
    Button,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SelectValues from "../../Interfaces/SelectValues";
import SelectFragLogin from "../../components/SelectFrag/SelectFragLogin";
import { UserServices } from "../../services/UserServices";
import SliderProgress from "../Componentes/SliderProgress";


export interface NewDialogProps {
    modoModal: boolean;
    token: string
    idUsuarioSolicitante: string
    idApp: string
    // handleNewDialogClose: Function;
}

export interface IUserTypes {
    Id: string;
    Nombre: string;
    Descripcion: string;
}

export const SolicitudUsuarios = (props: NewDialogProps) => {
    const [nombre, setNombre] = useState("");
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [apellidoPaterno, setApellidoPaterno] = useState("");
    const [apellidoMaterno, setApellidoMaterno] = useState("");
    const [correo, setCorreo] = useState("");
    const [puesto, setPuesto] = useState("");

    const [celular, setCelular] = useState(0);
    const [telefono, setTelefono] = useState(0);
    const [ext, setExt] = useState(0);
    const [curp, setCurp] = useState("");
    const [rfc, setRfc] = useState("");
    const [tipousuario, setTipoUsuario] = useState("");

    const [idLabelRol, setIdLabelRol] = useState<string>("");

    const [puedeFirmar, setPuedeFirmar] = useState(false);
    const [departamento, setDepartamentos] = useState<SelectValues[]>([]);
    const [idDepartamento, setIdDepartamento] = useState<string>("");
    const [idLabelDepartamentoNoAdmin, setLabelDepartamentoNoAdmin] = useState<string>("");
    const [idLabelPerfilNoAdmin, setLabelPerfilNoAdmin] = useState<string>("");
    const [idPerfil, setIdPerfil] = useState<string>("");
    const [perfiles, setPerfiles] = useState<SelectValues[]>([]);
    const [roles, setRoles] = useState<SelectValues[]>([]);
    const [idRol, setIdRol] = useState<string>("");
    const [secretarias, setSecretarias] = useState<SelectValues[]>([]);
    const [idSecretarias, setIdSecretarias] = useState<string>("");
    const [apps, setApps] = useState<SelectValues[]>([]);
    const [idApps, setIdApps] = useState<string>("");
    const [UResponsable, setUResponsable] = useState<SelectValues[]>([]);
    const [idUResponsable, setIdUResponsable] = useState<string>("");
    const [nameDep, setNameDep] = useState<string>("");

    const [nameUresp, setNameUresp] = useState<string>("Sin Unidad Asignada");
    const [namePerf, setNamePerf] = useState<string>("");

    const [openSlider, setOpenSlider] = useState(true);


    const [errorNombre, setErrorNombre] = useState(false);
    const [errorUsuario, setErrorUsuario] = useState(false);
    const [errorAPaterno, setErrorAPaterno] = useState(false);
    const [errorAMaterno, setErrorAMaterno] = useState(false);
    const [errorPuesto, setErrorPuesto] = useState(false);
    const [errorTpoUsuario, setErrorTpoUsuario] = useState(false);
    const [errorTelefono, setErrorTelefono] = useState(false);
    const [errorExt, setErrorExt] = useState(false);
    const [errorCelular, setErrorCelular] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorrfc, setErrorRfc] = useState(false);
    const [errorcurp, setErrorCurp] = useState(false);
    const [leyendaerrorrfc, setLeyendaErrorRfc] = useState("");
    const [leyendaerrorcurp, setLeyendaErrorCurp] = useState("");

    const urlParams = window.location.search;
    const query = new URLSearchParams(urlParams);
    const jwt = query.get("jwt");


    const handleFilterChangeDepartamento = (v: any) => {
        setIdDepartamento(v.value);
        setNameDep(v.label);
        consultaSecretarias(v.value, "select")
    };

    const handleFilterChangePerfil = (v: any) => {
        setIdPerfil(v.value);
        setNamePerf(v.label);
    };

    const handleFilterChangeUResponsable = (v: any) => {
        console.log(v)
        setIdUResponsable(v.value);
        setNameUresp(v.label);
    };
    const handleFilterChangeSecretaria = (v: any) => {
        setIdSecretarias(v.value);
    };
    const handleFilterChangeApps = (v: any) => {
        setIdApps(v.value);
    };

    const handleChangeSelectRoles = (v: any) => {
        setIdRol(v.value);
    };


    const compruebaCelular = (value: number) => {
        if (value <= 9999999999) {
            setCelular(value);
        } else if (value.toString() === "NaN") {
            setCelular(0);
        }
    };
    const compruebaTelefono = (value: number) => {
        if (value <= 9999999999) {
            setTelefono(value);
        } else if (value.toString() === "NaN") {
            setTelefono(0);
        }
    };

    const compruebaExt = (value: number) => {
        if (value <= 9999) {
            setExt(value);
        } else if (value.toString() === "NaN") {
            setExt(0);
        }
    };

    const compruebaRfc = (value: string) => {
        var format = /[ ¬°`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (!format.test(value)) {
            setRfc(value.toUpperCase());
        }
        if (value.length < 12 || value.length > 13) {
            setErrorRfc(true);
            setLeyendaErrorRfc("13 caracteres si es persona física, 12 caracteres si es persona moral");
        } else {
            setErrorRfc(false);
            setLeyendaErrorRfc("");
        }
    };

    const compruebaNombreUsuario = (value: string) => {
        var format = /[ ¬°`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (!format.test(value)) {
            setNombreUsuario(value);
        }
    }
    const compruebaNombre = (value: string) => {
        var format = /[ ¬°`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (!format.test(value)) {
            setNombre(value);
        }
    }

    const compruebaAPaterno = (value: string) => {
        var format = /[ ¬°`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (!format.test(value)) {
            setApellidoPaterno(value);
        }
    }
    const compruebaAMaterno = (value: string) => {
        var format = /[ ¬°`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (!format.test(value)) {
            setApellidoMaterno(value);
        }
    }

    function isValidEmail() {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(correo);
    }

    const compruebaPuesto = (value: string) => {
        var format = /[ ¬°`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (!format.test(value)) {
            setPuesto(value);
        }
    }

    const compruebaCurp = (value: string) => {
        var format = /[ ¬°`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (!format.test(value)) {
            setCurp(value.toUpperCase());
        }
        if (value.length !== 18) {
            setErrorCurp(true);
            setLeyendaErrorCurp("Longitud de CURP incorrecto, tiene que ser de 18 caracteres");
        } else {
            setErrorCurp(false);
            setLeyendaErrorCurp("");
        }
    };

    const handleStoreBtn = () => {
        setErrorEmail(false);
        if (
            nombre === "" ||
            nombreUsuario === "" ||
            apellidoPaterno === "" ||
            apellidoMaterno === "" ||
            rfc === "" ||
            curp === "" ||
            telefono <= 0 ||
            ext <= 0 ||
            celular <= 0 ||
            tipousuario === "" ||
            idRol === "" ||
            idRol === "false" ||
            idDepartamento === "" ||
            idDepartamento === "false" ||
            idUResponsable === "" ||
            idUResponsable === "false" ||
            idPerfil === "" ||
            idPerfil === "false"
        ) {
            Swal.fire({
                icon: "error",
                title: "Mensaje",
                text: "Completa todos los campos para continuar",
            });
        } else {
            const data = {
                Nombre: nombre,
                ApellidoPaterno: apellidoPaterno,
                ApellidoMaterno: apellidoMaterno,
                NombreUsuario: nombreUsuario,
                CorreoElectronico: correo,
                Puesto: puesto,
                IdUsuarioModificador: localStorage.getItem("IdUsuario"),
                Rfc: rfc,
                Curp: curp,
                Telefono: telefono,
                Ext: ext,
                Celular: celular,
                PuedeFirmar: puedeFirmar ? 1 : 0,
                IdTipoUsuario: tipousuario,
                idUResponsable: idUResponsable,
                idPerfil: idPerfil,
                idRol: idRol,
                idDepartamento: idDepartamento,

            };

            UserServices.createsolicitud(data, String(jwt) !== "null" ? String(jwt) : String(localStorage.getItem("jwtToken"))).then((res) => {
                if (res.status === 200) {
                    setUserTypes(res?.data?.data);
                }else{
                    Swal.fire({
                        icon: "error",
                        title: "Mensaje",
                        text: "(" + res.response.status + ") " + res.response.data.msg,
                    });
                }
            });

           
        }
    };

    const [usertypes, setUserTypes] = useState<Array<IUserTypes>>([]);
    const [usertypessel, setUserTypesSel] = useState("");
    const getAllUserTypes = () => {
        const data = {
            IdUsuario: (props.modoModal && props.token && props.idUsuarioSolicitante) ? props.idUsuarioSolicitante : localStorage.getItem("IdUsuario"),
        };
        UserServices.usertypes(data, String(jwt) !== "null" ? String(jwt) : String(localStorage.getItem("jwtToken"))).then((res) => {
            if (res.status === 200) {
                setUserTypes(res?.data?.data);
            }
        });
    };




    const consultaSecretarias = (idDepartamento: string, opcion: string) => {
        setOpenSlider(true);
        UserServices.consultaCatalogos({ idDep: idDepartamento, cat: "7", opcion: opcion }, String(jwt) !== "null" ? String(jwt) : String(localStorage.getItem("jwtToken"))).then((res) => {
            if (res.status === 200) {
                setIdDepartamento(res.data);
                console.log(res.data)

                setOpenSlider(false)
            }
        });

    };




    const consulta = (catalogo: string, opcion: string) => {
        setOpenSlider(true);
        UserServices.consultaCatalogos({ cat: catalogo, opcion: opcion }, String(jwt) !== "null" ? String(jwt) : String(localStorage.getItem("jwtToken"))).then((res) => {
            if (res.status === 200) {
                if (catalogo === "1" && opcion === "select") {
                    setSecretarias(res.data.data);
                }
                if (catalogo === "2" && opcion === "select") {
                    setApps(res.data.data);
                }
                if (catalogo === "3" && opcion === "select") {
                    setUResponsable(res.data.data);
                }
                if (catalogo === "4" && opcion === "select") {
                    setDepartamentos(res.data.data);
                }
                if (catalogo === "5" && opcion === "select") {
                    setRoles(res.data.data);
                }
                if (catalogo === "6" && opcion === "select") {
                    setPerfiles(res.data.data);
                }
                if (catalogo === "7" && opcion === "select") {
                    // setPerfiles(res.data.data);
                }
                setOpenSlider(false)
            }
        });

    };
    useEffect(() => {
        // setOpenSlider(true)
        if (props.idApp) {
            setIdApps(props.idApp)

        }
        getAllUserTypes();
        consulta("1", "select");
        consulta("2", "select");
        consulta("3", "select");
        consulta("4", "select");
        consulta("5", "select");
        consulta("6", "select");


    }, []);

    return (
        <div className="ContainerSolicitudesUsuario">
            <SliderProgress open={openSlider} texto={""} />


            <Grid container spacing={2} padding={2} paddingTop={5}>
                <Grid item xs={12} md={6}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nombreUsuario"
                        label="Nombre de Usuario"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={nombreUsuario}
                        required
                        error={!nombreUsuario || (nombreUsuario.length < 5)}
                        inputProps={{ minLength: 4 }}
                        onChange={(v) => setNombreUsuario((v.target.value).trim())}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        margin="dense"
                        id="nombre"
                        label="Nombre(s)"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={nombre}
                        required
                        error={!nombre}
                        onChange={(v) => setNombre(v.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        margin="dense"
                        id="apellidoPaterno"
                        label="Apellido Paterno"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={apellidoPaterno}
                        required
                        onChange={(v) => compruebaAPaterno(v.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        margin="dense"
                        id="apellidoMaterno"
                        label="Apellido Materno"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={apellidoMaterno}
                        required
                        onChange={(v) => compruebaAMaterno(v.target.value)}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        margin="dense"
                        id="puesto"
                        label="Puesto"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={puesto}
                        required
                        onChange={(v) => compruebaPuesto(v.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl required variant="standard" fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Tipo de Usuario
                        </InputLabel>
                        <Select
                            onChange={(v) => setTipoUsuario(v.target.value)}
                            id="tipousuario"
                            value={tipousuario}
                            sx={{ display: "flex", pt: 1 }}
                        >
                            {usertypes?.map((types) => (
                                <MenuItem
                                    key={types.Id}
                                    value={types.Id}
                                >
                                    {types.Descripcion}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        margin="dense"
                        id="correo"
                        label="Correo Electrónico"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={correo}
                        required
                        onChange={(v) => setCorreo(v.target.value)}
                        error={errorEmail}
                        helperText={errorEmail ? "Formato de correo invalido" : null}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        margin="dense"
                        id="curp"
                        label="CURP"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={curp}
                        required
                        error={errorcurp}
                        helperText={leyendaerrorcurp}
                        inputProps={{ maxLength: 18, minLength: 18 }}
                        onChange={(v) => compruebaCurp(v.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        margin="dense"
                        id="rfc"
                        label="RFC"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={rfc}
                        required
                        error={errorrfc}
                        helperText={leyendaerrorrfc}
                        inputProps={{ maxLength: 13, minLength: 12 }}
                        onChange={(v) => compruebaRfc(v.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "row" }}>
                    <TextField
                        fullWidth
                        sx={{ mr: 6 }}
                        margin="dense"
                        id="telefono"
                        label="Telefono"
                        value={telefono === 0 ? "" : telefono}
                        required
                        variant="standard"
                        onChange={(v) => compruebaTelefono(parseInt(v.target.value))}
                    />
                    <TextField
                        fullWidth

                        margin="dense"
                        id="ext"
                        label="Ext"
                        value={ext === 0 ? "" : ext}
                        variant="standard"
                        onChange={(v) => compruebaExt(parseInt(v.target.value))}
                    />
                </Grid>
                <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "row" }}>
                    <TextField
                        fullWidth
                        sx={{ mr: 4 }}
                        margin="dense"
                        id="celular"
                        label="Celular"
                        value={celular === 0 ? "" : celular}
                        required
                        variant="standard"
                        onChange={(v) => compruebaCelular(parseInt(v.target.value))}
                    />

                </Grid>
                <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>

                    <FormGroup sx={{ display: "flex", justifyContent: "center" }}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={puedeFirmar}
                                    onChange={(v) => setPuedeFirmar(v.target.checked)}
                                />
                            }
                            label={puedeFirmar ? "Puede firmar" : "No puede firmar"}
                        />
                    </FormGroup>
                </Grid>





            </Grid>
            <Grid container item xs={12} rowSpacing={2} columnSpacing={2} padding={2} direction="row"
                justifyContent="center"
                alignItems="center">

                <Grid item xs={12} md={6}>
                    <Typography variant="body2"> Departamento: </Typography>
                    <SelectFragLogin
                        value={idDepartamento}
                        options={departamento}
                        onInputChange={handleFilterChangeDepartamento}
                        placeholder={"Seleccione Departamento"}
                        label={idLabelDepartamentoNoAdmin ? idLabelDepartamentoNoAdmin : ""}
                        disabled={false}

                    />
                </Grid>
                <Grid item xs={12} md={6}>

                    <Typography variant="body2"> Perfil: </Typography>
                    <SelectFragLogin
                        value={idPerfil}
                        options={perfiles}
                        onInputChange={handleFilterChangePerfil}
                        placeholder={"Seleccione Perfil"}
                        label={idLabelPerfilNoAdmin ? idLabelPerfilNoAdmin : ""}
                        disabled={false}

                    />
                </Grid>
                <Grid item xs={12} md={6}>

                    <Typography variant="body2"> Rol: </Typography>
                    <SelectFragLogin
                        value={idRol}
                        options={roles}
                        onInputChange={handleChangeSelectRoles}
                        placeholder={"Seleccione Rol"}
                        label={idLabelRol ? idLabelRol : ""}
                        disabled={false}
                    />
                </Grid>
                <Grid item xs={12} md={6}>

                    <Typography variant="body2"> U. Responsable: </Typography>
                    <SelectFragLogin
                        value={idUResponsable}
                        options={UResponsable}
                        onInputChange={handleFilterChangeUResponsable}
                        placeholder={"Seleccione U. Responsable"}
                        label={""}
                        disabled={false}
                    />
                </Grid>

                <Grid item xs={12} md={6}>

                    <Typography variant="body2"> Secretarias: </Typography>
                    <SelectFragLogin
                        value={idSecretarias}
                        options={secretarias}
                        onInputChange={handleFilterChangeSecretaria}
                        placeholder={"Secretaria"}
                        label={""}
                        disabled={true}
                    />
                </Grid>

                <Grid item xs={12} md={6}>

                    <Typography variant="body2"> Aplicaciones: </Typography>
                    <SelectFragLogin
                        value={idApps}
                        options={apps}
                        onInputChange={handleFilterChangeApps}
                        placeholder={"Seleccione Secretaria"}
                        label={""}
                        disabled={!(!props.idApp)}
                    />
                </Grid>

            </Grid>
            <Grid container justifyContent="center" item xs={12} rowSpacing={2} columnSpacing={2} padding={2} direction="row"
                alignItems="center">

                <Grid item md={2} container justifyContent="center">
                    <Button
                        className="aceptar"
                        onClick={() => {
                            if (!(!nombreUsuario || (nombreUsuario.length < 5) || !nombre)) {
                                isValidEmail() ? handleStoreBtn() : setErrorEmail(true)
                            }
                        }}
                        sx={{ fontFamily: "MontserratRegular" }}
                    >

                        Solicitar Usuario
                    </Button>
                </Grid>



            </Grid>
        </div>
    );
};




