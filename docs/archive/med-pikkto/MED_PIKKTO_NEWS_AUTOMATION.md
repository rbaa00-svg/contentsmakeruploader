# med.piKKto News Automation

> 문서 버전: v1.0  
> 최종 수정: 2026-03-29  
> 대상: `/news`, `/news/[slug]`, `/news/agent`, `/api/news/pipeline`

## 1. 목적

메드픽토 소식 허브는 단순 공지 게시판이 아니라 검색 유입을 넓히기 위한 정보성 콘텐츠 파이프라인이다.

핵심 목표는 아래 두 가지다.

- 매일 2건의 SEO 유입형 글을 자동으로 구성한다.
- 최신 규제 뉴스와 상시 유입형 실무 가이드를 함께 운영한다.

## 2. 일일 발행 구조

하루에 항상 두 개의 포스트를 만든다.

1. 최신 규제 브리프
2. 실무형 가이드

브리프는 Google News RSS와 공식 출처를 조합해 만든다.  
가이드는 문서 작성 팁, 국가별 규제, 분류, Audit Trail, 제출 준비 같은 상시 유입형 주제를 순환한다.

## 3. 출처 전략

### 3.1 최신 이슈

- Google News RSS 검색 쿼리
  - 국내 인허가 동향
  - FDA eSTAR / 510(k)
  - EU MDR / MDCG
  - 분류 / 시장별 규제

### 3.2 공식 참고 출처

- 식약처 의료기기 정책정보
- FDA Medical Devices
- European Commission Medical Devices Sector
- IMDRF Documents
- TGA Medical devices

## 4. 게시 방식

현재 MVP는 DB 없이도 공개 허브를 유지하기 위해 `날짜 기반 슬러그`와 `결정적 생성 로직`으로 포스트를 구성한다.

- `/news`
  - 오늘자 2건과 최근 아카이브를 보여준다.
- `/news/[slug]`
  - 날짜/슬롯 기준으로 포스트를 렌더한다.
- `/api/news/pipeline`
  - 일일 배치를 예열하고 재검증하는 내부 엔드포인트

## 5. 자동화 연결

### 5.1 현재 MVP

Netlify Scheduled Function이 `POST /api/news/pipeline` 를 하루 한 번 호출하면 된다.

권장 시각:

- 매일 오전 9시 10분 KST

권장 헤더:

- `x-med-news-pipeline-secret: <MED_NEWS_PIPELINE_SECRET>`

효과:

- 오늘자 2건 배치를 예열
- `/news` 와 오늘 생성된 상세 페이지 재검증

구현 위치:

- `netlify/functions/news-pipeline-daily.mjs`

스케줄 기준:

- `10 0 * * *` (UTC)
- 한국 시간으로는 매일 오전 9시 10분

### 5.2 향후 DB 연결 시

추후 DB/CMS를 연결하면 `runDailyNewsPipeline()` 내부에 아래 단계만 추가하면 된다.

- 게시 큐 테이블 insert
- published_at 저장
- slug 고정
- 승인 상태 반영

즉, 현재 구조는 “자동 공개 허브 + 미래 게시 큐 연결 포인트”까지 포함한다.

## 6. 주제 다양화 규칙

상시 유입형 글은 아래 축을 순환한다.

- 문서 작성 팁
- 국가별 규제
- 의료기기 분류
- ISO 13485 문서관리
- ISO 14971 위험관리
- FDA eSTAR 대응
- CER 임상근거
- DHF 운영
- Audit Trail / Data Integrity
- 허가 반려 리스크 최소화

## 7. 운영 메모

- `/news/agent` 는 내부 스튜디오이므로 `noindex`
- `/news` 와 `/news/[slug]` 는 공개 유입 페이지
- sitemap 에 `/news` 와 최근 상세 슬러그를 포함
- 실시간 뉴스 fetch 실패 시 fallback 항목으로 안전하게 동작
- Netlify 환경에는 `NEXT_PUBLIC_SITE_URL` 과 `MED_NEWS_PIPELINE_SECRET` 가 모두 설정돼 있어야 함
