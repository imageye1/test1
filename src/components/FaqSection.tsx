import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_DATA } from '../data/mockData';

export const FaqSection: React.FC = () => {
  // Q1 open by default as shown in the screenshot
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    q1: true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="faq-section" className="mb-14 sm:mb-16">
      {/* Centered Heading */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d3e7db] text-[#004625] text-xs font-semibold mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-[#004625]" />
          <span>시민 여러분이 자주 묻는 말씀</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171d19] tracking-tight mb-2">
          궁금한 점을 먼저 확인해보세요
        </h2>
        <p className="text-sm sm:text-base text-[#404941]">
          이해하기 어려운 행정 단어 없이 가장 시원하게 답변해 드립니다.
        </p>
      </div>

      {/* Accordion Container */}
      <div className="max-w-4xl mx-auto space-y-3">
        {FAQ_DATA.map((item) => {
          const isOpen = !!openItems[item.id];
          return (
            <motion.div
              key={item.id}
              whileHover={{
                y: -3,
                transition: { type: 'spring', stiffness: 450, damping: 12 },
              }}
              className={`rounded-2xl border transition-colors duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-[#eff5ee]/60 border-[#d3e7db] shadow-xs'
                  : 'bg-white border-[#e4ebe5] hover:border-[#c0c9bf] hover:shadow-xs'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer select-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3 pr-2">
                  <span className="shrink-0 bg-[#aff2c2] text-[#00210f] text-xs font-extrabold px-2 py-0.5 rounded">
                    {item.questionNumber}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#171d19] tracking-tight">
                    {item.question}
                  </span>
                </div>
                <div className="w-7 h-7 rounded-full bg-white border border-[#d3e7db] flex items-center justify-center shrink-0 text-[#506259]">
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#004625]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#506259]" />
                  )}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 text-sm sm:text-[15px] text-[#404941] leading-relaxed border-t border-[#e4eae3]">
                      <p className="mt-2 pl-9 sm:pl-10 relative">
                        <span className="absolute left-1 sm:left-2 top-0.5 text-xs font-bold text-[#004625]">
                          답변
                        </span>
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

