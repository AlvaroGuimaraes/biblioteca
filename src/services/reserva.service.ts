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
    const reservasList :any = [];
    await this.reservaModel.find().then(result=>{
      result.map(reserva =>{
        reservasList.push(ReservaUtils.formatarReserva(reserva))
      })
    }).catch(error=>{throw ResponseUtils.criarMensagemErroRetorno(500, error.message)});
    return reservasList;
  }

  async criarReserva(reserva : Reserva) : Promise<any> {
    await new this.reservaModel(reserva).save().catch(error=>{throw ResponseUtils.criarMensagemErroRetorno(500, error.message)});
    return ResponseUtils.criarMensagemRetorno(200, 'Reserva cadastrada com sucesso!');
  }

  async finalizarReserva(reservaDto : ReservaDto) : Promise<any>{
    mongoose.Types.ObjectId.isValid(reservaDto.idReserva)
    await this.reservaModel.updateOne({_id : reservaDto.idReserva}, 
      {
        status : "finalizada",
        dataDevolucao : `${moment().tz('America/Sao_paulo').format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`
      }).catch(error=>{
      throw ResponseUtils.criarMensagemErroRetorno(500, error.message)
    });
    return ResponseUtils.criarMensagemRetorno(200, 'A reserva foi finalizada com sucesso!');
  }
 
}
