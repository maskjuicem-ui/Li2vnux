import { Paystub } from '../lib/supabase';

interface PaystubPreviewIndustrialProps {
  paystub: Paystub;
}

export default function PaystubPreviewIndustrial({ paystub }: PaystubPreviewIndustrialProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-slate-100 shadow-lg overflow-hidden max-w-4xl mx-auto border-4 border-yellow-500" style={{ fontFamily: 'Courier New, monospace' }}>
      <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 px-8 py-6 border-b-4 border-yellow-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-500 p-3 rounded border-2 border-slate-900 shadow-lg">
              <svg className="w-10 h-10 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-yellow-400 tracking-wide">{paystub.school_name.toUpperCase()}</h1>
              <p className="text-slate-300 text-sm mt-1 font-bold uppercase">Industrial Operations</p>
            </div>
          </div>
          <div className="bg-yellow-500 px-5 py-3 rounded border-2 border-slate-900 shadow-lg">
            <p className="text-xs text-slate-900 font-extrabold uppercase">Pay Date</p>
            <p className="text-lg font-black text-slate-900">{formatDate(paystub.pay_date)}</p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-400 px-8 py-2 border-b-2 border-slate-900">
        <p className="text-center text-slate-900 text-xs font-extrabold uppercase tracking-widest">
          *** OFFICIAL WAGE STATEMENT - KEEP FOR YOUR RECORDS ***
        </p>
      </div>

      <div className="px-8 py-6 bg-slate-200 border-b-4 border-slate-400">
        <div className="bg-slate-900 text-yellow-400 px-4 py-2 mb-4 border-l-4 border-yellow-500">
          <p className="text-xs font-extrabold uppercase tracking-wider">Employee Information</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-4 border-2 border-slate-900 shadow-sm">
            <p className="text-xs font-extrabold text-slate-600 uppercase mb-2">Worker Name</p>
            <p className="text-xl font-black text-slate-900 uppercase">{paystub.employee_name}</p>
          </div>
          <div className="bg-white p-4 border-2 border-slate-900 shadow-sm">
            <p className="text-xs font-extrabold text-slate-600 uppercase mb-2">Position</p>
            <p className="text-base font-black text-slate-900">{paystub.position}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-white p-3 border-2 border-slate-900">
            <p className="text-xs font-bold text-slate-600 uppercase">ID #</p>
            <p className="text-sm font-black text-slate-900">{paystub.file_number || paystub.employee_ssn.slice(-4)}</p>
          </div>
          <div className="bg-white p-3 border-2 border-slate-900">
            <p className="text-xs font-bold text-slate-600 uppercase">Check #</p>
            <p className="text-sm font-black text-slate-900">{paystub.check_number}</p>
          </div>
          <div className="bg-white p-3 border-2 border-slate-900">
            <p className="text-xs font-bold text-slate-600 uppercase">Hire Date</p>
            <p className="text-sm font-black text-slate-900">{formatDate(paystub.hire_date)}</p>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 bg-white border-b-4 border-slate-400">
        <div className="bg-slate-900 text-yellow-400 px-4 py-2 mb-4 border-l-4 border-yellow-500">
          <p className="text-xs font-extrabold uppercase tracking-wider">Pay Period</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-100 p-4 border-2 border-slate-900">
            <p className="text-xs font-bold text-slate-600 uppercase">Start Date</p>
            <p className="text-base font-black text-slate-900">{formatDate(paystub.period_start)}</p>
          </div>
          <div className="bg-slate-100 p-4 border-2 border-slate-900">
            <p className="text-xs font-bold text-slate-600 uppercase">End Date</p>
            <p className="text-base font-black text-slate-900">{formatDate(paystub.period_end)}</p>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 bg-slate-200 border-b-4 border-slate-400">
        <div className="bg-slate-900 text-yellow-400 px-4 py-2 mb-4 border-l-4 border-yellow-500">
          <p className="text-xs font-extrabold uppercase tracking-wider">Wages Earned</p>
        </div>
        <div className="border-4 border-slate-900 bg-white">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-900 text-yellow-400 border-b-2 border-slate-900">
                <th className="text-left py-3 px-4 font-extrabold uppercase">Description</th>
                <th className="text-right py-3 px-4 font-extrabold uppercase">Current</th>
                <th className="text-right py-3 px-4 font-extrabold uppercase">YTD</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b-2 border-slate-300">
                <td className="py-3 px-4 font-bold">REGULAR WAGES</td>
                <td className="py-3 px-4 text-right font-black">${paystub.gross_pay_current.toFixed(2)}</td>
                <td className="py-3 px-4 text-right font-black">${paystub.gross_pay_ytd.toFixed(2)}</td>
              </tr>
              <tr className="bg-yellow-400 border-t-4 border-slate-900">
                <td className="py-3 px-4 font-extrabold uppercase">GROSS PAY</td>
                <td className="py-3 px-4 text-right font-black text-lg">${paystub.gross_pay_current.toFixed(2)}</td>
                <td className="py-3 px-4 text-right font-black text-lg">${paystub.gross_pay_ytd.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-8 py-6 bg-white border-b-4 border-slate-400">
        <div className="bg-slate-900 text-yellow-400 px-4 py-2 mb-4 border-l-4 border-yellow-500">
          <p className="text-xs font-extrabold uppercase tracking-wider">Deductions</p>
        </div>
        <div className="border-4 border-slate-900 bg-slate-50">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-900 text-yellow-400 border-b-2 border-slate-900">
                <th className="text-left py-3 px-4 font-extrabold uppercase">Description</th>
                <th className="text-right py-3 px-4 font-extrabold uppercase">Current</th>
                <th className="text-right py-3 px-4 font-extrabold uppercase">YTD</th>
              </tr>
            </thead>
            <tbody>
              {paystub.deductions.map((deduction, index) => (
                <tr key={index} className="border-b border-slate-200">
                  <td className="py-2 px-4 font-bold">{deduction.description}</td>
                  <td className="py-2 px-4 text-right font-bold">{deduction.current}</td>
                  <td className="py-2 px-4 text-right font-bold">{deduction.ytd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 px-8 py-6 border-b-4 border-slate-900">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-2">Net Pay (Take Home)</p>
            <p className="text-5xl font-black text-slate-900">${paystub.net_pay_current.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-2">YTD Net Pay</p>
            <p className="text-3xl font-black text-slate-900">${paystub.net_pay_ytd.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-center px-8 py-5 border-t-4 border-yellow-500">
        <p className="text-sm text-yellow-400 font-extrabold uppercase">
          Official wage statement issued by {paystub.school_name}
        </p>
      </div>
    </div>
  );
}
