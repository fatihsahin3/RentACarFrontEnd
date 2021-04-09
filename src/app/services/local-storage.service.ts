import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  get(key: string): string | null {
    let value = localStorage.getItem(key);
    return value;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
