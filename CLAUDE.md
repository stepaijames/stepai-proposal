# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

STEP AI 정부지원사업 현황 대시보드. Next.js + Supabase 기반 관리 시스템.

기존 브리핑 문서(index.html, STEP AI_status.html)도 함께 보관됨.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Database & Auth)

## Structure

```
src/
├── app/           # Next.js App Router 페이지
│   ├── layout.tsx # 루트 레이아웃
│   ├── page.tsx   # 대시보드 메인 페이지
│   └── globals.css
├── components/    # 재사용 컴포넌트
└── lib/
    └── supabase.ts # Supabase 클라이언트
```

Legacy files:
- `index.html` - R&D 컨소시엄 전략 브리핑 문서
- `STEP AI_status.html` - K-Culture 대중소공동도약 전략 문서

## Development

```bash
npm run dev    # 개발 서버 (http://localhost:3000)
npm run build  # 프로덕션 빌드
npm run start  # 프로덕션 서버
npm run lint   # ESLint 검사
```

## Environment Variables

`.env.local` 파일에 Supabase 연결 정보 설정:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Language

UI 및 문서는 한국어. 커밋 메시지와 코드 주석은 영어 사용.
