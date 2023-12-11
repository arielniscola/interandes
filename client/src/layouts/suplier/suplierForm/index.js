import React, { useState, useEffect } from "react";
import { createProvider } from "services/providerHook";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import MDInput from "../../../components/MDInput";
import MDButton from "../../../components/MDButton";
import MDTypography from "../../../components/MDTypography";

function ProviderForm() {
  const [providers, setProviders] = useState([]);

  useEffect(async () => {
    const res = await getProviders();
    setProviders(res);
  }, []);
  const [provider, setProvider] = useState({
    _id: "",
    businessName: "",
    address: "",
    email: "",
    contactperson: "",
    type: "",
    cbu: "",
    accountBank: "",
    files: "",
  });
  const handleChangeProvider = (e) => {
    const { name, value } = e.target;
    switch (name) {
      default:
        setProvider({
          ...provider,
          [name]: value,
        });
        break;
    }
  };
  const submitHandlerProvider = async () => {
    const res = await createProvider(provider);
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
            Alta Proveedor
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
                      name="businessName"
                      value={provider.businessName}
                      variant="outlined"
                      fullWidth
                      onChange={handleChangeProvider}
                    />
                  </MDBox>
                  <MDBox mb={2} sx={{ m: 2 }}>
                    <MDInput
                      type="text"
                      label="Dirección"
                      name="address"
                      value={provider.address}
                      variant="outlined"
                      fullWidth
                      onChange={handleChangeProvider}
                    />
                  </MDBox>
                  <MDBox mb={2} sx={{ m: 2 }}>
                    <MDInput
                      type="text"
                      label="Correo Electrónico"
                      name="email"
                      value={provider.email}
                      variant="outlined"
                      fullWidth
                      onChange={handleChangeProvider}
                    />
                  </MDBox>
                  <MDBox mb={2} sx={{ m: 2 }}>
                    <MDInput
                      type="text"
                      label="Persona de Contacto"
                      name="contactperson"
                      value={provider.contactperson}
                      variant="outlined"
                      onChange={handleChangeProvider}
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={6}>
                  <MDBox mb={2} sx={{ m: 2 }}>
                    <MDInput
                      type="text"
                      label="Tipo"
                      name="type"
                      value={provider.type}
                      variant="outlined"
                      fullWidth
                      onChange={handleChangeProvider}
                    />
                  </MDBox>
                  <MDBox mb={2} sx={{ m: 2 }}>
                    <MDInput
                      type="text"
                      label="CBU"
                      value={provider.cbu}
                      name="cbu"
                      variant="outlined"
                      fullWidth
                      onChange={handleChangeProvider}
                    />
                  </MDBox>
                  <MDBox mb={2} sx={{ m: 2 }}>
                    <MDInput
                      type="text"
                      label="Banco"
                      name="accountBanck"
                      value={provider.accountBank}
                      variant="outlined"
                      fullWidth
                      onChange={handleChangeProvider}
                    />
                  </MDBox>
                </Grid>
              </Grid>
              <MDBox mt={4} mb={1}>
                {!provider.id && (
                  <MDButton variant="gradient" color="info" onClick={submitHandlerProvider}>
                    Crear Proveedor
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

export default ProviderForm;
