// import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
// @mui material components
// import table Items
import MDBox from "components/MDBox";

import DeleteIcon from "@mui/icons-material/Delete";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { createTask, getTasks } from "services/taskHook";
import Typography from "@mui/material/Typography";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import MDTypography from "../../components/MDTypography";
import useSnackbar from "../../services/snackbarHook";
import MDInput from "../../components/MDInput";
import MDButton from "../../components/MDButton";

function Task() {
  const { showSnackbar, renderSnackbar } = useSnackbar();
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    description: "",
  });
  const [load, setLoad] = useState(false);
  useEffect(async () => {
    const res = await getTasks();
    if (!res.ack) {
      showSnackbar({
        title: "Tareas",
        content: res.message,
        icon: res.ack ? "error" : "success",
      });
    } else {
      setTasks(res.data);
    }
  }, [load]);

  const handleTask = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "description":
        setTask({
          ...task,
          [name]: value,
        });
        break;
      default:
        setTask({
          ...task,
          [name]: value,
        });
        break;
    }
  };
  const submitTask = async () => {
    const res = await createTask(task);
    console.log(res);
    showSnackbar({
      title: "Tarea",
      content: res.message,
      color: res.ack ? "error" : "success",
      icon: res.ack ? "warning" : "check",
    });
    setLoad(!load);
    setTask({ description: "" });
  };
  const deleteTask = async (id) => {
    console.log(id);
  };

  return (
    <div>
      <MDBox pt={6} pb={3}>
        <MDBox
          mx={2}
          mt={-3}
          py={2}
          px={1}
          variant="gradient"
          bgColor="warning"
          borderRadius="lg"
          coloredShadow="warning"
        >
          <MDTypography variant="h6" color="white">
            Lista de Tareas
          </MDTypography>
        </MDBox>
        <Grid container spacing={4} marginLeft={4}>
          <Grid item xs={8} md={4} margin={5}>
            <MDBox pt={1}>
              <Typography sx={{ mt: 2, mb: 2 }} variant="h6">
                Tareas:
              </Typography>
              <List>
                {tasks.length && tasks.map((el) => {
                  return (
                    <ListItem
                      id={el.id}
                      divider="true"
                      alignItems="center"
                      secondaryAction={
                        <IconButton onClick={() => deleteTask(el.id)} aria-label="delete">
                          <DeleteIcon color="error" />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <CheckIcon color="success" />
                      </ListItemAvatar>
                      <ListItemText primary={el.description} />
                    </ListItem>
                  );
                })}
              </List>
            </MDBox>
          </Grid>
          <Grid item xs={8} md={4} margin={3}>
            <MDBox pt={3}>
              <Typography sx={{ mt: 2, mb: 2 }} variant="h6">
                Agregar Tarea:
              </Typography>
              <MDBox component="form" role="form">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <MDInput
                        disable
                        type="text"
                        name="description"
                        label="Agregar Descripcion:"
                        value={task.description}
                        onChange={handleTask}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <MDButton variant="gradient" color="info" onClick={submitTask}>
                        Agregar Tarea
                      </MDButton>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      {renderSnackbar}
    </div>
  );
}

export default Task;
