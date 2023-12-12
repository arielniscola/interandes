import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import { useEffect, useState } from "react";
import { getSalesOrders } from "services/salesOrderHook";

import Icon from "@mui/material/Icon";

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
              <Icon color="warning">edit</Icon>
            </MDButton>
            <MDButton variant="text" color={darkMode ? "white" : "dark"}>
              <Icon color="info">launchOutlinedIcon</Icon>
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
    console.log(res);
    if (res.ack) {
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
    { Header: "Mercaderia", accessor: "merchandise", align: "center" },
    { Header: "Compañia", accessor: "companyname", align: "center" },
    { Header: "Origen Carga", accessor: "originOfCharge", align: "center" },
    { Header: "Destino Final", accessor: "finalDestination", align: "center" },
    { Header: "Transporte", accessor: "transportation", align: "center" },
    { Header: "Cliente", accessor: "client.name", align: "center" },
    { Header: "Opciones", accessor: "options", align: "center" },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
