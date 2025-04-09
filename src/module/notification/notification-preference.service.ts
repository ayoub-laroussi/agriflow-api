import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationPreference } from './entities/notification-preference.entity';
import { CreateNotificationPreferenceDto } from './dto/create-notification-preference.dto';
import { UpdateNotificationPreferenceDto } from './dto/update-notification-preference.dto';

@Injectable()
export class NotificationPreferenceService {
  constructor(
    @InjectRepository(NotificationPreference)
    private notificationPreferenceRepository: Repository<NotificationPreference>,
  ) {}

  async create(createNotificationPreferenceDto: CreateNotificationPreferenceDto): Promise<NotificationPreference> {
    // Conversion des types si nécessaire
    const dto = {
      ...createNotificationPreferenceDto,
      userId: Number(createNotificationPreferenceDto.userId)
    };
    
    const preference = this.notificationPreferenceRepository.create(dto);
    return this.notificationPreferenceRepository.save(preference);
  }

  async createOrUpdate(createDto: CreateNotificationPreferenceDto): Promise<NotificationPreference> {
    // Conversion des types si nécessaire
    const userId = Number(createDto.userId);
    
    // Vérifier si les préférences existent déjà
    const existingPreferences = await this.findByUserId(userId);
    
    if (existingPreferences) {
      // Mise à jour des préférences existantes
      const updatedPreferences = await this.update(existingPreferences.id, createDto);
      // Si null, retourner les préférences existantes pour éviter de retourner null
      return updatedPreferences || existingPreferences;
    } else {
      // Création de nouvelles préférences
      return this.create(createDto);
    }
  }

  async findAll(): Promise<NotificationPreference[]> {
    return this.notificationPreferenceRepository.find();
  }

  async findOne(id: string | number): Promise<NotificationPreference | null> {
    const numericId = typeof id === 'string' ? Number(id) : id;
    return this.notificationPreferenceRepository.findOneBy({ id: numericId });
  }

  async findByUserId(userId: string | number): Promise<NotificationPreference | null> {
    const numericUserId = typeof userId === 'string' ? Number(userId) : userId;
    return this.notificationPreferenceRepository.findOneBy({ userId: numericUserId });
  }

  async update(id: string | number, updateDto: UpdateNotificationPreferenceDto): Promise<NotificationPreference | null> {
    const numericId = typeof id === 'string' ? Number(id) : id;
    
    // Conversion des types si nécessaire
    const dto: any = { ...updateDto };
    if (dto.userId !== undefined) {
      dto.userId = Number(dto.userId);
    }
    
    await this.notificationPreferenceRepository.update(numericId, dto);
    return this.findOne(numericId);
  }

  async remove(id: string | number): Promise<void> {
    const numericId = typeof id === 'string' ? Number(id) : id;
    await this.notificationPreferenceRepository.delete(numericId);
  }
} 