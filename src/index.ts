import { registerPlugin } from '@capacitor/core';
import { KakaoPlugin } from './definitions';

const KakaoPlugin = registerPlugin<KakaoPlugin>('KakaoPlugin', {
  web: () => import('./web').then(m => new m.KakaoAuthWeb()),
});

export * from './definitions';
export { KakaoPlugin };

