import { Crown, Award, Banknote } from 'lucide-react';
import { StudentReceipt } from '../lib/supabase';

interface StudentReceiptPreviewPremiumProps {
  receipt: StudentReceipt;
}

export default function StudentReceiptPreviewPremium({ receipt }: StudentReceiptPreviewPremiumProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getCurrencySymbol = (currency: string) => {
    const symbols: { [key: string]: string } = {
      'USD': '$', 'CAD': 'C$', 'GBP': '£', 'EUR': '€', 'AUD': 'A$', 'NZD': 'NZ$',
      'INR': '₹', 'SGD': 'S$', 'MYR': 'RM', 'IDR': 'Rp', 'PHP': '₱',
    };
    return symbols[currency] || currency;
  };

  const currencySymbol = getCurrencySymbol(receipt.currency);

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50 max-w-4xl mx-auto shadow-2xl border-4 border-amber-600" style={{ fontFamily: 'Georgia, serif' }}>
      <div className="bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 px-12 py-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 border-4 border-amber-300 rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-56 h-56 border-4 border-amber-300 rounded-full"></div>
        </div>
        <div className="relative z-10 text-center">
          <Crown className="w-16 h-16 text-amber-100 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-3" style={{ letterSpacing: '0.05em' }}>{receipt.school_name}</h1>
          <p className="text-amber-100 text-lg font-semibold">Official Tuition Payment Receipt</p>
          <div className="mt-6 inline-block bg-white/20 backdrop-blur-sm px-8 py-3 rounded-full border-2 border-amber-300">
            <p className="text-amber-100 text-xs uppercase tracking-widest">Receipt No.</p>
            <p className="text-white text-xl font-bold">{receipt.receipt_number}</p>
          </div>
        </div>
      </div>

      <div className="px-12 py-10">
        <div className="grid grid-cols-2 gap-10 mb-10">
          <div className="bg-gradient-to-br from-amber-50 to-white border-2 border-amber-300 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-amber-700" />
              <h3 className="text-base font-bold text-amber-900 uppercase">Distinguished Student</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-amber-700 uppercase tracking-wider font-semibold">Full Name</p>
                <p className="text-lg font-bold text-slate-900">{receipt.student_name}</p>
              </div>
              <div>
                <p className="text-xs text-amber-700 uppercase tracking-wider font-semibold">Student ID</p>
                <p className="text-base font-mono text-slate-700">{receipt.student_id}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-white border-2 border-amber-300 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Banknote className="w-6 h-6 text-amber-700" />
              <h3 className="text-base font-bold text-amber-900 uppercase">Academic Period</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-amber-700 uppercase tracking-wider font-semibold">Term</p>
                <p className="text-lg font-bold text-slate-900">{receipt.term}</p>
              </div>
              <div>
                <p className="text-xs text-amber-700 uppercase tracking-wider font-semibold">Issued</p>
                <p className="text-base text-slate-700">{formatDate(receipt.date_issued)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-4 border-amber-400 rounded-xl overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-amber-600 to-yellow-600 px-8 py-4">
            <h3 className="text-xl font-bold text-white uppercase tracking-wide">Payment Summary</h3>
          </div>
          <table className="w-full">
            <thead className="bg-amber-50 border-b-2 border-amber-300">
              <tr>
                <th className="text-left px-8 py-4 text-sm font-bold text-amber-900 uppercase tracking-wider">Description</th>
                <th className="text-right px-8 py-4 text-sm font-bold text-amber-900 uppercase tracking-wider">Amount ({receipt.currency})</th>
              </tr>
            </thead>
            <tbody>
              {receipt.fee_items.map((item, index) => (
                <tr key={index} className="border-b border-amber-100">
                  <td className="px-8 py-4 text-base text-slate-700">{item.description}</td>
                  <td className="text-right px-8 py-4 text-base font-semibold text-slate-900 tabular-nums">
                    {currencySymbol}{item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
              <tr className="bg-gradient-to-r from-amber-600 to-yellow-600">
                <td className="px-8 py-6 text-xl font-bold text-white uppercase">Total Received</td>
                <td className="text-right px-8 py-6 text-2xl font-bold text-white tabular-nums">
                  {currencySymbol}{receipt.total_amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl px-10 py-6 text-center border-4 border-green-700 shadow-xl">
          <p className="text-green-100 text-sm uppercase tracking-widest mb-2">Payment Status</p>
          <p className="text-white text-3xl font-bold">PAID IN FULL</p>
          <p className="text-green-100 text-sm mt-2">Payment Method: {receipt.payment_method} • Date: {formatDate(receipt.payment_date)}</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-800 to-amber-900 px-12 py-6 text-center border-t-4 border-amber-600">
        <p className="text-amber-200 text-sm font-semibold">
          {receipt.school_address} • {receipt.school_city}, {receipt.school_state} • {receipt.school_phone}
        </p>
        <p className="text-amber-300 text-xs mt-2">{receipt.school_website}</p>
      </div>
    </div>
  );
}
