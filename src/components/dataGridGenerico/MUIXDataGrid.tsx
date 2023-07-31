import * as React from "react";
import { DataGrid, esES as gridEsES, GridToolbarQuickFilter,useGridApiContext, GridToolbarContainer,} from "@mui/x-data-grid";
import { createTheme, Fade, ListItemIcon, Menu, MenuItem, ThemeProvider } from "@mui/material";
import Button from '@mui/material/Button';
import { esES as coreEsES } from "@mui/material/locale";
import {Download, Print} from '@mui/icons-material';

const theme = createTheme(coreEsES, gridEsES);

const localeText = {
// Root
  noRowsLabel: "No se ha encontrado datos.",
  noResultsOverlayLabel: "No se ha encontrado ningún resultado",

  //* Density selector toolbar button text
  // toolbarDensity: 'Density',
  // toolbarDensityLabel: 'Density',
  // toolbarDensityCompact: 'Compact',
  // toolbarDensityStandard: 'Standard',
  // toolbarDensityComfortable: 'Comfortable',

  //* Columns selector toolbar button text
  // toolbarColumns: 'Columns',
  // toolbarColumnsLabel: 'Select columns',

  //* Filters toolbar button text
  // toolbarFilters: 'Filters',
  // toolbarFiltersLabel: 'Show filters',
  // toolbarFiltersTooltipHide: 'Hide filters',
  // toolbarFiltersTooltipShow: 'Show filters',
  // toolbarFiltersTooltipActive: (count) =>
  //   count !== 1 ? `${count} active filters` : `${count} active filter`,

  //* Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Buscar…',
  toolbarQuickFilterLabel: 'Buscar',
  toolbarQuickFilterDeleteIconLabel: 'Limpiar',

  //* Export selector toolbar button text
  // toolbarExport: 'Export',
  // toolbarExportLabel: 'Export',
  // toolbarExportCSV: 'Download as CSV',
  // toolbarExportPrint: 'Print',
  // toolbarExportExcel: 'Download as Excel',

  //* Columns panel text
  columnsPanelTextFieldLabel: 'Busca columna',
  columnsPanelTextFieldPlaceholder: 'Título de columna',
  //* columnsPanelDragIconLabel: 'Reorder column',
  columnsPanelShowAllButton: 'Muestra todo',
  columnsPanelHideAllButton: 'Oculta todo',

  //* Filter panel text
  // filterPanelAddFilter: 'Add filter',
  // filterPanelRemoveAll: 'Remove all',
  // filterPanelDeleteIconLabel: 'Delete',
  // filterPanelLogicOperator: 'Logic operator',
  // filterPanelOperator: 'Operator',
  // filterPanelOperatorAnd: 'And',
  // filterPanelOperatorOr: 'Or',
  // filterPanelColumns: 'Columns',
  // filterPanelInputLabel: 'Value',
  // filterPanelInputPlaceholder: 'Filter value',

  //* Filter operators text--------------------------
  // filterOperatorContains: 'contains',
  // filterOperatorEquals: 'equals',
  // filterOperatorStartsWith: 'starts with',
  // filterOperatorEndsWith: 'ends with',
  // filterOperatorIs: 'is',
  // filterOperatorNot: 'is not',
  // filterOperatorAfter: 'is after',
  // filterOperatorOnOrAfter: 'is on or after',
  // filterOperatorBefore: 'is before',
  // filterOperatorOnOrBefore: 'is on or before',
  // filterOperatorIsEmpty: 'is empty',
  // filterOperatorIsNotEmpty: 'is not empty',
  // filterOperatorIsAnyOf: 'is any of',
  // 'filterOperator=': '=',
  // 'filterOperator!=': '!=',
  // 'filterOperator>': '>',
  // 'filterOperator>=': '>=',
  // 'filterOperator<': '<',
  // 'filterOperator<=': '<=',

  //* Header filter operators text-------------------
  // headerFilterOperatorContains: 'Contains',
  // headerFilterOperatorEquals: 'Equals',
  // headerFilterOperatorStartsWith: 'Starts with',
  // headerFilterOperatorEndsWith: 'Ends with',
  // headerFilterOperatorIs: 'Is',
  // headerFilterOperatorNot: 'Is not',
  // headerFilterOperatorAfter: 'Is after',
  // headerFilterOperatorOnOrAfter: 'Is on or after',
  // headerFilterOperatorBefore: 'Is before',
  // headerFilterOperatorOnOrBefore: 'Is on or before',
  // headerFilterOperatorIsEmpty: 'Is empty',
  // headerFilterOperatorIsNotEmpty: 'Is not empty',
  // headerFilterOperatorIsAnyOf: 'Is any of',
  // 'headerFilterOperator=': 'Equals',
  // 'headerFilterOperator!=': 'Not equals',
  // 'headerFilterOperator>': 'Greater than',
  // 'headerFilterOperator>=': 'Greater than or equal to',
  // 'headerFilterOperator<': 'Less than',
  // 'headerFilterOperator<=': 'Less than or equal to',

  //* Filter values text----------
  // filterValueAny: 'any',
  // filterValueTrue: 'true',
  // filterValueFalse: 'false',

  //* Column menu text
  columnMenuLabel: 'Menú',
  columnMenuShowColumns: 'Muestra columnas',
  columnMenuManageColumns: 'Manage columns',
  columnMenuFilter: "Filtrar",
  columnMenuHideColumn: 'Columnas ocultas',
  columnMenuUnsort: 'Sin ordenar',
  columnMenuSortAsc: "Ordenar de forma acendente",
  columnMenuSortDesc: "Ordenar de forma decendente",

  //* Column header text
  // columnHeaderFiltersTooltipActive: (count) =>
  //   count !== 1 ? `${count} active filters` : `${count} active filter`,
  // columnHeaderFiltersLabel: 'Show filters',
  columnHeaderSortIconLabel: 'Ordenar',

  //* Rows selected footer text
  // footerRowSelected: (count) =>
  //   count !== 1
  //     ? `${count.toLocaleString()} rows selected`
  //     : `${count.toLocaleString()} row selected`,

  //* Total row amount footer text
  footerTotalRows: 'Total de renglones:',

  //* Total visible row amount footer text
  // footerTotalVisibleRows: (visibleCount, totalCount) =>
  //   `${visibleCount.toLocaleString()} of ${totalCount.toLocaleString()}`,

  //* Checkbox selection text
  // checkboxSelectionHeaderName: 'Checkbox selection',
  // checkboxSelectionSelectAllRows: 'Select all rows',
  // checkboxSelectionUnselectAllRows: 'Unselect all rows',
  // checkboxSelectionSelectRow: 'Select row',
  // checkboxSelectionUnselectRow: 'Unselect row',

  //* Boolean cell text
  booleanCellTrueLabel: 'si',
  booleanCellFalseLabel: 'no',

  //* Actions cell more text
  actionsCellMore: 'más',

  //* Column pinning text
  // pinToLeft: 'Fija a la izquierda',
  // pinToRight: 'Fija a la derecha',
  // unpin: 'Sin fijar',

  //* Tree Data
  // treeDataGroupingHeaderName: 'Group',
  // treeDataExpand: 'see children',
  // treeDataCollapse: 'hide children',

  //* Grouping columns
  // groupingColumnHeaderName: 'Group',
  // groupColumn: (name) => `Group by ${name}`,
  // unGroupColumn: (name) => `Stop grouping by ${name}`,

  //* Master/detail
  // detailPanelToggle: 'Detail panel toggle',
  // expandDetailPanel: 'Expand',
  // collapseDetailPanel: 'Collapse',

  //* Used core components translation keys
  // MuiTablePagination: {},

  //* Row reordering text
  // rowReorderingHeaderName: 'Row reordering',

  //* Aggregation
  // aggregationMenuItemHeader: 'Aggregation',
  // aggregationFunctionLabelSum: 'sum',
  // aggregationFunctionLabelAvg: 'avg',
  // aggregationFunctionLabelMin: 'min',
  // aggregationFunctionLabelMax: 'max',
  // aggregationFunctionLabelSize: 'size',

};

export default function MUIXDataGrid(props: any) {
  // barra personalizada
  function CustomToolbar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };  
    const apiRef = useGridApiContext();
    const handleExport = () => {apiRef.current.exportDataAsCsv({fields: props.camposCsv, utf8WithBom:true}) ; handleClose()} 
    const handlePrint = () => { apiRef.current.exportDataAsPrint({fields: props.camposCsv}) ; handleClose()} 
    return (
      <GridToolbarContainer sx={{display:"flex", justifyContent:"space-between"}}>
        <Button
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Exportar
        </Button>
          <Menu
            MenuListProps={{'aria-labelledby': 'fade-button',}}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleExport}>
              <ListItemIcon>
                <Download fontSize="small" />
              </ListItemIcon>
              Descarga CSV
            </MenuItem>
            <MenuItem onClick={handlePrint}>
              <ListItemIcon>
                <Print fontSize="small" />
              </ListItemIcon>
              Imprimir
            </MenuItem>
          </Menu>        
        {/* campo de buscar */}
        <GridToolbarQuickFilter 
          quickFilterParser={(searchInput: string) =>
            searchInput
              .split(',')
              .map((value) => value.trim())
              .filter((value) => value !== '')
          }
        />
      </GridToolbarContainer>
    );
  }
  return (
    <div style={{ height: "70vh", width: "90%" }}>
      <ThemeProvider theme={theme}>
        <DataGrid
          localeText={localeText}        
          disableSelectionOnClick
          // esconde el menu de los ... de la primer columna
          disableColumnMenu
          components={{Toolbar:  CustomToolbar,}}
          columns={props.columns}
          rows={props.rows}
          rowsPerPageOptions={[10, 25, 50, 100]}
          pageSize={10}
          getRowId={props.id}
        />
      </ThemeProvider>
    </div>
  );
}
