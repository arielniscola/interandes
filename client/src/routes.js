/** 
  All of the routes for the Material Dashboard 2 React are added here,
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

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Pricing from "layouts/pricing";
import Configuration from "layouts/configuration";
import ClientTable from "layouts/clients";
import ClientForm from "layouts/clients/form";
import Files from "layouts/files";
import SalesOrdersTable from "layouts/salesOrder";
import SalesOrder from "layouts/salesOrder/form";
import OperationsTable from "layouts/operations";
import OperationTimeLine from "layouts/operations/timeline";
import PricingForm from "./layouts/pricing/form";

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
    type: "collapse",
    name: "ORDEN DE VENTA",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "INTRUCTIVO",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "BL",
    key: "rtl",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/rtl",
    component: <RTL />,
  },
  {
    type: "collapse",
    name: "PROVEEDORES",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
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
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/clients",
    component: <ClientTable />,
  },
  {
    type: "route",
    name: "CLIENTES",
    key: "clientForm",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/clients/form",
    component: <ClientForm />,
  },
  {
    type: "collapse",
    name: "FACTURACION",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "SERVICIOS",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
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
    name: "Formulario Orden de Venta",
    key: "salesOrder",
    route: "/salesOrder-form",
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
    route: "/file-upload",
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
    route: "/operations/timeline",
    component: <OperationTimeLine />,
  },
];

export default routes;
