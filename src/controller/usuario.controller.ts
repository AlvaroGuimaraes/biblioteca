import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from 'src/models/usuario.model';
import { UsuarioUtils } from 'src/utils/usuario.utils';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  getUsuarios() : Promise<Usuario> {
    return this.usuarioService.getUsuarios()
  }

  @Get(':cpf')
  getUsuarioById(@Param() params) : Promise<any> {
    return this.usuarioService.getUsuariosByCpf(params.cpf);
  }

  @Post()
  SalvarUsuario(@Body() usuario : Usuario) : Promise<any> {
    return this.usuarioService.SalvarUsuario(usuario);
  }
}
