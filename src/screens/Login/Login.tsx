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
import { JWT_Token, sessionValid } from "../../funcs/validation";
import { UserServices } from "../../services/UserServices";
import SliderProgress from "../Componentes/SliderProgress";
import { SolicitudUsuario } from "../SolicitudDeUsuarios/SolicitudUsuario";
import { ls } from "./strings/st";
import "./style/Fonts.css";
import { lstLg, lstMd, lstSm, lstXl, lstXs } from "./style/lst";

interface IApps {
  IdApp: string;
  Nombre: string;
  Path: string;
  Descripcion: string;
}

export const getUserDetail= (idUsuario:string,idApp:string)=>{
  
  axios.post(
    process.env.REACT_APP_APPLICATION_DEV + '/api/userapp-detail',
    {IdUsuario:idUsuario,IdApp:idApp},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken")||"",
      },
    }
  ).then((r)=>{console.log(r.data);
    localStorage.setItem('Menus',JSON.stringify(r.data.menus[0]))
    
  });
}

export const Login = () => {
  let IdUsuario="";
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

  const checkApps = () => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_DEV + "/api/user-apps",
        {
          IdUsuario: localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: opensolicitudModal && jwt ? jwt : JWT_Token,
          },
        }
      )
      .then((r) => {
        if (r.status === 200) {
          const IdApps = r.data.data;

          setAppsList(IdApps);
          openAppModal(
            "success",
            "tu usuario cuenta con acceso a las siguientes plataformas."
          );
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          openDialogModal("error", error.response.data.msg);
        }
      });
  };

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
              window.location.assign(
                arrayApps[0].Path +
                "?jwt=" +
                localStorage.getItem("jwtToken") +
                "&rf=" +
                localStorage.getItem("refreshToken") +
                "&IdApp=" +
                arrayApps[0].IdApp
              );
            } else {
              localStorage.setItem("IdApp",arrayApps[0].IdApp)
              IdUsuario=r.data.IdUsuario;
              getUserDetail(r.data.IdUsuario,arrayApps[0].IdApp);
              navigate("./admin");
            }
          }
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          openDialogModal("error", error.response.data.msg);
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
    // setTimeout(() => {
    localStorage.clear();
    handleCloseAppsModal();
    // }, 100);

    if (localStorage.getItem("jwtToken") !== null) {
      localStorage.clear();
    }
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

          <Grid container sx={{ width: "100vw", height: "100vh" }}>
            <AlertModal
              openM={openModal}
              closeM={handleCloseModal}
              type={modalType}
              text={modalText}
            />
            <Grid
              item
              container
              xl={12}
              xs={12}
              lg={12}
              md={12}
              sm={12}
              sx={{
                height: "5%",
                justifyContent: "flex-start",
                alignItems: "center",
                display: "flex",ml:'2vw'
              }}
            >
              <Typography
                  sx={{ fontFamily: "MontserratBold", color: "#ccc" }}
                >
                  {process.env.REACT_APP_APPLICATION_ENVIRONMENT}
                </Typography>
            </Grid>
            <Grid
              item
              container
              xl={12}
              xs={12}
              lg={12}
              md={12}
              sm={12}
              sx={{
                height: "90%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Grid
                item
                container
                xl={12}
                xs={12}
                lg={12}
                md={12}
                sm={12}
                sx={{
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >

                <Grid
                  item
                  container
                  xl={3}
                  xs={3}
                  lg={3}
                  md={3}
                  sm={3}
                  sx={{
                    height: "60%",
                    justifyItems: "center",
                    alignItems: "center",
                  }}
                >
                  <Grid
                    container
                    item
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "15vh" }}
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

                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
                    <Typography
                      sx={{
                        textOverflow: "ellipsis",
                        fontFamily: "MontserratSemiBold",
                        color: "#858180",
                        textAlign: "center",
                        fontSize: [15, 15, 15, 20, 20], // Tamaños de fuente para diferentes breakpoints

                      }}
                    >
                      {ls.signIn}
                    </Typography>
                  </Grid>

                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
                    <Typography sx={{
                      textOverflow: "ellipsis",
                      fontFamily: "MontserratSemiBold",
                      color: "#858180",
                      textAlign: "center",
                      fontSize: [10, 10, 12, 12, 12], // Tamaños de fuente para diferentes breakpoints

                    }}>
                      {ls.secondaryText}
                    </Typography>
                  </Grid>


                  <Grid
                    item
                    xl={12} lg={12} md={12} sm={12} xs={12}
                    sx={{
                      borderRadius: 10,
                      height: "7vh",
                      width: "100%",
                      fontFamily: "MontserratMedium",
                      //fontSize: ".8vw",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      border: 1,
                      borderColor: "#cccccc",
                    }}
                    style={{ backgroundColor: userInputColor }}
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
                  </Grid>
                  <Grid
                    item
                    xl={12} lg={12} md={12} sm={12} xs={12}
                    sx={{
                      borderRadius: 10,
                      height: "7vh",
                      width: "100%",
                      fontFamily: "MontserratMedium",
                      //fontSize: ".8vw",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      border: 1,
                      borderColor: "#cccccc",
                    }}
                    style={{ backgroundColor: userInputColor }}
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


                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
                  <Button
                          className="AceptarAppLogin"
                          onClick={() => signIn()}
                        >
                          {ls.btnText}
                        </Button>
                  </Grid>
                  
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
                    <Button onClick={() => navigate("../recovery")}>{ls.forgot}</Button>
                  </Grid>
                </Grid>

              </Grid>
            </Grid>

            <Grid
              item
              container
              xl={12}
              xs={12}
              lg={12}
              md={12}
              sm={12}
              sx={{
                height: "5%",
                backgroundColor: "#f3f6f9",
                fontFamily: "MontserratSemiBold",
                fontSize: ".6vw",
                color: "#808080",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Grid
                item
                container
                xl={3}
                xs={3}
                lg={3}
                md={3}
                sm={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Typography sx={{ fontSize: [15, 15, 15, 15, 20] }}>
                  {actualYear()}
                </Typography>
              </Grid>
              <Grid
                item
                container
                xl={4}
                xs={6}
                lg={4}
                md={4}
                sm={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Typography sx={{ fontSize: [15, 15, 15, 15, 20] }}>
                  {ls.footerSecondText}
                </Typography>
              </Grid>
              <Grid
                item
                container
                xl={3}
                xs={3}
                lg={3}
                md={3}
                sm={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Typography sx={{ fontSize: [15, 15, 15, 15, 20] }}>
                  {ls.footerThirdText}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

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
        </>
      )}
    </>
  );
};
