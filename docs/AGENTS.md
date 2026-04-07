# AGENTS.md

## 프로젝트

- 적용 프로젝트: `promo.pikkto`
- 제품 정의: AI 기반 멀티채널 프로모션 콘텐츠 생성, 검수, 예약 발행 서비스

## 역할

- `main` 기준 폴더를 사용하는 스레드는 PM 스레드다.
- `main`이 아닌 작업 브랜치 또는 별도 worktree를 사용하는 스레드는 엔지니어 스레드다.
- PM은 통합, 검증, handoff 정리, 최종 병합을 담당한다.
- 엔지니어는 구현, 디버깅, QA, 문서 수정, 커밋을 담당한다.

## 기본 원칙

- 구현과 문서 수정은 승인된 worktree와 작업 브랜치에서만 수행한다.
- 로컬 `main`은 구현 공간이 아니라 통합과 최종 검증 공간이다.
- 모든 작업 브랜치는 현재 `main`에서 분기한다.
- 패키지 매니저는 반드시 `pnpm`만 사용한다.
- 사용자 승인 없이 브랜치 생성, 브랜치 전환, 기준 브랜치 변경, worktree 추가/제거를 하지 않는다.

## PM 스레드 규칙

- PM 기준 폴더는 항상 `main`만 유지한다.
- PM 스레드는 최신 `origin/main` 동기화, handoff 정리, 브랜치 비교, 병합, 최종 검증만 수행한다.
- PM 기준 폴더에서 기능 구현, 실험, 임시 수정을 하지 않는다.
- 검증이 끝나지 않은 작업은 로컬 `main`에 가져오지 않는다.

## 엔지니어 스레드 규칙

- 구현, 디버깅, 리팩토링, 문서 수정, QA는 자기 worktree 안에서만 수행한다.
- 코드 변경이 있으면 최소 `pnpm build`를 통과해야 한다.
- 문서 전용 변경은 문서 QA를 통과해야 한다.
- 작업 종료 시 handoff를 작성하고 커밋한다.

## 작업 공간 레벨

- `LV 1`: 기존 활성 브랜치/worktree 재사용
- `LV 2`: 작은 단발 수정, 임시 worktree + 임시 브랜치
- `LV 3`: 반나절 이상 또는 구조 변경, 전용 worktree + 전용 브랜치

## 브랜치 승인 규칙

- 브랜치 관련 작업 전에는 아래 3가지를 먼저 보고하고 승인받는다.
- 작업 목적
- 대상 브랜치명
- 사용할 작업 폴더 또는 worktree 경로

## 제품 특화 구현 원칙

### 1. LLM Output Trust Boundary

- 생성 모델이 만든 텍스트는 그대로 발행하지 않는다.
- 저장, 예약, 발행 전 채널별 형식 검증을 거친다.
- 최소 검증 항목:
  - X: 길이 제한
  - YouTube: 제목 1행 + 설명 본문 분리
  - Blog: 제목 1행 규칙
  - Schedule: 유효한 절대 일시와 타임존 보유
- 추후 실제 발행 API가 생기면 URL, 계정 ID, 미디어 메타데이터도 별도 검증한다.

### 2. 채널 추가 완결성

- 새 채널을 추가하면 아래 영역을 모두 같이 갱신한다.
- 타입 정의
- Zustand 스토어
- 생성 프롬프트/파서
- 대시보드 연결 상태
- 검수 폼
- 미리보기 UI
- 예약 로직
- QA 기준
- 문서

### 3. 시간 및 예약 안전성

- 상대 시간 표현만 저장하지 않는다.
- 예약 정보는 절대 일시와 타임존 기준으로 해석한다.
- "오늘", "내일", "이번 주" 같은 표현은 UI 편의 레벨로만 사용하고 내부 기준값은 날짜/시간으로 명시한다.

### 4. 문서 최신화

- 구현이 바뀌면 관련 문서를 즉시 갱신한다.
- 활성 문서는 `docs/README.md`에서 반드시 찾을 수 있어야 한다.
- 오래된 제품 문맥은 archive로 분리하고 활성 문서에 남겨두지 않는다.

## QA 기준

- `Quick`: 주요 라우트 로드, 링크 이동, 콘솔 에러 확인
- `Standard`: 생성, 편집, 미리보기, 예약까지 전체 핵심 흐름 검증
- `Exhaustive`: 모바일/데스크톱, 실패 시나리오, 회귀 테스트, 인접 화면 영향까지 검증

## 성능 기준

- 응답 속도 목표: 200ms 이하
- 상한: 300ms
- 홈과 생성 페이지는 baseline 대비 성능 후퇴가 없는지 확인한다.
- 성능 평가는 절대 숫자만 보지 않고 변경 전후 비교를 남긴다.

## handoff 규칙

- 작업 종료 시 반드시 `git commit` 후 handoff를 남긴다.
- LV 3 작업은 `docs/handoff/YYYYMMDD-주제명.md` 형식의 별도 문서를 남긴다.
- handoff에는 목적, 유지할 변경, 버려도 되는 변경, 검증 결과, 관련 커밋 정보를 적는다.

## References

- [docs/README.md](./README.md)
- [docs/BRANCH_WORKFLOW.md](./BRANCH_WORKFLOW.md)
- [docs/AGENT_ROLE_CONTEXT.md](./AGENT_ROLE_CONTEXT.md)
- [docs/PROMO_PIKKTO_TECHNICAL_SPECIFICATION.md](./PROMO_PIKKTO_TECHNICAL_SPECIFICATION.md)
- [docs/PROMO_PIKKTO_QA_RELEASE_CRITERIA.md](./PROMO_PIKKTO_QA_RELEASE_CRITERIA.md)
