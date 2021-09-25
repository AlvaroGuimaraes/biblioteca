import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioSchema } from 'src/models/usuario.model';
import { LivroSchema } from 'src/models/livro.model';
import { ReservaSchema } from 'src/models/reserva.model';
import { UsuarioController } from 'src/controller/usuario.controller';
import { UsuarioService } from 'src/services/usuario.service';
import { LivroController } from 'src/controller/livro.controller';
import { LivroService } from 'src/services/livro.service';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/biblioteca'), 
            MongooseModule.forFeature([
                {name: 'Usuario', schema: UsuarioSchema,},
                {name: 'Livro', schema: LivroSchema},
                {name: 'Reserva', schema: ReservaSchema}])
            ],
  controllers: [AppController,
                UsuarioController,
                LivroController
              ],
  providers: [AppService,
              UsuarioService,
              LivroService
            ],
})
export class AppModule {}
