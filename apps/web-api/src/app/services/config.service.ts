import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IConfig } from '../interfaces/Config.interface';

@Injectable()
export class AppConfig {
  constructor(private readonly _config: ConfigService) {}

  getConfig(): IConfig {
    return this._config.get<IConfig>('config');
  }
}
