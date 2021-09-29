import { ApiProperty } from "@nestjs/swagger";
import { Livro } from "src/models/livro.model";
import { Usuario } from "src/models/usuario.model";

export class ReservaResponseDto {
    @ApiProperty()
    readonly usuario : Usuario;
    
    @ApiProperty()
    readonly livro : Livro | Livro[];
    
    @ApiProperty()
    readonly status : string

    @ApiProperty()
    readonly dataReserva : string
    
    @ApiProperty()
    readonly dataDevolucao : string
}