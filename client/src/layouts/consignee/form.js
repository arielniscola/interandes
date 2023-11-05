import React, { useState } from "react";

import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDInput from "../../components/MDInput";

function ConsigneeForm({ onConsigneeSelect, title, isNotify }) {
  const [consignee, setConsignee] = useState({
    businessName: "",
    contact: "",
    email: "",
    taxID: "",
    address: "",
    phone: "",
    notify: isNotify,
  });
  console.log(title);
  console.log(onConsigneeSelect);
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
          <Typography variant="h6">{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MDBox pt={0} pb={0}>
            <Card>
              <MDBox pt={0}>
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
                            name="phonenumber"
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
