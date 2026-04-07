# med.pikkto: 의료기기 ISO 및 인허가 지능형 엔터프라이즈 솔루션 — 기술 명세서

> **문서 버전:** v1.0  
> **최종 수정:** 2026-03-26  
> **분류:** Internal — Confidential  

---

## 📌 개요

본 명세서는 **med.pikkto** 로드맵의 5단계 마일스톤을 기술적으로 구현하기 위한 **아키텍처 및 상세 사양**을 정의합니다.

med.pikkto는 의료기기 ISO 및 인허가 문서 운영을 위한 **지능형 엔터프라이즈 솔루션**으로, 웹에서는 라이트 문서 경험을 제공하고 엔터프라이즈에서는 고객사 서버에 설치하는 **Regulatory Document Workbench**를 중심으로 문서 작성, 검토, 감사 추적, 추적성, 규제 운영을 통합합니다.

```
Milestone 1: The Face   ─ 마케팅 & 리드 제너레이션
Milestone 2: The Core   ─ MVP (Regulatory Document Workbench)
Milestone 3: The Brain  ─ AI Compliance Agent
Milestone 4: The Network ─ Data Integration
Milestone 5: The Standard ─ Enterprise & Validation
```

---

## 🚩 Milestone 1: The Face (Marketing & Lead Generation)

### 목표
의료기기 업계 종사자(RA/QA) 대상으로 med.pikkto의 가치 제안을 전달하고, 데모 신청 리드를 확보한다.

### Frontend Stack

| 계층 | 기술 | 비고 |
|---|---|---|
| **Framework** | Next.js 15 (App Router) | SSR/SSG 하이브리드 렌더링 |
| **Styling** | Tailwind CSS | 유틸리티 퍼스트 디자인 시스템 |
| **Animation** | Framer Motion | 고급 인터랙션 & 스크롤 애니메이션 |

### SEO & Analytics

- **키워드 최적화 대상:**
  - `ISO 13485`, `FDA eSTAR`, `기술문서 작성`, `IEC 62304`, `의료기기 인허가`
  - `ISO 14971 위험관리`, `CE 마킹`, `K-FDA 허가`, `21 CFR Part 11`
- **메타 데이터 설계:**
  - 페이지별 고유 `<title>`, `<meta description>`, Open Graph 태그 정의
  - 구조화된 데이터(JSON-LD): `SoftwareApplication`, `Organization` 스키마
- **도구 연동:**
  - Google Search Console — 인덱싱 & 키워드 성과 모니터링
  - Google Analytics 4 — 사용자 행동 분석 및 전환 추적
- **브라우저 호환성:** Chrome, Edge 최우선 지원 (Firefox, Safari 차순위)

### Lead Capture

- **데모 신청 폼:**
  - Serverless Functions (Vercel Edge Functions 또는 AWS Lambda) 기반 폼 처리
  - 입력 필드: 회사명, 담당자명, 이메일, 보유 인증 규격(체크박스), 메시지
- **이메일 자동화:**
  - 폼 제출 → Webhook → 이메일 마케팅 플랫폼(SendGrid / Resend) 연동
  - 자동 응답 메일 + CRM 리드 등록 파이프라인

---

## 🚩 Milestone 2: The Core (MVP — Regulatory Document Workbench)

### 목표
HWP/Word 등 레거시 문서를 완벽히 수용하면서, ISO 표준 서식에 맞는 **의료기기 규제 문서 워크벤치**를 구축한다. M2의 구현 단위는 단일 에디터가 아니라, 문서 트리, 중앙 편집기, 검토 패널, 감사 추적을 결합한 **Workbench MVP**다.

추가 정의는 [MED_PIKKTO_WORKBENCH_MVP.md](./MED_PIKKTO_WORKBENCH_MVP.md)를 기준 문서로 사용한다.

### Product Form Factor

- **Web Lite:** 템플릿 탐색, 제한된 편집, 데모 체험, 경량 사용자용 웹 경험
- **Enterprise Self-Hosted:** 고객사 서버 또는 전용 클라우드에 설치하는 규제 문서 Workbench
- **공통 원칙:** UI 코어는 공유하되, 엔터프라이즈 모드는 데이터 통제와 내부 운영 체계를 우선한다

### Workbench Definition

M2의 핵심은 `문서 에디터`가 아니라 `규제 문서 워크벤치`다.

- 좌측: 문서 패킷 트리, 탐색기, 검색
- 중앙: 블록 기반 문서 편집기
- 우측: 작성 가이드, reviewer comment, approval status, audit trail
- 상단/하단: 문서 상태, 버전, 파싱 결과, 문제 항목

전체 셸 구조는 **VS Code형 Workbench**, 중앙 편집 감각은 **Notion형 블록 편집기**를 따른다.

### Workbench Architecture

| 구성 요소 | 기술 | 역할 |
|---|---|---|
| **Workbench Shell** | Next.js App Router + React | Activity Bar, Explorer, 탭, 우측 패널, 상태 표시 영역 |
| **Core Editor** | TipTap (ProseMirror 기반) | 블록 기반 리치 텍스트 편집기 |
| **Schema Layer** | Custom ProseMirror Schema | ISO 서식 블록 정의 |
| **Clipboard Parser** | Custom PasteRule | 복잡한 중첩 테이블 복원 |
| **Review & Audit Pane** | React Panel Modules | 작성 가이드, reviewer comment, approval status, audit trail 표시 |

### Workbench Information Architecture

| 영역 | 역할 |
|---|---|
| **Activity Bar** | 문서세트, 탐색기, 검색, 검토, 감사추적, 내보내기 모드 전환 |
| **Explorer Tree** | CER, RMF, TD, DHF, DMR, QMS 문서 패킷 구조 표시 |
| **Editor Tabs** | 문서 간 전환, 초안/검토본 병렬 확인 |
| **Center Editor** | 고정/반고정/자유 블록 기반 문서 편집 |
| **Right Pane** | 작성 가이드, 규제 힌트, reviewer/approver 상태, 변경 이력 |
| **Bottom Panel** | 파싱 로그, 문제 항목, 작업 큐, diff 뷰 확장 영역 |

### Clipboard Parser (핵심 기술)

> **문제:** HWP/Word에서 복사한 기술문서에는 7단계 이상 중첩된 표(Nested Table)가 빈번하게 존재하며, 브라우저 기본 붙여넣기로는 구조가 파괴된다.

- **구현 전략:**
  1. `text/html` 및 `text/rtf` 클립보드 스트림 인터셉트
  2. HTML DOM 파서로 `<table>` 중첩 깊이 탐색 (최대 7-depth)
  3. 중첩 테이블을 ProseMirror 스키마의 재귀적 `table_cell > table` 노드로 매핑
  4. RTF 바이너리 스트림 파싱 → 셀 병합(merge), 테두리 스타일 복원
  5. 변환 결과를 ProseMirror `Transaction`으로 에디터에 삽입

```
Clipboard Event
  ├─ text/html Stream ──→ DOM Parser ──→ Nested Table Resolver
  ├─ text/rtf Stream  ──→ RTF Parser ──→ Cell Merge / Border Mapper
  └─ Custom PasteRule ──→ ProseMirror Transaction ──→ Workbench Editor State
```

### Block-Schema (ISO 표준 서식)

ISO 기술문서 요구사항에 맞춘 **혼합 스키마** 설계:

| 블록 유형 | 편집 가능 여부 | 설명 |
|---|---|---|
| **Fixed Block** | ❌ 구조 변경 불가 | ISO 표준이 요구하는 고정 서식 (서명란, 개정 이력표, 문서 번호 헤더 등) |
| **Semi-Fixed Block** | ⚠️ 내용만 편집 | 표 구조는 고정, 셀 내용만 편집 가능 (위험분석표, 추적성 매트릭스 등) |
| **Free Block** | ✅ 자유 편집 | 일반 기술문서 본문 (설명, 그림, 자유 표 등) |

### Audit Trail System (감사 추적)

> **규제 요구사항:** 21 CFR Part 11, ISO 13485:2016 §4.2.5 — 문서의 모든 변경 사항은 추적 가능해야 하며, 변경 전후 내용, 변경자, 변경 시점이 기록되어야 한다.

- **저장 엔진:**
  - PostgreSQL `JSONB` 타입 활용
  - 글자 단위 Diff 알고리즘 (Myers diff 기반)으로 변경분 산출
  - 각 편집 이벤트를 `{ userId, timestamp, blockId, diff, snapshotHash }` 형태로 저장

### M2 MVP 완료 기준

- 문서 패킷을 트리 형태로 탐색할 수 있을 것
- 중앙 편집기에서 블록 단위 편집이 가능할 것
- HWP/Word 표 붙여넣기 결과를 표준 구조로 정리할 수 있을 것
- reviewer comment와 approval status를 우측 패널에서 확인할 수 있을 것
- 변경 이력이 append-only 기반으로 기록될 것
- 웹 Workbench로 동작하면서 엔터프라이즈 self-hosted 배포를 전제로 설계될 것

- **Append-only 로그 테이블 설계:**

```sql
CREATE TABLE audit_trail (
    id            BIGSERIAL PRIMARY KEY,
    document_id   UUID NOT NULL REFERENCES documents(id),
    block_id      UUID NOT NULL,
    user_id       UUID NOT NULL REFERENCES users(id),
    action        VARCHAR(20) NOT NULL,  -- 'INSERT' | 'UPDATE' | 'DELETE'
    diff_payload  JSONB NOT NULL,        -- 글자 단위 변경분
    snapshot_hash VARCHAR(64) NOT NULL,  -- SHA-256 무결성 해시
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 수정/삭제 방지: INSERT만 허용하는 트리거
CREATE OR REPLACE FUNCTION prevent_audit_mutation()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'audit_trail table is append-only';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_audit_append_only
    BEFORE UPDATE OR DELETE ON audit_trail
    FOR EACH ROW EXECUTE FUNCTION prevent_audit_mutation();
```

---

## 🚩 Milestone 3: The Brain (AI Compliance Agent)

### 목표
AI가 사용자의 문서 작성을 실시간으로 보조하며, ISO/FDA 규격 준수 여부를 자동 검증하는 **지능형 규정 준수 에이전트**를 구축한다.

### AI Stack

| 구성 요소 | 기술 | 역할 |
|---|---|---|
| **LLM** | Gemini 2.5 Flash Preview | 텍스트 생성, 규정 해석, 문서 초안 작성 |
| **Vector DB** | Pinecone | 규격 문서 임베딩 저장 및 유사도 검색 |
| **Embedding** | text-embedding-004 | 규격 문서 → 벡터 변환 |
| **Orchestration** | LangChain / Custom Pipeline | RAG 파이프라인 오케스트레이션 |

### RAG (Retrieval-Augmented Generation) 파이프라인

```
사용자 입력 (기술문서 블록)
    │
    ▼
┌─────────────────────────────────────────────────┐
│  1. Query Embedding                              │
│     사용자 입력 → text-embedding-004 → 벡터     │
├─────────────────────────────────────────────────┤
│  2. Vector Search (Pinecone)                     │
│     Top-K 유사 규격 조항 검색 (k=5~10)          │
│     - ISO 13485:2016 전문                        │
│     - ISO 14971:2019 전문                        │
│     - IEC 62304:2015 전문                        │
│     - 국가별 보완 사례집 (K-FDA, CE, FDA)        │
├─────────────────────────────────────────────────┤
│  3. Context Assembly                             │
│     검색된 규격 조항 + 사용자 문서 문맥 조합     │
├─────────────────────────────────────────────────┤
│  4. LLM Inference (Gemini 2.5 Flash)            │
│     - 누락 항목 자동 감지 및 제안               │
│     - 표현 교정 (규격 용어 정합성)              │
│     - 조항별 근거 인용 (Citation)               │
├─────────────────────────────────────────────────┤
│  5. Semantic Validation                          │
│     규격 준수 여부 판정 + 위반 사유 구조화       │
└─────────────────────────────────────────────────┘
    │
    ▼
워크벤치 우측 패널: 실시간 가이드 표시
```

### 지식 베이스 구축

- **임베딩 대상 문서:**
  - ISO 13485:2016 (품질경영시스템)
  - ISO 14971:2019 (위험관리)
  - IEC 62304:2015 (소프트웨어 수명주기 프로세스)
  - FDA eSTAR 템플릿 및 가이던스
  - K-FDA(식약처) 기술문서 작성 요령
  - CE 마킹 MDR 기술문서 요구사항
  - 국가별 허가 사례집 (PDF → 텍스트 추출 → 청크 → 임베딩)

- **청크 전략:** 
  - 조항(Clause) 단위 분할 (예: `4.2.3 문서 관리`, `7.3.2 설계 입력`)
  - 오버랩 윈도우: 전후 1개 조항 포함하여 문맥 손실 방지
  - 메타데이터 태깅: `{ standard, version, clause_id, country }`

### Compliance Scorer (규격 준수 점수 엔진)

문서의 완성도와 규격 준수율을 **백분율**로 산출:

```
총점 = Σ (항목별 가중치 × 항목 점수)

항목별 평가 기준:
├── 필수 섹션 존재 여부  (가중치 0.3)
├── 필수 데이터 필드 완성도 (가중치 0.25)
├── 규격 용어 정합성     (가중치 0.15)
├── 교차 참조 무결성     (가중치 0.15)
└── 추적성 매핑 완성도   (가중치 0.15)
```

- **출력 형태:** 전체 점수 (%) + 섹션별 세부 점수 + 개선 권고사항 목록
- **임계값:** 85% 미만 시 경고, 95% 이상 시 제출 가능 상태로 판정

---

## 🚩 Milestone 4: The Network (Data Integration)

### 목표
문서 간 데이터를 **실시간 링크**하여 단일 변수 수정이 전체 문서에 자동 전파되는 관계형 데이터 네트워크를 구축한다. RTM(추적성 매트릭스)을 자동 생성하고, 규격 호환 형식으로 내보낸다.

### Relational Data Model (문서 간 데이터 링크)

> **문제:** 의료기기 인허가 문서 세트(DHF)는 수십 개의 문서가 공통 변수(제품명, 모델번호, 분류 코드 등)를 공유한다. 한 곳의 변경이 나머지 문서에 반영되지 않으면 규제 부적합 사유가 된다.

- **변수 레지스트리 테이블:**

```sql
CREATE TABLE data_variables (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id    UUID NOT NULL REFERENCES projects(id),
    var_key       VARCHAR(100) NOT NULL,  -- 예: 'PRODUCT_NAME', 'MODEL_NUMBER'
    var_value     TEXT NOT NULL,
    updated_by    UUID REFERENCES users(id),
    updated_at    TIMESTAMPTZ DEFAULT now(),
    UNIQUE(project_id, var_key)
);

CREATE TABLE document_variable_refs (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id   UUID NOT NULL REFERENCES documents(id),
    block_id      UUID NOT NULL,
    variable_id   UUID NOT NULL REFERENCES data_variables(id),
    placeholder   VARCHAR(200) NOT NULL   -- 예: '{{PRODUCT_NAME}}'
);
```

- **변수 업데이트 전파 로직:**
  1. `data_variables.var_value` 업데이트 시 → 트리거 발동
  2. `document_variable_refs`에서 해당 `variable_id` 참조 문서 전체 조회
  3. 각 문서의 해당 블록에 새 값 반영 → Audit Trail 기록

### RTM(Traceability Matrix) Engine

요구사항(SR) → 위험(Risk) → 설계(Design) 간의 **양방향 추적성 매핑**:

```
Software Requirement (SR)
    │
    ├──→ Risk Analysis (ISO 14971)
    │       ├── Hazard Identification
    │       ├── Risk Estimation
    │       └── Risk Control Measures
    │
    ├──→ Design Specification
    │       ├── Architecture Design
    │       ├── Detailed Design
    │       └── Unit Specification
    │
    └──→ Verification & Validation
            ├── Unit Test
            ├── Integration Test
            └── System Test
```

- **데이터 추출:** 각 문서 블록에 태깅된 추적 ID(`SR-001`, `RISK-003`, `DS-012`)를 파싱
- **매핑 그래프:** D3.js 기반 인터랙티브 그래프 시각화
- **커버리지 분석:** 미매핑 항목 자동 감지 및 경고

### Export Engine

| 출력 형식 | 기술 | 용도 |
|---|---|---|
| **인쇄용 PDF** | Puppeteer (Headless Chrome) | 고해상도 인쇄, 규제 제출용 |
| **FDA eSTAR XML** | Custom XML Serializer | FDA 전자 제출 |
| **FDA eSTAR JSON** | JSON Transformer | eSTAR 데이터 호환 |
| **Word (.docx)** | docx.js | 레거시 시스템 호환 |

- **PDF 생성 파이프라인:**
  1. 에디터 컨텐츠 → HTML 렌더링 (ISO 서식 CSS 적용)
  2. Puppeteer로 페이지 분할, 머리글/바닥글, 페이지 번호 삽입
  3. PDF/A-3 규격 준수 (장기 보존용)
  4. 디지털 서명 삽입 (Milestone 5 연동)

---

## 🚩 Milestone 5: The Standard (Enterprise & Validation)

### 목표
엔터프라이즈 고객이 요구하는 **보안, 접근 제어, 전자서명, 밸리데이션(CSV)** 기능을 탑재하여 21 CFR Part 11 및 Annex 11 규정을 완전히 준수하는 플랫폼으로 완성한다.

### Security & IAM (Identity & Access Management)

| 기능 | 구현 | 규격 근거 |
|---|---|---|
| **인증** | OAuth2 / SAML 기반 SSO | 고객사 IdP 연동 (Azure AD, Okta 등) |
| **권한 관리** | RBAC (Role-Based Access Control) | ISO 13485 §6.2, 21 CFR 11.10(d) |
| **전자서명** | 21 CFR Part 11 준수 e-Signature | 서명 의미(Meaning) + 날짜 + 서명자 정보 |
| **타임스탬프** | RFC 3161 TSA 서버 연동 | 서명 시점 법적 증명력 확보 |

- **RBAC 역할 매트릭스:**

| 역할 | 문서 조회 | 문서 편집 | 문서 승인 | 시스템 설정 | 사용자 관리 |
|---|---|---|---|---|---|
| Viewer | ✅ | ❌ | ❌ | ❌ | ❌ |
| Author | ✅ | ✅ | ❌ | ❌ | ❌ |
| Reviewer | ✅ | ⚠️ 코멘트만 | ✅ | ❌ | ❌ |
| QA Manager | ✅ | ✅ | ✅ | ⚠️ 일부 | ❌ |
| Admin | ✅ | ✅ | ✅ | ✅ | ✅ |

- **전자서명 플로우:**

```
문서 최종 검토 완료
    │
    ▼
┌─────────────────────────────────────┐
│  1. 서명 요청 (Signature Request)    │
│     - 서명 의미 선택                 │
│       (작성, 검토, 승인, 거부)       │
├─────────────────────────────────────┤
│  2. 신원 확인 (Re-authentication)    │
│     - ID + Password 재입력          │
│     - 또는 MFA (TOTP / SMS)         │
├─────────────────────────────────────┤
│  3. 서명 생성 & 기록                 │
│     - 문서 해시(SHA-256) 산출       │
│     - TSA 서버로 타임스탬프 요청     │
│     - 서명 레코드 Append-only 저장   │
├─────────────────────────────────────┤
│  4. 서명 완료 통지                   │
│     - 관련 이해관계자 이메일 알림    │
│     - 감사 추적 로그 기록            │
└─────────────────────────────────────┘
```

### CSV (Computer System Validation) Automation Tool

> **배경:** 의료기기 규제 환경에서 소프트웨어 시스템은 GxP 밸리데이션을 통과해야 사용 가능하다. IQ/OQ/PQ 보고서 작성은 시스템 변경 시마다 반복되는 고비용 작업이다.

- **자동 생성 보고서:**

| 보고서 | 설명 | 트리거 |
|---|---|---|
| **IQ (Installation Qualification)** | 시스템 설치 적격성 평가 | 배포/업데이트 시 |
| **OQ (Operational Qualification)** | 시스템 운영 적격성 평가 | 기능 변경 시 |
| **PQ (Performance Qualification)** | 시스템 성능 적격성 평가 | 주기적 / 변경 시 |

- **구현 전략:**
  1. CI/CD 파이프라인에 밸리데이션 스크립트 내장
  2. 시스템 변경 감지 → 변경 영역에 해당하는 IQ/OQ/PQ 템플릿 자동 선택
  3. 테스트 실행 결과, 환경 정보, 변경 내역을 템플릿에 자동 삽입
  4. 초안(Draft) 상태로 생성 → QA 담당자 검토 → 전자서명 → 확정

### API Gateway (외부 시스템 연동)

- **RESTful API 제공 범위:**

| 엔드포인트 | 메서드 | 설명 |
|---|---|---|
| `/api/v1/documents` | GET, POST | 문서 목록 조회 / 생성 |
| `/api/v1/documents/{id}` | GET, PUT | 문서 상세 조회 / 수정 |
| `/api/v1/documents/{id}/export` | POST | 문서 내보내기 (PDF/XML/JSON) |
| `/api/v1/variables` | GET, PUT | 데이터 변수 조회 / 수정 |
| `/api/v1/rtm/{projectId}` | GET | 추적성 매트릭스 조회 |
| `/api/v1/audit-trail` | GET | 감사 추적 로그 조회 |
| `/api/v1/compliance-score` | GET | 규격 준수 점수 조회 |

- **연동 대상 시스템:**
  - ERP (SAP, Oracle 등) — 제품 마스터 데이터 동기화
  - MES (Manufacturing Execution System) — 생산 이력 연동
  - QMS (Quality Management System) — CAPA, 부적합 관리 연동

- **보안:**
  - OAuth2 Bearer Token 인증
  - Rate Limiting (100 req/min/user)
  - API Key 기반 외부 시스템 인증
  - 모든 API 호출 감사 로그 기록

---

## 📏 품질 및 안정성 목표 (Service Level)

### Data Integrity — ALCOA+ 원칙

| 원칙 | 의미 | med.pikkto 구현 |
|---|---|---|
| **A**ttributable | 귀속 가능 | 모든 변경에 사용자 ID + 타임스탬프 부착 |
| **L**egible | 판독 가능 | 원본 데이터 훼손 없는 표시, PDF/A 장기 보존 |
| **C**ontemporaneous | 동시 기록 | 이벤트 발생 즉시 Audit Trail 기록 (비동기 지연 최대 1초) |
| **O**riginal | 원본 보존 | Append-only 로그, 삭제/수정 불가 |
| **A**ccurate | 정확성 | SHA-256 해시 기반 무결성 검증 |
| **+C**omplete | 완전성 | 모든 CRUD 이벤트 기록, 누락 없음 |
| **+C**onsistent | 일관성 | UTC 기반 타임스탬프 통일 |
| **+E**nduring | 영속성 | 백업 3중화 (Primary DB + S3 + Cold Storage) |
| **+A**vailable | 가용성 | 권한 있는 사용자에게 즉시 조회 가능 |

### Scalability — 마이크로서비스 아키텍처(MSA) 지향

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  Editor     │  │  AI Agent   │  │  Export      │
│  Service    │  │  Service    │  │  Service     │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                │                │
       ▼                ▼                ▼
┌──────────────────────────────────────────────┐
│              API Gateway (Kong / AWS ALB)     │
├──────────────────────────────────────────────┤
│              Message Broker (RabbitMQ/SQS)   │
├──────────────────────────────────────────────┤
│              PostgreSQL  │  Pinecone  │  S3  │
└──────────────────────────────────────────────┘
```

- **국가별 규제 모듈 확장성:**
  - 규제 모듈을 플러그인 아키텍처로 분리
  - 국가 코드 기반 규격 룰셋 동적 로딩 (`KR`, `US`, `EU`, `JP`, `CN` 등)
  - 신규 국가 추가 시 룰셋 JSON + 임베딩 데이터만 배포

---

## 🗓️ 마일스톤 타임라인 (고수준)

```
Phase 1: The Face      ──────▶  브랜드 인지도 & 리드 확보
Phase 2: The Core      ──────▶  MVP 출시 & 얼리어답터 확보
Phase 3: The Brain     ──────▶  AI 차별화 & 유료 전환
Phase 4: The Network   ──────▶  엔터프라이즈 기능 확장
Phase 5: The Standard  ──────▶  규제 준수 완전체 & 글로벌 진출
```

---

## 📎 참고 규격 목록

| 규격 | 명칭 |
|---|---|
| ISO 13485:2016 | 의료기기 품질경영시스템 |
| ISO 14971:2019 | 의료기기 위험관리 |
| IEC 62304:2015 | 의료기기 소프트웨어 수명주기 프로세스 |
| IEC 62366-1:2015 | 의료기기 사용적합성 공학 |
| 21 CFR Part 11 | 전자기록 및 전자서명 (FDA) |
| 21 CFR Part 820 | 품질시스템 규정 (FDA) |
| EU MDR 2017/745 | 유럽 의료기기 규정 |
| GAMP 5 | GxP 컴퓨터화 시스템 밸리데이션 가이드 |

---

> **본 명세서는 med.pikkto 개발팀의 내부 기술 문서이며, 마일스톤 진행에 따라 지속적으로 업데이트됩니다.**
