import { Livro } from "./livro.model";
import { Usuario, UsuarioSchema } from "./usuario.model";
import * as mongoose from 'mongoose';

export const ReservaSchema = new mongoose.Schema({
    livro: { type: Array, required: true },
    usuario: { type: UsuarioSchema, required: true },
    dataReserva: { type: String, default: Date.now },
    dataDevolucao: { type: String, default: Date.now },
    status: { type: String, default: 'aberta' },
  });

export interface Reserva {
    livro : Livro | Livro[];
    usuario : Usuario;
    dataReserva: string;
    dataDevolucao: string;
    status: string
  }
  