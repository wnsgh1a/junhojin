제공해주신 파일 내용을 바탕으로, 기술 스택과 현재 구현 상황이 명확히 드러나도록 작성한 **GitHub README.md** 초안입니다.

---

# Junhojin Portfolio Project

Next.js와 Supabase를 활용하여 제작 중인 개인 포트폴리오 및 뉴스 플랫폼 웹사이트입니다. 깔끔한 UI와 사용자 경험을 최우선으로 고려하여 설계되었습니다.

## 🛠 기술 스택

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS 4
- **Icons**: Phosphor Icons
- **Language**: TypeScript

### Backend & Database
- **Database**: Supabase (PostgreSQL 기반)
- **Authentication**: Supabase Auth (예정)

---

## ✨ 주요 기능 및 페이지

### 1. 현재 구현 완료 (Front-end)
- **메인 화면 (Home)**: Hero Slider를 통한 시각적 하이라이트 제공
- **소개 (About)**: 프로젝트 및 개인 소개 섹션
- **작업 (Work)**: 전체 프로젝트 리스트 확인 가능
- **소식 (News)**: 최신 소식 리스트 확인 가능
- **문의 (Contact)**: 연락처 및 문의 양식 UI

### 2. 구현 예정 (Back-end & Details)
- **세부 페이지**: Work 및 News의 상세 정보 페이지 연동
- **데이터베이스 연동**: Supabase를 활용한 실시간 데이터 로칭 및 관리
- **관리자 기능**: 관리자 로그인을 통한 포트폴리오 및 뉴스 업로드 기능

---

## 🏗 프로젝트 구조

```text
app/
├── admin/          # 관리자 로그인 및 포트폴리오 관리
├── api/            # Supabase 테스트용 API 라우트
├── portfolio/      # 포트폴리오 리스트 및 상세 페이지
├── news/           # 뉴스 리스트 및 상세 페이지
├── about/          # 소개 페이지
└── contact/        # 문의 페이지
components/         # 재사용 가능한 UI 컴포넌트 (Header, Footer, Slider 등)
lib/                # Supabase 클라이언트 설정 등 공통 로직
```

---

## 🚀 시작하기

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **환경 변수 설정**
   `.env.local` 파일을 생성하고 Supabase 관련 정보를 입력하세요.
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **개발 서버 실행**
   ```bash
   npm run dev
   ```

---

## 📝 업데이트 기록
- **2025/11/24**: 프론트엔드 주요 페이지(메인, Work, About, News, Contact) 레이아웃 구현 완료
