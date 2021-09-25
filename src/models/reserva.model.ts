import { Livro, LivroSchema } from "./livro.model";
import { Usuario, UsuarioSchema } from "./usuario.model";
import * as mongoose from 'mongoose';

export const ReservaSchema = new mongoose.Schema({
    livro: { type: LivroSchema, required: true },
    usuario: { type: UsuarioSchema, required: true },
    dataReserva: { type: String, required: true },
    dataDevolucao: { type: String, required: true },
    status: { type: String, required: true },
  });

export interface Reserva {
    livro : Livro | Livro[];
    usuario : Usuario;
    data_reserva: string;
    data_devolucao: string;
    status: string
  }
  