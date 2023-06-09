import mongoose from "mongoose";

const EmpresaSchema = new mongoose.Schema(
    {
        razonSocial: {
            type: String,
            required: true,
            min: 2,
            max:50
        },
        rut:{
            type: String,
            required: true,
            unique: true,
            min:2,
            max:20,
            
        },
        direccion:{
            type: String,
            required: true,
            min: 2,
            max:50
        },
        email:{
            type: String,
            required: true,
            min:2,
            max:50,
        },
        telefono:{
            type: String,
            required: true,
            min: 2,
            max:50
        }
    },
    {timestamps: true}
)

const Empresa = mongoose.model("Empresa", EmpresaSchema);
export default Empresa;
