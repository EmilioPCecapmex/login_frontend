import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { esES as coreEsES } from "@mui/material/locale";
import {
  DataGrid,
  GridColumnVisibilityModel,
  GridToolbar,
  esES as gridEsES,
} from "@mui/x-data-grid";
import "../../Globals.css"

const theme = createTheme(coreEsES, gridEsES);

export default function MUIXDataGridGeneral(props: any) {
  const [pageSize, setPageSize] = useState(25);
  
  const changePageSize = (v: number) => {
    setPageSize(v);
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <DataGrid
          {...props.rows}
          columns={props.columns}
          rows={props.rows}
          density="compact"
          autoHeight={false}
          stickyHeader
          onPageSizeChange={(v) => changePageSize(v)}
          rowsPerPageOptions={[10, 25, 50]}
          disableRowSelectionOnClick
          getRowId={(row) => (row.Id ? row.Id : row.id)}
          rowHeight={255}
          pageSize={pageSize}
          getRowHeight={() => "auto"}
          
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              label: "Buscar",
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
              csvOptions: {
                fileName: props.modulo,
                utf8WithBom: true,
              },
            },
          }}
          localeText={{
            columnsPanelHideAllButton: "Ocultar todo",
            columnsPanelShowAllButton: "Mostrar todo",
            columnsPanelTextFieldPlaceholder: "",
            columnsPanelTextFieldLabel: "Buscar",
            noRowsLabel: "No se ha encontrado datos.",
            noResultsOverlayLabel: "No se ha encontrado ningún resultado",
            toolbarColumns: "Columnas",
            toolbarExport: "Exportar",
            toolbarColumnsLabel: "Seleccionar columnas",
            toolbarFilters: "Filtros",
            toolbarFiltersLabel: "Ver filtros",
            toolbarFiltersTooltipHide: "Quitar filtros",
            toolbarFiltersTooltipShow: "Ver filtros",
            toolbarQuickFilterPlaceholder: "Buscar",
            toolbarExportCSV: "Descargar como CSV",
            toolbarExportPrint: "Imprimir",
            checkboxSelectionSelectRow: "Filas seleccionadas",
            checkboxSelectionSelectAllRows: "Seleccionar todas las filas",
            errorOverlayDefaultLabel: "Ha ocurrido un error.",
            footerRowSelected: (count) =>
              count > 1
                ? `${count.toLocaleString()} filas seleccionadas`
                : `${count.toLocaleString()} fila seleccionada`,
            footerTotalRows: "Filas Totales:",
            columnMenuLabel: "Menú",
            columnMenuShowColumns: "Mostrar columnas",
            columnMenuFilter: "Filtro",
            columnMenuHideColumn: "Ocultar",
            columnMenuUnsort: "Desordenar",
            columnMenuSortAsc: "Ordenar ASC",
            columnMenuSortDesc: "Ordenar DESC",
            columnHeaderFiltersTooltipActive: (count) =>
              count > 1 ? `${count} filtros activos` : `${count} filtro activo`,
            columnHeaderFiltersLabel: "Mostrar filtros",
            columnHeaderSortIconLabel: "Ordenar",
            filterPanelColumns: "Columnas",
            filterOperatorContains: "Contiene",
            filterOperatorEquals: "Igual",
            filterOperatorStartsWith: "Comienza Con",
            filterOperatorEndsWith: "Termina Con",
            filterOperatorIsEmpty: "Es Vacio",
            filterOperatorIsNotEmpty: "No Vacio",
            filterOperatorIsAnyOf: "Es Cualquiera de",
            filterPanelInputLabel: "Valor",
            filterPanelInputPlaceholder: "Valor Filtrado",
          }}
        />
      </ThemeProvider>
    </>
  );
}
