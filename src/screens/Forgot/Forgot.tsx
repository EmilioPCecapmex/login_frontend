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
          xl={8}
          lg={8}
          md={8}
          sm={9}
          xs={9}
          sx={{
            height: "80%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
          //sx={st.centerBox}
        >
          <Grid
            item
            container
            xl={10}
            lg={10}
            md={10}
            sm={12}
            xs={12}
            //sx={st.loginBox}
            sx={{
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex"
            }}
          >
            <Grid
              item
              container
              direction={"column"}
              xl={10}
              lg={10}
              md={12}
              sm={12}
              xs={12}
              sx={{
                //height: "95%",
                justifyItems: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Grid
                //height={"5%"}
                container
                item
                xl={10}
                lg={10}
                md={10}
                sm={12}
                xs={12}
                justifyContent="center"
                alignItems="center"
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

              <Grid item>
                <Typography
                  sx={{
                    // whiteSpace: "nowrap",
                    // overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontFamily: "MontserratSemiBold",
                    color: "#858180",
                    textAlign: "center",
                    fontSize: [10,15,15,15,20], // Tamaños de fuente para diferentes breakpoints
                   
                  }}
                >
                  {ls.signIn}
                </Typography>
              </Grid>

              <Grid item>
                <Typography   sx={{
                    // whiteSpace: "nowrap",
                    // overflow: "hidden",
                    textOverflow: "ellipsis",
                    
                    fontFamily: "MontserratSemiBold",
                    color: "#858180",
                    textAlign: "center",
                    fontSize: [10,15,15,15,20], // Tamaños de fuente para diferentes breakpoints
                   
                  }}>
                  {ls.secondaryText}
                </Typography>
              </Grid>

              <Grid
                item
                container
                xl={3}
                lg={3}
                md={3}
                sm={6}
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  height: "15%",
                  mt: "2vh",
                }}
              >
                <Grid
                  item
                  sx={{
                    borderRadius: 10,
                    height: "100%",
                    width: "80%",
                    fontFamily: "MontserratMedium",
                    //fontSize: ".8vw",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    border: 1,
                    borderColor: "#cccccc",
                    mb: "2vh",
                  }}
                  style={{ backgroundColor: userInputColor }}
                >
                  <Input
                    disableUnderline
                    value={usuario}
                    placeholder={ls.placeholderUser}
                    onChange={(v) => onChangeUsuario(v.target.value)}
                    id="usrPlaceholder"
                    sx={{
                      width: "80%",
                      padding: "8px",
                      fontFamily: "MontserratRegular",
                      fontSize: [10,15,15,15,20],
                    }}
                    style={{ color: userInputTextColor }}
                    onClickCapture={() => onClickTxtUsuario()}
                    onBlurCapture={() => verifyUsuario()}
                  />
                </Grid>
              </Grid>

              <Grid item>
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
              </Grid>
              <Grid item>
                <Button onClick={() => navigate("../")} style={{ textTransform: 'none' }}>{ls.forgot}</Button >
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
{/* FOOTER  5vh */}
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
            {/* {ls.footerThirdText} */}
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
            {actualYear()}
          </Typography>
        </Grid>
        
      </Grid>
    </Grid>
  );
};
