import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { getTasks } from "services/taskHook";
import MDButton from "components/MDButton";
import MDTypography from "../../../components/MDTypography";
import useSnackbar from "../../../services/snackbarHook";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList({ tasksOP, onUpdateList }) {
  const { showSnackbar, renderSnackbar } = useSnackbar();
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  useEffect(async () => {
    const res = await getTasks();
    if (!res.ack) {
      showSnackbar({
        title: "Tareas",
        content: res.message,
        icon: res.ack ? "error" : "success",
      });
    } else {
      // Filtrar elementos que ya estan en el tipo de operacion
      const data = res.data.filter((item) => !tasksOP.includes(item.description));
      setLeft(data);
      setRight(tasksOP);
    }
  }, [tasksOP]);

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

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <Paper sx={{ width: 300, height: 400, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = value?.description
            ? `transfer-list-item-${value.description}-label`
            : `transfer-list-item-${value}-label-rigth`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value?.description ? value.description : value} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <div>
      <Grid container spacing={12} justifyContent="center" alignItems="center">
        <Grid item>
          <MDBox mb={2}>
            <MDTypography variant="h6" color="info" textTransform="uppercase">
              Lista de tareas:
            </MDTypography>
          </MDBox>
          {customList(left)}
        </Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 1 }}
              variant="outlined"
              size="large"
              onClick={handleAllRight}
              disabled={left.length === 0}
              aria-label="Mover todas a derecha"
            >
              <KeyboardDoubleArrowRightIcon color="success" />
            </Button>
            <Button
              sx={{ my: 1 }}
              variant="outlined"
              size="large"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="Mover seleccinada a derecha"
            >
              <KeyboardArrowRightIcon color="success" />
            </Button>
            <Button
              sx={{ my: 1 }}
              variant="outlined"
              size="large"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="Mover seleccionada a izquierda"
            >
              <KeyboardArrowLeftIcon color="success" />
            </Button>
            <Button
              sx={{ my: 1 }}
              variant="outlined"
              size="large"
              onClick={handleAllLeft}
              disabled={right.length === 0}
              aria-label="Mover todas a izquierda"
            >
              <KeyboardDoubleArrowLeftIcon color="success" />
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <MDBox mb={2}>
            <MDTypography variant="h6" color="info" textTransform="uppercase">
              Lista de tareas Operacion:
            </MDTypography>
          </MDBox>
          {customList(right)}
        </Grid>
        {renderSnackbar}
      </Grid>
      <MDButton variant="gradient" color="info" onClick={() => onUpdateList(right)}>
        Actualizar
      </MDButton>
    </div>
  );
}
