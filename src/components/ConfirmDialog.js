import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
} from "@mui/material/";
import { Close } from "@mui/icons-material";
import { create } from "zustand";

const ConfirmDialog = () => {
  // destructure the store data and functions
  const { message, onSubmit, close } = useConfirmDialogStore();
  return (
    // if the onSubmit is undefined the dialog will be closed.
    // close() function sets the onSubmit to undefined,
    // so it will close the dialog, if we pass it to the onClose attribute.
    <Dialog open={Boolean(onSubmit)} onClose={close} maxWidth="sm" fullWidth>
      <DialogTitle>Confirm the action</DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={close}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button color="common" variant="contained" onClick={close}>
          Cancel
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={() => {
            if (onSubmit) {
              onSubmit();
            }
            close();
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;

const useConfirmDialogStore = create((set) => ({
  message: "",
  onSubmit: undefined,
  close: () => set({ onSubmit: undefined }),
}));

export const confirmDialog = (message, onSubmit) => {
  useConfirmDialogStore.setState({
    message,
    onSubmit,
  });
};
