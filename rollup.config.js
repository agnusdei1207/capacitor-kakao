export default {
  input: 'dist/esm/index.js', // 입력 파일 (ESM 형식의 index.js)
  output: [
    {
      file: 'dist/plugin.js', // UMD 형식으로 출력될 파일
      format: 'umd', // UMD 형식
      name: 'capacitorKakao', // 전역 변수명으로 'capacitorKakao' 사용
      globals: {
        '@capacitor/core': 'capacitorExports', // 외부 라이브러리 처리 (Capacitor Core)
      },
      sourcemap: true, // 소스맵 생성
      inlineDynamicImports: true, // 동적 import 인라인 처리
    },
    {
      file: 'dist/plugin.esm.js', // ESM 형식으로 출력될 파일
      format: 'esm', // ESM 형식
      sourcemap: true, // 소스맵 생성
      inlineDynamicImports: true, // 동적 import 인라인 처리
    },
    {
      file: 'dist/plugin.cjs.js', // CommonJS 형식으로 출력될 파일
      format: 'cjs', // CommonJS 형식
      sourcemap: true, // 소스맵 생성
      inlineDynamicImports: true, // 동적 import 인라인 처리
    },
  ],
  external: ['@capacitor/core'], // 외부 의존성 설정
};
