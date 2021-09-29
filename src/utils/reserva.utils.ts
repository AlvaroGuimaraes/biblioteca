import * as moment from 'moment-timezone'
import { Reserva } from 'src/models/reserva.model';
import { LivroUtils } from './livro.utils';
import { UsuarioUtils } from './usuario.utils';

export class ReservaUtils{
    static dataAtual = `${moment()
        .tz('America/Sao_paulo')
        .format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`;
        
    static montarReserva(usuario, livro) : Reserva {
        if (Array.isArray(livro) && livro.length === 0 || !livro) throw new Error 
        
        return {
            usuario,
            livro,
            dataReserva : this.dataAtual,
            dataDevolucao: '',
            status : 'iniciada'
        }
    }

    static formatarReserva(reserva : any) : any {
        const livros = [];
        if(reserva.livro.length > 1) {
            reserva.livro.map(livroCursor =>{
                livros.push(LivroUtils.formatarLivro(livroCursor))
            })
        }
        return {
            id: reserva._id,
            livro : livros,
            usuario : UsuarioUtils.formatarUsuario(reserva.usuario),
            status: reserva.status,
            dataReserva: reserva.dataReserva,
            dataDevolucao: reserva.dataDevolucao,
        }
    }
}