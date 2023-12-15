import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import CardMedia from "@mui/material/CardMedia";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import pdfIcon from "assets/images/pdf-icon.png";
import wordIcon from "assets/images/word-icon.png";
import excelIcon from "assets/images/excel-icon.png";
import fileIcon from "assets/images/logo-sin-extension.png";
import DeleteIcon from "@mui/icons-material/Delete";
import MDButton from "components/MDButton";

function FileCard({ file, deleteFn }) {
  const getIcon = (fileSelected) => {
    const splited = fileSelected.name.split(".");
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
            width="2rem"
            height="2rem"
          >
            <CardMedia
              component="img"
              height="60"
              src="assets/images/pdf-icon.png"
              image={getIcon(file)}
            />
          </MDBox>
          <MDBox>
            <MDTypography variant="button" fontWeight="light" color="black">
              {file.name}
            </MDTypography>
          </MDBox>
          <MDBox>
            <MDTypography variant="button" fontWeight="light" color="black">
              Tamaño: {file.size} KB
            </MDTypography>
          </MDBox>
          <MDBox textAlign="right" lineHeight={1.25}>
            <MDButton variant="text" color="error" onClick={() => deleteFileHandle(file.name)}>
              <DeleteIcon color="error" />
            </MDButton>
          </MDBox>
        </MDBox>
        <Divider />
      </Card>
    </MDBox>
  );
}

export default FileCard;
