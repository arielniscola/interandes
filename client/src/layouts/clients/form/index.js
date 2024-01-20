import React, { useState, useEffect } from "react";
import { getClientID, createCliente, updateCliente } from "services/clientHook";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useParams, useNavigate } from "react-router-dom";
import MDBox from "components/MDBox";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import MDInput from "../../../components/MDInput";
import MDButton from "../../../components/MDButton";
import MDTypography from "../../../components/MDTypography";
import useSnackbar from "../../../services/snackbarHook";

function ClientEditView() {
  const { showSnackbar, renderSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [inputsHabilitados, setInputsHabilitados] = useState(false);
  const { id } = useParams();
  const [client, setClient] = useState({
    id: "",
    taxID: "",
    companyname: "",
    direction: "",
    contactperson: "",
    mailaddress: "",
    phonenumber: "",
    category: "",
  });

  useEffect(async () => {
    if (id) {
      const res = await getClientID(id);
      if (res.ack) {
        showSnackbar({
          title: "Clientes",
          content: res.message,
          color: res.ack ? "error" : "success",
          icon: res.ack ? "warning" : "check",
        });
      } else {
        setInputsHabilitados(true);
        setClient(res.data);
      }
    }
  }, []);

  const handleChangeClient = (e) => {
    const { name, value } = e.target;
    switch (name) {
      default:
        setClient({
          ...client,
          [name]: value,
        });
        break;
    }
  };
  const submitHandlerClient = async () => {
    let res;
    if (id) {
      res = await updateCliente(client);
    } else {
      res = await createCliente(client);
    }
    showSnackbar({
      title: "Clientes",
      content: res.message,
      color: res.ack ? "error" : "success",
      icon: res.ack ? "warning" : "check",
    });
    if (!res.ack)
      setTimeout(() => {
        navigate("/clients");
      }, 1000);
  };
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
              Alta/Modificación Cliente
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <MDInput
                        type="text"
                        label="Razón Social"
                        name="companyname"
                        value={client.companyname}
                        variant="outlined"
                        fullWidth
                        onChange={handleChangeClient}
                        disabled={inputsHabilitados}
                      />
                    </MDBox>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <MDInput
                        type="text"
                        label="Dirección"
                        name="direction"
                        value={client.direction}
                        variant="outlined"
                        fullWidth
                        onChange={handleChangeClient}
                        disabled={inputsHabilitados}
                      />
                    </MDBox>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <MDInput
                        type="text"
                        label="ID Tributaria"
                        name="taxID"
                        value={client.taxID}
                        variant="outlined"
                        fullWidth
                        onChange={handleChangeClient}
                        disabled={inputsHabilitados}
                      />
                    </MDBox>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <MDInput
                        type="text"
                        label="Persona de Contacto"
                        name="contactperson"
                        value={client.contactperson}
                        variant="outlined"
                        onChange={handleChangeClient}
                        fullWidth
                        disabled={inputsHabilitados}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={6}>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <MDInput
                        type="mail"
                        label="Mail"
                        name="mailaddress"
                        value={client.mailaddress}
                        variant="outlined"
                        fullWidth
                        onChange={handleChangeClient}
                        disabled={inputsHabilitados}
                      />
                    </MDBox>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <MDInput
                        type="text"
                        label="Telefono"
                        value={client.phonenumber}
                        name="phonenumber"
                        variant="outlined"
                        fullWidth
                        onChange={handleChangeClient}
                        disabled={inputsHabilitados}
                      />
                    </MDBox>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <MDInput
                        type="text"
                        label="Rubro"
                        name="category"
                        value={client.category}
                        variant="outlined"
                        fullWidth
                        onChange={handleChangeClient}
                        disabled={inputsHabilitados}
                      />
                    </MDBox>
                  </Grid>
                </Grid>
                <MDBox mt={4} mb={1}>
                  {!inputsHabilitados && (
                    <MDButton
                      variant="gradient"
                      color="info"
                      disabled={inputsHabilitados}
                      onClick={submitHandlerClient}
                    >
                      Guardar
                    </MDButton>
                  )}
                </MDBox>
                {id && inputsHabilitados && (
                  <Box
                    sx={{
                      "& > :not(style)": { m: 1 },
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                    }}
                  >
                    <Fab color="info" aria-label="edit" onClick={() => setInputsHabilitados(false)}>
                      <EditIcon />
                    </Fab>
                  </Box>
                )}
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      {renderSnackbar}
    </DashboardLayout>
  );
}

export default ClientEditView;
