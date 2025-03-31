import { ApiProperty } from "@nestjs/swagger"

export class ActionAgricole {
    @ApiProperty({ description: 'Identifiant unique de l\'action agricole' })
    id: number

    @ApiProperty({ description: 'Type d\'action agricole' })
    type: string   // (préparation, plantation, entretien, protection, récolte)     
    @ApiProperty({ description: 'Date de l\'action agricole' })
    dateAction: Date

    @ApiProperty({ description: 'Commentaire de l\'action agricole' })
    commentaire: string
}
