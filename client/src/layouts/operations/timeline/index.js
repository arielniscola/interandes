import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import moment from "moment";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

import TimelineItem from "examples/Timeline/TimelineItem";
import { getOperationID } from "services/operationHook";
import MDButton from "components/MDButton";
import Filesviews from "components/FileStructure";
import useSnackbar from "../../../services/snackbarHook";

function OperationTimeLine() {
  const { showSnackbar, renderSnackbar } = useSnackbar();
  const { id } = useParams();
  const [operation, setOperation] = useState({});
  const [tasks, setTasks] = useState([]);

  const handleToggle = (value) => () => {
    const newArray = tasks.map((el) => {
      if (el.task === value.task) {
        return { ...el, done: !value.done };
      }
      return { ...el };
    });
    setTasks(newArray);
  };
  useEffect(async () => {
    if (id) {
      const res = await getOperationID(id);
      if (res.ack) {
        showSnackbar({
          title: "Operación",
          content: res.message,
          color: res.ack ? "error" : "success",
          icon: res.ack ? "warning" : "check",
        });
      } else {
        setOperation(res.data);
        setTasks(res.data.TaskList.taks);
      }
    }
  }, []);

  const redirectSalesOrder = () => {
    if (operation.salesOrder.id) {
      window.location.replace(`/salesOrder-form/${id}`);
    } else {
      showSnackbar({
        title: "Operaciones",
        content: "No hay orden de venta asociada",
        color: "warning",
        icon: "warning",
      });
    }
  };
  const redirectPricing = () => {
    if (operation.pricing.id) {
      window.location.replace(`/pricing-form/${id}`);
    } else {
      showSnackbar({
        title: "Operaciones",
        content: "No hay pricing asociado",
        color: "warning",
        icon: "warning",
      });
    }
  };

  const redirectFileUpload = () => {
    window.location.replace(`/file-upload/${id}`);
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
        <MDBox sx={{ margin: 2 }}>
          <MDTypography variant="h6" color="gray">
            {`Numero de Operación: N° ${operation.operationNumber}`}
          </MDTypography>
          <MDTypography variant="h6" color="gray">
            Fecha de Creación: {`${moment.utc(operation.date).format("DD-MM-YYYY")}`}
          </MDTypography>
          <MDTypography variant="h6" color="gray">
            Tipo de Operación: {`${operation.typeOperation}`}
          </MDTypography>
        </MDBox>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <MDBox sx={{ margin: 2 }}>
              <MDButton
                variant="outlined"
                size="medium"
                color="success"
                onClick={redirectFileUpload}
              >
                Subir archivos
              </MDButton>
            </MDBox>
          </Grid>
          <Grid item xs={4}>
            <MDBox sx={{ margin: 2 }}>
              <MDButton
                variant="outlined"
                size="medium"
                color="warning"
                onClick={redirectSalesOrder}
              >
                Orden de Venta
              </MDButton>
            </MDBox>
          </Grid>
          <Grid item xs={4}>
            <MDBox sx={{ margin: 2 }}>
              <MDButton variant="outlined" size="medium" color="primary" onClick={redirectPricing}>
                Pricing
              </MDButton>
            </MDBox>
          </Grid>
        </Grid>
      </Card>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card sx={{ height: "100%" }}>
            <MDBox pt={3} px={3}>
              <MDTypography variant="h6" fontWeight="medium">
                Historial Operación
              </MDTypography>
            </MDBox>
            <MDBox p={2}>
              {operation &&
                operation.HistoryOperations &&
                operation?.HistoryOperations.map((item) => {
                  return (
                    <TimelineItem
                      color="success"
                      icon="south"
                      title={item.method}
                      dateTime={moment.utc(item.date).format("DD-MM-YY HH:MM:SS")}
                    />
                  );
                })}
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
                {operation &&
                  tasks.map((value) => {
                    const labelId = `checkbox-list-secondary-label-${value.task}`;
                    return (
                      <ListItem
                        key={value.task}
                        secondaryAction={
                          <Checkbox
                            edge="end"
                            onChange={handleToggle(value)}
                            checked={value.done}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        }
                        disablePadding
                      >
                        <ListItemButton>
                          <ListItemText id={labelId} primary={`${value.task}`} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
              </List>
            </MDBox>
            <MDBox sx={{ margin: 4 }}>
              <MDButton variant="gradient" color="info">
                Actualizar Lista
              </MDButton>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ height: "100%", margin: 2 }}>
          <MDBox pt={3} px={3}>
            <MDTypography variant="h6" fontWeight="medium">
              Archivos
            </MDTypography>
          </MDBox>
          <Filesviews id={id} />
        </Card>
      </Grid>
      {renderSnackbar}
    </DashboardLayout>
  );
}

export default OperationTimeLine;
