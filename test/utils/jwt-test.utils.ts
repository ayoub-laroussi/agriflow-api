/**
 * Utilitaires pour les tests JWT
 * 
 * Ce fichier contient des fonctions utilitaires pour gérer les JWT dans les tests.
 * Permet de générer des clés et des tokens pour les tests d'intégration et e2e.
 */
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';

/**
 * Interface pour les paires de clés
 */
export interface KeyPair {
  privateKey: string;
  publicKey: string;
}

/**
 * Génère une paire de clés asymétriques pour les JWT
 * 
 * @returns Une paire de clés (privée et publique)
 */
export function generateKeyPair(): KeyPair {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  });

  return { privateKey, publicKey };
}

/**
 * Génère un token JWT pour les tests
 * 
 * @param payload Le contenu du token
 * @param privateKey La clé privée pour signer le token
 * @param options Options pour la génération du token
 * @returns Le token JWT généré
 */
export function generateTestToken(
  payload: Record<string, any>,
  privateKey: string,
  options: jwt.SignOptions = { expiresIn: '1h' }
): string {
  return jwt.sign(payload, privateKey, options);
}

/**
 * Vérifie un token JWT pour les tests
 * 
 * @param token Le token à vérifier
 * @param publicKey La clé publique pour vérifier la signature
 * @returns Le payload décodé si le token est valide
 */
export function verifyTestToken(token: string, publicKey: string): any {
  return jwt.verify(token, publicKey);
}

/**
 * Configuration JWT pour les tests
 */
export const jwtTestConfig = {
  secret: 'test-secret-key-for-integration-testing-purposes-only',
  expiresIn: '1h'
};

/**
 * Génère un token de test avec la configuration standard
 * 
 * @param payload Le contenu du token
 * @returns Le token JWT généré
 */
export function generateStandardTestToken(payload: Record<string, any>): string {
  return jwt.sign(payload, jwtTestConfig.secret, { expiresIn: jwtTestConfig.expiresIn });
} 