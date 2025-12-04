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
          density="comfortable"
          autoHeight={false}
          stickyHeader
          onPageSizeChange={(v) => changePageSize(v)}
          rowsPerPageOptions={[10, 25, 50, 100]}
          disableRowSelectionOnClick
          getRowId={(row) => (row.Id ? row.Id : row.id)}
          rowHeight={60}
          pageSize={pageSize}
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f8f9fa',
              borderBottom: '2px solid #AF8C55',
              borderRadius: '8px 8px 0 0',
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#f8f9fa',
              '&:hover': {
                backgroundColor: '#e9ecef',
              },
            },
            '& .MuiDataGrid-row': {
              '&:nth-of-type(even)': {
                backgroundColor: '#fafafa',
              },
              '&:hover': {
                backgroundColor: '#f0f4f8',
                transform: 'scale(1.001)',
                transition: 'all 0.2s ease-in-out',
              },
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #e0e0e0',
              padding: '8px 16px',
              '&:focus': {
                outline: 'none',
              },
            },
            '& .user-cell': {
              fontWeight: '600',
              color: '#15212f',
            },
            '& .app-cell': {
              color: '#424242',
              fontSize: '0.875rem',
            },
            '& .action-cell': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            '& .date-cell, & .time-cell': {
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              color: '#666',
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: '#f8f9fa',
              borderTop: '2px solid #AF8C55',
            },
            '& .MuiDataGrid-toolbarContainer': {
              backgroundColor: '#ffffff',
              borderBottom: '1px solid #e0e0e0',
              padding: '16px',
              '& .MuiButton-root': {
                color: '#AF8C55',
                '&:hover': {
                  backgroundColor: 'rgba(175, 140, 85, 0.08)',
                },
              },
            },
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
          
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
