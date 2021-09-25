import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LivroService } from 'src/services/livro.service';
import { Livro } from 'src/models/livro.model';

@Controller('livros')

 export class LivroController {
  constructor(private readonly livroService: LivroService) {}

  @Get()
  getLivros(@Body() filtros) {
    return this.livroService.consultarLivros(filtros);
  }

  @Post()
  async salvarLivro(@Body() livro : Livro){
    return await this.livroService.cadastrarLivro(livro);
  }

  @Put('/editarLivro')
  async editarLivro(@Body() livro : Livro){
    return await this.livroService.editarLivro(livro);
  }

  @Delete('/removerLivro/:id')
  async removerLivro(@Param() param){
    return await this.livroService.removerLivro(param.id);
  }
}
