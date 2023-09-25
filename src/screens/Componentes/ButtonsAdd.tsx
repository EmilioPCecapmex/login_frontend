import AddIcon from "@mui/icons-material/Add";
import { Tooltip, ToggleButton, Box } from "@mui/material";

const ButtonsAdd = ({
  handleOpen,
  agregar,
}: {
  handleOpen: Function;
  agregar: boolean;
}) => {
  return (
    <Box>
      {agregar ? (
          <Tooltip
            title={"Agregar"}>
            <ToggleButton  className="guardar" value="check" onClick={() => handleOpen(true)}>
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
