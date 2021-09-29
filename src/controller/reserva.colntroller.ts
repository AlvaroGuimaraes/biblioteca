import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReservaService } from '../services/reserva.service';
import { Reserva } from 'src/models/reserva.model';
import { Usuario } from 'src/models/usuario.model';
import { UsuarioService } from 'src/services/usuario.service';
import { ReservaDto } from 'src/dto/reservaDto';
import { LivroService } from 'src/services/livro.service';
import { Livro } from 'src/models/livro.model';
import { ReservaUtils } from 'src/utils/reserva.utils';
import { ResponseUtils } from 'src/utils/response.utils';
import {TipoUsuario} from '../enums/tipo-usuario'

@Controller('reservas')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService, private readonly usuarioService : UsuarioService, private readonly livroService : LivroService) {
     
  }

  @Get()
  consultarReservas() : Promise<Reserva>{
    return this.reservaService.consultarReservas()
  }

  @Post()
  async criarReserva(@Body() reservaDto : ReservaDto) : Promise<any> {
        const livro = [];
        const usuario : Usuario = await this.usuarioService.getUsuariosByCpf(reservaDto.cpf);
        await Promise.all(reservaDto.idLivro.map(async (id)=>{
           livro.push(await this.livroService.consultarLivroById(id))
        }))

      if(usuario.tipo == TipoUsuario.NORMAL){
        return this.reservaService.criarReserva(ReservaUtils.montarReserva(usuario, livro));
      }else{
        return ResponseUtils.criarMensagemRetorno(200, 'Usuário não possui permissão para reservar livros')
      }
  }

  @Post('finalizar')
  finalizarReversa(@Body() reservaDto : ReservaDto) :  Promise<any> {
    return this.reservaService.finalizarReserva(reservaDto);
  }
}
