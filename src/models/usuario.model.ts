import * as mongoose from 'mongoose';

export const UsuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    tipo: { type: String, required: true },
  });

export interface Usuario {
    nome : string;
    tipo : string;
}
  