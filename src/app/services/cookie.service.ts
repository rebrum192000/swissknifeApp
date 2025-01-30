import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CookieService {
  setCookie(name: string, value: string, days: number) {
      const expires = new Date(Date.now() + days * 864e5).toUTCString();
      document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
  }

  getCookie(name: string) {
      return document.cookie.split('; ').reduce((r, v) => {
          const parts = v.split('=');
          return parts[0] === name ? decodeURIComponent(parts[1]) : r;
      }, '');
  }
}
