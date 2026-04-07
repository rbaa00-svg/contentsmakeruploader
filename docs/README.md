# promo.pikkto Docs Index

`promo.pikkto`는 AI 기반 멀티채널 프로모션 콘텐츠 생성, 검수, 예약 발행을 위한 서비스다.
현재 저장소 기준의 source of truth는 이 `docs` 폴더다.

## Start Here

- [기술 명세](./PROMO_PIKKTO_TECHNICAL_SPECIFICATION.md)
- [QA 및 릴리즈 기준](./PROMO_PIKKTO_QA_RELEASE_CRITERIA.md)
- [로드맵](./PROMO_PIKKTO_ROADMAP.md)
- [디자인 시스템](./DESIGN_SYSTEM.md)

## Agent Rules

- [AGENTS 운영 지침](./AGENTS.md)
- [에이전트 역할 컨텍스트](./AGENT_ROLE_CONTEXT.md)
- [브랜치 및 worktree 워크플로](./BRANCH_WORKFLOW.md)
- [handoff 템플릿](./handoff/HANDOFF_TEMPLATE.md)

## Current Product Snapshot

- 프레임워크: Next.js 15 App Router
- 상태 관리: Zustand 로컬 스토어
- 생성 모델: Google Gemini 스트리밍 생성
- 지원 채널: Instagram, Naver Blog, X, YouTube, LinkedIn, TikTok, Threads
- 현재 구현 상태:
  - 대시보드에서 채널 연결 상태와 예약 포스트 확인
  - `/create`에서 키워드 입력 -> 콘셉트 선택 -> 멀티채널 콘텐츠 생성 -> 검수/편집 -> 예약
  - 채널별 미리보기 UI 제공
- 아직 없는 것:
  - 실제 SNS OAuth 연동
  - 실제 발행 API
  - 영구 저장 DB
  - 백그라운드 스케줄러/워커
  - 이미지 생성 및 에셋 파이프라인

## Documentation Rules

- 문서는 실제 구현 상태와 계획 상태를 구분해서 쓴다.
- 구현되지 않은 기능은 "계획", "후속", "예정"으로 명시한다.
- 문서만 바꿔서 제품이 된 것처럼 쓰지 않는다.
- 모든 활성 문서는 이 인덱스에서 도달 가능해야 한다.

## Archive

- 과거 프로젝트 문서는 [archive/med-pikkto](./archive/med-pikkto/README.md)에 보관한다.
- archive 문서는 참고용이며 현재 서비스의 source of truth가 아니다.
