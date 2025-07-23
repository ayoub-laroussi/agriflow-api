FROM node:18-alpine

WORKDIR /app

# Installation des dépendances nécessaires
RUN apk add --no-cache postgresql-client bash

# Copie des fichiers de l'application
COPY package*.json ./
COPY tsconfig*.json ./
COPY seed-data.sql ./
COPY docker-entrypoint.sh ./

# Installation des dépendances
RUN npm install

# Copie du code source
COPY src/ ./src/

# Construction de l'application
RUN npm run build

# Rendre le script d'entrée exécutable
RUN chmod +x docker-entrypoint.sh

# Exposition du port
EXPOSE 3000

# Utilisation du script d'entrée comme point d'entrée
ENTRYPOINT ["./docker-entrypoint.sh"]

# Commande par défaut
CMD ["node", "dist/main"] 