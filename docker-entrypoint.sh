#!/bin/bash
set -e

# Attendre que la base de données PostgreSQL soit prête
echo "Attente de la disponibilité de PostgreSQL..."
until PGPASSWORD=$POSTGRES_PASSWORD psql -h $POSTGRES_HOST -U $POSTGRES_USER -d $POSTGRES_DB -c '\q'; do
  echo "PostgreSQL n'est pas encore disponible - attente..."
  sleep 2
done
echo "PostgreSQL est prêt !"

# Exécuter les migrations si elles existent
if [ -d "src/migrations" ]; then
  echo "Exécution des migrations..."
  npm run migration:run
fi

# Injecter les données de test
echo "Injection des données de test..."
PGPASSWORD=$POSTGRES_PASSWORD psql -h $POSTGRES_HOST -U $POSTGRES_USER -d $POSTGRES_DB -f seed-data.sql

# Démarrer l'application
echo "Démarrage de l'application..."
exec "$@" 