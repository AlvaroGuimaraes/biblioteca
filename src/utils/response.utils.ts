export class ResponseUtils{
    static criarMensagemRetorno(statusCode: number, mensagem : string){
        return{
            status: statusCode || 200,
            description: mensagem
        }
    }

    static criarMensagemErroRetorno(statusCode: number, mensagem : string){
        return{
            status: statusCode || 500,
            description: mensagem
        }
    }
}