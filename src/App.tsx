/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeatureCards } from './components/FeatureCards';
import { FaqSection } from './components/FaqSection';
import { ActionSection } from './components/ActionSection';
import { Footer } from './components/Footer';
import { EligibilityModal } from './components/EligibilityModal';
import { ApplicationModal } from './components/ApplicationModal';
import { StatusCheckModal } from './components/StatusCheckModal';
import { Gov24Modal } from './components/Gov24Modal';
import { DistrictCentersModal } from './components/DistrictCentersModal';
import { INITIAL_APPLICATIONS, DISTRICT_CENTERS } from './data/mockData';
import { ApplicationRecord } from './types';
import {
  FileCheck,
  PhoneCall,
  Clock,
  Building2,
  CheckCircle,
  HelpCircle,
  Search,
  ExternalLink,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'guide' | 'status' | 'contact'>('guide');
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(1);

  // Modals state
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isStatusCheckOpen, setIsStatusCheckOpen] = useState(false);
  const [isGov24Open, setIsGov24Open] = useState(false);
  const [isCentersOpen, setIsCentersOpen] = useState(false);

  const [selectedAppId, setSelectedAppId] = useState<string>('');

  // Stored applications
  const [applications, setApplications] = useState<ApplicationRecord[]>(() => {
    const saved = localStorage.getItem('hope_portal_applications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_APPLICATIONS;
      }
    }
    return INITIAL_APPLICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('hope_portal_applications', JSON.stringify(applications));
  }, [applications]);

  const handleAddNewApplication = (newApp: ApplicationRecord) => {
    setApplications((prev) => [newApp, ...prev]);
  };

  const handleOpenStatusForId = (appId: string) => {
    setSelectedAppId(appId);
    setIsStatusCheckOpen(true);
  };

  // Font scale class
  const fontScaleClass =
    fontSizeLevel === 1
      ? 'text-base'
      : fontSizeLevel === 2
      ? 'text-[17px] leading-relaxed'
      : 'text-[18.5px] leading-loose';

  return (
    <div className={`min-h-screen flex flex-col bg-[#f5fbf4] ${fontScaleClass} text-[#171d19]`}>
      {/* Top Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        fontSizeLevel={fontSizeLevel}
        setFontSizeLevel={setFontSizeLevel}
        onOpenGov24={() => setIsGov24Open(true)}
        onOpenEligibility={() => setIsEligibilityOpen(true)}
        onOpenApply={() => setIsApplyOpen(true)}
        onOpenCheckStatus={() => setIsStatusCheckOpen(true)}
        onOpenCenters={() => setIsCentersOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Tab 1: 사업 안내 (Primary view exactly matching the user's screenshot) */}
        {activeTab === 'guide' && (
          <>
            <HeroSection />
            <FeatureCards onOpenEligibility={() => setIsEligibilityOpen(true)} />
            <FaqSection />
            <ActionSection
              onOpenApply={() => setIsApplyOpen(true)}
              onOpenCheckStatus={() => setIsStatusCheckOpen(true)}
              onOpenCenters={() => setIsCentersOpen(true)}
            />
          </>
        )}

        {/* Tab 2: 신청 확인 (Direct View) */}
        {activeTab === 'status' && (
          <div className="py-6 sm:py-10 max-w-3xl mx-auto space-y-6">
            <div className="text-center mb-8">
              <span className="text-xs font-semibold text-[#004625] bg-[#d3e7db] px-3 py-1 rounded-full inline-block mb-2">
                신청 내역 조회
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171d19]">
                신청 결과 및 지급 현황 확인
              </h2>
              <p className="text-xs sm:text-sm text-[#506259] mt-2">
                접수된 생활안정 지원금의 심사 상태 및 입금 예정 정보를 확인하세요.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e4ebe5] shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#e4eae3] mb-5">
                <span className="text-sm font-bold text-[#171d19]">
                  등록된 신청 건 ({applications.length}건)
                </span>
                <button
                  type="button"
                  onClick={() => setIsApplyOpen(true)}
                  className="text-xs font-bold text-[#004625] bg-[#eff5ee] hover:bg-[#d3e7db] px-3 py-1.5 rounded-full cursor-pointer transition-colors"
                >
                  + 새 신청서 작성
                </button>
              </div>

              <div className="space-y-4">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 sm:p-5 rounded-2xl bg-[#eff5ee]/70 border border-[#d3e7db] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-[#004625]">{app.id}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#aff2c2] text-[#00210f] font-bold">
                          {app.status}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-[#171d19]">
                        {app.applicantName} ({app.district} / {app.householdCount}인 가구)
                      </h4>
                      <p className="text-xs text-[#506259] mt-1">
                        지원액: {(app.expectedAmount / 10000).toLocaleString()}만 원 • {app.appliedAt}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenStatusForId(app.id)}
                      className="px-4 py-2 rounded-xl bg-[#004625] text-white text-xs font-bold hover:bg-[#1e5e3a] transition-colors cursor-pointer self-start sm:self-auto"
                    >
                      상세 현황 보기
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: 문의처 (Direct View) */}
        {activeTab === 'contact' && (
          <div className="py-6 sm:py-10 max-w-4xl mx-auto space-y-8">
            <div className="text-center mb-8">
              <span className="text-xs font-semibold text-[#004625] bg-[#d3e7db] px-3 py-1 rounded-full inline-block mb-2">
                양평군 공공지원 안내
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171d19]">
                생활안정 지원금 상담 및 문의처
              </h2>
              <p className="text-xs sm:text-sm text-[#506259] mt-2">
                전화 상담과 함께 관할 읍·면 행정복지센터 복지창구에서 대면 상담을 받으실 수 있습니다.
              </p>
            </div>

            {/* Department Info */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e4ebe5] shadow-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-[#004625]">총괄 담당 부서</span>
                  <h3 className="text-xl font-bold text-[#171d19]">
                    양평군청 복지정책과 희망복지팀
                  </h3>
                  <p className="text-xs sm:text-sm text-[#404941] leading-relaxed">
                    2026년 양평군민 생활안정 지원금의 사업 기획, 적격 심사 총괄 및 지급 확정 업무를 관장합니다.
                  </p>
                  <div className="pt-2">
                    <a
                      href="tel:031-770-2214"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#eff5ee] border border-[#d3e7db] text-base font-extrabold text-[#004625]"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>031-770-2214 / 031-770-3000</span>
                    </a>
                  </div>
                </div>

                <div className="bg-[#eff5ee] p-5 rounded-2xl border border-[#d3e7db] space-y-2 text-xs">
                  <span className="font-bold text-[#171d19] block mb-1">
                    운영 시간 및 점심시간 안내
                  </span>
                  <p className="text-[#404941]">
                    • <strong>평일:</strong> 09:00 ~ 18:00
                  </p>
                  <p className="text-[#404941]">
                    • <strong>점심시간:</strong> 12:00 ~ 13:00 (전화 및 창구 업무 일시 중단)
                  </p>
                  <p className="text-[#707971]">
                    * 토요일, 일요일 및 법정 공휴일은 전화 상담이 운영되지 않습니다. (인터넷 온라인 신청은 24시간 정상 가동)
                  </p>
                </div>
              </div>
            </div>

            {/* District Centers */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e4ebe5] shadow-xs">
              <h3 className="text-lg font-bold text-[#171d19] mb-4">
                양평군 관내 읍·면 행정복지센터 현장 창구 목록
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DISTRICT_CENTERS.map((center) => (
                  <div
                    key={center.name}
                    className="p-4 rounded-2xl bg-[#eff5ee]/60 border border-[#d3e7db]"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-bold text-sm text-[#171d19]">{center.name}</h4>
                      <span className="text-xs font-bold text-[#004625]">{center.phone}</span>
                    </div>
                    <p className="text-xs text-[#506259]">{center.address}</p>
                    <p className="text-[11px] text-[#707971] mt-1">{center.busInfo}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onOpenCenters={() => setIsCentersOpen(true)} />

      {/* Modals */}
      <EligibilityModal
        isOpen={isEligibilityOpen}
        onClose={() => setIsEligibilityOpen(false)}
        onOpenApply={() => {
          setIsEligibilityOpen(false);
          setIsApplyOpen(true);
        }}
      />

      <ApplicationModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        onSubmitApplication={handleAddNewApplication}
        onViewStatus={(appId) => {
          setIsApplyOpen(false);
          handleOpenStatusForId(appId);
        }}
      />

      <StatusCheckModal
        isOpen={isStatusCheckOpen}
        onClose={() => setIsStatusCheckOpen(false)}
        applications={applications}
        initialSearchId={selectedAppId}
      />

      <Gov24Modal
        isOpen={isGov24Open}
        onClose={() => setIsGov24Open(false)}
      />

      <DistrictCentersModal
        isOpen={isCentersOpen}
        onClose={() => setIsCentersOpen(false)}
      />
    </div>
  );
}
