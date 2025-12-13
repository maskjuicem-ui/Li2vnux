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
          <div className="text-center border-b-2 border-slate-800 pb-4">
            <h1 className="text-2xl font-bold uppercase tracking-wider">{paystub.school_name}</h1>
            <p className="text-sm mt-1">{paystub.school_location}</p>
            <p className="text-xs mt-2 font-semibold">OFFICIAL PAYROLL DOCUMENT</p>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-6">
            <div>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-slate-300">
                    <td className="py-2 font-semibold">Employee Name:</td>
                    <td className="py-2">{paystub.employee_name}</td>
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
