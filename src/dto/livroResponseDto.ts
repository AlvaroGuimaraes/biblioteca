import { ApiProperty } from "@nestjs/swagger";

export class LivroResponseDto{
    
    @ApiProperty()
    private readonly id: string;
     
    @ApiProperty()
    private readonly titulo: string;
     
    @ApiProperty()
    private readonly autor: string;
     
    @ApiProperty()
    private readonly categoria: string;
     
    @ApiProperty()
    private readonly dataCadastro: string;
     
    @ApiProperty()
    private readonly dataAlteracao: string;
}