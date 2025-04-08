/**
 * DTO pour la réponse d'un statut de culture
 */
import { ApiProperty } from '@nestjs/swagger';

export class CropStatusResponseDto {
  @ApiProperty({
    description: 'Identifiant unique du statut de culture',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: 'Nom du statut de culture',
    example: 'En croissance'
  })
  name: string;

  @ApiProperty({
    description: 'Description du statut de culture',
    example: 'La culture est en phase de croissance active',
    required: false
  })
  description?: string;

  @ApiProperty({
    description: 'Couleur associée au statut (format hexadécimal)',
    example: '#4CAF50'
  })
  color: string;

  @ApiProperty({
    description: 'Ordre d\'affichage du statut',
    example: 1,
    required: false
  })
  displayOrder?: number;

  @ApiProperty({
    description: 'Indique si le statut est prédéfini',
    example: true,
    required: false
  })
  isPredefined?: boolean;

  @ApiProperty({
    description: 'Date de création du statut',
    example: '2024-03-20T10:00:00Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date de dernière mise à jour du statut',
    example: '2024-03-20T10:00:00Z'
  })
  updatedAt: Date;
} 