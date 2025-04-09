/**
 * Service de planification des notifications
 * 
 * Ce service gère la planification et l'envoi des notifications récurrentes et programmées.
 * Il s'occupe de vérifier périodiquement les notifications à envoyer et de les traiter
 * selon les préférences des utilisateurs.
 * 
 * @module NotificationSchedulerService
 */
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThan } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationPreference } from './entities/notification-preference.entity';
import { CronJob } from '@nestjs/schedule/node_modules/cron';

/**
 * Service de planification des notifications
 */
@Injectable()
export class NotificationSchedulerService {
  private readonly logger = new Logger(NotificationSchedulerService.name);

  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(NotificationPreference)
    private notificationPreferenceRepository: Repository<NotificationPreference>,
    private schedulerRegistry: SchedulerRegistry,
  ) {
    // Initialisation des tâches planifiées lors du démarrage
    this.initScheduledJobs();
  }

  /**
   * Initialise les tâches planifiées pour les notifications récurrentes
   */
  private async initScheduledJobs(): Promise<void> {
    try {
      // Récupérer toutes les notifications récurrentes
      const recurringNotifications = await this.notificationRepository.find({
        where: {
          isRecurring: true,
          isSent: false,
        },
      });

      // Créer une tâche cron pour chaque notification récurrente
      recurringNotifications.forEach(notification => {
        this.scheduleRecurringNotification(notification);
      });

      this.logger.log(`${recurringNotifications.length} tâches récurrentes initialisées`);
    } catch (error) {
      this.logger.error('Erreur lors de l\'initialisation des tâches planifiées', error.stack);
    }
  }

  /**
   * Planifie une notification récurrente avec son pattern cron
   * 
   * @param {Notification} notification - La notification à planifier
   */
  scheduleRecurringNotification(notification: Notification): void {
    try {
      const { id, recurrencePattern } = notification;
      
      if (!recurrencePattern) {
        this.logger.warn(`Notification récurrente ${id} sans pattern cron`);
        return;
      }
      
      // Vérifier si une tâche existe déjà pour cette notification
      const jobName = `notification_${id}`;
      try {
        const existingJob = this.schedulerRegistry.getCronJob(jobName);
        if (existingJob) {
          this.logger.log(`Tâche ${jobName} déjà planifiée, mise à jour`);
          existingJob.stop();
          this.schedulerRegistry.deleteCronJob(jobName);
        }
      } catch (error) {
        // La tâche n'existe pas encore, c'est normal
      }
      
      // Créer un nouveau job cron en utilisant CronJob de @nestjs/schedule
      const job = new CronJob(recurrencePattern, () => {
        this.processNotification(id);
      });
      
      // Enregistrer le job dans le registry
      this.schedulerRegistry.addCronJob(jobName, job);
      
      // Démarrer le job
      job.start();
      
      this.logger.log(`Notification récurrente ${id} planifiée avec pattern: ${recurrencePattern}`);
    } catch (error) {
      this.logger.error(`Erreur lors de la planification de la notification ${notification.id}`, error.stack);
    }
  }

  /**
   * Traite une notification en l'envoyant selon les préférences de l'utilisateur
   * 
   * @param {string} notificationId - ID de la notification à traiter
   */
  async processNotification(notificationId: string): Promise<void> {
    try {
      // Récupérer la notification
      const notification = await this.notificationRepository.findOne({
        where: { id: notificationId },
        relations: ['user'],
      });
      
      if (!notification) {
        this.logger.warn(`Notification ${notificationId} non trouvée`);
        return;
      }
      
      // Récupérer les préférences de l'utilisateur
      const preferences = await this.notificationPreferenceRepository.findOne({
        where: { userId: Number(notification.userId) },
      });
      
      // Vérifier si les notifications sont activées pour cet utilisateur
      // Vérifiez les préférences par défaut ou email/push/sms si isEnabled n'existe pas
      if (preferences) {
        // Vérifier si toutes les préférences principales sont désactivées
        const allDisabled = !preferences.emailEnabled && 
                           !preferences.pushEnabled && 
                           !preferences.smsEnabled;
        
        if (allDisabled) {
          this.logger.log(`Notifications désactivées pour l'utilisateur ${notification.userId}`);
          return;
        }
      }
      
      // Vérifier si ce type de notification est activé
      if (preferences && 
          preferences.enabledTypes && 
          !preferences.enabledTypes.includes(notification.type)) {
        this.logger.log(`Type de notification ${notification.type} désactivé pour l'utilisateur ${notification.userId}`);
        return;
      }
      
      // Envoyer la notification via les canaux actifs
      await this.sendNotification(notification, preferences);
      
      // Mettre à jour le statut de la notification
      notification.isSent = true;
      notification.sentDate = new Date();
      await this.notificationRepository.save(notification);
      
      this.logger.log(`Notification ${notificationId} envoyée à l'utilisateur ${notification.userId}`);
    } catch (error) {
      this.logger.error(`Erreur lors du traitement de la notification ${notificationId}`, error.stack);
    }
  }

  /**
   * Envoie une notification en utilisant les canaux préférés de l'utilisateur
   * 
   * @param {Notification} notification - La notification à envoyer
   * @param {NotificationPreference | null} preferences - Les préférences de l'utilisateur
   * @returns {Promise<void>}
   */
  private async sendNotification(
    notification: Notification,
    preferences: NotificationPreference | null
  ): Promise<void> {
    // Utiliser des valeurs par défaut si les préférences sont null
    const defaultChannels = ['application'];
    
    // Enregistrer dans les logs les canaux utilisés
    const channels = preferences?.enabledChannels || defaultChannels;
    this.logger.log(`Envoi de la notification ${notification.id} via: ${channels.join(', ')}`);
    
    // Simulation d'envoi par canal
    channels.forEach(channel => {
      switch (channel) {
        case 'email':
          this.logger.log(`Simulation d'envoi d'email à ${preferences?.email || 'adresse inconnue'}`);
          break;
        case 'push':
          this.logger.log(`Simulation d'envoi de notification push`);
          break;
        case 'sms':
          this.logger.log(`Simulation d'envoi de SMS à ${preferences?.phone || 'numéro inconnu'}`);
          break;
        case 'application':
        default:
          this.logger.log(`Notification enregistrée dans l'application`);
          break;
      }
    });
  }

  /**
   * Vérifie les notifications planifiées à envoyer
   * Exécuté toutes les minutes
   */
  @Cron(CronExpression.EVERY_MINUTE)
  async checkScheduledNotifications(): Promise<void> {
    const now = new Date();
    this.logger.debug('Vérification des notifications planifiées');
    
    try {
      // Récupérer les notifications planifiées à envoyer (date prévue <= maintenant, non envoyées, non récurrentes)
      const notifications = await this.notificationRepository.find({
        where: {
          scheduledDate: LessThanOrEqual(now),
          isSent: false,
          isRecurring: false,
        },
        relations: ['user'],
      });
      
      if (notifications.length === 0) {
        return;
      }
      
      this.logger.log(`${notifications.length} notifications planifiées à envoyer`);
      
      // Traiter chaque notification
      for (const notification of notifications) {
        await this.processNotification(notification.id);
      }
    } catch (error) {
      this.logger.error('Erreur lors de la vérification des notifications planifiées', error.stack);
    }
  }

  /**
   * Nettoie les notifications envoyées anciennes
   * Exécuté une fois par jour à minuit
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cleanOldNotifications(): Promise<void> {
    try {
      // Supprimer les notifications envoyées il y a plus de 30 jours
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const result = await this.notificationRepository.delete({
        isSent: true,
        sentDate: LessThanOrEqual(thirtyDaysAgo),
        isRecurring: false, // Ne pas supprimer les notifications récurrentes
      });
      
      this.logger.log(`${result.affected} anciennes notifications supprimées`);
    } catch (error) {
      this.logger.error('Erreur lors du nettoyage des anciennes notifications', error.stack);
    }
  }
} 