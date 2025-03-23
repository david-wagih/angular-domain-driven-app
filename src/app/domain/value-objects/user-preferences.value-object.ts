export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
}

export interface ThemePreferences {
  mode: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
}

export class UserPreferences {
  private constructor(
    private readonly notifications: NotificationPreferences,
    private readonly theme: ThemePreferences,
    private readonly language: string,
    private readonly timezone: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.language || this.language.trim().length === 0) {
      throw new Error('Language is required');
    }
    if (!this.timezone || this.timezone.trim().length === 0) {
      throw new Error('Timezone is required');
    }
  }

  static create(
    notifications: NotificationPreferences,
    theme: ThemePreferences,
    language: string,
    timezone: string
  ): UserPreferences {
    return new UserPreferences(
      notifications,
      theme,
      language.trim(),
      timezone.trim()
    );
  }

  getNotifications(): NotificationPreferences {
    return { ...this.notifications };
  }

  getTheme(): ThemePreferences {
    return { ...this.theme };
  }

  getLanguage(): string {
    return this.language;
  }

  getTimezone(): string {
    return this.timezone;
  }

  updateNotifications(notifications: Partial<NotificationPreferences>): UserPreferences {
    return UserPreferences.create(
      { ...this.notifications, ...notifications },
      this.theme,
      this.language,
      this.timezone
    );
  }

  updateTheme(theme: Partial<ThemePreferences>): UserPreferences {
    return UserPreferences.create(
      this.notifications,
      { ...this.theme, ...theme },
      this.language,
      this.timezone
    );
  }

  updateLanguage(language: string): UserPreferences {
    return UserPreferences.create(
      this.notifications,
      this.theme,
      language,
      this.timezone
    );
  }

  updateTimezone(timezone: string): UserPreferences {
    return UserPreferences.create(
      this.notifications,
      this.theme,
      this.language,
      timezone
    );
  }

  equals(other: UserPreferences): boolean {
    return (
      JSON.stringify(this.notifications) === JSON.stringify(other.notifications) &&
      JSON.stringify(this.theme) === JSON.stringify(other.theme) &&
      this.language === other.language &&
      this.timezone === other.timezone
    );
  }
} 