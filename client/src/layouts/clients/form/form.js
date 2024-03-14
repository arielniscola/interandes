import React, { useState, useEffect } from "react";
import { getClients, createCliente } from "services/clientHook";
import Autocomplete from "@mui/material/Autocomplete";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import MDInput from "../../../components/MDInput";
import MDButton from "../../../components/MDButton";
import MDTypography from "../../../components/MDTypography";

function ClientForm({ onClientSelect, id }) {
  const [clients, setClients] = useState([]);

  useEffect(async () => {
    const res = await getClients();
    setClients(res);
  }, []);

  const [client, setClient] = useState({
    _id: "",
    taxID: "",
    companyname: "",
    direction: "",
    contactperson: "",
    mailaddress: "",
    phonenumber: "",
    category: "",
  });
  useEffect(() => {
    if (id) {
      const clientSel = clients.find((el) => el.id === id);
      setClient(clientSel);
      onClientSelect(clientSel);
    }
  }, [id]);
  const defaultOptions = {
    options: clients.length > 0 ? clients : [],
    getOptionLabel: (option) => option.companyname,
  };
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
    const res = await createCliente(client);
    onClientSelect(res);
  };
  return (
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
              freeSolo
              id="client-select"
              multiple={false}
              style={{ width: 300, marginBottom: 8, marginTop: -20 }}
              options={clients}
              renderInput={(params) => <TextField {...params} label="Cliente" variant="outlined" />}
              onChange={(event, newValue) => {
                if (!newValue) {
                  setClient({
                    taxID: "",
                    companyname: "",
                    direction: "",
                    contactperson: "",
                    mailaddress: "",
                    phonenumber: "",
                    category: "",
                  });
                } else {
                  setClient(newValue);
                  onClientSelect(newValue);
                }
              }}
            />
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
                    />
                  </MDBox>
                </Grid>
              </Grid>
              <MDBox mt={4} mb={1}>
                {!client.id && (
                  <MDButton variant="gradient" color="info" onClick={submitHandlerClient}>
                    Crear Cliente
                  </MDButton>
                )}
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </MDBox>
  );
}

export default ClientForm;
