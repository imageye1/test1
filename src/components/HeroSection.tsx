import React from 'react';
import { Home, Calendar, Clock, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero-section" className="mb-10 sm:mb-12">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs sm:text-sm text-[#506259] mb-5">
        <Home className="w-3.5 h-3.5 text-[#506259]" />
        <span className="hover:text-[#004625] cursor-pointer">복지·생활지원</span>
        <span className="text-[#c0c9bf] font-light">›</span>
        <span className="font-semibold text-[#004625]">2026년 생활안정 지원금</span>
      </nav>

      {/* Main Banner Hero Card */}
      <div className="bg-[#eff5ee] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#d3e7db] shadow-xs">
        {/* Category Pill Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d3e7db] text-[#004625] text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#004625]" />
          <span>2026년 주민 맞춤 지원</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#171d19] tracking-tight leading-tight sm:leading-snug mb-3">
          2026년 우리동네 생활안정 지원금 지원 사업
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg text-[#404941] leading-relaxed mb-7 max-w-3xl">
          고물가로 힘든 지역 주민의 생활 부담을 덜어드리기 위해 세대당 최대{' '}
          <strong className="font-bold text-[#171d19]">50만 원</strong>을 신속하게 지원합니다.
        </p>

        {/* Schedule & Highlights Inset Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-[#d3e7db] flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-xs">
          {/* Left: Schedule Information */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#004625] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-semibold text-[#506259]">신청 및 접수 기간</span>
                <span className="bg-[#aff2c2] text-[#00210f] text-[11px] font-bold px-2 py-0.5 rounded-full">
                  D-14일 남음
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-[#171d19] tracking-tight">
                2026년 4월 1일(수) ~ 4월 30일(목) 오후 6시까지
              </p>
            </div>
          </div>

          {/* Right: 24h Availability Information */}
          <div className="flex items-center gap-2 bg-[#eff5ee] text-[#404941] px-4 py-3 rounded-xl text-xs sm:text-sm font-medium border border-[#d3e7db]">
            <Clock className="w-4 h-4 text-[#1e5e3a] shrink-0" />
            <span>인터넷 신청은 주말·공휴일에도 24시간 가능해요</span>
          </div>
        </div>
      </div>
    </section>
  );
};
