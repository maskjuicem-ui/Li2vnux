import { Paystub } from '../lib/supabase';

interface PaystubPreviewTechProps {
  paystub: Paystub;
}

export default function PaystubPreviewTech({ paystub }: PaystubPreviewTechProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 shadow-lg overflow-hidden" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-5">
        <div className="flex justify-between items-center text-white">
          <div>
            <h1 className="text-2xl font-bold">{paystub.school_name}</h1>
            <p className="text-sm text-blue-100 mt-1">{paystub.school_location}</p>
          </div>
          <div className="text-right bg-white text-blue-900 px-4 py-3 rounded-lg shadow">
            <p className="text-xs font-semibold text-blue-600">PAY STUB</p>
            <p className="text-sm font-bold">{formatDate(paystub.pay_date)}</p>
          </div>
        </div>
      </div>

      <div className="px-8 py-4 bg-white shadow-sm">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-blue-600 font-semibold mb-1">EMPLOYEE</p>
            <p className="text-sm font-bold text-slate-900">{paystub.employee_name}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-blue-600 font-semibold mb-1">ID</p>
            <p className="text-sm font-bold text-slate-900">{paystub.file_number || 'E' + paystub.employee_ssn.slice(-6)}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-blue-600 font-semibold mb-1">POSITION</p>
            <p className="text-sm font-bold text-slate-900">{paystub.position}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-blue-600 font-semibold mb-1">CHECK #</p>
            <p className="text-sm font-bold text-slate-900">{paystub.check_number}</p>
          </div>
        </div>
      </div>

      <div className="px-8 py-5">
        <div className="bg-white rounded-lg shadow-sm p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <span className="w-1 h-5 bg-blue-600 rounded"></span>
              EARNINGS
            </h3>
            <p className="text-xs text-slate-500">Period: {formatDate(paystub.period_start)} - {formatDate(paystub.period_end)}</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-sm text-slate-600">Base Salary</span>
              <div className="flex gap-8">
                <span className="text-sm font-semibold text-slate-900 w-24 text-right">${paystub.gross_pay_current.toFixed(2)}</span>
                <span className="text-sm text-slate-500 w-24 text-right">${paystub.gross_pay_ytd.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between items-center py-2 bg-blue-50 rounded px-2 font-bold">
              <span className="text-sm text-slate-900">Total Gross</span>
              <div className="flex gap-8">
                <span className="text-sm text-blue-700 w-24 text-right">${paystub.gross_pay_current.toFixed(2)}</span>
                <span className="text-sm text-blue-600 w-24 text-right">${paystub.gross_pay_ytd.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <span className="w-1 h-5 bg-red-500 rounded"></span>
              DEDUCTIONS
            </h3>
            <div className="flex gap-8 text-xs text-slate-500">
              <span className="w-24 text-right">Current</span>
              <span className="w-24 text-right">YTD</span>
            </div>
          </div>
          <div className="space-y-2">
            {paystub.deductions.length > 0 ? (
              paystub.deductions.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">{item.description}</span>
                  <div className="flex gap-8">
                    <span className="text-sm text-slate-900 w-24 text-right">{item.current}</span>
                    <span className="text-sm text-slate-500 w-24 text-right">{item.ytd}</span>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">Federal Tax</span>
                  <div className="flex gap-8">
                    <span className="text-sm text-slate-900 w-24 text-right">${(paystub.gross_pay_current * 0.12).toFixed(2)}</span>
                    <span className="text-sm text-slate-500 w-24 text-right">${(paystub.gross_pay_ytd * 0.12).toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">State Tax</span>
                  <div className="flex gap-8">
                    <span className="text-sm text-slate-900 w-24 text-right">${(paystub.gross_pay_current * 0.05).toFixed(2)}</span>
                    <span className="text-sm text-slate-500 w-24 text-right">${(paystub.gross_pay_ytd * 0.05).toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">FICA (SS + Medicare)</span>
                  <div className="flex gap-8">
                    <span className="text-sm text-slate-900 w-24 text-right">${(paystub.gross_pay_current * 0.0765).toFixed(2)}</span>
                    <span className="text-sm text-slate-500 w-24 text-right">${(paystub.gross_pay_ytd * 0.0765).toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
            <div className="flex justify-between items-center py-2 bg-red-50 rounded px-2 font-bold">
              <span className="text-sm text-slate-900">Total Deductions</span>
              <div className="flex gap-8">
                <span className="text-sm text-red-700 w-24 text-right">${paystub.total_deductions_current.toFixed(2)}</span>
                <span className="text-sm text-red-600 w-24 text-right">${paystub.total_deductions_ytd.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-5 bg-gradient-to-r from-green-600 to-green-700">
        <div className="bg-white rounded-lg shadow-lg p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-green-600 font-semibold mb-1">NET PAY</p>
              <p className="text-3xl font-bold text-green-700">${paystub.net_pay_current.toFixed(2)}</p>
              <p className="text-xs text-slate-500 mt-1">YTD: ${paystub.net_pay_ytd.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-600 font-semibold mb-1">PAYMENT METHOD</p>
              <p className="text-sm text-slate-900">{paystub.payment_method || 'Direct Deposit'}</p>
              <p className="text-xs text-slate-500 mt-1">SSN: ***-**-{paystub.employee_ssn.slice(-4)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-3 bg-slate-100 text-center border-t">
        <p className="text-xs text-slate-600">Employer ID: {paystub.employer_ein} | Hire Date: {formatDate(paystub.hire_date)}</p>
      </div>
    </div>
  );
}
