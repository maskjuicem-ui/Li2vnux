import { StudentReceipt } from '../lib/supabase';

interface StudentReceiptPreviewMinimalistProps {
  receipt: StudentReceipt;
}

export default function StudentReceiptPreviewMinimalist({ receipt }: StudentReceiptPreviewMinimalistProps) {
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
    <div className="bg-white max-w-4xl mx-auto border-4 border-black" style={{ fontFamily: 'Courier New, monospace' }}>
      <div className="border-b-4 border-black px-10 py-8">
        <h1 className="text-3xl font-bold text-black uppercase tracking-wide">{receipt.school_name}</h1>
        <p className="text-sm text-black mt-2">{receipt.school_address} | {receipt.school_city}, {receipt.school_state}</p>
        <div className="mt-4 pt-4 border-t-2 border-black">
          <p className="text-xs text-black uppercase tracking-widest">Receipt No: {receipt.receipt_number}</p>
        </div>
      </div>

      <div className="px-10 py-8">
        <div className="border-b-2 border-black pb-6 mb-6">
          <h2 className="text-xl font-bold text-black uppercase mb-4">Payment Receipt</h2>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b-2 border-black">
          <div>
            <p className="text-xs text-black uppercase tracking-wider mb-3">Student</p>
            <p className="text-lg font-bold text-black mb-1">{receipt.student_name}</p>
            <p className="text-sm text-black">ID: {receipt.student_id}</p>
          </div>
          <div>
            <p className="text-xs text-black uppercase tracking-wider mb-3">Period</p>
            <p className="text-lg font-bold text-black mb-1">{receipt.term}</p>
            <p className="text-sm text-black">Issued: {formatDate(receipt.date_issued)}</p>
          </div>
        </div>

        <table className="w-full border-2 border-black">
          <thead>
            <tr className="bg-black text-white">
              <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider">Item</th>
              <th className="text-right px-6 py-3 text-xs font-bold uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody>
            {receipt.fee_items.map((item, index) => (
              <tr key={index} className="border-b border-black">
                <td className="px-6 py-3 text-sm text-black">{item.description}</td>
                <td className="text-right px-6 py-3 text-sm font-bold text-black tabular-nums">
                  {currencySymbol}{item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            ))}
            <tr className="border-t-4 border-black bg-black text-white">
              <td className="px-6 py-4 text-base font-bold uppercase">Total</td>
              <td className="text-right px-6 py-4 text-xl font-bold tabular-nums">
                {currencySymbol}{receipt.total_amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-8 border-4 border-black px-8 py-6 bg-black text-white text-center">
          <p className="text-2xl font-bold uppercase tracking-wider">PAID</p>
          <p className="text-sm mt-2">{receipt.payment_method} | {formatDate(receipt.payment_date)}</p>
        </div>
      </div>

      <div className="border-t-4 border-black px-10 py-6 bg-black text-white">
        <p className="text-xs text-center">
          {receipt.school_phone} | {receipt.school_website}
        </p>
      </div>
    </div>
  );
}
