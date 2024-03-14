import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import { useEffect, useState } from "react";
import { getSalesOrders, generateBL, generateDeclaracion } from "services/salesOrderHook";
import Tooltip from "@mui/material/Tooltip";
import ArticleIcon from "@mui/icons-material/Article";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import PageviewIcon from "@mui/icons-material/Pageview";
import { useMaterialUIController } from "context";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import moment from "moment";
import DataTable from "../../examples/Tables/DataTable";
import MDButton from "../../components/MDButton";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import useSnackbar from "../../services/snackbarHook";

function SalesOrdersTable() {
  const { showSnackbar, renderSnackbar } = useSnackbar();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const viewDetailSaleOrder = (id) => {
    window.location.replace(`/salesOrder-form/${id}`);
  };
  const generatedBLhandle = async (id) => {
    const url = await generateBL(id);
    window.open(url, "_blank");
  };
  const generatedDeclaracionhandle = async (id) => {
    const url = await generateDeclaracion(id);
    window.open(url, "_blank");
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
              onClick={() => viewDetailSaleOrder(item.id)}
            >
              <PageviewIcon color="success" />
            </MDButton>
            <MDButton
              variant="text"
              color={darkMode ? "white" : "dark"}
              onClick={() => generatedBLhandle(item.id)}
            >
              <Tooltip title="Generar Instructivo">
                <ArticleIcon color="gray" />
              </Tooltip>
            </MDButton>
            <MDButton
              variant="text"
              color={darkMode ? "white" : "dark"}
              onClick={() => generatedDeclaracionhandle(item.id)}
            >
              <Tooltip title="Generar Declaracion">
                <ContentPasteIcon color="warning" />
              </Tooltip>
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
    { Header: "N°", accessor: "numberSO", align: "center" },
    { Header: "Compañia", accessor: "companyname", align: "center" },
    { Header: "Origen Carga", accessor: "originOfCharge", align: "center" },
    { Header: "Destino Final", accessor: "finalDestination", align: "center" },
    { Header: "Transporte", accessor: "transportation", align: "center" },
    { Header: "Cliente", accessor: "Client.companyname", align: "center" },
    {
      Header: "Fecha",
      accessor: "createdAt",
      align: "center",
      Cell: ({ value }) => moment(value).format("DD/MM/YYYY"),
    },
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
