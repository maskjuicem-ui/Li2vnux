import { useState } from 'react';
import { Paystub, Deduction } from '../lib/supabase';
import { Plus, Trash2 } from 'lucide-react';

interface PaystubFormProps {
  initialData?: Paystub;
  onSubmit: (data: Paystub) => void;
  onCancel: () => void;
}

export default function PaystubForm({ initialData, onSubmit, onCancel }: PaystubFormProps) {
  const [formData, setFormData] = useState<Paystub>(
    initialData || {
      check_number: '',
      pay_date: '',
      period_start: '',
      period_end: '',
      school_name: '',
      school_location: '',
      school_code: '',
      employer_ein: '12-3456789',
      employee_name: '',
      employee_ssn: '',
      position: '',
      file_number: '',
      hire_date: '',
      salary_rate: 0,
      gross_pay_current: 0,
      gross_pay_ytd: 0,
      deductions: [],
      total_deductions_current: 0,
      total_deductions_ytd: 0,
      net_pay_current: 0,
      net_pay_ytd: 0,
      payment_method: '',
      template: 'modern'
    }
  );

  const handleChange = (field: keyof Paystub, value: string | number) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };

      if (field === 'gross_pay_current' || field === 'total_deductions_current') {
        const gross = field === 'gross_pay_current' ? Number(value) : Number(updated.gross_pay_current);
        const deductions = field === 'total_deductions_current' ? Number(value) : Number(updated.total_deductions_current);
        updated.net_pay_current = gross - deductions;
      }

      if (field === 'gross_pay_ytd' || field === 'total_deductions_ytd') {
        const gross = field === 'gross_pay_ytd' ? Number(value) : Number(updated.gross_pay_ytd);
        const deductions = field === 'total_deductions_ytd' ? Number(value) : Number(updated.total_deductions_ytd);
        updated.net_pay_ytd = gross - deductions;
      }

      return updated;
    });
  };

  const addDeduction = () => {
    setFormData(prev => ({
      ...prev,
      deductions: [...prev.deductions, { description: '', current: '$0.00', ytd: '$0.00' }]
    }));
  };

  const updateDeduction = (index: number, field: keyof Deduction, value: string) => {
    setFormData(prev => {
      const deductions = [...prev.deductions];
      deductions[index] = { ...deductions[index], [field]: value };
      return { ...prev, deductions };
    });
  };

  const removeDeduction = (index: number) => {
    setFormData(prev => ({
      ...prev,
      deductions: prev.deductions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Template Selection</h3>
        <div className="max-w-md">
          <label className="block text-sm font-medium text-slate-700 mb-1">Choose Paystub Template</label>
          <select
            value={formData.template || 'modern'}
            onChange={(e) => handleChange('template', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="modern">Modern Design (Colorful & Detailed)</option>
            <option value="classic">Classic Design (Simple & Professional)</option>
            <option value="beaverton">Beaverton School District (Clean & Official)</option>
          </select>
          <p className="text-xs text-slate-500 mt-2">
            {formData.template === 'classic'
              ? 'Classic template has a simple, traditional layout with clear sections'
              : formData.template === 'beaverton'
              ? 'Beaverton template mimics official school district paystubs with clean black borders and tabular layout'
              : 'Modern template features a colorful design with gradient backgrounds and enhanced visual appeal'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Check Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Check Number</label>
            <input
              type="text"
              required
              value={formData.check_number}
              onChange={(e) => handleChange('check_number', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Pay Date</label>
            <input
              type="date"
              required
              value={formData.pay_date}
              onChange={(e) => handleChange('pay_date', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Period Start</label>
            <input
              type="date"
              required
              value={formData.period_start}
              onChange={(e) => handleChange('period_start', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Period End</label>
            <input
              type="date"
              required
              value={formData.period_end}
              onChange={(e) => handleChange('period_end', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold mb-4">School Information</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">School Name</label>
            <input
              type="text"
              required
              value={formData.school_name}
              onChange={(e) => handleChange('school_name', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">School Location</label>
            <input
              type="text"
              required
              value={formData.school_location}
              onChange={(e) => handleChange('school_location', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">School Code</label>
              <input
                type="text"
                value={formData.school_code}
                onChange={(e) => handleChange('school_code', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Employer EIN</label>
              <input
                type="text"
                value={formData.employer_ein}
                onChange={(e) => handleChange('employer_ein', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Employee Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Employee Name</label>
            <input
              type="text"
              required
              value={formData.employee_name}
              onChange={(e) => handleChange('employee_name', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Position</label>
            <input
              type="text"
              required
              value={formData.position}
              onChange={(e) => handleChange('position', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">SSN</label>
            <input
              type="text"
              required
              placeholder="XXX-XX-XXXX"
              value={formData.employee_ssn}
              onChange={(e) => handleChange('employee_ssn', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">File Number</label>
            <input
              type="text"
              value={formData.file_number}
              onChange={(e) => handleChange('file_number', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Hire Date</label>
            <input
              type="date"
              required
              value={formData.hire_date}
              onChange={(e) => handleChange('hire_date', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Earnings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Salary Rate</label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.salary_rate}
              onChange={(e) => handleChange('salary_rate', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Gross Pay (Current)</label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.gross_pay_current}
              onChange={(e) => handleChange('gross_pay_current', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Gross Pay (YTD)</label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.gross_pay_ytd}
              onChange={(e) => handleChange('gross_pay_ytd', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Deductions</h3>
          <button
            type="button"
            onClick={addDeduction}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Deduction
          </button>
        </div>
        <div className="space-y-3">
          {formData.deductions.map((deduction, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <input
                  type="text"
                  value={deduction.description}
                  onChange={(e) => updateDeduction(index, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Current</label>
                <input
                  type="text"
                  placeholder="$0.00"
                  value={deduction.current}
                  onChange={(e) => updateDeduction(index, 'current', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">YTD</label>
                  <input
                    type="text"
                    placeholder="$0.00"
                    value={deduction.ytd}
                    onChange={(e) => updateDeduction(index, 'ytd', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeDeduction(index)}
                  className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Total Deductions (Current)</label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.total_deductions_current}
              onChange={(e) => handleChange('total_deductions_current', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Total Deductions (YTD)</label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.total_deductions_ytd}
              onChange={(e) => handleChange('total_deductions_ytd', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Net Pay & Payment Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Net Pay (Current)</label>
            <input
              type="number"
              step="0.01"
              value={formData.net_pay_current.toFixed(2)}
              readOnly
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-slate-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Net Pay (YTD)</label>
            <input
              type="number"
              step="0.01"
              value={formData.net_pay_ytd.toFixed(2)}
              readOnly
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-slate-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Payment Method</label>
            <input
              type="text"
              placeholder="Direct Deposit - Account ending ****XXXX"
              value={formData.payment_method}
              onChange={(e) => handleChange('payment_method', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {initialData?.id ? 'Update Paystub' : 'Save Paystub'}
        </button>
      </div>
    </form>
  );
}
