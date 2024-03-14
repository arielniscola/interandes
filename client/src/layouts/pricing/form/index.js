import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import moment from "moment";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import { createPricings, updatePricings } from "services/pricingHook";
// import table Items
import DataTable from "examples/Tables/DataTable";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { Grid, FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import ClientForm from "layouts/clients/form/form";

import Datepicker from "components/Datepicker";
import Icon from "@mui/material/Icon";
import MDInput from "../../../components/MDInput";
import MDButton from "../../../components/MDButton";
import MDTypography from "../../../components/MDTypography";
import useSnackbar from "../../../services/snackbarHook";
import { getPricingServices, getSeaPorts } from "../../../services/pricingHook";

function Pricing() {
  const [inputsHabilitados, setInputsHabilitados] = useState(false);
  const [seaPorts, setSeaPorts] = useState([]);
  const [clientId, setClientId] = useState("");
  const { showSnackbar, renderSnackbar } = useSnackbar();
  const { id } = useParams();
  const navigate = useNavigate();
  const [pricing, setPricing] = useState({
    companyname: "",
    language: "",
    effectiveDate: moment.utc(),
    revalidate: moment.utc(),
    observations: "",
    operationType: "",
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
    client_id: "",
    qty: 0,
    saleTerm: "",
    origin: "",
    customDestiny: "",
    finalDestiny: "",
    estimateTransitTime: "",
    transshipment: "",
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

  /** Buscar los puertos maritimos */
  useEffect(async () => {
    const res = await getSeaPorts();
    if (res.ack === 0) {
      setSeaPorts(res.data);
    }
  }, []);

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

  /** Realizar calculos de totales */
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

  useEffect(async () => {
    if (id) {
      const res = await getPricingServices(id);
      if (res.ack) {
        showSnackbar({
          title: "Pricing",
          content: res.message,
          color: res.ack ? "error" : "success",
          icon: res.ack ? "warning" : "check",
        });
      } else {
        setInputsHabilitados(true);
        // Separar items
        const costs = res.data.Details.filter((it) => it.typeItem === "cost");
        const sales = res.data.Details.filter((it) => it.typeItem === "sale");
        const taxs = res.data.Details.filter((it) => it.typeItem === "tax");
        setRowsCost(costs);
        setRowsSale(sales);
        setRowsTax(taxs);
        setClientId(res.data.client_id);
        res.data.revalidate = moment().utc(res.data.revalidate);
        res.data.effectiveDate = moment().utc(res.data.effectiveDate);
        setPricing(res.data);
      }
    }
  }, []);
  const deleteItem = (row) => {
    const resultTax = rowsTax.filter((i) => i.row !== row);
    const resultCost = rowsCost.filter((i) => i.row !== row);
    const resultSale = rowsSale.filter((i) => i.row !== row);

    setRowsCost(resultCost);
    setRowsSale(resultSale);
    setRowsTax(resultTax);

    totalCalculations();
  };

  /**  Agrear items al detalle */
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

  /** Enviar peticion de creacion/modificacion a la api */
  const submitHandlerPricing = async () => {
    const data = { pricing, details: [...rowsCost, ...rowsSale, ...rowsTax] };
    let res;
    if (id) {
      res = await updatePricings(data, id);
    } else {
      res = await createPricings(data);
    }
    showSnackbar({
      title: "Pricing",
      content: res.message,
      icon: res.ack ? "error" : "success",
    });
    if (!res.ack) {
      setTimeout(() => {
        navigate("/pricing");
      }, 1000);
    }
  };
  const handleChangeDate = (e) => {
    setPricing({ ...pricing, effectiveDate: e });
  };
  const handleChangeDateRevalidate = (e) => {
    setPricing({ ...pricing, revalidated: e });
  };

  /** Relacionar con cliente  */
  const handleClientSelect = (client) => {
    setPricing({ ...pricing, client_id: client.id });
  };

  /** Opciones de autocompletar puertos */
  const defaultOptions = {
    options: seaPorts.length > 0 ? seaPorts : [],
    getOptionLabel: (option) => `${option.portName}, ${option.country}`,
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ClientForm onClientSelect={handleClientSelect} id={clientId} />
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
          <MDBox pt={1}>
            <MDBox pt={3} pb={3} px={3}>
              <MDBox component="form" role="form">
                <Grid container spacing={1} marginBottom={-2} sx={{ m: 1 }}>
                  <Grid item xs={4}>
                    <MDBox mb={2}>
                      <FormControl fullWidth disabled={inputsHabilitados}>
                        <InputLabel id="demo-simple-select-helper-label">Compañia</InputLabel>
                        <Select
                          fullWidth
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select"
                          name="companyname"
                          label="Empresa"
                          input={<OutlinedInput label="Compañia" />}
                          value={pricing.companyname}
                          onChange={handleChangePricing}
                          style={{ height: 50, marginTop: 1 }}
                        >
                          <MenuItem value="">-</MenuItem>
                          <MenuItem value="Interandes">INTERANDES</MenuItem>
                          <MenuItem value="Transitarios Acuarios">TACSA</MenuItem>
                          <MenuItem value="Allin">ALLIN</MenuItem>
                        </Select>
                      </FormControl>
                    </MDBox>
                  </Grid>
                  <Grid item xs={4}>
                    <MDBox mb={2}>
                      <FormControl fullWidth disabled={inputsHabilitados}>
                        <InputLabel id="demo-simple-select-helper-label">Idioma</InputLabel>
                        <Select
                          fullWidth
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          label="Idioma"
                          name="language"
                          input={<OutlinedInput label="Idioma" />}
                          value={pricing.language}
                          onChange={handleChangePricing}
                          // disabled={inputsHabilitados}
                          style={{ height: 50, marginTop: 1 }}
                        >
                          <MenuItem value="español">Español</MenuItem>
                          <MenuItem value="ingles">Ingles</MenuItem>
                        </Select>
                      </FormControl>
                    </MDBox>
                  </Grid>
                  <Grid item xs={4}>
                    <MDBox mb={2}>
                      <FormControl fullWidth disabled={inputsHabilitados}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Tipo de Servicio
                        </InputLabel>
                        <Select
                          fullWidth
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          label="Tipo de Servicio"
                          name="operationType"
                          input={<OutlinedInput label="Tipo de Servico" />}
                          // disabled={inputsHabilitados}
                          value={pricing.operationType}
                          onChange={handleChangePricing}
                          style={{ height: 50, marginTop: 1 }}
                        >
                          <MenuItem value="">-</MenuItem>
                          <MenuItem value="E.1 - MARITIMO - FCL / LC">
                            {" "}
                            E.1 - MARITIMO - FCL / LCL
                          </MenuItem>
                          <MenuItem value="E.2 - TERRESTRE - FCL / LCL">
                            E.2 - TERRESTRE - FCL / LCL
                          </MenuItem>
                          <MenuItem value="E.3 - MULTIMODAL - FCL / LCL">
                            {" "}
                            E.3 - MULTIMODAL - FCL / LCL
                          </MenuItem>
                          <MenuItem value="E.4 - AEREO"> E.4 - AEREO</MenuItem>
                        </Select>
                      </FormControl>
                    </MDBox>
                  </Grid>
                </Grid>
                <Grid container spacing={2} marginBottom={-2} sx={{ m: 1 }}>
                  <Grid item xs={4}>
                    <MDBox mb={2}>
                      <InputLabel id="demo-simple-select-helper-label" style={{ marginBottom: 4 }}>
                        Fecha de Vigencia
                      </InputLabel>
                      <FormControl disabled={inputsHabilitados}>
                        <Datepicker value={pricing.effectiveDate} onChange={handleChangeDate} />
                      </FormControl>
                    </MDBox>
                  </Grid>
                  <Grid item xs={4}>
                    <MDBox mb={2}>
                      <InputLabel id="demo-simple-select-helper-label" style={{ marginBottom: 4 }}>
                        Revalidar
                      </InputLabel>
                      <Datepicker
                        value={pricing.revalidate}
                        // disabled={inputsHabilitados}
                        onChange={handleChangeDateRevalidate}
                      />
                    </MDBox>
                  </Grid>
                </Grid>
                <Grid container spacing={1} marginBottom={-2} sx={{ m: 1 }}>
                  <Grid item xs={3}>
                    <MDBox mb={2}>
                      <FormControl fullWidth>
                        <Autocomplete
                          {...defaultOptions}
                          freeSolo
                          id="origin-select"
                          name="origin"
                          multiple={false}
                          options={seaPorts}
                          style={{ height: 40 }}
                          renderInput={(params) => (
                            <TextField {...params} label="Origen" variant="outlined" />
                          )}
                          onChange={(value) => {
                            if (value) {
                              setPricing({
                                ...pricing,
                                origin: value.portName,
                              });
                            }
                          }}
                        />
                      </FormControl>
                    </MDBox>
                  </Grid>
                  <Grid item xs={3}>
                    <MDBox mb={2}>
                      <FormControl fullWidth>
                        <Autocomplete
                          {...defaultOptions}
                          freeSolo
                          id="finalDestiny-select"
                          name="finalDestiny"
                          multiple={false}
                          options={seaPorts}
                          style={{ height: 40 }}
                          renderInput={(params) => (
                            <TextField {...params} label="Destino Final" variant="outlined" />
                          )}
                          onChange={handleChangePricing}
                        />
                      </FormControl>
                    </MDBox>
                  </Grid>
                  <Grid item xs={3}>
                    <MDBox mb={2}>
                      <FormControl fullWidth>
                        <MDInput
                          type="text"
                          label="Aduana Destino"
                          value={pricing.customDestiny}
                          name="customDestiny"
                          variant="outlined"
                          fullWidth
                          onChange={handleChangePricing}
                        />
                      </FormControl>
                    </MDBox>
                  </Grid>
                  <Grid item xs={3}>
                    <MDBox mb={2}>
                      <FormControl fullWidth>
                        <MDInput
                          type="text"
                          label="Sale Term"
                          value={pricing.saleTerm}
                          name="saleTerm"
                          variant="outlined"
                          fullWidth
                          onChange={handleChangePricing}
                        />
                      </FormControl>
                    </MDBox>
                  </Grid>
                  <Grid item xs={3}>
                    <MDBox mb={2}>
                      <FormControl fullWidth disabled={inputsHabilitados}>
                        <InputLabel id="demo-simple-select-helper-label">Transbordo</InputLabel>
                        <Select
                          fullWidth
                          labelId="transbordo"
                          id="transshipment"
                          name="transshipment"
                          label="Transbordo"
                          input={<OutlinedInput label="Transbordo" />}
                          value={pricing.transshipment}
                          onChange={handleChangePricing}
                          style={{ height: 45 }}
                        >
                          <MenuItem value="">--</MenuItem>
                          <MenuItem value="NO">NO</MenuItem>
                          <MenuItem value="SI">SI</MenuItem>
                        </Select>
                      </FormControl>
                    </MDBox>
                  </Grid>
                  <Grid item xs={3}>
                    <MDBox mb={2}>
                      <FormControl fullWidth>
                        <MDInput
                          type="text"
                          label="Transit Time Estimado"
                          value={pricing.estimateTransitTime}
                          name="estimateTransitTime"
                          variant="outlined"
                          fullWidth
                          onChange={handleChangePricing}
                        />
                      </FormControl>
                    </MDBox>
                  </Grid>
                  <Grid item xs={3}>
                    <MDBox mb={2}>
                      <FormControl fullWidth>
                        <MDInput
                          type="number"
                          label="Cantidad"
                          value={pricing.qty}
                          name="qty"
                          variant="outlined"
                          fullWidth
                          onChange={handleChangePricing}
                        />
                      </FormControl>
                    </MDBox>
                  </Grid>
                </Grid>
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
            py={1}
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
          <MDBox pt={1}>
            <MDBox pt={1} pb={3} px={3}>
              <MDBox component="form" role="form">
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <MDBox mb={2}>
                      <FormControl fullWidth disabled={inputsHabilitados}>
                        <InputLabel id="demo-simple-select-helper-label" style={{ margin: 4 }}>
                          Moneda
                        </InputLabel>
                        <Select
                          fullWidth
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          name="currency"
                          input={<OutlinedInput label="Moneda" />}
                          onChange={itemHandler}
                          value={item.currency}
                          style={{ height: 45, marginTop: 7 }}
                        >
                          <MenuItem value="USD">DOLAR</MenuItem>
                          <MenuItem value="ARS">PESO ARGENTINO</MenuItem>
                          <MenuItem value="EU">EURO</MenuItem>
                        </Select>
                      </FormControl>
                    </MDBox>
                  </Grid>
                  <Grid item xs={1}>
                    <MDBox mb={2} ml={1}>
                      <FormControl fullWidth disabled={inputsHabilitados}>
                        <InputLabel id="demo-simple-select-helper-label" style={{ margin: 4 }}>
                          Tipo de Item
                        </InputLabel>
                        <Select
                          fullWidth
                          labelId="demo-simple-select-helper-label"
                          id="typeItem"
                          // disabled={inputsHabilitados}
                          name="typeItem"
                          variant="outlined"
                          input={<OutlinedInput label="Tipo de Item" />}
                          onChange={itemHandler}
                          value={item.typeItem}
                          style={{ height: 45, marginTop: 7 }}
                        >
                          <MenuItem value="cost">Costo</MenuItem>
                          <MenuItem value="sale">Venta</MenuItem>
                          <MenuItem value="tax">Impuesto</MenuItem>
                        </Select>
                      </FormControl>
                    </MDBox>
                  </Grid>
                  <Grid item xs={3}>
                    <MDBox mb={2} sx={{ m: 1 }}>
                      <FormControl fullWidth>
                        <MDInput
                          type="text"
                          name="item"
                          label="Item"
                          variant="outlined"
                          fullWidth
                          disabled={inputsHabilitados}
                          value={item.item}
                          onChange={itemHandler}
                          style={{ marginTop: 2 }}
                        />
                      </FormControl>
                    </MDBox>
                  </Grid>

                  {item.typeItem === "tax" && (
                    <Grid item xs={2}>
                      <MDBox mb={2} sx={{ m: 1 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-helper-label" style={{ margin: 4 }}>
                            Base
                          </InputLabel>
                          <Select
                            fullWidth
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            name="base"
                            // disabled={inputsHabilitados}
                            variant="outlined"
                            input={<OutlinedInput label="Base" />}
                            onChange={itemHandler}
                            value={item.base}
                            style={{ height: 45 }}
                          >
                            {rowsSale?.map((itemBase) => (
                              <MenuItem value={itemBase.price}>{itemBase.item}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </MDBox>
                    </Grid>
                  )}
                  {item.typeItem === "tax" && (
                    <Grid item xs={1}>
                      <MDBox mb={2} sx={{ m: 1 }}>
                        <FormControl fullWidth>
                          <MDInput
                            type="number"
                            name="percent"
                            label="Porcentaje"
                            variant="outlined"
                            fullWidth
                            //  disabled={inputsHabilitados}
                            value={item.percent}
                            onChange={itemHandler}
                            style={{ marginTop: 2 }}
                          />
                        </FormControl>
                      </MDBox>
                    </Grid>
                  )}
                  <Grid item xs={2}>
                    <MDBox mb={2} sx={{ m: 1 }}>
                      <FormControl>
                        <MDInput
                          type="number"
                          name="price"
                          variant="outlined"
                          label="Importe"
                          disabled={inputsHabilitados}
                          fullWidth
                          value={item.price}
                          onChange={itemHandler}
                          style={{ marginTop: 2 }}
                        />
                      </FormControl>
                    </MDBox>
                  </Grid>
                  {(item.typeItem === "sale" || item.typeItem === "cost") && (
                    <Grid item xs={1}>
                      <MDBox mb={2} sx={{ m: 1 }}>
                        <MDInput
                          type="number"
                          name="units"
                          variant="outlined"
                          label="Cantidad"
                          // disabled={inputsHabilitados}
                          fullWidth
                          value={item.units}
                          onChange={itemHandler}
                          style={{ marginTop: 2 }}
                        />
                      </MDBox>
                    </Grid>
                  )}
                  {(item.typeItem === "sale" || item.typeItem === "cost") && (
                    <Grid item xs={2}>
                      <MDBox mb={2} sx={{ m: 1 }}>
                        <MDInput
                          type="text"
                          name="unitType"
                          variant="outlined"
                          label="Criterio"
                          // disabled={inputsHabilitados}
                          fullWidth
                          value={item.unitType}
                          onChange={itemHandler}
                          style={{ marginTop: 2 }}
                        />
                      </MDBox>
                    </Grid>
                  )}
                  {(item.typeItem === "sale" || item.typeItem === "cost") && (
                    <Grid item xs={2}>
                      <MDBox mb={2} sx={{ m: 1 }}>
                        <FormControl fullWidth>
                          <MDInput
                            type="number"
                            name="subtotal"
                            variant="outlined"
                            label="Subtotal"
                            // disabled={inputsHabilitados}
                            fullWidth
                            value={item.subtotal}
                            onChange={itemHandler}
                            style={{ marginTop: 2 }}
                          />
                        </FormControl>
                      </MDBox>
                    </Grid>
                  )}
                </Grid>
                <MDBox mt={1} mb={1}>
                  <MDButton
                    variant="gradient"
                    color="info"
                    onClick={addItem}
                    disabled={inputsHabilitados}
                  >
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
                  <Grid item xs={4}>
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
                  <Grid item xs={4}>
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
                  <Grid item xs={4}>
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
                  <Grid item xs={6}>
                    <MDBox mb={1} ml={5} mr={5}>
                      <TextField
                        id="filled-multiline-static"
                        label="Observaciones"
                        multiline
                        value={pricing.observations}
                        name="observations"
                        onChange={handleChangePricing}
                        rows={4}
                        // disabled={inputsHabilitados}
                        variant="outlined"
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={6}>
                    <MDBox mb={1} ml={5} mr={5}>
                      <TextField
                        id="filled-multiline-static"
                        label="Condiciones"
                        multiline
                        name="conditions"
                        value={pricing.conditions}
                        rows={4}
                        // disabled={inputsHabilitados}
                        onChange={handleChangePricing}
                        variant="outlined"
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                </Grid>
                <MDBox mt={3} mb={1}>
                  <FormControl disabled={inputsHabilitados}>
                    <InputLabel id="hasHBL">Etapa de Cotización</InputLabel>
                    <Select
                      labelId="cotizacion"
                      value={pricing.stage}
                      name="stage"
                      id="stage-price"
                      label="Etapa Cotización"
                      input={<OutlinedInput label="Etapa de cotizacion" />}
                      onChange={handleChangePricing}
                      style={{ height: 50, marginTop: 4, width: 400 }}
                    >
                      <MenuItem value="">-</MenuItem>
                      <MenuItem value="COTIZADO">COTIZADO</MenuItem>
                      <MenuItem value="A COTIZAR">A COTIZAR</MenuItem>
                      <MenuItem value="APROBADO">APROBADO</MenuItem>
                      <MenuItem value="RECHAZADO">RECHAZADO</MenuItem>
                    </Select>
                  </FormControl>
                </MDBox>
                {!inputsHabilitados && (
                  <MDBox mt={4} mb={1}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      onClick={submitHandlerPricing}
                      disabled={inputsHabilitados}
                    >
                      Guardar
                    </MDButton>
                  </MDBox>
                )}
                {id && inputsHabilitados && (
                  <Box
                    sx={{
                      "& > :not(style)": { m: 1 },
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                    }}
                  >
                    <Fab color="info" aria-label="edit" onClick={() => setInputsHabilitados(false)}>
                      <EditIcon />
                    </Fab>
                  </Box>
                )}
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      {renderSnackbar}
      <Footer />
    </DashboardLayout>
  );
}

export default Pricing;
