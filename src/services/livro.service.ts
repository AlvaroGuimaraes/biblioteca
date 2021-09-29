import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Livro } from 'src/models/livro.model';
import { ConsultaBancoUtils } from 'src/utils/consultaBanco.utils';
import * as moment from 'moment-timezone'
import { ResponseUtils } from 'src/utils/response.utils';
import { LivroUtils } from 'src/utils/livro.utils';

@Injectable()
export class LivroService {
    dataAtual = `${moment()
    .tz('America/Sao_paulo')
    .format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`;

    constructor(@InjectModel('Livro') private readonly livroModel: Model<Livro>) {}

  async consultarLivros(filtros) : Promise<Livro> {
    const filters = ConsultaBancoUtils.buildFiltersParameters(filtros);
    const livrosList : any = [];
    await this.livroModel.find(filters).then(result=>{
      result.map(livro =>{
        livrosList.push(LivroUtils.formatarLivro(livro))
      })
    }).catch(error=>{
      throw ResponseUtils.criarMensagemErroRetorno(500, error.message);
    });
    return livrosList;
  }

  async cadastrarLivro(livro : Livro) : Promise<any> {
    if(!LivroUtils.validarLivro(livro)) throw ResponseUtils.criarMensagemErroRetorno(400, 'Não foi possível salvar o livro. Verifique os dados e tente novamente!')
    return await new this.livroModel(livro).save().then(result=> {
      return ResponseUtils.criarMensagemRetorno(200, 'Livro: ' + result.titulo + ' foi cadastrado com sucesso!');
    }).catch(error=>{
      throw ResponseUtils.criarMensagemErroRetorno(500, error.message)
    });
  }

  async editarLivro(livro : Livro) : Promise<any> {
    await this.livroModel.updateOne({_id : livro.id}, 
      {
        titulo : livro.titulo,
        autor : livro.autor,
        categoria : livro.categoria,
        dataAlteracao : this.dataAtual
      }).catch(error=>{
      throw ResponseUtils.criarMensagemErroRetorno(500, error.message)
    });
    return ResponseUtils.criarMensagemRetorno(200, 'O livro: ' + livro.titulo + ' foi alterado com sucesso!');
  }
  
  async removerLivro(id) : Promise<any>{
     await this.livroModel.deleteOne({_id : id}).catch(error=>{
      throw ResponseUtils.criarMensagemErroRetorno(500, error.message)
    });
    return ResponseUtils.criarMensagemRetorno(200, 'O livro foi removido com sucesso!');
  }

  async consultarLivroById(idLivro : string) : Promise<Livro>{
    return await this.livroModel.findOne({_id : idLivro}).then(result=>{
       return LivroUtils.formatarLivro(result)
    }).catch(error=>{
      throw ResponseUtils.criarMensagemErroRetorno(500, error.message);
    });
  }
}
