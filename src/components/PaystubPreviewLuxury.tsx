import { Paystub } from '../lib/supabase';

interface PaystubPreviewProps {
  data: Paystub;
}

export default function PaystubPreviewLuxury({ data }: PaystubPreviewProps) {
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
    <div id="paystub-preview" className="bg-slate-100 p-12 min-h-[1100px]">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl">
        <div className="border-8 border-double border-slate-800">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent"></div>
            </div>
            <div className="relative z-10 text-center mb-8">
              <div className="inline-block border-4 border-double border-slate-400 px-12 py-6 mb-6">
                <h1 className="text-5xl font-serif font-bold tracking-wider mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  {data.school_name}
                </h1>
                <div className="h-1 w-32 bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto my-4"></div>
                <p className="text-slate-300 text-sm tracking-widest uppercase">{data.school_location}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 relative z-10">
              <div className="text-center border border-slate-600 py-4 bg-slate-800 bg-opacity-50">
                <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">School Code</p>
                <p className="text-lg font-semibold font-mono">{data.school_code}</p>
              </div>
              <div className="text-center border border-slate-600 py-4 bg-slate-800 bg-opacity-50">
                <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Statement Number</p>
                <p className="text-lg font-semibold font-mono">{data.check_number}</p>
              </div>
              <div className="text-center border border-slate-600 py-4 bg-slate-800 bg-opacity-50">
                <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Employer EIN</p>
                <p className="text-lg font-semibold font-mono">{data.employer_ein}</p>
              </div>
            </div>
          </div>

          <div className="p-12 bg-gradient-to-b from-white to-slate-50">
            <div className="text-center mb-10">
              <div className="inline-block border-b-4 border-double border-slate-800 pb-2">
                <h2 className="text-3xl font-serif font-bold" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  Earnings Statement
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 mb-12">
              <div className="border-2 border-slate-800 p-8 bg-white">
                <div className="border-b-2 border-slate-300 pb-3 mb-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800">Employee Details</h3>
                </div>
                <div className="space-y-5">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Name</p>
                    <p className="font-serif font-bold text-slate-900 text-2xl" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                      {data.employee_name}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">SSN</p>
                      <p className="font-mono text-sm font-bold text-slate-900">{data.employee_ssn}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">File Number</p>
                      <p className="font-mono text-sm font-bold text-slate-900">{data.file_number}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Position</p>
                    <p className="font-semibold text-slate-900 text-lg">{data.position}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Date of Hire</p>
                    <p className="text-sm text-slate-700">{formatDate(data.hire_date)}</p>
                  </div>
                </div>
              </div>

              <div className="border-2 border-slate-800 p-8 bg-white">
                <div className="border-b-2 border-slate-300 pb-3 mb-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800">Payroll Period</h3>
                </div>
                <div className="space-y-5">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Payment Date</p>
                    <p className="font-serif font-bold text-slate-900 text-2xl" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                      {formatDate(data.pay_date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Period Covered</p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      From: {formatDate(data.period_start)}
                      <br />
                      To: {formatDate(data.period_end)}
                    </p>
                  </div>
                  <div className="border-t-2 border-slate-300 pt-4">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Base Compensation</p>
                    <p className="font-serif font-bold text-slate-900 text-3xl" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                      {formatCurrency(data.salary_rate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-4 border-double border-slate-800 mb-10">
              <div className="bg-slate-800 text-white px-8 py-5 text-center">
                <h3 className="text-2xl font-serif font-bold tracking-wide" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  Gross Earnings
                </h3>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-100 border-b-2 border-slate-800">
                    <th className="text-left px-8 py-5 text-xs font-bold text-slate-800 uppercase tracking-widest">Description</th>
                    <th className="text-right px-8 py-5 text-xs font-bold text-slate-800 uppercase tracking-widest">Current Period</th>
                    <th className="text-right px-8 py-5 text-xs font-bold text-slate-800 uppercase tracking-widest">Year to Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b-2 border-slate-800">
                    <td className="px-8 py-6 font-bold text-slate-900 text-lg">Total Gross Pay</td>
                    <td className="px-8 py-6 text-right font-bold text-slate-900 text-xl">{formatCurrency(data.gross_pay_current)}</td>
                    <td className="px-8 py-6 text-right font-bold text-slate-900 text-xl">{formatCurrency(data.gross_pay_ytd)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="border-4 border-double border-slate-800 mb-10">
              <div className="bg-slate-800 text-white px-8 py-5 text-center">
                <h3 className="text-2xl font-serif font-bold tracking-wide" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  Deductions & Withholdings
                </h3>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-100 border-b-2 border-slate-800">
                    <th className="text-left px-8 py-5 text-xs font-bold text-slate-800 uppercase tracking-widest">Category</th>
                    <th className="text-right px-8 py-5 text-xs font-bold text-slate-800 uppercase tracking-widest">Current Period</th>
                    <th className="text-right px-8 py-5 text-xs font-bold text-slate-800 uppercase tracking-widest">Year to Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.deductions.map((deduction, index) => (
                    <tr key={index} className="border-b border-slate-300 bg-white">
                      <td className="px-8 py-4 text-sm text-slate-900 font-medium">{deduction.description}</td>
                      <td className="px-8 py-4 text-right text-sm text-slate-900 font-mono">{deduction.current}</td>
                      <td className="px-8 py-4 text-right text-sm text-slate-900 font-mono">{deduction.ytd}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-200 font-bold border-t-2 border-slate-800">
                    <td className="px-8 py-6 text-slate-900 text-lg">Total Deductions</td>
                    <td className="px-8 py-6 text-right text-slate-900 text-xl">{formatCurrency(data.total_deductions_current)}</td>
                    <td className="px-8 py-6 text-right text-slate-900 text-xl">{formatCurrency(data.total_deductions_ytd)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="border-8 border-double border-slate-900 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-12 mb-10">
              <div className="text-center mb-6">
                <p className="text-sm uppercase tracking-widest text-slate-400 mb-2 font-semibold">Net Compensation</p>
                <div className="h-1 w-48 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-6"></div>
              </div>
              <div className="grid grid-cols-2 gap-12">
                <div className="text-center border-r-2 border-slate-600">
                  <p className="text-slate-300 text-xs uppercase tracking-widest mb-3 font-semibold">Current Period</p>
                  <p className="text-6xl font-serif font-bold" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                    {formatCurrency(data.net_pay_current)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-slate-300 text-xs uppercase tracking-widest mb-3 font-semibold">Year to Date Total</p>
                  <p className="text-5xl font-serif font-bold" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                    {formatCurrency(data.net_pay_ytd)}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-2 border-slate-800 p-8 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Remittance Method</p>
                  <p className="text-base font-bold text-slate-900">{data.payment_method}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Disbursement Date</p>
                  <p className="text-base font-bold text-slate-900">{formatDate(data.pay_date)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-center p-8">
            <div className="max-w-2xl mx-auto">
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                This earnings statement is provided for your records and constitutes official documentation
                of compensation and withholdings for the period indicated.
              </p>
              <p className="text-slate-400 text-xs">
                Please direct all inquiries to the Office of Human Resources and Payroll Administration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
