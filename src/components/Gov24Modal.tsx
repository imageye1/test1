import React from 'react';
import { X, ShieldCheck, CheckCircle2, Lock, ExternalLink } from 'lucide-react';

interface Gov24ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Gov24Modal: React.FC<Gov24ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden border border-[#d3e7db] shadow-xl">
        {/* Header */}
        <div className="bg-[#eff5ee] p-5 border-b border-[#d3e7db] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#004625] text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#aff2c2]" />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#004625] block">
                행정안전부 전자정부 연동
              </span>
              <h3 className="text-base font-bold text-[#171d19]">
                정부24 행정정보공동이용
              </h3>
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

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs sm:text-sm text-[#404941] leading-relaxed">
            본 포털은 행정안전부 <strong>정부24 행정정보공동이용망</strong>과 실시간 연계되어 시민 여러분의 서류 발급 수고를 덜어드립니다.
          </p>

          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-[#eff5ee] border border-[#d3e7db] flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#004625] shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-[#171d19] block">주민등록등본 전산 확인</span>
                <span className="text-[#506259]">관내 거주 기간 및 가구원 수 자동 조회 완료</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#eff5ee] border border-[#d3e7db] flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#004625] shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-[#171d19] block">소득 적격 여부 간편 검증</span>
                <span className="text-[#506259]">국민건강보험공단 건강보험료 부과 내역 연계</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#eff5ee] border border-[#d3e7db] flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#004625] shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-[#171d19] block">서류 제로화 (종이 증빙 면제)</span>
                <span className="text-[#506259]">온라인 신청 시 별도 증명서 업로드 불필요</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#f5fbf4] border border-[#d3e7db] flex items-center gap-2 text-xs text-[#506259]">
            <Lock className="w-4 h-4 text-[#004625] shrink-0" />
            <span>암호화 전송 및 개인정보보호법에 따른 보안 인증 유지 중</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#004625] hover:bg-[#1e5e3a] text-white font-bold text-xs cursor-pointer transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
