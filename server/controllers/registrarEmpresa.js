import Empresa from "../models/Empresa.js";

//registrar clientes
export const registrarCliente = async (req, res) => {
  try {
    const {
      razonSocial,
      rut,
      direccion,
      email,
      telefono,

    } = req.body;

    const nuevaEmpresa = new Empresa({
      razonSocial,
      rut,
      direccion,
      email,
      telefono,
    });
    const empresaGuardada = await nuevaEmpresa.save();
    res.status(201).json(empresaGuardada); //ENVIA SAVEDUSER EN FORMATO JSON PARA POSTERIORMENTE PODER UTILIZARSE EN EL FRONT-END
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.rut) {
      // Error de duplicación de rut
      res.status(400).json({ error: "El rut ya está registrado." });
    } else {
      // Otro tipo de error
      res.status(500).json({ error: err.message });
    }
  }
};




//Obtener empresas


export const obtenerEmpresas = async (req, res) => {
  try {
    const empresas = await Empresa.find();
    res.status(200).json(empresas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};