import React from 'react';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import { Link } from "react-router-dom";
import image from "../assets/stockgif2-unscreen.gif";
import useAuthCalls from "../service/useAuthCalls";
import TextFieldRL from '../components/TextFieldLR';
import imgLogin from "../assets/register-icon-free-16.jpg";

export const registerSchema = object({
  username: string()
    .max(20, "Username must be less than 20 characters.")
    .required("Username is required"),
  firstName: string()
    .max(20, "First name must be less than 20 characters.")
    .required("First name is required"),
  lastName: string()
    .max(20, "Last name must be less than 20 characters.")
    .required("Last name is required"),

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

const Register = () => {
  const { register } = useAuthCalls();

  return (
   
    <Container maxWidth="xxl" className="loginContainer">
    <Grid
      container
      justifyContent="center"
      direction="row-reverse"
     
      
    >
      <Grid item xs={12} mb={3}>
        <Typography variant="h3" color="primary" align="center"sx={{
            marginTop:"4rem"
          }}>Market Mate</Typography>
      </Grid>

      <Grid item xs={12} sm={10} md={6} sx={{
        marginTop:"5rem"
      }}>

          <Formik
            initialValues={{
              username: "",
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            }}
            validationSchema={registerSchema}
            onSubmit={(values, actions) => {
              register(values);
              actions.resetForm();
              actions.setSubmitting(false);
              audio.play()
            }}
          >
          
          
              {formikProps =>(    
              <>
           <Form className='form'>
           <div className="imgLoginDiv">
                  <img  className="imgLogin" src={imgLogin} alt=""/>
                  </div>
           <Box>
            <div className="forminputs">
           <TextFieldRL
          formData={[
          { name: "username", label: "User Name", type: "text" },
          { name: "firstName", label: "First Name", type: "text" },
          { name: "lastName", label: "Last Name", type: "text" },
          { name: "email", label: "Email", type: "email" },
          { name: "password", label: "Password", type: "password" }
          ]}
          {...formikProps}
          />
             <Button variant="contained" type="submit" className='login-btn'>
                        Submit
                      </Button>
                      </div>
           </Box>
           <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link className='link' to="/">Already have an account?</Link>
          </Box>
          </Form>
           
          </>
              )}
             
            
          </Formik>

         
        </Grid>

        <Grid item xs={10} sm={7} md={6}>
          <Container >
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

export default Register;

