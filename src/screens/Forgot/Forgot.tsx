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
              "Se ha generado una nueva contraseña, porfavor revisa tu correo electrónico registrado."
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
    <div className="ContentLogin">
      <Grid item sx={{ ...st.parentBox, flexDirection: "column" }}>
        <Grid sx={{ width: "100vw", height: "94vh", alignItems: "center", display: "flex", flexDirection: "column" }}>
          <Box sx={{ top: 10, left: 10, width: "100vw", height: "5vh" }}>
            <Typography
              sx={{ fontFamily: "MontserratBold", color: "#ccc" }}
            >
              {process.env.REACT_APP_APPLICATION_ENVIRONMENT}
            </Typography>
            {/* <Typography sx={{ fontFamily: 'MontserratBold', color: '#ccc' }}>{jwt}</Typography> */}
          </Box>

          <AlertModal
            openM={openModal}
            closeM={handleCloseModal}
            type={modalType}
            text={modalText}
          />
          <Box sx={{ width: "100%", height: "89vh", display: "flex", alignItems: "center" }}>
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
                    <Button onClick={() => navigate("../")} style={{ textTransform: 'none' }}>{ls.forgot}</Button >
                    </Box>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Box>


        </Grid>
        <Grid sx={{ width: "100vw", height: "7vh" }}>


          <Grid
            paddingTop={2}
            container
            direction="row"
            justifyContent="center"
            sx={{ bgcolor: "#f3f6f9" }}
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
              ><Typography sx={{ fontFamily: "MontserratBold", cursor: "pointer", color: "#808080", }} onClick={() => window.open(process.env.REACT_APP_APPLICATION_AVISOPRIVACIDAD, '_blank')}>
                  {ls.footerSecondText}
                </Typography>

              </Grid>
              <Grid item xs={3} sm={4} md={3}>
                {/* {ls.footerThirdText} */}
              </Grid>
            </Grid>
            <Box sx={{ right: 5, bottom: 5 }}>
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
  );
};
