import { Paystub } from '../lib/supabase';

interface PaystubPreviewProps {
  data: Paystub;
}

export default function PaystubPreviewAcme2({ data }: PaystubPreviewProps) {
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

        <div className="bg-blue-100 p-6 mb-8 rounded">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-blue-900">{data.school_name}</h3>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="mb-4">
                <p className="text-sm font-bold text-blue-800">Payee Name</p>
                <p className="text-base text-slate-900">{data.employee_name}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm font-bold text-blue-800">Payment Date</p>
                <p className="text-base text-slate-900">{formatDate(data.pay_date)}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-blue-800">Employee ID</p>
                <p className="text-base text-slate-900">{data.file_number}</p>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <p className="text-sm font-bold text-blue-800">Marital Status</p>
                <p className="text-base text-slate-900">Single</p>
              </div>
              <div className="mb-4">
                <p className="text-sm font-bold text-blue-800">Check Number</p>
                <p className="text-base text-slate-900">{data.check_number}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-blue-800">SSN</p>
                <p className="text-base text-slate-900 font-mono">{data.employee_ssn}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <div className="bg-blue-100 px-4 py-3 mb-4">
              <h4 className="font-bold text-blue-900 text-center">Payments</h4>
            </div>
            <div className="border-b border-slate-300 pb-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900">Regular Pay</span>
                <span className="text-slate-900">{formatCurrency(data.gross_pay_current)}</span>
              </div>
            </div>
            <div className="bg-blue-700 text-white px-4 py-3 mb-4">
              <h4 className="font-bold text-center">Payments</h4>
            </div>
            <div className="flex justify-between items-center text-lg font-bold mb-2">
              <span>{formatCurrency(data.gross_pay_current)}</span>
            </div>
          </div>

          <div>
            <div className="bg-blue-100 px-4 py-3 mb-4">
              <h4 className="font-bold text-blue-900 text-center">Year to date</h4>
            </div>
            <div className="border-b border-slate-300 pb-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900">Regular Pay</span>
                <span className="text-slate-900">{formatCurrency(data.gross_pay_ytd)}</span>
              </div>
            </div>
            <div className="bg-blue-700 text-white px-4 py-3 mb-4">
              <h4 className="font-bold text-center">Year to date</h4>
            </div>
            <div className="flex justify-between items-center text-lg font-bold mb-2">
              <span>{formatCurrency(data.gross_pay_ytd)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <div className="bg-blue-100 px-4 py-3 mb-4">
              <h4 className="font-bold text-blue-900 text-center">Deductions</h4>
            </div>
            <div className="space-y-2 mb-4">
              {data.deductions.map((deduction, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-slate-700">{deduction.description}</span>
                  <span className="text-slate-900 font-mono">{deduction.current}</span>
                </div>
              ))}
            </div>
            <div className="bg-blue-700 text-white px-4 py-3 mb-2">
              <h4 className="font-bold text-center">Payments</h4>
            </div>
            <div className="flex justify-between items-center text-lg font-bold">
              <span>{formatCurrency(data.total_deductions_current)}</span>
            </div>
          </div>

          <div>
            <div className="bg-blue-100 px-4 py-3 mb-4">
              <h4 className="font-bold text-blue-900 text-center">Year to date</h4>
            </div>
            <div className="space-y-2 mb-4">
              {data.deductions.map((deduction, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-slate-700">{deduction.description}</span>
                  <span className="text-slate-900 font-mono">{deduction.ytd}</span>
                </div>
              ))}
            </div>
            <div className="bg-blue-700 text-white px-4 py-3 mb-2">
              <h4 className="font-bold text-center">Year to date</h4>
            </div>
            <div className="flex justify-between items-center text-lg font-bold">
              <span>{formatCurrency(data.total_deductions_ytd)}</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-100 p-6 mb-8">
          <div className="flex justify-between items-center">
            <p className="text-lg">
              <span className="font-bold">Net Pay:</span> {data.net_pay_current.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace(/\$|,/g, (match) => match === '$' ? '' : ' ').split('.')[0]} And {data.net_pay_current.toFixed(2).split('.')[1]} Cents
            </p>
            <p className="text-2xl font-bold text-blue-700">{formatCurrency(data.net_pay_current)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
