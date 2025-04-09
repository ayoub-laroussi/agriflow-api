/**
 * Contrôleur d'authentification
 * 
 * Ce contrôleur gère les routes liées à l'authentification des utilisateurs,
 * notamment la connexion et la récupération du profil utilisateur.
 * 
 * @module AuthController
 */
import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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
  @ApiOperation({ summary: 'Connexion d\'un utilisateur' })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur connecté avec succès',
  })
  @ApiResponse({
    status: 401,
    description: 'Identifiants invalides',
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
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
  @ApiOperation({ summary: 'Récupération du profil utilisateur' })
  @ApiResponse({
    status: 200,
    description: 'Profil utilisateur récupéré avec succès',
  })
  @ApiResponse({
    status: 401,
    description: 'Non autorisé',
  })
  getProfile(@Request() req) {
    return {
      message: 'Profil utilisateur récupéré avec succès',
      data: req.user,
      statusCode: 200,
    };
  }
} 