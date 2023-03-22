import {
  Box,
  Button,
  Input,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import AlertModal from "../../components/alertModal";
import { ls } from "./strings/st";
import "./style/Fonts.css";
import { lstXl, lstLg, lstMd, lstSm, lstXs } from "./style/lst";
import { useNavigate } from "react-router-dom";
import AppsModal from "../../components/appsModal";
import axios from "axios";
import { JWT_Token, sessionValid } from "../../funcs/validation";

export const Login = () => {

  useEffect(() => {
    setTimeout(() => {
    localStorage.clear();
    handleCloseAppsModal();
    }, 100);
    
   if(localStorage.getItem("jwtToken") !==null)
     { localStorage.clear();}

    
    
  }, [])
  
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

  const [btnBgColor, setBtnBgColor] = useState("#666666");
  const [btnTxtColor, setBtnTxtColor] = useState("#fff");
  const [userInputColor, setUserInputColor] = useState("#cccccc");
  const [userInputTextColor, setUserInputTextColor] = useState("#fff");

  const [contrasenaInputColor, setContrasenaInputColor] = useState("#cccccc");
  const [contrasenaTextInputColor, setContrasenaTextInputColor] =
    useState("#fff");

  const [openModal, setOpenModal] = useState(false);
  const [openAppsModal, setOpenAppsModal] = useState(false);

  const [appsList, setAppsList] = useState({
    IdApp: "",
    Nombre: "",
    Path: "",
  });

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

  const onFocusButton = () => {
    setBtnBgColor("#fff");
    setBtnTxtColor("#666666");
  };

  const onFocusLeaveButton = () => {
    setBtnBgColor("#666666");
    setBtnTxtColor("#fff");
  };

  const onClickTxtUsuario = () => {
    setUserInputColor("#fff");
    setUserInputTextColor("#666666");
  };

  const handleKeyDown = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      signIn()
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
            authorization: JWT_Token,
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

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      sessionValid().then((r) => {
        if (localStorage.getItem("validation") === "true") checkApps();
      });
    }
  }, []);

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
          document.cookie = "jwt="+r.data.token;
          
          setAppsList(r.data.AppIds);
          openAppModal(
            "success",
            r.data.AppIds[0].Msg ||
              "tu usuario cuenta con acceso a las siguientes plataformas."
          );

          userDetail()
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
            "Authorization": localStorage.getItem("jwtToken") as string,
            "Content-Type": "application/json",
          },
        }
      )
      .then((r) => {
        if(r.status === 200){
          localStorage.setItem("NombreUsuario", r.data.data.Nombre + " "+ r.data.data.ApellidoPaterno)
        } 
   
      })
   
  };

  const signIn = () => {
    if (usuario === "" && contrasena === "") {
      openDialogModal("error", "Ingresa tu nombre de usuario y/o contraseña.");
    } else {
      validateCredentials();
    }
  };

  

  return (
    <Box sx={st.parentBox}>
      <Box sx={{position: 'absolute', top: 10, left: 10,}}>
        <Typography sx={{fontFamily: 'MontserratBold',color: '#ccc'}}>{process.env.REACT_APP_APPLICATION_ENVIRONMENT}</Typography>
      </Box>
      {openAppsModal ? (
        <AppsModal
          openM={openAppsModal}
          closeM={handleCloseAppsModal}
          type={modalType}
          text={modalText}
          apps={appsList}
        />
      ) : null}

      <AlertModal
        openM={openModal}
        closeM={handleCloseModal}
        type={modalType}
        text={modalText}
      />
      <Box sx={st.horizontalBox}>
        <Box sx={st.centerBox}>
          <Box sx={st.loginBox}>
            <Box sx={st.contentBox}>
              <Box sx={st.imgBox}>
                <img alt="Logo" src={logo} style={st.imgSize} />
              </Box>

              <Box sx={st.loginTextBox}>
                <Typography sx={st.loginText}>{ls.signIn}</Typography>
              </Box>

              <Box sx={st.secondaryTextBox}>
                <Typography sx={st.secondaryText}>
                  {ls.secondaryText}
                </Typography>
              </Box>

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
              <Box sx={st.parentBoxPassField}>
                <Box
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
                </Box>
              </Box>
              <Box sx={st.btnBox}>
                <Button
                  variant="outlined"
                  onMouseOver={() => onFocusButton()}
                  onMouseLeave={() => onFocusLeaveButton()}
                  sx={st.signInBtn}
                  onClick={() => signIn()}
                  style={{
                    backgroundColor: btnBgColor,
                    color: btnTxtColor,
                    borderColor: btnTxtColor,
                  }}
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
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={st.footer}>
        <Box>{actualYear()}</Box>
        <Box sx={st.footerCenterText}>{ls.footerSecondText}</Box>
        <Box>{ls.footerThirdText}</Box>
        <Box position={"absolute"} bottom={0} right={0}> v.{process.env.REACT_APP_APPLICATION_VERSION}</Box>
      </Box>
    </Box>
  );
};
