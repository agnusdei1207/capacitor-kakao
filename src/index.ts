import { registerPlugin } from '@capacitor/core';
import { KakaoPlugin } from './definitions';
export * from './definitions';

const KakaoPlugin = registerPlugin<KakaoPlugin>('KakaoPlugin', {
});

export { KakaoPlugin };

