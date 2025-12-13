import { Paystub } from '../lib/supabase';

interface PaystubPreviewProps {
  data: Paystub;
}

export default function PaystubPreviewAcme3({ data }: PaystubPreviewProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div id="paystub-preview" className="bg-white p-12 min-h-[1100px] font-sans">
      <div className="max-w-5xl mx-auto bg-white">
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{data.school_name}</h1>
            <p className="text-sm text-slate-600 leading-relaxed">{data.school_location}</p>
            <p className="text-sm text-slate-600">Phone: {data.school_code}</p>
            <p className="text-sm text-slate-600">EIN: {data.employer_ein}</p>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Earnings Statement</h2>
            <p className="text-sm text-slate-600">Period Ending: {formatDate(data.period_end)}</p>
            <p className="text-sm text-slate-600">Pay Date: {formatDate(data.pay_date)}</p>
          </div>
        </div>

        <div className="bg-slate-100 p-6 mb-8 border border-slate-300">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-bold text-slate-700 mb-1">SSN: <span className="font-mono">{data.employee_ssn}</span></p>
              <p className="text-sm font-bold text-slate-700">Taxable Marital Status:</p>
              <p className="text-sm text-slate-900">Single</p>
              <p className="text-sm font-bold text-slate-700 mt-2">Exemptions/Allowances: <span className="font-normal">0</span></p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-slate-900">{data.employee_name}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-400">
                <th className="text-left py-3 px-4 font-bold text-slate-800">Earnings</th>
                <th className="text-center py-3 px-4 font-bold text-slate-800">Rate</th>
                <th className="text-center py-3 px-4 font-bold text-slate-800">Hours</th>
                <th className="text-right py-3 px-4 font-bold text-slate-800">This Period</th>
                <th className="text-right py-3 px-4 font-bold text-slate-800">Year to Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-300">
                <td className="py-4 px-4 text-slate-900">{data.position}</td>
                <td className="py-4 px-4 text-center text-slate-900">{(data.salary_rate / 160).toFixed(2)}</td>
                <td className="py-4 px-4 text-center text-slate-900">80.00</td>
                <td className="py-4 px-4 text-right text-slate-900">{formatCurrency(data.gross_pay_current)}</td>
                <td className="py-4 px-4 text-right text-slate-900">{formatCurrency(data.gross_pay_ytd)}</td>
              </tr>
              <tr className="bg-slate-200">
                <td colSpan={3} className="py-4 px-4 font-bold text-slate-900">Gross Pay</td>
                <td className="py-4 px-4 text-right font-bold text-slate-900">{formatCurrency(data.gross_pay_current)}</td>
                <td className="py-4 px-4 text-right font-bold text-slate-900">{formatCurrency(data.gross_pay_ytd)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-400">
                <th className="text-left py-3 px-4 font-bold text-slate-800">Deductions</th>
                <th className="text-center py-3 px-4 font-bold text-slate-800">Type</th>
                <th className="text-right py-3 px-4 font-bold text-slate-800">This Period</th>
                <th className="text-right py-3 px-4 font-bold text-slate-800">Year to Date</th>
              </tr>
            </thead>
            <tbody>
              {data.deductions.map((deduction, index) => (
                <tr key={index} className="border-b border-slate-200">
                  <td className="py-3 px-4"></td>
                  <td className="py-3 px-4 text-center text-sm text-slate-900">{deduction.description}</td>
                  <td className="py-3 px-4 text-right text-slate-900 font-mono">{deduction.current}</td>
                  <td className="py-3 px-4 text-right text-slate-900 font-mono">{deduction.ytd}</td>
                </tr>
              ))}
              <tr className="bg-slate-200 font-bold">
                <td colSpan={2} className="py-4 px-4 text-slate-900">Total</td>
                <td className="py-4 px-4 text-right text-slate-900">{formatCurrency(data.total_deductions_current)}</td>
                <td className="py-4 px-4 text-right text-slate-900">{formatCurrency(data.total_deductions_ytd)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="bg-slate-200 p-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900">Net Pay</span>
              <span className="text-2xl font-bold text-slate-900">{formatCurrency(data.net_pay_current)}</span>
            </div>
          </div>
          <div className="bg-blue-100 p-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900">Net Pay</span>
              <span className="text-2xl font-bold text-slate-900">{formatCurrency(data.net_pay_ytd)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
