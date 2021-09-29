import { ApiProperty } from "@nestjs/swagger";

export class ReservaDto {
    @ApiProperty()
    readonly cpf: string;
    
    @ApiProperty()
    readonly idLivro : any;
    
    @ApiProperty()
    readonly idReserva : string;
}