import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { AcordionesGenericos } from "./AcordionesGenericos";
import ButtonsAdd from "../../screens/Componentes/ButtonsAdd";
import { useState } from "react";
import { Create } from "./Create";
import { newCatalogo } from "../../screens/Catalogos/Catalogos";
import SliderProgress from "../../screens/Componentes/SliderProgress";

export const ArbolEntidades = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Function;
}) => {
  const [add, setAdd] = useState(false);

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        fullWidth
        maxWidth={"xl"}
      >
        {add ? (
          <Create
            open={add}
            setOpen={setAdd}
            catalogo={"Entidades"}
            data={newCatalogo}
          />
        ) : (
          <>
            <DialogTitle>
              <Grid
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                Entidades:
                <ButtonsAdd
                  title={"Agregar Entidad"}
                  handleOpen={() => {
                    setAdd(true);
                  }}
                  agregar={true}
                />
              </Grid>
            </DialogTitle>
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
          </>
        )}
      </Dialog>
    </>
  );
};
