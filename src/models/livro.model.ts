import * as mongoose from 'mongoose';

export const LivroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  categoria: { type: String, required: true },
  dataCadastro: { type: Date, default: Date.now },
  dataAlteracao: { type: Date, default: Date.now },
});

export interface Livro {
  id: string;
  titulo: string;
  autor: string;
  categoria: string;
  dataCadastro: string;
  dataAlteracao: string;
}
