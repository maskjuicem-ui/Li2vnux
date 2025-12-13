import { Paystub } from '../lib/supabase';

interface PaystubPreviewClassicProps {
  paystub: Paystub;
}

export default function PaystubPreviewClassic({ paystub }: PaystubPreviewClassicProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  const taxDeductions = paystub.deductions.filter(d =>
    d.description.toLowerCase().includes('tax') ||
    d.description.toLowerCase().includes('security') ||
    d.description.toLowerCase().includes('medicare')
  );

  const otherDeductions = paystub.deductions.filter(d =>
    !d.description.toLowerCase().includes('tax') &&
    !d.description.toLowerCase().includes('security') &&
    !d.description.toLowerCase().includes('medicare')
  );

  const calculateTotalTaxes = () => {
    return taxDeductions.reduce((sum, d) => {
      const value = parseFloat(d.current.replace(/[$,]/g, ''));
      return sum + (isNaN(value) ? 0 : value);
    }, 0);
  };

  return (
    <div className="bg-white shadow-lg overflow-hidden font-mono text-sm">
      <div className="px-8 py-6 flex justify-between items-start border-b-2 border-black">
        <div>
          <h1 className="text-xl font-bold mb-2">{paystub.school_name.toUpperCase()}</h1>
          <p className="text-sm">{paystub.school_location}</p>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-bold mb-2">EARNINGS STATEMENT</h2>
          <p className="text-sm"><span className="font-bold">Pay Date:</span> {formatDate(paystub.pay_date)}</p>
          <p className="text-sm"><span className="font-bold">Pay Period:</span> {formatDate(paystub.period_start)} - {formatDate(paystub.period_end)}</p>
        </div>
      </div>

      <div className="px-8 py-4 border-b border-black">
        <table className="w-full text-xs">
          <tbody>
            <tr>
              <td className="py-1 font-bold w-1/3">EMPLOYEE NAME</td>
              <td className="py-1 font-bold w-1/3">EMPLOYEE ID</td>
              <td className="py-1 font-bold w-1/3">DEPARTMENT</td>
            </tr>
            <tr>
              <td className="py-1">{paystub.employee_name}</td>
              <td className="py-1">{paystub.file_number || 'E' + paystub.employee_ssn.replace(/[^0-9]/g, '').slice(-6)}</td>
              <td className="py-1">{paystub.position.toUpperCase()}</td>
            </tr>
            <tr className="h-3"></tr>
            <tr>
              <td className="py-1 font-bold">TAX DATA</td>
              <td className="py-1 font-bold">PAY RATE</td>
              <td className="py-1 font-bold">CHECK NUMBER</td>
            </tr>
            <tr>
              <td className="py-1">Single / OR / 0</td>
              <td className="py-1">Annual Salary</td>
              <td className="py-1">{paystub.check_number}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="px-8 py-4 border-b border-black">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-black">
              <th className="text-left py-2 font-bold">DESCRIPTION</th>
              <th className="text-right py-2 font-bold w-20">RATE</th>
              <th className="text-right py-2 font-bold w-20">HOURS</th>
              <th className="text-right py-2 font-bold w-24">CURRENT</th>
              <th className="text-right py-2 font-bold w-24">YTD</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2">Regular Salary (Teacher)</td>
              <td className="text-right"></td>
              <td className="text-right">160.00</td>
              <td className="text-right">{paystub.gross_pay_current.toFixed(2)}</td>
              <td className="text-right">{paystub.gross_pay_ytd.toFixed(2)}</td>
            </tr>
            {paystub.deductions.some(d => d.description.toLowerCase().includes('stipend') || d.description.toLowerCase().includes('extra')) && (
              <tr>
                <td className="py-2">Stipend / Extra Duty</td>
                <td className="text-right"></td>
                <td className="text-right"></td>
                <td className="text-right">250.00</td>
                <td className="text-right">1,500.00</td>
              </tr>
            )}
            <tr className="border-t border-black font-bold">
              <td className="py-2">GROSS PAY</td>
              <td className="text-right"></td>
              <td className="text-right"></td>
              <td className="text-right">{paystub.gross_pay_current.toFixed(2)}</td>
              <td className="text-right">{paystub.gross_pay_ytd.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="px-8 py-4 border-b border-black">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-black">
                  <th className="text-left py-2 font-bold">TAX DEDUCTIONS</th>
                  <th className="text-right py-2 font-bold w-24">CURRENT</th>
                  <th className="text-right py-2 font-bold w-24">YTD</th>
                </tr>
              </thead>
              <tbody>
                {taxDeductions.map((item, index) => (
                  <tr key={index}>
                    <td className="py-1">{item.description}</td>
                    <td className="text-right">{item.current}</td>
                    <td className="text-right">{item.ytd}</td>
                  </tr>
                ))}
                {taxDeductions.length === 0 && (
                  <>
                    <tr>
                      <td className="py-1">Federal Income Tax</td>
                      <td className="text-right">{(paystub.gross_pay_current * 0.12).toFixed(2)}</td>
                      <td className="text-right">{(paystub.gross_pay_ytd * 0.12).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Social Security</td>
                      <td className="text-right">{(paystub.gross_pay_current * 0.062).toFixed(2)}</td>
                      <td className="text-right">{(paystub.gross_pay_ytd * 0.062).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Medicare</td>
                      <td className="text-right">{(paystub.gross_pay_current * 0.0145).toFixed(2)}</td>
                      <td className="text-right">{(paystub.gross_pay_ytd * 0.0145).toFixed(2)}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          <div>
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-black">
                  <th className="text-left py-2 font-bold">PRE-TAX / BENEFITS</th>
                  <th className="text-right py-2 font-bold w-24">CURRENT</th>
                  <th className="text-right py-2 font-bold w-24">YTD</th>
                </tr>
              </thead>
              <tbody>
                {otherDeductions.map((item, index) => (
                  <tr key={index}>
                    <td className="py-1">{item.description}</td>
                    <td className="text-right">{item.current}</td>
                    <td className="text-right">{item.ytd}</td>
                  </tr>
                ))}
                {otherDeductions.length === 0 && (
                  <>
                    <tr>
                      <td className="py-1">Medical / Dental</td>
                      <td className="text-right">145.00</td>
                      <td className="text-right">1,595.00</td>
                    </tr>
                    <tr>
                      <td className="py-1">PERS (Retirement)</td>
                      <td className="text-right">325.00</td>
                      <td className="text-right">3,575.00</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="px-8 py-4 border-b-4 border-black">
        <table className="w-full text-sm border-2 border-black">
          <tbody>
            <tr>
              <td className="py-3 px-4 font-bold border-r-2 border-black text-center">TOTAL GROSS</td>
              <td className="py-3 px-4 font-bold border-r-2 border-black text-center">TOTAL TAXES</td>
              <td className="py-3 px-4 font-bold border-r-2 border-black text-center">TOTAL DEDUCTIONS</td>
              <td className="py-3 px-4 font-bold text-center">NET PAY</td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-center border-r-2 border-black border-t-2">${paystub.gross_pay_current.toFixed(2)}</td>
              <td className="py-3 px-4 text-center border-r-2 border-black border-t-2">-${calculateTotalTaxes().toFixed(2)}</td>
              <td className="py-3 px-4 text-center border-r-2 border-black border-t-2">-${paystub.total_deductions_current.toFixed(2)}</td>
              <td className="py-3 px-4 font-bold text-xl text-center border-t-2">${paystub.net_pay_current.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="px-8 py-4 text-center text-xs">
        <p className="mb-2">{paystub.payment_method || `Direct Deposit Distribution: Checking ****${paystub.check_number.slice(-4)}: $${paystub.net_pay_current.toFixed(2)}`}</p>
        <p className="text-xs">{paystub.school_name.toUpperCase()} | PAYROLL DEPARTMENT</p>
      </div>
    </div>
  );
}
