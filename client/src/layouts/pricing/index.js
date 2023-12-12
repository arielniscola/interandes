import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import { useEffect, useState } from "react";
import { getPricings } from "services/pricingHook";
import Icon from "@mui/material/Icon";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PageviewIcon from "@mui/icons-material/Pageview";
import { useMaterialUIController } from "context";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "../../examples/Tables/DataTable";
import MDButton from "../../components/MDButton";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";

function PricingTable() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const generateSalesOrder = (id) => {
    console.log(id);
    window.location.replace(`/salesOrder-form`);
  };
  const viewDetailPricing = (id) => {
    window.location.replace(`/pricing-form/${id}`);
  };
  const addOptions = (items) => {
    const itemsWithOptions = items.map((item) => {
      return {
        ...item,
        options: (
          <div>
            <MDButton variant="text" color={darkMode ? "white" : "dark"}>
              <Icon color="warning">edit</Icon>
            </MDButton>
            <MDButton
              variant="text"
              color={darkMode ? "white" : "dark"}
              onClick={() => generateSalesOrder(item.id)}
            >
              <PostAddIcon color="success" />
            </MDButton>
            <MDButton
              variant="text"
              color={darkMode ? "white" : "dark"}
              onClick={() => viewDetailPricing(item.id)}
            >
              <PageviewIcon color="info" />
            </MDButton>
          </div>
        ),
      };
    });
    return itemsWithOptions;
  };

  // const { columns, rows } = u;
  // const { columns: pColumns, rows: pRows } = ;
  const [pricings, setPrincigs] = useState([]);

  useEffect(async () => {
    const res = await getPricings();
    const response = addOptions(res);
    setPrincigs(response);
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
      <MDBox mt={1} mb={1}>
        <MDButton
          variant="gradient"
          color="success"
          onClick={() => window.location.replace("/pricing-form")}
        >
          Nuevo
        </MDButton>
      </MDBox>
      <MDBox pt={4} pb={3}>
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
                  Pricing
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable table={{ columns, rows: pricings }} noEndBorder />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default PricingTable;
