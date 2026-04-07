# Legal Compliance UI Handoff

- Branch: `codex/legal-compliance-ui`
- Base branch: `main`
- Purpose: 한국 법률 준수용 푸터 정보, 이용약관/개인정보 처리방침 페이지, 문의 폼 동의 UI, API 검증, 보안 헤더를 반영하고 실제 서비스 문맥에 맞는 법률 본문까지 채운다.

## Core changes

- Footer
  - 상호명, 대표자, 주소, 사업자등록번호, 개인정보 보호책임자 정보를 추가
  - `/terms`, `/privacy-policy` 링크 추가
  - 개인정보 처리방침 링크를 시각적으로 강조
- Legal pages
  - `/terms`
  - `/privacy-policy`
  - 실제 서비스 문맥에 맞는 본문 섹션, 시행일, 양언어 카피 추가
- Demo request form
  - 전체 동의 + 개별 동의 4종 추가
  - 필수 동의 3종 미체크 시 제출 차단
  - 자동 완성 억제 및 입력 보안 속성 보강
- API
  - 필수 동의 검증 추가
  - Google Sheets webhook payload에 동의 필드 추가
  - 기존 시트 스키마와 호환되도록 `notes`에도 consent summary를 함께 적재
- Security
  - `Strict-Transport-Security`
  - `X-Content-Type-Options`
  - `X-Frame-Options`
  - `Referrer-Policy`
  - `Permissions-Policy`

## Keep

- 기존 `/contact-us` 데모 요청 흐름
- Google Sheets webhook 우선 / Resend fallback 구조
- bilingual header/footer 구조

## Follow-up

- 약관/개인정보처리방침 확정 법률 문구가 도착하면 현재 본문을 최종본으로 교체
- Google Sheets에서 동의 필드를 개별 컬럼으로 확정 운영하려면 Apps Script와 시트 컬럼을 추가 정리
- 회원가입 기능이 생기면 이번 동의 UI 패턴을 재사용해 동일 기준으로 반영
- 실제 배포 환경에서 HTTPS 강제 리다이렉트와 mixed content 유무 최종 확인

## Verification

- `pnpm.cmd install`
- `pnpm.cmd lint`
- `pnpm.cmd build`
- HTTP checks
  - `/` 200
  - `/contact-us` 200
  - `/terms` 200
  - `/privacy-policy` 200
  - security headers present
- API checks
  - required consents missing => 400
  - required consents present => 200
- Browser QA
  - footer legal info visible
  - privacy link highlighted
  - consent blocks visible
  - refusal notice visible
  - `/privacy-policy` Korean content renders correctly
  - `/privacy-policy` English content renders correctly
  - `/terms` route opens correctly
