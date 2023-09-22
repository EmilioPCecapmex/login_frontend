import {
  Box,
  Button,
  Grid,
  Input,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import logo from "../../assets/logo.svg";
import AlertModal from "../../components/alertModal";
import { ls } from "./strings/st";
import "./style/Fonts.css";
import { lstXl, lstLg, lstMd, lstSm, lstXs } from "./style/lst";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Forgot = () => {
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

  const [btnBgColor, setBtnBgColor] = useState("#666666");
  const [btnTxtColor, setBtnTxtColor] = useState("#fff");
  const [userInputColor, setUserInputColor] = useState("#cccccc");
  const [userInputTextColor, setUserInputTextColor] = useState("#fff");

  const onChangeUsuario = (v: string) => {
    setUsuario(v);
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

  const verifyUsuario = () => {
    setUserInputColor("#cccccc");
    setUserInputTextColor("#fff");
  };

  const actualYear = () => {
    const year = new Date();
    const yearSt = year.getFullYear();
    return yearSt;
  };

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalText, setModalText] = useState("");
  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getPassword = () => {
    if (usuario === "") {
      setModalType("error");
      setModalText("Ingresa un nombre de usuario o correo electrónico.");
      handleOpenModal();
    } else {
      axios
        .post(
          process.env.REACT_APP_APPLICATION_DEV + "/api/forgot-password",
          {
            NombreUsuario: usuario,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((r) => {
          if (r.status === 200) {
            setModalType("success");
            setModalText(
              "Se ha generado una nueva contraseña, porfavor revisa tu correo electronico registrado."
            );
            handleOpenModal();
          }
        })
        .catch((err) => {
          if (err.response.status === 409) {
            setModalType("error");
            setModalText("Usuario no existe.");
            handleOpenModal();
          }
        });
    }
  };

  return (
    <Grid container sx={{ width: "100vw", height: "100vh" }}>
      <AlertModal
        openM={openModal}
        closeM={handleCloseModal}
        type={modalType}
        text={modalText}
      />
      <Grid item xl={12}
        xs={12}
        lg={12}
        md={12}
        sm={12}
        sx={{ height: "95%" }}>
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
                  />
                </Box>
              </Box>
              <Box sx={st.btnBox}>
                <Button
                  variant="outlined"
                  onMouseOver={() => onFocusButton()}
                  onMouseLeave={() => onFocusLeaveButton()}
                  sx={st.signInBtn}
                  onClick={() => getPassword()}
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
                <Button onClick={() => navigate("../")} sx={st.forgotBtn}>
                  {ls.forgot}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>

      <Grid item container xl={12}
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
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center"
        }}>
          <Grid item container xl={3}
            xs={3}
            lg={3}
            md={3}
            sm={3} sx={{display:"flex",justifyContent:"center"}}>
              <Typography sx={{fontSize: [15, 15, 15, 15, 20],}}>{actualYear()}</Typography>
              
            </Grid>
          <Grid item container xl={4}
            xs={6}
            lg={4}
            md={4}
            sm={4} sx={{display:"flex",justifyContent:"center"}}>
              <Typography sx={{fontSize: [15, 15, 15, 15, 20],}}>{ls.footerSecondText}</Typography>
              
            </Grid>
          <Grid item container xl={3}
            xs={3}
            lg={3}
            md={3}
            sm={3}sx={{display:"flex",justifyContent:"center"}}>
              <Typography sx={{fontSize: [15, 15, 15, 15, 20],}}>{ls.footerThirdText}</Typography>
              
            </Grid>
      </Grid>
    </Grid>
  );
};
