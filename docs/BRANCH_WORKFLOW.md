# BRANCH_WORKFLOW

## 목적

- PM 폴더 `main`을 통합 전용 공간으로 유지한다.
- 구현과 문서 수정은 승인된 작업 브랜치/worktree에서만 수행한다.
- 검증된 결과만 로컬 `main`에 병합한다.

## 역할 매핑

- PM 스레드: `main` 기준 폴더
- 엔지니어 스레드: `main`이 아닌 작업 브랜치 또는 별도 worktree

## 승인 전 금지

- `git switch`
- `git checkout`
- `git branch`
- `git worktree add`
- `git worktree remove`

승인 전에는 아래 3가지를 먼저 보고한다.

- 작업 목적
- 대상 브랜치명
- 사용할 작업 폴더 또는 worktree 경로

## 작업 공간 선택 기준

### LV 1

- 같은 기능 축의 후속 수정
- 기존 활성 브랜치/worktree 재사용

### LV 2

- 30분~2시간 내 단발 수정
- 파일 1~3개 수준
- `env`, 의존성, 스키마 변경 없음
- 임시 worktree + 임시 브랜치

### LV 3

- 반나절 이상 소요
- 기능 추가, 구조 변경, 복합 디버깅, 대규모 문서 재정비
- 전용 worktree + 전용 브랜치

## 실행 규칙

- 엔지니어 스레드는 자기 worktree에서만 작업한다.
- 코드 변경은 최소 `pnpm build`를 통과해야 한다.
- 문서 전용 변경은 문서 QA를 통과해야 한다.
- 작업 종료 시 커밋과 handoff를 남긴다.

## 병렬 작업 규칙

- worktree마다 책임 파일/범위를 먼저 정한다.
- 같은 파일을 여러 브랜치가 동시에 바꾸는 상황은 가능한 줄인다.
- 불가피하면 먼저 반영된 브랜치를 최신 기준으로 보고 후속 브랜치가 맞춘다.

## 병합 규칙

- PM 스레드는 검증 완료된 작업만 `main`에 병합한다.
- 전체 파일 덮어쓰기를 피하고, 실제 변경 범위를 검토한 뒤 병합한다.
- 병합 후에는 통합 검증을 다시 수행한다.

## docs 변경 규칙

- `docs` 변경도 구현과 동일하게 브랜치 discipline을 따른다.
- 활성 문서와 archive를 분리한다.
- 문서 변경 후 확인할 항목:
  - 잘못된 프로젝트 문맥이 남아 있지 않은가
  - `docs/README.md`에서 모든 활성 문서에 접근 가능한가
  - 상대 링크가 깨지지 않는가
  - "현재 구현"과 "계획"이 구분돼 있는가

## 정리 규칙

- 병합 완료 브랜치와 종료된 worktree는 즉시 정리한다.
- `git push`는 사용자 명시 지시가 있을 때만 수행한다.

## References

- [docs/AGENTS.md](./AGENTS.md)
- [docs/AGENT_ROLE_CONTEXT.md](./AGENT_ROLE_CONTEXT.md)
- [docs/handoff/HANDOFF_TEMPLATE.md](./handoff/HANDOFF_TEMPLATE.md)
