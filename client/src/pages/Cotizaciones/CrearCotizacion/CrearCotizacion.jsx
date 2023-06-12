import { Divider, Grid, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Link from '@mui/material/Link';
import { NavLink } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { NoSsr, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import "./Body.css"
import { MyPDF } from '../../Configuracion/CotizacionPDF/Descargar';
import config from '../../../../config';




const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
      width: "200px",
    },
  },
};
const date = new Date();
const day = date.getDate().toString().padStart(2, "0");
const month = (date.getMonth() + 1).toString().padStart(2, "0");
const year = date.getFullYear().toString().slice(-2);
const getDateFormatted = () => {

  return `${day}/${month}/${year}`;
};


const CrearCotizacion = () => {

  {/* INICIO LOGICA HEADER */ }


  const formattedDate = getDateFormatted()
  const currentYear = new Date().getFullYear();
  const cotizacionNumber = 1;
  const [seleccionarCliente, setSeleccionarCliente] = React.useState('');

  const handleChange = (event) => {
    const selectedEmpresaId = event.target.value;
    const selectedEmpresa = empresas.find(
      (empresa) => empresa._id === selectedEmpresaId
    );
    setEmpresaSeleccionada(selectedEmpresa);
    setSeleccionarCliente(selectedEmpresaId);
  };

  const [moneda, setMoneda] = React.useState('$');
  const [dolar, setDolar] = useState("")

  const handleChangeMoneda = (event) => {
    setMoneda(event.target.value);
  };

  const handleChangeDolar = (event) => {
    setDolar(event.target.value);
  };

  let cliente = {
    razonSocial: null,
    rut: null,
    direccion: null,
    email: null,
    telefono: null
  };
  let empresa = {
    nombre: "EYL Soluciones Tecnológicas S.p.A.",
    rut: "77.688.462-6",
    direccion: "Barros Borgoño 71, Of 1105, Providencia",
    email: "mencina@codeapps.cl"
  }

  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);

  const [empresas, setEmpresas] = useState([]); // Inicializar el estado como un arreglo vacío

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await fetch(`${config.servidor}/obtenerempresas`);
        const data = await response.json();
        setEmpresas(data);
      } catch (error) {
        console.log("Error al obtener las empresas", error);
      }
    };

    fetchEmpresas();
  }, []);

  {/*FIN LOGICA HEADER */ }
  {/*INICIO LOGICA BODY */ }

  const [filas, setFilas] = useState([
    {
      item: 1,
      producto: '',
      cant: '',
      precio: '',
      subtotal: 0,
      iva: 0,
      total: 0,
      eliminada: false
    }
  ]);

  const agregarFila = () => {
    const filasNoEliminadas = filas.filter((row) => !row.eliminada);

    const nuevaFila = {
      item: filasNoEliminadas.length + 1,
      producto: '',
      cant: '',
      precio: '',
      subtotal: 0,
      iva: 0,
      total: 0,
      eliminada: false
    };

    setFilas([...filasNoEliminadas, nuevaFila]);
  };

  const eliminarFila = (index) => {
    const nuevasFilas = [...filas];
    nuevasFilas[index].eliminada = true;
    setFilas(nuevasFilas);

    for (let i = index + 1; i < nuevasFilas.length; i++) {
      nuevasFilas[i].item -= 1;
    }
    setFilas(nuevasFilas);
  };

  const handleBodyChange = (event, index, campo) => {
    const nuevasFilas = [...filas];
    nuevasFilas[index][campo] = event.target.value;
    setFilas(nuevasFilas);
  };

  const calcularTotales = (cant, precio) => {
    const subtotal = cant * precio;
    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    return {
      subtotal: Math.floor(subtotal),
      iva: Math.floor(iva),
      total: Math.floor(total)
    };
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    filas.forEach((item) => {
      subtotal += calcularTotales(item.cant, item.precio).subtotal;
    });
    return subtotal;
  };

  const calculateIva = () => {
    const subtotal = calculateSubtotal();
    return Math.floor(subtotal * 0.19);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const iva = calculateIva();
    return subtotal + iva;
  };

  {/* FIN LOGICA BODY */ }
  {/* LOGICA GUARDAR COTIZACION */ }

  const registrarCotizacion = async () => {
    try {
      // Crear una instancia de Cotizacion utilizando los datos del formulario
      const nuevaCotizacion = {
        numeroCotizacion: `${nextNumber}`,
        fecha: getDateFormatted(),
        moneda: moneda,
        dolar:dolar,
        empresaGeneradora: {
          nombre: empresa.nombre,
          rut: empresa.rut,
          direccion: empresa.direccion,
          email: empresa.email
        },
        empresaCliente: {
          razonSocial: empresaSeleccionada.razonSocial,
          rut: empresaSeleccionada.rut,
          direccion: empresaSeleccionada.direccion,
          email: empresaSeleccionada.email,
          telefono: empresaSeleccionada.telefono
        },
        productos: filas
          .filter((row) => !row.eliminada)
          .map((row) => ({
            nombre: row.producto,
            cantidad: row.cant,
            precio: row.precio
          }))
      };


      // Enviar la cotización al servidor
      const response = await fetch(`${config.servidor}/registrarcotizacion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevaCotizacion)
      });

      // Verificar la respuesta del servidor
      if (response.ok) {
        console.log("Cotización registrada exitosamente");
        // Obtener el próximo número de cotización actualizado
        const nextNumberResponse = await fetch(`${config.servidor}/numerocotizacion`);
        if (!nextNumberResponse.ok) {
          throw new Error("Error al obtener el próximo número de cotización");
        }
        const nextNumberData = await nextNumberResponse.json();
        const nextNumber = nextNumberData.nextNumber;

        // Actualizar el estado del próximo número de cotización
        setNextNumber(nextNumber);
      } else {
        throw new Error("Error al registrar la cotización");
      }
    } catch (error) {
      console.error("Error al registrar la cotización", error);
    }
  };
  {/* FIN LOGICA GUARDAR COTIZACION */ }
  {/* INICIO LOGICA NUMERO DE COTIZACION */ }

  const [nextNumber, setNextNumber] = useState("");
  useEffect(() => {

    const numeroCotizacion = async () => {
      try {
        const response = await fetch(`${config.servidor}/numerocotizacion`);
        const data = await response.json();
        const nextNumber = data.nextNumber;
        console.log("Próximo número de cotización:", nextNumber);
        setNextNumber(nextNumber)
      } catch (error) {
        console.log("Error al obtener las empresas", error);
      }
    };

    numeroCotizacion();
  }, []);

  {/* FIN LOGICA NUMERO DE COTIZACION */ }
  return (
    <>
      {/* INICIO HEADER */}
      <Box p="50px" mt="-50px" sx={{ marginLeft: { xs: "0", sm: "270px" }, }}>
        {/*  Logo empresa */}

        <Grid item xs={12} >
          <Grid>
            <img src="./codeapps.webp"
              alt="logo"
              width="200px"
              height="60px"
            />
          </Grid>

          {/*  Informacion de la empresa (Vendedor)*/}

          <Grid display="flex" flexDirection="row">
            <Grid pl="20px" sx={{ flexGrow: 1 }}>
              {[empresa].map((item) => (
                <React.Fragment key={item.rut}>
                  <Typography variant="h5" >{item.nombre}</Typography>
                  <Typography variant="h6" >{item.rut}</Typography>
                  <Typography variant="body1" >{item.direccion}</Typography>
                  <Typography variant="body1" >{item.email}</Typography>
                </React.Fragment>
              ))}
            </Grid>

            {/* Fecha de creacion */}

            <Grid pr="20px" sx={{ fontWeight: "bold" }}>
              {formattedDate}
            </Grid>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" mt="15px" mb="40px">
            <Typography variant='h5' fontWeight="bold">COTIZACIÓN</Typography>
          </Grid>

          {/* Numero de cotizacion */}

          <Grid container pl="20px" flexDirection="row" justifyContent="flex-end">
            <Grid sx={{ flexGrow: 1, mt: "30px" }}>
              <Typography mb="-15px" variant='body1' fontWeight="bold">{`Numero de cotización: ${currentYear}-${nextNumber}`}</Typography>
            </Grid>
            <Grid>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { mr:"5px", width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField id="outlined-basic" label="Dolar Mayorista" variant="outlined" onChange={handleChangeDolar} />
                
              </Box>
            </Grid>
            <Grid>
              <Box sx={{ minWidth: 120, marginRight: "20px" }}>
                <FormControl sx={{ width: 150 }}>
                  <InputLabel id="demo-simple-select-label">Moneda</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={moneda}
                    label="Moneda"
                    onChange={handleChangeMoneda}
                  >
                    <MenuItem value="$">CLP</MenuItem>
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="UF">UF</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>

          {/* Informacion del cliente */}

          <Grid item xs={12} margin="20px" padding="20px" sx={{ border: "1px solid black", borderRadius: "10px" }}>
            <Grid item xs={12} display="flex" flexDirection="row" justifyContent="flex-between" sx={{ flexGrow: 1 }}>
              <Grid item xs={12} md={6}>
                {[cliente].map((item) => (
                  <React.Fragment key={item.rut}>
                    <Typography variant="body1">{`Razon Social: ${empresaSeleccionada?.razonSocial}`}</Typography>
                    <Typography variant="body1">{`Rut: ${empresaSeleccionada?.rut}`}</Typography>
                    <Typography variant="body1">{`Direccion: ${empresaSeleccionada?.direccion}`}</Typography>
                    <Typography variant="body1">{`Email: ${empresaSeleccionada?.email}`}</Typography>
                    <Typography variant="body1">{`Telefono: ${empresaSeleccionada?.telefono}`}</Typography>

                  </React.Fragment>
                ))}

              </Grid>
              <Divider orientation='vertical' flexItem sx={{ ml: "20px" }} />

              {/* Select picker cliente */}

              <Grid item xs={12} sm={6} sx={{ display: "flex", flexDirection: "column", ml: "20px" }}>
                <Grid>
                  <FormControl fullWidth sx={{ minWidth: "200px" }}>
                    <InputLabel id="demo-simple-select-label">Seleccionar Cliente</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={seleccionarCliente}
                      label="Seleccionar Cliente"
                      onChange={handleChange}
                      MenuProps={MenuProps}
                    >
                      {empresas.map((empresa) => (
                        <MenuItem key={empresa._id} value={empresa._id}>
                          {empresa.razonSocial}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid>
                  <Link component={NavLink} to="/registrarcliente" variant="body2" >
                    ¿No encuentras tu cliente? Agregalo aquí.
                  </Link>

                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* FIN HEADER */}

        {/* INICIO BODY */}


        <Grid sx={{ marginX: '20px' }}>
          <NoSsr>
            <TableContainer component={Paper} sx={{ mt: '30px', border: '1px solid black' }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>ITEM</TableCell>
                    <TableCell align="center">PRODUCTO/SERVICIO</TableCell>
                    <TableCell align="center">CANT</TableCell>
                    <TableCell align="center">PRECIO UNI</TableCell>
                    <TableCell align="center">SUBTOTAL</TableCell>
                    <TableCell align="center">IVA</TableCell>
                    <TableCell align="center">TOTAL</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TransitionGroup component={null}>
                    {filas.map((row, index) => (
                      !row.eliminada && (
                        <CSSTransition
                          key={row.item}
                          timeout={300}
                          in={!row.eliminada}

                          classNames={{
                            enter: 'row-enter',
                            enterActive: 'enter-active',
                            exit: 'row-exit',
                            exitActive: 'row-exit-active'
                          }}
                        >
                          <TableRow key={row.item} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>
                              {index === filas.length - 1 ? (
                                <IconButton
                                  sx={{ color: 'green', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                  onClick={agregarFila}
                                >
                                  <AddCircleIcon color="green" />
                                </IconButton>
                              ) : (
                                <IconButton
                                  sx={{ color: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                  onClick={() => eliminarFila(index)}
                                >
                                  <RemoveCircleIcon color="red" />
                                </IconButton>
                              )}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {row.item}
                            </TableCell>
                            <TableCell align="center">
                              <TextField
                                id={`producto-${index}`}
                                label="Producto"
                                value={row.producto}
                                onChange={(event) => handleBodyChange(event, index, 'producto')}
                                multiline
                                maxRows={3}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <TextField
                                id={`cant-${index}`}
                                label="Cant"
                                value={row.cant}
                                onChange={(event) => handleBodyChange(event, index, 'cant')}
                                sx={{ width: '60px' }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <TextField
                                id={`precio-${index}`}
                                label="Precio"
                                value={row.precio}
                                onChange={(event) => handleBodyChange(event, index, 'precio')}
                                sx={{ width: '100px' }}
                              />
                            </TableCell>
                            <TableCell align="center">{calcularTotales(row.cant, row.precio).subtotal}</TableCell>
                            <TableCell align="center">{calcularTotales(row.cant, row.precio).iva}</TableCell>
                            <TableCell align="center">{calcularTotales(row.cant, row.precio).total}</TableCell>
                          </TableRow>
                        </CSSTransition>
                      )
                    ))}
                  </TransitionGroup>
                </TableBody>
              </Table>
            </TableContainer>
          </NoSsr>

          <TableContainer component={Paper} sx={{ mt: '30px', border: '1px solid black' }}>
            <Table sx={{ minWidth: 650, }} aria-label="footer table">
              <TableHead  >
                <TableRow  >
                  <TableCell >SUBTOTAL</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>IVA</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>TOTAL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell >{calculateSubtotal()}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{calculateIva()}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{calculateTotal()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* FIN BODY */}


        <Box sx={{ marginX: "20px" }}>

          <MyPDF
            logoUrl="./logocode.JPG"
            companyName={empresa.nombre}
            companyRut={empresa.rut}
            companyAddress={empresa.direccion}
            companyEmail={empresa.email}

            numeroCotizacion={nextNumber}
            moneda={moneda}
            dolar={dolar}

            clientName={empresaSeleccionada?.razonSocial}
            clientRut={empresaSeleccionada?.rut}
            clientAddress={empresaSeleccionada?.direccion}
            clientEmail={empresaSeleccionada?.email}
            clientPhone={empresaSeleccionada?.telefono}

            filas={filas}
            registrarCotizacion={registrarCotizacion}
            fileName={`COT_${day}${month}${currentYear}_${nextNumber}`}
          />
        </Box>


      </Box>

    </>
  )
}

export default CrearCotizacion