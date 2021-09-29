import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LivroService } from 'src/services/livro.service';
import { Livro } from 'src/models/livro.model';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { LivroResponseDto } from 'src/dto/livroResponseDto';
import { LivroDto } from 'src/dto/livroDto';

@Controller('livros')

 export class LivroController {
  constructor(private readonly livroService: LivroService) {}


  /*
    GetLivros irá retornar todos os livros.
    A rota será chamada sem nenhum filtro e será retornado todos os livros da biblioteca.
  */
  @Get()
  @ApiBody({type : LivroResponseDto})
  @ApiResponse({type : [LivroResponseDto]})
  @ApiResponse({ status: 500, description: '500 Internal Server Error.'})
  getLivros(@Body() filtros) : Promise<Livro>{
    return this.livroService.consultarLivros(filtros);
  }

  /*
    Essa rota será responsável por salvar o livro que está sendo enviado no body do request.
  */
  @Post('/salvarLivro')
  @ApiBody({ type : LivroDto})
  @ApiResponse({ type : [LivroResponseDto]})
  @ApiResponse({ status: 500, description: '500 Internal Server Error.'})
  async salvarLivro(@Body() livro : Livro) : Promise<any>{
    return await this.livroService.cadastrarLivro(livro);
  }

  /*
    Essa rota será responsável por editar o livro que está sendo enviado no body do request
    e o seu id como query.
  */
  @Put('/editarLivro/:id')
  @ApiBody({type : LivroDto})
  @ApiResponse({ status: 200, description: 'O livro foi alterado com sucesso!'})
  @ApiResponse({ status: 500, description: '500 Internal Server Error.'})
  async editarLivro(@Body() livro : Livro, @Param() params) : Promise<any>{
    return await this.livroService.editarLivro(livro, params.id);
  }

  /*
    Essa rota será responsável por remover o livro.
    O id será enviado como query.
  */
  @Delete('/removerLivro/:id')
  @ApiResponse({ status: 200, description: 'O livro foi removido com sucesso!'})
  @ApiResponse({ status: 500, description: '500 Internal Server Error.'})
  async removerLivro(@Param() param) : Promise<any>{
    return await this.livroService.removerLivro(param.id);
  }
}
