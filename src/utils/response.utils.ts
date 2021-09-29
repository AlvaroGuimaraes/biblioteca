export class ResponseUtils{
    static criarMensagemRetorno(statusCode: number, mensagem : string){
        return{
            statusCode: statusCode || 200,
            message: mensagem
        }
    }

    static criarMensagemErroRetorno(statusCode: number, mensagem : string){
        return{
            statusCode: statusCode || 500,
            message: mensagem
        }
    }
}