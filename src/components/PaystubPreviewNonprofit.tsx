import { Paystub } from '../lib/supabase';

interface PaystubPreviewNonprofitProps {
  paystub: Paystub;
}

export default function PaystubPreviewNonprofit({ paystub }: PaystubPreviewNonprofitProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white shadow-lg overflow-hidden max-w-4xl mx-auto border-t-8 border-teal-600" style={{ fontFamily: 'Verdana, sans-serif' }}>
      <div className="bg-gradient-to-br from-teal-600 to-cyan-700 px-10 py-7 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <svg className="w-48 h-48 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
          </svg>
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-5">
              <div className="bg-white p-4 rounded-full shadow-xl border-4 border-teal-300">
                <svg className="w-11 h-11 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">{paystub.school_name.toUpperCase()}</h1>
                <p className="text-teal-100 text-base mt-2 font-bold">Nonprofit Organization • Compensation Statement</p>
              </div>
            </div>
            <div className="bg-white/25 backdrop-blur-sm px-6 py-4 rounded-xl border-2 border-white/40 shadow-xl">
              <p className="text-xs text-teal-100 font-extrabold uppercase tracking-wider">Pay Date</p>
              <p className="text-xl font-black text-white mt-1">{formatDate(paystub.pay_date)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 px-10 py-7 border-b-2 border-teal-200">
        <div className="flex items-center gap-3 mb-5">
          <svg className="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <h2 className="text-2xl font-bold text-slate-900">Team Member Information</h2>
        </div>
        <div className="bg-white rounded-xl shadow-md border-2 border-teal-200 overflow-hidden">
          <div className="bg-teal-50 px-6 py-4 border-b-2 border-teal-200">
            <p className="text-xs text-teal-700 font-bold uppercase tracking-wider mb-2">Staff Member Name</p>
            <p className="text-2xl font-extrabold text-slate-900">{paystub.employee_name}</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-slate-600 font-bold uppercase mb-2">Position</p>
                <p className="text-base font-bold text-slate-900">{paystub.position}</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 font-bold uppercase mb-2">Staff ID</p>
                <p className="text-base font-bold text-slate-900">{paystub.file_number || paystub.employee_ssn.slice(-4)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 font-bold uppercase mb-2">Start Date</p>
                <p className="text-base font-bold text-slate-900">{formatDate(paystub.hire_date)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-10 py-7 bg-white border-b-2 border-slate-200">
        <div className="flex items-center gap-3 mb-5">
          <svg className="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <h2 className="text-2xl font-bold text-slate-900">Pay Period Details</h2>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-teal-50 p-5 rounded-lg border-l-4 border-teal-600">
            <p className="text-xs text-teal-700 font-bold uppercase mb-2">Period Start</p>
            <p className="text-base font-bold text-slate-900">{formatDate(paystub.period_start)}</p>
          </div>
          <div className="bg-teal-50 p-5 rounded-lg border-l-4 border-teal-600">
            <p className="text-xs text-teal-700 font-bold uppercase mb-2">Period End</p>
            <p className="text-base font-bold text-slate-900">{formatDate(paystub.period_end)}</p>
          </div>
          <div className="bg-teal-50 p-5 rounded-lg border-l-4 border-teal-600">
            <p className="text-xs text-teal-700 font-bold uppercase mb-2">Check Number</p>
            <p className="text-base font-bold text-slate-900">{paystub.check_number}</p>
          </div>
        </div>
      </div>

      <div className="px-10 py-7 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="flex items-center gap-3 mb-5">
          <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
          </svg>
          <h2 className="text-2xl font-bold text-slate-900">Compensation</h2>
        </div>
        <div className="bg-white rounded-xl shadow-md border-2 border-green-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <th className="text-left py-4 px-6 text-sm font-bold uppercase tracking-wide">Category</th>
                <th className="text-right py-4 px-6 text-sm font-bold uppercase tracking-wide">This Period</th>
                <th className="text-right py-4 px-6 text-sm font-bold uppercase tracking-wide">Year to Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-green-100 bg-green-50">
                <td className="py-4 px-6 text-base font-bold text-slate-900">Regular Compensation</td>
                <td className="py-4 px-6 text-lg text-right font-bold text-green-700">${paystub.gross_pay_current.toFixed(2)}</td>
                <td className="py-4 px-6 text-lg text-right font-bold text-green-700">${paystub.gross_pay_ytd.toFixed(2)}</td>
              </tr>
              <tr className="bg-green-200 border-t-2 border-green-600">
                <td className="py-4 px-6 text-lg font-extrabold text-slate-900 uppercase">Gross Compensation</td>
                <td className="py-4 px-6 text-xl text-right font-extrabold text-green-800">${paystub.gross_pay_current.toFixed(2)}</td>
                <td className="py-4 px-6 text-xl text-right font-extrabold text-green-800">${paystub.gross_pay_ytd.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-10 py-7 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="flex items-center gap-3 mb-5">
          <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <h2 className="text-2xl font-bold text-slate-900">Deductions</h2>
        </div>
        <div className="bg-white rounded-xl shadow-md border-2 border-orange-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                <th className="text-left py-4 px-6 text-sm font-bold uppercase tracking-wide">Description</th>
                <th className="text-right py-4 px-6 text-sm font-bold uppercase tracking-wide">This Period</th>
                <th className="text-right py-4 px-6 text-sm font-bold uppercase tracking-wide">Year to Date</th>
              </tr>
            </thead>
            <tbody>
              {paystub.deductions.map((deduction, index) => (
                <tr key={index} className="border-b border-orange-50 hover:bg-orange-50">
                  <td className="py-3 px-6 text-sm font-medium text-slate-700">{deduction.description}</td>
                  <td className="py-3 px-6 text-sm text-right font-semibold text-slate-900">{deduction.current}</td>
                  <td className="py-3 px-6 text-sm text-right font-semibold text-slate-900">{deduction.ytd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gradient-to-r from-teal-600 to-cyan-700 px-10 py-8">
        <div className="flex justify-between items-center text-white">
          <div>
            <p className="text-sm uppercase tracking-widest text-teal-200 font-bold mb-3">Net Compensation</p>
            <p className="text-5xl font-extrabold drop-shadow-lg">${paystub.net_pay_current.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm uppercase tracking-widest text-teal-200 font-bold mb-3">Year to Date Net</p>
            <p className="text-3xl font-extrabold drop-shadow-lg">${paystub.net_pay_ytd.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-teal-900 text-center px-8 py-6">
        <p className="text-base text-teal-100 font-bold mb-2">
          This is an official compensation statement issued by {paystub.school_name}.
        </p>
        <p className="text-xs text-teal-300 italic">
          Making a difference together • Nonprofit organization
        </p>
      </div>
    </div>
  );
}
