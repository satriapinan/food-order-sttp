import { useCallback, useState } from "react";

const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const showSnackbar = useCallback((message, type = "success") => {
    setSnackbar({
      visible: true,
      message,
      type,
    });
  }, []);

  const hideSnackbar = useCallback(() => {
    setSnackbar((prev) => ({
      ...prev,
      visible: false,
      message: "",
    }));
  }, []);

  return {
    snackbar,
    showSnackbar,
    hideSnackbar,
  };
};

export default useSnackbar;
