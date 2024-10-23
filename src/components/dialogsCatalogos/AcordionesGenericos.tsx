import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  TextField,
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
  filtro
}: {
  tabla: string;
  id: string;
  filtro?:string
}) => {
  const [entidades, setEntidades] = useState<ILista[]>([]);
  const [entidadesFiltered, setEntidadesFiltered] = useState<ILista[]>([]);
  const [filtroHijo, setFiltroHijo] = useState('');
  

  const [expanded, setExpanded] = useState("");
  const [add, setAdd] = useState(false);
  const [entidadSelected, setEntidadSelected] = useState<ILista>();

  useEffect(() => {
    getListas(tabla, id, setEntidades);
  }, []);

  useEffect(() => {
    // Filtrar las entidades según el valor del filtro
    if(filtro && filtro!==''){
      const entidadesFiltradas = entidades.filter((entidad) =>
      entidad.Label.toLowerCase().includes(filtro.toLowerCase())
    );
    setEntidadesFiltered(entidadesFiltradas);
    }else{
      setEntidadesFiltered(entidades);
    }
    // Actualizar el estado de las entidades filtradas
    
  }, [filtro]);

  useEffect(() => {
    // Filtrar las entidades según el valor del filtro
    
    setEntidadesFiltered(entidades);
 
    // Actualizar el estado de las entidades filtradas
    
  }, [entidades]);
  return (
    <>
      {entidadesFiltered.length > 0 ? (
        entidadesFiltered.map((item) => {
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
              {expanded === item.Id && !add ? (
                <AccordionDetails sx={{display:"flex",flexDirection:"column",alignContent:"end"}}>
                  <Grid
                    sx={{
                      display: "flex",
                      alignItems: "end",justifyContent:"flex-end",
                    }}
                  >
                    <TextField label="Buscar" value={filtroHijo} onChange={(v)=>setFiltroHijo(v.target.value)} sx={{mr:"2vw", width:["70%","70%","50%","40%","40%"]}}/>
                    <ButtonsAdd
                      title={"Agregar Dependencia a " + item.Label}
                      handleOpen={() => {
                        setAdd(true);
                        setEntidadSelected({ Id: item.Id, Label: item.Label });
                      }}
                      agregar={true}
                    />
                  </Grid>

                  <Grid
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyItems: "center",
                      flexDirection: "column",
                      mt: "2vh",
                    }}
                  >
                    <AcordionesGenericos id={item.Id} tabla="EntidadesHijas" filtro={filtroHijo} />
                  </Grid>
                </AccordionDetails>
              ) : null}
            </Accordion>
          );
        })
      ) : (
        <Grid
          sx={{
            width: "100%",
            display: "flex",
            justifyItems: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography> No se encontraron dependencias</Typography>{" "}
        </Grid>
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
