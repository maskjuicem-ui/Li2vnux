import { Paystub } from '../lib/supabase';

interface PaystubPreviewProfessionalProps {
  paystub: Paystub;
}

export default function PaystubPreviewProfessional({ paystub }: PaystubPreviewProfessionalProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  };

  return (
    <div className="bg-white shadow-lg overflow-hidden" style={{ fontFamily: 'Arial, sans-serif' }}>
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 px-8 py-7 text-white">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-lg shadow-xl border-4 border-white/20">
              <svg className="w-9 h-9 text-slate-800" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold mb-1 tracking-tight drop-shadow-md">{paystub.school_name.toUpperCase()}</h1>
              <p className="text-base text-slate-200 font-semibold">{paystub.school_location}</p>
              <p className="text-xs text-slate-300 mt-1 font-medium">EIN: {paystub.employer_ein}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-white text-slate-900 px-5 py-3 rounded-lg shadow-lg border-2 border-white/30">
              <p className="text-xs font-bold uppercase tracking-wider">Official Payroll Statement</p>
              <p className="text-lg font-extrabold mt-1">{formatDate(paystub.pay_date)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-5 bg-slate-50 border-b border-slate-300">
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div className="bg-blue-50 border-l-4 border-blue-600 px-3 py-2 rounded-r">
            <p className="text-xs text-blue-700 font-bold mb-1.5 uppercase tracking-wider">Employee Name</p>
            <p className="text-base font-extrabold text-slate-900">{paystub.employee_name}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold mb-1">EMPLOYEE ID</p>
            <p className="font-semibold">{paystub.file_number || paystub.employee_ssn.slice(-4)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold mb-1">POSITION</p>
            <p className="font-semibold">{paystub.position}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold mb-1">PAY PERIOD</p>
            <p className="font-semibold text-xs">{formatDate(paystub.period_start)} - {formatDate(paystub.period_end)}</p>
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-bold text-slate-700 mb-3 pb-2 border-b-2 border-slate-300">EARNINGS</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-600">
                  <th className="text-left py-2">Description</th>
                  <th className="text-right py-2">Current</th>
                  <th className="text-right py-2">YTD</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-t border-slate-200">
                  <td className="py-2">Base Salary</td>
                  <td className="text-right">${paystub.gross_pay_current.toFixed(2)}</td>
                  <td className="text-right">${paystub.gross_pay_ytd.toFixed(2)}</td>
                </tr>
                <tr className="font-bold border-t-2 border-slate-300">
                  <td className="py-2">Total Gross</td>
                  <td className="text-right">${paystub.gross_pay_current.toFixed(2)}</td>
                  <td className="text-right">${paystub.gross_pay_ytd.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-700 mb-3 pb-2 border-b-2 border-slate-300">DEDUCTIONS</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-600">
                  <th className="text-left py-2">Description</th>
                  <th className="text-right py-2">Current</th>
                  <th className="text-right py-2">YTD</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {paystub.deductions.length > 0 ? (
                  paystub.deductions.map((item, index) => (
                    <tr key={index} className="border-t border-slate-200">
                      <td className="py-2">{item.description}</td>
                      <td className="text-right">{item.current}</td>
                      <td className="text-right">{item.ytd}</td>
                    </tr>
                  ))
                ) : (
                  <>
                    <tr className="border-t border-slate-200">
                      <td className="py-2">Federal Tax</td>
                      <td className="text-right">${(paystub.gross_pay_current * 0.12).toFixed(2)}</td>
                      <td className="text-right">${(paystub.gross_pay_ytd * 0.12).toFixed(2)}</td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="py-2">State Tax</td>
                      <td className="text-right">${(paystub.gross_pay_current * 0.05).toFixed(2)}</td>
                      <td className="text-right">${(paystub.gross_pay_ytd * 0.05).toFixed(2)}</td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="py-2">FICA</td>
                      <td className="text-right">${(paystub.gross_pay_current * 0.0765).toFixed(2)}</td>
                      <td className="text-right">${(paystub.gross_pay_ytd * 0.0765).toFixed(2)}</td>
                    </tr>
                  </>
                )}
                <tr className="font-bold border-t-2 border-slate-300">
                  <td className="py-2">Total Deductions</td>
                  <td className="text-right">${paystub.total_deductions_current.toFixed(2)}</td>
                  <td className="text-right">${paystub.total_deductions_ytd.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 bg-gradient-to-r from-slate-700 to-slate-900 text-white">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-slate-300 mb-1">NET PAY</p>
            <p className="text-3xl font-bold">${paystub.net_pay_current.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-300 mb-1">PAYMENT METHOD</p>
            <p className="text-sm">{paystub.payment_method || `Direct Deposit - ****${paystub.check_number.slice(-4)}`}</p>
          </div>
        </div>
      </div>

      <div className="px-8 py-3 bg-slate-100 text-center border-t border-slate-300">
        <p className="text-xs text-slate-600 font-medium">Check #{paystub.check_number} | SSN: ***-**-{paystub.employee_ssn.slice(-4)} | Hire Date: {formatDate(paystub.hire_date)}</p>
      </div>

      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-center px-8 py-5">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm text-slate-300 leading-relaxed font-semibold mb-2">
            This is an official payroll document issued by {paystub.school_name}.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed italic">
            This document serves as proof of employment and compensation.
          </p>
        </div>
      </div>
    </div>
  );
}
