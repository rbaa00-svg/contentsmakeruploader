# med.piKKto News Supabase Setup

`/news`, `/news/[slug]`, `/news/agent`, `/api/news/pipeline` 를 임시 테스트용으로 Supabase `posts` 테이블에 연결하는 방법입니다.

## 1. 환경 변수

`.env.local` 또는 배포 환경 변수에 아래 값을 넣습니다.

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

규칙:

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` 는 클라이언트 읽기용입니다.
- `SUPABASE_SERVICE_ROLE_KEY` 는 서버 전용입니다.
- `SUPABASE_SERVICE_ROLE_KEY` 는 절대 `NEXT_PUBLIC_` prefix로 노출하지 않습니다.

## 2. 최소 테이블 생성 SQL

Supabase SQL Editor에서 아래 SQL을 한 번 실행합니다.

```sql
create extension if not exists pgcrypto;

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content_json jsonb default '{}'::jsonb,
  content_md text,
  category text,
  tags text[] default '{}',
  source_type text not null default 'manual',
  source_links jsonb default '[]'::jsonb,
  seo_title text,
  seo_description text,
  status text not null default 'draft' check (status in ('draft', 'scheduled', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_posts_updated_at on public.posts;

create trigger trg_posts_updated_at
before update on public.posts
for each row
execute function public.set_updated_at();
```

현재 프로젝트의 `/news` 연동은 위 컬럼 세트에 맞춰 작성되어 있습니다. 이미 `posts` 테이블이 있다면, 누락된 컬럼만 추가해도 됩니다.

## 3. 테스트 데이터 3건 입력

```sql
insert into public.posts
(slug, title, excerpt, content_json, content_md, category, tags, source_type, source_links, seo_title, seo_description, status, published_at)
values
(
  'iso-14971-risk-file-tips',
  'ISO 14971 위험관리 파일 운영 팁',
  '위험관리 파일과 CER, 기술문서 연결성을 실무 관점에서 정리합니다.',
  '{"issueDate":"20260329","issueDateLabel":"2026년 3월 29일","slot":"practical-guide","eyebrow":"RISK MANAGEMENT","lead":"위험관리 파일은 Hazard, Risk Control, Verification Evidence가 끊기지 않게 이어져야 합니다.","laneLabel":"문서 작성 팁","ctaLabel":"템플릿 허브 보기","ctaHref":"/templates?q=ISO%2014971","sourceBadge":"MANUAL TEST POST","sourceNote":"Supabase 수동 테스트 데이터입니다.","sections":[{"heading":"위험관리 파일 운영 팁","subheading":"실무 연결","paragraphs":["위험관리 파일은 단일 문서가 아니라 CER, 기술문서, 검증 근거와 함께 읽어야 합니다."],"bullets":["Hazard 목록 최신화","Risk control trace 유지","Verification evidence 연결"]}],"references":[]}'::jsonb,
  '# ISO 14971 위험관리 파일 운영 팁',
  array['ISO 14971','Risk Management File','의료기기 문서'],
  'manual',
  '[]'::jsonb,
  'ISO 14971 위험관리 파일 운영 팁 | med.piKKto',
  '위험관리 파일과 CER, 기술문서 연결성을 실무 관점에서 정리합니다.',
  'published',
  now()
),
(
  'fda-estar-readiness-checklist',
  'FDA eSTAR 대응 체크리스트',
  'eSTAR 제출 준비 시 먼저 점검할 문서 세트와 참조 구조를 정리합니다.',
  '{"issueDate":"20260329","issueDateLabel":"2026년 3월 29일","slot":"practical-guide","eyebrow":"FDA ESTAR","lead":"eSTAR는 누락보다 참조 불일치가 더 큰 병목이 되기 쉽습니다.","laneLabel":"국가별 규제","ctaLabel":"템플릿 허브 보기","ctaHref":"/templates?q=FDA%20eSTAR","sourceBadge":"MANUAL TEST POST","sourceNote":"Supabase 수동 테스트 데이터입니다.","sections":[{"heading":"FDA eSTAR 대응 체크리스트","subheading":"제출 준비","paragraphs":["제출 전 문서 세트와 공통 변수가 연결되어 있는지 먼저 점검해야 합니다."],"bullets":["기술문서 참조 정리","DHF/DMR 연결성 확인","검토 코멘트 누락 방지"]}],"references":[]}'::jsonb,
  '# FDA eSTAR 대응 체크리스트',
  array['FDA eSTAR','510(k)','의료기기 인허가'],
  'manual',
  '[]'::jsonb,
  'FDA eSTAR 대응 체크리스트 | med.piKKto',
  'eSTAR 제출 준비 시 먼저 점검할 문서 세트와 참조 구조를 정리합니다.',
  'published',
  now()
),
(
  'audit-trail-data-integrity-guide',
  'Audit Trail과 Data Integrity 운영 가이드',
  'ALCOA+ 관점에서 변경 이력과 승인 근거를 어떻게 남길지 설명합니다.',
  '{"issueDate":"20260329","issueDateLabel":"2026년 3월 29일","slot":"practical-guide","eyebrow":"AUDIT TRAIL","lead":"누가, 언제, 왜 바꿨는지가 읽혀야 감사 대응이 됩니다.","laneLabel":"운영 체계","ctaLabel":"감사 근거 보기","ctaHref":"/tech/audit-trail-proof","sourceBadge":"MANUAL TEST POST","sourceNote":"Supabase 수동 테스트 데이터입니다.","sections":[{"heading":"Audit Trail 운영 가이드","subheading":"데이터 무결성","paragraphs":["Audit Trail은 변경 로그가 아니라 검토와 승인 근거까지 이어지는 운영 화면이어야 합니다."],"bullets":["ALCOA+ 관점 점검","승인 상태 기록","변경 사유 보존"]}],"references":[]}'::jsonb,
  '# Audit Trail과 Data Integrity 운영 가이드',
  array['Audit Trail','ALCOA+','Data Integrity'],
  'manual',
  '[]'::jsonb,
  'Audit Trail과 Data Integrity 운영 가이드 | med.piKKto',
  'ALCOA+ 관점에서 변경 이력과 승인 근거를 어떻게 남길지 설명합니다.',
  'published',
  now()
);
```

## 4. 연동 범위

- `/news`
  - Supabase `published` 글이 2건 이상이면 DB 게시글을 우선 사용합니다.
- `/news/[slug]`
  - 같은 `slug` 의 `published` 글을 DB에서 먼저 찾습니다.
- `/news/agent`
  - 생성한 초안을 `draft` 또는 `published` 상태로 저장할 수 있습니다.
- `/api/news/pipeline`
  - 일일 자동 생성 결과를 `published` 글로 동기화합니다.

## 5. 로컬 테스트 체크리스트

1. SQL Editor에서 테이블 생성
2. 테스트 데이터 3건 입력
3. `.env.local` 설정
4. `pnpm build`
5. `/news` 에서 DB 글 노출 확인
6. `/news/agent` 에서 `초안 저장`, `발행 저장` 확인
7. `/api/news/pipeline` 에 secret header와 함께 POST 후 DB 동기화 확인

## 6. 운영 전 주의

- 현재 service role key는 임시 테스트용으로만 사용합니다.
- 정식 배포 전에는 service role key를 반드시 회전합니다.
- 운영 단계에서는 RLS, 관리자 인증, 승인 워크플로우를 별도로 붙이는 것이 안전합니다.
