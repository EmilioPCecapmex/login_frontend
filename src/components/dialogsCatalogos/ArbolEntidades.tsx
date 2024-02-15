import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { AcordionesGenericos } from "./AcordionesGenericos";

export const ArbolEntidades = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Function;
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      fullWidth
      maxWidth={"xl"}
    >
      <DialogTitle>Entidades:</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid sx={{ width: "100%" }}>
          <AcordionesGenericos id="" tabla="EntidadesMatrices" />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button className="cancelar" onClick={() => setOpen(false)}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
