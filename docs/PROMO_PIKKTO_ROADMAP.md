# promo.pikkto Roadmap

> Version: v0.1
> Last updated: 2026-04-07

## 제품 방향

`promo.pikkto`의 방향은 "한 번의 프로모션 기획 입력을 여러 채널의 발행 직전 초안으로 바꾸는 운영 도구"다.

핵심은 단순 텍스트 생성이 아니라 아래 4단계를 안정화하는 것이다.

1. 입력
2. 생성
3. 검수
4. 예약/발행

## Phase 0. 현재 상태

- 로컬 MVP UI 존재
- 7개 채널 생성/미리보기 가능
- 예약은 로컬 상태에만 저장
- 실제 발행 파이프라인은 없음

## Phase 1. Editor Reliability

목표: 현재 MVP를 "데모"가 아니라 "반복 사용 가능한 검수 도구"로 만든다.

- 채널별 validation layer
- 예약값 정교화
- 생성 실패/빈 응답 처리
- 미리보기 정확도 향상
- 모바일 사용성 보정
- 문서/QA 기준 정립

## Phase 2. Real Data Foundation

목표: 로컬 상태에서 실제 서비스 데이터 구조로 넘어간다.

- 사용자 인증
- DB 저장
- 프로젝트/캠페인 단위 저장
- 초안/검수본/예약본 상태 구분
- 기본 activity log

## Phase 3. Channel Connectivity

목표: 실제 채널 연결과 발행 준비를 시작한다.

- 계정 연결
- 채널 권한 확인
- 채널별 발행 payload 변환기
- 예약 대기열
- 발행 실패 상태 기록

## Phase 4. Scheduling and Operations

목표: 운영 가능한 예약 발행 서비스로 확장한다.

- 백그라운드 worker
- 재시도 정책
- 발행 상태 대시보드
- 알림
- 관리자용 운영 로그

## Phase 5. Team Workflow

목표: 개인 도구에서 팀 도구로 확장한다.

- 승인 플로우
- 역할 분리
- 팀별 작업 공간
- 브랜드/톤 프리셋
- 채널별 승인 이력

## 병렬 우선순위

가장 먼저 해야 할 일:

1. validation layer
2. schedule/timezone 정교화
3. persistence
4. real publishing

## 하지 말아야 할 것

- 실제 발행도 없는데 운영 플랫폼처럼 문서화하기
- 채널별 제약을 무시한 채 "범용 한 문장 생성기"로 축소하기
- 검수 경험이 부족한 상태에서 팀 기능부터 붙이기
