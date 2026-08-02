import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import WebSocket from 'ws';

@Injectable()
export class SupabaseProvider {
  public client: SupabaseClient;
  private readonly logger = new Logger(SupabaseProvider.name);

  constructor(private readonly configService: ConfigService) {
    const url =
      this.configService.get<string>('SUPABASE_URL') ||
      process.env.SUPABASE_URL;
    const key =
      this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY') ||
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      throw new Error('Missing Supabase configuration environment variables.');
    }

    this.client = createClient(url, key, {
      auth: { persistSession: false },
      realtime: {
        transport: WebSocket as any, // Type assertion to satisfy the Supabase client type requirements
      },
    });

    this.logger.log('Supabase Provider initialized successfully.');
  }
}