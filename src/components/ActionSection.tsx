import React from 'react';
import { motion } from 'motion/react';
import {
  FileSignature,
  Search,
  PhoneCall,
  Clock,
  Building2,
  ChevronRight,
} from 'lucide-react';

interface ActionSectionProps {
  onOpenApply: () => void;
  onOpenCheckStatus: () => void;
  onOpenCenters: () => void;
}

export const ActionSection: React.FC<ActionSectionProps> = ({
  onOpenApply,
  onOpenCheckStatus,
  onOpenCenters,
}) => {
  return (
    <section className="mb-14 sm:mb-16">
      {/* Outer wrapper with subtle background tint like in screenshot */}
      <div className="bg-[#eff5ee]/60 rounded-3xl p-6 sm:p-8 border border-[#d3e7db]">
        {/* Two Large Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
          <motion.button
            type="button"
            whileHover={{
              y: -6,
              scale: 1.04,
              transition: {
                type: 'spring',
                stiffness: 450,
                damping: 8,
                mass: 0.5,
              },
            }}
            whileTap={{ scale: 0.96, y: 0 }}
            onClick={onOpenApply}
            className="bounce-hover w-full sm:w-auto min-w-[280px] h-14 px-7 rounded-full bg-[#004625] hover:bg-[#1e5e3a] text-white font-bold text-base shadow-sm hover:shadow-md flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <FileSignature className="w-5 h-5 text-[#aff2c2] bounce-target-icon" />
            <span>지금 바로 신청하기 (온라인 간편 신청)</span>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{
              y: -6,
              scale: 1.04,
              transition: {
                type: 'spring',
                stiffness: 450,
                damping: 8,
                mass: 0.5,
              },
            }}
            whileTap={{ scale: 0.96, y: 0 }}
            onClick={onOpenCheckStatus}
            className="bounce-hover w-full sm:w-auto min-w-[220px] h-14 px-6 rounded-full bg-white hover:bg-[#f5fbf4] text-[#171d19] border border-[#c0c9bf] font-bold text-base shadow-xs hover:border-[#707971] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4 text-[#506259] bounce-target-icon" />
            <span>신청 결과 / 내역 조회</span>
          </motion.button>
        </div>

        {/* Contact & Consultation Inset Box */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#d3e7db] shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left: Department & Phone */}
            <div className="md:col-span-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#eff5ee] text-[#004625] flex items-center justify-center shrink-0">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-medium text-[#506259] block">
                  궁금하신 사항은 편하게 전화주세요
                </span>
                <p className="text-base font-bold text-[#171d19] leading-tight mt-0.5">
                  일자리복지와 생활지원팀
                </p>
                <a
                  href="tel:02-123-4567"
                  className="text-lg font-extrabold text-[#004625] tracking-tight hover:underline flex items-center gap-1.5 mt-0.5"
                >
                  <span>02-123-4567</span>
                  <span className="text-sm">📞</span>
                </a>
              </div>
            </div>

            {/* Middle: Counseling Hours */}
            <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-[#e4eae3] pt-4 md:pt-0 md:pl-6">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#1e5e3a] shrink-0 mt-0.5" />
                <div className="text-xs text-[#404941] leading-relaxed">
                  <span className="font-bold text-[#171d19] block mb-1">
                    전화 상담 가능 시간
                  </span>
                  <p>
                    평일 오전 9시 ~ 오후 6시까지 (낮 12:00 ~ 13:00 점심시간)
                  </p>
                  <p className="text-[#707971] mt-0.5">
                    * 토요일, 일요일 및 공휴일은 유선 상담이 진행되지 않습니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: District Office Welfare Desk */}
            <div className="md:col-span-3 border-t md:border-t-0 md:border-l border-[#e4eae3] pt-4 md:pt-0 md:pl-6 flex items-center">
              <motion.button
                type="button"
                whileHover={{
                  x: 5,
                  scale: 1.02,
                  transition: { type: 'spring', stiffness: 450, damping: 10 },
                }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenCenters}
                className="w-full text-left flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#eff5ee] transition-colors cursor-pointer group"
              >
                <Building2 className="w-5 h-5 text-[#004625] shrink-0 mt-0.5 bounce-target-icon" />
                <div className="text-xs text-[#404941]">
                  <p className="font-semibold text-[#171d19] leading-snug group-hover:text-[#004625]">
                    가까운 동 주민센터 복지창구에서도 친절히 안내해 드립니다.
                  </p>
                  <span className="inline-flex items-center gap-0.5 text-[#004625] font-bold mt-1 text-[11px]">
                    관할 주민센터 찾기
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
