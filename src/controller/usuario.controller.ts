import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from 'src/models/usuario.model';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  getUsuarios() {
    return this.usuarioService.getUsuarios()
  }

  @Get(':id')
  getUsuarioById(@Param() params) {
    return this.usuarioService.getUsuariosById(params.id);
  }

  @Post()
  SalvarUsuario(@Body() usuario : Usuario) {
    return this.usuarioService.SalvarUsuario(usuario);
  }
}
