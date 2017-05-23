import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  constructor() {
    if (!localStorage) {
      console.warn('LOCAL_STORAGE_NOT_SUPPORTED');
    }
  }

  get(key: string) {
    if (localStorage) {
      return localStorage.getItem(key);
    }
  }

  set(key, value) {
    if (localStorage) {
      return localStorage.setItem(key, value);
    }
  }

  remove(key) {
    if (localStorage) {
      return localStorage.removeItem(key);
    }
  }

}
