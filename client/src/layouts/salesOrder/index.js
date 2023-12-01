/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import { useEffect, useState } from "react";
import { getSalesOrders } from "services/salesOrderHook";
// Material Dashboard 2 React components
import Icon from "@mui/material/Icon";
// Material Dashboard 2 React example components
import { useMaterialUIController } from "context";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "../../examples/Tables/DataTable";
import MDButton from "../../components/MDButton";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import useSnackbar from "../../services/snackbarHook";

function SalesOrdersTable() {
  const { showSnackbar, renderSnackbar } = useSnackbar();
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

  // const { columns, rows } = u;
  // const { columns: pColumns, rows: pRows } = ;
  const [salesOrders, setsalesOrders] = useState([]);

  useEffect(async () => {
    const res = await getSalesOrders();
    if (!res.ack) {
      showSnackbar({
        title: "Orden de Venta",
        content: res.message,
        icon: res.ack ? "error" : "success",
      });
    } else {
      const response = addOptions(res.data);
      setsalesOrders(response);
    }
  }, []);

  const columns = [
    { Header: "N°", accessor: "pricingnumber", align: "center" },
    { Header: "Compañia", accessor: "companyname", align: "center" },
    { Header: "Creado", accessor: "createdAt", align: "center" },
    { Header: "Estado", accessor: "stage", align: "center" },
    { Header: "Importe Total", accessor: "profit", align: "center" },
    { Header: "Opciones", accessor: "options", align: "center" },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={4} mb={1}>
        <MDButton
          variant="gradient"
          color="success"
          onClick={() => window.location.replace("/salesOrder-form")}
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
                  Orden de venta
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable table={{ columns, rows: salesOrders }} noEndBorder />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {renderSnackbar}
      <Footer />
    </DashboardLayout>
  );
}

export default SalesOrdersTable;
