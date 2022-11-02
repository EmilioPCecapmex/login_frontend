import * as React from "react";
import { DataGrid, GridToolbar, esES as gridEsES } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material";
import { esES as coreEsES } from "@mui/material/locale";

const theme = createTheme(coreEsES, gridEsES);

const localeText = {
  toolbarColumns: "Columnas",
  toolbarColumnsLabel: "Columnas",
  toolbarFilters: "Filtros",
  toolbarFiltersLabel: "Filtros",
  toolbarDensity: "Densidad",
  toolbarDensityLabel: "Densidad",
  toolbarDensityCompact: "Compacto",
  toolbarDensityStandard: "Normal",
  toolbarDensityComfortable: "Grande",
  toolbarExport: "Exportar",
  toolbarExportLabel: "Exportar",
  toolbarExportCSV: "Descargar como CSV",
  toolbarExportPrint: "Imprimir",
};

export default function MUIXDataGrid(props: any) {
  const [pageSize, setPageSize] = React.useState(10);

  const changePageSize = (v: number) => {
    setPageSize(v);
  };
  return (
    <div style={{ height: "60vh", width: "100%" }}>
      <ThemeProvider theme={theme}>
        <DataGrid
          localeText={localeText}
          columns={props.columns}
          rows={props.rows}
          pageSize={pageSize}
          rowsPerPageOptions={[10, 25, 50, 100]}
          onPageSizeChange={(v) => changePageSize(v)}
        
          sx={{
            fontFamily: "MontserratMedium",
          
          
          }}
          getRowId={props.id}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </ThemeProvider>
    </div>
  );
}
