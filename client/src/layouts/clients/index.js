import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import { useEffect, useState } from "react";
import { getClients } from "services/clientHook";
import { useMaterialUIController } from "context";
import EditIcon from "@mui/icons-material/Edit";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "../../examples/Tables/DataTable";
import MDButton from "../../components/MDButton";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";

function ClientTable() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const viewDetailClient = (id) => {
    window.location.replace(`/clients/edit/${id}`);
  };

  const addOptions = (items) => {
    const itemsWithOptions = items.map((item) => {
      return {
        ...item,
        options: (
          <div>
            <MDButton
              variant="text"
              color={darkMode ? "white" : "dark"}
              onClick={() => viewDetailClient(item.id)}
            >
              <EditIcon color="info" />
            </MDButton>
          </div>
        ),
      };
    });
    return itemsWithOptions;
  };
  // const { columns: pColumns, rows: pRows } = ;
  const [clients, setClients] = useState([]);

  useEffect(async () => {
    const res = await getClients();
    const response = addOptions(res);
    setClients(response);
  }, []);

  const columns = [
    { Header: "N°", accessor: "id", align: "center" },
    { Header: "Nombre", accessor: "companyname", align: "center" },
    { Header: "Contacto", accessor: "contactperson", align: "center" },
    { Header: "Email", accessor: "mailaddress", align: "center" },
    { Header: "Categoria", accessor: "category", align: "center" },
    { Header: "Opciones", accessor: "options", align: "center" },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={1} mb={1}>
        <MDButton
          variant="gradient"
          color="success"
          onClick={() => window.location.replace("/clients/form")}
        >
          Nuevo
        </MDButton>
      </MDBox>
      <MDBox pt={3} pb={3}>
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
                  Clientes
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable table={{ columns, rows: clients }} noEndBorder />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ClientTable;
