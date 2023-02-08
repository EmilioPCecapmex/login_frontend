import { Box } from "@mui/material";
import { Validador } from "../../components/Documentos/Validador";

export const Documentos = () => {
  const params = new URLSearchParams(window.location.search);
  const Id = params.get("Id") || "";

  
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "lightGrey",
      }}
    >
        <Validador id={Id || ""}></Validador>
    </Box>
  );
};
