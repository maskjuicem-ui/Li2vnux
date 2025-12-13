import { Briefcase, FileText, DollarSign } from 'lucide-react';
import { StudentReceipt } from '../lib/supabase';

interface StudentReceiptPreviewCorporateProps {
  receipt: StudentReceipt;
}

export default function StudentReceiptPreviewCorporate({ receipt }: StudentReceiptPreviewCorporateProps) {
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
    <div className="bg-white max-w-4xl mx-auto shadow-md border border-slate-300" style={{ fontFamily: 'Arial, sans-serif' }}>
      <div className="bg-slate-800 px-10 py-6 border-b-4 border-blue-600">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-3 rounded-md">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{receipt.school_name}</h1>
              <p className="text-slate-300 text-sm">{receipt.school_city}, {receipt.school_state}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Receipt Number</p>
            <p className="text-xl font-bold text-white">{receipt.receipt_number}</p>
          </div>
        </div>
      </div>

      <div className="px-10 py-8">
        <div className="bg-blue-50 border-l-4 border-blue-600 px-6 py-4 mb-8">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide">Tuition Payment Receipt</h2>
          <p className="text-sm text-slate-600 mt-1">Official Financial Document</p>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Student Information
            </h3>
            <div className="space-y-2 pl-6">
              <div>
                <p className="text-xs text-slate-500">Name</p>
                <p className="text-base font-semibold text-slate-900">{receipt.student_name}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">ID Number</p>
                <p className="text-sm font-mono text-slate-700">{receipt.student_id}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Email</p>
                <p className="text-sm text-slate-700">{receipt.student_email}</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Payment Details
            </h3>
            <div className="space-y-2 pl-6">
              <div>
                <p className="text-xs text-slate-500">Term</p>
                <p className="text-base font-semibold text-slate-900">{receipt.term}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Academic Year</p>
                <p className="text-sm text-slate-700">{receipt.academic_year}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Date Issued</p>
                <p className="text-sm text-slate-700">{formatDate(receipt.date_issued)}</p>
              </div>
            </div>
          </div>
        </div>

        <table className="w-full border border-slate-300">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300">Description</th>
              <th className="text-right px-6 py-3 text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {receipt.fee_items.map((item, index) => (
              <tr key={index} className="border-b border-slate-200">
                <td className="px-6 py-3 text-sm text-slate-700">{item.description}</td>
                <td className="text-right px-6 py-3 text-sm font-semibold text-slate-900 tabular-nums">
                  {currencySymbol}{item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            ))}
            <tr className="bg-blue-600 text-white font-bold">
              <td className="px-6 py-4 text-base uppercase">Total Amount Paid</td>
              <td className="text-right px-6 py-4 text-lg tabular-nums">
                {currencySymbol}{receipt.total_amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-8 bg-green-50 border border-green-300 rounded-md px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold text-green-900">Payment Status: COMPLETED</p>
              <p className="text-xs text-green-700 mt-1">Method: {receipt.payment_method} | Date: {formatDate(receipt.payment_date)}</p>
            </div>
            <div className="bg-green-600 text-white px-6 py-2 rounded-md text-sm font-bold">
              PAID
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-100 border-t border-slate-300 px-10 py-5">
        <p className="text-xs text-slate-600 text-center">
          {receipt.school_address}, {receipt.school_city}, {receipt.school_state} {receipt.school_postal_code} | {receipt.school_phone} | {receipt.school_website}
        </p>
      </div>
    </div>
  );
}
