import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import TextFieldRL from "../components/TextFieldLR"


const RegisterForm = ({
  values,
  handleChange,
  errors,
  touched,
  handleBlur,
}) => {
  return (
    <>
    {formikProps =>(
 <Form>
 <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
   <Button type="submit" variant="contained" size="large">
     Submit
   </Button>
 </Box>
</Form>
    )}
   
    </>
  );
};

export default RegisterForm;
