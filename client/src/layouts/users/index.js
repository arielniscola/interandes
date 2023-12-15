import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import { useEffect, useState } from "react";
import Icon from "@mui/material/Icon";
import PageviewIcon from "@mui/icons-material/Pageview";
import { useMaterialUIController } from "context";

import { getUsers } from "services/userHook";
import DataTable from "../../examples/Tables/DataTable";
import MDButton from "../../components/MDButton";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";

function UsersTable() {
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
              <PageviewIcon color="info" />
            </MDButton>
          </div>
        ),
      };
    });
    return itemsWithOptions;
  };
  // const { columns: pColumns, rows: pRows } = ;
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const res = await getUsers();
    const response = addOptions(res);
    setUsers(response);
  }, []);

  const columns = [
    { Header: "Nombre", accessor: "username", align: "center" },
    { Header: "Correo", accessor: "mailaddress", align: "center" },
    { Header: "Numero telefono", accessor: "phonenumber", align: "center" },
    { Header: "Rol", accessor: "role", align: "center" },
    { Header: "Opciones", accessor: "options", align: "center" },
  ];

  return (
    <div>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={1}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Usuarios
                </MDTypography>
              </MDBox>
              <MDBox sx={{ margin: 2 }}>
                <MDButton
                  variant="gradient"
                  color="success"
                  onClick={() => window.location.replace("/clients/form")}
                >
                  Nuevo
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable table={{ columns, rows: users }} noEndBorder />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </div>
  );
}

export default UsersTable;
