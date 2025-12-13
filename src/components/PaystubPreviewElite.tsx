import { Paystub } from '../lib/supabase';

interface PaystubPreviewProps {
  data: Paystub;
}

export default function PaystubPreviewElite({ data }: PaystubPreviewProps) {
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
    <div id="paystub-preview" className="bg-white p-12 min-h-[1100px] font-sans">
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-white to-slate-50 shadow-2xl rounded-xl overflow-hidden border border-slate-200">
        <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-10 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-10"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-3 tracking-tight">{data.school_name}</h1>
                <p className="text-slate-300 text-sm leading-relaxed">{data.school_location}</p>
              </div>
              <div className="text-right">
                <div className="bg-white bg-opacity-10 backdrop-blur-md px-8 py-4 rounded-xl border border-white border-opacity-20 shadow-xl">
                  <p className="text-xs text-slate-300 uppercase tracking-widest mb-1">Statement #</p>
                  <p className="text-3xl font-bold">{data.check_number}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white bg-opacity-10 backdrop-blur-md px-6 py-4 rounded-lg border border-white border-opacity-20">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">School Code</p>
                <p className="text-lg font-semibold">{data.school_code}</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-md px-6 py-4 rounded-lg border border-white border-opacity-20">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Employer EIN</p>
                <p className="text-lg font-semibold font-mono">{data.employer_ein}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-10">
          <div className="grid grid-cols-2 gap-8 mb-10">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-md border border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider">Employee</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-blue-600 font-semibold mb-1">Full Name</p>
                  <p className="font-bold text-slate-900 text-xl">{data.employee_name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-blue-600 font-semibold mb-1">SSN</p>
                    <p className="font-mono text-sm font-semibold text-slate-900">{data.employee_ssn}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 font-semibold mb-1">File No.</p>
                    <p className="font-mono text-sm font-semibold text-slate-900">{data.file_number}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-blue-600 font-semibold mb-1">Position</p>
                  <p className="font-semibold text-slate-900">{data.position}</p>
                </div>
                <div>
                  <p className="text-xs text-blue-600 font-semibold mb-1">Hire Date</p>
                  <p className="text-sm text-slate-700">{formatDate(data.hire_date)}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl shadow-md border border-emerald-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-wider">Pay Period</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-emerald-600 font-semibold mb-1">Pay Date</p>
                  <p className="font-bold text-slate-900 text-xl">{formatDate(data.pay_date)}</p>
                </div>
                <div>
                  <p className="text-xs text-emerald-600 font-semibold mb-1">Period Range</p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {formatDate(data.period_start)}
                    <br />
                    to {formatDate(data.period_end)}
                  </p>
                </div>
                <div className="pt-2 border-t border-emerald-200">
                  <p className="text-xs text-emerald-600 font-semibold mb-1">Base Salary Rate</p>
                  <p className="font-bold text-slate-900 text-2xl">{formatCurrency(data.salary_rate)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-t-2xl shadow-lg">
              <h3 className="font-bold text-xl tracking-wide">Compensation Summary</h3>
            </div>
            <div className="bg-white shadow-xl rounded-b-2xl overflow-hidden border-x border-b border-slate-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-300">
                    <th className="text-left px-8 py-5 text-xs font-bold text-slate-700 uppercase tracking-wider">Description</th>
                    <th className="text-right px-8 py-5 text-xs font-bold text-slate-700 uppercase tracking-wider">Current Period</th>
                    <th className="text-right px-8 py-5 text-xs font-bold text-slate-700 uppercase tracking-wider">Year to Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200 bg-blue-50">
                    <td className="px-8 py-5 font-bold text-slate-900 text-lg">Gross Earnings</td>
                    <td className="px-8 py-5 text-right font-bold text-blue-700 text-lg">{formatCurrency(data.gross_pay_current)}</td>
                    <td className="px-8 py-5 text-right font-bold text-blue-700 text-lg">{formatCurrency(data.gross_pay_ytd)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-8 py-4 rounded-t-2xl shadow-lg">
              <h3 className="font-bold text-xl tracking-wide">Withholdings & Deductions</h3>
            </div>
            <div className="bg-white shadow-xl rounded-b-2xl overflow-hidden border-x border-b border-slate-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-300">
                    <th className="text-left px-8 py-5 text-xs font-bold text-slate-700 uppercase tracking-wider">Item</th>
                    <th className="text-right px-8 py-5 text-xs font-bold text-slate-700 uppercase tracking-wider">Current Period</th>
                    <th className="text-right px-8 py-5 text-xs font-bold text-slate-700 uppercase tracking-wider">Year to Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.deductions.map((deduction, index) => (
                    <tr key={index} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                      <td className="px-8 py-4 text-sm text-slate-900 font-medium">{deduction.description}</td>
                      <td className="px-8 py-4 text-right text-sm text-slate-900 font-mono">{deduction.current}</td>
                      <td className="px-8 py-4 text-right text-sm text-slate-900 font-mono">{deduction.ytd}</td>
                    </tr>
                  ))}
                  <tr className="bg-gradient-to-r from-red-50 to-rose-50 font-bold border-t-2 border-red-300">
                    <td className="px-8 py-5 text-slate-900 text-lg">Total Deductions</td>
                    <td className="px-8 py-5 text-right text-red-700 text-lg">{formatCurrency(data.total_deductions_current)}</td>
                    <td className="px-8 py-5 text-right text-red-700 text-lg">{formatCurrency(data.total_deductions_ytd)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 text-white p-10 rounded-3xl shadow-2xl mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full filter blur-3xl opacity-10"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-emerald-100 text-sm uppercase tracking-widest mb-2 font-semibold">Current Net Pay</p>
                  <p className="text-6xl font-bold">{formatCurrency(data.net_pay_current)}</p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-100 text-sm uppercase tracking-widest mb-2 font-semibold">Year to Date Net</p>
                  <p className="text-5xl font-bold">{formatCurrency(data.net_pay_ytd)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl shadow-md border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold mb-1">Payment Method</p>
                  <p className="text-base font-bold text-slate-900">{data.payment_method}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 font-semibold mb-1">Payment Date</p>
                <p className="text-base font-bold text-slate-900">{formatDate(data.pay_date)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8 text-center">
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl mx-auto">
            This document constitutes an official earnings statement. Please retain for tax and record-keeping purposes.
            <br />
            <span className="text-slate-400 text-xs">For inquiries, contact Human Resources or Payroll Services Department.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
