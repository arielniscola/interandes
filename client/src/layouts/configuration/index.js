import React, { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Task from "layouts/task";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import Configuration from "./generalConfigs";

export default function BasicButtonGroup() {
  const [menu, setMenu] = useState("users");
  const changeMenu = (menuSelected) => setMenu(menuSelected);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox
          mx={5}
          mt={-1}
          py={2}
          px={4}
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
        >
          <MDTypography variant="h6" color="white">
            Configuración
          </MDTypography>
        </MDBox>
        <MDBox
          mx={2}
          mt={3}
          variant="gradient"
          bgColor="primary"
          borderRadius="lg"
          coloredShadow="primary"
        >
          <ButtonGroup
            size="large"
            variant="text"
            aria-label="text  button group"
            color="secondary"
          >
            <Button onClick={() => changeMenu("users")}>
              <MDTypography variant="h6" color="white">
                Usuarios
              </MDTypography>
            </Button>
            <Button onClick={() => changeMenu("tasks")}>
              <MDTypography variant="h6" color="white">
                Tareas
              </MDTypography>
            </Button>
            <Button onClick={() => changeMenu("typeOperations")}>
              <MDTypography variant="h6" color="white">
                Tipo de Operación
              </MDTypography>
            </Button>
            <Button onClick={() => changeMenu("configurations")}>
              <MDTypography variant="h6" color="white">
                Configuraciones
              </MDTypography>
            </Button>
          </ButtonGroup>
        </MDBox>
        {(menu === "users" && <div>vacio</div>) ||
          (menu === "users" && <div>vacio</div>) ||
          (menu === "tasks" && <Task />) ||
          (menu === "configurations" && <Configuration />)}
      </Card>
    </DashboardLayout>
  );
}
