// import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import moment from "moment";
import { createPricings } from "services/pricingHook";
// import table Items
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import ClientForm from "layouts/clients/form/form";
import Datepicker from "components/Datepicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MDInput from "../../../components/MDInput";
import MDTypography from "../../../components/MDTypography";
import MDButton from "../../../components/MDButton";

// Material Dashboard 2 React example components
function SalesOrder({ match }) {
  const navigate = useNavigate();
  if (match) {
    const { id } = match.params;
    console.log(id);
  }
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
    weigth: "",
    volumen: "",
    poRef: "",
    brand: "",
  });

  const [containers, setContainers] = useState([]);

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
    temperature: 0,
    ventilation: "",
    humidity: 0,
  });

  const handleChangeSaleOrder = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);

    switch (name) {
      case "chargeLCL":
        setSaleOrder({
          ...saleOrder,
          [name]: value === "on",
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
    const data = { saleOrder };
    const res = await createPricings(data);
    if (res) navigate("/sales-order");
  };
  const handleChangeDate = (e) => {
    setSaleOrder({ ...saleOrder, effectiveDate: e });
  };
  const handleChangeDateRevalidate = (e) => {
    setSaleOrder({ ...saleOrder, revalidated: e });
  };
  // Cambio en contenerdors
  const handleChangeContainer = (e) => {
    console.log(container);
    console.log(containers);
    setContainer(e);
    setContainers();
  };
  // Relaciono cliente
  const handleClientSelect = (client) => {
    setSaleOrder({ ...saleOrder, client: client.id });
    handleChangeContainer();
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ClientForm onClientSelect={handleClientSelect} />
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
          <MDBox pt={3}>
            <MDBox component="form" role="form">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <MDBox mb={2} sx={{ m: 2 }}>
                    <MDInput
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
                    <InputLabel id="demo-simple-select-helper-label">Posee HBL</InputLabel>
                    <Select
                      labelId="stage-price"
                      value={saleOrder.hasHBL}
                      name="stage"
                      id="stage-price"
                      label="Posee HBL"
                      onChange={handleChangeSaleOrder}
                      style={{ height: 40, marginTop: 8, width: 300 }}
                    >
                      <MenuItem value="SI">SI</MenuItem>
                      <MenuItem value="NO">NO</MenuItem>
                    </Select>
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
                  <Grid container spacing={2} marginBottom={-2}>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <InputLabel id="demo-simple-select-helper-label" style={{ marginBottom: 4 }}>
                        Fecha de Carga
                      </InputLabel>
                      <Datepicker value={saleOrder.dischargeDate} onChange={handleChangeDate} />
                    </MDBox>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <InputLabel id="demo-simple-select-helper-label" style={{ marginBottom: 4 }}>
                        Fecha de descarga
                      </InputLabel>
                      <Datepicker
                        value={saleOrder.chargeDate}
                        onChange={handleChangeDateRevalidate}
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
                      type="text"
                      name="containerStruk"
                      label="Contonedores/Camiones"
                      value={saleOrder.containerStruk}
                      onChange={handleChangeSaleOrder}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2} sx={{ m: 2 }}>
                    <MDInput
                      type="text"
                      name="merchandise"
                      label="Email"
                      value={saleOrder.merchandise}
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
                        onChange={handleChangeDate}
                      />
                    </MDBox>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <InputLabel id="demo-simple-select-helper-label" style={{ marginBottom: 4 }}>
                        Fecha arribo Destino
                      </InputLabel>
                      <Datepicker
                        value={saleOrder.dischargePortArrivalDate}
                        onChange={handleChangeDateRevalidate}
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
                        onChange={handleChangeDate}
                      />
                    </MDBox>
                    <MDBox mb={2} sx={{ m: 2 }}>
                      <InputLabel id="demo-simple-select-helper-label" style={{ marginBottom: 4 }}>
                        Cut Off Documental
                      </InputLabel>
                      <Datepicker
                        value={saleOrder.documentaryCutOffDate}
                        onChange={handleChangeDateRevalidate}
                      />
                    </MDBox>
                  </Grid>
                  <MDBox mb={2} sx={{ m: 2 }}>
                    <FormControlLabel
                      control={<Checkbox checked={saleOrder.chargeLCL} />}
                      label="Carga LCL"
                      name="chargeLCL"
                      onChange={handleChangeSaleOrder}
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
                <MDBox mt={4} mb={1} sx={{ m: 2 }}>
                  <MDButton variant="gradient" color="info" onClick={submitHandlerSaleOrder}>
                    Guardar
                  </MDButton>
                </MDBox>
              </Grid>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
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
              Camiones/Contenerdores
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <MDBox component="form" role="form">
              <Grid container spacing={1}>
                <Grid item xs={0.8}>
                  <MDInput
                    type="text"
                    name="containerNumber"
                    label="Numero"
                    value={container.containerNumber}
                    onChange={handleChangeSaleOrder}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={0.8}>
                  <MDInput
                    type="text"
                    name="ptoLinea"
                    label="PTO Linea"
                    value={container.ptoLinea}
                    onChange={handleChangeSaleOrder}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={0.8}>
                  <MDInput
                    type="text"
                    name="ptoAduana"
                    label="Volumen"
                    value={container.ptoAduana}
                    onChange={handleChangeSaleOrder}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={0.8}>
                  <MDInput
                    type="text"
                    name="otherSeals"
                    label="Otros Sellos"
                    value={container.otherSeals}
                    onChange={handleChangeSaleOrder}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={0.8}>
                  <MDInput
                    type="text"
                    name="poRef"
                    label="PO/REF"
                    value={saleOrder.poRef}
                    onChange={handleChangeSaleOrder}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={0.8}>
                  <MDInput
                    type="text"
                    name="poRef"
                    label="PO/REF"
                    value={container.poRef}
                    onChange={handleChangeSaleOrder}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={0.8}>
                  <MDInput
                    type="text"
                    name="driver"
                    label="Conductor"
                    value={container.driver}
                    onChange={handleChangeSaleOrder}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={0.8}>
                  <MDInput
                    type="text"
                    name="dni"
                    label="DNI"
                    value={container.dni}
                    onChange={handleChangeSaleOrder}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={0.8}>
                  <MDInput
                    type="text"
                    name="truckPlate"
                    label="Patente tractor"
                    value={container.truckPlate}
                    onChange={handleChangeSaleOrder}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={0.8}>
                  <MDInput
                    type="text"
                    name="semiPlate"
                    label="Patente semi"
                    value={container.semiPlate}
                    onChange={handleChangeSaleOrder}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={0.8}>
                  <MDInput
                    type="text"
                    name="containerType"
                    label="PO/REF"
                    value={container.containerType}
                    onChange={handleChangeSaleOrder}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={0.8}>
                  <MDInput
                    type="text"
                    name="poRef"
                    label="PO/REF"
                    value={saleOrder.poRef}
                    onChange={handleChangeSaleOrder}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={0.8}>
                  <MDInput
                    type="text"
                    name="poRef"
                    label="PO/REF"
                    value={saleOrder.poRef}
                    onChange={handleChangeSaleOrder}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={0.8}>
                  <MDInput
                    type="text"
                    name="poRef"
                    label="PO/REF"
                    value={saleOrder.poRef}
                    onChange={handleChangeSaleOrder}
                    fullWidth
                  />
                </Grid>
                <Grid style={{ marginTop: 8, marginLeft: 2 }}>
                  <MDButton variant="gradient" color="primary" onClick={submitHandlerSaleOrder}>
                    Borrar
                  </MDButton>
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      <Toaster />
      <Footer />
    </DashboardLayout>
  );
}

export default SalesOrder;
