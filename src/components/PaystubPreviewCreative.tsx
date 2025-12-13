import { Paystub } from '../lib/supabase';

interface PaystubPreviewCreativeProps {
  paystub: Paystub;
}

export default function PaystubPreviewCreative({ paystub }: PaystubPreviewCreativeProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 shadow-2xl overflow-hidden max-w-4xl mx-auto rounded-3xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 px-10 py-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -ml-20 -mt-20"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full -mr-30 -mb-30"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white rounded-full"></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-5">
              <div className="bg-white p-4 rounded-2xl shadow-2xl transform rotate-6 hover:rotate-0 transition-transform">
                <svg className="w-12 h-12 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-black text-white drop-shadow-2xl tracking-tight">{paystub.school_name.toUpperCase()}</h1>
                <p className="text-pink-100 text-base mt-2 font-bold">Creative Compensation Statement</p>
              </div>
            </div>
            <div className="bg-white/30 backdrop-blur-lg px-6 py-4 rounded-2xl border-2 border-white/50 shadow-2xl">
              <p className="text-xs text-white font-extrabold uppercase tracking-widest">Pay Date</p>
              <p className="text-xl font-black text-white mt-1">{formatDate(paystub.pay_date)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-10 py-8">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl shadow-lg mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-8 bg-white rounded-full"></div>
            <h2 className="text-2xl font-black">Team Member</h2>
          </div>
          <p className="text-3xl font-black">{paystub.employee_name}</p>
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/30">
            <div>
              <p className="text-xs text-purple-200 font-bold uppercase mb-1">Role</p>
              <p className="text-sm font-bold">{paystub.position}</p>
            </div>
            <div>
              <p className="text-xs text-purple-200 font-bold uppercase mb-1">ID</p>
              <p className="text-sm font-bold">{paystub.file_number || paystub.employee_ssn.slice(-4)}</p>
            </div>
            <div>
              <p className="text-xs text-purple-200 font-bold uppercase mb-1">Since</p>
              <p className="text-sm font-bold">{formatDate(paystub.hire_date)}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-pink-100 to-orange-100 p-6 rounded-2xl shadow-md border-2 border-pink-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-6 bg-pink-500 rounded-full"></div>
              <h3 className="text-lg font-black text-slate-900">Pay Period</h3>
            </div>
            <p className="text-base font-bold text-slate-700">{formatDate(paystub.period_start)}</p>
            <p className="text-base font-bold text-slate-700">to {formatDate(paystub.period_end)}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-2xl shadow-md border-2 border-purple-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-6 bg-purple-500 rounded-full"></div>
              <h3 className="text-lg font-black text-slate-900">Check Details</h3>
            </div>
            <p className="text-sm text-slate-600 mb-1">Check Number</p>
            <p className="text-lg font-bold text-slate-900">{paystub.check_number}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-2xl shadow-lg border-2 border-green-300 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-8 bg-green-600 rounded-full"></div>
            <h2 className="text-2xl font-black text-slate-900">Earnings</h2>
          </div>
          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase">Type</th>
                  <th className="text-right py-3 px-4 text-xs font-bold uppercase">Current</th>
                  <th className="text-right py-3 px-4 text-xs font-bold uppercase">YTD</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 text-sm font-bold">Regular Earnings</td>
                  <td className="py-3 px-4 text-sm text-right font-bold text-green-700">${paystub.gross_pay_current.toFixed(2)}</td>
                  <td className="py-3 px-4 text-sm text-right font-bold text-green-700">${paystub.gross_pay_ytd.toFixed(2)}</td>
                </tr>
                <tr className="bg-green-100">
                  <td className="py-3 px-4 text-base font-black">TOTAL GROSS</td>
                  <td className="py-3 px-4 text-lg text-right font-black text-green-700">${paystub.gross_pay_current.toFixed(2)}</td>
                  <td className="py-3 px-4 text-lg text-right font-black text-green-700">${paystub.gross_pay_ytd.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-100 to-red-100 p-6 rounded-2xl shadow-lg border-2 border-orange-300 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-8 bg-orange-600 rounded-full"></div>
            <h2 className="text-2xl font-black text-slate-900">Deductions</h2>
          </div>
          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase">Type</th>
                  <th className="text-right py-3 px-4 text-xs font-bold uppercase">Current</th>
                  <th className="text-right py-3 px-4 text-xs font-bold uppercase">YTD</th>
                </tr>
              </thead>
              <tbody>
                {paystub.deductions.map((deduction, index) => (
                  <tr key={index} className="border-b border-slate-50 hover:bg-orange-50">
                    <td className="py-2 px-4 text-xs font-medium">{deduction.description}</td>
                    <td className="py-2 px-4 text-xs text-right font-semibold">{deduction.current}</td>
                    <td className="py-2 px-4 text-xs text-right font-semibold">{deduction.ytd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 px-10 py-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -mr-20 -mt-20"></div>
        </div>
        <div className="relative z-10 text-center">
          <p className="text-sm uppercase tracking-widest text-pink-200 font-extrabold mb-3">Your Take-Home Pay</p>
          <p className="text-6xl font-black text-white drop-shadow-2xl mb-2">${paystub.net_pay_current.toFixed(2)}</p>
          <p className="text-base text-pink-100 font-bold">YTD Total: ${paystub.net_pay_ytd.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-900 to-pink-900 text-center px-8 py-5">
        <p className="text-sm text-purple-200 font-bold">
          Official payroll document • {paystub.school_name}
        </p>
      </div>
    </div>
  );
}
