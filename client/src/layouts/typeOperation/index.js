// import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";

import Autocomplete from "@mui/material/Autocomplete";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";

import { createOperationType, getTypeOperations } from "services/taskHook";
import useSnackbar from "../../services/snackbarHook";
import MDInput from "../../components/MDInput";
import MDButton from "../../components/MDButton";
import MDTypography from "../../components/MDTypography";
import TransferList from "./tranferList";
import { updateOperationTypeService } from "../../services/taskHook";

function TypeOperation() {
  const { showSnackbar, renderSnackbar } = useSnackbar();
  const [typeOperations, setTypeOperations] = useState([]);
  const [operationType, setOperationType] = useState({
    id: "",
    code: "",
    tasks: [],
  });

  // Obtener todos los tipos de operacion
  useEffect(async () => {
    const res = await getTypeOperations();
    if (res.ack) {
      showSnackbar({
        title: "Tipo de Operación",
        content: res.message,
        color: res.ack ? "error" : "success",
        icon: res.ack ? "warning" : "check",
      });
    } else {
      setTypeOperations(res.data);
    }
  }, []);
  const operationHandler = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "code":
        setOperationType({
          ...operationType,
          [name]: value,
        });
        break;
      default:
        setOperationType({
          ...operationType,
          [name]: value,
        });
        break;
    }
  };
  const submitTypeOperation = async () => {
    const res = await createOperationType(operationType);
    showSnackbar({
      title: "Tipo de Operacion",
      content: res.message,
      color: res.ack ? "error" : "success",
      icon: res.ack ? "warning" : "check",
    });
    setOperationType({ code: "", id: "", tasks: [] });
  };
  const defaultOptions = {
    options: typeOperations?.length > 0 ? typeOperations : [],
    getOptionLabel: (option) => option.code,
  };
  const updateOperationType = async (tasks = []) => {
    // Actualizar en servidor
    const newtasks = tasks.map((el) => el.description);
    const opType = { ...operationType };
    opType.tasks = newtasks;
    const res = await updateOperationTypeService(opType);
    if (res) {
      showSnackbar({
        title: "Tipo de Operación",
        content: res.message,
        color: res.ack ? "error" : "success",
        icon: res.ack ? "warning" : "check",
      });
    }
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
            Tipo de Operación
          </MDTypography>
        </MDBox>
        <Grid container spacing={4}>
          <Grid item xs={8} md={4} margin={5}>
            <MDBox>
              <Typography sx={{ mb: 5 }} variant="h6">
                Seleccionar Tipo de Operación
              </Typography>
              <MDBox>
                <Autocomplete
                  {...defaultOptions}
                  id="operation-select"
                  multiple={false}
                  style={{ width: 300, marginBottom: 8, marginTop: -20 }}
                  options={typeOperations}
                  renderInput={(params) => (
                    <TextField {...params} label="Tipo de Operacion" variant="outlined" />
                  )}
                  onChange={(event, newValue) => {
                    if (!newValue) {
                      setOperationType({
                        code: "",
                        id: "",
                        tasks: [],
                      });
                    } else {
                      setOperationType(newValue);
                    }
                  }}
                />
              </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={8} md={4} margin={2}>
            <MDBox pt={3}>
              <Typography sx={{ mb: 2 }} variant="h6">
                Nuevo Tipo de Operación
              </Typography>
              <MDBox component="form" role="form">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <MDBox mb={2} sx={{ m: 1 }}>
                      <MDInput
                        disable
                        type="text"
                        name="code"
                        label="Agregar Descripcion:"
                        value={operationType.code}
                        onChange={operationHandler}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <MDButton variant="gradient" color="info" onClick={submitTypeOperation}>
                        {operationType.id ? "Actualizar" : "Agregar"}
                      </MDButton>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={8} md={12} margin={5}>
            <MDBox pt={3}>
              <Typography sx={{ mt: 2 }} variant="h6" textTransform="uppercase" color="GrayText">
                Actualización de Tareas:
              </Typography>
              <TransferList tasksOP={operationType.tasks} onUpdateList={updateOperationType} />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      {renderSnackbar}
    </div>
  );
}

export default TypeOperation;
