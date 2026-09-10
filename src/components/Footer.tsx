import React from 'react';
import { Headphones, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenCenters: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCenters }) => {
  return (
    <footer className="bg-[#eff5ee] border-t border-[#d3e7db] pt-12 pb-14 text-[#404941]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 pb-8 border-b border-[#d3e7db]">
          {/* Left: Portal Identity & Description */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="text-lg font-bold text-[#171d19]">
                우리동네 희망지원 포털
              </span>
              <span className="bg-[#aff2c2] text-[#00210f] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                공공복지 알리미
              </span>
            </div>
            <p className="text-xs sm:text-[13px] text-[#506259] leading-relaxed">
              본 누리집은 지자체 시민을 위한 맞춤형 생계, 주거, 교육, 일자리 복지 정책 사업의 종합 정보를 신속하게 전달하고 간편한 신청을 돕는 통합 포털입니다.
            </p>
          </div>

          {/* Right: 120 Help Call Center Widget */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#d3e7db] flex items-center gap-4 shrink-0 shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-[#004625] text-white flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6 text-[#aff2c2]" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-[#506259] block">
                시민 맞춤 민원상담 헬프콜
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-xl sm:text-2xl font-black text-[#004625] tracking-tight">
                  120
                </span>
                <span className="text-xs font-medium text-[#404941]">
                  다산콜센터/지역민원
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle: Links */}
        <div className="py-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-[13px]">
          <a
            href="#privacy"
            onClick={(e) => {
              e.preventDefault();
              alert('개인정보처리방침: 본 포털은 개인정보보호법에 의거하여 시민의 개인정보를 엄격히 보호합니다.');
            }}
            className="font-bold text-[#171d19] hover:text-[#004625] underline underline-offset-4"
          >
            개인정보처리방침
          </a>
          <span className="text-[#c0c9bf]">|</span>
          <a
            href="#terms"
            onClick={(e) => {
              e.preventDefault();
              alert('이용약관: 지자체 공공서비스 포털 이용 약관을 준수합니다.');
            }}
            className="hover:text-[#004625]"
          >
            이용약관
          </a>
          <span className="text-[#c0c9bf]">|</span>
          <a
            href="#guide"
            onClick={(e) => {
              e.preventDefault();
              alert('누리집 이용안내: 웹 접근성 지침을 준수하며 모든 기기에서 편리하게 열람하실 수 있습니다.');
            }}
            className="hover:text-[#004625]"
          >
            누리집 이용안내
          </a>
          <span className="text-[#c0c9bf]">|</span>
          <button
            type="button"
            onClick={onOpenCenters}
            className="hover:text-[#004625] cursor-pointer"
          >
            찾아오시는 길
          </button>
          <span className="text-[#c0c9bf]">|</span>
          <a
            href="#remote"
            onClick={(e) => {
              e.preventDefault();
              alert('원격지원 서비스: 고령층 및 디지털 취약계층을 위한 원격 화면 안내 지원(02-120 문의)');
            }}
            className="hover:text-[#004625] flex items-center gap-1"
          >
            <span>원격지원 서비스</span>
            <ExternalLink className="w-3 h-3 text-[#506259]" />
          </a>
        </div>

        {/* Bottom: Legal Address and Copyright */}
        <div className="text-[11px] sm:text-xs text-[#707971] space-y-1.5 leading-relaxed">
          <p>
            우편번호 12554 경기도 양평군 양평읍 군청로 20 양평군청 복지정책과 희망복지팀
          </p>
          <p>
            시스템 이용문의: 양평군 종합민원콜센터 031-770-3000 / 경기도콜센터 031-120 (평일 09:00 ~ 18:00)
          </p>
          <p className="pt-2 text-[#506259]">
            © 2026 Hope Support Civic Portal (Yangpyeong-gun). All rights reserved. 본 웹사이트는 공공누리 제1유형에 따라 공개됩니다.
          </p>
        </div>
      </div>
    </footer>
  );
};
