/* eslint-disable react-hooks/exhaustive-deps */

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Grid, IconButton, Tab, Tooltip, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Create, IModify } from "../../components/dialogsCatalogos/Create";
import { Header } from "../../components/header";
import ButtonsAdd from "../Componentes/ButtonsAdd";
import { getCatalogo } from "../../services/catalogosService";
import Swal from "sweetalert2";
import axios from "axios";
import { alertaError, alertaExito } from "../../components/alertas/toast";
import MUIXDataGrid from "../../components/dataGridGenerico/MUIXDataGrid";

const Ayuda = () => {
  const [valueTab, setValueTab] = useState<string>("Guias");

  const [reload, setReload] = useState("");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue);
  };

 
  return (
    <>
      <Header />
      <Grid
        container
        item
        xs={12}
        justifyContent="center"
        paddingTop={3}
        sx={{ maxHeight: "90vh", maxWidth: "100vw" }}
      >
        <TabContext value={String(valueTab)}>
          <Grid container sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
            <Grid item xl={8} xs={8} lg={8} md={8} sm={8} sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Guias" value="Guias" sx={{ fontSize: [30, 30, 30, 30, 30], }} style={{ textTransform: 'none' }}/>
                <Tab label="Videos" value="Videos" sx={{ fontSize: [30, 30, 30, 30, 30], }} style={{ textTransform: 'none' }} />
              </TabList>
            </Grid>
            <Grid item xl={2} xs={2} lg={2} md={2} sm={2} sx={{ display: "flex", justifyContent: "space-evenly" }}>
              {/* <ButtonsAdd handleOpen={setOpenCreate} agregar={true} /> */}
            </Grid>
          </Grid>
        </TabContext>


        <Grid item sx={{ width: "100vw", height: "77vh" }}>
          {/* <MUIXDataGrid  id={(row: any) => row.Id} columns={columns} rows={valueTab === "TipoEntidades" ? tipoEntidades : entidades} /> */}
        </Grid>

      </Grid>
    </>
  );
};
export default Ayuda;
