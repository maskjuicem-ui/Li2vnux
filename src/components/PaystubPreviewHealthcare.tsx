import { Paystub } from '../lib/supabase';

interface PaystubPreviewHealthcareProps {
  paystub: Paystub;
}

export default function PaystubPreviewHealthcare({ paystub }: PaystubPreviewHealthcareProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  };

  return (
    <div className="bg-white shadow-lg overflow-hidden" style={{ fontFamily: 'Calibri, sans-serif' }}>
      <div className="border-l-8 border-teal-600">
        <div className="bg-gradient-to-r from-teal-50 to-white px-8 py-5 border-b-2 border-teal-600">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">+</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">{paystub.school_name}</h1>
                  <p className="text-sm text-slate-600">{paystub.school_location}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-teal-600 text-white px-4 py-2 rounded-md">
                <p className="text-xs font-semibold">COMPENSATION STATEMENT</p>
                <p className="text-base font-bold mt-1">{formatDate(paystub.pay_date)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-4 bg-teal-50 border-b border-teal-200">
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-xs text-teal-700 font-semibold mb-1">Employee Name</p>
              <p className="font-semibold text-slate-900">{paystub.employee_name}</p>
            </div>
            <div>
              <p className="text-xs text-teal-700 font-semibold mb-1">Employee ID</p>
              <p className="font-semibold text-slate-900">{paystub.file_number || 'MED' + paystub.employee_ssn.slice(-6)}</p>
            </div>
            <div>
              <p className="text-xs text-teal-700 font-semibold mb-1">Department</p>
              <p className="font-semibold text-slate-900">{paystub.position}</p>
            </div>
            <div>
              <p className="text-xs text-teal-700 font-semibold mb-1">Check Number</p>
              <p className="font-semibold text-slate-900">{paystub.check_number}</p>
            </div>
          </div>
        </div>

        <div className="px-8 py-5">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-6 bg-teal-600 rounded"></div>
              <h3 className="text-sm font-bold text-slate-900">PAY PERIOD DETAILS</h3>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm bg-slate-50 p-4 rounded-lg">
              <div>
                <p className="text-xs text-slate-600 mb-1">Period Start</p>
                <p className="font-semibold">{formatDate(paystub.period_start)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">Period End</p>
                <p className="font-semibold">{formatDate(paystub.period_end)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">Pay Date</p>
                <p className="font-semibold">{formatDate(paystub.pay_date)}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-6 bg-green-600 rounded"></div>
              <h3 className="text-sm font-bold text-slate-900">EARNINGS SUMMARY</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-teal-600 text-xs text-teal-700">
                  <th className="text-left py-2 px-3">Description</th>
                  <th className="text-right py-2 px-3">Rate</th>
                  <th className="text-right py-2 px-3">Hours</th>
                  <th className="text-right py-2 px-3 bg-green-50">Current</th>
                  <th className="text-right py-2 px-3 bg-slate-50">YTD</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="py-2 px-3">Regular Salary</td>
                  <td className="text-right py-2 px-3">${(paystub.salary_rate / 2080).toFixed(2)}</td>
                  <td className="text-right py-2 px-3">160.00</td>
                  <td className="text-right py-2 px-3 bg-green-50 font-semibold">${paystub.gross_pay_current.toFixed(2)}</td>
                  <td className="text-right py-2 px-3 bg-slate-50">${paystub.gross_pay_ytd.toFixed(2)}</td>
                </tr>
                <tr className="font-bold bg-green-100 text-green-900">
                  <td className="py-2 px-3" colSpan={3}>TOTAL GROSS EARNINGS</td>
                  <td className="text-right py-2 px-3">${paystub.gross_pay_current.toFixed(2)}</td>
                  <td className="text-right py-2 px-3">${paystub.gross_pay_ytd.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-6 bg-red-600 rounded"></div>
              <h3 className="text-sm font-bold text-slate-900">DEDUCTIONS & WITHHOLDINGS</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-teal-600 text-xs text-teal-700">
                  <th className="text-left py-2 px-3">Category</th>
                  <th className="text-left py-2 px-3">Description</th>
                  <th className="text-right py-2 px-3 bg-red-50">Current</th>
                  <th className="text-right py-2 px-3 bg-slate-50">YTD</th>
                </tr>
              </thead>
              <tbody>
                {paystub.deductions.length > 0 ? (
                  paystub.deductions.map((item, index) => (
                    <tr key={index} className="border-b border-slate-200">
                      <td className="py-2 px-3">
                        {item.description.toLowerCase().includes('tax') ? 'Tax' :
                         item.description.toLowerCase().includes('insurance') || item.description.toLowerCase().includes('medical') ? 'Benefits' :
                         'Other'}
                      </td>
                      <td className="py-2 px-3">{item.description}</td>
                      <td className="text-right py-2 px-3 bg-red-50">{item.current}</td>
                      <td className="text-right py-2 px-3 bg-slate-50">{item.ytd}</td>
                    </tr>
                  ))
                ) : (
                  <>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 px-3">Tax</td>
                      <td className="py-2 px-3">Federal Income Tax</td>
                      <td className="text-right py-2 px-3 bg-red-50">${(paystub.gross_pay_current * 0.12).toFixed(2)}</td>
                      <td className="text-right py-2 px-3 bg-slate-50">${(paystub.gross_pay_ytd * 0.12).toFixed(2)}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 px-3">Tax</td>
                      <td className="py-2 px-3">State Income Tax</td>
                      <td className="text-right py-2 px-3 bg-red-50">${(paystub.gross_pay_current * 0.05).toFixed(2)}</td>
                      <td className="text-right py-2 px-3 bg-slate-50">${(paystub.gross_pay_ytd * 0.05).toFixed(2)}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 px-3">Tax</td>
                      <td className="py-2 px-3">Social Security (FICA)</td>
                      <td className="text-right py-2 px-3 bg-red-50">${(paystub.gross_pay_current * 0.062).toFixed(2)}</td>
                      <td className="text-right py-2 px-3 bg-slate-50">${(paystub.gross_pay_ytd * 0.062).toFixed(2)}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 px-3">Tax</td>
                      <td className="py-2 px-3">Medicare</td>
                      <td className="text-right py-2 px-3 bg-red-50">${(paystub.gross_pay_current * 0.0145).toFixed(2)}</td>
                      <td className="text-right py-2 px-3 bg-slate-50">${(paystub.gross_pay_ytd * 0.0145).toFixed(2)}</td>
                    </tr>
                  </>
                )}
                <tr className="font-bold bg-red-100 text-red-900">
                  <td className="py-2 px-3" colSpan={2}>TOTAL DEDUCTIONS</td>
                  <td className="text-right py-2 px-3">${paystub.total_deductions_current.toFixed(2)}</td>
                  <td className="text-right py-2 px-3">${paystub.total_deductions_ytd.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="px-8 py-5 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-teal-100 mb-1">NET PAY (TAKE HOME)</p>
              <p className="text-3xl font-bold">${paystub.net_pay_current.toFixed(2)}</p>
              <p className="text-xs text-teal-100 mt-1">Year to Date: ${paystub.net_pay_ytd.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-teal-100 mb-1">PAYMENT DISTRIBUTION</p>
              <p className="text-sm font-semibold">{paystub.payment_method || 'Direct Deposit'}</p>
              <p className="text-xs text-teal-100 mt-1">SSN: ***-**-{paystub.employee_ssn.slice(-4)}</p>
            </div>
          </div>
        </div>

        <div className="px-8 py-3 bg-teal-50 text-center border-t border-teal-200">
          <p className="text-xs text-slate-600">
            {paystub.school_name} | Employer ID: {paystub.employer_ein} |
            Hire Date: {formatDate(paystub.hire_date)}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            This statement is confidential and intended solely for the named employee
          </p>
        </div>
      </div>
    </div>
  );
}
