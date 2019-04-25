import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

declare var localStorage;

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformServer(this.platformId)) {
      return;
    }
    if (!localStorage) {
      console.warn('LOCAL_STORAGE_NOT_SUPPORTED');
    }
  }

  get(key: string) {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    if (localStorage) {
      return localStorage.getItem(key);
    }
  }

  set(key, value) {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    if (localStorage) {
      return localStorage.setItem(key, value);
    }
  }

  remove(key) {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    if (localStorage) {
      return localStorage.removeItem(key);
    }
  }

}
