import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import CardMedia from "@mui/material/CardMedia";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import pdfIcon from "assets/images/pdf-icon.png";
import wordIcon from "assets/images/word-icon.png";
import excelIcon from "assets/images/excel-icon.png";
import fileIcon from "assets/images/logo-sin-extension.png";
import MDButton from "components/MDButton";

function FileCardView({ file, deleteFn }) {
  const getIcon = (fileSelected) => {
    const splited = fileSelected.filename.split(".");
    const extension = splited[splited.length - 1];
    switch (extension) {
      case "xls":
        return excelIcon;
      case "xlsx":
        return excelIcon;
      case "pdf":
        return pdfIcon;
      case "docx":
        return wordIcon;
      case "doc":
        return wordIcon;
      default:
        return fileIcon;
    }
  };
  const deleteFileHandle = (fileDeleted) => {
    deleteFn(fileDeleted);
  };
  return (
    <MDBox mb={2}>
      <Card>
        <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
          <MDBox
            variant="gradient"
            bgColor="dark"
            color="light"
            coloredShadow="dark"
            borderRadius="sm"
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="1.5rem"
            height="1.5rem"
            ml={2}
            mt={1}
          >
            <CardMedia
              component="img"
              height="55"
              src="assets/images/pdf-icon.png"
              image={getIcon(file)}
            />
          </MDBox>
          <MDBox>
            <MDTypography variant="button" fontWeight="light" color="black">
              {file.filename}
            </MDTypography>
          </MDBox>
          <MDBox>
            <MDTypography variant="button" fontWeight="light" color="black">
              Tamaño: {file.size} KB
            </MDTypography>
          </MDBox>
          <MDBox textAlign="right" lineHeight={1.25}>
            <MDButton variant="text" color="error" onClick={() => deleteFileHandle(file.name)}>
              <DownloadForOfflineIcon color="info" />
            </MDButton>
          </MDBox>
        </MDBox>
        <Divider />
      </Card>
    </MDBox>
  );
}

export default FileCardView;
