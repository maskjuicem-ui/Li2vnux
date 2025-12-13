import { Paystub } from '../lib/supabase';

interface PaystubPreviewExecutiveProps {
  paystub: Paystub;
}

export default function PaystubPreviewExecutive({ paystub }: PaystubPreviewExecutiveProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 shadow-2xl overflow-hidden max-w-4xl mx-auto border-4 border-amber-700" style={{ fontFamily: 'Garamond, serif' }}>
      <div className="bg-gradient-to-r from-amber-800 via-amber-900 to-amber-800 px-12 py-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-4 left-4 w-24 h-24 border-2 border-amber-400 rounded-full"></div>
          <div className="absolute bottom-4 right-4 w-32 h-32 border-2 border-amber-400 rounded-full"></div>
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="bg-amber-100 p-5 rounded-full border-4 border-amber-700 shadow-2xl">
              <svg className="w-12 h-12 text-amber-900" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-amber-50 tracking-wide drop-shadow-lg" style={{ fontVariant: 'small-caps' }}>
                {paystub.school_name}
              </h1>
              <p className="text-amber-200 text-base mt-2 font-semibold italic">{paystub.school_location}</p>
            </div>
          </div>
          <div className="text-right bg-amber-100 px-6 py-4 rounded-lg border-2 border-amber-700 shadow-xl">
            <p className="text-xs text-amber-900 font-bold uppercase tracking-widest">Executive Compensation</p>
            <p className="text-xl font-bold text-amber-900 mt-1">{formatDate(paystub.pay_date)}</p>
          </div>
        </div>
      </div>

      <div className="px-12 py-8 bg-white border-b-2 border-amber-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-amber-700"></div>
          <h2 className="text-2xl font-bold text-slate-800" style={{ fontVariant: 'small-caps' }}>Employee Information</h2>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg border-2 border-amber-300 shadow-md">
            <p className="text-xs text-amber-800 font-bold uppercase tracking-wider mb-2">Executive Name</p>
            <p className="text-2xl font-bold text-slate-900">{paystub.employee_name}</p>
            <div className="mt-4 pt-4 border-t border-amber-300">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-600 mb-1">Position</p>
                  <p className="text-sm font-semibold text-slate-900">{paystub.position}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">Hire Date</p>
                  <p className="text-sm font-semibold text-slate-900">{formatDate(paystub.hire_date)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border-2 border-slate-300 shadow-md">
            <p className="text-xs text-slate-700 font-bold uppercase tracking-wider mb-4">Pay Period Details</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-sm text-slate-600">Period Start</span>
                <span className="text-sm font-bold text-slate-900">{formatDate(paystub.period_start)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-sm text-slate-600">Period End</span>
                <span className="text-sm font-bold text-slate-900">{formatDate(paystub.period_end)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-sm text-slate-600">Check Number</span>
                <span className="text-sm font-bold text-slate-900">{paystub.check_number}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-12 py-8 bg-gradient-to-b from-white to-slate-50">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-amber-700"></div>
          <h2 className="text-2xl font-bold text-slate-800" style={{ fontVariant: 'small-caps' }}>Compensation Summary</h2>
        </div>
        <div className="bg-white rounded-lg border-2 border-amber-200 shadow-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50">
                <th className="text-left py-4 px-6 text-sm font-bold uppercase tracking-wider">Component</th>
                <th className="text-right py-4 px-6 text-sm font-bold uppercase tracking-wider">Current Period</th>
                <th className="text-right py-4 px-6 text-sm font-bold uppercase tracking-wider">Year to Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-amber-100 bg-amber-50">
                <td className="py-4 px-6 text-base font-bold text-slate-900">Base Compensation</td>
                <td className="py-4 px-6 text-base text-right font-bold text-slate-900">${paystub.gross_pay_current.toFixed(2)}</td>
                <td className="py-4 px-6 text-base text-right font-bold text-slate-900">${paystub.gross_pay_ytd.toFixed(2)}</td>
              </tr>
              {paystub.deductions.map((deduction, index) => (
                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-6 text-sm text-slate-700">{deduction.description}</td>
                  <td className="py-3 px-6 text-sm text-right text-slate-700">{deduction.current}</td>
                  <td className="py-3 px-6 text-sm text-right text-slate-700">{deduction.ytd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-12 py-8 bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-white">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm uppercase tracking-widest text-amber-200 font-bold mb-2">Net Compensation</p>
            <p className="text-5xl font-bold drop-shadow-lg">${paystub.net_pay_current.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm uppercase tracking-widest text-amber-200 font-bold mb-2">YTD Total</p>
            <p className="text-3xl font-bold drop-shadow-lg">${paystub.net_pay_ytd.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-amber-900 text-center px-8 py-6 border-t-4 border-amber-700">
        <p className="text-base text-amber-100 font-semibold mb-2">
          This is an official compensation document issued by {paystub.school_name}.
        </p>
        <p className="text-xs text-amber-300 italic">
          Confidential executive compensation statement. For recipient only.
        </p>
      </div>
    </div>
  );
}
