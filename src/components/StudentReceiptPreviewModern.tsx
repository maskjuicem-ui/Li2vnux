import { Receipt, Clock, DollarSign, CheckCircle2 } from 'lucide-react';
import { StudentReceipt } from '../lib/supabase';

interface StudentReceiptPreviewModernProps {
  receipt: StudentReceipt;
}

export default function StudentReceiptPreviewModern({ receipt }: StudentReceiptPreviewModernProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
    <div className="bg-gradient-to-br from-slate-50 to-white max-w-4xl mx-auto shadow-xl border border-slate-200" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="bg-gradient-to-r from-cyan-600 to-blue-700 px-10 py-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">{receipt.school_name}</h1>
            <p className="text-cyan-100 text-sm">{receipt.school_address}</p>
            <p className="text-cyan-100 text-sm">{receipt.school_city}, {receipt.school_state} {receipt.school_postal_code}</p>
          </div>
          <div className="bg-white px-6 py-4 rounded-lg">
            <p className="text-xs text-slate-500 mb-1">Receipt #</p>
            <p className="text-lg font-bold text-slate-900">{receipt.receipt_number}</p>
          </div>
        </div>
      </div>

      <div className="px-10 py-8">
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Receipt className="w-5 h-5 text-cyan-600" />
              <h3 className="text-sm font-bold text-slate-700 uppercase">Student Details</h3>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-slate-500">Name</p>
                <p className="text-base font-semibold text-slate-900">{receipt.student_name}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Student ID</p>
                <p className="text-sm font-mono text-slate-700">{receipt.student_id}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-cyan-600" />
              <h3 className="text-sm font-bold text-slate-700 uppercase">Term Information</h3>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-slate-500">Term</p>
                <p className="text-base font-semibold text-slate-900">{receipt.term}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Date Issued</p>
                <p className="text-sm text-slate-700">{formatDate(receipt.date_issued)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-bold text-slate-600 uppercase">Description</th>
                <th className="text-right px-6 py-3 text-xs font-bold text-slate-600 uppercase">Amount</th>
              </tr>
            </thead>
            <tbody>
              {receipt.fee_items.map((item, index) => (
                <tr key={index} className="border-t border-slate-100">
                  <td className="px-6 py-4 text-sm text-slate-700">{item.description}</td>
                  <td className="text-right px-6 py-4 text-sm font-semibold text-slate-900 tabular-nums">
                    {currencySymbol}{item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-cyan-600 bg-cyan-50">
                <td className="px-6 py-4 text-base font-bold text-slate-900">Total Paid</td>
                <td className="text-right px-6 py-4 text-xl font-bold text-cyan-700 tabular-nums">
                  {currencySymbol}{receipt.total_amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-6 py-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <div>
              <p className="text-sm font-bold text-green-900">Payment Complete</p>
              <p className="text-xs text-green-700">{receipt.payment_method} • {formatDate(receipt.payment_date)}</p>
            </div>
          </div>
          <div className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-bold">
            PAID
          </div>
        </div>
      </div>

      <div className="bg-slate-100 px-10 py-6 text-center">
        <p className="text-xs text-slate-600">
          Official payment receipt • {receipt.school_website} • For inquiries contact {receipt.school_phone}
        </p>
      </div>
    </div>
  );
}
