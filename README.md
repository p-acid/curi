## 기술 스택

### Core
- **Next.js 16.0.2** (App Router)
- **React 19.2.0**
- **TypeScript 5**

### 스타일링
- **Tailwind CSS 4**
- **class-variance-authority** - 컴포넌트 variant 관리
- **clsx** + **tailwind-merge** - className 유틸리티

### 상태 관리 & UI
- **Zustand 5.0.8** - 전역 상태 관리
- **overlay-kit 1.8.6** - 모달 관리
- **react-hot-toast 2.6.0** - 토스트 알림
- **react-day-picker 9.11.1** + **date-fns 4.1.0** - 날짜 선택

### 개발 도구
- **Biome 2.2.0** - Linting & Formatting (ESLint/Prettier 통합 대체)
- **Husky 9.1.7** + **lint-staged** - Git Hooks 및 Pre-commit 검증
- **commitlint** - Conventional Commits 규칙
- **@svgr/webpack** - SVG를 React 컴포넌트로 변환

## 시작하기

### 사전 요구사항

- Node.js 18.17 이상
- pnpm (권장)

### 설치

```bash
# 의존성 설치
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인합니다.

### 빌드

```bash
# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

## 프로젝트 구조

```
src/
├── app/                           # Next.js App Router
│   ├── (home)/                    # 메인 페이지 (콘텐츠 생성)
│   │   └── src/
│   │       ├── ui/                # UI 컴포넌트
│   │       └── model/             # 로직 및 훅
│   ├── category/                  # 카테고리 선택 페이지
│   │   └── src/
│   │       ├── ui/
│   │       ├── config/
│   │       └── model/
│   └── globals.css
│
├── components/                    # 공통 UI 컴포넌트
│   ├── button.tsx
│   ├── calendar.tsx
│   ├── modal.tsx
│   └── ...
│
├── layouts/                       # 레이아웃 컴포넌트
│   ├── header.tsx
│   └── bottom-button.tsx
│
├── store/                         # Zustand 전역 스토어
│   └── use-create-content-store.ts
│
├── libs/                          # 유틸리티 함수
│   ├── cn.ts                      # className 유틸
│   ├── image-utils.ts             # 이미지 처리
│   ├── indexed-db.ts              # IndexedDB 관리
│   └── toast.tsx
│
├── assets/                        # 정적 자산
│   ├── fonts/                     # Pretendard Variable
│   └── icons/                     # SVG 아이콘
│
└── config/                        # 설정 파일
    └── page-routes.ts
```

## 코드 품질

이 프로젝트는 다음과 같은 코드 품질 도구를 사용합니다:

```bash
# Linting 실행
pnpm lint

# 코드 포맷팅
pnpm format
```

### Git Commit 규칙

이 프로젝트는 [Conventional Commits](https://www.conventionalcommits.org/) 규칙을 따릅니다:

- `feat:` - 새로운 기능 추가
- `fix:` - 버그 수정
- `style:` - 코드 스타일 변경 (포맷팅, 세미콜론 등)
- `refactor:` - 코드 리팩토링
- `chore:` - 빌드 작업, 패키지 매니저 설정 등

Husky를 통해 커밋 전 자동으로 lint와 format이 실행됩니다.

## 주요 기능 상세

### 이미지 업로드 및 처리

- JPG/PNG 형식 지원 (최대 15MB)
- 자동 정사각형 변환 (1:1 비율, 중앙 크롭)
- IndexedDB를 통한 로컬 저장
- Canvas API를 사용한 이미지 압축 (Quality 95%)

### 세션 관리

- 무제한 회차 추가 가능
- 각 회차별 날짜, 시작/종료 시간, 활동 내용(8-800자) 입력
- 시간 검증: 종료 시간이 시작 시간보다 이후여야 함
- 날짜 검증: 이전 회차 이후, 다음 회차 이전 날짜만 선택 가능

### 반응형 디자인

- 모바일 우선 디자인 (767px 이하)
- 데스크탑 지원 (1100px 이상)
- Tailwind의 커스텀 `max-mobile:` 유틸리티 사용
