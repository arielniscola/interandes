/** 
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/
import Icon from "@mui/material/Icon";

import Dashboard from "layouts/dashboard";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import Pricing from "layouts/pricing";
import Configuration from "layouts/configuration";
import ClientTable from "layouts/clients";
import ClientEditView from "layouts/clients/form";
import Files from "layouts/files";
import SalesOrdersTable from "layouts/salesOrder";
import SalesOrder from "layouts/salesOrder/form";
import OperationsTable from "layouts/operations";
import OperationTimeLine from "layouts/operations/timeline";
import SuplierTable from "layouts/suplier";
import InvoiceTable from "layouts/invoices";
import ClientNewForm from "layouts/clients/form/newForm";
import PricingForm from "./layouts/pricing/form";
import ProviderForm from "./layouts/suplier/suplierForm";

const routes = [
  {
    type: "collapse",
    name: "DASHBOARD",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "route",
    name: "PROVEEDORES",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "PROVEEDORES",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/providers",
    component: <SuplierTable />,
  },
  {
    type: "route",
    name: "PROVEEDORES",
    key: "notifications",
    route: "/providers/form",
    component: <ProviderForm />,
  },
  {
    type: "route",
    name: "PROVEEDORES",
    key: "notifications",
    route: "/providers/form/:id",
    component: <ProviderForm />,
  },
  {
    type: "route",
    name: "CLIENTES",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "CLIENTES",
    key: "clientes",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/clients",
    component: <ClientTable />,
  },
  {
    type: "route",
    name: "CLIENTES",
    key: "clientEdit",
    route: "/clients/edit/:id",
    component: <ClientEditView />,
  },
  {
    type: "route",
    name: "CLIENTES",
    key: "clientForm",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/clients/form",
    component: <ClientNewForm />,
  },
  {
    type: "collapse",
    name: "FACTURACION",
    key: "invoices",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/invoices",
    component: <InvoiceTable />,
  },
  {
    type: "route",
    name: "signin",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "PRICING",
    key: "pricing",
    icon: <Icon fontSize="small">PriceChange</Icon>,
    route: "/pricing",
    component: <Pricing />,
  },
  {
    type: "route",
    name: "Signin",
    key: "signin",
    route: "/signin",
    component: <SignIn />,
  },
  {
    type: "route",
    name: "Formulario Pricing",
    key: "pricing",
    route: "/pricing-form",
    component: <PricingForm />,
  },
  {
    type: "route",
    name: "Formulario Pricing",
    key: "pricingEdit",
    route: "/pricing-form/:id",
    component: <PricingForm />,
  },
  {
    type: "route",
    name: "Formulario Orden de Venta",
    key: "salesOrder",
    route: "/salesOrder-form",
    component: <SalesOrder />,
  },
  {
    type: "route",
    name: "Formulario Orden de Venta",
    key: "salesOrder",
    route: "/salesOrder-form/:id",
    component: <SalesOrder />,
  },
  {
    type: "collapse",
    name: "ORDEN DE VENTA",
    key: "salesOrder",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/salesOrder",
    component: <SalesOrdersTable />,
  },
  {
    type: "route",
    name: "Configuración",
    key: "configuration",
    route: "/configuration",
    component: <Configuration />,
  },
  {
    type: "route",
    name: "Files",
    key: "files",
    route: "/file-upload/:id",
    component: <Files />,
  },
  {
    type: "collapse",
    name: "OPERACIONES",
    icon: <Icon fontSize="small">dashboard</Icon>,
    key: "operation",
    route: "/operations",
    component: <OperationsTable />,
  },
  {
    type: "route",
    name: "OPERACIONES",
    key: "operations",
    route: "/operations/timeline/:id",
    component: <OperationTimeLine />,
  },
];

export default routes;
