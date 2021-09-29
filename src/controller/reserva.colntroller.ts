import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReservaService } from '../services/reserva.service';
import { Reserva } from 'src/models/reserva.model';
import { Usuario } from 'src/models/usuario.model';
import { UsuarioService } from 'src/services/usuario.service';
import { ReservaDto } from 'src/dto/reservaDto';
import { LivroService } from 'src/services/livro.service';
import { ReservaUtils } from 'src/utils/reserva.utils';
import { ResponseUtils } from 'src/utils/response.utils';
import {TipoUsuario} from '../enums/tipo-usuario'
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ReservaResponseDto } from 'src/dto/reservaResponseDto';

@Controller('reservas')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService, private readonly usuarioService : UsuarioService, private readonly livroService : LivroService) {
     
  }

  /*Rota responsável por retornar todas as reservas*/
  @Get()
  @ApiResponse({type : ReservaResponseDto})
  @ApiResponse({ status: 500, description: '500 Internal Server Error.'})
  consultarReservas() : Promise<Reserva>{
    return this.reservaService.consultarReservas()
  }

  /*Rota responsável por cadastrar uma reserva*/
  @Post('/cadastrarReserva')
  @ApiBody({type: ReservaDto})
  @ApiResponse({ status: 200, description: 'Reserva cadastrada com sucesso!'})
  @ApiResponse({ status: 500, description: '500 Internal Server Error.'})
  async criarReserva(@Body() reservaDto : ReservaDto) : Promise<any> {
        const livro = []; /*crio uma variável que recebe um array*/
        const usuario : Usuario = await this.usuarioService.getUsuariosByCpf(reservaDto.cpf); /*consulto o usuário de acordo com o cpf enviado na request*/
        await Promise.all(reservaDto.idLivro.map(async (id)=>{
           livro.push(await this.livroService.consultarLivroById(id))  /*consulto os/o livro/s de acordo com o enviado na request, podendeo ser um livro ou um array de livro*/
        }))
        /* Eu poderia ter criado uma função para checar se o livro já foi reservado */

      if(usuario.tipo == TipoUsuario.NORMAL){  /*verifico se o tipo do usuário é normal*/
        return this.reservaService.criarReserva(ReservaUtils.montarReserva(usuario, livro));  /*realizo a criação da reserva mas antes monto um objeto reserva para ser salvo*/
      }else{
        return ResponseUtils.criarMensagemRetorno(200, 'Usuário não possui permissão para reservar livros')
      }
  }

  /*Rota responsável por finalizar uma reserva*/
  @Post('/finalizarReserva')
  @ApiBody({type: ReservaDto})
  @ApiResponse({ status: 200, description: 'A reserva foi finalizada com sucesso.'})
  @ApiResponse({ status: 500, description: '500 Internal Server Error.'})
  finalizarReversa(@Body() reservaDto : ReservaDto) :  Promise<any> {
    return this.reservaService.finalizarReserva(reservaDto);
  }
}
