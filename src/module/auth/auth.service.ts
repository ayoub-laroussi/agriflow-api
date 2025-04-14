/**
 * Service d'authentification
 * 
 * Ce service gère les fonctionnalités d'authentification de l'application,
 * notamment la validation des identifiants et la génération de tokens JWT.
 * 
 * @module AuthService
 */
import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';

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

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    
    return {
      message: 'Connexion réussie',
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user.id_user,
          email: user.email,
          username: user.username
        },
      },
      statusCode: 200,
    };
  }

  /**
   * Enregistre un nouvel utilisateur
   * 
   * @param createUserDto DTO contenant les informations de l'utilisateur
   * @returns L'utilisateur créé
   * @throws ConflictException si l'email est déjà utilisé
   */
  async register(createUserDto: CreateUserDto): Promise<User> {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.userService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Cet email est déjà utilisé');
    }

    // Créer le nouvel utilisateur
    return this.userService.create(createUserDto);
  }

  /**
   * Rafraîchit un token JWT
   * 
   * @param refreshToken Token de rafraîchissement
   * @returns Un nouvel accessToken
   * @throws UnauthorizedException si le token est invalide
   */
  async refreshToken(refreshToken: string) {
    try {
      // Vérifier et décoder le token
      const payload = this.jwtService.verify(refreshToken);
      
      // Vérifier que l'utilisateur existe toujours
      const user = await this.userService.findOne(payload.sub);
      if (!user) {
        throw new UnauthorizedException('Utilisateur non trouvé');
      }
      
      // Générer un nouveau token
      const newPayload = {
        sub: user.id_user,
        email: user.email,
      };

      return {
        message: 'Token rafraîchi avec succès',
        data: {
          accessToken: this.jwtService.sign(newPayload),
        },
        statusCode: 200,
      };
    } catch (error) {
      throw new UnauthorizedException('Token invalide ou expiré');
    }
  }

  /**
   * Valide les identifiants d'un utilisateur
   * 
   * @param email Email de l'utilisateur
   * @param password Mot de passe de l'utilisateur
   * @returns L'utilisateur si les identifiants sont valides, null sinon
   */
  private async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    
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