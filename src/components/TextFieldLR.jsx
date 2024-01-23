import React from 'react';
import { TextField, Box } from '@mui/material';

const TextFieldRL = ({ handleChange, values, touched, errors, handleBlur, formData }) => {
  console.log(formData);
  return (
   <>
      
        {formData.map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            variant="outlined"
            value={values[field.name]}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched[field.name] && Boolean(errors[field.name])}
            helperText={errors[field.name]}
           fullWidth
          />
        ))}
     </>
  );
};

export default TextFieldRL;