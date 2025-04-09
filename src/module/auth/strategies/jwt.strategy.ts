/**
 * Stratégie JWT pour Passport
 * 
 * Cette stratégie permet de valider les tokens JWT et d'extraire les informations
 * de l'utilisateur à partir du payload du token.
 * 
 * @module JwtStrategy
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';

/**
 * Interface du payload JWT
 */
interface JwtPayload {
  sub: string;
  email: string;
}

/**
 * Stratégie JWT pour Passport
 * 
 * Valide les tokens JWT et extrait les informations de l'utilisateur.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET', 'defaultSecretKey'),
    });
  }

  /**
   * Valide le payload du token JWT et retourne l'utilisateur associé
   * 
   * @param payload Le payload du token JWT
   * @returns L'utilisateur associé au token
   * @throws UnauthorizedException si l'utilisateur n'est pas trouvé
   */
  async validate(payload: JwtPayload) {
    const user = await this.userService.findOneByEmail(payload.email);
    
    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }
    
    return user;
  }
} 