import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import WarningIcon from "@mui/icons-material/Warning";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Dialog } from "@mui/material";

export default function AlertModal({
  openM,
  closeM,
  type,
  text,
}: {
  openM: boolean;
  closeM: Function;
  type: string;
  text: string;
}) {
  const UseIcon = ({ v}: { v: string }) => {
    switch (v) {
      case "success":
        return (
          <DoneAllIcon
            sx={{ color: "#AF8C55", fontSize: [80,100,100,100,100] }}
          />
        );
      case "warning":
        return (
          <WarningIcon
            sx={{color: "#AF8C55", fontSize: [80,100,100,100,100] }}
          />
        );
      case "error":
        return (
          <InfoOutlinedIcon
            sx={{color: "#AF8C55", fontSize: [80,100,100,100,100] }}
          />
        );
      default:
        return null;
    }
  };

  return (
      <Dialog open={openM} maxWidth="xs" fullWidth>
        <Box
        
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt:"2vh"
            }}
          >
            <UseIcon v={type}  />
          </Box>

          <Box sx={{ mt: "10%" }}>
            <Typography
              fontFamily={"'Montserrat', sans-serif"}
              sx={{
                // whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                textAlign: "center",
                fontSize: [20, 20, 25, 25, 25], // Tamaños de fuente para diferentes breakpoints
                color: "#AF8C55"
              }}
            >
              {text}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: "10%",
            }}
          >
            <Button className="aceptar" onClick={() => closeM()} sx={{mb:"2vh"}}> <Typography sx={{fontFamily: 'MontserratSemiBold'}}> Hecho </Typography> </Button>
          </Box> 
        </Box>
      </Dialog>
  );
}
