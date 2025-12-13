import { Paystub } from '../lib/supabase';

interface PaystubPreviewRetailProps {
  paystub: Paystub;
}

export default function PaystubPreviewRetail({ paystub }: PaystubPreviewRetailProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white shadow-lg overflow-hidden max-w-4xl mx-auto" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 px-8 py-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-20">
          <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-lg shadow-xl">
              <svg className="w-10 h-10 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white drop-shadow-md">{paystub.school_name.toUpperCase()}</h1>
              <p className="text-orange-100 text-sm mt-1 font-semibold">Retail Team Member Earnings</p>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-lg border-2 border-white/40">
            <p className="text-xs text-orange-100 font-bold uppercase">Pay Date</p>
            <p className="text-lg font-extrabold text-white mt-1">{formatDate(paystub.pay_date)}</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-50 to-red-50 px-8 py-6 border-b-4 border-orange-300">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-orange-500">
            <p className="text-xs text-orange-700 font-bold uppercase tracking-wide mb-2">Team Member</p>
            <p className="text-lg font-extrabold text-slate-900">{paystub.employee_name}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-2">Position</p>
            <p className="text-base font-bold text-slate-900">{paystub.position}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-2">Employee ID</p>
            <p className="text-base font-bold text-slate-900">{paystub.file_number || paystub.employee_ssn.slice(-4)}</p>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-orange-500"></div>
          <h2 className="text-xl font-bold text-slate-900">Pay Period</h2>
        </div>
        <div className="grid grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-slate-600 mb-1">Period Start</p>
            <p className="font-bold text-slate-900">{formatDate(paystub.period_start)}</p>
          </div>
          <div>
            <p className="text-slate-600 mb-1">Period End</p>
            <p className="font-bold text-slate-900">{formatDate(paystub.period_end)}</p>
          </div>
          <div>
            <p className="text-slate-600 mb-1">Check Number</p>
            <p className="font-bold text-slate-900">{paystub.check_number}</p>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-green-600"></div>
          <h2 className="text-xl font-bold text-slate-900">Earnings</h2>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-green-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <th className="text-left py-3 px-4 text-xs font-bold uppercase">Description</th>
                <th className="text-right py-3 px-4 text-xs font-bold uppercase">This Period</th>
                <th className="text-right py-3 px-4 text-xs font-bold uppercase">YTD</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 text-sm font-medium">Regular Pay</td>
                <td className="py-3 px-4 text-sm text-right font-bold text-green-700">${paystub.gross_pay_current.toFixed(2)}</td>
                <td className="py-3 px-4 text-sm text-right font-bold text-green-700">${paystub.gross_pay_ytd.toFixed(2)}</td>
              </tr>
              <tr className="bg-green-100">
                <td className="py-3 px-4 text-base font-bold">GROSS PAY</td>
                <td className="py-3 px-4 text-lg text-right font-bold text-green-700">${paystub.gross_pay_current.toFixed(2)}</td>
                <td className="py-3 px-4 text-lg text-right font-bold text-green-700">${paystub.gross_pay_ytd.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-8 py-6 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-red-600"></div>
          <h2 className="text-xl font-bold text-slate-900">Deductions</h2>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-red-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
                <th className="text-left py-3 px-4 text-xs font-bold uppercase">Description</th>
                <th className="text-right py-3 px-4 text-xs font-bold uppercase">This Period</th>
                <th className="text-right py-3 px-4 text-xs font-bold uppercase">YTD</th>
              </tr>
            </thead>
            <tbody>
              {paystub.deductions.map((deduction, index) => (
                <tr key={index} className="border-b border-slate-50 hover:bg-red-50">
                  <td className="py-2 px-4 text-xs">{deduction.description}</td>
                  <td className="py-2 px-4 text-xs text-right font-semibold">{deduction.current}</td>
                  <td className="py-2 px-4 text-xs text-right font-semibold">{deduction.ytd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-600 via-orange-700 to-red-700 px-8 py-6">
        <div className="flex justify-between items-center text-white">
          <div>
            <p className="text-sm uppercase tracking-wider text-orange-200 font-bold mb-2">Net Pay (Take Home)</p>
            <p className="text-5xl font-extrabold drop-shadow-lg">${paystub.net_pay_current.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm uppercase tracking-wider text-orange-200 font-bold mb-2">YTD Net Pay</p>
            <p className="text-3xl font-extrabold drop-shadow-lg">${paystub.net_pay_ytd.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-orange-800 text-center px-8 py-5">
        <p className="text-sm text-orange-100 font-semibold">
          Official payroll document issued by {paystub.school_name}
        </p>
      </div>
    </div>
  );
}
