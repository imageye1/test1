export interface FAQItem {
  id: string;
  questionNumber: string;
  question: string;
  answer: string;
}

export interface ApplicationRecord {
  id: string;
  applicantName: string;
  phone: string;
  birthDate: string;
  householdCount: number;
  expectedAmount: number;
  paymentMethod: 'voucher' | 'bank';
  bankName?: string;
  accountNumber?: string;
  district: string;
  appliedAt: string;
  status: '접수완료' | '심사진행중' | '지급결정' | '지급완료';
}

export interface DistrictCenter {
  name: string;
  address: string;
  phone: string;
  hours: string;
  busInfo: string;
}
