import { Paystub } from '../lib/supabase';

interface PaystubPreviewCorporateProps {
  paystub: Paystub;
}

export default function PaystubPreviewCorporate({ paystub }: PaystubPreviewCorporateProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  return (
    <div className="bg-white shadow-lg overflow-hidden" style={{ fontFamily: 'Times New Roman, serif' }}>
      <div className="border-4 border-double border-slate-800">
        <div className="px-8 py-6 bg-slate-50">
          <div className="text-center border-b-2 border-slate-800 pb-5 mb-6">
            <div className="flex justify-center mb-3">
              <div className="bg-slate-800 p-3 rounded-full">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-extrabold uppercase tracking-wider mb-2">{paystub.school_name}</h1>
            <p className="text-base mt-2 font-semibold">{paystub.school_location}</p>
            <p className="text-sm mt-3 font-bold bg-slate-800 text-white py-2 px-4 inline-block rounded">OFFICIAL PAYROLL DOCUMENT</p>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-6">
            <div>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-slate-300 bg-blue-50">
                    <td className="py-3 px-3 font-bold">Employee Name:</td>
                    <td className="py-3 px-3 font-extrabold text-slate-900">{paystub.employee_name}</td>
                  </tr>
                  <tr className="border-b border-slate-300">
                    <td className="py-2 font-semibold">Employee SSN:</td>
                    <td className="py-2">***-**-{paystub.employee_ssn.slice(-4)}</td>
                  </tr>
                  <tr className="border-b border-slate-300">
                    <td className="py-2 font-semibold">Position:</td>
                    <td className="py-2">{paystub.position}</td>
                  </tr>
                  <tr className="border-b border-slate-300">
                    <td className="py-2 font-semibold">Hire Date:</td>
                    <td className="py-2">{formatDate(paystub.hire_date)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-slate-300">
                    <td className="py-2 font-semibold">Check Number:</td>
                    <td className="py-2">{paystub.check_number}</td>
                  </tr>
                  <tr className="border-b border-slate-300">
                    <td className="py-2 font-semibold">Pay Date:</td>
                    <td className="py-2">{formatDate(paystub.pay_date)}</td>
                  </tr>
                  <tr className="border-b border-slate-300">
                    <td className="py-2 font-semibold">Period Start:</td>
                    <td className="py-2">{formatDate(paystub.period_start)}</td>
                  </tr>
                  <tr className="border-b border-slate-300">
                    <td className="py-2 font-semibold">Period End:</td>
                    <td className="py-2">{formatDate(paystub.period_end)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 border-t-2 border-slate-800">
          <h3 className="text-sm font-bold uppercase mb-4 bg-slate-800 text-white px-3 py-2">Compensation Details</h3>
          <table className="w-full text-sm border border-slate-400">
            <thead className="bg-slate-200">
              <tr>
                <th className="text-left py-2 px-3 border-r border-slate-400">Description</th>
                <th className="text-right py-2 px-3 border-r border-slate-400">Rate</th>
                <th className="text-right py-2 px-3 border-r border-slate-400">Hours</th>
                <th className="text-right py-2 px-3 border-r border-slate-400">Current Period</th>
                <th className="text-right py-2 px-3">Year to Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-400">
                <td className="py-2 px-3 border-r border-slate-400">Regular Salary</td>
                <td className="text-right py-2 px-3 border-r border-slate-400">${(paystub.salary_rate / 2080).toFixed(2)}</td>
                <td className="text-right py-2 px-3 border-r border-slate-400">160.00</td>
                <td className="text-right py-2 px-3 border-r border-slate-400">${paystub.gross_pay_current.toFixed(2)}</td>
                <td className="text-right py-2 px-3">${paystub.gross_pay_ytd.toFixed(2)}</td>
              </tr>
              <tr className="border-t-2 border-slate-600 font-bold bg-slate-100">
                <td className="py-2 px-3 border-r border-slate-400" colSpan={3}>TOTAL GROSS EARNINGS</td>
                <td className="text-right py-2 px-3 border-r border-slate-400">${paystub.gross_pay_current.toFixed(2)}</td>
                <td className="text-right py-2 px-3">${paystub.gross_pay_ytd.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="px-8 py-6 border-t-2 border-slate-800">
          <h3 className="text-sm font-bold uppercase mb-4 bg-slate-800 text-white px-3 py-2">Deductions & Withholdings</h3>
          <table className="w-full text-sm border border-slate-400">
            <thead className="bg-slate-200">
              <tr>
                <th className="text-left py-2 px-3 border-r border-slate-400">Description</th>
                <th className="text-right py-2 px-3 border-r border-slate-400">Current Period</th>
                <th className="text-right py-2 px-3">Year to Date</th>
              </tr>
            </thead>
            <tbody>
              {paystub.deductions.length > 0 ? (
                paystub.deductions.map((item, index) => (
                  <tr key={index} className="border-t border-slate-400">
                    <td className="py-2 px-3 border-r border-slate-400">{item.description}</td>
                    <td className="text-right py-2 px-3 border-r border-slate-400">{item.current}</td>
                    <td className="text-right py-2 px-3">{item.ytd}</td>
                  </tr>
                ))
              ) : (
                <>
                  <tr className="border-t border-slate-400">
                    <td className="py-2 px-3 border-r border-slate-400">Federal Income Tax</td>
                    <td className="text-right py-2 px-3 border-r border-slate-400">${(paystub.gross_pay_current * 0.12).toFixed(2)}</td>
                    <td className="text-right py-2 px-3">${(paystub.gross_pay_ytd * 0.12).toFixed(2)}</td>
                  </tr>
                  <tr className="border-t border-slate-400">
                    <td className="py-2 px-3 border-r border-slate-400">State Income Tax</td>
                    <td className="text-right py-2 px-3 border-r border-slate-400">${(paystub.gross_pay_current * 0.05).toFixed(2)}</td>
                    <td className="text-right py-2 px-3">${(paystub.gross_pay_ytd * 0.05).toFixed(2)}</td>
                  </tr>
                  <tr className="border-t border-slate-400">
                    <td className="py-2 px-3 border-r border-slate-400">Social Security Tax</td>
                    <td className="text-right py-2 px-3 border-r border-slate-400">${(paystub.gross_pay_current * 0.062).toFixed(2)}</td>
                    <td className="text-right py-2 px-3">${(paystub.gross_pay_ytd * 0.062).toFixed(2)}</td>
                  </tr>
                  <tr className="border-t border-slate-400">
                    <td className="py-2 px-3 border-r border-slate-400">Medicare Tax</td>
                    <td className="text-right py-2 px-3 border-r border-slate-400">${(paystub.gross_pay_current * 0.0145).toFixed(2)}</td>
                    <td className="text-right py-2 px-3">${(paystub.gross_pay_ytd * 0.0145).toFixed(2)}</td>
                  </tr>
                </>
              )}
              <tr className="border-t-2 border-slate-600 font-bold bg-slate-100">
                <td className="py-2 px-3 border-r border-slate-400">TOTAL DEDUCTIONS</td>
                <td className="text-right py-2 px-3 border-r border-slate-400">${paystub.total_deductions_current.toFixed(2)}</td>
                <td className="text-right py-2 px-3">${paystub.total_deductions_ytd.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="px-8 py-6 bg-slate-800 text-white border-t-4 border-slate-900">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs mb-1">NET PAY (CURRENT PERIOD)</p>
              <p className="text-3xl font-bold">${paystub.net_pay_current.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs mb-1">PAYMENT DISTRIBUTION</p>
              <p className="text-sm">{paystub.payment_method || 'Direct Deposit'}</p>
            </div>
          </div>
        </div>

        <div className="px-8 py-3 bg-slate-100 text-center border-t border-slate-400">
          <p className="text-xs">This is an official payroll document. Retain for your records.</p>
          <p className="text-xs mt-1">{paystub.school_name} | Employer ID: {paystub.employer_ein}</p>
        </div>
      </div>
    </div>
  );
}
