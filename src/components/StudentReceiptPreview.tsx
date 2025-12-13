import { GraduationCap, Calendar, CreditCard, CheckCircle } from 'lucide-react';
import { StudentReceipt } from '../lib/supabase';

interface StudentReceiptPreviewProps {
  receipt: StudentReceipt;
}

export default function StudentReceiptPreview({ receipt }: StudentReceiptPreviewProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getCurrencySymbol = (currency: string) => {
    const symbols: { [key: string]: string } = {
      'USD': '$',
      'CAD': 'C$',
      'GBP': '£',
      'EUR': '€',
      'AUD': 'A$',
      'NZD': 'NZ$',
      'INR': '₹',
      'SGD': 'S$',
      'MYR': 'RM',
      'IDR': 'Rp',
      'PHP': '₱',
    };
    return symbols[currency] || currency;
  };

  const currencySymbol = getCurrencySymbol(receipt.currency);

  return (
    <div
      className="bg-white max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
      style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif', fontSize: '14px' }}
    >
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white px-12 py-10">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            <div className="bg-white p-5 rounded-2xl shadow-xl border-4 border-white/30">
              <GraduationCap className="w-16 h-16 text-blue-700" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold mb-2 tracking-tight leading-tight drop-shadow-md">{receipt.school_name.toUpperCase()}</h1>
              <p className="text-blue-50 text-base leading-relaxed font-medium">{receipt.school_address}</p>
              <p className="text-blue-50 text-base leading-relaxed font-medium">
                {receipt.school_city}, {receipt.school_state} {receipt.school_postal_code}
              </p>
              {receipt.school_phone && (
                <p className="text-blue-100 text-sm mt-2 font-semibold">Tel: {receipt.school_phone}</p>
              )}
              {receipt.school_website && (
                <p className="text-blue-100 text-sm font-semibold">{receipt.school_website}</p>
              )}
            </div>
          </div>
          <div className="text-right bg-white/10 backdrop-blur-sm px-8 py-5 rounded-2xl border border-white/20 shadow-lg">
            <p className="text-xs text-blue-200 uppercase tracking-[0.2em] mb-3 font-semibold">Receipt Number</p>
            <p className="text-2xl font-bold tracking-wide">{receipt.receipt_number}</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white px-10 py-6">
        <h2 className="text-2xl font-extrabold uppercase tracking-[0.15em] text-center drop-shadow-lg">Official Tuition Payment Receipt</h2>
      </div>

      <div className="grid grid-cols-2 border-b border-slate-200">
        <div className="px-10 py-8 border-r border-slate-200 bg-gradient-to-br from-slate-50 to-white">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-blue-600 p-2.5 rounded-lg shadow-md">
              <GraduationCap className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Student Information</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-600 px-4 py-3 rounded-r-lg">
              <p className="text-xs text-blue-700 font-bold uppercase tracking-wider mb-1.5">Student Name</p>
              <p className="text-lg font-extrabold text-slate-900 leading-tight">{receipt.student_name}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1.5">Student ID</p>
              <p className="text-base font-bold text-slate-700 font-mono tracking-wide">{receipt.student_id}</p>
            </div>
            {receipt.student_email && (
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1.5">Email</p>
                <p className="text-sm text-slate-700 font-medium">{receipt.student_email}</p>
              </div>
            )}
            {receipt.student_phone && (
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1.5">Phone</p>
                <p className="text-sm text-slate-700 font-medium">{receipt.student_phone}</p>
              </div>
            )}
          </div>
        </div>

        <div className="px-10 py-8 bg-white">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-green-600 p-2.5 rounded-lg shadow-md">
              <Calendar className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Receipt Details</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-lg">
              <p className="text-xs text-green-700 font-bold uppercase tracking-wider mb-1.5">Date Issued</p>
              <p className="text-lg font-extrabold text-slate-900 leading-tight">{formatDate(receipt.date_issued)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1.5">Term</p>
              <p className="text-base font-bold text-slate-700">{receipt.term}</p>
            </div>
            {receipt.academic_year && (
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1.5">Academic Year</p>
                <p className="text-base font-bold text-slate-700">{receipt.academic_year}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-10 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-600 p-2 rounded-lg">
            <CreditCard className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider">Fee Breakdown</h3>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-slate-100 to-slate-50 border-b border-slate-200">
                <th className="text-left px-8 py-5 font-bold text-slate-700 uppercase text-xs tracking-[0.12em]">Description</th>
                <th className="text-right px-8 py-5 font-bold text-slate-700 uppercase text-xs tracking-[0.12em] w-48">Amount ({receipt.currency})</th>
              </tr>
            </thead>
            <tbody>
              {receipt.fee_items.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-100 hover:bg-blue-50/30 transition-colors"
                >
                  <td className="px-8 py-5 text-slate-800 font-medium">{item.description}</td>
                  <td className="text-right px-8 py-5 text-slate-700 font-semibold tabular-nums">
                    {currencySymbol}{item.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
              <tr className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-700 text-white">
                <td className="px-8 py-6 font-bold text-base uppercase tracking-wide">Total Paid</td>
                <td className="text-right px-8 py-6 font-bold text-2xl tabular-nums">
                  {currencySymbol}{receipt.total_amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 via-white to-green-50 border-t border-green-100 px-10 py-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider">Payment Information</h3>
            </div>
            <div className="space-y-2 ml-11">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-600">Payment Method:</span>
                <span className="text-sm font-bold text-slate-900">{receipt.payment_method}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-600">Payment Date:</span>
                <span className="text-sm font-bold text-slate-900">{formatDate(receipt.payment_date)}</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-700 text-white px-10 py-6 rounded-2xl shadow-lg">
            <p className="text-xs text-green-100 uppercase tracking-[0.15em] mb-2 font-semibold text-center">Payment Status</p>
            <p className="text-2xl font-bold tracking-wide text-center">PAID IN FULL</p>
          </div>
        </div>
      </div>

      {receipt.notes && (
        <div className="bg-slate-50 border-t border-slate-200 px-10 py-6">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Notes</p>
          <p className="text-sm text-slate-700 leading-relaxed">{receipt.notes}</p>
        </div>
      )}

      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-center px-10 py-8 border-t border-slate-700">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm text-slate-300 leading-relaxed font-semibold mb-3">
            This is an official payment receipt issued by {receipt.school_name}.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed italic mb-4">
            This document serves as proof of payment for tuition and fees for the term specified above. For questions or concerns, please contact the Bursar's Office or Financial Services Department.
          </p>
          <div className="border-t border-slate-700 pt-4 mt-4">
            <p className="text-xs text-slate-500">
              Document Generated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
