import {
    Autocomplete,
    Button,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
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
import { getCatalogo } from "../../services/catalogosService";
import { log } from "console";
import { IDepartamento, IDependencia, IPerfil, IRol, ISecretaria, IUResponsable } from "./ICatalogos";


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
    // arrays de listas
    // const [tpoDependencia, setTpoDependencia] = useState();
    const [departamentos, setDepartamentos] = useState<Array<IDepartamento>>([]);
    const [roles, setRoles] = useState<Array<IRol>>([]);
    const [dependencias, setDependencias] = useState<Array<IDependencia>>([]);
    const [perfiles, setPerfiles] = useState<Array<IPerfil>>([]);
    const [secretarias, setSecretarias] = useState<Array<ISecretaria>>([]);
    const [uResponsables, setUResponsables] = useState<Array<IUResponsable>>([]);

    const [dependenciasFiltered, setDependenciasFiltered] = useState<Array<IDependencia>>([]);
    const [secretariasFiltered, setSecretariasFiltered] = useState<Array<ISecretaria>>([]);

    useEffect(() => {
        setDependenciasFiltered(dependencias)
    }, [dependencias])
    useEffect(() => {
        setSecretariasFiltered(secretarias)
    }, [secretarias])
    //elementos seleccionados
    const [departamento, setDepartamento] = useState<IDepartamento>({
        Id: '',
        Descripcion: '',
        NombreCorto: '',
        IdResponsable: '',
        Responsable: '',
        UltimaActualizacion: '',
        FechaCreacion: '',
        ModificadoPor: '',
        Modificador: '',
        CreadoPor: '',
        Creador: '',
        Deleted:'',
    });
    const [dependencia, setDependencia] = useState<IDependencia>({
        Id: '',
        Nombre: '',
        Direccion: '',
        Telefono: '',
        IdTipoDependencia: '',
        TipoDependencia: '',
        IdTitular: '',
        Titular: '',
        IdPerteneceA: '',
        PerteneceA: '',
        Deleted:'',
    });
    const [rol, setRol] = useState<IRol>({
        ControlInterno: '',
        Deleted:'',
        Descripcion: '',
        Id: '',
        Nombre: ''
    });
    const [perfil, setPerfil] = useState<IPerfil>({
        Deleted:'',
        Descripcion: '',
        Id: '',
        Referencia: '',
    });
    const [uResponsable, setUResponsable] = useState<IUResponsable>({
        Clave: '',
        Deleted:'',
        Descripcion: '',
        Id: '',
    })
    const [secretaria, setSecretaria] = useState<ISecretaria>({
        Deleted:'',
        Direccion: '',
        Id: '',
        IdTitular: '',
        Nombre: '',
        Nombre_corto: '',
        PerteneceA: '',
        Titular: ''
    })
    useEffect(() => {
        if (dependencia.Id != '') {
            let aux = secretarias.find((sec) => sec.Id === dependencia.IdPerteneceA)
            console.log('aux', aux);
            console.log('dependencia', dependencia);
            console.log('secretarias', secretarias);
            if (aux !== undefined) {
                setSecretaria(aux);
            }
        }
        else { setSecretariasFiltered(secretarias) }
    }, [dependencia.Id])


    useEffect(() => {
        if (secretaria.Id !== '') {
            setDependenciasFiltered(dependencias.filter((obj) => obj.IdPerteneceA === secretaria.Id))
        }
        else { setSecretariasFiltered(secretarias) }
    }, [secretaria])

    useEffect(() => {
        console.log('condicion', secretariasFiltered.find((obj) => obj === secretaria));

        if (dependenciasFiltered.find((obj) => obj === dependencia) === undefined)
            setDependencia({
                Id: '',
                Nombre: '',
                Direccion: '',
                Telefono: '',
                IdTipoDependencia: '',
                TipoDependencia: '',
                IdTitular: '',
                Titular: '',
                IdPerteneceA: '',
                PerteneceA: '',
                Deleted:'',
            })

    }, [dependenciasFiltered])


    // useEffect(() => {
    //     console.log("tpo", tpoDependencia);
    //     console.log("departamentos", departamentos);
    //     console.log("roles", roles);
    //     console.log("dependencias", dependencias);
    //     console.log("perfiles", perfiles);
    //     console.log("secretarias", secretarias);
    //     console.log("uresponsables", uresponsables);
    // }, [tpoDependencia])

    const [nombre, setNombre] = useState("");
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [apellidoPaterno, setApellidoPaterno] = useState("");
    const [apellidoMaterno, setApellidoMaterno] = useState("");
    const [correo, setCorreo] = useState("");
    const [puesto, setPuesto] = useState("");
    // const [dependencia, setDependencia] = useState("");


    const [celular, setCelular] = useState(0);
    const [telefono, setTelefono] = useState(0);
    const [ext, setExt] = useState(0);
    const [curp, setCurp] = useState("");
    const [rfc, setRfc] = useState("");
    const [tipousuario, setTipoUsuario] = useState("");

    const [idLabelRol, setIdLabelRol] = useState<string>("");

    const [puedeFirmar, setPuedeFirmar] = useState(false);
    // const [departamento, setDepartamentos] = useState<SelectValues[]>([]);

    const [idLabelDepartamentoNoAdmin, setLabelDepartamentoNoAdmin] = useState<string>("");
    const [idLabelPerfilNoAdmin, setLabelPerfilNoAdmin] = useState<string>("");

    // const [perfiles, setPerfiles] = useState<SelectValues[]>([]);

    // const [idRol, setIdRol] = useState<string>("");
    // const [secretarias, setSecretarias] = useState<SelectValues[]>([]);
    const [idSecretarias, setIdSecretarias] = useState<string>("");
    const [apps, setApps] = useState<SelectValues[]>([]);
    const [app, setApp] = useState<SelectValues>({
        value: '',
        label: ''
    });
    //const [UResponsable, setUResponsable] = useState<SelectValues[]>([]);
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


    // const handleFilterChangeDepartamento = (v: any) => {
    //     console.log(v.value);

    //     setIdDepartamento(v.value);
    //     setNameDep(v.label);
    //     //consultaSecretarias(v.value, "select")
    // };

    const handleFilterChangeUResponsable = (v: any) => {
        console.log(v)
        setIdUResponsable(v.value);
        setNameUresp(v.label);
    };
    const handleFilterChangeSecretaria = (v: any) => {
        setIdSecretarias(v.value);
    };
    const handleFilterChangeApps = (v: any) => {
        setApp(v.value);

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
            rol.Id === "" ||
            departamento.Id === '' ||
            uResponsable.Id === "" ||
            perfil.Id === "" ||
            dependencia.Id === ''
        ) {
            Swal.fire({
                icon: "error",
                title: "Mensaje",
                text: "Completa todos los campos para continuar",
            });
        } else {

            const data = {
                Nombre: nombre,
                APaterno: apellidoPaterno,
                AMaterno: apellidoMaterno,
                NombreUsuario: nombreUsuario,
                Email: correo,
                Curp: curp,
                RFC: rfc,
                Celular: celular,
                Telefono: telefono,
                Extencion: ext,
                TipoSolicitud: "ALTA",
                DatosAdicionales: "",
                IdApp: app.value,
                CreadoPor: props.idUsuarioSolicitante ? props.idUsuarioSolicitante : localStorage.getItem("IdUsuario"),
                IdUResponsable: uResponsable.Id,
                IdPerfil: perfil.Id,
                IdRol: rol.Id,
                IdDepartamento: departamento.Id,
                IdTipoUsuario: tipousuario,
                PuedeFirmar: puedeFirmar ? 1 : 0,
                Puesto: puesto,
                Dependencia: dependencia.Id,
            };

            UserServices.createsolicitud(data, String(jwt) !== "null" ? String(jwt) : String(localStorage.getItem("jwtToken"))).then((res) => {
                if (res.status === 200) {
                    setUserTypes(res?.data?.data);
                } else {
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

    // const consultaSecretarias = (idDepartamento: string, opcion: string) => {
    //     setOpenSlider(true);
    //     UserServices.consultaCatalogos({ idDep: idDepartamento, cat: "7", opcion: opcion }, String(jwt) !== "null" ? String(jwt) : String(localStorage.getItem("jwtToken"))).then((res) => {
    //         if (res.status === 200) {
    //             // setIdDepartamento(res.data);
    //             setOpenSlider(false)
    //         }
    //     });

    // };


    const consulta = (catalogo: string, opcion: string) => {
        setOpenSlider(true);
        UserServices.consultaCatalogos({ cat: catalogo, opcion: opcion }, String(jwt) !== "null" ? String(jwt) : String(localStorage.getItem("jwtToken"))).then((res) => {
            if (res.status === 200) {
                if (catalogo === "2" && opcion === "select") {
                    setApps(res.data.data);
                }
                setOpenSlider(false)
            }
        });

    };
    useEffect(() => {
        // setOpenSlider(true)

        getAllUserTypes();
        // consulta("1", "select");
        consulta("2", "select");
        // consulta("3", "select");
        // consulta("4", "select");
        // consulta("5", "select");
        // consulta("6", "select");

        // getCatalogo("tipodependencias", setTpoDependencia)
        getCatalogo("departamentos", setDepartamentos)
        getCatalogo("roles", setRoles)
        getCatalogo("dependencias", setDependencias)
        getCatalogo("perfiles", setPerfiles)
        getCatalogo("secretarias", setSecretarias)
        getCatalogo("uresponsables", setUResponsables)

        if (props.idApp) {

            let aux = apps.find((app) => app.id = props.idApp)
            if (aux)
                setApp(aux)
        }


    }, []);

    useEffect(() => {
        console.log('secretarias', secretarias);
    }, [secretarias])



    return (
        <div className="ContainerSolicitudesUsuario" style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
            <SliderProgress open={false} texto={""} />

            <Paper sx={{ height: "90vh", width: "80vw",mt:"2vh",bgcolor:"#fefdfc", overflow:"auto" }} >
                <Grid container height={"100%"} width={"100%"} display={"flex"} justifyContent={"space-evenly"} rowSpacing={"2"} >

                    <Grid item xs={10} md={4.5}>
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
                    <Grid item xs={10} md={4.5}>
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


                    <Grid item xs={10} md={4.5}>
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
                    <Grid item xs={10} md={4.5}>
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


                    <Grid item xs={10} md={4.5}>
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
                    <Grid item xs={10} md={4.5}>
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

                    <Grid item xs={10} md={4.5}>
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
                    <Grid item xs={10} md={4.5}>
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
                    <Grid item xs={10} md={4.5}>
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
                    <Grid item xs={10} md={4.5} >
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

                    <Grid item xs={10} md={4.5}>
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

                    </Grid>
                    <Grid item xs={10} md={4.5} sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

                        <TextField
                            sx={{ width: "70%" }}
                            margin="dense"
                            id="ext"
                            label="Ext"
                            value={ext === 0 ? "" : ext}
                            variant="standard"
                            onChange={(v) => compruebaExt(parseInt(v.target.value))}
                        />

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

                    <Grid item xs={10} md={4.5}>
                        <Typography variant="body2"> Secretarias: </Typography>
                        <Autocomplete
                            options={secretariasFiltered}
                            getOptionLabel={(secretaria) => secretaria.Nombre || 'Seleccione secretaria'}
                            value={secretaria}
                            onChange={(event, newValue) => {
                                if (newValue != null) { setSecretaria(newValue); }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    key={params.id}
                                    {...params}
                                    variant="outlined"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={10} md={4.5}>
                        {/* <Typography variant="body2"> Dependencias: </Typography> */}
                        {/* <SelectFragLogin
                        value={idDepartamento}
                        options={departamentos}
                        onInputChange={handleFilterChangeDepartamento}
                        placeholder={"Seleccione Departamento"}
                        label={idLabelDepartamentoNoAdmin ? idLabelDepartamentoNoAdmin : ""}
                        disabled={false}

                    /> */}
                        <Typography variant="body2"> Dependencias: </Typography>
                        <Autocomplete
                            options={dependenciasFiltered}
                            getOptionLabel={(option) => option.Nombre || 'Seleccione dependencia'}
                            value={dependencia}
                            onChange={(event, newValue) => {
                                if (newValue != null) { setDependencia(newValue); }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    key={params.id}
                                    {...params}
                                    variant="outlined"
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={10} md={4.5}>
                        <Typography variant="body2"> Departamentos: </Typography>
                        <Autocomplete
                            options={departamentos}
                            getOptionLabel={(departamento) => departamento.Descripcion || 'Seleccione departamento'}
                            value={departamento}
                            onChange={(event, newValue) => {
                                if (newValue != null) { setDepartamento(newValue); }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    key={params.id}
                                    {...params}
                                    variant="outlined"
                                />
                            )}
                        />
                        {/* <Typography variant="body2"> Dependencias: </Typography> */}
                        {/* <SelectFragLogin
                        value={idDepartamento}
                        options={departamentos}
                        onInputChange={handleFilterChangeDepartamento}
                        placeholder={"Seleccione Departamento"}
                        label={idLabelDepartamentoNoAdmin ? idLabelDepartamentoNoAdmin : ""}
                        disabled={false}

                    /> */}
                        {/* <Autocomplete
                        
                        options={departamentos}
                        getOptionLabel={(option) => option.Nombre}
                        value={dependencia}
                        onChange={(event, newValue) => {
                            if(newValue!= null)
                            {setDependencia(newValue);}
                        }}
                        renderInput={(params) => (
                            <TextField
                                key={params.id}
                                {...params}
                                label="Dependencias"
                                variant="outlined"
                            />
                        )}
                    /> */}
                    </Grid>
                    <Grid item xs={10} md={4.5}>
                        <Typography variant="body2"> Perfiles: </Typography>
                        <Autocomplete
                            options={perfiles}
                            getOptionLabel={(perfil) => perfil.Descripcion || 'Seleccione departamento'}
                            value={perfil}
                            onChange={(event, newValue) => {
                                if (newValue != null) { setPerfil(newValue); }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    key={params.id}
                                    {...params}
                                    variant="outlined"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={10} md={4.5}>
                        <Typography variant="body2"> Roles: </Typography>
                        <Autocomplete
                            options={roles}
                            getOptionLabel={(rol) => rol.Nombre || 'Seleccione rol'}
                            value={rol}
                            onChange={(event, newValue) => {
                                if (newValue != null) { setRol(newValue); }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    key={params.id}
                                    {...params}
                                    variant="outlined"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={10} md={4.5}>
                        <Typography variant="body2"> Unidad Responsable: </Typography>
                        <Autocomplete
                            options={uResponsables}
                            getOptionLabel={(uresponsable) => uresponsable.Descripcion || 'Seleccione unidad  responsable'}
                            value={uResponsable}
                            onChange={(event, newValue) => {
                                if (newValue != null) { setUResponsable(newValue); }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    key={params.id}
                                    {...params}
                                    variant="outlined"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={10} md={4.5}>
                        <Typography variant="body2"> Aplicaciones: </Typography>
                        <Autocomplete
                            options={apps}
                            getOptionLabel={(app) => app.label || 'Seleccione aplicacion'}
                            value={app}
                            onChange={(event, newValue) => {
                                if (newValue != null) { setApp(newValue); }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    key={params.id}
                                    {...params}
                                    variant="outlined"
                                />
                            )}
                        />
                    </Grid>
                    {/* //Buttons */}

                    <Grid item xs={10} md={4.5} display={"flex"} justifyContent="flex-end" alignItems={"center"}>
                        <Button

                            className="aceptar"
                            onClick={() => {
                                if (!(!nombreUsuario || (nombreUsuario.length < 5) || !nombre)) {
                                    isValidEmail() ? handleStoreBtn() : setErrorEmail(true)
                                }
                            }}
                            sx={{ fontFamily: "MontserratRegular", maxHeight: "50%" }}
                        >

                            Solicitar Usuario
                        </Button>
                    </Grid>

                </Grid>
            </Paper>

        </div>
    );
};




