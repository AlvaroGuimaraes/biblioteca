import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from 'src/models/usuario.model';
import { ResponseUtils } from 'src/utils/response.utils';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>,
      ) {}

  async getUsuarios() {
    return await this.usuarioModel.find().exec().catch(error=>{throw error});
  }

  async getUsuariosById(id: string) {
    return await this.usuarioModel.find({_id : id}).exec().catch(error=>{throw error});
  }

  async SalvarUsuario(usuario : Usuario) {
    await new this.usuarioModel(usuario).save().catch(error=>{throw error});
    return ResponseUtils.criarMensagemRetorno('Usuario cadastrado com sucesso!');
  }
}
