import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import { useEffect, useState } from "react";
import Icon from "@mui/material/Icon";
import { useMaterialUIController } from "context";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { getProviders } from "services/providerHook";
import DataTable from "../../examples/Tables/DataTable";
import MDButton from "../../components/MDButton";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";

function SuplierTable() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const addOptions = (items) => {
    const itemsWithOptions = items.map((item) => {
      return {
        ...item,
        options: (
          <div>
            <MDButton variant="text" color={darkMode ? "white" : "dark"}>
              <Icon>edit</Icon>
            </MDButton>
            <MDButton variant="text" color={darkMode ? "white" : "dark"}>
              <Icon>launchOutlinedIcon</Icon>
            </MDButton>
          </div>
        ),
      };
    });
    return itemsWithOptions;
  };
  // const { columns: pColumns, rows: pRows } = ;
  const [providers, setProviders] = useState([]);

  useEffect(async () => {
    const res = await getProviders();
    const response = addOptions(res.data);
    setProviders(response);
  }, []);

  const columns = [
    { Header: "Nombre", accessor: "businessName", align: "center" },
    { Header: "Contacto", accessor: "contactPerson", align: "center" },
    { Header: "Email", accessor: "email", align: "center" },
    { Header: "Categoria", accessor: "type", align: "center" },
    { Header: "Opciones", accessor: "options", align: "center" },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={1} mb={1}>
        <MDButton
          variant="gradient"
          color="success"
          onClick={() => window.location.replace("/providers/form")}
        >
          Nuevo
        </MDButton>
      </MDBox>
      <MDBox pt={4} pb={3}>
        <Card>
          <MDBox pt={6} pb={3}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
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
                      Proveedores
                    </MDTypography>
                  </MDBox>
                  <MDBox pt={3}>
                    <DataTable table={{ columns, rows: providers }} noEndBorder />
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default SuplierTable;
