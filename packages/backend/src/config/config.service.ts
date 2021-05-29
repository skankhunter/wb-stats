import { Injectable } from '@nestjs/common';

import { DEFAULT_CONFIG } from './config.default';
import { ConfigData } from './config.interface';

/**
 * Provides a means to access the application configuration.
 */
@Injectable()
export class ConfigService {
  private config: ConfigData;

  constructor(data: ConfigData = DEFAULT_CONFIG) {
    this.config = data;
  }

  /**
   * Loads the config from environment variables.
   */
  public loadFromEnv() {
    this.config = this.parseConfigFromEnv(process.env);
  }

  private parseConfigFromEnv(env: NodeJS.ProcessEnv): ConfigData {
    return {
      env: env.NODEE_NV || DEFAULT_CONFIG.env,
      port: env.NEST_PORT ? parseInt(env.NEST_PORT, 10) : DEFAULT_CONFIG.port,
      logLevel: env.LOG_LEVEL || DEFAULT_CONFIG.logLevel,
    };
  }
  /**
   * Retrieves the config.
   * @returns immutable view of the config data
   */
  public get(): Readonly<ConfigData> {
    return this.config;
  }
}