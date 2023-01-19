import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";

export default function FloatingActionButton() {
  return (
    <Tooltip title="Click to add a new foodSNAP!" placement="bottom" arrow>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab size="small" color="black" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
    </Tooltip>
  );
}
