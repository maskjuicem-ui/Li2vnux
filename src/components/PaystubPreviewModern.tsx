import { FileText, Building2, User, Calendar, DollarSign, CreditCard, Award, TrendingUp } from 'lucide-react';
import { Paystub } from '../lib/supabase';

interface PaystubPreviewModernProps {
  paystub: Paystub;
}

export default function PaystubPreviewModern({ paystub }: PaystubPreviewModernProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  return (
    <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-slate-200" style={{ fontSize: '13px' }}>
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-700 text-white px-4 py-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="bg-white p-2 rounded-lg shadow-lg border-2 border-white/30">
                <Building2 className="w-6 h-6 text-blue-700" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight drop-shadow-md">{paystub.school_name.toUpperCase()}</h1>
                <p className="text-blue-50 text-xs mt-1 font-semibold">Official Payroll Statement</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/20 shadow-lg">
              <p className="text-xs text-blue-200 font-bold uppercase tracking-wider">Pay Date</p>
              <p className="text-sm font-extrabold mt-0.5">{formatDate(paystub.pay_date)}</p>
            </div>
          </div>
          <p className="text-blue-100 text-xs font-medium">{paystub.school_location}</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-4 py-3 border-b border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm border border-slate-100">
            <div className="bg-blue-100 p-1.5 rounded-lg">
              <CreditCard className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Check Number</p>
              <p className="text-sm font-bold text-slate-900">{paystub.check_number}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-br from-cyan-50 to-blue-50 p-2 rounded-lg shadow-md border-2 border-cyan-200">
            <div className="bg-cyan-600 p-1.5 rounded-lg shadow-md">
              <Calendar className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-xs text-cyan-700 font-bold uppercase tracking-wider">Pay Date</p>
              <p className="text-sm font-extrabold text-slate-900">{formatDate(paystub.pay_date)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm border border-slate-100">
            <div className="bg-teal-100 p-1.5 rounded-lg">
              <Calendar className="w-4 h-4 text-teal-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Period</p>
              <p className="text-xs font-bold text-slate-900">
                {formatDate(paystub.period_start)} - {formatDate(paystub.period_end)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 grid md:grid-cols-2 gap-3 border-b border-slate-200">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <h2 className="font-bold text-sm text-slate-900">School Information</h2>
          </div>
          <div className="space-y-2 text-xs">
            <div className="bg-white p-2 rounded-lg">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wide block mb-0.5">School Name</span>
              <p className="font-bold text-slate-900">{paystub.school_name}</p>
            </div>
            <div className="bg-white p-2 rounded-lg">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wide block mb-0.5">Location</span>
              <p className="text-slate-700">{paystub.school_location}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-2 rounded-lg">
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wide block mb-0.5">School Code</span>
                <p className="text-slate-700 font-medium">{paystub.school_code}</p>
              </div>
              <div className="bg-white p-2 rounded-lg">
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wide block mb-0.5">EIN</span>
                <p className="text-slate-700 font-medium">{paystub.employer_ein}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-3 rounded-lg border border-teal-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-teal-600 p-1.5 rounded-lg shadow-md">
              <User className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <h2 className="font-extrabold text-sm text-slate-900">Employee Information</h2>
          </div>
          <div className="space-y-2 text-xs">
            <div className="bg-teal-50 border-l-4 border-teal-600 p-2 rounded-r-lg shadow-sm">
              <span className="text-xs text-teal-700 font-bold uppercase tracking-wider block mb-0.5">Employee Name</span>
              <p className="text-sm font-extrabold text-slate-900 leading-tight">{paystub.employee_name}</p>
            </div>
            <div className="bg-white p-2 rounded-lg">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wide block mb-0.5">Position</span>
              <p className="text-slate-700">{paystub.position}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-2 rounded-lg">
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wide block mb-0.5">SSN</span>
                <p className="text-slate-700 font-medium">{paystub.employee_ssn}</p>
              </div>
              <div className="bg-white p-2 rounded-lg">
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wide block mb-0.5">File #</span>
                <p className="text-slate-700 font-medium">{paystub.file_number}</p>
              </div>
            </div>
            <div className="bg-white p-2 rounded-lg">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wide block mb-0.5">Hire Date</span>
              <p className="text-slate-700 font-medium">{formatDate(paystub.hire_date)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 border-b border-slate-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-green-600 p-1.5 rounded-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">EARNINGS</h2>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <th className="text-left py-2 px-2 text-xs font-bold uppercase tracking-wider">Description</th>
                <th className="text-right py-2 px-2 text-xs font-bold uppercase tracking-wider">Rate</th>
                <th className="text-right py-2 px-2 text-xs font-bold uppercase tracking-wider">Current</th>
                <th className="text-right py-2 px-2 text-xs font-bold uppercase tracking-wider">YTD</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 hover:bg-green-50 transition-colors">
                <td className="py-2 px-2 text-xs text-slate-700 font-medium">Regular Salary Semi-Monthly</td>
                <td className="py-2 px-2 text-xs text-slate-900 text-right font-semibold">${paystub.salary_rate.toFixed(2)}</td>
                <td className="py-2 px-2 text-xs text-slate-900 text-right font-semibold">${paystub.gross_pay_current.toFixed(2)}</td>
                <td className="py-2 px-2 text-xs text-slate-900 text-right font-semibold">${paystub.gross_pay_ytd.toFixed(2)}</td>
              </tr>
              <tr className="bg-gradient-to-r from-green-100 to-emerald-100">
                <td className="py-2 px-2 text-sm font-bold text-slate-900 uppercase">Gross Pay:</td>
                <td className="py-2 px-2 text-xs text-slate-900 text-right"></td>
                <td className="py-2 px-2 text-sm font-bold text-green-700 text-right">${paystub.gross_pay_current.toFixed(2)}</td>
                <td className="py-2 px-2 text-sm font-bold text-green-700 text-right">${paystub.gross_pay_ytd.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-4 py-4 border-b border-slate-200 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-orange-600 p-1.5 rounded-lg">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">DEDUCTIONS & WITHHOLDINGS</h2>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-orange-100 overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                <th className="text-left py-2 px-2 text-xs font-bold uppercase tracking-wider">Description</th>
                <th className="text-right py-2 px-2 text-xs font-bold uppercase tracking-wider">Current</th>
                <th className="text-right py-2 px-2 text-xs font-bold uppercase tracking-wider">YTD</th>
              </tr>
            </thead>
            <tbody>
              {paystub.deductions.map((item, index) => (
                <tr key={index} className="border-b border-slate-100 hover:bg-orange-50 transition-colors">
                  <td className="py-2 px-2 text-xs text-slate-700 font-medium">{item.description}</td>
                  <td className="py-2 px-2 text-xs text-slate-900 text-right font-semibold">{item.current}</td>
                  <td className="py-2 px-2 text-xs text-slate-900 text-right font-semibold">{item.ytd}</td>
                </tr>
              ))}
              <tr className="bg-gradient-to-r from-red-100 to-orange-100">
                <td className="py-2 px-2 text-sm font-bold text-slate-900 uppercase">Total Deductions:</td>
                <td className="py-2 px-2 text-sm font-bold text-red-700 text-right">${paystub.total_deductions_current.toFixed(2)}</td>
                <td className="py-2 px-2 text-sm font-bold text-red-700 text-right">${paystub.total_deductions_ytd.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-4 py-4 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 border-b border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-0.5">NET PAY</h2>
                  <p className="text-xs text-emerald-100 font-medium">{paystub.payment_method}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/30">
              <p className="text-xs text-emerald-100 font-semibold uppercase tracking-wider mb-1">Current Period</p>
              <p className="text-3xl font-bold text-white mb-1">${paystub.net_pay_current.toFixed(2)}</p>
              <div className="flex items-center gap-1 text-emerald-100">
                <TrendingUp className="w-3 h-3" />
                <p className="text-xs font-medium">YTD: ${paystub.net_pay_ytd.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 bg-gradient-to-r from-slate-50 to-slate-100 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs text-slate-700 mb-2 font-medium">For payroll inquiries, contact your school payroll office or district payroll administrator</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-px bg-slate-300 flex-1"></div>
            <p className="text-xs text-slate-500 font-medium px-4">This statement is for informational purposes. Keep for your records.</p>
            <div className="h-px bg-slate-300 flex-1"></div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-center px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs text-slate-300 leading-relaxed font-semibold mb-1">
            This is an official payroll document issued by {paystub.school_name}.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed italic">
            This document serves as proof of employment and compensation. For questions, contact the Payroll Department.
          </p>
          <div className="border-t border-slate-700 pt-2 mt-2">
            <p className="text-xs text-slate-500">
              Document Generated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
