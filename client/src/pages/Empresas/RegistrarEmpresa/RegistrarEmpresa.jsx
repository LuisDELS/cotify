import React from 'react'
import { Formik } from "formik";
import * as yup from "yup";
import { Box, TextField, Button } from '@mui/material';
import config from '../../../../config';


const registerSchema = yup.object().shape({
  razonSocial: yup.string().required("requerido"),
  rut: yup.string().required("requerido"),
  email: yup.string().email("invalid email").required("requerido"),
  telefono: yup.string().required("requerido"),
  direccion: yup.string().required("requerido"),
});

const initialValuesRegister = {
  razonSocial: "",
  rut: "",
  email: "",
  direccion: "",
  telefono: "",
};

const RegistroEmpresas = () => {

  const register = async (values, onSubmitProps) => {
    try {
      const resEmpresaRegistrada = await fetch(
        `${config.servidor}/registrarcliente`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
  
      if (resEmpresaRegistrada.ok) {
        const empresaRegistrada = await resEmpresaRegistrada.json();
        onSubmitProps.resetForm();
        console.log("Registrado", empresaRegistrada);
      } else {
        const errorResponse = await resEmpresaRegistrada.json();
        if (errorResponse.error === "El rut ya está registrado.") {
          console.log("Este cliente ya está registrado");
        } else {
          console.log("Error al realizar la solicitud", errorResponse.error);
        }
      }
    } catch (error) {
      console.log("Error al realizar la solicitud", error);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,

      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            ml="320px"
            mr="50px"
          >
            <TextField
              label="Razon social"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.razonSocial}
              name="razonSocial"
              error={
                Boolean(touched.razonSocial) && Boolean(errors.razonSocial)
              }
              helperText={touched.razonSocial && errors.razonSocial}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Rut"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.rut}
              name="rut"
              error={Boolean(touched.rut) && Boolean(errors.rut)}
              helperText={touched.rut && errors.rut}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Direccion"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.direccion}
              name="direccion"
              error={Boolean(touched.direccion) && Boolean(errors.direccion)}
              helperText={touched.direccion && errors.direccion}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)
              }
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Telefono"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.telefono}
              name="telefono"
              error={Boolean(touched.telefono) && Boolean(errors.telefono)}
              helperText={touched.telefono && errors.telefono}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          <Box pl="320px" pr="50px">
            <Button
              fullWidth
              type="submit"


              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: "#1976d2",
                color: "white",
                fontWeight: "bold",
                border: "1px solid #1976d2",
                "&:hover": { color: "#1976d2", border: "1px solid #1976d2", fontWeight: "bold" },
              }}
            >
              REGISTRAR
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default RegistroEmpresas