import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { Reserva } from 'src/models/reserva.model';
import { ResponseUtils } from 'src/utils/response.utils';
import * as mongoose from 'mongoose'
import { ReservaDto } from 'src/dto/reservaDto';
import { ReservaUtils } from 'src/utils/reserva.utils';


@Injectable()
export class ReservaService {

  constructor(@InjectModel('Reserva') private readonly reservaModel: Model<Reserva>) {}

  async consultarReservas() : Promise<Reserva> {
    const reservasList :any = []; /* Crio uma variavel do tipo array para armazenar as reservar*/
    await this.reservaModel.find().then(result=>{ 
      result.map(reserva =>{ // utilizo o map, para percorrer todo o array de reservas retornado pelo mongodb
        reservasList.push(ReservaUtils.formatarReserva(reserva)) // formato as reservas
      })
    }).catch(error=>{throw ResponseUtils.criarMensagemErroRetorno(500, error.message)});
    return reservasList;
  }

  async criarReserva(reserva : Reserva) : Promise<any> {
    await new this.reservaModel(reserva).save().catch(error=>{throw ResponseUtils.criarMensagemErroRetorno(500, error.message)});  //realizo a inserção da reserva e caso estoure algum erro, eu o formato para o tipo padrão
    return ResponseUtils.criarMensagemRetorno(200, 'Reserva cadastrada com sucesso!'); // mensagem de sucesso padrão
  }

  async finalizarReserva(reservaDto : ReservaDto) : Promise<any>{
    mongoose.Types.ObjectId.isValid(reservaDto.idReserva) // Verifico se o id é válido
    await this.reservaModel.updateOne({_id : reservaDto.idReserva}, 
      {
        status : "finalizada", // seto o status como finalizada
        dataDevolucao : `${moment().tz('America/Sao_paulo').format('YYYY-MM-DDTHH:mm:ss.SSS')}Z` // a hora do momento atual
      }).catch(error=>{
      throw ResponseUtils.criarMensagemErroRetorno(500, error.message) // mensagem de erro padrão
    });
    return ResponseUtils.criarMensagemRetorno(200, 'A reserva foi finalizada com sucesso!'); // mensagem de sucesso padrão
  }
 
}
