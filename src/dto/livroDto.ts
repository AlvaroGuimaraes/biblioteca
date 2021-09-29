import { ApiProperty } from "@nestjs/swagger";

export class LivroDto{

    @ApiProperty()
    readonly titulo: string;
     
    @ApiProperty()
    readonly autor: string;
     
    @ApiProperty()
    readonly categoria: string;
}