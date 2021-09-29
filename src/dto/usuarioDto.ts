import { ApiProperty } from "@nestjs/swagger";

export class UsuarioDto{
    
    @ApiProperty()
    cpf : string;
    
    @ApiProperty()
    nome : string;
    
    @ApiProperty()
    tipo : string;
}