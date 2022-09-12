import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import WarningIcon from "@mui/icons-material/Warning";
import DoneAllIcon from "@mui/icons-material/DoneAll";


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
  const UseIcon = ({ v }: { v: string }) => {
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
    <Box>
      <Modal open={openM}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "20vw",
            height: "25vh",
            bgcolor: "background.paper",
            boxShadow: 50,
            p: 4,
            borderRadius: 3,
          }}
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
                fontFamily: "MontserratSemiBold",
                fontSize: ".7vw",
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
            <Button onClick={() => closeM()}> Ok </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
