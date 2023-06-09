import React from 'react'
import Grid from '@mui/material/Grid'
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { Divider, IconButton, Tooltip } from '@mui/material';

const steps = [
  'Pendiente',
  'Orden de compra',
  'Entregado',
];

const MisCotizaciones = () => {

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

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


  return (
    <>
      <Box sx={{ marginLeft: { xs: "0", sm: "320px" }, border: "2px solid #f5f5f5", borderRadius: "6px", paddingY: "10px", mr: "50px", ":hover": { backgroundColor: "#f5f5f5" } }}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={3} display="flex" flexDirection="row">
            <Grid >
              <DescriptionOutlinedIcon sx={{ fontSize: "4.5rem" }} />
            </Grid>
            <Divider orientation='vertical' flexItem sx={{ mr: "8px", maxHeight: "70px" }} />
            <Grid sx={{ gap: "10px" }}>
              <Typography variant="body1" >COT-2023-001</Typography>
              <Typography variant="body2" >Cliente: JEJ</Typography>
              <Typography variant="body2" >Fecha: 31-05-2023</Typography>
            </Grid>
          </Grid>
          <Grid item xs={5} >
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
          <Grid sx={{ flexGrow: 1 }} >
            {activeStep === steps.length ? (
              <React.Fragment>

              </React.Fragment>
            ) : (

              <React.Fragment>

                <Box mt="-35px" ml="-20px">
                  <Tooltip title="Subir documento" placement='top'>
                    <IconButton onClick={handleNext}>
                      <FilePresentOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </React.Fragment>
            )}

          </Grid>
          <Grid item xs={3} >
            <Button color='error' sx={{ mr: "5px" }}>Eliminar</Button>
            <Button >Descargar</Button>
          </Grid>
        </Grid>
      </Box>




    </>





  )
}

export default MisCotizaciones