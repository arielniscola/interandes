import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { getFilesOperation } from "services/filesUploadHook";
import FileCardView from "layouts/files/FileCardView";
import useSnackbar from "../../services/snackbarHook";

function Filesviews({ id }) {
  const [files, setFiles] = useState([]);
  const { showSnackbar, renderSnackbar } = useSnackbar();
  useEffect(async () => {
    if (id) {
      const res = await getFilesOperation(id);
      console.log(res);
      if (res.ack) {
        showSnackbar({
          title: "Archivos",
          content: res.message,
          color: res.ack ? "error" : "success",
          icon: res.ack ? "warning" : "check",
        });
      } else {
        setFiles(res.data);
      }
    }
  }, []);
  return (
    <MDBox sx={{ margin: 2 }}>
      {files.length > 0 &&
        files.map((file) => {
          return <FileCardView file={file} />;
        })}
      {files.length === 0 && (
        <MDTypography variant="h6" fontWeight="medium">
          No hay archivos cargados
        </MDTypography>
      )}
      {renderSnackbar}
    </MDBox>
  );
}

export default Filesviews;
