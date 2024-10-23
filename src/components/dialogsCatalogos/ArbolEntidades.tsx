import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
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
  const [filtroHijo, setFiltroHijo] = useState("");

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
                container
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Grid item xl={4} lg={4} md={4} sm={12} xs={12}> 
                  Entidades:
                </Grid>
                <Grid item sx={{display:"flex",justifyContent:"flex-end"}} xl={8} lg={8} md={8} sm={12} xs={12}>
                  <TextField
                  label="Buscar"
                  value={filtroHijo}
                  onChange={(v) => setFiltroHijo(v.target.value)}
                  sx={{mr:"2vw", width:["80%","80%","80%","60%","50%"]}}
                />
                <ButtonsAdd
                  title={"Agregar Entidad"}
                  handleOpen={() => {
                    setAdd(true);
                  }}
                  agregar={true}
                />
                </Grid>
                
                
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
                <AcordionesGenericos id="" tabla="EntidadesMatrices"  filtro={filtroHijo}/>
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
