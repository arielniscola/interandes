import React from "react";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ClientForm from "./form";

function ClientNewForm() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ClientForm />
    </DashboardLayout>
  );
}

export default ClientNewForm;
