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

import { useState, useEffect } from "react";

// @mui material components
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Custom styles for the Configurator
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";

// Material Dashboard 2 React context
import { useMaterialUIController, setOpenConfigurator } from "context";

function Configurator({ id, price }) {
  const [controller, dispatch] = useMaterialUIController();
  const { openConfigurator, darkMode } = controller;
  const [disabled, setDisabled] = useState(false);

  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  useEffect(() => {
    // A function that sets the disabled state of the buttons for the sidenav type.
    function handleDisabled() {
      console.log(disabled);
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    // The event listener that's calling the handleDisabled function when resizing the window.
    window.addEventListener("resize", handleDisabled);

    // Call the handleDisabled function to set the state with the initial value.
    handleDisabled();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={4}
        pb={0.5}
        px={3}
      >
        <MDBox>
          <MDTypography variant="h5">Opciones</MDTypography>
          <MDTypography variant="body2" color="text">
            Opciones generales
          </MDTypography>
        </MDBox>

        <Icon
          sx={({ typography: { size }, palette: { dark, white } }) => ({
            fontSize: `${size.lg} !important`,
            color: darkMode ? white.main : dark.main,
            stroke: "currentColor",
            strokeWidth: "2px",
            cursor: "pointer",
            transform: "translateY(5px)",
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </MDBox>
      <Divider />
      <MDBox
        component="li"
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        py={1}
        pr={1}
      >
        <MDBox lineHeight={1.125}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            Subir Archivos
          </MDTypography>
          <MDTypography variant="caption" fontWeight="regular" color="text">
            {id}
          </MDTypography>
        </MDBox>
        <MDBox display="flex" alignItems="center">
          <MDTypography variant="button" fontWeight="regular" color="text">
            {price}
          </MDTypography>
          <MDBox
            display="flex"
            alignItems="center"
            lineHeight={1}
            ml={3}
            sx={{ cursor: "pointer" }}
            onClick={() => window.location.replace("/file-upload")}
          >
            <Icon fontSize="small">picture_as_pdf</Icon>
            <MDTypography variant="button" fontWeight="bold">
              &nbsp;
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </ConfiguratorRoot>
  );
}

export default Configurator;
