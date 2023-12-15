// import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { getClients } from "services/clientHook";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Box from "@mui/material/Box";
import moment from "moment";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import OutlinedInput from "@mui/material/OutlinedInput";
import { FormControl, Grid } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Divider from "@mui/material/Divider";
import Datepicker from "components/Datepicker";
import Icon from "@mui/material/Icon";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import ConsigneeForm from "layouts/consignee/form";
import { getsalesOrder, createSalesOrders } from "services/salesOrderHook";
import { getPricingServices } from "services/pricingHook";
import MDInput from "../../../components/MDInput";
import MDTypography from "../../../components/MDTypography";
import MDButton from "../../../components/MDButton";
import DataTable from "../../../examples/Tables/DataTable";
import useSnackbar from "../../../services/snackbarHook";

function SalesOrder() {
  const location = useLocation();
  const [inputsHabilitados, setInputsHabilitados] = useState(false);
  const consigneeRef = useRef();
  const notifyRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();
  const { showSnackbar, renderSnackbar } = useSnackbar();
  const [clients, setClients] = useState([]);
  const [pricing, setPricing] = useState({});
  const [saleOrder, setSaleOrder] = useState({
    merchandise: "",
    originOfCharge: "",
    finalDestination: "",
    chargeLocation: "",
    chargeDate: moment(),
    dischargeDate: moment(),
    invoicePO: "",
    customsBroker: "",
    transportation: "",
    shippingLine: "",
    booking: "",
    vessel: "",
    voyage: "",
    flag: "",
    physicalCutOffDate: moment(),
    documentaryCutOffDate: moment(),
    transshipment: "",
    maritimeATA: "",
    blcrtGuiNumber: "",
    loadingPortDepartureDate: moment(),
    dischargePortArrivalDate: moment(),
    landedATA: "",
    hasHBL: "",
    hblNumber: "",
    containerStruk: 0,
    chargeLCL: false,
    unity: "",
    weigth: 0,
    volumen: 0,
    poRef: "",
    brand: "",
    operation_id: "",
    client_id: "",
  });
  const [containers, setContainers] = useState([]);

  useEffect(async () => {
    if (location.state && location.state.pricingId) {
      const res = await getPricingServices(location.state.pricingId);

      setPricing(res.data);
    }
  }, []);

  useEffect(async () => {
    const res = await getClients();
    setClients(res);
  }, []);

  useEffect(async () => {
    if (id) {
      const res = await getsalesOrder(id);
      if (res.ack) {
        showSnackbar({
          title: "Orden de Venta",
          content: res.message,
          color: res.ack ? "error" : "success",
          icon: res.ack ? "warning" : "check",
        });
      } else {
        res.data.chargeDate = moment().utc(res.data.chargeDate);
        res.data.dischargeDate = moment().utc(res.data.dischargeDate);
        res.data.physicalCutOffDate = moment().utc(res.data.physicalCutOffDate);
        res.data.documentaryCutOffDate = moment().utc(res.data.documentaryCutOffDate);
        res.data.loadingPortDepartureDate = moment().utc(res.data.loadingPortDepartureDate);
        res.data.dischargePortArrivalDate = moment().utc(res.data.dischargePortArrivalDate);
        setSaleOrder(res.data);
        setContainers(res.data.Containers);
      }
    }
  }, []);

  const [client, setClient] = useState({
    _id: "",
    taxID: "",
    companyname: "",
    direction: "",
    contactperson: "",
    mailaddress: "",
    phonenumber: "",
    category: "",
  });
  const defaultOptions = {
    options: clients.length > 0 ? clients : [],
    getOptionLabel: (option) => option.companyname,
  };

  const [container, setContainer] = useState({
    containerNumber: "",
    ptoLinea: "",
    ptoAduana: "",
    otherSeals: "",
    poRef: "",
    driver: "",
    dni: "",
    truckPlate: "",
    semiPlate: "",
    containerType: "",
    hasTemp: false,
    temperature: "",
    ventilation: "",
    humidity: "",
    actions: "",
  });

  const handleChangeSaleOrder = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "chargeLCL":
        setSaleOrder({
          ...saleOrder,
          [name]: !saleOrder.chargeLCL,
        });
        break;
      default:
        setSaleOrder({
          ...saleOrder,
          [name]: value,
        });
        break;
    }
  };

  const submitHandlerSaleOrder = async () => {
    // Crear OV, contenedores, consignee
    const consignees = [consigneeRef.current, notifyRef.current];
    const data = { saleOrder, containers, client, consignees };
    data.saleOrder.operation_id = pricing.operation_id;
    const res = await createSalesOrders(data);
    if (res.ack) {
      showSnackbar({
        title: "Orden de Venta",
        content: res.message,
        color: "error",
        icon: "warning",
      });
    } else {
      showSnackbar({
        title: "Orden de Venta",
        content: res.message,
        color: "success",
        icon: "check",
      });
      setTimeout(() => {
        navigate("/sales-order");
      }, 1000);
    }
  };
  const handleChangeDate = (field, date) => {
    setSaleOrder({ ...saleOrder, [field]: date });
  };
  // Cambio en contenerdors
  const handleChangeContainer = (e) => {
    const { name, value } = e.target;
    switch (name) {
      default:
        setContainer({
          ...container,
          [name]: value,
        });
        break;
    }
  };
  // Eliminar contenedor
  const deleteContainer = (row) => {
    const result = containers.filter((i) => i.containerNumber !== row);
    setContainers(result);
  };
  // Agregar contenedor
  const addContainer = () => {
    container.actions = (
      <MDBox mr={1}>
        <MDButton
          id={container.containerNumber}
          variant="text"
          onClick={() => deleteContainer(container.containerNumber)}
          color="error"
        >
          <Icon>delete</Icon>
        </MDButton>
      </MDBox>
    );
    setContainers([...containers, container]);
    setContainer({
      containerNumber: "",
      ptoLinea: "",
      ptoAduana: "",
      otherSeals: "",
      poRef: "",
      driver: "",
      dni: "",
      truckPlate: "",
      semiPlate: "",
      containerType: "",
      hasTemp: "",
      temperature: "",
      ventilation: "",
      humidity: "",
      actions: "",
    });
  };

  // Relaciono cliente
  const onClientSelect = (clientSelected) => {
    setSaleOrder({ ...saleOrder, client: clientSelected.id });
  };
  // Borrar form de container
  const deleteFormContainer = () => {
    setContainer({
      containerNumber: "",
      ptoLinea: "",
      ptoAduana: "",
      otherSeals: "",
      poRef: "",
      driver: "",
      dni: "",
      truckPlate: "",
      semiPlate: "",
      containerType: "",
      hasTemp: false,
      temperature: "",
      ventilation: "",
      humidity: "",
    });
  };
  const columns = [
    { Header: "N°", accessor: "containerNumber", align: "center" },
    { Header: "PTO Linea", accessor: "ptoLinea", align: "center" },
    { Header: "PTO Aduana", accessor: "ptoAduana", align: "center" },
    { Header: "Otros Sellos", accessor: "otherSeals", align: "center" },
    { Header: "PO/REF", accessor: "poRef", align: "center" },
    { Header: "Conductor", accessor: "driver", align: "center" },
    { Header: "DNI", accessor: "dni", align: "center" },
    { Header: "Patente Tractor", accessor: "truckPlate", align: "center" },
    { Header: "Patente Semi", accessor: "semiPlate", align: "center" },
    { Header: "Tipo Contenedor", accessor: "containerType", align: "center" },
    { Header: "Temperatura", accessor: "temperature", align: "center" },
    { Header: "Humedad", accessor: "humidity", align: "center" },
    { Header: "Ventilacion", accessor: "ventilation", align: "center" },
    { Header: "Opciones", accessor: "actions", align: "center" },
  ];
  return (
    <DashboardLayout>
      <DashboardNavbar />
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
              Orden de Venta
            </MDTypography>
          </MDBox>
          <Grid container spacing={2} marginBottom={-2} sx={{ m: 1 }}>
            <Grid item xs={4}>
              <MDBox mb={1} sx={{ mt: 3 }}>
                <Autocomplete
                  {...defaultOptions}
                  id="client-select"
                  multiple={false}
                  style={{ width: 300, marginBottom: 8, marginTop: -20 }}
                  options={clients}
                  renderInput={(params) => (
                    <TextField {...params} label="Buscar cliente" variant="outlined" />
                  )}
                  onChange={(event, newValue) => {
                    if (!newValue) {
                      setClient({
                        taxID: "",
                        companyname: "",
                        direction: "",
                        contactperson: "",
                        mailaddress: "",
                        phonenumber: "",
                        category: "",
                      });
                    } else {
                      setClient(newValue);
                      onClientSelect(newValue);
                    }
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={4}>
              <MDBox mb={1} sx={{ m: 1 }}>
                <MDInput
                  disable
                  type="text"
                  name="clientName"
                  label="Contacto"
                  value={client.contactperson}
                  fullWidth
                />
              </MDBox>
            </Grid>
          </Grid>
          <Grid container spacing={2} marginBottom={-2} sx={{ m: 1 }}>
            <Grid item xs={5}>
              <ConsigneeForm title="Consignee" isNotify={false} stateRef={consigneeRef} />
            </Grid>
            <Grid item xs={5}>
              <ConsigneeForm title="Notify" isNotify stateRef={notifyRef} />
            </Grid>
          </Grid>
          <MDBox pt={3}>
            <MDBox component="form" role="form">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <MDBox mb={2} sx={{ m: 2 }}>
                    <MDInput
                      disable
                      type="text"
                      name="merchandise"
                      label="Mercaderia"
                      value={saleOrder.merchandise}
                      onChange={handleChangeSaleOrder}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2} sx={{ m: 2 }}>
                    <MDInput
                      type="text"
                      name="originOfCharge"
                      label="Origen de la Carga"
                      value={saleOrder.originOfCharge}
                      onChange={handleChangeSaleOrder}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2} sx={{ m: 2 }}>
                    <MDInput
                      type="text"
                      name="finalDestination"
                      label="Destino final"
                      value={saleOrder.finalDestination}
                      onChange={handleChangeSaleOrder}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2} sx={{ m: 2 }}>
                    <MDInput
                      type="text"
                      name="chargeLocation"
                      label="Lugar de la carga"
                      value={saleOrder.chargeLocation}
                      onChange={handleChangeSaleOrder}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2} sx={{ m: 2 }}>
                    <MDInput
                      type="text"
                      name="invoicePO"
                      label="Factura/PO"
                      value={saleOrder.invoicePO}
                      onChange={handleChangeSaleOrder}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2} sx={{ m: 2 }}>
                    <MDInput
                      type="text"
                      name="customsBroker"
                      label="Despachante"
                      value={saleOrder.customsBroker}
                      onChange={handleChangeSaleOrder}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2} sx={{ m: 2 }}>
                    <MDInput
                      type="text"
                      name="transportation"
                      label="Transporte"
                      value={saleOrder.transportation}
                      onChange={handleChangeSaleOrder}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2} sx={{ m: 2 }}>
                    <MDInput
                      type="text"
                      name="shippingLine"
                      label="Naviera"
                      value={saleOrder.shippingLine}
                      onChange={handleChangeSaleOrder}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2} sx={{ m: 2 }}>
                    <MDInput
                      type="text"
                      name="booking"
                      label="Booking"
                      value={saleOrder.booking}
                      onChange={handleChangeSaleOrder}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2} sx={{ m: 2 }}>
                    <MDInput
                      type="text"
                      name="vessel"
                      label="Motonave"
                      value={saleOrder.vessel}
                      onChange={handleChangeSaleOrder}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2} sx={{ m: 2 }}>
                    <MDInput
                      type="text"
                      name="voyage"
                      label="Viaje"
                      value={saleOrder.voyage}
                      onChange={handleChangeSaleOrder}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2} sx={{ m: 2 }}>
                    <MDInput
                      type="text"
                      name="flag"
                      label="Bandera"
                      value={saleOrder.flag}
                      onChange={handleChangeSaleOrder}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2} sx={{ m: 2 }}>
                    <MDInput
                      type="text"
                      name="transshipment"
                      label="Transbordo"
                      value={saleOrder.transshipment}
                      onChange={handleChangeSaleOrder}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mt={3} mb={1} sx={{ m: 2 }}>
                    <FormControl sx={{ minWidth: 300 }}>
                      <InputLabel id="hasHBL">Posee HBL</InputLabel>
                      <Select
                        labelId="hasHBL"
                        value={saleOrder.hasHBL}
                        name="hasHBL"
                        id="hasHBL"
                        label="Posee HBL"
                        input={<OutlinedInput label="Posee HBL" />}
                        onChange={handleChangeSaleOrder}
                        style={{ height: 42, marginTop: 8, width: 300 }}
                      >
                        <MenuItem value="SI">SI</MenuItem>
                        <MenuItem value="NO">NO</MenuItem>
                      </Select>
                    </FormControl>
                  </MDBox>
                  {saleOrder.hasHBL === "SI" && (
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <MDInput
                        type="text"
                        name="hblNumber"
                        label="Numero HBL"
                        value={saleOrder.hblNumber}
                        onChange={handleChangeSaleOrder}
                        fullWidth
                      />
                    </MDBox>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={2} marginBottom={-2} sx={{ m: 1 }}>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <InputLabel id="demo-simple-select-helper-label" style={{ marginBottom: 4 }}>
                        Fecha de Carga
                      </InputLabel>
                      <Datepicker
                        value={saleOrder.chargeDate}
                        onChange={(selectedDate) => handleChangeDate("chargeDate", selectedDate)}
                      />
                    </MDBox>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <InputLabel id="demo-simple-select-helper-label" style={{ marginBottom: 4 }}>
                        Fecha de descarga
                      </InputLabel>
                      <Datepicker
                        value={saleOrder.dischargeDate}
                        onChange={(selectedDate) => handleChangeDate("dischargeDate", selectedDate)}
                      />
                    </MDBox>
                  </Grid>
                  <MDBox mb={2} sx={{ m: 2 }}>
                    <MDInput
                      type="text"
                      name="maritimeATA"
                      label="ATA Maritimo"
                      value={saleOrder.maritimeATA}
                      onChange={handleChangeSaleOrder}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2} sx={{ m: 2 }}>
                    <MDInput
                      type="text"
                      name="blcrtGuiNumber"
                      label="Numero BL/CRT/GUIA"
                      value={saleOrder.blcrtGuiNumber}
                      onChange={handleChangeSaleOrder}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2} sx={{ m: 2 }}>
                    <MDInput
                      type="text"
                      name="landedATA"
                      label="ATA Terrestre"
                      value={saleOrder.landedATA}
                      onChange={handleChangeSaleOrder}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2} sx={{ m: 2 }}>
                    <MDInput
                      type="number"
                      name="containerStruk"
                      label="Contonedores/Camiones"
                      value={saleOrder.containerStruk}
                      onChange={handleChangeSaleOrder}
                      fullWidth
                    />
                  </MDBox>
                  <Grid container spacing={2} marginBottom={-2} sx={{ m: 1 }}>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <InputLabel id="demo-simple-select-helper-label" style={{ marginBottom: 4 }}>
                        Fecha de zarpe
                      </InputLabel>
                      <Datepicker
                        value={saleOrder.loadingPortDepartureDate}
                        onChange={(selectedDate) =>
                          handleChangeDate("loadingPortDepartureDate", selectedDate)
                        }
                      />
                    </MDBox>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <InputLabel id="demo-simple-select-helper-label" style={{ marginBottom: 4 }}>
                        Fecha arribo Destino
                      </InputLabel>
                      <Datepicker
                        value={saleOrder.dischargePortArrivalDate}
                        onChange={(selectedDate) =>
                          handleChangeDate("dischargePortArrivalDate", selectedDate)
                        }
                      />
                    </MDBox>
                  </Grid>
                  <Grid container spacing={2} marginBottom={-2} sx={{ m: 1 }}>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <InputLabel id="demo-simple-select-helper-label" style={{ marginBottom: 4 }}>
                        Cut Off Fisico
                      </InputLabel>
                      <Datepicker
                        value={saleOrder.physicalCutOffDate}
                        onChange={(selectedDate) =>
                          handleChangeDate("physicalCutOffDate", selectedDate)
                        }
                      />
                    </MDBox>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <InputLabel id="demo-simple-select-helper-label" style={{ marginBottom: 4 }}>
                        Cut Off Documental
                      </InputLabel>
                      <Datepicker
                        value={saleOrder.documentaryCutOffDate}
                        onChange={(selectedDate) =>
                          handleChangeDate("documentaryCutOffDate", selectedDate)
                        }
                      />
                    </MDBox>
                  </Grid>
                  <MDBox mb={2} sx={{ m: 2 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="chargeLCL"
                          checked={saleOrder.chargeLCL}
                          onChange={handleChangeSaleOrder}
                        />
                      }
                      label="Carga LCL"
                      name="chargeLCL"
                    />
                  </MDBox>
                  {saleOrder.chargeLCL && (
                    <Card style={{ borderRadius: 8, border: "2px solid #1a73e8", padding: 8 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <MDInput
                            type="text"
                            name="unity"
                            label="Mercaderia/Cantidad"
                            value={saleOrder.unity}
                            onChange={handleChangeSaleOrder}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <MDInput
                            type="number"
                            name="weigth"
                            label="Peso KG"
                            value={saleOrder.weigth}
                            onChange={handleChangeSaleOrder}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <MDInput
                            type="text"
                            name="volumen"
                            label="Volumen"
                            value={saleOrder.volumen}
                            onChange={handleChangeSaleOrder}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={2.5}>
                          <MDInput
                            type="text"
                            name="brand"
                            label="Marcas/Sellos"
                            value={saleOrder.brand}
                            onChange={handleChangeSaleOrder}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={2.5}>
                          <MDInput
                            type="text"
                            name="poRef"
                            label="PO/REF"
                            value={saleOrder.poRef}
                            onChange={handleChangeSaleOrder}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </Card>
                  )}
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      {saleOrder.containerStruk > 0 && (
        <MDBox pt={6} pb={3}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={1}
              px={1}
              variant="gradient"
              bgColor="error"
              borderRadius="lg"
              coloredShadow="error"
            >
              <MDTypography variant="h6" color="white">
                Camiones/Contenerdores - Faltan agregar{" "}
                {saleOrder.containerStruk - containers.length}
              </MDTypography>
            </MDBox>
            <MDBox pt={3} style={{ margin: 7 }}>
              <MDBox component="form" role="form">
                <Grid container spacing={1}>
                  <Grid item xs={1.5}>
                    <MDInput
                      type="text"
                      name="containerNumber"
                      label="Numero"
                      value={container.containerNumber}
                      onChange={handleChangeContainer}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={1.5}>
                    <MDInput
                      type="text"
                      name="ptoLinea"
                      label="PTO Linea"
                      value={container.ptoLinea}
                      onChange={handleChangeContainer}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={1.5}>
                    <MDInput
                      type="text"
                      name="ptoAduana"
                      label="PTO Aduana"
                      value={container.ptoAduana}
                      onChange={handleChangeContainer}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={1.5}>
                    <MDInput
                      type="text"
                      name="otherSeals"
                      label="Otros Sellos"
                      value={container.otherSeals}
                      onChange={handleChangeContainer}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={1.5}>
                    <MDInput
                      type="text"
                      name="poRef"
                      label="PO/REF"
                      value={container.poRef}
                      onChange={handleChangeContainer}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={1.5}>
                    <MDInput
                      type="text"
                      name="driver"
                      label="Conductor"
                      value={container.driver}
                      onChange={handleChangeContainer}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={1.5}>
                    <MDInput
                      type="text"
                      name="dni"
                      label="DNI"
                      value={container.dni}
                      onChange={handleChangeContainer}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={1.5}>
                    <MDInput
                      type="text"
                      name="truckPlate"
                      label="Patente tractor"
                      value={container.truckPlate}
                      onChange={handleChangeContainer}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={1.5}>
                    <MDInput
                      type="text"
                      name="semiPlate"
                      label="Patente semi"
                      value={container.semiPlate}
                      onChange={handleChangeContainer}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={1.5}>
                    <MDInput
                      type="text"
                      name="containerType"
                      label="Tipo Contenedor"
                      value={container.containerType}
                      onChange={handleChangeContainer}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={1.5}>
                    <FormControl sx={{ minWidth: 160 }}>
                      <InputLabel id="demo-simple-select-label">Tiene Temperatura</InputLabel>
                      <Select
                        id="demo-simple-select-label"
                        name="hasTemp"
                        value={container.hasTemp}
                        onChange={handleChangeContainer}
                        input={<OutlinedInput label="Tiene Temperatura" />}
                        style={{ minHeight: "43px" }}
                      >
                        <MenuItem value>SI</MenuItem>
                        <MenuItem value={false}>NO</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {container.hasTemp && (
                    <Grid item xs={1.5}>
                      <MDInput
                        type="text"
                        name="temperature"
                        label="Temperatura °"
                        value={container.temperature}
                        onChange={handleChangeContainer}
                        fullWidth
                      />
                    </Grid>
                  )}
                  {container.hasTemp && (
                    <Grid item xs={1.5}>
                      <MDInput
                        type="text"
                        name="ventilation"
                        label="Ventilacion"
                        value={container.ventilation}
                        onChange={handleChangeContainer}
                        fullWidth
                      />
                    </Grid>
                  )}
                  {container.hasTemp && (
                    <Grid item xs={1.5}>
                      <MDInput
                        type="text"
                        name="humidity"
                        label="Humedad"
                        value={container.humidity}
                        onChange={handleChangeContainer}
                        fullWidth
                      />
                    </Grid>
                  )}
                  <Grid style={{ marginTop: 8, marginLeft: 10 }}>
                    <MDButton
                      variant="gradient"
                      color="success"
                      size="small"
                      onClick={addContainer}
                    >
                      Agregar
                    </MDButton>
                  </Grid>
                  <Grid style={{ marginTop: 8, marginLeft: 10 }}>
                    <MDButton
                      variant="gradient"
                      color="primary"
                      size="small"
                      onClick={deleteFormContainer}
                    >
                      Borrar
                    </MDButton>
                  </Grid>
                </Grid>
                <Divider />
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows: containers }}
                  isSorted={false}
                  canSearch={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                />
              </MDBox>
            </MDBox>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <MDBox mt={4} mb={1} sx={{ m: 2 }}>
                  <MDButton variant="gradient" color="info" onClick={submitHandlerSaleOrder}>
                    Guardar
                  </MDButton>
                </MDBox>
              </Grid>
              <Grid item xs={3}>
                <MDBox mt={4} mb={1} sx={{ m: 2 }}>
                  <MDButton variant="gradient" color="warning" onClick={submitHandlerSaleOrder}>
                    Cancelar
                  </MDButton>
                </MDBox>
              </Grid>
            </Grid>
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
          </Card>
        </MDBox>
      )}

      {renderSnackbar}
      <Footer />
    </DashboardLayout>
  );
}

export default SalesOrder;
