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
    const usuariosList : any = []; /*Variável do tipo array para atribuir todos os usuários retornados pelo mongodb */
     await this.usuarioModel.find().then(result =>{
      result.map(usuario =>{ 
        usuariosList.push(UsuarioUtils.formatarUsuario(usuario))  /* Formato o usuário retornado pelo mongodb */
      })
    }).catch(error=>{throw ResponseUtils.criarMensagemErroRetorno(500, error.message)}); /* Mensagem de erro padrão */

    return usuariosList;
  }

  async getUsuariosByCpf(cpf: string) : Promise<Usuario> {
    return await this.usuarioModel.findOne({cpf : cpf}).then(result  => {
      const usuario : Usuario = UsuarioUtils.formatarUsuario(result) /* Formato o usuário retornado pelo mongodb */
      return usuario;
    }).catch(error=>{throw ResponseUtils.criarMensagemErroRetorno(500, error.message)}); /* Mensagem de erro padrão */
  }

  async SalvarUsuario(usuario : Usuario) : Promise<any> {
    const usuarioUtils = new UsuarioUtils(); 
    /* Valido os dados inseridos do usuário, caso algum dado seja inválido, é retornada uma mensagem de erro padrão */
    if (!usuarioUtils.validarUsuario(usuario)) throw ResponseUtils.criarMensagemRetorno(400, 'Não foi possível salvar o usuário. Verifique os dados e tente novamente!') 
    await new this.usuarioModel(usuario).save().catch(error=>{throw ResponseUtils.criarMensagemErroRetorno(500, error.message)}); //Tento salvar o usuário na base de dados, caso apresente algum erro, é retornada a mensagem de erro padrão
    return ResponseUtils.criarMensagemRetorno(200, 'Usuario cadastrado com sucesso!'); //Mensagem de retorno com sucesso
  }
}
