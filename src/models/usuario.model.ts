import * as mongoose from 'mongoose';

export const UsuarioSchema = new mongoose.Schema({
    cpf: { type: String, required: true, unique:true },
    nome: { type: String, required: true },
    tipo: { type: String, required: true },
  });

export interface Usuario {
    cpf : string;
    nome : string;
    tipo : string;
}
  