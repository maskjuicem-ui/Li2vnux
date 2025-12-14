import { Paystub } from '../lib/supabase';

interface PaystubPreviewWalterReedProps {
  paystub: Paystub;
}

export default function PaystubPreviewWalterReed({ paystub }: PaystubPreviewWalterReedProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const employerName = paystub.employer_name || paystub.school_name || 'Institution Name';
  const employerAddress = paystub.employer_address || paystub.school_location || 'Address';
  const employeeId = paystub.employee_id || paystub.file_number || 'N/A';
  const department = paystub.department || 'Department';
  const payPeriodStart = paystub.pay_period_start || paystub.period_start;
  const payPeriodEnd = paystub.pay_period_end || paystub.period_end;
  const regularEarnings = paystub.regular_earnings || paystub.salary_rate || 0;
  const overtimeHours = paystub.overtime_hours || 0;
  const overtimeRate = paystub.overtime_rate || 0;
  const overtimeEarnings = paystub.overtime_earnings || 0;
  const bonus = paystub.bonus || 0;
  const federalTax = paystub.federal_tax || 0;
  const stateTax = paystub.state_tax || 0;
  const socialSecurity = paystub.social_security || 0;
  const medicare = paystub.medicare || 0;
  const healthInsurance = paystub.health_insurance || 0;
  const retirement401k = paystub.retirement_401k || 0;

  return (
    <div className="bg-white p-12 max-w-4xl mx-auto" style={{ fontFamily: 'Arial, sans-serif' }}>
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center mb-4">
            <div className="text-center">
              <div className="text-yellow-400 font-bold text-3xl">🦁</div>
              <div className="text-white text-xs font-bold mt-1">P9Q</div>
            </div>
          </div>
          <div className="text-sm">
            <div className="font-bold text-gray-900">{employerName}</div>
            <div className="text-gray-600">{employerAddress}</div>
          </div>
        </div>

        <div className="text-right">
          <h1 className="text-4xl font-bold text-green-600 mb-2">EARNINGS</h1>
          <h2 className="text-4xl font-bold text-green-600">STATEMENT</h2>
        </div>
      </div>

      <div className="border-t-2 border-b-2 border-gray-300 py-6 my-6"></div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-bold text-gray-900 text-lg mb-4">EMPLOYEE INFORMATION</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-600">Name: </span>
              <span className="font-bold text-gray-900">{paystub.employee_name}</span>
            </div>
            <div>
              <span className="text-gray-600">Employee ID: </span>
              <span className="text-gray-900">{employeeId}</span>
            </div>
            <div>
              <span className="text-gray-600">Department: </span>
              <span className="font-bold text-gray-900">{department}</span>
            </div>
            <div>
              <span className="text-gray-600">Position: </span>
              <span className="font-bold text-gray-900">{paystub.position}</span>
            </div>
            <div>
              <span className="text-gray-600">Status: </span>
              <span className="text-gray-900">Full-time Active Faculty</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 text-lg mb-4">PAY SUMMARY</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-600">Pay Period: </span>
              <span className="text-gray-900">{formatDate(payPeriodStart)} – {formatDate(payPeriodEnd)}</span>
            </div>
            <div>
              <span className="text-gray-600">Pay Date: </span>
              <span className="text-gray-900">{formatDate(paystub.pay_date)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-gray-400">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-400">
              <th className="text-left p-3 bg-gray-100 font-bold text-gray-900" colSpan={4}>EARNINGS</th>
              <th className="text-left p-3 bg-gray-100 font-bold text-gray-900" colSpan={2}>DEDUCTIONS</th>
            </tr>
            <tr className="border-b border-gray-400 bg-gray-50">
              <th className="text-left p-3 font-bold text-gray-900">Description</th>
              <th className="text-left p-3 font-bold text-gray-900">Hours</th>
              <th className="text-left p-3 font-bold text-gray-900">Rate</th>
              <th className="text-left p-3 font-bold text-gray-900">Amount</th>
              <th className="text-left p-3 font-bold text-gray-900">Description</th>
              <th className="text-right p-3 font-bold text-gray-900">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-300">
              <td className="p-3 text-gray-900">Base Salary</td>
              <td className="p-3 text-gray-900 text-center">-</td>
              <td className="p-3 text-gray-900 text-center">-</td>
              <td className="p-3 text-gray-900">${regularEarnings.toFixed(2)}</td>
              <td className="p-3 text-gray-900">Federal Tax</td>
              <td className="p-3 text-gray-900 text-right">${federalTax.toFixed(2)}</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="p-3 text-gray-900">Overtime</td>
              <td className="p-3 text-gray-900 text-center">{overtimeHours}</td>
              <td className="p-3 text-gray-900 text-center">${overtimeRate}/hr</td>
              <td className="p-3 text-gray-900">${overtimeEarnings.toFixed(2)}</td>
              <td className="p-3 text-gray-900">State Tax</td>
              <td className="p-3 text-gray-900 text-right">${stateTax.toFixed(2)}</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="p-3 text-gray-900">Bonus</td>
              <td className="p-3 text-gray-900 text-center">-</td>
              <td className="p-3 text-gray-900 text-center">-</td>
              <td className="p-3 text-gray-900">${bonus.toFixed(2)}</td>
              <td className="p-3 text-gray-900">Social Security</td>
              <td className="p-3 text-gray-900 text-right">${socialSecurity.toFixed(2)}</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="p-3 text-gray-900"></td>
              <td className="p-3 text-gray-900"></td>
              <td className="p-3 text-gray-900"></td>
              <td className="p-3 text-gray-900"></td>
              <td className="p-3 text-gray-900">Medicare</td>
              <td className="p-3 text-gray-900 text-right">${medicare.toFixed(2)}</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="p-3 text-gray-900"></td>
              <td className="p-3 text-gray-900"></td>
              <td className="p-3 text-gray-900"></td>
              <td className="p-3 text-gray-900"></td>
              <td className="p-3 text-gray-900">Health Insurance</td>
              <td className="p-3 text-gray-900 text-right">${healthInsurance.toFixed(2)}</td>
            </tr>
            <tr className="border-b border-gray-400">
              <td className="p-3 text-gray-900"></td>
              <td className="p-3 text-gray-900"></td>
              <td className="p-3 text-gray-900"></td>
              <td className="p-3 text-gray-900"></td>
              <td className="p-3 text-gray-900">Retirement (401k)</td>
              <td className="p-3 text-gray-900 text-right">${retirement401k.toFixed(2)}</td>
            </tr>
            <tr className="bg-gray-50 font-bold">
              <td className="p-3 text-gray-900" colSpan={3}></td>
              <td className="p-3 text-gray-900">
                <span className="mr-2">Total Gross:</span>
                <span>${paystub.gross_pay_current.toFixed(2)}</span>
              </td>
              <td className="p-3 text-gray-900">Total Deductions:</td>
              <td className="p-3 text-gray-900 text-right">${paystub.total_deductions_current.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-8">
        <div>
          <h3 className="font-bold text-gray-900 text-lg mb-4">YEAR-TO-DATE (YTD)</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">YTD Gross Pay:</span>
              <span className="text-gray-900">${paystub.gross_pay_ytd.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">YTD Deductions:</span>
              <span className="text-gray-900">${paystub.total_deductions_ytd.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">YTD Net Pay:</span>
              <span className="text-gray-900">${paystub.net_pay_ytd.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 text-lg mb-4">NET PAY DISTRIBUTION</h3>
          <div className="bg-green-700 text-white p-6 text-center">
            <div className="text-4xl font-bold">${paystub.net_pay_current.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-300">
        <p className="text-xs text-gray-500 italic text-center">
          This document is a representation of earnings and deductions for the period specified. Please retain for your records.
        </p>
      </div>
    </div>
  );
}
