import { Sparkles, Star, Heart } from 'lucide-react';
import { StudentReceipt } from '../lib/supabase';

interface StudentReceiptPreviewColorfulProps {
  receipt: StudentReceipt;
}

export default function StudentReceiptPreviewColorful({ receipt }: StudentReceiptPreviewColorfulProps) {
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
    <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 max-w-4xl mx-auto shadow-2xl rounded-3xl overflow-hidden border-4 border-purple-400" style={{ fontFamily: 'Comic Sans MS, Marker Felt, cursive' }}>
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 px-12 py-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Sparkles className="absolute top-4 left-4 w-12 h-12 text-white animate-pulse" />
          <Star className="absolute top-8 right-8 w-10 h-10 text-yellow-300 animate-pulse" style={{ animationDelay: '0.2s' }} />
          <Heart className="absolute bottom-6 left-12 w-8 h-8 text-pink-300 animate-pulse" style={{ animationDelay: '0.4s' }} />
          <Sparkles className="absolute bottom-4 right-16 w-10 h-10 text-purple-300 animate-pulse" style={{ animationDelay: '0.6s' }} />
        </div>
        <div className="relative z-10 text-center">
          <div className="inline-block bg-white p-4 rounded-2xl mb-4 shadow-xl">
            <Star className="w-12 h-12 text-orange-500" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">{receipt.school_name}</h1>
          <p className="text-purple-100 text-lg font-semibold">Educational Excellence Payment Receipt</p>
          <div className="mt-6 inline-block bg-white px-8 py-4 rounded-2xl shadow-xl">
            <p className="text-xs text-purple-600 font-bold uppercase tracking-wider">Receipt #</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {receipt.receipt_number}
            </p>
          </div>
        </div>
      </div>

      <div className="px-12 py-10">
        <div className="grid grid-cols-2 gap-8 mb-10">
          <div className="bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl p-6 shadow-lg border-2 border-purple-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-500 p-2 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-purple-900">Amazing Student</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-purple-700 font-bold uppercase">Name</p>
                <p className="text-xl font-bold text-purple-900">{receipt.student_name}</p>
              </div>
              <div>
                <p className="text-xs text-purple-700 font-bold uppercase">Student ID</p>
                <p className="text-base text-purple-800">{receipt.student_id}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-200 to-pink-200 rounded-2xl p-6 shadow-lg border-2 border-orange-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-500 p-2 rounded-lg">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-orange-900">Term Details</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-orange-700 font-bold uppercase">Academic Term</p>
                <p className="text-xl font-bold text-orange-900">{receipt.term}</p>
              </div>
              <div>
                <p className="text-xs text-orange-700 font-bold uppercase">Issue Date</p>
                <p className="text-base text-orange-800">{formatDate(receipt.date_issued)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-xl border-4 border-pink-300">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-5">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <Heart className="w-7 h-7" />
              Fee Breakdown
            </h3>
          </div>
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-100 to-pink-100">
              <tr>
                <th className="text-left px-8 py-4 text-sm font-bold text-purple-900 uppercase">Description</th>
                <th className="text-right px-8 py-4 text-sm font-bold text-purple-900 uppercase">Amount</th>
              </tr>
            </thead>
            <tbody>
              {receipt.fee_items.map((item, index) => (
                <tr key={index} className="border-b border-pink-200">
                  <td className="px-8 py-4 text-base text-slate-700">{item.description}</td>
                  <td className="text-right px-8 py-4 text-base font-bold text-slate-900 tabular-nums">
                    {currencySymbol}{item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
              <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <td className="px-8 py-6 text-xl font-bold uppercase">Total Paid</td>
                <td className="text-right px-8 py-6 text-2xl font-bold tabular-nums">
                  {currencySymbol}{receipt.total_amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl px-10 py-8 text-center shadow-xl border-4 border-green-400">
          <div className="flex justify-center gap-2 mb-3">
            <Sparkles className="w-8 h-8 text-yellow-300" />
            <Star className="w-10 h-10 text-yellow-200" />
            <Sparkles className="w-8 h-8 text-yellow-300" />
          </div>
          <p className="text-white text-4xl font-bold mb-2">FULLY PAID!</p>
          <p className="text-green-100 text-lg">
            {receipt.payment_method} • {formatDate(receipt.payment_date)}
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-12 py-6 text-center">
        <p className="text-purple-100 text-sm font-semibold">
          {receipt.school_address} • {receipt.school_city}, {receipt.school_state}
        </p>
        <p className="text-purple-200 text-xs mt-2">{receipt.school_phone} • {receipt.school_website}</p>
      </div>
    </div>
  );
}
