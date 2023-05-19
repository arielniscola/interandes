import { useEffect, useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { signin } from "redux/actions/actions";

function Basic() {
  const dispatch = useDispatch();
  const { error, userLogged } = useSelector((state) => state);
  const [inputs, setInputs] = useState({ mailaddress: "", password: "" });

  // notifications
  const notifyError = () => {
    toast.error("Datos incorrectos", {
      duration: 3000,
      position: "bottom-right",
    });
  };
  const notify = () => {
    toast.success("Login correcto", {
      duration: 1000,
      position: "bottom-right",
    });
  };

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      console.log("logged");
    }
  }, []);

  useEffect(() => {
    if (Object.keys(userLogged).length === 0) {
      notify();
    }
  }, [userLogged]);

  useEffect(() => {
    if (Object.keys(error).length !== 0) {
      notifyError();
    }
    return function () {
      dispatch({ type: "DELETE_ERROR", payload: {} });
    };
  }, [error]);

  const inputHandler = (event) => {
    const { value, name } = event.target;
    switch (name) {
      case "mailaddress":
        setInputs({
          ...inputs,
          [name]: value,
        });
        break;
      case "password":
        setInputs({
          ...inputs,
          [name]: value,
        });
        break;
      default:
        setInputs({
          ...inputs,
          [name]: value,
        });
        break;
    }
  };
  const submitHandle = (event) => {
    event.preventDefault();
    dispatch(signin(inputs));
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                name="mailaddress"
                label="Email"
                value={inputs.mailaddress}
                onChange={inputHandler}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                name="password"
                value={inputs.password}
                onChange={inputHandler}
                fullWidth
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" onClick={submitHandle} fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <Toaster />
    </BasicLayout>
  );
}

export default Basic;
