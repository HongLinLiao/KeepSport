import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Config } from '../interfaces/Config.interface';

@Injectable()
export class AppConfig {
  constructor(private readonly _config: ConfigService) {}

  getConfig(): Config {
    return this._config.get<Config>('config');
  }
}
