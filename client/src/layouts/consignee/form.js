import React, { useState, useEffect } from "react";

import MDBox from "components/MDBox";
import Autocomplete from "@mui/material/Autocomplete";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getConsignees } from "services/salesOrderHook";
import MDInput from "../../components/MDInput";

function ConsigneeForm({ stateRef, title, isNotify }) {
  const [consignee, setConsignee] = useState({
    businessName: "",
    contact: "",
    email: "",
    taxID: "",
    address: "",
    phone: "",
    notify: isNotify,
  });
  const [consigees, setConsignees] = useState([]);
  useEffect(() => {
    // Actualizamos el valor del estado en el ref
    stateRef.current = consignee;
  }, [stateRef, consignee]);

  useEffect(async () => {
    const res = await getConsignees();
    console.log(res);
    const data = res.data.filter((el) => el.notify === isNotify);
    if (!res.ack) setConsignees(data);
  }, []);
  const defaultOptions = {
    options: consigees.length > 0 ? consigees : [],
    getOptionLabel: (option) => option.businessName,
  };
  const handleChangeConsignee = (e) => {
    const { name, value } = e.target;
    switch (name) {
      default:
        setConsignee({
          ...consignee,
          [name]: value,
        });
        break;
    }
  };
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography fontSize={13} variant="h6">
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MDBox pt={0} pb={0}>
            <Card>
              <MDBox pt={0}>
                <Autocomplete
                  {...defaultOptions}
                  id="consigee-select"
                  multiple={false}
                  style={{ width: 300, marginBottom: 8, marginTop: -20 }}
                  options={consigees}
                  renderInput={(params) => (
                    <TextField {...params} label="Seleccionar" variant="outlined" />
                  )}
                  onChange={(event, newValue) => {
                    if (!newValue) {
                      setConsignee({
                        businessName: "",
                        contact: "",
                        email: "",
                        taxID: "",
                        address: "",
                        phone: "",
                        notify: isNotify,
                      });
                    } else {
                      setConsignee(newValue);
                    }
                  }}
                />
                <MDBox>
                  <MDBox component="form" role="form">
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <MDBox mb={1} sx={{ m: 1 }}>
                          <MDInput
                            type="text"
                            label="Razón Social"
                            name="businessName"
                            value={consignee.businessName}
                            variant="outlined"
                            fullWidth
                            onChange={handleChangeConsignee}
                          />
                        </MDBox>
                        <MDBox mb={1} sx={{ m: 1 }}>
                          <MDInput
                            type="text"
                            label="Contacto"
                            name="contact"
                            value={consignee.contact}
                            variant="outlined"
                            fullWidth
                            onChange={handleChangeConsignee}
                          />
                        </MDBox>
                        <MDBox mb={1} sx={{ m: 1 }}>
                          <MDInput
                            type="text"
                            label="Direccion"
                            name="address"
                            value={consignee.address}
                            variant="outlined"
                            fullWidth
                            onChange={handleChangeConsignee}
                          />
                        </MDBox>
                      </Grid>
                      <Grid item xs={6}>
                        <MDBox mb={1} sx={{ m: 1 }}>
                          <MDInput
                            type="text"
                            label="Telefono"
                            name="phone"
                            value={consignee.phone}
                            variant="outlined"
                            fullWidth
                            onChange={handleChangeConsignee}
                          />
                        </MDBox>
                        <MDBox mb={1} sx={{ m: 1 }}>
                          <MDInput
                            type="Taxt ID"
                            label="taxID"
                            value={consignee.taxID}
                            name="taxID"
                            variant="outlined"
                            fullWidth
                            onChange={handleChangeConsignee}
                          />
                        </MDBox>
                        <MDBox mb={1} sx={{ m: 1 }}>
                          <MDInput
                            type="text"
                            label="Correo electronico"
                            name="email"
                            value={consignee.email}
                            variant="outlined"
                            onChange={handleChangeConsignee}
                            fullWidth
                          />
                        </MDBox>
                      </Grid>
                    </Grid>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </MDBox>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default ConsigneeForm;
