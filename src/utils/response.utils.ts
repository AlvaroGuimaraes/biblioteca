export class ResponseUtils{
    static criarMensagemRetorno(mensagem : string){
        return{
            statusCode: 200,
            msg: mensagem
        }
    }
}