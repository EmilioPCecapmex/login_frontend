import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DoneAllIcon from "@mui/icons-material/DoneAll";

export default function AppsModal({
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
            width: "30vw",
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
          <Box sx={{ mt: "3vh" }}>
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
              mt: "3vh",
              width: "100%",
              height: "60%",
              display: "flex",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                borderColor: "#62787B",
                width: "8vw",
                height: "10vh",
                mr: 1,
                ml: 1,
                color: "#62787B",
                fontFamily: "MontserratMedium",
              }}
            >
              SIEDNL
            </Button>

            <Button
              variant="outlined"
              sx={{
                borderColor: "#62787B",
                width: "8vw",
                height: "10vh",
                mr: 1,
                ml: 1,
                color: "#62787B",
                fontFamily: "MontserratMedium",
              }}
            >
              PABMI
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#62787B",
                width: "8vw",
                height: "10vh",
                mr: 1,
                ml: 1,
                color: "#62787B",
                fontFamily: "MontserratMedium",
              }}
            >
              PM
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#62787B",
                width: "8vw",
                height: "10vh",
                mr: 1,
                ml: 1,
                color: "#62787B",
                fontFamily: "MontserratMedium",
              }}
            >
              SRPU
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: "5vh",
            }}
          >
            <Button
              sx={{ color: "#B21414", fontFamily: "MontserratMedium" }}
              onClick={() => closeM()}
            >
              {" "}
              Cancelar{" "}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
