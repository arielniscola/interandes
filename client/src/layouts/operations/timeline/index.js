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
import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

function OperationTimeLine() {
  const [checked, setChecked] = useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ height: "50%", marginBottom: 5 }}>
        <MDBox
          pt={3}
          px={3}
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
        >
          <MDTypography variant="h6" color="white">
            Datos de Operación
          </MDTypography>
        </MDBox>
      </Card>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card sx={{ height: "100%" }}>
            <MDBox pt={3} px={3}>
              <MDTypography variant="h6" fontWeight="medium">
                Historial Operación
              </MDTypography>
              <MDBox mt={0} mb={2}>
                <MDTypography variant="button" color="text" fontWeight="regular">
                  <MDTypography display="inline" variant="body2" verticalAlign="middle">
                    <Icon sx={{ color: ({ palette: { success } }) => success.main }}>
                      arrow_upward
                    </Icon>
                  </MDTypography>
                  &nbsp;
                  <MDTypography variant="button" color="text" fontWeight="medium">
                    24%
                  </MDTypography>{" "}
                  this month
                </MDTypography>
              </MDBox>
            </MDBox>
            <MDBox p={2}>
              <TimelineItem
                color="success"
                icon="notifications"
                title="$2400, Design changes"
                dateTime="22 DEC 7:20 PM"
              />
              <TimelineItem
                color="error"
                icon="inventory_2"
                title="New order #1832412"
                dateTime="21 DEC 11 PM"
              />
              <TimelineItem
                color="info"
                icon="shopping_cart"
                title="Server payments for April"
                dateTime="21 DEC 9:34 PM"
              />
              <TimelineItem
                color="warning"
                icon="payment"
                title="New card added for order #4395133"
                dateTime="20 DEC 2:20 AM"
              />
              <TimelineItem
                color="primary"
                icon="vpn_key"
                title="New card added for order #4395133"
                dateTime="18 DEC 4:54 AM"
                lastItem
              />
            </MDBox>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <MDBox pt={3} px={3}>
              <MDTypography variant="h6" fontWeight="medium">
                Lista de tareas
              </MDTypography>
              <List dense sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                {[0, 1, 2, 3].map((value) => {
                  const labelId = `checkbox-list-secondary-label-${value}`;
                  return (
                    <ListItem
                      key={value}
                      secondaryAction={
                        <Checkbox
                          edge="end"
                          onChange={handleToggle(value)}
                          checked={checked.indexOf(value) !== -1}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      }
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default OperationTimeLine;
