import { useState } from 'react';
import { Certificate } from '../lib/supabase';
import { Plus, Trash2 } from 'lucide-react';

interface CertificateFormProps {
  initialData?: Certificate;
  onSubmit: (data: Certificate) => void;
  onCancel: () => void;
}

export default function CertificateForm({ initialData, onSubmit, onCancel }: CertificateFormProps) {
  const [formData, setFormData] = useState<Certificate>(
    initialData || {
      certificate_number: '',
      issue_date: '',
      recipient_name: '',
      university_name: '',
      school_department: '',
      certificate_type: 'Teaching Certificate',
      field_of_study: '',
      specializations: [],
      position_title: 'Clinical Professor',
      description: '',
      dean_name: '',
      dean_title: '',
      principal_name: '',
      principal_title: ''
    }
  );

  const [currentSpecialization, setCurrentSpecialization] = useState('');

  const handleChange = (field: keyof Certificate, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSpecialization = () => {
    if (currentSpecialization.trim()) {
      setFormData(prev => ({
        ...prev,
        specializations: [...prev.specializations, currentSpecialization.trim()]
      }));
      setCurrentSpecialization('');
    }
  };

  const removeSpecialization = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      certificate_type: 'Teaching Certificate'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Certificate Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Certificate Number</label>
            <input
              type="text"
              required
              value={formData.certificate_number}
              onChange={(e) => handleChange('certificate_number', e.target.value)}
              placeholder="CERT-2025-12345"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Issue Date</label>
            <input
              type="date"
              required
              value={formData.issue_date}
              onChange={(e) => handleChange('issue_date', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Institution Information</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">University Name</label>
            <input
              type="text"
              required
              value={formData.university_name}
              onChange={(e) => handleChange('university_name', e.target.value)}
              placeholder="University of Texas"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">School/Department</label>
            <input
              type="text"
              required
              value={formData.school_department}
              onChange={(e) => handleChange('school_department', e.target.value)}
              placeholder="School of Business"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Recipient Information</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Recipient Name</label>
            <input
              type="text"
              required
              value={formData.recipient_name}
              onChange={(e) => handleChange('recipient_name', e.target.value)}
              placeholder="Michael Smith"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Field of Study</label>
            <input
              type="text"
              required
              value={formData.field_of_study}
              onChange={(e) => handleChange('field_of_study', e.target.value)}
              placeholder="Business Administration"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Position Title</label>
            <input
              type="text"
              required
              value={formData.position_title}
              onChange={(e) => handleChange('position_title', e.target.value)}
              placeholder="Clinical Professor"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="has successfully completed the requirements for teaching certification..."
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Areas of Specialization</h3>
        </div>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={currentSpecialization}
            onChange={(e) => setCurrentSpecialization(e.target.value)}
            placeholder="Enter specialization area"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialization())}
            className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={addSpecialization}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
        <div className="space-y-2">
          {formData.specializations.map((spec, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
              <span className="text-sm text-slate-700">{spec}</span>
              <button
                type="button"
                onClick={() => removeSpecialization(index)}
                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Signatories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Dean Name</label>
            <input
              type="text"
              required
              value={formData.dean_name}
              onChange={(e) => handleChange('dean_name', e.target.value)}
              placeholder="Dr. Gail Wilkins"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Dean Title</label>
            <input
              type="text"
              required
              value={formData.dean_title}
              onChange={(e) => handleChange('dean_title', e.target.value)}
              placeholder="Dean, School of Business"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Principal Name</label>
            <input
              type="text"
              required
              value={formData.principal_name}
              onChange={(e) => handleChange('principal_name', e.target.value)}
              placeholder="Dr. Emerson Johnson"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Principal Title</label>
            <input
              type="text"
              required
              value={formData.principal_title}
              onChange={(e) => handleChange('principal_title', e.target.value)}
              placeholder="Principal, University of Texas"
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
          {initialData?.id ? 'Update Certificate' : 'Save Certificate'}
        </button>
      </div>
    </form>
  );
}
