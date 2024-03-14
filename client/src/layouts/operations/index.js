import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import { useEffect, useState } from "react";
import PageviewIcon from "@mui/icons-material/Pageview";

import { useMaterialUIController } from "context";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { getOperations } from "services/operationHook";
import moment from "moment";
import DataTable from "../../examples/Tables/DataTable";
import MDButton from "../../components/MDButton";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";

function OperationsTable() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const detailView = (id) => {
    window.location.replace(`/operations/timeline/${id}`);
  };

  const addOptions = (items) => {
    const itemsWithOptions = items.map((item) => {
      return {
        ...item,
        options: (
          <div>
            <MDButton
              variant="text"
              size="large"
              color={darkMode ? "white" : "dark"}
              onClick={() => detailView(item.id)}
            >
              <PageviewIcon color="info" />
            </MDButton>
          </div>
        ),
      };
    });
    return itemsWithOptions;
  };
  // const { columns: pColumns, rows: pRows } = ;
  const [operations, setOperations] = useState([]);

  useEffect(async () => {
    const res = await getOperations();
    const response = addOptions(res.data);
    setOperations(response);
  }, []);

  const columns = [
    { Header: "N°", accessor: "operationNumber", align: "center" },
    {
      Header: "Fecha Creación",
      accessor: "date",
      align: "center",
      Cell: ({ value }) => moment(value).format("DD/MM/YYYY"),
    },
    { Header: "Tipo de Operación", accessor: "typeOperation", align: "center" },
    { Header: "Opciones", accessor: "options", align: "center" },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
                  Operaciones
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable table={{ columns, rows: operations }} noEndBorder />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default OperationsTable;
