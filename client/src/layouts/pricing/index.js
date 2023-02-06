// import { Link } from "react-router-dom";
import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// @mui material components
// import table Items
import DataTable from "examples/Tables/DataTable";
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
  const defaultOptions = {
    options: client.length > 0 ? client : [],
    getOptionLabel: (option) => option.name,
  };
  const handleChange = (e) => {
    console.log(e.target);
  };
  const columns = [
    { Header: "Moneda", accessor: "currency", align: "center" },
    { Header: "Item", accessor: "item", width: "45%", align: "left" },
    { Header: "Costo", accessor: "cost", align: "center" },
    { Header: "Venta", accessor: "sale", align: "center" },
    { Header: "Acciones", accessor: "action", align: "center" },
  ];

  const rows = [
    {
      currency: "EURO",
      item: "este es la descripcion del item",
      cost: 450,
      sale: 950,
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </MDTypography>
      ),
    },
  ];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox
            mx={2}
            mt={-3}
            py={2}
            px={1}
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
                {...defaultOptions}
                id="client-select"
                multiple={false}
                style={{ width: 300, marginBottom: 8, marginTop: -20 }}
                options={client}
                renderInput={(params) => (
                  <TextField {...params} label="Buscar cliente" variant="outlined" />
                )}
              />
              <MDBox component="form" role="form">
                <Grid container spacing={2}>
                  <Grid xs={6}>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <MDInput type="text" label="Razón Social" variant="outlined" fullWidth />
                    </MDBox>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <MDInput type="text" label="Dirección" variant="outlined" fullWidth />
                    </MDBox>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <MDInput type="text" label="ID Tributaria" variant="outlined" fullWidth />
                    </MDBox>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <MDInput
                        type="text"
                        label="Persona de Contacto"
                        variant="outlined"
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid xs={6}>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <MDInput type="mail" label="Mail" variant="outlined" fullWidth />
                    </MDBox>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <MDInput type="text" label="Telefono" variant="outlined" fullWidth />
                    </MDBox>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <MDInput type="text" label="Rubro" variant="outlined" fullWidth />
                    </MDBox>
                  </Grid>
                </Grid>

                <MDBox mt={4} mb={1}>
                  <MDButton variant="gradient" color="info">
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
            py={2}
            px={1}
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
                    style={{ height: 40, marginTop: 5 }}
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
                    style={{ height: 40, marginTop: 5 }}
                  >
                    <MenuItem value={10}>Español</MenuItem>
                    <MenuItem value={20}>Ingles</MenuItem>
                  </Select>
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="text" label="Name" variant="outlined" fullWidth />
                </MDBox>
                <MDBox mb={2}>
                  <InputLabel id="demo-simple-select-helper-label">Tipo de Servicio</InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Tipo de Servicio"
                    onChange={handleChange}
                    style={{ height: 40, marginTop: 5 }}
                  >
                    <MenuItem value={10}> E.1 - MARITIMO - FCL / LCL</MenuItem>
                    <MenuItem value={20}> E.2 - TERRESTRE - FCL / LCL</MenuItem>
                    <MenuItem value={20}> E.3 - MULTIMODAL - FCL / LCL</MenuItem>
                    <MenuItem value={20}> E.4 - AEREO</MenuItem>
                  </Select>
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="text" label="Revalidar" variant="outlined" fullWidth />
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
            py={2}
            px={1}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              Items
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <Grid container spacing={2}>
                  <Grid xs={3}>
                    <MDBox mb={2}>
                      <InputLabel id="demo-simple-select-helper-label">Moneda</InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label="Tipo de Servicio"
                        onChange={handleChange}
                        style={{ height: 40, marginTop: 8 }}
                      >
                        <MenuItem value={10}>DOLAR</MenuItem>
                        <MenuItem value={20}>PESO ARGENTINO</MenuItem>
                        <MenuItem value={20}>EURO</MenuItem>
                        <MenuItem value={20}>PESO CHILENO</MenuItem>
                      </Select>
                    </MDBox>
                  </Grid>
                  <Grid xs={3}>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <MDInput type="text" label="Item" variant="outlined" fullWidth />
                    </MDBox>
                  </Grid>
                  <Grid xs={3}>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <MDInput type="number" label="Costo" variant="outlined" fullWidth />
                    </MDBox>
                  </Grid>
                  <Grid xs={3}>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <MDInput type="number" label="Venta" variant="outlined" fullWidth />
                    </MDBox>
                  </Grid>
                </Grid>
                <MDBox mt={1} mb={1}>
                  <MDButton variant="gradient" color="info">
                    Agregar
                  </MDButton>
                </MDBox>
                <MDBox>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                  />
                </MDBox>
              </MDBox>
            </MDBox>
          </MDBox>
          <MDBox pt={3}>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <Grid container spacing={2}>
                  <Grid xs={6}>
                    <MDBox mb={1} ml={5} mr={5}>
                      <TextField
                        id="filled-multiline-static"
                        label="Observaciones"
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid xs={6}>
                    <MDBox mb={1} ml={5} mr={5}>
                      <TextField
                        id="filled-multiline-static"
                        label="Condiciones"
                        multiline
                        rows={4}
                        defaultValue=""
                        variant="outlined"
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                </Grid>
                <MDBox mt={3} mb={1}>
                  <InputLabel id="demo-simple-select-helper-label">Etapa Cotización</InputLabel>
                  <Select
                    labelId="stage-price"
                    id="stage-price"
                    label="Etapa Cotización"
                    onChange={handleChange}
                    style={{ height: 40, marginTop: 8, width: 300 }}
                  >
                    <MenuItem value={10}>COTIZADO</MenuItem>
                  </Select>
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton variant="gradient" color="info">
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
