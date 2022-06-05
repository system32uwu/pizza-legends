import { Injectable, Logger } from '@nestjs/common';
import { WriteLoggerDto } from './dto/write-logger.dto';

import { readFile, writeFile } from 'fs/promises';

const fPath = 'pizza-legends.log';

@Injectable()
export class LoggerService {
  private readonly logger = new Logger(LoggerService.name);

  async setup() {
    try {
      await readFile(fPath, 'utf8');
    } catch (e) {
      this.logger.log('Logger file not found, creating one...');
    } finally {
      return await writeFile(fPath, '', 'utf8');
    }
  }

  async read() {
    return await readFile(fPath, 'utf8');
  }

  async write({ title, message, cause }: WriteLoggerDto) {
    const d = new Date().toJSON();
    const ds = d.split('T');

    let log = '';

    const logHistory = await this.read();

    if (logHistory.indexOf(ds[0]) === -1) {
      log += `
${ds[0]}
`;
    }

    log += `
---
-${cause}-
➦ [ ${title} ] [ ${ds[1].split('.')[0]} ]
${message}
---
`;

    this.logger.log(log);
    await writeFile(fPath, logHistory + log, 'utf8');
    return Promise.resolve();
  }
}
