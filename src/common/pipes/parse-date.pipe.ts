/**
 * Pipe de validation et de conversion de date
 * 
 * Ce pipe permet de valider et convertir les chaînes de caractères
 * en objets Date dans les requêtes HTTP.
 * 
 * @module ParseDatePipe
 */
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

/**
 * Pipe de validation et conversion de date
 * 
 * Permet de valider et convertir une chaîne en objet Date
 * en gérant les cas d'erreur et les formats invalides.
 */
@Injectable()
export class ParseDatePipe implements PipeTransform<string, Date> {
  /**
   * Transforme une chaîne en objet Date
   * 
   * @param {string} value - La valeur à transformer
   * @param {ArgumentMetadata} metadata - Métadonnées de l'argument
   * @returns {Date} La date convertie
   * @throws {BadRequestException} Si la valeur n'est pas une date valide
   */
  transform(value: string, metadata: ArgumentMetadata): Date {
    if (!value) {
      throw new BadRequestException('La valeur de date est requise');
    }

    const date = new Date(value);
    
    if (isNaN(date.getTime())) {
      throw new BadRequestException(`La valeur "${value}" n'est pas une date valide`);
    }
    
    return date;
  }
} 