# Blog Agent Pipeline Handoff

- 브랜치명: `codex/blog-agent-pipeline`
- 기준 브랜치: `main`
- 핵심 목적:
  - 메드픽토 `소식` 허브를 의료기기 ISO/RA 정보성 유입 채널로 확장
  - Google News RSS + 공식 규제 출처 기반 일일 2건 배치 생성
  - `/news`, `/news/[slug]`, `/news/agent`, `/api/news/pipeline` 구성
  - Netlify Scheduled Function으로 자동 일일 배치 예열 연결

- 반드시 유지:
  - `app/news/page.tsx`
  - `app/news/[slug]/page.tsx`
  - `app/news/agent/page.tsx`
  - `app/api/news/agent/route.ts`
  - `app/api/news/pipeline/route.ts`
  - `components/NewsHubShell.tsx`
  - `components/NewsArticleView.tsx`
  - `components/NewsAgentStudio.tsx`
  - `lib/news-source-registry.ts`
  - `lib/news-pipeline.ts`
  - `lib/news-agent.ts`
  - `lib/news-agent-topics.ts`
  - `netlify/functions/news-pipeline-daily.mjs`
  - `docs/MED_PIKKTO_NEWS_AUTOMATION.md`

- 버려도 되는 변경:
  - 없음. 이번 변경은 모두 같은 기능 축에 속함

- 운영 메모:
  - Netlify 환경에 `NEXT_PUBLIC_SITE_URL` 과 `MED_NEWS_PIPELINE_SECRET` 필요
  - Scheduled Function cron은 `10 0 * * *` (UTC) = 오전 9시 10분 KST
  - `/news/agent` 는 내부 스튜디오라 `noindex`
  - `/news` 와 `/news/[slug]` 는 공개 유입 페이지

- 검증 결과:
  - `pnpm.cmd lint` 성공
  - `pnpm.cmd build` 성공
  - 로컬 프로덕션 서버 `4324`에서 `/news`, `/news/[slug]`, `/news/agent` 렌더 확인
  - `POST /api/news/pipeline` with secret 성공
  - `netlify/functions/news-pipeline-daily.mjs` 로컬 호출 성공

- 참고 스크린샷:
  - `qa-news-home-final.png`
  - `qa-news-article-final.png`
  - `qa-news-agent-final.png`

- 마지막 커밋 해시:
  - 작업 후 갱신 예정
