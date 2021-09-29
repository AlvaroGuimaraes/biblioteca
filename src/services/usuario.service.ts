import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from 'src/models/usuario.model';
import { ResponseUtils } from 'src/utils/response.utils';
import { UsuarioUtils } from 'src/utils/usuario.utils';

@Injectable()
export class UsuarioService {

  constructor(@InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>) {}

  async getUsuarios() : Promise<Usuario> {
    const usuariosList : any = [];
     await this.usuarioModel.find().then(result =>{
      result.map(usuario =>{
        usuariosList.push(UsuarioUtils.formatarUsuario(usuario))
      })
    }).catch(error=>{throw ResponseUtils.criarMensagemErroRetorno(500, error.message)});

    return usuariosList;
  }

  async getUsuariosByCpf(cpf: string) : Promise<Usuario> {
    return await this.usuarioModel.findOne({cpf : cpf}).then(result  => {
      const usuario : Usuario = UsuarioUtils.formatarUsuario(result)
      return usuario;
    }).catch(error=>{throw ResponseUtils.criarMensagemErroRetorno(500, error.message)});
  }

  async SalvarUsuario(usuario : Usuario) : Promise<any> {
    const usuarioUtils = new UsuarioUtils();
    if (!usuarioUtils.validarUsuario(usuario)) throw ResponseUtils.criarMensagemRetorno(400, 'Não foi possível salvar o usuário. Verifique os dados e tente novamente!')
    await new this.usuarioModel(usuario).save().catch(error=>{throw ResponseUtils.criarMensagemErroRetorno(500, error.message)});
    return ResponseUtils.criarMensagemRetorno(200, 'Usuario cadastrado com sucesso!');
  }
}
