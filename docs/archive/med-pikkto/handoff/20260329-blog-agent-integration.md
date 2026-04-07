# Blog Agent Integration

- 브랜치명: `codex/blog-agent-integration`
- 기준 브랜치: `main`
- 핵심 목적: `C:\pikkto_blog_portable_bundle`의 블로그 자동 작성 에이전트 구조를 메드픽토 서비스 문맥에 맞게 이식

## 반영 내용

- 헤더에 `소식` 진입점을 유지하고 `/news` 허브를 추가
- `/news` 페이지에 제품 업데이트, 규제 인사이트, 템플릿, 블로그 작성 에이전트 허브 셸 추가
- `/news/agent` 내부 스튜디오 추가
  - 주제 프리셋 선택
  - 글 방향 선택
  - 추가 지시 입력
  - 본문/SEO 키워드 미리보기
  - 본문 복사
- `/api/news/agent` 생성 API 추가
- 의료기기 ISO/RA 정보성 글용 시드 초안 생성 로직 추가
- Gemini 기반 보정 훅 추가
  - 공개 웹 호출에서는 기본적으로 시드 초안만 생성
  - `enhance: true`와 `x-med-blog-agent-secret`이 함께 맞을 때만 LLM 보정 허용
- `/news`를 sitemap에 추가

## 반드시 유지

- `/news/agent`는 내부 스튜디오 성격이므로 `noindex`
- 공개 API에서 무제한 LLM 호출이 일어나지 않도록 secret gating 유지
- 시드 초안은 의료기기 ISO/RA 정보성 콘텐츠 톤을 유지

## 버려도 되는 변경

- `/news` 허브의 카드 카피와 섹션 문구는 후속 브랜딩 작업에서 조정 가능
- 시드 초안 문구는 운영 중 반복 보정 가능

## 검증 결과

- `pnpm.cmd lint` 성공
- `pnpm.cmd build` 성공
- 데스크톱 QA
  - `/news` 허브 구조 확인
  - `/news/agent` 초안 미리보기 구조 확인
- 모바일 QA
  - `/news`와 `/news/agent` 390px 폭 스크린샷 기준 레이아웃 붕괴 없음
- API 생성 흐름
  - `POST /api/news/agent` 기준 topic/angle/custom brief payload 처리 확인

## 메모

- Playwright 브라우저 런처가 이 환경에서 정상 기동하지 않아, QA는 `next build` 산출물 기반 정적 미리보기 서버와 Chrome headless 스크린샷으로 수행함
- 실제 배포 환경에서 `NEXT_PUBLIC_SITE_URL`이 설정되면 `/news`와 `/news/agent` canonical/OG 절대 URL도 정상화됨
