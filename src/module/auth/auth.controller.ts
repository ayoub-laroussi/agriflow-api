/**
 * Contrôleur d'authentification
 * 
 * Ce contrôleur gère les routes liées à l'authentification des utilisateurs,
 * notamment la connexion et la récupération du profil utilisateur.
 * 
 * @module AuthController
 */
import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { ApiResponseDto } from '../../swagger-responses';
import { authExamples, errorExamples } from '../../swagger-responses';

/**
 * Contrôleur d'authentification
 * 
 * Gère les routes liées à l'authentification des utilisateurs.
 */
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Connecte un utilisateur et génère un token JWT
   * 
   * @param loginDto DTO contenant l'email et le mot de passe
   * @returns Un objet contenant le token JWT et les informations de l'utilisateur
   */
  @Post('login')
  @ApiOperation({ summary: 'Authentification utilisateur' })
  @ApiResponse({ 
    status: 200, 
    description: 'Authentification réussie',
    type: ApiResponseDto,
    content: {
      'application/json': {
        example: authExamples.login
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Authentification échouée',
    content: {
      'application/json': {
        example: authExamples.unauthorized
      }
    }
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Création d\'un nouvel utilisateur' })
  @ApiResponse({ 
    status: 201, 
    description: 'Utilisateur créé avec succès',
    type: ApiResponseDto,
    content: {
      'application/json': {
        example: authExamples.register
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Données invalides',
    content: {
      'application/json': {
        example: errorExamples.badRequest
      }
    }
  })
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Rafraîchir le token d\'authentification' })
  @ApiResponse({ 
    status: 200, 
    description: 'Token rafraîchi avec succès',
    type: ApiResponseDto,
    content: {
      'application/json': {
        example: authExamples.refreshToken
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Token invalide ou expiré',
    content: {
      'application/json': {
        example: errorExamples.unauthorized
      }
    }
  })
  async refreshToken(@Body() body: { refreshToken: string }) {
    return this.authService.refreshToken(body.refreshToken);
  }

  /**
   * Récupère le profil de l'utilisateur connecté
   * 
   * @param req Requête HTTP contenant l'utilisateur authentifié
   * @returns Le profil de l'utilisateur
   */
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupérer le profil de l\'utilisateur connecté' })
  @ApiResponse({ 
    status: 200, 
    description: 'Profil récupéré avec succès',
    type: ApiResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Non autorisé',
    content: {
      'application/json': {
        example: errorExamples.unauthorized
      }
    }
  })
  async getProfile(@Req() req) {
    return { user: req.user };
  }
} 