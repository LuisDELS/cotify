import express from "express"; 
import bodyParser from "body-parser"; 
import mongoose from "mongoose"; 
import cors from "cors" 
import dotenv from "dotenv"; 
import multer from "multer"; 
import helmet from "helmet"; 
import morgan from "morgan"; 
import path from "path";
import { fileURLToPath } from "url"; 
import { registrarCliente } from "./controllers/registrarEmpresa.js";
import { obtenerEmpresas } from "./controllers/registrarEmpresa.js";
 import { crearCotizacion, obtenerCotizaciones } from "./controllers/crearCotizacion.js";
 import { siguienteNumero } from "./controllers/crearCotizacion.js";



/*CONFIGURATIONS SE HABILITAN TODOS LOS MIDDLEWARES QUE SE USARAN EN EL PROYECTO*/ 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())

app.use("/assets", express.static(path.join(__dirname, "public/assets")));



//Routes

// app.use(express.static(path.join(__dirname, 'dist')));

// // Manejar todas las rutas y redirigir al archivo "index.html"
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

//Rutas Empresas-Clientes

app.post("/registrarcliente", registrarCliente);
app.get("/obtenerempresas", obtenerEmpresas);

//Rutas Cotizaciones

app.post("/registrarcotizacion", crearCotizacion)
app.get("/numerocotizacion", siguienteNumero)
app.get("/obtenercotizaciones", obtenerCotizaciones)
  

  

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    
     
  })
  .catch((error) => console.log(`${error} did not connect`));