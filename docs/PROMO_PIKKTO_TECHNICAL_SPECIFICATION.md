# promo.pikkto Technical Specification

> Version: v0.1
> Last updated: 2026-04-07
> Scope: 현재 저장소 구현 상태 + 다음 단계 확장 기준

## 1. 제품 개요

`promo.pikkto`는 프로모션 콘텐츠를 여러 채널 포맷으로 한 번에 생성하고, 채널별로 검수한 뒤 예약 발행 준비까지 연결하는 서비스다.

현재 저장소는 로컬 데모 성격의 MVP이며, 생성과 검수 UX의 핵심 흐름을 먼저 구현한 상태다.

## 2. 현재 구현 범위

### 2.1 지원 라우트

- `/`
  - 채널 연결 상태
  - 예약 포스트 목록
- `/create`
  - 5단계 콘텐츠 생성 플로우

### 2.2 지원 채널

- Instagram
- Naver Blog
- X
- YouTube
- LinkedIn
- TikTok
- Threads

### 2.3 현재 기술 스택

| 영역 | 기술 |
|---|---|
| Framework | Next.js 15 App Router |
| UI | React 19, Tailwind CSS |
| State | Zustand |
| AI | `@google/genai` |
| Icons | lucide-react |
| Date | date-fns |

## 3. 현재 사용자 흐름

1. 사용자가 키워드를 입력한다.
2. 사용자가 콘셉트를 선택한다.
3. Gemini가 7개 채널용 텍스트를 스트리밍 생성한다.
4. 사용자가 채널별 텍스트를 검수/수정한다.
5. 사용자가 예약 날짜를 선택한다.
6. 로컬 스토어에 예약 포스트가 추가된다.

## 4. 화면별 상세

### 4.1 Dashboard

- 채널별 연결 상태 표시
- 연결/해제 토글
- 예약 포스트 카드 표시
- Create Content 진입 버튼

### 4.2 Create Content

- Step 1: keyword
- Step 2: concept
- Step 3: generating
- Step 4: review and edit
- Step 5: schedule

## 5. 상태 모델

현재 상태는 `store/useAppStore.ts`의 로컬 Zustand 스토어가 담당한다.

### 핵심 상태

- `step`
- `keyword`
- `concept`
- `generatedContent`
- `isGenerating`
- `scheduleDate`
- `snsConnections`
- `scheduledPosts`

### 데이터 특성

- 영구 저장이 아니다.
- 브라우저 새로고침 시 손실될 수 있다.
- 예약 포스트는 실제 발행 작업으로 이어지지 않는다.

## 6. AI 생성 파이프라인

### 입력

- keyword
- concept

### 출력 형식

모델은 아래 채널 구분자를 포함한 텍스트를 스트리밍 반환한다.

- `[INSTAGRAM]`
- `[BLOG]`
- `[TWITTER]`
- `[YOUTUBE]`
- `[LINKEDIN]`
- `[TIKTOK]`
- `[THREADS]`

### 파싱 방식

- 전체 스트림을 누적한다.
- 정규식으로 채널별 섹션을 분리한다.
- 각 채널 결과를 실시간으로 스토어에 반영한다.

## 7. 채널별 데이터 규칙

| 채널 | 현재 규칙 | 최소 검증 기준 |
|---|---|---|
| Instagram | 단일 caption | 빈 값 금지 |
| Blog | 1행 제목 + 본문 | 제목/본문 분리 |
| X | 짧은 포스트 | 길이 제한 검증 필요 |
| YouTube | 1행 제목 + 설명 | 제목/설명 분리 |
| LinkedIn | 단일 post | 빈 값 금지 |
| TikTok | 짧은 caption | 빈 값 금지 |
| Threads | 단일 post | 빈 값 금지 |

## 8. 신뢰 경계와 검증

### 현재 상태

- 생성 텍스트는 로컬 UI에서 바로 수정 가능하다.
- 채널별 엄격한 validation layer는 아직 없다.

### 반드시 추가할 검증

- X 길이 제한
- 예약 일시 유효성
- 채널별 제목/본문 구조 검증
- 빈 문자열 또는 공백 문자열 차단
- 향후 실제 발행 API 도입 시 URL/계정/미디어 메타데이터 검증

## 9. 비기능 요구사항

### 성능

- 목표 응답: 200ms 이하
- 상한: 300ms
- 홈/생성 화면은 baseline 대비 후퇴가 없어야 한다.

### 접근성

- focus-visible 유지
- 44px 이상 터치 타깃 권장
- body text 16px 이상

### 문서

- 구현 상태와 계획 상태를 구분한다.
- 활성 문서는 `docs/README.md`에서 모두 찾을 수 있어야 한다.

## 10. 현재 한계

- 실제 계정 인증 없음
- 실제 발행 없음
- 백엔드 없음
- DB 없음
- 멀티유저 없음
- 운영/감사 로그 없음

## 11. 다음 단계 아키텍처

### Phase 1

- 클라이언트 검수 흐름 안정화
- 채널별 validation layer 도입
- 일정/타임존 처리 정교화

### Phase 2

- 사용자 인증
- DB 저장
- 실제 채널 연결

### Phase 3

- 예약 발행 워커
- 발행 상태 추적
- 실패 재시도와 감사 로그

## 12. 채널 추가 완결성 체크리스트

새 채널 추가 시 아래를 모두 수정한다.

- 타입 정의
- Zustand 초기 상태
- 생성 프롬프트
- 응답 파서
- 대시보드 카드
- 검수 입력 UI
- 미리보기 탭
- 예약 저장 구조
- QA 기준
- 문서
