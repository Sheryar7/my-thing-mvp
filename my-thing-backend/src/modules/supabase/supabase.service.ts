import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import WebSocket from 'ws';

@Injectable()
export class SupabaseService {
  public client: SupabaseClient;
  private readonly logger = new Logger(SupabaseService.name);

  constructor(private readonly configService: ConfigService) {
    const url =
      this.configService.get<string>('SUPABASE_URL') ||
      process.env.SUPABASE_URL;
    const key =
      this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY') ||
      this.configService.get<string>('SUPABASE_ANON_KEY') ||
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      this.logger.warn('Supabase URL or Key not set. Supabase client could not be initialized.');
      return;
    }

    this.client = createClient(url, key, {
      auth: { persistSession: false },
      realtime: {
        transport: WebSocket as any,
      },
    });

    this.logger.log('Global Supabase Service initialized successfully.');
  }

  getClient(): SupabaseClient {
    return this.client;
  }
}
