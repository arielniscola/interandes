// import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { getCompanies, uploadImage } from "services/companyHook";
import useSnackbar from "../../services/snackbarHook";
import MDButton from "../../components/MDButton";
import MDTypography from "../../components/MDTypography";

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

function Company() {
  const { showSnackbar, renderSnackbar } = useSnackbar();
  const [files, setFiles] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState({
    id: "",
    companyname: "",
    logo: "",
  });

  // Obtener todos los tipos de operacion
  useEffect(async () => {
    const res = await getCompanies();
    if (res.ack) {
      showSnackbar({
        title: "Compañias",
        content: res.message,
        color: res.ack ? "error" : "success",
        icon: res.ack ? "warning" : "check",
      });
    } else {
      setCompanies(res.data);
    }
  }, []);
  const handleFileChange = (event) => {
    setFiles([...files, event.target.files[0]]);
  };

  const submitCompany = async () => {
    const res = await uploadImage(company, files);
    showSnackbar({
      title: "Compañia",
      content: res.message,
      color: res.ack ? "error" : "success",
      icon: res.ack ? "warning" : "check",
    });
  };
  const defaultOptions = {
    options: companies?.length > 0 ? companies : [],
    getOptionLabel: (option) => option.companyname,
  };

  return (
    <div>
      <MDBox pt={6} pb={3}>
        <MDBox
          mx={2}
          mt={-3}
          py={2}
          px={1}
          variant="gradient"
          bgColor="warning"
          borderRadius="lg"
          coloredShadow="warning"
        >
          <MDTypography variant="h6" color="white">
            Compañias
          </MDTypography>
        </MDBox>
        <Grid container spacing={4}>
          <Grid item xs={8} md={4} margin={5}>
            <MDBox>
              <Typography sx={{ mb: 5 }} variant="h6">
                Seleccionar Compañia
              </Typography>
              <MDBox>
                <Autocomplete
                  {...defaultOptions}
                  id="company-select"
                  multiple={false}
                  style={{ width: 300, marginBottom: 8, marginTop: -20 }}
                  options={companies}
                  renderInput={(params) => (
                    <TextField {...params} label="Compañia" variant="outlined" />
                  )}
                  onChange={(event, newValue) => {
                    if (!newValue) {
                      setCompany({
                        id: "",
                        companyname: "",
                        logo: [],
                      });
                    } else {
                      setCompany(newValue);
                    }
                  }}
                />
              </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={8} md={4} margin={2}>
            <Card sx={{ maxWidth: 500 }}>
              <CardMedia component="img" height="350" image={company.logo} />
              <CardContent style={{ maxWidth: "80%" }}>
                <Grid item xs={4}>
                  <Typography gutterBottom variant="h5" component="div">
                    All In SA
                  </Typography>
                  <MDBox sx={{ margin: 2 }}>
                    <Button
                      component="label"
                      variant="contained"
                      onChange={handleFileChange}
                      startIcon={<CloudUploadIcon />}
                      color="success"
                    >
                      Cambiar Logo
                      <VisuallyHiddenInput type="file" />
                    </Button>
                  </MDBox>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <MDBox mb={2} sx={{ ml: 5 }}>
          <MDButton variant="gradient" color="info" onClick={submitCompany}>
            Actualizar
          </MDButton>
        </MDBox>
      </MDBox>
      {renderSnackbar}
    </div>
  );
}

export default Company;
