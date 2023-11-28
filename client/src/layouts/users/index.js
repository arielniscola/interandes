import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import { useEffect, useState } from "react";
import { getClients } from "services/clientHook";
import Icon from "@mui/material/Icon";
// Material Dashboard 2 React components
import { useMaterialUIController } from "context";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "../../examples/Tables/DataTable";
import MDButton from "../../components/MDButton";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";

function UsersTable() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const addOptions = (items) => {
    const itemsWithOptions = items.map((item) => {
      return {
        ...item,
        options: (
          <div>
            <MDButton variant="text" color={darkMode ? "white" : "dark"}>
              <Icon>VisibilityIcon</Icon>
            </MDButton>
            <MDButton variant="text" color={darkMode ? "white" : "dark"}>
              <Icon>DeleteIcon</Icon>
            </MDButton>
          </div>
        ),
      };
    });
    return itemsWithOptions;
  };
  // const { columns: pColumns, rows: pRows } = ;
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const res = await users();
    const response = addOptions(res);
    setUsers(response);
  }, []);

  const columns = [
    { Header: "N°", accessor: "id", align: "center" },
    { Header: "Nombre", accessor: "username", align: "center" },
    { Header: "Correo", accessor: "mailaddress", align: "center" },
    { Header: "Numero telefono", accessor: "phonenumber", align: "center" },
    { Header: "Rol", accessor: "role", align: "center" },
    { Header: "Activo", accessor: "isActive", align: "center" },
    { Header: "Opciones", accessor: "options", align: "center" },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={4} mb={1}>
        <MDButton
          variant="gradient"
          color="success"
          onClick={() => window.location.replace("/clients/form")}
        >
          Nuevo
        </MDButton>
      </MDBox>
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
                  Usuarios
                </MDTypography>
                <MDBox mt={4} mb={1}>
                  <MDButton
                    variant="gradient"
                    color="success"
                    onClick={() => window.location.replace("/clients/form")}
                  >
                    Nuevo
                  </MDButton>
                </MDBox>
              </MDBox>
              <MDBox pt={3}>
                <DataTable table={{ columns, rows: users }} noEndBorder />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default UsersTable;
