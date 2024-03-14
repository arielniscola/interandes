import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPricings, generatePdfPricing, deletePricing } from "services/pricingHook";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PageviewIcon from "@mui/icons-material/Pageview";
import ArticleIcon from "@mui/icons-material/Article";
import IconButton from "@mui/material/IconButton";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Menu from "@mui/material/Menu";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import moment from "moment";
import { navbarIconButton } from "examples/Navbars/DashboardNavbar/styles";
import NotificationItem from "examples/Items/NotificationItem";
import useSnackbar from "services/snackbarHook";
import DataTable from "../../examples/Tables/DataTable";
import MDButton from "../../components/MDButton";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";

function PricingTable() {
  const navigate = useNavigate();
  const { showSnackbar, renderSnackbar } = useSnackbar();
  const [openMenu, setOpenMenu] = useState(false);
  const [idSelected, setIdSelected] = useState("");
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenMenu = (event, item) => {
    setOpenMenu(event.currentTarget);
    setIdSelected(item.id);
  };
  const handleCloseMenu = () => setOpenMenu(false);

  const generateSalesOrder = (id) => {
    navigate("/salesOrder-form", { state: { pricingId: id } });
  };
  const viewDetailPricing = (id) => {
    window.location.replace(`/pricing-form/${id}`);
  };
  const downloadFile = async (id) => {
    const url = await generatePdfPricing(id);
    window.open(url, "_blank");
  };

  const addOptions = (items) => {
    const itemsWithOptions = items.map((item) => {
      return {
        ...item,
        options: (
          <div>
            <IconButton
              size="small"
              disableRipple
              color="inherit"
              sx={navbarIconButton}
              aria-controls="notification-menu"
              aria-haspopup="true"
              variant="contained"
              onClick={(event) => handleOpenMenu(event, item)}
            >
              <ListOutlinedIcon color="info" />
            </IconButton>
          </div>
        ),
      };
    });
    return itemsWithOptions;
  };

  const [pricings, setPrincigs] = useState([]);

  useEffect(async () => {
    const res = await getPricings();
    const response = addOptions(res);
    setPrincigs(response);
  }, []);

  const columns = [
    { Header: "N°", accessor: "pricingnumber", align: "center" },
    { Header: "Compañia", accessor: "companyname", align: "center" },
    {
      Header: "Creado",
      accessor: "createdAt",
      align: "center",
      Cell: ({ value }) => moment(value).format("DD/MM/YYYY"),
    },
    { Header: "Estado", accessor: "stage", align: "center" },
    { Header: "Importe Total", accessor: "profit", align: "center" },
    { Header: "Opciones", accessor: "options", align: "center" },
  ];

  // Renderizar opciones
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem
        icon={<PageviewIcon color="info" />}
        title="Ver Detalle"
        onClick={() => viewDetailPricing(idSelected)}
      />
      <NotificationItem
        icon={<PostAddIcon color="success" />}
        title="Generar Orden de Venta"
        onClick={() => generateSalesOrder(idSelected)}
      />
      <NotificationItem
        icon={<ArticleIcon color="gray" />}
        title="Generar PDF"
        onClick={() => downloadFile(idSelected)}
      />
      <NotificationItem
        icon={<DeleteOutlineOutlinedIcon color="error" />}
        title="Eliminar Pricing"
        onClick={handleClickOpen}
      />
    </Menu>
  );

  // Eliminar pricing servicio
  const deletePricingHandler = async () => {
    const res = await deletePricing(idSelected);
    if (res) {
      showSnackbar({
        title: "Pricing",
        content: res.message,
        color: res.ack ? "error" : "success",
        icon: res.ack ? "warning" : "check",
      });
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={1} mb={1}>
        <MDButton
          variant="gradient"
          color="success"
          onClick={() => window.location.replace("/pricing-form")}
        >
          Nuevo
        </MDButton>
      </MDBox>
      <MDBox pt={4} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Pricing
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable table={{ columns, rows: pricings }} noEndBorder />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {renderMenu()}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Estas seguro de eliminar Pricing?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Si se eliminar Pricing, se elimina la operación correspondiente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MDButton
            variant="gradient"
            color="error"
            onClick={() => {
              deletePricingHandler();
              handleClose();
            }}
          >
            Eliminar
          </MDButton>
          <MDButton variant="gradient" color="info" onClick={handleClose} autoFocus>
            Cancelar
          </MDButton>
        </DialogActions>
      </Dialog>
      {renderSnackbar}
      <Footer />
    </DashboardLayout>
  );
}

export default PricingTable;
