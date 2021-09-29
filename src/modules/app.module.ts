import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioSchema } from 'src/models/usuario.model';
import { LivroSchema } from 'src/models/livro.model';
import { ReservaSchema } from 'src/models/reserva.model';
import { UsuarioController } from 'src/controller/usuario.controller';
import { UsuarioService } from 'src/services/usuario.service';
import { LivroController } from 'src/controller/livro.controller';
import { LivroService } from 'src/services/livro.service';
import { ReservaController } from 'src/controller/reserva.colntroller';
import { ReservaService } from 'src/services/reserva.service';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/biblioteca'), 
            MongooseModule.forFeature([
                {name: 'Usuario', schema: UsuarioSchema,},
                {name: 'Livro', schema: LivroSchema},
                {name: 'Reserva', schema: ReservaSchema}])
            ],
  controllers: [
                UsuarioController,
                LivroController,
                ReservaController
              ],
  providers: [
              UsuarioService,
              LivroService,
              ReservaService
            ],
})
export class AppModule {}
