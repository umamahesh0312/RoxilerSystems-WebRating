import { config } from '@config/env';

enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

const levelPriority = {
  [LogLevel.DEBUG]: 0,
  [LogLevel.INFO]: 1,
  [LogLevel.WARN]: 2,
  [LogLevel.ERROR]: 3,
};

class Logger {
  private currentLevel: LogLevel;

  constructor() {
    this.currentLevel = LogLevel[config.logging.level.toUpperCase() as keyof typeof LogLevel] || LogLevel.INFO;
  }

  private log(level: LogLevel, message: string, data?: any) {
    if (levelPriority[level] < levelPriority[this.currentLevel]) {
      return;
    }

    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level}] ${message}`;

    if (data) {
      console.log(logMessage, data);
    } else {
      console.log(logMessage);
    }
  }

  debug(message: string, data?: any) {
    this.log(LogLevel.DEBUG, message, data);
  }

  info(message: string, data?: any) {
    this.log(LogLevel.INFO, message, data);
  }

  warn(message: string, data?: any) {
    this.log(LogLevel.WARN, message, data);
  }

  error(message: string, data?: any) {
    this.log(LogLevel.ERROR, message, data);
  }
}

export const logger = new Logger();
