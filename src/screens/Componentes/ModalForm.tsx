import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  title: string;
  handleClose: Function;
}

const ModalForm = ({ children, title, handleClose }: Props) => {
  return (
    <div>
      <Dialog    
       open={true} fullScreen >
        <Grid container className="HeaderModal" justifyContent="flex-end" alignItems="center" paddingTop={.5} paddingBottom={.5} sx={{border: "1px solid",height:"10vh"}}>
          <Grid item xs={10} sm={10} md={10} lg={10} >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
                fontFamily={"'Montserrat', sans-serif"}
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textAlign: "center",
                  fontSize: [30, 30, 30, 30, 40], // Tamaños de fuente para diferentes breakpoints
                  color: "#AF8C55"
                }}>

                {title}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={1.5} paddingBottom={0} >
            <Grid container alignItems="flex-end" direction="row" justifyContent="flex-end" paddingRight={1} >
            <Tooltip title={"Salir"}>
                <IconButton
                  onClick={() => handleClose()}
                >
                  <CloseIcon sx={{
                    fontSize: [30,30,30,40,40]
                  }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>

        <Grid container justifyContent="ccenter" alignItems="center">
         {children}
        </Grid>
      </Dialog>
    </div>
  );
};

export default ModalForm;
