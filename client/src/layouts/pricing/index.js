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
import { getPricings } from "services/pricingHook";
// Material Dashboard 2 React components

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "../../examples/Tables/DataTable";
import MDButton from "../../components/MDButton";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";

// Data

function PricingTable() {
  // const { columns, rows } = u;
  // const { columns: pColumns, rows: pRows } = ;
  const [pricings, setPrincigs] = useState([]);

  useEffect(async () => {
    const res = await getPricings();
    setPrincigs(res);
  }, []);

  const columns = [
    { Header: "N°", accessor: "id", align: "center" },
    { Header: "Compañia", accessor: "companyname", align: "center" },
    { Header: "Creado", accessor: "createdAt", align: "center" },
    { Header: "Estado", accessor: "stage", align: "center" },
    { Header: "Importe Total", accessor: "profit", align: "center" },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={4} mb={1}>
        <MDButton
          variant="gradient"
          color="success"
          onClick={() => window.location.replace("/pricing-form")}
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
