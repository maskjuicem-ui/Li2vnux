import { Paystub } from '../lib/supabase';

interface PaystubPreviewGovernmentProps {
  paystub: Paystub;
}

export default function PaystubPreviewGovernment({ paystub }: PaystubPreviewGovernmentProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  return (
    <div className="bg-white shadow-lg overflow-hidden font-mono text-xs">
      <div className="border-2 border-black">
        <div className="bg-slate-100 px-6 py-4 border-b-2 border-black">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold">DEPARTMENT OF EDUCATION</p>
              <h1 className="text-base font-bold mt-1">{paystub.school_name.toUpperCase()}</h1>
              <p className="text-xs mt-1">{paystub.school_location.toUpperCase()}</p>
            </div>
            <div className="text-right border-2 border-black px-3 py-2 bg-white">
              <p className="font-bold">FORM W-2</p>
              <p className="text-xs">WAGE STATEMENT</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-3 bg-white">
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-black p-2">
              <p className="text-xs font-bold mb-1">EMPLOYEE INFORMATION</p>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="py-1">NAME:</td>
                    <td className="py-1 font-bold">{paystub.employee_name.toUpperCase()}</td>
                  </tr>
                  <tr>
                    <td className="py-1">SSN:</td>
                    <td className="py-1 font-bold">{paystub.employee_ssn}</td>
                  </tr>
                  <tr>
                    <td className="py-1">ID:</td>
                    <td className="py-1 font-bold">{paystub.file_number || 'EMP' + paystub.employee_ssn.replace(/[^0-9]/g, '').slice(-6)}</td>
                  </tr>
                  <tr>
                    <td className="py-1">POSITION:</td>
                    <td className="py-1 font-bold">{paystub.position.toUpperCase()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="border border-black p-2">
              <p className="text-xs font-bold mb-1">PAY PERIOD INFORMATION</p>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="py-1">CHECK NO:</td>
                    <td className="py-1 font-bold">{paystub.check_number}</td>
                  </tr>
                  <tr>
                    <td className="py-1">PAY DATE:</td>
                    <td className="py-1 font-bold">{formatDate(paystub.pay_date)}</td>
                  </tr>
                  <tr>
                    <td className="py-1">PERIOD:</td>
                    <td className="py-1 font-bold">{formatDate(paystub.period_start)}</td>
                  </tr>
                  <tr>
                    <td className="py-1">TO:</td>
                    <td className="py-1 font-bold">{formatDate(paystub.period_end)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="px-6 py-3 border-t-2 border-black">
          <p className="text-xs font-bold mb-2 bg-black text-white px-2 py-1">SECTION A: EARNINGS</p>
          <table className="w-full border border-black">
            <thead className="bg-slate-200">
              <tr>
                <th className="border border-black px-2 py-1 text-left">CODE</th>
                <th className="border border-black px-2 py-1 text-left">DESCRIPTION</th>
                <th className="border border-black px-2 py-1 text-right">RATE</th>
                <th className="border border-black px-2 py-1 text-right">HOURS</th>
                <th className="border border-black px-2 py-1 text-right">CURRENT</th>
                <th className="border border-black px-2 py-1 text-right">YTD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black px-2 py-1">001</td>
                <td className="border border-black px-2 py-1">REGULAR SALARY</td>
                <td className="border border-black px-2 py-1 text-right">{(paystub.salary_rate / 2080).toFixed(2)}</td>
                <td className="border border-black px-2 py-1 text-right">160.00</td>
                <td className="border border-black px-2 py-1 text-right">{paystub.gross_pay_current.toFixed(2)}</td>
                <td className="border border-black px-2 py-1 text-right">{paystub.gross_pay_ytd.toFixed(2)}</td>
              </tr>
              <tr className="font-bold bg-slate-100">
                <td className="border-2 border-black px-2 py-1" colSpan={4}>TOTAL GROSS PAY</td>
                <td className="border-2 border-black px-2 py-1 text-right">{paystub.gross_pay_current.toFixed(2)}</td>
                <td className="border-2 border-black px-2 py-1 text-right">{paystub.gross_pay_ytd.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 border-t-2 border-black">
          <p className="text-xs font-bold mb-2 bg-black text-white px-2 py-1">SECTION B: DEDUCTIONS & TAXES</p>
          <table className="w-full border border-black">
            <thead className="bg-slate-200">
              <tr>
                <th className="border border-black px-2 py-1 text-left">CODE</th>
                <th className="border border-black px-2 py-1 text-left">DESCRIPTION</th>
                <th className="border border-black px-2 py-1 text-right">CURRENT</th>
                <th className="border border-black px-2 py-1 text-right">YTD</th>
              </tr>
            </thead>
            <tbody>
              {paystub.deductions.length > 0 ? (
                paystub.deductions.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-black px-2 py-1">{String(index + 100).padStart(3, '0')}</td>
                    <td className="border border-black px-2 py-1">{item.description.toUpperCase()}</td>
                    <td className="border border-black px-2 py-1 text-right">{item.current}</td>
                    <td className="border border-black px-2 py-1 text-right">{item.ytd}</td>
                  </tr>
                ))
              ) : (
                <>
                  <tr>
                    <td className="border border-black px-2 py-1">100</td>
                    <td className="border border-black px-2 py-1">FEDERAL INCOME TAX</td>
                    <td className="border border-black px-2 py-1 text-right">{(paystub.gross_pay_current * 0.12).toFixed(2)}</td>
                    <td className="border border-black px-2 py-1 text-right">{(paystub.gross_pay_ytd * 0.12).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1">101</td>
                    <td className="border border-black px-2 py-1">STATE INCOME TAX</td>
                    <td className="border border-black px-2 py-1 text-right">{(paystub.gross_pay_current * 0.05).toFixed(2)}</td>
                    <td className="border border-black px-2 py-1 text-right">{(paystub.gross_pay_ytd * 0.05).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1">102</td>
                    <td className="border border-black px-2 py-1">SOCIAL SECURITY</td>
                    <td className="border border-black px-2 py-1 text-right">{(paystub.gross_pay_current * 0.062).toFixed(2)}</td>
                    <td className="border border-black px-2 py-1 text-right">{(paystub.gross_pay_ytd * 0.062).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1">103</td>
                    <td className="border border-black px-2 py-1">MEDICARE</td>
                    <td className="border border-black px-2 py-1 text-right">{(paystub.gross_pay_current * 0.0145).toFixed(2)}</td>
                    <td className="border border-black px-2 py-1 text-right">{(paystub.gross_pay_ytd * 0.0145).toFixed(2)}</td>
                  </tr>
                </>
              )}
              <tr className="font-bold bg-slate-100">
                <td className="border-2 border-black px-2 py-1" colSpan={2}>TOTAL DEDUCTIONS</td>
                <td className="border-2 border-black px-2 py-1 text-right">{paystub.total_deductions_current.toFixed(2)}</td>
                <td className="border-2 border-black px-2 py-1 text-right">{paystub.total_deductions_ytd.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-black text-white border-t-4 border-black">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs mb-1">NET PAY</p>
              <p className="text-2xl font-bold">${paystub.net_pay_current.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs mb-1">PAYMENT METHOD</p>
              <p className="text-xs">{paystub.payment_method || 'DIRECT DEPOSIT'}</p>
              <p className="text-xs mt-1">YTD NET: ${paystub.net_pay_ytd.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-2 bg-slate-100 text-center border-t border-black">
          <p className="text-xs">OFFICIAL GOVERNMENT DOCUMENT - RETAIN FOR TAX PURPOSES</p>
          <p className="text-xs">EMPLOYER ID: {paystub.employer_ein} | ISSUED: {formatDate(paystub.pay_date)}</p>
        </div>
      </div>
    </div>
  );
}
