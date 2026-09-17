import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus() {
    return {
      status: 'online',
      service: 'my-thing-backend',
      version: '1.0.0',
      modules: {
        archive: '/v1/archive',
        workshop: '/v1/workshop',
        forge: '/v1/forge',
        lens: '/v1/lens',
        rag: '/v1/rag',
      },
    };
  }
}
