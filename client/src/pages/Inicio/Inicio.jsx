import { Box, Grid, Typography, Button } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom';

const Inicio = () => {
  return (
    <>
      <Grid paddingY="30px" sx={{  marginLeft: "270px"  }}>

        <div>
          <Typography variant="h2" align="center" gutterBottom>
            Bienvenido a Cotify
          </Typography>
          <Typography variant="h6" align="center" gutterBottom>
            Cotify es una aplicación para crear y gestionar cotizaciones de manera fácil y eficiente.
          </Typography>
          <Typography variant="h6" align="center" gutterBottom>
            Comienza a utilizar la aplicación.
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", marginTop: '2rem', flexDirection: "column" }}>
            <Button variant="contained" color="primary" component={NavLink} to="/crearcotizacion" style={{ marginRight: '1rem', fontWeight:"bold", fontSize:"1rem", padding:"10px", width:"350px" }}>
              Crear cotización
            </Button>
            <br />
            <div style={{ display: 'flex', alignItems: 'center', marginTop: "140px" }}>
              <Typography variant="body2" style={{ marginRight: '0.5rem' }}>
                Creado por
              </Typography>
              <img src='./codeapps.webp' alt="Codeapps" style={{ height: '2.5rem' }} />
            </div>
          </div>
        </div>
      </Grid>
    </>
  )
}

export default Inicio