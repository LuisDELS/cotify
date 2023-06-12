import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { Divider, IconButton, Tooltip, CircularProgress } from '@mui/material';
import config from '../../../../config';
import { MyPDF } from "./CrearCotis/Descargar/";

const steps = [
  'Pendiente',
  'Orden de compra',
  'Entregado',
];

const MisCotizaciones = () => {
  let empresa = {
    nombre: "EYL Soluciones Tecnológicas S.p.A.",
    rut: "77.688.462-6",
    direccion: "Barros Borgoño 71, Of 1105, Providencia",
    email: "mencina@codeapps.cl"
  };

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [cotizaciones, setCotizaciones] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar la animación de carga

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  useEffect(() => {
    const fetchCotizaciones = async () => {
      try {
        const response = await fetch(`${config.servidor}/obtenercotizaciones`);
        const data = await response.json();
        setCotizaciones(data);
        setLoading(false); // Marcar que los datos se han cargado
      } catch (error) {
        console.log("Error al obtener las empresas", error);
        setLoading(false); // Marcar que ha ocurrido un error al cargar los datos
      }
    };

    fetchCotizaciones();
  }, []);

  return (
    <>
      {loading ? (
        // Mostrar la animación de carga mientras se cargan los datos
        <Box sx={{ml: { xs: "0", sm: "280px" }, mt:10}} display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : (
        cotizaciones.map((cotizacion) => (
          <Box
            key={cotizacion.numeroCotizacion}
            sx={{
              marginLeft: { xs: "0", sm: "320px" },
              border: "2px solid #f5f5f5",
              borderRadius: "6px",
              paddingY: "10px",
              mr: "50px",
              mb:"10px",
              ":hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <Grid container justifyContent="center" alignItems="center">
              <Grid item xs={3} display="flex" flexDirection="row">
                <Grid>
                  <DescriptionOutlinedIcon sx={{ fontSize: "4.5rem" }} />
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ mr: "8px", maxHeight: "70px" }} />
                <Grid sx={{ gap: "10px" }}>
                  <Typography variant="body1">COT-{new Date(cotizacion.fecha).getFullYear()}-{cotizacion.numeroCotizacion}</Typography>
                  <Typography variant="body2">Cliente: {cotizacion.empresaCliente.razonSocial}</Typography>
                  <Typography variant="body2">Fecha: {new Date(cotizacion.fecha).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })}</Typography>
                </Grid>
              </Grid>
              <Grid item xs={5}>
                <Box sx={{ width: '100%', ml: "20px" }}>
                  <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => {
                      const stepProps = {};
                      const labelProps = {};

                      if (isStepSkipped(index)) {
                        stepProps.completed = false;
                      }
                      return (
                        <Step key={label} {...stepProps}>
                          <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                </Box>
              </Grid>
              <Grid item xs={4} display="flex" justifyContent="flex-end">
                {activeStep === steps.length ? (
                  <React.Fragment></React.Fragment>
                ) : (
                  <React.Fragment>
                    <Tooltip title="Subir documento" placement="top">
                      <IconButton onClick={handleNext}>
                        <FilePresentOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Button color="error" sx={{ ml: '5px' }}>
                      Eliminar
                    </Button>
                    <MyPDF
                      logoUrl="./logocode.JPG"
                      companyName={empresa.nombre}
                      companyRut={empresa.rut}
                      companyAddress={empresa.direccion}
                      companyEmail={empresa.email}
                      fecha={cotizacion.fecha}

                      numeroCotizacion={cotizacion.numeroCotizacion}
                      moneda={cotizacion.moneda}
                      dolar={cotizacion.dolar}

                      clientName={cotizacion.empresaCliente.razonSocial}
                      clientRut={cotizacion.empresaCliente.rut}
                      clientAddress={cotizacion.empresaCliente.direccion}
                      clientEmail={cotizacion.empresaCliente.email}
                      clientPhone={cotizacion.empresaCliente.telefono}
                      filas={cotizacion.productos}
                      fileName={`COT_${new Date(cotizacion.fecha).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '')}_${cotizacion.numeroCotizacion}`}
                    />
                  </React.Fragment>
                )}
              </Grid>
            </Grid>
          </Box>
        )))}


    </>
  );
};

export default MisCotizaciones;

