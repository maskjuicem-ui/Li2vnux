import { Paystub } from '../lib/supabase';

interface PaystubPreviewProps {
  data: Paystub;
}

export default function PaystubPreviewPremium({ data }: PaystubPreviewProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div id="paystub-preview" className="bg-gradient-to-br from-slate-50 via-white to-slate-50 p-12 min-h-[1100px] font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl border-4 border-double border-amber-600" style={{ fontFamily: 'Georgia, serif' }}>
        <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 p-8 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2 tracking-wide">{data.school_name}</h1>
              <p className="text-amber-100 text-sm leading-relaxed">{data.school_location}</p>
              <p className="text-amber-100 text-sm">School Code: {data.school_code}</p>
              <p className="text-amber-100 text-sm">EIN: {data.employer_ein}</p>
            </div>
            <div className="text-right">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-lg border border-amber-400">
                <p className="text-xs text-amber-100 uppercase tracking-widest">Pay Statement</p>
                <p className="text-2xl font-bold mt-1">#{data.check_number}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-gradient-to-b from-amber-50 to-white">
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-600">
              <h3 className="text-xs font-semibold text-amber-900 uppercase tracking-wider mb-3">Employee Information</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-slate-500">Name</p>
                  <p className="font-bold text-slate-900 text-lg">{data.employee_name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-xs text-slate-500">SSN</p>
                    <p className="font-mono text-sm font-semibold text-slate-900">{data.employee_ssn}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">File Number</p>
                    <p className="font-mono text-sm font-semibold text-slate-900">{data.file_number}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-slate-500">Position</p>
                  <p className="font-semibold text-slate-900">{data.position}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Hire Date</p>
                  <p className="text-sm text-slate-900">{formatDate(data.hire_date)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-600">
              <h3 className="text-xs font-semibold text-amber-900 uppercase tracking-wider mb-3">Pay Period</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-slate-500">Pay Date</p>
                  <p className="font-bold text-slate-900 text-lg">{formatDate(data.pay_date)}</p>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-slate-500">Period</p>
                  <p className="text-sm text-slate-900">{formatDate(data.period_start)} - {formatDate(data.period_end)}</p>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-slate-500">Salary Rate</p>
                  <p className="font-bold text-slate-900 text-lg">{formatCurrency(data.salary_rate)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 mb-6 rounded-t-lg">
            <h3 className="font-bold text-lg tracking-wide">Earnings Statement</h3>
          </div>

          <div className="bg-white shadow-md rounded-b-lg overflow-hidden mb-6">
            <table className="w-full">
              <thead>
                <tr className="bg-amber-100 border-b-2 border-amber-300">
                  <th className="text-left px-6 py-3 text-xs font-bold text-amber-900 uppercase tracking-wider">Description</th>
                  <th className="text-right px-6 py-3 text-xs font-bold text-amber-900 uppercase tracking-wider">Current</th>
                  <th className="text-right px-6 py-3 text-xs font-bold text-amber-900 uppercase tracking-wider">Year to Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200 bg-amber-50">
                  <td className="px-6 py-4 font-semibold text-slate-900">Gross Pay</td>
                  <td className="px-6 py-4 text-right font-bold text-slate-900">{formatCurrency(data.gross_pay_current)}</td>
                  <td className="px-6 py-4 text-right font-bold text-slate-900">{formatCurrency(data.gross_pay_ytd)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gradient-to-r from-slate-600 to-slate-700 text-white px-6 py-3 mb-6 rounded-t-lg">
            <h3 className="font-bold text-lg tracking-wide">Deductions</h3>
          </div>

          <div className="bg-white shadow-md rounded-b-lg overflow-hidden mb-6">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100 border-b-2 border-slate-300">
                  <th className="text-left px-6 py-3 text-xs font-bold text-slate-700 uppercase tracking-wider">Description</th>
                  <th className="text-right px-6 py-3 text-xs font-bold text-slate-700 uppercase tracking-wider">Current</th>
                  <th className="text-right px-6 py-3 text-xs font-bold text-slate-700 uppercase tracking-wider">Year to Date</th>
                </tr>
              </thead>
              <tbody>
                {data.deductions.map((deduction, index) => (
                  <tr key={index} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-3 text-sm text-slate-900">{deduction.description}</td>
                    <td className="px-6 py-3 text-right text-sm text-slate-900 font-mono">{deduction.current}</td>
                    <td className="px-6 py-3 text-right text-sm text-slate-900 font-mono">{deduction.ytd}</td>
                  </tr>
                ))}
                <tr className="bg-slate-100 font-bold border-t-2 border-slate-400">
                  <td className="px-6 py-4 text-slate-900">Total Deductions</td>
                  <td className="px-6 py-4 text-right text-slate-900">{formatCurrency(data.total_deductions_current)}</td>
                  <td className="px-6 py-4 text-right text-slate-900">{formatCurrency(data.total_deductions_ytd)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-6 rounded-lg shadow-xl mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-emerald-100 text-sm uppercase tracking-widest mb-1">Net Pay</p>
                <p className="text-4xl font-bold">{formatCurrency(data.net_pay_current)}</p>
              </div>
              <div className="text-right">
                <p className="text-emerald-100 text-sm uppercase tracking-widest mb-1">YTD Net Pay</p>
                <p className="text-3xl font-bold">{formatCurrency(data.net_pay_ytd)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 mb-1">Payment Method</p>
                <p className="text-sm font-semibold text-slate-900">{data.payment_method}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 mb-1">Check Date</p>
                <p className="text-sm font-semibold text-slate-900">{formatDate(data.pay_date)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-6 text-center">
          <p className="text-xs text-slate-300 leading-relaxed">
            This is an official payroll statement. Please retain for your records.
            <br />
            For questions regarding this statement, please contact the Payroll Department.
          </p>
        </div>
      </div>
    </div>
  );
}
