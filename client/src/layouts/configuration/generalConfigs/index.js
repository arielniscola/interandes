// Material Dashboard 2 React components
import Switch from "@mui/material/Switch";
// Material Dashboard 2 React example components
import { useMaterialUIController, setFixedNavbar, setDarkMode } from "context";
import Divider from "@mui/material/Divider";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";

function Configuration() {
  const [controller, dispatch] = useMaterialUIController();
  const { fixedNavbar, darkMode } = controller;

  const handleFixedNavbar = () => setFixedNavbar(dispatch, !fixedNavbar);
  const handleDarkMode = () => setDarkMode(dispatch, !darkMode);

  return (
    <div>
      <MDBox
        mx={2}
        mt={3}
        py={2}
        px={1}
        variant="gradient"
        bgColor="warning"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography variant="h6" color="white">
          Configuración General
        </MDTypography>
      </MDBox>
      <MDBox pb={3} ml={10} width="80%">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
          lineHeight={1}
        >
          <MDTypography variant="h6">Navegador fijo</MDTypography>

          <Switch checked={fixedNavbar} onChange={handleFixedNavbar} />
        </MDBox>
        <Divider />
        <MDBox display="flex" justifyContent="space-between" alignItems="center" lineHeight={1}>
          <MDTypography variant="h6">Modo: Claro / Oscuro</MDTypography>
          <Switch checked={darkMode} onChange={handleDarkMode} />
        </MDBox>
      </MDBox>
    </div>
  );
}

export default Configuration;
