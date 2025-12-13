import { GraduationCap } from 'lucide-react';
import { Paystub } from '../lib/supabase';

interface PaystubPreviewBeavertonProps {
  paystub: Paystub;
}

export default function PaystubPreviewBeaverton({ paystub }: PaystubPreviewBeavertonProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  const taxDeductions = paystub.deductions.filter(d =>
    d.description.toLowerCase().includes('federal') ||
    d.description.toLowerCase().includes('medicare') ||
    d.description.toLowerCase().includes('oasdi') ||
    d.description.toLowerCase().includes('state') ||
    d.description.toLowerCase().includes('tax') ||
    d.description.toLowerCase().includes('security')
  );

  const otherDeductions = paystub.deductions.filter(d =>
    !d.description.toLowerCase().includes('federal') &&
    !d.description.toLowerCase().includes('medicare') &&
    !d.description.toLowerCase().includes('oasdi') &&
    !d.description.toLowerCase().includes('state') &&
    !d.description.toLowerCase().includes('tax') &&
    !d.description.toLowerCase().includes('security')
  );

  const calculateTotalTax = () => {
    return taxDeductions.reduce((sum, d) => {
      const value = parseFloat(d.current.replace(/[$,]/g, ''));
      return sum + (isNaN(value) ? 0 : value);
    }, 0);
  };

  const calculateTotalTaxYTD = () => {
    return taxDeductions.reduce((sum, d) => {
      const value = parseFloat(d.ytd.replace(/[$,]/g, ''));
      return sum + (isNaN(value) ? 0 : value);
    }, 0);
  };

  const calculateOtherDeductions = () => {
    return otherDeductions.reduce((sum, d) => {
      const value = parseFloat(d.current.replace(/[$,]/g, ''));
      return sum + (isNaN(value) ? 0 : value);
    }, 0);
  };

  const calculateOtherDeductionsYTD = () => {
    return otherDeductions.reduce((sum, d) => {
      const value = parseFloat(d.ytd.replace(/[$,]/g, ''));
      return sum + (isNaN(value) ? 0 : value);
    }, 0);
  };

  const employeeId = paystub.file_number || `E${paystub.employee_ssn.replace(/[^0-9]/g, '').slice(-5)}`;
  const location = paystub.position;

  const addressParts = paystub.school_location.split(',');
  const street = addressParts[0]?.trim() || '';
  const cityState = addressParts.slice(1).join(',').trim() || '';

  return (
    <div className="bg-white max-w-4xl mx-auto rounded-lg shadow-xl overflow-hidden" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontSize: '13px' }}>
      <div className="border border-slate-200">
        <div className="p-10 border-b border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-5">
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-3.5 rounded-xl shadow-sm">
                <GraduationCap className="w-9 h-9 text-slate-700" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight leading-tight">{paystub.school_name}</h1>
                <p className="text-sm text-slate-600 leading-relaxed">{paystub.school_location}</p>
              </div>
            </div>
            <div className="text-right bg-white px-6 py-4 rounded-xl border border-slate-200 shadow-md">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2 font-semibold">Advice of Deposit</p>
              <p className="text-base text-slate-900 font-bold tracking-wide">NO. {paystub.check_number}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white px-7 py-4 font-semibold text-[11px] uppercase tracking-[0.15em]">
            Employee Information
          </div>
          <div className="bg-gradient-to-bl from-slate-800 via-slate-900 to-slate-800 text-white px-7 py-4 font-semibold text-[11px] uppercase tracking-[0.15em] border-l border-slate-700/50">
            Pay Period Detail
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-slate-200">
          <div className="px-8 py-7 border-r border-slate-200 bg-slate-50/40">
            <p className="font-bold text-base mb-3 text-slate-900 tracking-wide leading-tight">{paystub.employee_name.toUpperCase()}</p>
            <p className="text-sm text-slate-600 leading-relaxed mb-1">{street}</p>
            <p className="text-sm text-slate-600 leading-relaxed mb-5">{cityState}</p>
            <div className="flex items-center gap-5 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Employee ID:</span>
                <span className="text-slate-900 font-mono font-medium">{employeeId}</span>
              </div>
              <div className="w-px h-5 bg-slate-300"></div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Location:</span>
                <span className="text-slate-900 font-medium">{location}</span>
              </div>
            </div>
          </div>
          <div className="px-8 py-7 bg-white">
            <div className="space-y-4">
              <div className="flex items-center text-sm">
                <span className="font-semibold text-slate-700 w-24">Period Begin:</span>
                <span className="text-slate-900 font-medium flex-1">{formatDate(paystub.period_start)}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="font-semibold text-slate-700 w-24">Period End:</span>
                <span className="text-slate-900 font-medium flex-1">{formatDate(paystub.period_end)}</span>
              </div>
              <div className="h-px bg-slate-200 my-3"></div>
              <div className="flex items-center text-sm">
                <span className="font-semibold text-slate-700 w-24">Pay Date:</span>
                <span className="text-slate-900 font-medium flex-1">{formatDate(paystub.pay_date)}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="font-semibold text-slate-700 w-24">Frequency:</span>
                <span className="text-slate-900 font-medium flex-1">Monthly</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white px-7 py-4 font-semibold text-[11px] uppercase tracking-[0.15em]">
          Earnings and Compensation
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-y border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
              <th className="text-left px-7 py-4 font-semibold text-slate-700 uppercase text-[11px] tracking-[0.12em]">Description</th>
              <th className="text-right px-7 py-4 font-semibold text-slate-700 uppercase text-[11px] tracking-[0.12em] w-28">Rate</th>
              <th className="text-right px-7 py-4 font-semibold text-slate-700 uppercase text-[11px] tracking-[0.12em] w-36">Current</th>
              <th className="text-right px-7 py-4 font-semibold text-slate-700 uppercase text-[11px] tracking-[0.12em] w-36">YTD</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-150 bg-white hover:bg-slate-50/50 transition-colors">
              <td className="px-7 py-4 text-slate-800 uppercase text-xs font-medium tracking-wide">Regular Salary</td>
              <td className="text-right px-7 py-4 text-slate-600 tabular-nums">${paystub.salary_rate.toFixed(2)}</td>
              <td className="text-right px-7 py-4 text-slate-900 font-semibold tabular-nums">${paystub.gross_pay_current.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td className="text-right px-7 py-4 text-slate-600 tabular-nums">${paystub.gross_pay_ytd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
            <tr className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white font-semibold">
              <td className="px-7 py-5 uppercase text-xs tracking-[0.12em]">Gross Earnings</td>
              <td className="text-right px-7 py-5"></td>
              <td className="text-right px-7 py-5 text-base font-bold tabular-nums">${paystub.gross_pay_current.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td className="text-right px-7 py-5 tabular-nums">${paystub.gross_pay_ytd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
          </tbody>
        </table>

        <div className="grid grid-cols-2 border-t border-slate-200">
          <div className="border-r border-slate-200">
            <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white px-7 py-4 font-semibold text-[11px] uppercase tracking-[0.15em]">
              Tax Withholding
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-y border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
                  <th className="text-left px-6 py-3.5 font-semibold text-slate-700 uppercase text-[11px] tracking-[0.12em]">Tax</th>
                  <th className="text-right px-6 py-3.5 font-semibold text-slate-700 uppercase text-[11px] tracking-[0.12em] w-32">Current</th>
                  <th className="text-right px-6 py-3.5 font-semibold text-slate-700 uppercase text-[11px] tracking-[0.12em] w-32">YTD</th>
                </tr>
              </thead>
              <tbody>
                {taxDeductions.map((item, index) => (
                  <tr key={index} className="border-b border-slate-100 bg-white hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3.5 text-slate-800 uppercase text-xs tracking-wide">{item.description}</td>
                    <td className="text-right px-6 py-3.5 text-slate-700 tabular-nums">${parseFloat(item.current.replace(/[$,]/g, '')).toFixed(2)}</td>
                    <td className="text-right px-6 py-3.5 text-slate-600 tabular-nums">${parseFloat(item.ytd.replace(/[$,]/g, '')).toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white font-semibold">
                  <td className="px-6 py-4 uppercase text-xs tracking-[0.12em]">Total Tax</td>
                  <td className="text-right px-6 py-4 text-base font-bold tabular-nums">${calculateTotalTax().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td className="text-right px-6 py-4 tabular-nums">${calculateTotalTaxYTD().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <div className="bg-gradient-to-bl from-slate-800 via-slate-900 to-slate-800 text-white px-7 py-4 font-semibold text-[11px] uppercase tracking-[0.15em]">
              Deductions
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-y border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
                  <th className="text-left px-6 py-3.5 font-semibold text-slate-700 uppercase text-[11px] tracking-[0.12em]">Item</th>
                  <th className="text-right px-6 py-3.5 font-semibold text-slate-700 uppercase text-[11px] tracking-[0.12em] w-32">Current</th>
                  <th className="text-right px-6 py-3.5 font-semibold text-slate-700 uppercase text-[11px] tracking-[0.12em] w-32">YTD</th>
                </tr>
              </thead>
              <tbody>
                {otherDeductions.map((item, index) => (
                  <tr key={index} className="border-b border-slate-100 bg-white hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3.5 text-slate-800 uppercase text-xs tracking-wide">{item.description}</td>
                    <td className="text-right px-6 py-3.5 text-slate-700 tabular-nums">${parseFloat(item.current.replace(/[$,]/g, '')).toFixed(2)}</td>
                    <td className="text-right px-6 py-3.5 text-slate-600 tabular-nums">${parseFloat(item.ytd.replace(/[$,]/g, '')).toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white font-semibold">
                  <td className="px-6 py-4 uppercase text-xs tracking-[0.12em]">Total Deductions</td>
                  <td className="text-right px-6 py-4 text-base font-bold tabular-nums">${calculateOtherDeductions().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td className="text-right px-6 py-4 tabular-nums">${calculateOtherDeductionsYTD().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="border-t border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-50">
          <div className="px-10 py-8 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-[0.15em] font-semibold mb-2">Net Pay Distribution</p>
              <p className="text-lg font-bold text-slate-900 tracking-wide">Direct Deposit - Checking</p>
            </div>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white px-8 py-5 rounded-xl shadow-lg">
              <p className="text-xs text-slate-300 uppercase tracking-widest mb-2 font-medium">Net Amount</p>
              <div className="text-4xl font-bold tabular-nums tracking-tight">
                ${paystub.net_pay_current.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
