import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Livro } from 'src/models/livro.model';
import { ConsultaBancoUtils } from 'src/utils/consultaBanco.utils';
import * as moment from 'moment-timezone'
import { ResponseUtils } from 'src/utils/response.utils';
import { LivroUtils } from 'src/utils/livro.utils';
import { LivroDto } from 'src/dto/livroDto';

@Injectable()
export class LivroService {
    dataAtual = `${moment()
    .tz('America/Sao_paulo')
    .format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`; /* Estou criando uma variável de escopo global que contem a hora atual, para quando precisar*/

    constructor(@InjectModel('Livro') private readonly livroModel: Model<Livro>) {}

  async consultarLivros(filtros) : Promise<Livro> {
    const filters = ConsultaBancoUtils.buildFiltersParameters(filtros); /* Aqui estou criando os parâmetros de consulta dos livros, baseado nos filtros que são enviados no body da request */
    const livrosList : any = [];
    await this.livroModel.find(filters).then(result=>{
      result.map(livro =>{
        livrosList.push(LivroUtils.formatarLivro(livro)) /* Formato o result da consulta para retornar no respose */
      })
    }).catch(error=>{
      throw ResponseUtils.criarMensagemErroRetorno(500, error.message); /* Crio uma mensagem de erro padrão */
    });
    return livrosList;
  }

  async cadastrarLivro(livro : Livro) : Promise<any> {
    if(!LivroUtils.validarLivro(livro)) throw ResponseUtils.criarMensagemErroRetorno(400, 'Não foi possível salvar o livro. Verifique os dados e tente novamente!') /* Crio uma mensagem de erro padrão */
    return await new this.livroModel(livro).save().then(result=> {
      return ResponseUtils.criarMensagemRetorno(200, 'Livro: ' + result.titulo + ' foi cadastrado com sucesso!'); /* Crio uma mensagem de retorno padrão */
    }).catch(error=>{
      throw ResponseUtils.criarMensagemErroRetorno(500, error.message) /* Crio uma mensagem de erro padrão */
    });
  }

  async editarLivro(livro : LivroDto, id : string) : Promise<any> {
    /* Update no livro */
    await this.livroModel.updateOne({_id : id}, 
      {
        titulo : livro.titulo,
        autor : livro.autor,
        categoria : livro.categoria,
        dataAlteracao : this.dataAtual
      }).catch(error=>{
      throw ResponseUtils.criarMensagemErroRetorno(500, error.message) /* Crio uma mensagem de erro padrão */
    });
    return ResponseUtils.criarMensagemRetorno(200, 'O livro foi alterado com sucesso!'); /* Crio uma mensagem de retorno padrão */
  }
  
  async removerLivro(id) : Promise<any>{
     await this.livroModel.deleteOne({_id : id}).catch(error=>{
      throw ResponseUtils.criarMensagemErroRetorno(500, error.message) /* Crio uma mensagem de erro padrão */
    });
    return ResponseUtils.criarMensagemRetorno(200, 'O livro foi removido com sucesso!'); /* Crio uma mensagem de retorno padrão */
  }

  async consultarLivroById(idLivro : string) : Promise<Livro>{
    return await this.livroModel.findOne({_id : idLivro}).then(result=>{
       return LivroUtils.formatarLivro(result) /* Forma to o retorno do mongodb para retornar o livro*/
    }).catch(error=>{
      throw ResponseUtils.criarMensagemErroRetorno(500, error.message); /* Crio uma mensagem de erro padrão */
    });
  }
}
