import { InjectionToken } from '@angular/core';

export const API_CONFIG = new InjectionToken<ApiConfig>('API_CONFIG');

export interface ApiConfig {
  apiUrl?: string;
  apiClientID?: string;
  apiClientSecret?: string;
}
