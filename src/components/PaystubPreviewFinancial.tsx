import { Paystub } from '../lib/supabase';

interface PaystubPreviewFinancialProps {
  paystub: Paystub;
}

export default function PaystubPreviewFinancial({ paystub }: PaystubPreviewFinancialProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white shadow-xl overflow-hidden max-w-4xl mx-auto border-l-8 border-emerald-700" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
      <div className="bg-gradient-to-r from-slate-900 via-emerald-900 to-slate-900 px-10 py-7 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 text-9xl font-bold">$</div>
          <div className="absolute bottom-0 left-0 text-9xl font-bold">$</div>
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="bg-emerald-600 p-4 rounded-lg shadow-2xl border-2 border-emerald-400">
              <svg className="w-11 h-11 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-emerald-50 tracking-wide">{paystub.school_name.toUpperCase()}</h1>
              <p className="text-emerald-200 text-base mt-1.5 font-semibold">Financial Services Division</p>
            </div>
          </div>
          <div className="bg-emerald-600 px-6 py-3 rounded-lg shadow-xl border-2 border-emerald-400">
            <p className="text-xs text-emerald-200 font-bold uppercase tracking-wider">Compensation Statement</p>
            <p className="text-lg font-extrabold text-white mt-1">{formatDate(paystub.pay_date)}</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-emerald-50 to-slate-50 px-10 py-7 border-b-2 border-emerald-200">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-8 w-1.5 bg-emerald-700 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-900">Employee Information</h2>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-emerald-200 overflow-hidden">
          <table className="w-full">
            <tbody>
              <tr className="border-b border-emerald-100">
                <td className="py-4 px-6 text-sm font-bold text-slate-700 w-1/3 bg-emerald-50">Full Name</td>
                <td className="py-4 px-6 text-lg font-extrabold text-slate-900">{paystub.employee_name}</td>
              </tr>
              <tr className="border-b border-emerald-100">
                <td className="py-4 px-6 text-sm font-bold text-slate-700 bg-emerald-50">Position Title</td>
                <td className="py-4 px-6 text-base font-bold text-slate-900">{paystub.position}</td>
              </tr>
              <tr className="border-b border-emerald-100">
                <td className="py-4 px-6 text-sm font-bold text-slate-700 bg-emerald-50">Employee ID</td>
                <td className="py-4 px-6 text-base font-bold text-slate-900">{paystub.file_number || paystub.employee_ssn.slice(-4)}</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-bold text-slate-700 bg-emerald-50">Date of Hire</td>
                <td className="py-4 px-6 text-base font-bold text-slate-900">{formatDate(paystub.hire_date)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-10 py-7 bg-white border-b-2 border-slate-200">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-8 w-1.5 bg-slate-700 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-900">Compensation Period</h2>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
            <p className="text-xs text-slate-600 font-bold uppercase tracking-wider mb-2">Period Start</p>
            <p className="text-base font-bold text-slate-900">{formatDate(paystub.period_start)}</p>
          </div>
          <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
            <p className="text-xs text-slate-600 font-bold uppercase tracking-wider mb-2">Period End</p>
            <p className="text-base font-bold text-slate-900">{formatDate(paystub.period_end)}</p>
          </div>
          <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
            <p className="text-xs text-slate-600 font-bold uppercase tracking-wider mb-2">Check Number</p>
            <p className="text-base font-bold text-slate-900">{paystub.check_number}</p>
          </div>
        </div>
      </div>

      <div className="px-10 py-7 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-8 w-1.5 bg-green-700 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-900">Gross Earnings</h2>
        </div>
        <div className="bg-white rounded-lg shadow-md border-2 border-green-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-green-700 to-emerald-700 text-white">
                <th className="text-left py-4 px-6 text-sm font-bold uppercase tracking-wide">Earnings Category</th>
                <th className="text-right py-4 px-6 text-sm font-bold uppercase tracking-wide">Current Period</th>
                <th className="text-right py-4 px-6 text-sm font-bold uppercase tracking-wide">Year to Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-green-100 bg-green-50">
                <td className="py-4 px-6 text-base font-bold text-slate-900">Base Salary</td>
                <td className="py-4 px-6 text-lg text-right font-bold text-green-700">${paystub.gross_pay_current.toFixed(2)}</td>
                <td className="py-4 px-6 text-lg text-right font-bold text-green-700">${paystub.gross_pay_ytd.toFixed(2)}</td>
              </tr>
              <tr className="bg-green-200">
                <td className="py-4 px-6 text-lg font-extrabold text-slate-900 uppercase">Total Gross Earnings</td>
                <td className="py-4 px-6 text-xl text-right font-extrabold text-green-800">${paystub.gross_pay_current.toFixed(2)}</td>
                <td className="py-4 px-6 text-xl text-right font-extrabold text-green-800">${paystub.gross_pay_ytd.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-10 py-7 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-8 w-1.5 bg-red-700 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-900">Withholdings & Deductions</h2>
        </div>
        <div className="bg-white rounded-lg shadow-md border-2 border-red-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-red-700 to-orange-700 text-white">
                <th className="text-left py-4 px-6 text-sm font-bold uppercase tracking-wide">Deduction Type</th>
                <th className="text-right py-4 px-6 text-sm font-bold uppercase tracking-wide">Current Period</th>
                <th className="text-right py-4 px-6 text-sm font-bold uppercase tracking-wide">Year to Date</th>
              </tr>
            </thead>
            <tbody>
              {paystub.deductions.map((deduction, index) => (
                <tr key={index} className="border-b border-red-50 hover:bg-red-50">
                  <td className="py-3 px-6 text-sm font-medium text-slate-700">{deduction.description}</td>
                  <td className="py-3 px-6 text-sm text-right font-semibold text-slate-900">{deduction.current}</td>
                  <td className="py-3 px-6 text-sm text-right font-semibold text-slate-900">{deduction.ytd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900 px-10 py-8">
        <div className="flex justify-between items-center text-white">
          <div>
            <p className="text-sm uppercase tracking-widest text-emerald-300 font-bold mb-2">Net Compensation</p>
            <p className="text-5xl font-extrabold drop-shadow-lg">${paystub.net_pay_current.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm uppercase tracking-widest text-emerald-300 font-bold mb-2">Year to Date Net</p>
            <p className="text-3xl font-extrabold drop-shadow-lg">${paystub.net_pay_ytd.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-center px-8 py-6">
        <p className="text-sm text-slate-300 font-bold mb-2">
          This is an official compensation statement issued by {paystub.school_name}.
        </p>
        <p className="text-xs text-slate-500 italic">
          Confidential financial document. For authorized use only.
        </p>
      </div>
    </div>
  );
}
