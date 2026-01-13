import AddIcon from "@mui/icons-material/Add";
import { Tooltip, ToggleButton, Box } from "@mui/material";

const ButtonsAdd = ({
  handleOpen,
  agregar,
  title,
}: {
  handleOpen: Function;
  agregar: boolean;
  title?:string
}) => {
  return (
    <Box>
      {agregar ? (
          <Tooltip
            title={title||"Agregar"}>
            <ToggleButton  className="aceptar" value="check" onClick={() => handleOpen(true)}>
              <AddIcon />
            </ToggleButton>
          </Tooltip>

      ) : (
        ""
      )}
    </Box>
  );
};

export default ButtonsAdd;
