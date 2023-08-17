import React, { useState } from "react";
import axios from "axios";
import { Input } from "@mui/material";
import FileCard from "layouts/files/FileCard";
import MDButton from "../MDButton";

function FileUploader() {
  const [selectedFile, setSelectedFile] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);
  console.log(files);
  console.log(selectedFile);
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
    files.push(filesDrop[0]);
    setFiles(files);
    // Aquí puedes procesar los archivos, por ejemplo, cargarlos al servidor o realizar alguna acción adicional.
  };
  const handleFileChange = (event) => {
    files.push(event.target.files[0]);
    setFiles(files);
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
      <div>
        {files.length > 0 &&
          files.map((file) => {
            return <FileCard file={file} />;
          })}
      </div>
    </div>
  );
}

export default FileUploader;
