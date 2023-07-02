import React, { useState } from "react";
import axios from "axios";
import { Input } from "@mui/material";
import MDButton from "../MDButton";

function FileUploader() {
  const [selectedFile, setSelectedFile] = useState([]);
  const [dragging, setDragging] = useState(false);

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

    const files = Array.from(e.dataTransfer.files);
    // Aquí puedes procesar los archivos, por ejemplo, cargarlos al servidor o realizar alguna acción adicional.
    console.log(files);
    // Resto de la lógica de manejo de archivos...
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      axios
        .post("/upload", formData)
        .then((response) => {
          console.log("Archivo subido correctamente");
          console.log(response);
          // Realizar cualquier acción adicional después de la subida del archivo
        })
        .catch((error) => {
          console.error("Error al subir el archivo:", error);
        });
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Input
          type="file"
          variant="gradient"
          color="success"
          onClick={handleFileChange}
          style={{ margin: 10 }}
        />
        <MDButton variant="gradient" color="success" onClick={handleUpload}>
          Subir archivo
        </MDButton>
      </div>
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: dragging ? "2px dashed red" : "2px dashed gray",
          height: 160,
          textAlign: "center",
        }}
      >
        Arrastra y suelta tus archivos aquí.
      </div>
    </div>
  );
}

export default FileUploader;
