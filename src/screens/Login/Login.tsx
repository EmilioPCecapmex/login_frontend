import {
  Box,
  Button,
  Grid,
  Input,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import AlertModal from "../../components/alertModal";
import AppsModal from "../../components/appsModal";
import { JWT_Token } from "../../funcs/validation";
import { UserServices } from "../../services/UserServices";
import SliderProgress from "../Componentes/SliderProgress";
import { SolicitudUsuario } from "../SolicitudDeUsuarios/SolicitudUsuario";
import { ls } from "./strings/st";
import "./style/Fonts.css";
import { lstLg, lstMd, lstSm, lstXl, lstXs } from "./style/lst";
import { DialogMantenimiento } from "../../components/dialogMantenimiento/DialogMantenimiento";

interface IApps {
  IdApp: string;
  Nombre: string;
  Path: string;
  Descripcion: string;
  EstaActivo:number;
}

export const getUserDetail = (idUsuario: string, idApp: string) => {

  axios.post(
    process.env.REACT_APP_APPLICATION_DEV + '/api/userapp-detail',
    { IdUsuario: idUsuario, IdApp: idApp },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    }
  ).then((r) => {
    localStorage.setItem('Menus', JSON.stringify(r.data.menus[0]))

  });
}

export const Login = () => {
  let IdUsuario = "";
  const urlParams = window.location.search;
  const query = new URLSearchParams(urlParams);
  const jwt = query.get("jwt");
  const idAppSolicitante = query.get("IdApp");

  const navigate = useNavigate();
  const theme = useTheme();
  let st = lstXl;

  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isXs = useMediaQuery(theme.breakpoints.up("xs"));

  if (isXl) st = lstXl;
  else if (isLg) st = lstLg;
  else if (isMd) st = lstMd;
  else if (isSm) st = lstSm;
  else if (isXs) st = lstXs;

  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [userInputColor, setUserInputColor] = useState("#cccccc");
  const [userInputTextColor, setUserInputTextColor] = useState("#fff");
  const [contrasenaInputColor, setContrasenaInputColor] = useState("#cccccc");
  const [contrasenaTextInputColor, setContrasenaTextInputColor] =
    useState("#fff");
  const [openModal, setOpenModal] = useState(false);
  const [openAppsModal, setOpenAppsModal] = useState(false);
  const [opensolicitudModal, setOpensolicitudModal] = useState(false);
  const [existenParams, setExistenParams] = useState(true);
  const [openSlider, setOpenSlider] = useState(true);
  const [idUsuarioSolicitante, setIdUsuarioSolicitante] = useState("");
  const [mensajeSlider, setMensajeSlider] = useState("Validando...");


  const [appsList, setAppsList] = useState<Array<IApps>>([
    {
      IdApp: "",
      Nombre: "",
      Path: "",
      Descripcion: "",
      EstaActivo:0,
    },
  ]);

  const [modalType, setModalType] = useState("");
  const [modalText, setModalText] = useState("");
  const handleOpenModal = () => setOpenModal(true);

  const handleOpenAppsModal = () => setOpenAppsModal(true);

  const onChangeUsuario = (v: string) => {
    setUsuario(v);
  };

  const onChangePassword = (v: string) => {
    setContrasena(v);
  };

  const onClickTxtUsuario = () => {
    setUserInputColor("#fff");
    setUserInputTextColor("#666666");
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      signIn();
    }
  };

  const onClickTxtContrasena = () => {
    setContrasenaInputColor("#fff");
    setContrasenaTextInputColor("#666666");
  };

  const verifyUsuario = () => {
    setUserInputColor("#cccccc");
    setUserInputTextColor("#fff");
  };

  const verifyContrasena = () => {
    setContrasenaInputColor("#cccccc");
    setContrasenaTextInputColor("#fff");
  };

  const actualYear = () => {
    const year = new Date();
    const yearSt = year.getFullYear();
    return yearSt;
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseAppsModal = () => {
    setOpenAppsModal(false);
  };

  const openDialogModal = (type: string, text: string) => {
    setModalType(type);
    setModalText(text);
    handleOpenModal();
  };

  const openAppModal = (type: string, text: string) => {
    setModalType(type);
    setModalText(text);
    handleOpenAppsModal();
  };

  // const checkApps = () => {
  //   axios
  //     .post(
  //       process.env.REACT_APP_APPLICATION_DEV + "/api/user-apps",
  //       {
  //         IdUsuario: localStorage.getItem("IdUsuario"),
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           authorization: opensolicitudModal && jwt ? jwt : JWT_Token,
  //         },
  //       }
  //     )
  //     .then((r) => {
  //       if (r.status === 200) {
  //         const IdApps = r.data.data;

  //         setAppsList(IdApps);
  //         openAppModal(
  //           "success",
  //           "tu usuario cuenta con acceso a las siguientes plataformas."
  //         );
  //       }
  //     })
  //     .catch((error) => {
  //       if (error.response.status === 401) {
  //         openDialogModal("error", error.response.data.msg);
  //       }
  //     });
  // };

  const verifyToken = () => {
    if (jwt) {
      // setOpenSlider(true);
      UserServices.verify({}, String(jwt)).then((res) => {
        if (res.status === 200) {
          let data = {
            IdUsuario: res.data.data.IdUsuario,
          };
          UserServices.userDetail(data, String(jwt)).then((resuserDetail) => {
            if (resuserDetail.status === 200) {
              if ((res.data.data.exp - Date.now() / 1000) / 60 > 5) {
                setOpensolicitudModal(true);
                setIdUsuarioSolicitante(res?.data?.data?.IdUsuario);
                setOpenSlider(false);
                if (!existenParams) {
                  setExistenParams(false);
                }
              } else {
                setOpensolicitudModal(false);
                setMensajeSlider(
                  "¡El Token ha expirado. Vuelva a iniciar sesión!"
                );
              }
            }
          });
        }
      });
    }
  };
  const[openDialogMantenimiento,setOpenDialogMantenimiento]=useState(false)
  const[nombreApp,setNombreApp]=useState('')

  const handleCloseDialogMantenimiento=()=>{
    setOpenDialogMantenimiento(false)
  }

  const handlOpenDialogMantenimiento=(nombreApp:string)=>{
    setOpenDialogMantenimiento(true);
    setNombreApp(nombreApp);
  }

  const validateCredentials = () => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_DEV + "/api/login",
        {
          NombreUsuario: usuario,
          Contrasena: contrasena,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((r) => {
        if (r.status === 200) {
          localStorage.setItem("IdUsuario", r.data.IdUsuario);
          localStorage.setItem("jwtToken", r.data.token);
          localStorage.setItem("refreshToken", r.data.refreshToken);
          document.cookie = "jwt=" + r.data.token;
          let arrayApps: Array<IApps> = r.data.AppIds;
          setAppsList(arrayApps);
          userDetail();
          if (arrayApps.length > 1) {
            openAppModal(
              "success",
              r.data.AppIds[0].Msg ||
              "tu usuario cuenta con acceso a las siguientes plataformas."
            );
          }

          if (arrayApps.length === 1) {
            if (arrayApps[0].Path !== "./admin") {
              if(arrayApps[0].EstaActivo == 1)
                window.location.replace(
                  arrayApps[0].Path +
                  "?jwt=" +
                  localStorage.getItem("jwtToken") +
                  "&rf=" +
                  localStorage.getItem("refreshToken") +
                  "&IdApp=" +
                  arrayApps[0].IdApp
                );
              else{
                console.log('arrayApps[0].Nombre',arrayApps[0])
              handlOpenDialogMantenimiento(arrayApps[0].Nombre);}
            } else {
              localStorage.setItem("IdApp", arrayApps[0].IdApp)
              IdUsuario = r.data.IdUsuario;
              getUserDetail(r.data.IdUsuario, arrayApps[0].IdApp);
              navigate("./admin");
            }
          }
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          openDialogModal("error", error.response.data.msg);
        }else{
          openDialogModal("error", "Por favor, intenta iniciar sesión de nuevo en unos minutos. Si el problema persiste, no dudes en ponerte en contacto con nuestro equipo de soporte técnico.");
        }
      });
  };

  const userDetail = () => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_DEV + "/api/user-detail",
        {
          IdUsuario: localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") as string,
            "Content-Type": "application/json",
          },
        }
      )
      .then((r) => {
        if (r.status === 200) {
          localStorage.setItem(
            "NombreUsuario",
            r.data.data.Nombre + " " + r.data.data.ApellidoPaterno
          );
        }
      });
  };

  const signIn = () => {
    if (usuario === "" && contrasena === "") {
      openDialogModal("error", "Ingresa tu nombre de usuario y/o contraseña.");
    } else {
      validateCredentials();
    }
  };
  useEffect(() => {
    // setOpenSlider(true)
    if (jwt && idAppSolicitante) {
      setExistenParams(true);
      setOpenSlider(true);
      verifyToken();
    } else {
      setExistenParams(false);
      setOpenSlider(false);
    }

    // if (localStorage.getItem("jwtToken")) {
    //   sessionValid().then((r) => {
    //     if (localStorage.getItem("validation") === "true") checkApps();
    //   });
    // }
  }, []);
  useEffect(() => {
    if(!(jwt && idAppSolicitante)){
      localStorage.clear();
    }else{
      handleCloseAppsModal();
    }
    // // setTimeout(() => {
    // localStorage.clear();
    // handleCloseAppsModal();
    // // }, 100);

    // if (localStorage.getItem("jwtToken") !== null) {
    //   localStorage.clear();
    // }
  }, []);

  return (
    <>
      {jwt && idAppSolicitante ? (
        <>
          {opensolicitudModal ? (
            <SolicitudUsuario
              handleDialogClose={setOpensolicitudModal}
              modoModal={opensolicitudModal}
              token={String(jwt)}
              idUsuarioSolicitante={String(idUsuarioSolicitante)}
              idUsuarioModificado={""}
              idApp={String(idAppSolicitante)}
            />
          ) : (
            <SliderProgress open={openSlider} texto={mensajeSlider} />
          )}
        </>
      ) : (
        <>
          <SliderProgress open={openSlider} texto={mensajeSlider} />
          <div className="ContentLogin">
            <Grid item sx={{ ...st.parentBox, flexDirection: "column" }}>
              <Grid sx={{ width: "100vw", height: "94vh",alignItems:"center",display:"flex",flexDirection:"column" }}>
                <Box sx={{top: 10, left: 10,width:"100vw",height:"5vh" }}>
                  <Typography
                    sx={{ fontFamily: "MontserratBold", color: "#ccc" }}
                  >
                    {process.env.REACT_APP_APPLICATION_ENVIRONMENT}
                  </Typography>
                  {/* <Typography sx={{ fontFamily: 'MontserratBold', color: '#ccc' }}>{jwt}</Typography> */}
                </Box>
                {openAppsModal ? (
                  <AppsModal
                    openM={openAppsModal}
                    closeM={handleCloseAppsModal}
                    type={modalType}
                    text={modalText}
                    apps={appsList}
                    idUsuario={IdUsuario}
                  />
                ) : null}
                <AlertModal
                  openM={openModal}
                  closeM={handleCloseModal}
                  type={modalType}
                  text={modalText}
                />
                <Box sx={{width:"100%",height:"89vh",display:"flex",alignItems:"center"}}>
                  <Box sx={{ ...st.horizontalBox }}>
                  <Box sx={st.centerBox}>
                    <Box sx={st.loginBox}>
                      <Grid container>
                        <Grid
                          container
                          item
                          xs={12}
                          justifyContent="center"
                          alignItems="flex-end"
                        >
                          <img
                            alt="Logo"
                            src={logo}
                            style={{
                              objectFit: "scale-down",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </Grid>
                        <Grid container item xs={12} justifyContent="center">
                          <Typography sx={st.loginText}>{ls.signIn}</Typography>
                        </Grid>
                        <Grid
                          container
                          item
                          xs={12}
                          justifyContent="center"
                          sx={st.secondaryTextBox}
                        >
                          <Typography sx={st.secondaryText}>
                            {ls.secondaryText}
                          </Typography>
                        </Grid>
                        <Box sx={st.parentBoxUserField}>
                          <Box
                            style={{ backgroundColor: userInputColor }}
                            sx={st.userFieldBox}
                          >
                            <Input
                              disableUnderline
                              value={usuario}
                              placeholder={ls.placeholderUser}
                              onChange={(v) => onChangeUsuario(v.target.value)}
                              id="usrPlaceholder"
                              sx={st.userField}
                              style={{ color: userInputTextColor }}
                              onClickCapture={() => onClickTxtUsuario()}
                              onBlurCapture={() => verifyUsuario()}
                              onKeyDown={handleKeyDown}
                            />
                          </Box>
                        </Box>
                        <Grid sx={st.parentBoxPassField}>
                          <Grid
                            style={{ backgroundColor: contrasenaInputColor }}
                            sx={st.passFieldBox}
                          >
                            <Input
                              disableUnderline
                              placeholder={ls.placeholderPass}
                              onChange={(v) => onChangePassword(v.target.value)}
                              type="password"
                              id="pswPlaceholder"
                              sx={st.passField}
                              style={{ color: contrasenaTextInputColor }}
                              onClickCapture={() => onClickTxtContrasena()}
                              onBlurCapture={() => verifyContrasena()}
                              onKeyDown={handleKeyDown}
                            />
                          </Grid>
                        </Grid>
                        <Box sx={st.btnBox}>
                          <Button
                            className="AceptarAppLogin"
                            onClick={() => signIn()}
                          >
                            {ls.btnText}
                          </Button>
                        </Box>
                        <Box sx={st.forgotBox}>
                          <Button
                            onClick={() => navigate("./recovery")}
                            sx={st.forgotBtn}
                          >
                            {ls.forgot}
                          </Button>
                        </Box>
                      </Grid>
                    </Box>
                  </Box>
                </Box>
                </Box>
                

              </Grid>
              <Grid sx={{ width: "100vw", height: "7vh"}}>

                
                  <Grid
                    paddingTop={2}
                    container
                    direction="row"
                    justifyContent="center"
                    sx={{bgcolor:"#f3f6f9"}}
                    height={"100%"}
                  >
                    <Grid item container xs={10} justifyContent="center">
                      <Grid
                        container
                        xs={3}
                        sm={4}
                        md={3}
                        paddingRight={2}
                        justifyContent="flex-end"
                      ><Typography sx={{ fontFamily: "MontserratBold", color: "#808080", }} >
                        {actualYear()}
                      </Typography>
                        
                      </Grid>
                      <Grid
                        container
                        item
                        xs={6}
                        sm={4}
                        md={3}
                        justifyContent="center"
                      ><Typography sx={{ fontFamily: "MontserratBold", cursor: "pointer",color: "#808080", }} onClick={() => window.open(process.env.REACT_APP_APPLICATION_AVISOPRIVACIDAD, '_blank')}>
                          {ls.footerSecondText}
                        </Typography>

                      </Grid>
                      <Grid item xs={3} sm={4} md={3}>
                        {/* {ls.footerThirdText} */}
                      </Grid>
                    </Grid>
                    <Box sx={{right: 5, bottom: 5 }}>
                      <Typography
                        sx={{
                          fontFamily: "MontserratBold",
                          fontSize: "10px",
                          color: "#808080",
                        }}
                      > 
                        v.{process.env.REACT_APP_APPLICATION_VERSION}
                      </Typography>
                    </Box>
                  </Grid>
                
              </Grid>


            </Grid>
          </div>
          <DialogMantenimiento app={nombreApp}  open={openDialogMantenimiento} handleClose={handleCloseDialogMantenimiento}/>
        </>
      )}
    </>
  );
};
