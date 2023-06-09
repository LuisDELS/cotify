import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import TableViewOutlinedIcon from '@mui/icons-material/TableViewOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const drawerWidth = 270;

function ResponsiveDrawer(props) {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case '/crearcotizacion':
        return 'Crear Cotización';
      case '/miscotizaciones':
        return 'Mis Cotizaciones';
      case '/registrarcliente':
        return 'Registrar Clientes';
      case '/listaclientes':
        return 'Lista de Clientes';
      case '/crearusuario':
        return 'Crear Usuario';
      case '/configuracion':
        return 'Configuración';
      case '/':
        return 'Inicio';

      default:
        return 'Responsive Drawer';
    }
  };
  useEffect(() => {
    setMobileOpen(false); // Cierra el Drawer al cambiar de ubicación
  }, [location]);
  
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{ overflowX: 'hidden' }}>
      <Toolbar sx={{ justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h4" sx={{color:"fff", letterSpacing:"0.2rem", fontWeight:"bold"}} >Cotify</Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/"
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>
              <HomeOutlinedIcon sx={{ fontSize: "27px" }} />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItemButton>
        </ListItem>
        {['Cotizaciones', 'Clientes'].map((text) => (
          <ListItem key={text} disablePadding>

            <Accordion sx={{ boxShadow: "none", width: drawerWidth, padding: 0, margin: 0 }} >
              <ListItemButton sx={{ width: drawerWidth, height: "50px" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ width: drawerWidth, padding: 0, margin: 0, height: "15px" }}
                >

                  <ListItemIcon>
                    {text === "Cotizaciones" ? <RequestQuoteOutlinedIcon fontSize='medium' /> : <BusinessCenterOutlinedIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />


                </AccordionSummary>
              </ListItemButton>
              <AccordionDetails sx={{ width: drawerWidth, padding: 0, margin: 0, paddingLeft: "10px", marginRight:"5px"}} >
                <List sx={{ width: drawerWidth }}>
                  {text === "Cotizaciones" ? [{ titulo: "Crear cotizacion", path: "/crearcotizacion" }, { titulo: "Mis Cotizaciones", path: "/miscotizaciones" }].map((text) => (
                    <ListItem key={text.titulo} disablePadding sx={{ width: drawerWidth }}>
                      <ListItemButton sx={{ width: drawerWidth }}
                        component={Link}
                        to={text.path}
                        onClick={handleDrawerToggle}
                      >
                        <ListItemIcon>
                          {text.titulo === "Crear cotizacion" ? <FeedOutlinedIcon /> : <TableViewOutlinedIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text.titulo} />
                      </ListItemButton>
                    </ListItem>

                  )) : text === "Clientes" ? [{ titulo: "Registrar Cliente", path: "/registrarcliente" }, { titulo: "Lista de Clientes", path: "/listaclientes" }, { titulo: "Crear Usuario", path: "/crearusuario" }].map((text) => (
                    <ListItem key={text.titulo} disablePadding sx={{ width: drawerWidth }}>
                      <ListItemButton 
                        component={Link}
                        to={text.path}
                        onClick={handleDrawerToggle}
                      >
                        <ListItemIcon>
                          {text.titulo === "Registrar Cliente" ? <DashboardCustomizeOutlinedIcon /> : text.titulo === "Lista de Clientes" ? <ChecklistOutlinedIcon /> : <PersonAddAltOutlinedIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text.titulo} />
                      </ListItemButton>
                    </ListItem>

                  )) : null}
                </List>
              </AccordionDetails>
            </Accordion>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/configuracion"
          >
            <ListItemIcon>
              <SettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Configuración" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >

        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {getTitle()}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
           onClose={handleDrawerToggle}

          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />

      </Box>
    </Box>
  );
}



export default ResponsiveDrawer;
