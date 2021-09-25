import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Livro } from 'src/models/livro.model';
import { ConsultaBancoUtils } from 'src/utils/consultaBanco.utils';
import * as moment from 'moment-timezone'
import { ResponseUtils } from 'src/utils/response.utils';

@Injectable()
export class LivroService {
    dataAtual = `${moment()
    .tz('America/Sao_paulo')
    .format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`;

    constructor(
        @InjectModel('Livro') private readonly livroModel: Model<Livro>,
      ) {}

  async consultarLivros(filtros) {
    const filters = ConsultaBancoUtils.buildFiltersParameters(filtros);
    return await this.livroModel.find(filters).exec().catch(error=>{
      throw error;
    });
  }

  async cadastrarLivro(livro : Livro) {
    return await new this.livroModel(livro).save().then(result=> {
      return ResponseUtils.criarMensagemRetorno('Livro: ' + result.titulo + ' foi cadastrado com sucesso!');
    }).catch(error=>{
      throw error
    });
  }

  async editarLivro(livro : Livro){
    console.log(livro)
    await this.livroModel.updateOne({_id : livro.id}, 
      {
        titulo : livro.titulo,
        autor : livro.autor,
        categoria : livro.categoria,
        dataAlteracao : this.dataAtual
      }).catch(error=>{
      throw error
    });
    return ResponseUtils.criarMensagemRetorno('O livro: ' + livro.titulo + ' foi alterado com sucesso!');
  }
  
  async removerLivro(id){
     await this.livroModel.deleteOne({_id : id}).catch(error=>{
      throw error
    });
    return ResponseUtils.criarMensagemRetorno('O livro foi removido com sucesso!');
  }

}
