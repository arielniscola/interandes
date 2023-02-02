// import { Link } from "react-router-dom";
import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// @mui material components
// import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import Checkbox from "@mui/material/Checkbox";
import MDTypography from "../../components/MDTypography";
import MDInput from "../../components/MDInput";
import MDButton from "../../components/MDButton";

// Material Dashboard 2 React example components

function Pricing() {
  // const { sales, tasks } = reportsLineChartData;
  const client = [{ name: "Ariel" }, { name: "Gustavo" }, { name: "Martin" }];
  const handleChange = (e) => {
    console.log(e.target);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox
            mx={2}
            mt={-3}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              Buscar Cliente / Alta Cliente
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <MDBox pt={4} pb={3} px={3}>
              <Autocomplete
                id="client-select"
                style={{ width: 300 }}
                options={client}
                autoHighlight
                getOptionLabel={(option) => option.name}
                renderOption={(option) => <span>{option.name}</span>}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Buscar cliente"
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
              <MDBox component="form" role="form">
                <Grid container spacing={2}>
                  <Grid xs={6}>
                    <MDBox mb={2} sx={{ m: 1 }}>
                      <MDInput type="text" label="Razón Social" variant="standard" fullWidth />
                    </MDBox>
                    <MDBox mb={2} sx={{ m: 1 }}>
                      <MDInput type="text" label="Dirección" variant="standard" fullWidth />
                    </MDBox>
                    <MDBox mb={2} sx={{ m: 1 }}>
                      <MDInput type="text" label="ID Tributaria" variant="standard" fullWidth />
                    </MDBox>
                    <MDBox mb={2} sx={{ m: 1 }}>
                      <MDInput
                        type="text"
                        label="Persona de Contacto"
                        variant="standard"
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid xs={6}>
                    <MDBox mb={2} sx={{ m: 1 }}>
                      <MDInput type="mail" label="Mail" variant="standard" fullWidth />
                    </MDBox>
                    <MDBox mb={2} sx={{ m: 1 }}>
                      <MDInput type="text" label="Telefono" variant="standard" fullWidth />
                    </MDBox>
                    <MDBox mb={2} sx={{ m: 1 }}>
                      <MDInput type="text" label="Rubro" variant="standard" fullWidth />
                    </MDBox>
                  </Grid>
                </Grid>

                <MDBox mt={4} mb={1}>
                  <MDButton variant="gradient" color="info" fullWidth>
                    Crear Cliente
                  </MDButton>
                </MDBox>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox
            mx={2}
            mt={-3}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              Unidad de Negocio
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <InputLabel id="demo-simple-select-helper-label">Compañia</InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Empresa"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>INTERANDES</MenuItem>
                    <MenuItem value={20}>TRANSITARIOS ACUARIOS</MenuItem>
                  </Select>
                </MDBox>
                <MDBox mb={2}>
                  <InputLabel id="demo-simple-select-helper-label">Idioma</InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Idioma"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Español</MenuItem>
                    <MenuItem value={20}>Ingles</MenuItem>
                  </Select>
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="text" label="Name" variant="standard" fullWidth />
                </MDBox>
                <MDBox mb={2}>
                  <InputLabel id="demo-simple-select-helper-label">Tipo de Servicio</InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Tipo de Servicio"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}> E.1 - MARITIMO - FCL / LCL</MenuItem>
                    <MenuItem value={20}> E.2 - TERRESTRE - FCL / LCL</MenuItem>
                    <MenuItem value={20}> E.3 - MULTIMODAL - FCL / LCL</MenuItem>
                    <MenuItem value={20}> E.4 - AEREO</MenuItem>
                  </Select>
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="text" label="Revalidar." variant="standard" fullWidth />
                </MDBox>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox
            mx={2}
            mt={-3}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              Item
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <MDInput type="text" label="Name" variant="standard" fullWidth />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="email" label="Email" variant="standard" fullWidth />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="password" label="Password" variant="standard" fullWidth />
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton variant="gradient" color="info" fullWidth>
                    Guardar
                  </MDButton>
                </MDBox>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Pricing;
