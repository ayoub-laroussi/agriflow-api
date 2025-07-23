# Migrations TypeORM pour AgriFlow

Ce dossier contient les migrations de base de données pour le projet AgriFlow.

## Structure des migrations

- `migration-utils.ts` : Utilitaires pour faciliter la création et la gestion des migrations
- `1750611775137-PostRefactoring.ts` : Migration initiale qui crée la structure de base de données

## Commandes de migration

### Générer une nouvelle migration

Pour générer une nouvelle migration basée sur les changements d'entités :

```bash
npm run migration:generate -- src/migrations/NomDeLaMigration
```

### Exécuter les migrations

Pour appliquer toutes les migrations en attente :

```bash
npm run migration:run
```

### Annuler la dernière migration

Pour revenir à l'état précédent :

```bash
npm run migration:revert
```

## Bonnes pratiques

1. **Toujours utiliser les migrations** pour les modifications de schéma en production
2. **Désactiver la synchronisation automatique** (`synchronize: false`) en production
3. **Tester les migrations** avant de les déployer en production
4. **Versionner les migrations** dans le contrôle de source
5. **Utiliser les utilitaires** fournis dans `migration-utils.ts`
6. **Documenter les migrations** avec des commentaires explicites
7. **Respecter l'ordre des dépendances** lors de la création/suppression des tables

## Configuration

La configuration des migrations se trouve dans :
- `src/data-source.ts` : Configuration pour les commandes CLI de migration
- `src/config/typeorm.config.ts` : Configuration pour l'application NestJS

## Résolution des problèmes courants

### Erreur "Migration table not found"

Si vous rencontrez cette erreur, c'est que la table de migrations n'existe pas encore. La première exécution de `migration:run` la créera automatiquement.

### Conflit de migration

Si une migration échoue à mi-chemin, vous devrez peut-être nettoyer manuellement la base de données ou restaurer une sauvegarde avant de réessayer.

### Migrations non appliquées en production

Vérifiez que `migrationsRun` est défini sur `true` dans la configuration de production.

### Erreur "someClass is not a constructor"

Si vous rencontrez cette erreur lors de l'exécution des migrations, vous pouvez utiliser le script SQL directement :

1. Nous avons créé un fichier `migration.sql` qui contient toutes les commandes SQL nécessaires
2. Vous pouvez l'exécuter directement sur votre base de données avec la commande :

```bash
psql -U postgres -d agriflow -f migration.sql
```

Ou via l'interface pgAdmin ou tout autre client PostgreSQL.

Cette méthode contourne les problèmes potentiels avec TypeORM tout en appliquant les mêmes modifications à la base de données. 