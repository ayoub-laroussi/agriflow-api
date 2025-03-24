export interface ApiResponse<T> {
  message: string;    // Description du résultat de l'opération
  data?: T;          // Données optionnelles de la réponse
  statusCode: number; // Code HTTP de la réponse
}

// Exemple d'utilisation pour le contrôleur App
export interface HelloResponse extends ApiResponse<string> {} 