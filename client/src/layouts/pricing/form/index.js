// import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import moment from "moment";

import { createPricings } from "services/pricingHook";
// @mui material components
// import table Items
import DataTable from "examples/Tables/DataTable";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import ClientForm from "layouts/clients/form/form";

import Datepicker from "components/Datepicker";
import Icon from "@mui/material/Icon";
import MDInput from "../../../components/MDInput";
import MDButton from "../../../components/MDButton";
import MDTypography from "../../../components/MDTypography";

// Material Dashboard 2 React example components

function Pricing() {
  const navigate = useNavigate();

  const [pricing, setPricing] = useState({
    companyname: "",
    language: "",
    effectiveDate: moment.utc(),
    revalidated: moment.utc(),
    observations: "",
    typeServices: "",
    conditions: "",
    stage: "",
    totalCost: 0,
    totalSale: 0,
    totalTax: 0,
    profit: 0,
    totalCostDol: 0,
    totalSaleDol: 0,
    totalTaxDol: 0,
    profitDol: 0,
    totalCostEu: 0,
    totalSaleEu: 0,
    totalTaxEu: 0,
    profitEu: 0,
    client: "",
  });
  const columnsCost = [
    { Header: "Moneda", accessor: "currency", align: "center" },
    { Header: "Item", accessor: "item", width: "45%", align: "left" },
    { Header: "Importe", accessor: "price", align: "center" },
    { Header: "Unidades", accessor: "units", align: "center" },
    { Header: "Criterio", accessor: "unitType", align: "center" },
    { Header: "Subtotal", accessor: "subtotal", align: "center" },
    { Header: "Acciones", accessor: "actions", align: "center" },
  ];

  const columnsSale = [
    { Header: "Moneda", accessor: "currency", align: "center" },
    { Header: "Item", accessor: "item", width: "45%", align: "left" },
    { Header: "Importe", accessor: "price", align: "center" },
    { Header: "Unidades", accessor: "units", align: "center" },
    { Header: "Criterio", accessor: "unitType", align: "center" },
    { Header: "Subtotal", accessor: "subtotal", align: "center" },
    { Header: "Acciones", accessor: "actions", align: "center" },
  ];
  const columnsTax = [
    { Header: "Moneda", accessor: "currency", align: "center" },
    { Header: "Item", accessor: "item", width: "35%", align: "left" },
    { Header: "Porcentaje", accessor: "percent", align: "center" },
    { Header: "Base", accessor: "base", align: "center" },
    { Header: "Importe", accessor: "price", align: "center" },
    { Header: "Acciones", accessor: "actions", align: "center" },
  ];
  const [rowsSale, setRowsSale] = useState([]);
  const [rowsCost, setRowsCost] = useState([]);
  const [rowsTax, setRowsTax] = useState([]);
  const [item, setItem] = useState({
    currency: "",
    item: "",
    typeItem: "",
    units: 1,
    base: 0,
    price: 0,
    percent: 0,
    subtotal: 0,
    unitType: "",
    actions: "",
    row: 1,
  });

  const handleChangePricing = (e) => {
    const { name, value } = e.target;
    switch (name) {
      default:
        setPricing({
          ...pricing,
          [name]: value,
        });
        break;
    }
  };

  const totalCalculations = () => {
    let totalCostEu = 0;
    let totalSaleEu = 0;
    let totalTaxEu = 0;
    let profitEu = 0;
    let totalCostDol = 0;
    let totalSaleDol = 0;
    let totalTaxDol = 0;
    let profitDol = 0;
    let totalCost = 0;
    let totalSale = 0;
    let totalTax = 0;
    let profit = 0;

    for (let i = 0; i < rowsCost.length; i += 1) {
      switch (rowsCost[i].currency) {
        case "USD":
          totalCostDol += rowsCost[i].subtotal;
          break;
        case "EU":
          totalCostEu += rowsCost[i].subtotal;
          break;
        case "ARS":
          totalCost += rowsCost[i].subtotal;
          break;
        default:
          break;
      }
    }
    for (let j = 0; j < rowsSale.length; j += 1) {
      switch (rowsSale[j].currency) {
        case "USD":
          totalSaleDol += rowsSale[j].subtotal;
          break;
        case "EU":
          totalSaleEu += rowsSale[j].subtotal;
          break;
        case "ARS":
          totalSale += rowsSale[j].subtotal;
          break;
        default:
          break;
      }
    }
    for (let n = 0; n < rowsTax.length; n += 1) {
      switch (rowsTax[n].currency) {
        case "USD":
          totalTaxDol += rowsTax[n].subtotal;
          break;
        case "EU":
          totalTaxEu += rowsTax[n].subtotal;
          break;
        case "ARS":
          totalTax += rowsTax[n].subtotal;
          break;
        default:
          break;
      }
    }
    profit = totalSale - totalCost - totalTax;
    profitDol = totalSaleDol - totalCostDol - totalTaxDol;
    profitEu = totalSaleEu - totalCostEu - totalTaxEu;
    setPricing({
      ...pricing,
      totalCost,
      totalSale,
      totalTax,
      profit,
      totalCostEu,
      totalSaleEu,
      totalTaxEu,
      profitEu,
      totalCostDol,
      totalSaleDol,
      totalTaxDol,
      profitDol,
    });
  };
  useEffect(() => {
    totalCalculations();
  }, [rowsSale, rowsTax, rowsCost]);

  const deleteItem = (row) => {
    const resultTax = rowsTax.filter((i) => i.row !== row);
    const resultCost = rowsCost.filter((i) => i.row !== row);
    const resultSale = rowsSale.filter((i) => i.row !== row);

    setRowsCost(resultCost);
    setRowsSale(resultSale);
    setRowsTax(resultTax);

    totalCalculations();
  };

  const addItem = () => {
    item.actions = (
      <MDBox mr={1}>
        <MDButton id={item.row} variant="text" onClick={() => deleteItem(item.row)} color="error">
          <Icon>delete</Icon>
        </MDButton>
      </MDBox>
    );

    if (item.typeItem === "cost") {
      setRowsCost([...rowsCost, item]);
    } else if (item.typeItem === "sale") {
      setRowsSale([...rowsSale, item]);
    } else {
      setRowsTax([...rowsTax, item]);
    }
    setItem({
      currency: "",
      item: "",
      typeItem: "",
      unitType: "",
      subtotal: 0,
      units: 0,
      base: 0,
      price: 0,
      percent: 0,
      actions: "",
      row: item.row + 1,
    });
  };

  const itemHandler = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "item":
        setItem({
          ...item,
          [name]: value,
        });
        break;
      case "price":
        setItem({
          ...item,
          [name]: parseFloat(value),
          subtotal: parseFloat(value) * item.units,
        });
        break;
      case "base":
        setItem({
          ...item,
          [name]: parseFloat(value),
        });
        break;
      case "percent":
        setItem({
          ...item,
          [name]: parseFloat(value),
          price: item.base * (parseFloat(value) / 100),
        });
        break;
      case "units":
        setItem({
          ...item,
          [name]: parseFloat(value),
          subtotal: parseFloat(value) * item.price,
        });
        break;
      default:
        setItem({
          ...item,
          [name]: value,
        });
        break;
    }
  };

  const submitHandlerPricing = async () => {
    const res = await createPricings(pricing);
    if (res) navigate("/pricing");
  };
  const handleChangeDate = (e) => {
    setPricing({ ...pricing, effectiveDate: e });
  };
  const handleChangeDateRevalidate = (e) => {
    setPricing({ ...pricing, revalidated: e });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ClientForm />
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox
            mx={2}
            mt={-3}
            py={2}
            px={1}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              Unidad de Negocio
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <InputLabel id="demo-simple-select-helper-label">Compañia</InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    name="companyname"
                    label="Empresa"
                    value={pricing.companyname}
                    onChange={handleChangePricing}
                    style={{ height: 40, marginTop: 5 }}
                  >
                    <MenuItem value="">-</MenuItem>
                    <MenuItem value="Interandes">INTERANDES</MenuItem>
                    <MenuItem value="Transitarios Acuarios">TACSA</MenuItem>
                    <MenuItem value="Allin">ALLIN</MenuItem>
                  </Select>
                </MDBox>
                <MDBox mb={2}>
                  <InputLabel id="demo-simple-select-helper-label">Idioma</InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Idioma"
                    name="language"
                    value={pricing.language}
                    onChange={handleChangePricing}
                    style={{ height: 40, marginTop: 5 }}
                  >
                    <MenuItem value="español">Español</MenuItem>
                    <MenuItem value="ingles">Ingles</MenuItem>
                  </Select>
                </MDBox>
                <MDBox mb={2}>
                  <InputLabel id="demo-simple-select-helper-label">Tipo de Servicio</InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Tipo de Servicio"
                    name="typeServices"
                    value={pricing.typeServices}
                    onChange={handleChangePricing}
                    style={{ height: 40, marginTop: 5 }}
                  >
                    <MenuItem value="">-</MenuItem>
                    <MenuItem value="E.1 - MARITIMO - FCL / LC">
                      {" "}
                      E.1 - MARITIMO - FCL / LCL
                    </MenuItem>
                    <MenuItem value="TERRESTRE - FCL / LCL"> E.2 - TERRESTRE - FCL / LCL</MenuItem>
                    <MenuItem value="E.3 - MULTIMODAL - FCL / LCL">
                      {" "}
                      E.3 - MULTIMODAL - FCL / LCL
                    </MenuItem>
                    <MenuItem value="E.4 - AEREO"> E.4 - AEREO</MenuItem>
                  </Select>
                </MDBox>
                <MDBox mb={2}>
                  <InputLabel id="demo-simple-select-helper-label" style={{ marginBottom: 4 }}>
                    Fecha de Vigencia
                  </InputLabel>
                  <Datepicker value={pricing.effectiveDate} onChange={handleChangeDate} />
                </MDBox>
                <MDBox mb={2}>
                  <InputLabel id="demo-simple-select-helper-label" style={{ marginBottom: 4 }}>
                    Revalidar
                  </InputLabel>
                  <Datepicker value={pricing.revalidated} onChange={handleChangeDateRevalidate} />
                </MDBox>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      {/* Form para agregar items */}
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox
            mx={2}
            mt={-3}
            py={2}
            px={1}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              Items
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <Grid container spacing={2}>
                  <Grid xs={1}>
                    <MDBox mb={2}>
                      <InputLabel
                        id="demo-simple-select-helper-label"
                        style={{ marginBottom: 4, marginLeft: 4 }}
                      >
                        Moneda
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        name="currency"
                        onChange={itemHandler}
                        value={item.currency}
                        style={{ height: 40, marginTop: 8 }}
                      >
                        <MenuItem value="USD">DOLAR</MenuItem>
                        <MenuItem value="ARS">PESO ARGENTINO</MenuItem>
                        <MenuItem value="EU">EURO</MenuItem>
                      </Select>
                    </MDBox>
                  </Grid>
                  <Grid xs={1}>
                    <MDBox mb={2}>
                      <InputLabel
                        id="demo-simple-select-helper-label"
                        style={{ marginBottom: 4, marginLeft: 4 }}
                      >
                        Tipo de Item
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-helper-label"
                        id="typeItem"
                        name="typeItem"
                        variant="outlined"
                        onChange={itemHandler}
                        value={item.typeItem}
                        style={{ height: 40, marginTop: 8, marginLeft: 5 }}
                      >
                        <MenuItem value="cost">Costo</MenuItem>
                        <MenuItem value="sale">Venta</MenuItem>
                        <MenuItem value="tax">Impuesto</MenuItem>
                      </Select>
                    </MDBox>
                  </Grid>
                  <Grid xs={3}>
                    <MDBox mb={2} sx={{ m: 1 }}>
                      <InputLabel id="demo-simple-select-helper-label">Item</InputLabel>
                      <MDInput
                        type="text"
                        name="item"
                        variant="outlined"
                        fullWidth
                        value={item.item}
                        onChange={itemHandler}
                        style={{ marginTop: 2 }}
                      />
                    </MDBox>
                  </Grid>

                  {item.typeItem === "tax" && (
                    <Grid xs={2}>
                      <MDBox mb={2} sx={{ m: 1 }}>
                        <InputLabel id="demo-simple-select-helper-label">Base</InputLabel>
                        <Select
                          fullWidth
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          name="base"
                          variant="outlined"
                          onChange={itemHandler}
                          value={item.base}
                          style={{ height: 40, marginTop: 2 }}
                        >
                          {rowsSale?.map((itemBase) => (
                            <MenuItem value={itemBase.price}>{itemBase.item}</MenuItem>
                          ))}
                        </Select>
                      </MDBox>
                    </Grid>
                  )}
                  {item.typeItem === "tax" && (
                    <Grid xs={1}>
                      <MDBox mb={2} sx={{ m: 1 }}>
                        <InputLabel id="demo-simple-select-helper-label">Porcentaje</InputLabel>
                        <MDInput
                          type="number"
                          name="percent"
                          variant="outlined"
                          fullWidth
                          value={item.percent}
                          onChange={itemHandler}
                          style={{ marginTop: 2 }}
                        />
                      </MDBox>
                    </Grid>
                  )}
                  <Grid xs={2}>
                    <MDBox mb={2} sx={{ m: 1 }}>
                      <InputLabel id="demo-simple-select-helper-label">Importe</InputLabel>
                      <MDInput
                        type="number"
                        name="price"
                        variant="outlined"
                        fullWidth
                        value={item.price}
                        onChange={itemHandler}
                        style={{ marginTop: 2 }}
                      />
                    </MDBox>
                  </Grid>
                  {(item.typeItem === "sale" || item.typeItem === "cost") && (
                    <Grid xs={1}>
                      <MDBox mb={2} sx={{ m: 1 }}>
                        <InputLabel id="demo-simple-select-helper-label">Cantidad</InputLabel>
                        <MDInput
                          type="number"
                          name="units"
                          variant="outlined"
                          fullWidth
                          value={item.units}
                          onChange={itemHandler}
                          style={{ marginTop: 2 }}
                        />
                      </MDBox>
                    </Grid>
                  )}
                  {(item.typeItem === "sale" || item.typeItem === "cost") && (
                    <Grid xs={2}>
                      <MDBox mb={2} sx={{ m: 1 }}>
                        <InputLabel id="demo-simple-select-helper-label">Criterio</InputLabel>
                        <MDInput
                          type="text"
                          name="unitType"
                          variant="outlined"
                          fullWidth
                          value={item.unitType}
                          onChange={itemHandler}
                          style={{ marginTop: 2 }}
                        />
                      </MDBox>
                    </Grid>
                  )}
                  {(item.typeItem === "sale" || item.typeItem === "cost") && (
                    <Grid xs={2}>
                      <MDBox mb={2} sx={{ m: 1 }}>
                        <InputLabel id="demo-simple-select-helper-label">Subtotal</InputLabel>
                        <MDInput
                          type="number"
                          name="subtotal"
                          variant="outlined"
                          fullWidth
                          value={item.subtotal}
                          onChange={itemHandler}
                          style={{ marginTop: 2 }}
                        />
                      </MDBox>
                    </Grid>
                  )}
                </Grid>
                <MDBox mt={1} mb={1}>
                  <MDButton variant="gradient" color="info" onClick={addItem}>
                    Agregar
                  </MDButton>
                </MDBox>
                {/* Tabla de detalles */}
                {rowsSale.length !== 0 && (
                  <MDBox>
                    <MDTypography variant="h6" color="dark">
                      Venta
                    </MDTypography>
                    <DataTable
                      table={{ columns: columnsSale, rows: rowsSale }}
                      isSorted={false}
                      canSearch={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                    />
                  </MDBox>
                )}
                {rowsCost?.length !== 0 && (
                  <MDBox>
                    <MDTypography variant="h6" color="dark">
                      Costo
                    </MDTypography>
                    <DataTable
                      table={{ columns: columnsCost, rows: rowsCost }}
                      isSorted={false}
                      canSearch={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                      noEndBorder={false}
                    />
                  </MDBox>
                )}
                {rowsTax.length !== 0 && (
                  <MDBox>
                    <MDTypography variant="h6" color="dark">
                      Impuestos
                    </MDTypography>
                    <DataTable
                      table={{ columns: columnsTax, rows: rowsTax }}
                      isSorted={false}
                      canSearch={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                    />
                  </MDBox>
                )}
              </MDBox>
            </MDBox>
          </MDBox>
          {/* totales */}
          <MDBox pt={3}>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <Grid container spacing={2}>
                  <Grid xs={4}>
                    <MDBox mb={1} ml={5} mr={5}>
                      <TextField
                        id="filled-multiline-static"
                        label="Total Venta"
                        name="totalSale"
                        value={pricing.totalSale}
                        variant="outlined"
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={1} ml={5} mr={5}>
                      <TextField
                        id="filled-multiline-static"
                        label="Total costo"
                        name="totalCost"
                        value={pricing.totalCost}
                        variant="outlined"
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={1} ml={5} mr={5}>
                      <TextField
                        id="filled-multiline-static"
                        label="Total impuestos"
                        name="totalTax"
                        value={pricing.totalTax}
                        variant="outlined"
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={1} ml={5} mr={5}>
                      <TextField
                        id="filled-multiline-static"
                        label="Profit"
                        value={pricing.profit}
                        variant="outlined"
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid xs={4}>
                    <MDBox mb={1} ml={5} mr={5}>
                      <TextField
                        id="filled-multiline-static"
                        label="Total Venta USD"
                        name="totalSale"
                        value={pricing.totalSaleDol}
                        variant="outlined"
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={1} ml={5} mr={5}>
                      <TextField
                        id="filled-multiline-static"
                        label="Total costo USD"
                        name="totalCost"
                        value={pricing.totalCostDol}
                        variant="outlined"
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={1} ml={5} mr={5}>
                      <TextField
                        id="filled-multiline-static"
                        label="Total impuestos USD"
                        name="totalTax"
                        value={pricing.totalTaxDol}
                        variant="outlined"
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={1} ml={5} mr={5}>
                      <TextField
                        id="filled-multiline-static"
                        label="Profit USD"
                        value={pricing.profitDol}
                        variant="outlined"
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid xs={4}>
                    <MDBox mb={1} ml={5} mr={5}>
                      <TextField
                        id="filled-multiline-static"
                        label="Total Venta EU"
                        name="totalSale"
                        value={pricing.totalSaleEu}
                        variant="outlined"
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={1} ml={5} mr={5}>
                      <TextField
                        id="filled-multiline-static"
                        label="Total costo EU"
                        name="totalCost"
                        value={pricing.totalCostEu}
                        variant="outlined"
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={1} ml={5} mr={5}>
                      <TextField
                        id="filled-multiline-static"
                        label="Total impuestos EU"
                        name="totalTax"
                        value={pricing.totalTaxEu}
                        variant="outlined"
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={1} ml={5} mr={5}>
                      <TextField
                        id="filled-multiline-static"
                        label="Profit Eu"
                        value={pricing.profitEu}
                        variant="outlined"
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            </MDBox>
          </MDBox>
          {/* campos observacion, condi, boton de envio */}
          <MDBox pt={3}>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <Grid container spacing={2}>
                  <Grid xs={6}>
                    <MDBox mb={1} ml={5} mr={5}>
                      <TextField
                        id="filled-multiline-static"
                        label="Observaciones"
                        multiline
                        value={pricing.observations}
                        name="observations"
                        onChange={handleChangePricing}
                        rows={4}
                        variant="outlined"
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid xs={6}>
                    <MDBox mb={1} ml={5} mr={5}>
                      <TextField
                        id="filled-multiline-static"
                        label="Condiciones"
                        multiline
                        name="conditions"
                        value={pricing.conditions}
                        rows={4}
                        onChange={handleChangePricing}
                        variant="outlined"
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                </Grid>
                <MDBox mt={3} mb={1}>
                  <InputLabel id="demo-simple-select-helper-label">Etapa Cotización</InputLabel>
                  <Select
                    labelId="stage-price"
                    value={pricing.stage}
                    name="stage"
                    id="stage-price"
                    label="Etapa Cotización"
                    onChange={handleChangePricing}
                    style={{ height: 40, marginTop: 8, width: 300 }}
                  >
                    <MenuItem value="">-</MenuItem>
                    <MenuItem value="COTIZADO">COTIZADO</MenuItem>
                    <MenuItem value="A COTIZAR">A COTIZAR</MenuItem>
                    <MenuItem value="APROBADO">APROBADO</MenuItem>
                    <MenuItem value="RECHAZADO">RECHAZADO</MenuItem>
                  </Select>
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton variant="gradient" color="info" onClick={submitHandlerPricing}>
                    Guardar
                  </MDButton>
                </MDBox>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      <Toaster />
      <Footer />
    </DashboardLayout>
  );
}

export default Pricing;
