import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ILista } from "../../screens/Ayuda/AyudaModal";
import ButtonsAdd from "../../screens/Componentes/ButtonsAdd";
import { getListas } from "../../services/catalogosService";
import { Create } from "./Create";
import { newCatalogo } from "../../screens/Catalogos/Catalogos";

export const AcordionesGenericos = ({
  tabla,
  id,
}: {
  tabla: string;
  id: string;
}) => {
  const [entidades, setEntidades] = useState<ILista[]>([]);

  useEffect(() => {
    getListas(tabla, id, setEntidades);
  }, []);

  const [expanded, setExpanded] = useState("");
  const [add, setAdd] = useState(false);
  const [entidadSelected, setEntidadSelected] = useState<ILista>();
  return (
    <>
      {entidades.length > 0 ? (
        entidades.map((item) => {
          return (
            <Accordion
              expanded={expanded === item.Id}
              onChange={() =>
                setExpanded((prevExpanded) =>
                  prevExpanded === item.Id ? "" : item.Id
                )
              }
              sx={{
                boxShadow:
                  expanded === item.Id
                    ? "0px 0px 20px rgba(0, 0, 0, 0.3)"
                    : "none",
              }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Grid sx={{ display: "flex", width: "100%" }}>
                    {expanded === item.Id ? (
                      <ExpandMoreIcon />
                    ) : (
                      <ChevronRightIcon />
                    )}
                    <Typography>{item.Label.toUpperCase()}</Typography>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "end",
                    flexDirection: "column"
                  }}
                >
                  <ButtonsAdd
                    title={"Agregar Dependencia a " + item.Label}
                    handleOpen={() => {
                      setAdd(true);
                      setEntidadSelected({Id: item.Id,Label:item.Label})
                    }}
                    agregar={true}
                  />
                  {expanded === item.Id ? (
                    <Grid sx={{ width: "100%",display:"flex", justifyItems:"center",flexDirection:"column",mt:"2vh" }}>
                      <AcordionesGenericos
                        id={item.Id}
                        tabla="EntidadesHijas"
                      />
                    </Grid>
                  ) : null}
                </Grid>
              </AccordionDetails>
            </Accordion>
          );
        })
      ) : (
        <Typography> No se encontraron dependencias</Typography>
      )}

      {add ? (
        <Create
          open={add}
          setOpen={setAdd}
          catalogo={"Entidades"}
          data={newCatalogo}
          EntidadPadre={entidadSelected}
        />
      ) : null}
    </>
  );
};

// falta
// catalogos titulares, pertenece A, direccion,
// cambiar nombre de variable IdResponsable de /uresponsable por IdTitular como en /secretaria
