import { useState } from "react";
import MDSnackbar from "components/MDSnackbar";

const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [snackbarOptions, setSnackbarOptions] = useState({});

  const showSnackbar = (options) => {
    setSnackbarOptions(options);
    setOpen(true);
  };
  const closeSnackbar = () => setOpen(false);

  const renderSnackbar = (
    <MDSnackbar
      color={snackbarOptions.color}
      icon={snackbarOptions.icon}
      title={snackbarOptions.title}
      content={snackbarOptions.content}
      open={open}
      onClose={closeSnackbar}
      close={closeSnackbar}
      bgWhite
    />
  );

  return { showSnackbar, renderSnackbar };
};

export default useSnackbar;
