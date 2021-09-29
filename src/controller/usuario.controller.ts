import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from 'src/models/usuario.model';
import { ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { UsuarioDto } from 'src/dto/usuarioDto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  /* Rota responsável por retornar todos os usuários em lista */
  @Get()
  @ApiResponse({type: [UsuarioDto]})
  @ApiResponse({ status: 500, description: '500 Internal Server Error.'})
  getUsuarios() : Promise<Usuario> {
    return this.usuarioService.getUsuarios()
  }

  /* Rota responsável por consultar o usuário utilizando CPF */
  @Get(':cpf')
  @ApiQuery({name:'cpf'})
  @ApiResponse({type: UsuarioDto})
  @ApiResponse({ status: 500, description: '500 Internal Server Error.'})
  getUsuarioByCpf(@Param() params) : Promise<any> {
    return this.usuarioService.getUsuariosByCpf(params.cpf);
  }
  
  /* Rota responsável por criar um usuário*/
  @Post('/criarUsuario')
  @ApiBody({type : UsuarioDto})
  @ApiResponse({ status: 200, description: 'Usuario cadastrado com sucesso!'})
  @ApiResponse({ status: 400, description: 'Não foi possível salvar o usuário. Verifique os dados e tente novamente!'})
  @ApiResponse({ status: 500, description: '500 Internal Server Error.'})
  SalvarUsuario(@Body() usuario : Usuario) : Promise<any> {
    return this.usuarioService.SalvarUsuario(usuario);
  }
}
