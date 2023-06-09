import Cotizacion from "../models/Cotizacion.js";

// Controlador para registrar una nueva cotización
export const crearCotizacion = async (req, res) => {
  try {
    const {
      numeroCotizacion,
      fecha,
      moneda,
      empresaGeneradora,
      empresaCliente,
      productos,
      
    } = req.body;

    // Crear una nueva instancia de Cotizacion con los datos proporcionados
    const cotizacion = new Cotizacion({
      numeroCotizacion,
      fecha,
      moneda,
      empresaGeneradora,
      empresaCliente,
      productos
    });

    // Guardar la cotización en la base de datos
    const cotizacionGuardada = await cotizacion.save();

    res.status(200).json({
      success: true,
      message: 'Cotización registrada exitosamente',
      cotizacion: cotizacionGuardada
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al registrar la cotización',
      error: error.message
    });
  }
};

export const siguienteNumero = async (req, res) => {
  try {
    const ultimaCotizacion = await Cotizacion.findOne({}, {}, { sort: { numeroCotizacion: -1 } });

    let nextNumber = 1; // Valor predeterminado si no hay cotizaciones en la base de datos

    if (ultimaCotizacion) {
      nextNumber = ultimaCotizacion.numeroCotizacion + 1;
    }

    return res.json({ nextNumber });
  } catch (error) {
    console.error("Error al obtener el próximo número de cotización:", error);
    res.status(500).json({ error: "Error al obtener el próximo número de cotización" });
  }
}
