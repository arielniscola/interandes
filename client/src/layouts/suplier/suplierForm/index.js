import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { createProvider } from "services/providerHook";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import MDInput from "../../../components/MDInput";
import MDButton from "../../../components/MDButton";
import MDTypography from "../../../components/MDTypography";
import useSnackbar from "../../../services/snackbarHook";

function ProviderForm() {
  const { showSnackbar, renderSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [provider, setProvider] = useState({
    _id: "",
    businessName: "",
    address: "",
    email: "",
    contactPerson: "",
    type: "",
    cbu: "",
    accountBank: "",
    files: [],
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
    if (res.ack) {
      showSnackbar({
        title: "Proveedores",
        content: res.message,
        color: res.ack ? "error" : "success",
        icon: res.ack ? "warning" : "check",
      });
    }
    if (!res.ack) navigate("/providers");
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
                        name="contactPerson"
                        value={provider.contactPerson}
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
                        name="accountBank"
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
        {renderSnackbar}
      </MDBox>
    </DashboardLayout>
  );
}

export default ProviderForm;
