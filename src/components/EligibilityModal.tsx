import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, ArrowRight, Calculator } from 'lucide-react';
import { INCOME_MEDIAN_2026 } from '../data/mockData';

interface EligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApply: () => void;
}

export const EligibilityModal: React.FC<EligibilityModalProps> = ({
  isOpen,
  onClose,
  onOpenApply,
}) => {
  const [isResident, setIsResident] = useState<boolean | null>(true);
  const [householdSize, setHouseholdSize] = useState<number>(3);
  const [incomeRange, setIncomeRange] = useState<'below' | 'above'>('below');

  if (!isOpen) return null;

  const medianIncome = INCOME_MEDIAN_2026[Math.min(householdSize, 4)] || 5361000;
  const isEligible = isResident === true && incomeRange === 'below';
  const expectedAmount =
    householdSize === 1 ? '30만 원' : householdSize === 2 ? '40만 원' : '50만 원';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden border border-[#d3e7db] shadow-xl">
        {/* Header */}
        <div className="bg-[#eff5ee] p-5 sm:p-6 border-b border-[#d3e7db] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#004625] text-white flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#004625] block">30초 간편 모의계산</span>
              <h3 className="text-lg font-bold text-[#171d19]">내 대상 여부 바로 조회</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#c0c9bf] flex items-center justify-center text-[#506259] hover:bg-[#eff5ee] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Question 1: Residency */}
          <div>
            <label className="block text-sm font-bold text-[#171d19] mb-2">
              1. 2026년 1월 1일 이전부터 관내 주민등록 거주 중이신가요?
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setIsResident(true)}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                  isResident === true
                    ? 'bg-[#eff5ee] border-[#004625] text-[#004625] ring-2 ring-[#004625]/20'
                    : 'bg-white border-[#c0c9bf] text-[#404941] hover:bg-[#f5fbf4]'
                }`}
              >
                예, 계속 거주 중입니다
              </button>
              <button
                type="button"
                onClick={() => setIsResident(false)}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                  isResident === false
                    ? 'bg-[#eff5ee] border-[#004625] text-[#004625] ring-2 ring-[#004625]/20'
                    : 'bg-white border-[#c0c9bf] text-[#404941] hover:bg-[#f5fbf4]'
                }`}
              >
                아니오, 타 지역/전입
              </button>
            </div>
          </div>

          {/* Question 2: Household Size */}
          <div>
            <label className="block text-sm font-bold text-[#171d19] mb-2">
              2. 주민등록등본상 함께 거주하는 세대원 수는 몇 명인가요?
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setHouseholdSize(size)}
                  className={`py-3 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                    householdSize === size
                      ? 'bg-[#004625] text-white border-[#004625]'
                      : 'bg-white border-[#c0c9bf] text-[#404941] hover:bg-[#f5fbf4]'
                  }`}
                >
                  {size === 4 ? '4인 이상' : `${size}인`}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Income Status */}
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <label className="text-sm font-bold text-[#171d19]">
                3. 가구 합산 월 소득 기준
              </label>
              <span className="text-xs text-[#506259]">
                {householdSize}인 기준: 약 {(medianIncome / 10000).toLocaleString()}만 원 이하
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setIncomeRange('below')}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                  incomeRange === 'below'
                    ? 'bg-[#eff5ee] border-[#004625] text-[#004625] ring-2 ring-[#004625]/20'
                    : 'bg-white border-[#c0c9bf] text-[#404941] hover:bg-[#f5fbf4]'
                }`}
              >
                중위소득 100% 이하 (해당)
              </button>
              <button
                type="button"
                onClick={() => setIncomeRange('above')}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                  incomeRange === 'above'
                    ? 'bg-[#eff5ee] border-[#004625] text-[#004625] ring-2 ring-[#004625]/20'
                    : 'bg-white border-[#c0c9bf] text-[#404941] hover:bg-[#f5fbf4]'
                }`}
              >
                기준 초과
              </button>
            </div>
          </div>

          {/* Result Card */}
          <div
            className={`p-4 rounded-2xl border ${
              isEligible
                ? 'bg-[#eff5ee] border-[#aff2c2] text-[#00210f]'
                : 'bg-[#fff5f5] border-[#ffdad6] text-[#93000a]'
            }`}
          >
            {isEligible ? (
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <CheckCircle className="w-5 h-5 text-[#004625]" />
                  <span className="text-sm font-bold text-[#004625]">
                    축하합니다! 지원 대상에 해당합니다.
                  </span>
                </div>
                <p className="text-xs text-[#404941] mb-2 leading-relaxed">
                  선택하신 가구원 수({householdSize}인 가구) 기준 예상 지원금은{' '}
                  <strong className="text-sm font-black text-[#004625]">{expectedAmount}</strong>
                  입니다.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenApply();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#004625] text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#1e5e3a] cursor-pointer"
                >
                  <span>바로 온라인 신청서 작성하기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-[#ba1a1a] shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <span className="font-bold block mb-0.5">자격 요건 재확인이 필요합니다.</span>
                  <p>
                    2026년 1월 1일 이전 관내 전입 및 기준 중위소득 100% 이하 가구에 한해 지급됩니다.
                    상세 예외 조건은 양평군청 복지정책과(031-770-2214)로 유선 상담바랍니다.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
