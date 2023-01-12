import { Alert } from "@mui/material";
import useAlert from "../hooks/useAlert";

const AlertPopup = () => {
  const { text, type } = useAlert();

  if (text && type) {
    return (
      <Alert
        severity={type}
        sx={{
          position: "absolute",
          zIndex: 1000,
        }}
      >
        {text}
      </Alert>
    );
  } else {
    return <></>;
  }
};

export default AlertPopup;
