import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Building,
  CreditCard,
  UserCheck,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Banknote,
  Smartphone,
} from 'lucide-react';
import { ApplicationRecord } from '../types';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitApplication: (app: ApplicationRecord) => void;
  onViewStatus: (appId: string) => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  onSubmitApplication,
  onViewStatus,
}) => {
  const [step, setStep] = useState<number>(1);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [telecom, setTelecom] = useState('SKT');
  const [isAuthVerified, setIsAuthVerified] = useState(false);

  const [householdSize, setHouseholdSize] = useState<number>(3);
  const [district, setDistrict] = useState('양평읍');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [paymentMethod, setPaymentMethod] = useState<'voucher' | 'bank'>('bank');
  const [bankName, setBankName] = useState('국민은행');
  const [accountNumber, setAccountNumber] = useState('');

  const [submittedRecord, setSubmittedRecord] = useState<ApplicationRecord | null>(null);

  if (!isOpen) return null;

  const expectedAmount =
    householdSize === 1 ? 300000 : householdSize === 2 ? 400000 : 500000;

  const handleSimulateAuth = () => {
    if (!name || !phone) {
      alert('성명과 휴대폰 번호를 입력해주세요.');
      return;
    }
    setIsAuthVerified(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `REG-2026-04-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const record: ApplicationRecord = {
      id: newId,
      applicantName: name || '홍길동',
      phone: phone || '010-1234-5678',
      birthDate: birthDate || '1985-03-12',
      householdCount: householdSize,
      expectedAmount,
      paymentMethod,
      bankName: paymentMethod === 'bank' ? bankName : undefined,
      accountNumber: paymentMethod === 'bank' ? accountNumber || '110-384-918231' : undefined,
      district,
      appliedAt: formattedDate,
      status: '접수완료',
    };

    onSubmitApplication(record);
    setSubmittedRecord(record);
    setStep(4);
  };

  const handleResetAndClose = () => {
    setStep(1);
    setIsAuthVerified(false);
    setSubmittedRecord(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden border border-[#d3e7db] shadow-xl">
        {/* Header */}
        <div className="bg-[#eff5ee] p-5 sm:p-6 border-b border-[#d3e7db] flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#004625] block">
              2026년 생활안정 지원금
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-[#171d19]">
              온라인 간편 신청서 작성
            </h3>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full bg-white border border-[#c0c9bf] flex items-center justify-center text-[#506259] hover:bg-[#eff5ee] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step indicator */}
        {step < 4 && (
          <div className="px-6 pt-4 pb-2 border-b border-[#e4eae3] flex items-center justify-between text-xs">
            <span className={`font-bold ${step === 1 ? 'text-[#004625]' : 'text-[#707971]'}`}>
              1. 본인인증
            </span>
            <span className="text-[#c0c9bf]">›</span>
            <span className={`font-bold ${step === 2 ? 'text-[#004625]' : 'text-[#707971]'}`}>
              2. 세대 및 지역 확인
            </span>
            <span className="text-[#c0c9bf]">›</span>
            <span className={`font-bold ${step === 3 ? 'text-[#004625]' : 'text-[#707971]'}`}>
              3. 지급 수단 선택
            </span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="bg-[#eff5ee] p-3.5 rounded-xl flex items-center gap-2.5 text-xs text-[#404941] border border-[#d3e7db]">
                <ShieldCheck className="w-4 h-4 text-[#004625] shrink-0" />
                <span>
                  정부24 전자문서 행정정보 연계를 위해 신청자 본인의 실명 확인을 진행합니다.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171d19] mb-1">
                  신청자 성명
                </label>
                <input
                  type="text"
                  placeholder="예: 홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-[#c0c9bf] focus:border-[#004625] focus:ring-2 focus:ring-[#004625]/20 text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#171d19] mb-1">
                    생년월일 (6자리)
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="예: 850312"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-[#c0c9bf] focus:border-[#004625] focus:ring-2 focus:ring-[#004625]/20 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#171d19] mb-1">
                    통신사
                  </label>
                  <select
                    value={telecom}
                    onChange={(e) => setTelecom(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-[#c0c9bf] bg-white text-sm outline-none"
                  >
                    <option value="SKT">SKT</option>
                    <option value="KT">KT</option>
                    <option value="LGU+">LG U+</option>
                    <option value="알뜰폰">알뜰폰</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171d19] mb-1">
                  휴대전화 번호
                </label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    placeholder="010-0000-0000 (- 없이 입력 가능)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 h-11 px-3.5 rounded-xl border border-[#c0c9bf] focus:border-[#004625] focus:ring-2 focus:ring-[#004625]/20 text-sm outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleSimulateAuth}
                    className="px-4 rounded-xl bg-[#d3e7db] hover:bg-[#b7cbc0] text-[#00210f] text-xs font-bold whitespace-nowrap cursor-pointer"
                  >
                    {isAuthVerified ? '인증완료 ✓' : '간편 인증'}
                  </button>
                </div>
              </div>

              {isAuthVerified && (
                <div className="p-3 bg-[#eff5ee] rounded-xl text-xs font-semibold text-[#004625] flex items-center gap-2 border border-[#aff2c2]">
                  <CheckCircle2 className="w-4 h-4 text-[#004625]" />
                  <span>본인 확인이 안전하게 완료되었습니다. 다음 단계로 이동하세요.</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (!name) setName('홍길동');
                    if (!phone) setPhone('010-5555-8888');
                    setStep(2);
                  }}
                  className="w-full h-12 rounded-xl bg-[#004625] hover:bg-[#1e5e3a] text-white font-bold text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>다음: 세대 정보 확인</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#171d19] mb-1.5">
                  관할 거주지 (읍·면 선택)
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-[#c0c9bf] bg-white text-sm outline-none"
                >
                  <option value="양평읍">양평읍 (양평읍 행정복지센터)</option>
                  <option value="강상면">강상면 (강상면 행정복지센터)</option>
                  <option value="강하면">강하면 (강하면 행정복지센터)</option>
                  <option value="양서면">양서면 (양서면 행정복지센터)</option>
                  <option value="옥천면">옥천면 (옥천면 행정복지센터)</option>
                  <option value="서종면">서종면 (서종면 행정복지센터)</option>
                  <option value="단월면">단월면 (단월면 행정복지센터)</option>
                  <option value="청운면">청운면 (청운면 행정복지센터)</option>
                  <option value="양동면">양동면 (양동면 행정복지센터)</option>
                  <option value="지평면">지평면 (지평면 행정복지센터)</option>
                  <option value="용문면">용문면 (용문면 행정복지센터)</option>
                  <option value="개군면">개군면 (개군면 행정복지센터)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171d19] mb-1.5">
                  주민등록 세대원 수 선택
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setHouseholdSize(1)}
                    className={`py-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      householdSize === 1
                        ? 'bg-[#004625] text-white border-[#004625]'
                        : 'bg-white border-[#c0c9bf] text-[#404941]'
                    }`}
                  >
                    1인 가구 (30만원)
                  </button>
                  <button
                    type="button"
                    onClick={() => setHouseholdSize(2)}
                    className={`py-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      householdSize === 2
                        ? 'bg-[#004625] text-white border-[#004625]'
                        : 'bg-white border-[#c0c9bf] text-[#404941]'
                    }`}
                  >
                    2인 가구 (40만원)
                  </button>
                  <button
                    type="button"
                    onClick={() => setHouseholdSize(3)}
                    className={`py-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      householdSize >= 3
                        ? 'bg-[#004625] text-white border-[#004625]'
                        : 'bg-white border-[#c0c9bf] text-[#404941]'
                    }`}
                  >
                    3인 이상 (50만원)
                  </button>
                </div>
              </div>

              {/* Amount Summary */}
              <div className="bg-[#eff5ee] p-4 rounded-xl border border-[#d3e7db] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#506259]">세대당 확정 지급 예정액</span>
                  <p className="text-sm font-bold text-[#171d19]">
                    {district} 주민 세대 ({householdSize}인 기준)
                  </p>
                </div>
                <span className="text-xl font-extrabold text-[#004625]">
                  {(expectedAmount / 10000).toLocaleString()}만 원
                </span>
              </div>

              {/* Agreement */}
              <div className="p-3.5 bg-[#f5fbf4] rounded-xl border border-[#d3e7db] flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="termsCheck"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 rounded mt-0.5 accent-[#004625]"
                />
                <label htmlFor="termsCheck" className="text-xs text-[#404941] leading-relaxed cursor-pointer">
                  행정정보공동이용망을 통한 주민등록 주소 및 가구원 소득 적격 여부 전산 확인에 동의합니다. (별도 종이 서류 제출 생략)
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 h-12 rounded-xl border border-[#c0c9bf] text-xs font-bold text-[#404941] flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>이전</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-2/3 h-12 rounded-xl bg-[#004625] hover:bg-[#1e5e3a] text-white font-bold text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>다음: 지급 수단 선택</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <label className="block text-xs font-bold text-[#171d19] mb-1.5">
                지원금 지급 형태 선택
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                    paymentMethod === 'bank'
                      ? 'bg-[#eff5ee] border-[#004625] ring-2 ring-[#004625]/20'
                      : 'bg-white border-[#c0c9bf] hover:bg-[#f5fbf4]'
                  }`}
                >
                  <Banknote className="w-6 h-6 text-[#004625] mb-2" />
                  <span className="text-sm font-bold text-[#171d19] block">
                    일반 은행 계좌 입금
                  </span>
                  <span className="text-xs text-[#506259] mt-1 block">
                    신청인 명의 은행 계좌로 현금 직접 입금
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('voucher')}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                    paymentMethod === 'voucher'
                      ? 'bg-[#eff5ee] border-[#004625] ring-2 ring-[#004625]/20'
                      : 'bg-white border-[#c0c9bf] hover:bg-[#f5fbf4]'
                  }`}
                >
                  <Smartphone className="w-6 h-6 text-[#004625] mb-2" />
                  <span className="text-sm font-bold text-[#171d19] block">
                    모바일 지역사랑상품권
                  </span>
                  <span className="text-xs text-[#506259] mt-1 block">
                    지역 골목상권 가맹점 결제용 모바일 포인트
                  </span>
                </button>
              </div>

              {paymentMethod === 'bank' && (
                <div className="p-4 rounded-2xl bg-[#eff5ee] border border-[#d3e7db] space-y-3">
                  <span className="text-xs font-bold text-[#171d19] block">
                    입금 계좌 정보 (신청자 본인 명의)
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="col-span-1 h-11 px-2.5 rounded-xl border border-[#c0c9bf] bg-white text-xs font-semibold outline-none"
                    >
                      <option value="국민은행">국민은행</option>
                      <option value="신한은행">신한은행</option>
                      <option value="우리은행">우리은행</option>
                      <option value="하나은행">하나은행</option>
                      <option value="농협은행">농협은행</option>
                      <option value="카카오뱅크">카카오뱅크</option>
                      <option value="토스뱅크">토스뱅크</option>
                    </select>
                    <input
                      type="text"
                      placeholder="계좌번호 입력 (- 제외)"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="col-span-2 h-11 px-3 rounded-xl border border-[#c0c9bf] bg-white text-xs outline-none"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'voucher' && (
                <div className="p-4 rounded-2xl bg-[#eff5ee] border border-[#d3e7db]">
                  <p className="text-xs text-[#404941] leading-relaxed">
                    * 입력하신 휴대전화 번호({phone || '신청 휴대폰'})로 모바일 지역사랑상품권 등록 안내 알림톡이 발송됩니다.
                  </p>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-1/3 h-12 rounded-xl border border-[#c0c9bf] text-xs font-bold text-[#404941] flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>이전</span>
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-2/3 h-12 rounded-xl bg-[#004625] hover:bg-[#1e5e3a] text-white font-bold text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>신청서 최종 제출하기</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 4 && submittedRecord && (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#eff5ee] text-[#004625] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[#004625]" />
              </div>

              <div>
                <span className="text-xs font-bold text-[#004625] bg-[#aff2c2] px-3 py-1 rounded-full">
                  온라인 접수 완료
                </span>
                <h4 className="text-xl font-extrabold text-[#171d19] mt-3">
                  지원금 신청이 성공적으로 접수되었습니다!
                </h4>
                <p className="text-xs sm:text-sm text-[#506259] mt-1">
                  지급 심사 결과는 영업일 기준 3~5일 내에 문자로 안내드립니다.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-[#eff5ee] p-4 rounded-2xl border border-[#d3e7db] text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-[#707971]">신청 접수 번호</span>
                  <span className="font-bold text-[#004625]">{submittedRecord.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#707971]">신청자 성명</span>
                  <span className="font-semibold text-[#171d19]">{submittedRecord.applicantName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#707971]">가구원 수 / 예정액</span>
                  <span className="font-bold text-[#171d19]">
                    {submittedRecord.householdCount}인 가구 / {(submittedRecord.expectedAmount / 10000).toLocaleString()}만 원
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#707971]">지급 방식</span>
                  <span className="font-semibold text-[#171d19]">
                    {submittedRecord.paymentMethod === 'bank'
                      ? `${submittedRecord.bankName} 계좌 입금`
                      : '지역사랑상품권 모바일형'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    handleResetAndClose();
                    onViewStatus(submittedRecord.id);
                  }}
                  className="flex-1 py-3 rounded-xl bg-[#004625] hover:bg-[#1e5e3a] text-white font-bold text-xs cursor-pointer"
                >
                  내 신청 내역 조회하기
                </button>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="flex-1 py-3 rounded-xl border border-[#c0c9bf] text-[#404941] font-bold text-xs hover:bg-[#eff5ee] cursor-pointer"
                >
                  확인 (홈으로)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
