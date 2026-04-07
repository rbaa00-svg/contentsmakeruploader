# med.pikkto Workbench MVP 정의서

> **문서 버전:** v1.0  
> **최종 수정:** 2026-03-26  
> **대상 마일스톤:** Milestone 2 · The Core

---

## 1. 문서 목적

본 문서는 med.pikkto의 Milestone 2를 단순한 문서 편집기가 아닌 **의료기기 ISO/RA 규제 문서 워크벤치(Workbench) MVP**로 정의하기 위한 전용 기준 문서다.

로드맵의 `Smart Paste Engine`, `Block-based Editor`, `Audit Trail 기초`는 별도의 기능이 아니라, 하나의 Workbench를 구성하는 핵심 하위 요소로 본다.

---

## 2. 왜 "에디터"가 아니라 "워크벤치"인가

med.pikkto가 다루는 대상은 단일 문서가 아니라 다음을 포함한 **규제 문서 작업 환경 전체**다.

- 문서 패킷 트리
- 중앙 문서 편집
- 검토 코멘트와 승인 상태
- 감사 추적(Audit Trail)
- 문서 간 참조와 추적성
- Smart Paste 기반 레거시 문서 흡수

따라서 M2 제품 명칭은 `문서 에디터`보다 **규제 문서 워크벤치**가 더 정확하다.

권장 명칭:

- 한글: `의료기기 ISO/RA 규제 문서 워크벤치`
- 영문: `Regulatory Document Workbench`
- 제품 화면명: `med.piKKto Workbench`

---

## 3. 제품 형태

### 3.1 Web Lite

웹 버전은 라이트 유저와 초기 도입 검토를 위한 경험을 제공한다.

- 템플릿 탐색
- 간단 편집
- 데모 체험
- 제한된 문서 미리보기

### 3.2 Enterprise Self-Hosted

실제 엔터프라이즈 고객은 고객사 인프라 또는 고객사 전용 클라우드에 설치하는 **self-hosted Workbench**를 사용한다.

- 고객사 서버 내 데이터 보관
- 내부 승인 체계와 권한 관리
- 감사 추적, 변경 이력, 증거 데이터 통제
- 향후 QMS/ERP/API 연동 기반

### 3.3 설계 원칙

M2는 데스크톱 앱을 먼저 만드는 것이 아니라, **self-hosted가 가능한 웹 Workbench**를 우선 구축한다.

이유:

- Web Lite와 Enterprise가 같은 UI 코어를 공유할 수 있음
- 배포와 운영 복잡도를 초기 단계에서 낮출 수 있음
- 향후 설치형 패키지나 오프라인 확장이 필요해도 전환 여지가 남음

---

## 4. UI 방향

전체 구조는 **VS Code형 Workbench**를 따르고, 중앙 편집 경험은 **Notion형 블록 편집 감각**을 차용한다.

즉, 제품 원칙은 다음과 같다.

- 셸 구조: VS Code
- 편집 감각: Notion
- 지식관리형 제품 구조: Obsidian 비채택

### 4.1 기본 레이아웃

1. 좌측 Activity Bar
2. 좌측 Explorer / Packet Tree
3. 중앙 Editor Area
4. 우측 Review / Guide / Audit Pane
5. 상단 Toolbar / Status Strip
6. 필요 시 하단 Panel

### 4.2 영역별 역할

| 영역 | 역할 |
| --- | --- |
| Activity Bar | 문서세트, 검색, 검토, 감사추적, 내보내기 등 워크벤치 모드 전환 |
| Explorer | CER, RMF, TD, DHF, DMR 같은 문서 패킷과 폴더 트리 표시 |
| Editor | 블록 기반 문서 편집, 표 편집, Smart Paste 결과 반영 |
| Right Pane | 작성 가이드, reviewer comment, 규제 힌트, 승인 상태, audit trail |
| Toolbar | 문서 상태, 버전, 승인 상태, 템플릿 적용, 내보내기 액션 |
| Bottom Panel | 파싱 로그, 변경 이력, 문제 항목, 작업 큐 등 확장용 |

---

## 5. M2 MVP 범위

M2는 아래 범위까지만 포함한다.

### 5.1 포함 범위

- Workbench Shell
- Explorer 기반 문서 트리
- 탭 기반 문서 전환
- Block-based Editor
- Smart Paste Engine
- 기본 Audit Trail
- 우측 가이드 / 검토 패널
- 문서 상태, 버전, reviewer status 표시

### 5.2 제외 범위

- ISO RAG 기반 본격 AI 규정 해석
- 실시간 준수율 점수
- 자동 RTM 생성
- 전사 문서 동기화
- 완전한 enterprise validation / e-signature

즉, 다음 마일스톤 경계는 명확하다.

- M2: Workbench가 실제로 돌아가기 시작하는 단계
- M3: AI Compliance가 Workbench 안으로 들어오는 단계
- M4: Workbench 간 데이터 네트워크와 자동화가 붙는 단계

---

## 6. 핵심 사용자

Workbench MVP의 1차 사용자는 아래 조직이다.

- RA
- QA
- QMS
- R&D 문서 담당자

핵심 사용 시나리오:

1. HWP/Word 조각 문서를 붙여넣는다.
2. Smart Paste가 표준 블록 구조로 정리한다.
3. 담당자가 중앙 편집기에서 수정한다.
4. 우측 패널에서 검토 포인트와 변경 이력을 확인한다.
5. reviewer / approver가 상태를 갱신한다.

---

## 7. Workbench MVP 정보 구조

### 7.1 1차 네비게이션

- 문서세트
- 탐색기
- 검색
- 검토
- 감사추적
- 내보내기

### 7.2 대표 패킷

- Clinical Evaluation Report (CER)
- Risk Management File (RMF)
- Technical Documentation (TD)
- Design History File (DHF)
- Device Master Record (DMR)
- QMS Controlled Documents

### 7.3 문서 상태

- Draft
- In Review
- QA Review
- Approval Pending
- Approved
- Released

---

## 8. 기술 구성 원칙

| 계층 | 권장 기술 | 역할 |
| --- | --- | --- |
| Workbench Shell | Next.js App Router + React | 레이아웃, 탭, 패널, 탐색기 |
| Editor Engine | TipTap / ProseMirror | 블록 기반 편집 |
| Schema Layer | Custom ProseMirror Schema | 규제 문서용 고정/반고정/자유 블록 |
| Smart Paste | Custom PasteRule + Parser | HWP/Word 복합 표 정규화 |
| Audit Layer | PostgreSQL + append-only log | 변경 이력, snapshot hash, diff |
| Review Layer | Comment / status / approval UI | reviewer, approver, reason-for-change |

---

## 9. 구현 우선순위

### Phase 1

- Workbench Shell
- Explorer tree
- 기본 탭
- mock 문서 로딩

### Phase 2

- Block-based Editor 연결
- Smart Paste 입력
- 고정/반고정/자유 블록 지원

### Phase 3

- Audit Trail 기초
- reviewer comment
- approval status
- 우측 패널 정리

---

## 10. M2 완료 기준

아래 기준을 만족하면 M2의 Workbench MVP가 성립한 것으로 본다.

- 사용자가 문서 패킷을 트리에서 선택할 수 있다.
- 중앙 편집기에서 블록 단위 편집이 가능하다.
- HWP/Word 표 붙여넣기 결과를 표준 구조로 보여줄 수 있다.
- 변경 이력이 기본 로그로 남는다.
- reviewer / approver 상태를 화면에서 확인할 수 있다.
- Workbench 전체가 웹에서 동작하며 self-hosted 배포를 전제로 설계되어 있다.

---

## 11. 구현 메모

M2에서 가장 먼저 만들 대상은 `에디터 기능` 하나가 아니라 `Workbench Shell`이다.

권장 시작 순서:

1. `/workbench` 라우트와 기본 셸
2. 좌측 Explorer와 문서 탭
3. 중앙 편집기
4. Smart Paste
5. 우측 Review / Audit Pane
6. Audit Trail 저장 구조
