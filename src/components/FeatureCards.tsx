import React from 'react';
import { motion } from 'motion/react';
import {
  Users,
  CreditCard,
  UserCheck,
  CheckCircle2,
  Check,
  MapPin,
  ArrowRight,
  FileText,
} from 'lucide-react';

interface FeatureCardsProps {
  onOpenEligibility: () => void;
}

export const FeatureCards: React.FC<FeatureCardsProps> = ({
  onOpenEligibility,
}) => {
  return (
    <section id="features-section" className="mb-14 sm:mb-16">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6 sm:mb-8">
        <div>
          <span className="text-xs sm:text-sm font-bold text-[#004625] tracking-tight block mb-1">
            한눈에 쏙 들어오는
          </span>
          <h2 className="text-2xl sm:text-[28px] font-extrabold text-[#171d19] tracking-tight">
            사업 주요 핵심 안내
          </h2>
        </div>
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#506259]">
          <CheckCircle2 className="w-4 h-4 text-[#004625]" />
          <span>누구나 읽기 쉬운 쉬운말 기준 적용</span>
        </div>
      </div>

      {/* 3 Columns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: 자격 요건 */}
        <motion.div
          whileHover={{
            y: -6,
            transition: { type: 'spring', stiffness: 400, damping: 14 },
          }}
          className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e4ebe5] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-[#eff5ee] text-[#004625] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-[#506259] bg-[#eff5ee] px-3 py-1 rounded-full">
                자격 요건
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#171d19] tracking-tight mb-1">
              누가 받을 수 있나요?
            </h3>
            <p className="text-xs font-medium text-[#506259] mb-5">
              지원 대상
            </p>

            <ul className="space-y-3.5 mb-6 text-sm text-[#404941] leading-relaxed">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#004625] shrink-0 mt-1 stroke-[2.5]" />
                <span>
                  <strong className="font-bold text-[#171d19]">2026년 1월 1일 이전</strong>부터 우리 시/군/구에 계속 거주하며 주민등록을 두신 분
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#004625] shrink-0 mt-1 stroke-[2.5]" />
                <span>
                  가구 소득이 <strong className="font-bold text-[#171d19]">기준 중위소득 100% 이하</strong>에 해당하는 모든 가정
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Checker Inset Box */}
          <div className="bg-[#eff5ee] rounded-xl p-4 border border-[#d3e7db]">
            <div className="flex items-start gap-2 mb-3">
              <MapPin className="w-4 h-4 text-[#004625] shrink-0 mt-0.5" />
              <p className="text-xs text-[#404941] leading-snug">
                내가 대상인지 헷갈리시나요? 복잡한 계산 없이 30초면 바로 확인할 수 있어요.
              </p>
            </div>
            <motion.button
              type="button"
              whileHover={{
                y: -4,
                scale: 1.02,
                transition: {
                  type: 'spring',
                  stiffness: 450,
                  damping: 9,
                  mass: 0.5,
                },
              }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenEligibility}
              className="bounce-hover w-full py-2.5 px-3 rounded-lg bg-[#d3e7db] hover:bg-[#b7cbc0] text-[#00210f] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>내 대상 여부 바로 조회하기</span>
              <ArrowRight className="w-3.5 h-3.5 bounce-target-icon" />
            </motion.button>
          </div>
        </motion.div>

        {/* Card 2: 지원 금액 */}
        <motion.div
          whileHover={{
            y: -6,
            transition: { type: 'spring', stiffness: 400, damping: 14 },
          }}
          className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e4ebe5] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-[#eff5ee] text-[#004625] flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#00210f] bg-[#aff2c2] px-3 py-1 rounded-full">
                지원 금액
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#171d19] tracking-tight mb-1">
              어떤 혜택을 받나요?
            </h3>
            <p className="text-xs font-medium text-[#506259] mb-5">
              가구원 수에 따른 차등 지급
            </p>

            {/* Payout tiers */}
            <div className="space-y-2.5 mb-6">
              <div className="flex items-center justify-between bg-[#eff5ee] px-4 py-3 rounded-xl border border-[#e4eae3]">
                <span className="text-sm font-semibold text-[#171d19]">1인 가구</span>
                <span className="text-base font-extrabold text-[#004625]">30만 원</span>
              </div>
              <div className="flex items-center justify-between bg-[#eff5ee] px-4 py-3 rounded-xl border border-[#e4eae3]">
                <span className="text-sm font-semibold text-[#171d19]">2인 가구</span>
                <span className="text-base font-extrabold text-[#004625]">40만 원</span>
              </div>
              <div className="flex items-center justify-between bg-[#eff5ee] px-4 py-3 rounded-xl border border-[#e4eae3]">
                <span className="text-sm font-semibold text-[#171d19]">3인 이상 가구</span>
                <span className="text-base font-extrabold text-[#004625]">50만 원</span>
              </div>
            </div>
          </div>

          {/* Payment Method Inset Box */}
          <div className="bg-[#eff5ee] rounded-xl p-4 border border-[#d3e7db]">
            <span className="text-xs font-bold text-[#171d19] block mb-1">
              지급 형태 (택 1)
            </span>
            <p className="text-xs text-[#404941] leading-relaxed">
              동네 골목상권에서 현금처럼 쓰는 <strong className="font-semibold text-[#171d19]">지역사랑상품권</strong> 또는 자주 쓰시는 <strong className="font-semibold text-[#171d19]">일반 은행 계좌 입금</strong> 중 편하게 골라 받으세요.
            </p>
          </div>
        </motion.div>

        {/* Card 3: 간편 절차 */}
        <motion.div
          whileHover={{
            y: -6,
            transition: { type: 'spring', stiffness: 400, damping: 14 },
          }}
          className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e4ebe5] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-[#eff5ee] text-[#004625] flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-[#506259] bg-[#eff5ee] px-3 py-1 rounded-full">
                간편 절차
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#171d19] tracking-tight mb-1">
              어떻게 신청하나요?
            </h3>
            <p className="text-xs font-medium text-[#506259] mb-5">
              3단계로 끝나는 신청 과정
            </p>

            {/* 3 Steps */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#004625] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h4 className="text-sm font-bold text-[#171d19]">
                    온라인 신청 <span className="text-xs font-normal text-[#004625] bg-[#aff2c2] px-1.5 py-0.5 rounded ml-1">(가장 빨라요)</span>
                  </h4>
                  <p className="text-xs text-[#506259] mt-0.5">
                    포털에서 휴대폰 간편인증 후 기본 신청서 작성
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#d3e7db] text-[#004625] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h4 className="text-sm font-bold text-[#171d19]">방문 신청</h4>
                  <p className="text-xs text-[#506259] mt-0.5">
                    주소지 관할 주민센터 복지창구 신분증 지참 방문
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#d3e7db] text-[#004625] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <h4 className="text-sm font-bold text-[#171d19]">신속 지급</h4>
                  <p className="text-xs text-[#506259] mt-0.5">
                    지급 결정 문자(SMS) 수신 후 7일 이내 즉시 수령
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Zero Paper Inset Box */}
          <div className="bg-[#eff5ee] rounded-xl p-3.5 border border-[#d3e7db] flex items-center gap-2 text-xs font-medium text-[#004625]">
            <FileText className="w-4 h-4 shrink-0 text-[#004625]" />
            <span>온라인 신청 시 별도 종이 서류 제출 제로</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

