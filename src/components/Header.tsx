import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Landmark,
  ZoomIn,
  ShieldCheck,
  Check,
  ChevronDown,
  ChevronRight,
  FileText,
  Calculator,
  Coins,
  HelpCircle,
  FileEdit,
  Search,
  BarChart3,
  PhoneCall,
  Building2,
} from 'lucide-react';

export type TabType = 'guide' | 'status' | 'contact';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  fontSizeLevel: number;
  setFontSizeLevel: (level: number | ((prev: number) => number)) => void;
  onOpenGov24: () => void;
  onOpenEligibility?: () => void;
  onOpenApply?: () => void;
  onOpenCheckStatus?: () => void;
  onOpenCenters?: () => void;
}

interface SubMenuItem {
  id: string;
  title: string;
  desc: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  fontSizeLevel,
  setFontSizeLevel,
  onOpenGov24,
  onOpenEligibility,
  onOpenApply,
  onOpenCheckStatus,
  onOpenCenters,
}) => {
  const [hoveredTab, setHoveredTab] = useState<TabType | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleFontSize = () => {
    setFontSizeLevel((prev) => (prev >= 3 ? 1 : prev + 1));
  };

  const fontScaleLabel =
    fontSizeLevel === 1 ? '기본' : fontSizeLevel === 2 ? '115%' : '130%';

  const handleMouseEnter = (tab: TabType) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHoveredTab(tab);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setHoveredTab(null);
    }, 200);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveTab('guide');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  const NAV_ITEMS: { id: TabType; label: string }[] = [
    { id: 'guide', label: '사업 안내' },
    { id: 'status', label: '신청 확인' },
    { id: 'contact', label: '문의처' },
  ];

  const SUB_MENUS: Record<TabType, SubMenuItem[]> = {
    guide: [
      {
        id: 'guide-overview',
        title: '사업 개요 및 지원 기준',
        desc: '2026년 4월 신청 일정 및 3대 핵심 요건',
        icon: FileText,
        onClick: () => scrollToSection('hero-section'),
      },
      {
        id: 'guide-calc',
        title: '대상 자격 모의계산기',
        desc: '거주 및 소득 기준 30초 간편 자격 판정',
        badge: '간편진단',
        icon: Calculator,
        onClick: () => {
          setActiveTab('guide');
          onOpenEligibility?.();
        },
      },
      {
        id: 'guide-amount',
        title: '지원 금액 및 지급 수단',
        desc: '가구별 30만~50만원, 양평사랑상품권·계좌입금',
        icon: Coins,
        onClick: () => scrollToSection('features-section'),
      },
      {
        id: 'guide-faq',
        title: '자주 묻는 질문 (FAQ)',
        desc: '중복 수령 여부 및 지급 절차 핵심 정리',
        icon: HelpCircle,
        onClick: () => scrollToSection('faq-section'),
      },
    ],
    status: [
      {
        id: 'status-apply',
        title: '온라인 간편 신청서 작성',
        desc: '본인인증 후 3분 만에 신청 접수 완료',
        badge: '접수중',
        icon: FileEdit,
        onClick: () => onOpenApply?.(),
      },
      {
        id: 'status-lookup',
        title: '실시간 접수 내역 조회',
        desc: '성명·휴대전화 번호로 심사진행 즉시 확인',
        icon: Search,
        onClick: () => {
          setActiveTab('status');
          onOpenCheckStatus?.();
        },
      },
      {
        id: 'status-steps',
        title: '처리 단계별 진행 현황',
        desc: '접수완료 → 서류심사 → 자격확정 → 지급완료',
        icon: BarChart3,
        onClick: () => setActiveTab('status'),
      },
    ],
    contact: [
      {
        id: 'contact-dept',
        title: '양평군청 복지정책과',
        desc: '총괄 희망복지팀 안내 (☎ 031-770-2214)',
        icon: PhoneCall,
        onClick: () => setActiveTab('contact'),
      },
      {
        id: 'contact-centers',
        title: '12개 읍·면 행정복지센터',
        desc: '관내 복지창구 주소, 전화번호 및 대중교통',
        badge: '방문상담',
        icon: Building2,
        onClick: () => onOpenCenters?.(),
      },
      {
        id: 'contact-gov24',
        title: '정부24 연계인증 안내',
        desc: '주민등록등본 등 행정정보공동이용 사전 동의',
        icon: ShieldCheck,
        onClick: () => onOpenGov24(),
      },
    ],
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e4ebe5] shadow-xs">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <motion.div
          whileHover={{
            y: -3,
            scale: 1.02,
            transition: { type: 'spring', stiffness: 450, damping: 9, mass: 0.5 },
          }}
          whileTap={{ scale: 0.97 }}
          onClick={() => scrollToSection('hero-section')}
          className="bounce-hover-subtle flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#eff5ee] border border-[#d3e7db] flex items-center justify-center text-[#004625] group-hover:bg-[#d3e7db] transition-colors bounce-target-icon">
            <Landmark className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-[#506259] leading-tight tracking-tight">
              지방자치단체 공공서비스
            </span>
            <span className="text-base sm:text-lg font-bold text-[#171d19] tracking-tight leading-snug">
              우리동네 희망지원 포털
            </span>
          </div>
        </motion.div>

        {/* Center: Desktop Navigation Pills with Hover Dropdowns */}
        <nav
          className="hidden md:flex items-center gap-1 bg-[#f5fbf4] p-1 rounded-full border border-[#e4ebe5] relative"
          onMouseLeave={handleMouseLeave}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            const isHovered = hoveredTab === item.id;
            return (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.id)}
              >
                <motion.button
                  type="button"
                  whileHover={{
                    y: -5,
                    scale: 1.06,
                    transition: {
                      type: 'spring',
                      stiffness: 450,
                      damping: 8,
                      mass: 0.5,
                    },
                  }}
                  whileTap={{ scale: 0.94, y: 0 }}
                  onClick={() => {
                    setActiveTab(item.id);
                  }}
                  className={`bounce-hover-nav flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold cursor-pointer select-none ${
                    isActive
                      ? 'bg-[#004625] text-white shadow-sm'
                      : 'text-[#404941] hover:text-[#004625] hover:bg-[#e9efe9]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 bounce-target-icon ${
                      isHovered ? 'rotate-180' : ''
                    } ${isActive ? 'text-white' : 'text-[#707971]'}`}
                  />
                </motion.button>

                {/* Desktop Dropdown Menu */}
                {isHovered && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-80 animate-in fade-in slide-in-from-top-1 duration-150"
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="bg-white rounded-2xl border border-[#d3e7db] shadow-xl overflow-hidden p-2 space-y-1">
                      <div className="px-3 py-1.5 bg-[#eff5ee] rounded-xl flex items-center justify-between">
                        <span className="text-xs font-bold text-[#004625]">
                          {item.label} 세부 메뉴
                        </span>
                        <span className="text-[10px] text-[#506259]">바로가기</span>
                      </div>

                      {SUB_MENUS[item.id].map((sub) => {
                        const IconComponent = sub.icon;
                        return (
                          <motion.button
                            key={sub.id}
                            type="button"
                            whileHover={{
                              x: 6,
                              scale: 1.01,
                              transition: {
                                type: 'spring',
                                stiffness: 450,
                                damping: 10,
                              },
                            }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                              sub.onClick();
                              setHoveredTab(null);
                            }}
                            className="bounce-hover-item w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#f5fbf4] transition-colors text-left group cursor-pointer"
                          >
                            <div className="flex items-start gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-[#eff5ee] text-[#004625] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#d3e7db] transition-colors bounce-target-icon">
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-bold text-[#171d19] group-hover:text-[#004625] transition-colors">
                                    {sub.title}
                                  </span>
                                  {sub.badge && (
                                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#aff2c2] text-[#00210f]">
                                      {sub.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-[#506259] leading-tight mt-0.5">
                                  {sub.desc}
                                </p>
                              </div>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-[#a0aaa0] group-hover:text-[#004625] transition-colors shrink-0 ml-1.5" />
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right: Accessibility & Government Links */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Font Zoom Toggle */}
          <motion.button
            type="button"
            whileHover={{
              y: -4,
              scale: 1.05,
              transition: { type: 'spring', stiffness: 450, damping: 9, mass: 0.5 },
            }}
            whileTap={{ scale: 0.94 }}
            onClick={toggleFontSize}
            className="bounce-hover-subtle flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-[#404941] px-2.5 sm:px-3 py-1.5 rounded-full border border-[#c0c9bf] bg-white hover:bg-[#f5fbf4] hover:border-[#707971] cursor-pointer"
            title="글자 크기 변경"
          >
            <ZoomIn className="w-3.5 h-3.5 text-[#506259] bounce-target-icon" />
            <span className="whitespace-nowrap">글자 확대</span>
            {fontSizeLevel > 1 && (
              <span className="text-[10px] font-bold bg-[#aff2c2] text-[#00210f] px-1 rounded">
                {fontScaleLabel}
              </span>
            )}
          </motion.button>

          {/* Government 24 Link */}
          <motion.button
            type="button"
            whileHover={{
              y: -4,
              scale: 1.05,
              transition: { type: 'spring', stiffness: 450, damping: 9, mass: 0.5 },
            }}
            whileTap={{ scale: 0.94 }}
            onClick={onOpenGov24}
            className="bounce-hover-subtle flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-[#1e5e3a] px-2.5 sm:px-3 py-1.5 rounded-full border border-[#c0c9bf] bg-[#eff5ee] hover:bg-[#d3e7db] cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#1e5e3a] bounce-target-icon" />
            <span className="whitespace-nowrap">정부24 연계인증</span>
          </motion.button>

          {/* Official Emblem / Public Mark */}
          <div
            className="w-7 h-7 rounded-full border border-[#c0c9bf] flex items-center justify-center bg-[#eff5ee] text-[#1e5e3a]"
            title="공공누리 안심 포털 인증"
          >
            <div className="w-4 h-4 rounded-full border-1.5 border-[#1e5e3a] flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-[#1e5e3a] stroke-[3]" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sub Navigation Bar with Hover Sub-menus */}
      <div
        className="md:hidden border-t border-[#e4ebe5] bg-[#f5fbf4] relative"
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center justify-around px-4 py-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            const isHovered = hoveredTab === item.id;
            return (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.id)}
              >
                <motion.button
                  type="button"
                  whileHover={{
                    y: -4,
                    scale: 1.06,
                    transition: {
                      type: 'spring',
                      stiffness: 450,
                      damping: 8,
                      mass: 0.5,
                    },
                  }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    setActiveTab(item.id);
                    setHoveredTab(isHovered ? null : item.id);
                  }}
                  className={`bounce-hover-nav flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer select-none ${
                    isActive
                      ? 'bg-[#004625] text-white shadow-xs'
                      : 'text-[#404941] hover:text-[#004625] hover:bg-[#e9efe9]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 bounce-target-icon ${
                      isHovered ? 'rotate-180' : ''
                    } ${isActive ? 'text-white' : 'text-[#707971]'}`}
                  />
                </motion.button>
              </div>
            );
          })}
        </div>

        {/* Mobile Dropdown Sub-menu Container */}
        {hoveredTab && (
          <div
            className="absolute top-full left-0 right-0 z-50 px-3 pb-3 pt-1 shadow-xl bg-[#f5fbf4]/95 backdrop-blur-md border-b border-[#e4ebe5] animate-in fade-in slide-in-from-top-1 duration-150"
            onMouseEnter={() => handleMouseEnter(hoveredTab)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-md mx-auto bg-white rounded-2xl border border-[#d3e7db] shadow-lg overflow-hidden p-2 space-y-1">
              <div className="px-3 py-1.5 bg-[#eff5ee] rounded-xl flex items-center justify-between">
                <span className="text-xs font-bold text-[#004625]">
                  {NAV_ITEMS.find((n) => n.id === hoveredTab)?.label} 세부 메뉴
                </span>
                <span className="text-[10px] text-[#506259]">
                  원하시는 항목을 선택해주세요
                </span>
              </div>

              {SUB_MENUS[hoveredTab].map((sub) => {
                const IconComponent = sub.icon;
                return (
                  <motion.button
                    key={sub.id}
                    type="button"
                    whileHover={{
                      x: 6,
                      scale: 1.01,
                      transition: {
                        type: 'spring',
                        stiffness: 450,
                        damping: 10,
                      },
                    }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      sub.onClick();
                      setHoveredTab(null);
                    }}
                    className="bounce-hover-item w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#f5fbf4] active:bg-[#e9efe9] transition-colors text-left group cursor-pointer"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#eff5ee] text-[#004625] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#d3e7db] transition-colors bounce-target-icon">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-[#171d19] group-hover:text-[#004625] transition-colors">
                            {sub.title}
                          </span>
                          {sub.badge && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#aff2c2] text-[#00210f]">
                              {sub.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#506259] leading-tight mt-0.5">
                          {sub.desc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-[#a0aaa0] group-hover:text-[#004625] transition-colors shrink-0 ml-1.5" />
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

