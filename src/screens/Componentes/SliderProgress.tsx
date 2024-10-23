import {
  Button,
  CircularProgress,
  Dialog,
  Grid,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const SliderProgress = ({
  open,
  texto,
  fnc,
}: {
  open: boolean;
  texto: string;
  fnc?: Function;
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef<number>();

  // const buttonSx = {
  //   ...(success && {
  //     bgcolor: green[500],
  //     '&:hover': {
  //       bgcolor: green[700],
  //     },
  //   }),
  // };

  useEffect(() => {
    setTimeout(function () {
      // Tu código aquí, se ejecutará después de 2 segundos
      setLoading(true);
    }, 4000); // El tiempo está en milisegundos, por lo que 2000 ms = 2 segundos

    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <Dialog
      fullScreen
      className="ContainerSliderProgress"
      sx={{ zIndex: 2000 }}
      open={open}
    >
      <Grid
        className="containerCenter"
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <CircularProgress
            size={200}
            sx={{
              color: "#AF8C55",
            }}
          />
        </Grid>
        <Grid item>
          <Typography variant="h4" className="Cargando">
            {texto ? texto : "Cargando .."}
          </Typography>
        </Grid>
        <Grid item sx={{ mt: "2vh" }}>
          {loading && fnc && <Button onClick={() => fnc()}>Cerrar</Button>}
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default SliderProgress;
