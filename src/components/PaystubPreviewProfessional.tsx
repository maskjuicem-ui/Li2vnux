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
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 px-8 py-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-1">{paystub.school_name}</h1>
            <p className="text-sm text-slate-300">{paystub.school_location}</p>
            <p className="text-xs text-slate-400 mt-2">EIN: {paystub.employer_ein}</p>
          </div>
          <div className="text-right">
            <div className="bg-white text-slate-900 px-4 py-2 rounded">
              <p className="text-xs font-semibold">PAYROLL STATEMENT</p>
              <p className="text-lg font-bold">{formatDate(paystub.pay_date)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-4 bg-slate-50 border-b">
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-xs text-slate-500 font-semibold mb-1">EMPLOYEE</p>
            <p className="font-semibold">{paystub.employee_name}</p>
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

      <div className="px-8 py-3 bg-slate-100 text-center">
        <p className="text-xs text-slate-600">Check #{paystub.check_number} | SSN: ***-**-{paystub.employee_ssn.slice(-4)} | Hire Date: {formatDate(paystub.hire_date)}</p>
      </div>
    </div>
  );
}
