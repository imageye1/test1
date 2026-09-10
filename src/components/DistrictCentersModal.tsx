import React, { useState } from 'react';
import { X, Building2, Phone, MapPin, Clock, Bus, Search } from 'lucide-react';
import { DISTRICT_CENTERS } from '../data/mockData';

interface DistrictCentersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DistrictCentersModal: React.FC<DistrictCentersModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [filter, setFilter] = useState('');

  if (!isOpen) return null;

  const filteredCenters = DISTRICT_CENTERS.filter(
    (c) => c.name.includes(filter) || c.address.includes(filter)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden border border-[#d3e7db] shadow-xl">
        {/* Header */}
        <div className="bg-[#eff5ee] p-5 sm:p-6 border-b border-[#d3e7db] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#004625] text-white flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#004625] block">
                양평군 방문 신청 및 현장 상담
              </span>
              <h3 className="text-lg font-bold text-[#171d19]">
                관할 읍·면 행정복지센터 복지창구 안내
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

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Search input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#707971]" />
            <input
              type="text"
              placeholder="읍·면 이름 또는 주소 검색 (예: 양평읍, 용문면, 양서면)"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#c0c9bf] text-xs sm:text-sm outline-none focus:border-[#004625]"
            />
          </div>

          <div className="space-y-3">
            {filteredCenters.map((center) => (
              <div
                key={center.name}
                className="p-4 rounded-2xl bg-[#eff5ee]/60 border border-[#d3e7db] hover:border-[#004625] transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-[#171d19]">{center.name}</h4>
                  <a
                    href={`tel:${center.phone}`}
                    className="flex items-center gap-1 text-xs font-bold text-[#004625] bg-white px-2.5 py-1 rounded-full border border-[#d3e7db] hover:bg-[#d3e7db]"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{center.phone}</span>
                  </a>
                </div>

                <div className="space-y-1.5 text-xs text-[#404941]">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#506259] shrink-0 mt-0.5" />
                    <span>{center.address}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#506259] shrink-0 mt-0.5" />
                    <span>{center.hours}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Bus className="w-3.5 h-3.5 text-[#506259] shrink-0 mt-0.5" />
                    <span className="text-[#506259]">{center.busInfo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 bg-[#f5fbf4] rounded-xl border border-[#d3e7db] text-xs text-[#506259] leading-relaxed">
            * 방문 신청 시 세대주 또는 성인 가구원의 신분증(주민등록증, 운전면허증)을 지참해 주시기 바랍니다.
          </div>
        </div>
      </div>
    </div>
  );
};
