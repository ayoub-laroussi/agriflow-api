import { ApiProperty } from "@nestjs/swagger"

export class CreateActionAgricoleDto {
    @ApiProperty({ description: 'Type d\'action agricole' })
    type: string

    @ApiProperty({ description: 'Date de l\'action agricole' })
    dateAction: Date

    @ApiProperty({ description: 'Commentaire de l\'action agricole' })
    commentaire?: string

    @ApiProperty({ description: 'Espacement entre les rangées' })
    spacingRow?: number

    @ApiProperty({ description: 'Espacement entre les lignes' })
    spacingLine?: number

    @ApiProperty({ description: 'Nombre de plantes' })
    nbPlants?: number
}
