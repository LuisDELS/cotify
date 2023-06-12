import mongoose from "mongoose";

const cotizacionSchema = new mongoose.Schema({
  numeroCotizacion: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  moneda :{
    type: String,
    required:true
  },
  dolar:{
    type:String
  },
  empresaGeneradora: {
    nombre: {
      type: String,
      required: true
    },
    rut: {
      type: String,
      required: true
    },
    direccion: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  empresaCliente: {
    razonSocial: {
      type: String,
      required: true
    },
    rut: {
      type: String,
      required: true
    },
    direccion: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    telefono: {
      type: String,
      required: true
    }
  },
  productos: [
    {
      nombre: {
        type: String,
        required: true
      },
      cantidad: {
        type: Number,
        required: true
      },
      precio: {
        type: Number,
        required: true
      }
    }
  ]
});


const Cotizacion = mongoose.model('Cotizacion', cotizacionSchema);
export default Cotizacion;
