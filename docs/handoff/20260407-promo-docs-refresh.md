[HANDOFF]
브랜치명: codex/docs-promo-service-refresh
기준 브랜치: main

핵심 목적:
- `promo.pikkto` 현재 서비스 정의에 맞춰 활성 `docs`를 전면 재작성
- 과거 프로젝트 문서를 활성 문서에서 분리하고 archive로 이동

반드시 유지할 변경:
- `docs/README.md`를 현재 서비스 기준 인덱스로 재구성
- `docs/PROMO_PIKKTO_TECHNICAL_SPECIFICATION.md` 추가
- `docs/PROMO_PIKKTO_QA_RELEASE_CRITERIA.md` 추가
- `docs/PROMO_PIKKTO_ROADMAP.md` 추가
- `docs/AGENTS.md`, `docs/AGENT_ROLE_CONTEXT.md`, `docs/BRANCH_WORKFLOW.md`, `docs/DESIGN_SYSTEM.md`를 `promo.pikkto` 기준으로 재작성
- 과거 문서를 `docs/archive/med-pikkto/`로 보관

버려도 되는 변경:
- 없음

관련 파일:
- docs/README.md
- docs/AGENTS.md
- docs/AGENT_ROLE_CONTEXT.md
- docs/BRANCH_WORKFLOW.md
- docs/DESIGN_SYSTEM.md
- docs/PROMO_PIKKTO_TECHNICAL_SPECIFICATION.md
- docs/PROMO_PIKKTO_QA_RELEASE_CRITERIA.md
- docs/PROMO_PIKKTO_ROADMAP.md
- docs/archive/med-pikkto/README.md
- docs/handoff/HANDOFF_TEMPLATE.md

검증 결과:
- docs 링크 무결성 검사: PASS
- 활성 문서 stale context 검사: PASS
- README discoverability 검사: PASS
- `pnpm build`: 미실행, 문서 전용 변경이어서 docs QA로 대체

메모:
- `C:\promo.pikkto` PM 폴더에는 기존 untracked `docs/`가 있어 병합 전 백업 또는 정리가 필요할 수 있음
- `pnpm-lock.yaml`은 이번 작업 범위가 아니므로 유지

관련 커밋:
- 24b03ac docs: rewrite docs for promo content service
