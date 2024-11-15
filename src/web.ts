import { WebPlugin } from '@capacitor/core';
import { KakaoPlugin } from './definitions';

declare const Kakao: any;

export class KakaoAuthWeb extends WebPlugin implements KakaoPlugin {
  constructor() {
    super();
  }

  loadScript() {
    if (typeof document === 'undefined') {
      return;
    }

    const scriptId = 'kakao-sdk';
    const scriptEl = document?.getElementById(scriptId);

    if (scriptEl) {
      return;
    }

    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');

    script.type = 'text/javascript';
    script.defer = true;
    script.async = true;
    script.id = scriptId;
    script.onload = this.platformJsLoaded.bind(this);
    script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
    head.appendChild(script);
  }

  initialize(appKey: string): Promise<void> {
    if (typeof window === 'undefined') {
    }

    return new Promise((resolve, reject) => {
      this.loadScript();
      (window as any).kakaoInitResolve = resolve;
      (window as any).kakaoInitReject = reject;
    }).then(() => {
      Kakao.init(appKey);
    });
  }

  platformJsLoaded() {
    (window as any).kakaoInitResolve();
  }

  async login() {
    return new Promise((resolve, reject) => {
      Kakao.Auth.login({
        success: (authObj:any) => {
          resolve(authObj);
        },
        fail: (err: any) => {
          reject(err);
        },
      });
    });
  }

  async logout() {
    return new Promise<void>((resolve) => {
      Kakao.Auth.logout(() => {
        resolve();
      });
    });
  }

  async goLogin() {
    return new Promise<{ 
      accessToken: string; 
      expiredAt: string; 
      expiresIn: string; 
      refreshToken: string; 
      idToken: string; 
      refreshTokenExpiredAt: string; 
      refreshTokenExpiresIn: string; 
      tokenType: string; 
    }>((/*resolve, reject*/) => {
      // Implement the method to return the expected type
    });
  }

  async goLogout() {
    // Implement the method
  }

  async getUserInfo() {
    return new Promise<{ value: any }>((/*resolve, reject*/) => {
      // Implement the method to return the expected type
    });
  }

  async sendLinkFeed() {
    // Implement the method
  }

  async talkInChannel() {
    // Implement the method
  }
}