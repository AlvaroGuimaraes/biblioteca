import { Livro } from "src/models/livro.model"

export class LivroUtils{
    static validarLivro(livro : Livro) : boolean {
        if(!livro.titulo || !livro.autor || !livro.categoria) return false
        return true
    }

    static formatarLivro(livro : any) : Livro{
        return {
            id : livro._id,
            titulo : livro.titulo,
            autor : livro.autor,
            categoria : livro.categoria,
            dataCadastro : livro.dataCadastro,
            dataAlteracao : livro.dataAlteracao
         }
    }
}