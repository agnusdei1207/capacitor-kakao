import { WebPlugin } from '@capacitor/core';
import { KakaoPlugin } from './definitions';

declare const Kakao: any;

export class KakaoAuthWeb extends WebPlugin implements KakaoPlugin {
  constructor() {
    super();
  }
  goLogin(): Promise<{ accessToken: string; expiredAt: string; expiresIn: string; refreshToken: string; idToken: string; refreshTokenExpiredAt: string; refreshTokenExpiresIn: string; tokenType: string; }> {
    throw new Error('Method not implemented.');
  }
  goLogout(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  getUserInfo(): Promise<{ value: any; }> {
    throw new Error('Method not implemented.');
  }
  sendLinkFeed(options: { title: string; description: string; imageUrl: string; link: string; imageLinkUrl: string; buttonTitle: string; imageWidth?: number; imageHeight?: number; }): Promise<void> {
    throw new Error('Method not implemented.');
  }
  talkInChannel(options: { publicId: string; }): Promise<any> {
    throw new Error('Method not implemented.');
  }

}