# TodayEng - 프론트엔드

매일 영어를 학습할 수 있는 PWA 웹 애플리케이션입니다.

## 기술 스택

- **React 19** — UI 컴포넌트 라이브러리
- **TypeScript** — 정적 타입 검사
- **Vite 8** — 빌드 도구 및 개발 서버
- **Tailwind CSS** — 유틸리티 기반 CSS 프레임워크
- **PWA (vite-plugin-pwa)** — 오프라인 지원 및 앱 설치 가능
- **Oxlint** — 빠른 JavaScript/TypeScript 린터

## 시작하기

### 의존성 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

`http://localhost:5173` 에서 앱을 확인할 수 있습니다.

### 프로덕션 빌드

```bash
npm run build
```

### 빌드 결과물 미리보기

```bash
npm run preview
```

### 린트 실행

```bash
npm run lint
```

## 프로젝트 구조

```
src/
├── features/               # 기능별 모듈 (팀원이 기능 단위로 담당)
│   └── auth/               # 로그인 / 회원가입
│       ├── components/
│       ├── hooks/
│       └── api.ts
├── shared/                 # 여러 기능에서 공유하는 코드
│   ├── components/         # 공용 UI 컴포넌트 (Button, Input...)
│   ├── hooks/              # 공용 커스텀 훅
│   └── types/              # 공통 TypeScript 타입
├── pages/                  # 라우트 진입점 (얇게 유지)
├── assets/                 # 이미지, 폰트 등 정적 자산
├── App.tsx
├── main.tsx
└── index.css
```

> 새 기능을 추가할 때는 `features/` 아래에 새 폴더를 만들고, 여러 기능에서 쓰는 것만 `shared/`로 올립니다.

## PWA 설정

이 앱은 PWA로 구성되어 있어 모바일 홈 화면에 설치하거나 오프라인 상태에서도 사용할 수 있습니다.

- 서비스 워커 자동 업데이트 (`registerType: 'autoUpdate'`)
- 192×192, 512×512 앱 아이콘 지원
- 독립 실행형(`standalone`) 디스플레이 모드
