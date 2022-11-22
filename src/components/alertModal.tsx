import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import WarningIcon from "@mui/icons-material/Warning";
import DoneAllIcon from "@mui/icons-material/DoneAll";
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
            sx={{ width: "10vw", height: "10vh", color: "#31B214" }}
          />
        );
      case "warning":
        return (
          <WarningIcon
            sx={{ width: "10vw", height: "10vh", color: "#E1E137" }}
          />
        );
      case "error":
        return (
          <HighlightOffIcon
            sx={{ width: "10vw", height: "10vh", color: "#f64e60" }}
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
            }}
          >
            <UseIcon v={type} />
          </Box>

          <Box sx={{ mt: "10%" }}>
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: "MontserratBold",
                fontSize: "1vw",
                color: "#808080",
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
            <Button onClick={() => closeM()}> <Typography sx={{fontFamily: 'MontserratSemiBold'}}> Hecho </Typography> </Button>
          </Box>
        </Box>
      </Dialog>
  );
}
