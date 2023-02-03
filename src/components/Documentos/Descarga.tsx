import { useState } from "react";
import {
  Box,
  IconButton,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DownloadIcon from "@mui/icons-material/Download";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export const DialogDescarga = ({
  Id,
  Rfc,
  FechaFirma,
}: {
  Id: string;
  Rfc: string;
  FechaFirma: string;
}) => {
  const [phrase, setPhrase] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [sendToken, setSendToken] = useState("");

  const getPassword = (id: string) => {
    let dataArray = new FormData();
    dataArray.append("IdPathDoc", id);

    axios
      .post("http://10.210.0.27/api/generarphrase", dataArray, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setErr(false);
        setSendToken(r.data);
        setLoading(false);
        setEnviado(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setEnviado(false);
      });
  };

  const getPdf = (id: string, password: string, rfc: string, fecha: string) => {
    let dataArray = new FormData();
    dataArray.append("id", id);
    dataArray.append("phrase", password);

    axios
      .post("http://10.210.0.27/api/getfpdf", dataArray, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("jwtToken") || "",
        },
        responseType: "arraybuffer",
      })
      .then((r) => {
        const a = window.URL || window.webkitURL;

        const url = a.createObjectURL(
          new Blob([r.data], { type: "application/pdf" })
        );

        let link = document.createElement("a");

        setErr(false);
        setSendToken("Token correcto, archivo descargado");
        link.setAttribute("download", `${rfc}-${fecha}.pdf`);
        link.setAttribute("href", url);
        document.body.appendChild(link);
        link.click();
        setLoadingA(false);
      })
      .catch((err) => {
        setLoadingA(false);
        setSendToken("Token incorrecto o expirado, intentelo de nuevo");
        setErr(true);
      });
  };

  const [loading, setLoading] = useState(false);
  const [loadingA, setLoadingA] = useState(false);

  const [enviado, setEnviado] = useState(false);

  const [open, setOpen] = useState(false);

  const [err, setErr] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPhrase("");
    setEnviado(false);
    setErr(false);
    setSendToken("");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Tooltip title={open ? "" : "DESCARGAR DOCUMENTO"}>
        <span>
          <IconButton
            onClick={() => {
              handleClickOpen();
            }}
          >
            <DownloadIcon
              sx={[
                {
                  "&:hover": {
                    color: "orange",
                  },
                  width: {
                    xs: 30,
                    sm: 30,
                    md: "10",
                    lg: "10",
                    xl: "10",
                  },
                  height: {
                    xs: 30,
                    sm: 30,
                    md: "10",
                    lg: "10",
                    xl: "10",
                  },
                },
              ]}
            />
          </IconButton>
          <Dialog
            fullWidth
            maxWidth={"md"}
            open={open}
            onClose={() => {
              handleClose();
              setPhrase("");
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DialogTitle>
              Descargar documento firmado
              <IconButton
                onClick={() => {
                  handleClose();
                  setPhrase("");
                }}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: "black",
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                height: "15vh",
              }}
            >
              {loading ? (
                <CircularProgress></CircularProgress>
              ) : enviado ? (
                err ? (
                  <ErrorOutlineIcon color="error"></ErrorOutlineIcon>
                ) : (
                  <CheckCircleOutlineIcon color="success"></CheckCircleOutlineIcon>
                )
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    height: "15vh",
                  }}
                >
                  <Typography>
                    Es necesario un token de seguridad para descargar el
                    documento
                  </Typography>
                  <Button
                    onClick={() => {
                      setLoading(true);
                      getPassword(Id);
                    }}
                  >
                    Obtener token
                  </Button>
                </Box>
              )}

              <Typography>{sendToken}</Typography>

              {enviado ? (
                <Button
                  onClick={() => {
                    setLoading(true);
                    getPassword(Id);
                  }}
                >
                  Generar nuevo token
                </Button>
              ) : null}
              <FormControl
                sx={{
                  width: "15vw",
                  height: "20%",
                  mt: 2,
                }}
                variant="outlined"
                size="small"
              >
                <InputLabel
                  sx={{
                    fontSize: {
                      xs: "33%",
                      sm: "60%",
                      md: "70%",
                      lg: "70%",
                      xl: "90%",
                    },
                    fontFamily: "MontserratMedium",
                  }}
                >
                  TOKEN DE DESCARGA
                </InputLabel>
                <OutlinedInput
                  label="TOKEN DE DESCARGA"
                  type={showPassword ? "text" : "password"}
                  sx={{
                    fontFamily: "MontserratSemiBold",
                    fontSize: {
                      xs: "60%",
                      sm: "80%",
                      md: "80%",
                      lg: "80%",
                      xl: "100%",
                    },
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff
                            sx={{
                              fontSize: {
                                xs: "50%",
                                sm: "80%",
                                md: "70%",
                                lg: "80%",
                                xl: "100%",
                              },
                            }}
                          />
                        ) : (
                          <VisibilityIcon
                            sx={{
                              fontSize: {
                                xs: "50%",
                                sm: "80%",
                                md: "70%",
                                lg: "80%",
                                xl: "100%",
                              },
                            }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  value={phrase || ""}
                  onChange={(v) => {
                    setPhrase(v.target.value);
                  }}
                />
              </FormControl>
            </DialogContent>
            <DialogActions>
              {loadingA ? (
                <Box sx={{ width: "55%" }}>
                  <CircularProgress></CircularProgress>
                </Box>
              ) : (
                <Button
                  disabled={phrase === ""}
                  onClick={() => {
                    setLoadingA(true);
                    setTimeout(() => {
                      getPdf(Id, phrase, Rfc, FechaFirma);
                    }, 1000);
                  }}
                >
                  Aceptar
                </Button>
              )}
            </DialogActions>
          </Dialog>
        </span>
      </Tooltip>
    </Box>
  );
};
