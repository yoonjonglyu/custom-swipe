# AGENT.md: Custom-Swipe Project Guide

## 1. 프로젝트 개요 (Overview)
`custom-swipe`는 웹 애플리케이션에서 부드럽고 가벼운 터치/마우스 스와이프 경험을 제공하기 위한 **초경량(Lightweight) & 헤드리스(Headless) 멀티 프레임워크 스와이프 라이브러리 모노레포**입니다.

- **핵심 목표**: 무거운 외부 라이브러리 의존성 없이 순수 자바스크립트/CSS 변환(`transform`, `transition`)으로 고성능 스와이프 구현
- **주요 특징**:
  - **헤드리스 훅/컴포저블**: 개발자가 UI 렌더링을 완전히 제어할 수 있는 API 제공 (`useSwipe`)
  - **기본 UI 컴포넌트 제공**: 쉬운 도입을 위한 기본 컴포넌트(`<Swipe>`, `<Carousel>`) 내장
  - **URL & Browser History 동기화**: 스와이프 인덱스를 쿼리 스트링(`?index=N`) 및 History API(`pushState`/`replaceState`)와 연동 가능
  - **멀티 프레임워크 지원**: 동일한 코어 비즈니스 로직을 기반으로 React, Vue, Svelte, Web Components 생태계 지원
- **패키지 관리 구조**: Lerna (`^5.2.0`) + Yarn Workspaces (v1)

---

## 2. 모노레포 패키지 구성 (Packages)

| 패키지 디렉토리 | NPM 패키지명 | 버전 | 설명 및 주요 기술 스택 |
|---|---|---|---|
| `packages/core` | `swipe-core-provider` | `1.1.0` | 플랫폼 독립적인 핵심 스와이프 엔진 (상태 머신, 좌표/오프셋 계산, 히스토리 연동) |
| `packages/react-custom-swipe` | `react-custom-swipe` | `1.3.0` | React 18용 훅(`useSwipe`) 및 `<Swipe />`, `<Carousel />` 컴포넌트 |
| `packages/vue-custom-swipe` | `vue-custom-swipe` | `1.1.0` | Vue 3용 컴포저블(`useSwipe`) 및 `<Swipe />` 컴포넌트 (Vite 4 기반 UMD/ESM 듀얼 빌드) |
| `packages/svelte-custom-swipe` | `svelte-custom-swipe` | `0.1.0` | Svelte 4용 훅(`useSwipe`) 및 컴포넌트 (SvelteKit + `@sveltejs/package` 기반) |
| `packages/custom-swipe` | `custom-swipe` | `0.1.0` | 바닐라 JS 및 표준 웹 컴포넌트(`defineSwipe`) 지원 |
| `packages/demo` | `react-custom-swipe-demo` | `1.0.0` | React + Styled-components + Webpack 5 기반 GitHub Pages 배포용 라이브 데모 |


---

## 3. 핵심 아키텍처 및 동작 원리 (Core Architecture)

### 3.1 코어 엔진 (`packages/core`) 구조
코어 엔진은 프레임워크에 종속되지 않는 순수 TypeScript 로직으로 구성되어 있습니다.

```
packages/core/src/
├── index.ts              # Entry point: SwipeProvider 내보내기
├── provider.ts           # SwipeProvider: 인스턴스 생성 및 통합 이벤트 어댑터 제공
├── state.ts              # SwipeState: 스와이프 내부 상태 머신 클래스
├── swipeEvents.ts        # swipestart, swipeMove, swipeEnd: 터치/마우스 이벤트 처리 및 DOM 변환
├── swipeData.ts          # getStart, getMove, getEnd: 터치/마우스 좌표 정규화 및 오프셋 계산
├── otherEvent.ts         # OtherEvents: 윈도우 리사이즈, 히스토리(URL) 동기화, 수동 슬라이드 제어
├── uri.ts                # getSearchParams, setHistory, changeHistory: 브라우저 URL 쿼리 제어 유틸
└── checkUserAgent.ts     # 모바일 디바이스 감지 (중복 이벤트 트리거 방지)
```

### 3.2 스와이프 라이프사이클 및 상태 전이
- **상태 관리 (`SwipeState`)**:
  - `wait`: 대기 상태 (이벤트 수신 가능)
  - `pending`: 사용자가 터치/클릭 후 드래그 중인 상태
  - `disable`: 스와이프 종료 후 관성 이동 및 애니메이션 전환 진행 중인 쿨다운 상태 (`333ms`)
- **이벤트 파이프라인**:
  1. **Start (`swipestart`)**: 터치/마우스 시작 좌표(`startX`, `startY`) 기록, 상태를 `pending`으로 전이.
  2. **Move (`swipeMove`)**: 
     - 축 방향(`row` vs `column`)에 따라 직교 방향 오차(`shake`) 필터링 (의도치 않은 스크롤 방지).
     - DOM 대상 요소의 `transition = 'none'` 처리 후 실시간 `transform: translate*` 적용.
  3. **End (`swipeEnd`)**:
     - 플릭 제스처 판정: 이동 거리가 요소 크기의 50% 이상이거나, 제스처 지속 시간이 `200ms` 미만인 빠른 스와이프인 경우 인덱스 증감.
     - `transition = '333ms'` 복구 후 목표 인덱스 위치로 안착.
     - 히스토리 옵션(`isHistory`)이 활성화된 경우 URL 쿼리 파라미터 갱신.

---

## 4. 디렉토리 구조 요약 (Directory Structure)

```text
custom-swipe/
├── .github/                # GitHub 설정 및 워크플로우
├── packages/
│   ├── core/               # swipe-core-provider (코어 비즈니스 로직)
│   ├── react-custom-swipe/ # React 어댑터 패키지
│   ├── vue-custom-swipe/   # Vue 3 어댑터 패키지
│   ├── svelte-custom-swipe/# Svelte 어댑터 패키지
│   ├── custom-swipe/       # Web Components / Vanilla JS 패키지
│   └── demo/               # 데모 웹사이트 (Webpack + React)
├── lerna.json              # Lerna 모노레포 설정
├── package.json            # 루트 워크스페이스 정의 및 통합 스크립트
├── yarn.lock               # 의존성 잠금 파일
└── README.md               # 프로젝트 안내 문서
```

---

## 5. 빌드 및 개발 스크립트 (Scripts & Workflows)

### 5.1 루트 레벨 명령어
- **React 패키지 빌드**:
  ```bash
  yarn reactbuild
  ```
- **React 패키지 타입 선언 파일 생성**:
  ```bash
  yarn postreactbuild
  ```

### 5.2 각 패키지별 주요 명령어
- **`packages/core`**:
  - 빌드: `yarn workspace swipe-core-provider publish:npm`
  - 타입 방출: `yarn workspace swipe-core-provider publish:type`
- **`packages/vue-custom-swipe`**:
  - 개발 서버: `yarn workspace vue-custom-swipe dev`
  - 빌드: `yarn workspace vue-custom-swipe build`
- **`packages/svelte-custom-swipe`**:
  - 빌드 및 패키징: `yarn workspace svelte-custom-swipe build`
- **`packages/demo`**:
  - 로컬 개발: `yarn workspace react-custom-swipe-demo dev`
  - 프로덕션 빌드: `yarn workspace react-custom-swipe-demo build`
  - 데모 배포: `yarn workspace react-custom-swipe-demo deploy` (GitHub Pages)

---

## 6. 개발 및 에이전트 작업 가이드라인 (Agent Guidelines)

### 6.1 코드 수정 및 기능 추가 시 원칙
1. **단일 진실 공급원(Single Source of Truth) 유지**:
   - 스와이프 계산 공식, 좌표 보정, 브라우저 히스토리 동기화 등 핵심 제스처 로직은 반드시 `packages/core`에서 수정/확장해야 합니다.
   - 각 프레임워크 래퍼(`react-*`, `vue-*`, `svelte-*`)는 Core의 API를 해당 프레임워크의 관례(Hook, Composable, Action)에 맞게 연결하는 어댑터 역할만 수행해야 합니다.
2. **의존성 경량성 보존**:
   - 코어 및 래퍼 라이브러리에 불필요한 서드파티 런타임 의존성을 추가하지 마십시오.
3. **크로스 브라우징 및 이벤트 대응**:
   - 터치 이벤트(`TouchEvent`)와 포인터/마우스 이벤트(`MouseEvent`)가 동시에 지원되므로 데스크톱과 모바일 분기 로직(`checkUserAgent.ts`)의 영향을 유의해야 합니다.
4. **스타일 격리**:
   - 컴포넌트 스타일은 최소한의 필수 레이아웃 스타일(`overflow: hidden`, `display: flex` 등)만 클래스로 제공하며 사용자의 커스텀 CSS 적용을 방해하지 않아야 합니다.

---

## 7. 해결된 주요 문제점 및 개선 사항 (Resolved Issues & Improvements)

최근 코드베이스 분석을 통해 다음 핵심 문제점들이 해결 및 개선되었습니다.

1. **치명적인 성능 병목 제거 (10ms Polling Anti-Pattern 해결)**:
   - **기존 문제**: `isHistory: true` 시 URL 변경 감지를 위해 `setInterval(initCb, 10)`으로 1초에 100회씩 DOM 스타일(`getComputedStyle`) 및 URL 파싱을 폴링하여 심각한 CPU/배터리 낭비 유발.
   - **개선**: 10ms 폴링을 전면 제거하고 표준 브라우저 이벤트인 `window.addEventListener('popstate', initCb)` 기반의 리액티브 이벤트 리스너로 교체.
2. **이벤트 리스너 메모리 누수(Memory Leak) 차단**:
   - **기존 문제**: `svelte-custom-swipe`의 `onDestroy`에서 마우스 및 터치 이벤트 리스너가 정리되지 않고 방치됨.
   - **개선**: 컴포넌트 해제 시 등록된 모든 DOM 이벤트 리스너(`mousedown`, `mousemove`, `mouseup`, `touchstart` 등)를 철저히 해제하도록 보강.
3. **런타임 크래시 방어 (DOM Null Pointer & TypeError 방지)**:
   - **기존 문제**: `target.children[0]`에 직접 접근하여 자식이 없거나 렌더링 지연 시 `TypeError: Cannot read properties of undefined` 크래시 발생.
   - **개선**: `target` 및 `target.children[0]`에 대한 Null 안전 가드 추가 및 fallback 크기 계산 로직 적용.
4. **SSR (Server-Side Rendering) 환경 완벽 지원**:
   - **기존 문제**: `window`, `location`, `history`, `navigator`에 직접 접근하여 Next.js/Nuxt/SvelteKit SSR 빌드 시 `ReferenceError` 발생.
   - **개선**: 모든 브라우저 API 접근부에 `typeof window !== 'undefined'`, `typeof navigator !== 'undefined'` 가드 적용.
5. **터치/마우스 하이브리드 입력 및 모바일 에뮬레이터 지원**:
   - **기존 문제**: `checkMobile()` 판별 시 데스크톱 마우스 이벤트를 일괄 무시하여 터치스크린 노트북, 마우스 연결 태블릿, PC 모바일 뷰 에뮬레이터에서 마우스 드래그 불가.
   - **개선**: 정규식 `/g` 플래그 제거 및 타임스탬프 기반 터치-마우스 합성 이벤트 디바운싱(`500ms`) 패턴 도입.
6. **제스처 방향 명칭 오류 및 직교 제스처 처리 보정**:
   - **기존 문제**: `verticalSwipe`가 가로(row) 스와이프를, `horizontalSwipe`가 세로(column) 스와이프를 담당하던 뒤바뀐 명칭을 `handleRowSwipe`, `handleColumnSwipe`로 정상화.
7. **Web Components 불리언 파싱 및 컴포넌트 제약 개선**:
   - `custom-swipe`에서 `<custom-swipe ishistory="false">` 작성 시 문자열이 truthy로 취급되던 버그 수정.
   - React, Vue, Svelte 컴포넌트에서 `isHistory: true` 모드에서도 캐러셀 좌우 버튼과 도트 인디케이터가 정상 동작할 수 있도록 제약 완화.
8. **루트 빌드 스크립트 및 모노레포 타입 경로 매핑 추가**:
   - 루트 `package.json`에 `build:core`, `build:react`, `build:vue`, `build:svelte`, `build:all` 추가.
   - 각 패키지의 `tsconfig.json`에 `paths` 매핑을 적용하여 모노레포 내부 의존성 타입 해석 안정화.
9. **단위 테스트 스위트(Jest) 구축 및 15개 케이스 통과**:
   - `packages/core`에 Jest + Babel 환경을 구축하고 `SwipeState`, `swipeData`, `uri`, `provider`에 대한 15개 단위 테스트 작성 및 통과 (`yarn test:core`).
10. **무한 루프 스와이프 (`isInfinite`) 기능 완성**:
    - `isInfinite: true` 옵션 추가로 경계(0번 및 마지막 인덱스) 초과 시 첫 번째/마지막 슬라이드로 매끄럽게 순환하는 모듈로 계산 로직 탑재.
11. **크로스 플랫폼 빌드 호환성 개선 (`rimraf`)**:
    - Windows 환경에서 실패하던 Unix `rm -rf` 명령어를 크로스 플랫폼 CLI인 `rimraf dist`로 교체하여 OS 제약 없는 빌드 보장.
12. **GitHub Actions CI 워크플로우 구성 (`.github/workflows/ci.yml`)**:
    - Node 18, Node 20 매트릭스 환경에서 자동 의존성 설치, 단위 테스트(`test:core`), 전체 패키지 빌드(`build:all`)를 검증하는 지속적 통합 파이프라인 완성.

---

## 8. 향후 권장 작업 (Roadmap)

1. **모노레포 빌드 도구 현대화**:
   - Lerna 5 + Yarn v1 환경을 최신 pnpm Workspaces 또는 Turborepo로 전환하여 빌드 캐싱 및 패키지 간 의존성 최적화.
2. **최신 프레임워크 런타임 검증**:
   - React 19, Vue 3.4+, Svelte 5(Runes API) 공식 호환성 검증 및 추가.


