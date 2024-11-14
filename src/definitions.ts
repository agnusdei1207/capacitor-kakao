/// <reference types="@capacitor/cli" />

export interface KakaoPlugin {
  goLogin(): Promise<{
    accessToken: string;
    expiredAt: string;
    expiresIn: string;
    refreshToken: string;
    idToken: string;
    refreshTokenExpiredAt: string;
    refreshTokenExpiresIn: string;
    tokenType: string;
  }>;
  goLogout(): Promise<any>;
  getUserInfo(): Promise<{ value: any }>;
  sendLinkFeed(options: {
    title: string;
    description: string;
    imageUrl: string;
    link: string;
    imageLinkUrl: string;
    buttonTitle: string;
    imageWidth?: number;
    imageHeight?: number;
  }): Promise<void>;
  talkInChannel(options: { publicId: string }): Promise<any>;
}

declare module '@capacitor/cli' {
  export interface KakaoPlugin {
    CapacitorKakao?: {
      /**
       * The client ID of the application.
       */
      clientId?: string;
      /**
       * The client secret of the application.
       */
      clientSecret?: string;
      /**
       * The client name of the application.
       */
      clientName?: string;
      urlScheme?: string;
      // useNaverApp?: boolean;
    };
  }
}
