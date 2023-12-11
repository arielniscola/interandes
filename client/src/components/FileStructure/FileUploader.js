import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MDBox from "components/MDBox";
import { styled } from "@mui/material/styles";
import FileCard from "layouts/files/FileCard";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { uploadFiles } from "services/filesUploadHook";
import MDButton from "../MDButton";
import useSnackbar from "../../services/snackbarHook";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function FileUploader() {
  const { showSnackbar, renderSnackbar } = useSnackbar();
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const { id } = useParams();
  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const filesDrop = Array.from(e.dataTransfer.files);
    console.log(filesDrop[0]);
    files.push(filesDrop[0]);
    setFiles(files);
    // Aquí puedes procesar los archivos, por ejemplo, cargarlos al servidor o realizar alguna acción adicional.
  };
  const handleFileChange = (event) => {
    setFiles([...files, event.target.files[0]]);
  };

  const deleteFile = (filename) => {
    const newFiles = files.filter((item) => item.name !== filename);
    setFiles(newFiles);
  };

  const handleUpload = async () => {
    if (!files.length) {
      showSnackbar({
        title: "Carga de Archivos",
        content: "No hay archivos para subir",
        color: "warning",
        icon: "warning",
      });
    } else {
      const res = await uploadFiles(id, files);
      showSnackbar({
        title: "Carga de Archivos",
        content: res.message,
        color: res.ack ? "error" : "success",
        icon: res.ack ? "warning" : "check",
      });
    }
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <MDBox sx={{ margin: 2 }}>
            <Button
              component="label"
              variant="contained"
              onChange={handleFileChange}
              startIcon={<CloudUploadIcon />}
              color="success"
            >
              Seleccionar Archivo
              <VisuallyHiddenInput type="file" />
            </Button>
          </MDBox>
        </Grid>
      </Grid>

      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: dragging ? "2px dashed green" : "2px dashed gray",
          height: 160,
          textAlign: "center",
          paddingTop: 50,
          backgroundColor: dragging ? "rgba(200, 200, 200, 1)" : "white",
        }}
      >
        Arrastra y suelta tus archivos aca.
      </div>
      <MDBox sx={{ margin: 2 }}>
        {files.length > 0 &&
          files.map((file) => {
            return <FileCard file={file} deleteFn={deleteFile} />;
          })}
      </MDBox>
      <MDBox sx={{ margin: 10 }}>
        <MDButton variant="gradient" color="success" onClick={handleUpload}>
          Subir archivos
        </MDButton>
      </MDBox>
      {renderSnackbar}
    </div>
  );
}

export default FileUploader;
