import React, { useState } from 'react';
import {
  X,
  Search,
  CheckCircle,
  Clock,
  Banknote,
  Smartphone,
  AlertCircle,
  Calendar,
} from 'lucide-react';
import { ApplicationRecord } from '../types';

interface StatusCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  applications: ApplicationRecord[];
  initialSearchId?: string;
}

export const StatusCheckModal: React.FC<StatusCheckModalProps> = ({
  isOpen,
  onClose,
  applications,
  initialSearchId = '',
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchId);
  const [activeRecord, setActiveRecord] = useState<ApplicationRecord | null>(
    applications[0] || null
  );

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchTerm.trim().toLowerCase();
    if (!query) return;

    const found = applications.find(
      (app) =>
        app.id.toLowerCase().includes(query) ||
        app.applicantName.toLowerCase().includes(query) ||
        app.phone.replace(/[^0-9]/g, '').includes(query.replace(/[^0-9]/g, ''))
    );

    if (found) {
      setActiveRecord(found);
    } else {
      alert('입력하신 정보로 조회된 신청 내역이 없습니다. (성명 또는 휴대폰 번호를 확인해 주세요)');
    }
  };

  const getStepIndex = (status: ApplicationRecord['status']) => {
    switch (status) {
      case '접수완료':
        return 1;
      case '심사진행중':
        return 2;
      case '지급결정':
        return 3;
      case '지급완료':
        return 4;
      default:
        return 1;
    }
  };

  const currentStep = activeRecord ? getStepIndex(activeRecord.status) : 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden border border-[#d3e7db] shadow-xl">
        {/* Header */}
        <div className="bg-[#eff5ee] p-5 sm:p-6 border-b border-[#d3e7db] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#004625] text-white flex items-center justify-center">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#004625] block">실시간 진행 현황</span>
              <h3 className="text-lg font-bold text-[#171d19]">신청 결과 및 내역 조회</h3>
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

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="신청자 성명, 휴대폰 번호, 접수번호 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 h-11 px-3.5 rounded-xl border border-[#c0c9bf] focus:border-[#004625] text-sm outline-none"
            />
            <button
              type="submit"
              className="px-5 rounded-xl bg-[#004625] text-white font-bold text-xs hover:bg-[#1e5e3a] cursor-pointer"
            >
              조회
            </button>
          </form>

          {/* Quick selection chips for registered apps */}
          {applications.length > 0 && (
            <div>
              <span className="text-xs text-[#707971] block mb-1.5">
                최근 신청 및 등록 건 (클릭 시 상세 확인):
              </span>
              <div className="flex flex-wrap gap-2">
                {applications.map((app) => (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => setActiveRecord(app)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                      activeRecord?.id === app.id
                        ? 'bg-[#004625] text-white border-[#004625]'
                        : 'bg-[#eff5ee] text-[#404941] border-[#d3e7db] hover:bg-[#d3e7db]'
                    }`}
                  >
                    {app.applicantName} ({app.id})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Record Detail View */}
          {activeRecord ? (
            <div className="space-y-5">
              {/* Progress Flow */}
              <div className="bg-[#eff5ee] p-4 sm:p-5 rounded-2xl border border-[#d3e7db]">
                <div className="flex items-center justify-between text-xs font-bold text-[#506259] mb-3">
                  <span className={currentStep >= 1 ? 'text-[#004625]' : ''}>1. 접수완료</span>
                  <span className={currentStep >= 2 ? 'text-[#004625]' : ''}>2. 심사진행중</span>
                  <span className={currentStep >= 3 ? 'text-[#004625]' : ''}>3. 지급결정</span>
                  <span className={currentStep >= 4 ? 'text-[#004625]' : ''}>4. 지급완료</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-[#d3e7db] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#004625] h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(currentStep / 4) * 100}%`,
                    }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-[#506259]">현재 처리 상태</span>
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-[#aff2c2] text-[#00210f]">
                    {activeRecord.status}
                  </span>
                </div>
              </div>

              {/* Detail Info Card */}
              <div className="bg-white rounded-2xl border border-[#e4ebe5] p-5 space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between pb-2 border-b border-[#e4eae3]">
                  <span className="text-[#707971]">신청 접수 번호</span>
                  <span className="font-bold text-[#004625]">{activeRecord.id}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#e4eae3]">
                  <span className="text-[#707971]">신청인 / 연락처</span>
                  <span className="font-semibold text-[#171d19]">
                    {activeRecord.applicantName} ({activeRecord.phone})
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#e4eae3]">
                  <span className="text-[#707971]">관할 지자체 / 가구</span>
                  <span className="font-semibold text-[#171d19]">
                    {activeRecord.district} / {activeRecord.householdCount}인 가구
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#e4eae3]">
                  <span className="text-[#707971]">확정 지원 금액</span>
                  <span className="font-extrabold text-base text-[#004625]">
                    {(activeRecord.expectedAmount / 10000).toLocaleString()}만 원
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#e4eae3]">
                  <span className="text-[#707971]">지급 방식</span>
                  <span className="font-semibold text-[#171d19] flex items-center gap-1">
                    {activeRecord.paymentMethod === 'bank' ? (
                      <>
                        <Banknote className="w-4 h-4 text-[#004625]" />
                        <span>{activeRecord.bankName} 계좌 입금</span>
                      </>
                    ) : (
                      <>
                        <Smartphone className="w-4 h-4 text-[#004625]" />
                        <span>모바일 지역사랑상품권</span>
                      </>
                    )}
                  </span>
                </div>
                <div className="flex justify-between pt-1 text-xs text-[#707971]">
                  <span>접수 일시</span>
                  <span>{activeRecord.appliedAt}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-[#707971]">
              조회할 신청 내역을 선택해주세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
