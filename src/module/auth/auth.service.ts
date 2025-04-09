/**
 * Service d'authentification
 * 
 * Ce service gère les fonctionnalités d'authentification de l'application,
 * notamment la validation des identifiants et la génération de tokens JWT.
 * 
 * @module AuthService
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';

/**
 * Service d'authentification
 * 
 * Fournit des méthodes pour valider les identifiants des utilisateurs
 * et générer des tokens JWT pour l'authentification.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Valide les identifiants d'un utilisateur et génère un token JWT
   * 
   * @param loginDto DTO contenant l'email et le mot de passe de l'utilisateur
   * @returns Un objet contenant le token JWT et les informations de l'utilisateur
   * @throws UnauthorizedException si les identifiants sont invalides
   */
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    
    const payload = {
      sub: user.id_user,
      email: user.email,
    };
    
    return {
      message: 'Connexion réussie',
      data: {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id_user,
          email: user.email,
          username: user.username,
        },
      },
      statusCode: 200,
    };
  }

  /**
   * Valide les identifiants d'un utilisateur
   * 
   * @param email Email de l'utilisateur
   * @param password Mot de passe de l'utilisateur
   * @returns L'utilisateur si les identifiants sont valides, null sinon
   */
  private async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    
    if (!user) {
      return null;
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return null;
    }
    
    return user;
  }
} 