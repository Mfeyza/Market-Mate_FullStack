import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/stockgif2-unscreen.gif";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextFieldRL from "../components/TextFieldLR";
import { Button } from "@mui/material";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import useAuthCalls from "../service/useAuthCalls";
import { autoBatchEnhancer } from "@reduxjs/toolkit";
import imgLogin from "../assets/user-login (1).svg";

const Login = () => {
  const { login } = useAuthCalls();
  const loginSchema = object({
    email: string()
      .email("Please enter a valid email.")
      .required("Email entry is required."),
    password: string()
      .required("The password is required.")
      .min(8, "The password must be at least 8 characters long.")
      .max(16, "The password must contain no more than 16 characters.")
      .matches(/\d+/, "The password must contain at least one digit.")
      .matches(
        /[a-z]/,
        "The password must contain at least one lowercase letter."
      )
      .matches(
        /[A-Z]/,
        "The password must contain at least one uppercase letter."
      )
      .matches(
        /[@$!%*?&]+/,
        "The password must contain at least one special character (@$!%*?&)."
      ),
  });
  const audio = new Audio('/open-and-closed-door-156814.mp3');
 
  return (
    
    <Container maxWidth="xxl" className="loginContainer">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
       
      >
        <Grid item xs={12} mb={3}>
          <Typography variant="h3" color="primary" align="center" sx={{
            marginTop:"4rem"
          }}>Market Mate</Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}sx={{
          marginTop:"5rem"
        }} >
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              login(values)
              actions.resetForm()
              actions.setSubmitting(false)
              audio.play()
            }}
          >  
            {(formikProps) => (
              <>
                <Form className="form">
                  <div className="imgLoginDiv">
                  <img  className="imgLogin" src={imgLogin} alt=""/>
                  </div>
                  

                  <Box >
                    <div className="forminputs">
                      <TextFieldRL
                        formData={[
                          { name: "email", label: "Email", type: "email" },
                          {
                            name: "password",
                            label: "Password",
                            type: "password",
                          },
                        ]}
                        {...formikProps}
                      />
                      <Button variant="contained" type="submit" className="login-btn">
                        Submit
                      </Button>
                    </div>
                    <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link className="link" to="/register">Do you have not an account?</Link>
          </Box>
                  </Box>
                </Form>
              </>
            )}
          
          </Formik>
         
        </Grid>

        <Grid item xs={10} sm={7} md={6}>
          <Container>
            <img src={image} alt="img" style={{
              width:"150rem",
              marginTop:"6rem"
            }}/>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
