import { Paystub } from '../lib/supabase';

interface PaystubPreviewMinimalistProps {
  paystub: Paystub;
}

export default function PaystubPreviewMinimalist({ paystub }: PaystubPreviewMinimalistProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white shadow-sm overflow-hidden max-w-4xl mx-auto" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="px-12 py-8 border-b-4 border-black">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-black flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">{paystub.school_name.toUpperCase()}</h1>
              <p className="text-sm text-slate-600 mt-0.5">{paystub.school_location}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Payroll Statement</p>
            <p className="text-2xl font-black mt-1">{formatDate(paystub.pay_date)}</p>
          </div>
        </div>
      </div>

      <div className="px-12 py-8 bg-slate-50">
        <div className="grid grid-cols-2 gap-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">Employee</p>
            <div className="bg-white border-l-4 border-black p-4">
              <p className="text-xs text-slate-500 mb-1">Full Name</p>
              <p className="text-xl font-black">{paystub.employee_name}</p>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-200">
                <span className="text-sm text-slate-600">Position</span>
                <span className="text-sm font-bold">{paystub.position}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-200">
                <span className="text-sm text-slate-600">SSN</span>
                <span className="text-sm font-bold">{paystub.employee_ssn}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-200">
                <span className="text-sm text-slate-600">Hire Date</span>
                <span className="text-sm font-bold">{formatDate(paystub.hire_date)}</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">Period</p>
            <div className="bg-black text-white p-4">
              <p className="text-xs text-slate-400 mb-1">Pay Period</p>
              <p className="text-base font-black">{formatDate(paystub.period_start)} - {formatDate(paystub.period_end)}</p>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-200">
                <span className="text-sm text-slate-600">Check Number</span>
                <span className="text-sm font-bold">{paystub.check_number}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-200">
                <span className="text-sm text-slate-600">EIN</span>
                <span className="text-sm font-bold">{paystub.employer_ein}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-12 py-8">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">Earnings</p>
        <div className="border border-slate-200">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider">Description</th>
                <th className="text-right py-3 px-4 text-xs font-bold uppercase tracking-wider">Current</th>
                <th className="text-right py-3 px-4 text-xs font-bold uppercase tracking-wider">YTD</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 text-sm">Regular Salary</td>
                <td className="py-3 px-4 text-sm text-right font-bold">${paystub.gross_pay_current.toFixed(2)}</td>
                <td className="py-3 px-4 text-sm text-right font-bold">${paystub.gross_pay_ytd.toFixed(2)}</td>
              </tr>
              <tr className="bg-black text-white">
                <td className="py-3 px-4 text-sm font-black uppercase">Gross Pay</td>
                <td className="py-3 px-4 text-base text-right font-black">${paystub.gross_pay_current.toFixed(2)}</td>
                <td className="py-3 px-4 text-base text-right font-black">${paystub.gross_pay_ytd.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-12 py-8 bg-slate-50">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">Deductions</p>
        <div className="border border-slate-200">
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider">Description</th>
                <th className="text-right py-3 px-4 text-xs font-bold uppercase tracking-wider">Current</th>
                <th className="text-right py-3 px-4 text-xs font-bold uppercase tracking-wider">YTD</th>
              </tr>
            </thead>
            <tbody>
              {paystub.deductions.map((deduction, index) => (
                <tr key={index} className="border-b border-slate-100">
                  <td className="py-2 px-4 text-xs">{deduction.description}</td>
                  <td className="py-2 px-4 text-xs text-right font-semibold">{deduction.current}</td>
                  <td className="py-2 px-4 text-xs text-right font-semibold">{deduction.ytd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-12 py-8 bg-black text-white">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Net Pay</p>
            <p className="text-4xl font-black">${paystub.net_pay_current.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">YTD Net Pay</p>
            <p className="text-2xl font-black">${paystub.net_pay_ytd.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-center px-8 py-5">
        <p className="text-sm text-slate-300 font-semibold">
          Official payroll document issued by {paystub.school_name}
        </p>
      </div>
    </div>
  );
}
