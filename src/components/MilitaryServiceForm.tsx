import { useState } from 'react';
import { MilitaryServiceRecord } from '../lib/supabase';
import { Sparkles, Upload, X } from 'lucide-react';

interface MilitaryServiceFormProps {
  initialData?: MilitaryServiceRecord;
  onSubmit: (record: MilitaryServiceRecord) => void;
  onCancel: () => void;
  loading?: boolean;
}

const SERVICE_BRANCHES = [
  'U.S. Army',
  'U.S. Navy',
  'U.S. Air Force',
  'U.S. Marine Corps',
  'U.S. Coast Guard',
  'U.S. Space Force',
];

const MILITARY_RANKS = {
  'U.S. Army': [
    'Private (PV1)', 'Private (PV2)', 'Private First Class (PFC)', 'Specialist (SPC)', 'Corporal (CPL)',
    'Sergeant (SGT)', 'Staff Sergeant (SSG)', 'Sergeant First Class (SFC)', 'Master Sergeant (MSG)',
    'First Sergeant (1SG)', 'Sergeant Major (SGM)', 'Command Sergeant Major (CSM)',
    'Second Lieutenant (2LT)', 'First Lieutenant (1LT)', 'Captain (CPT)', 'Major (MAJ)',
    'Lieutenant Colonel (LTC)', 'Colonel (COL)', 'Brigadier General (BG)', 'Major General (MG)',
    'Lieutenant General (LTG)', 'General (GEN)',
  ],
  'U.S. Navy': [
    'Seaman Recruit (SR)', 'Seaman Apprentice (SA)', 'Seaman (SN)', 'Petty Officer Third Class (PO3)',
    'Petty Officer Second Class (PO2)', 'Petty Officer First Class (PO1)', 'Chief Petty Officer (CPO)',
    'Senior Chief Petty Officer (SCPO)', 'Master Chief Petty Officer (MCPO)',
    'Ensign (ENS)', 'Lieutenant Junior Grade (LTJG)', 'Lieutenant (LT)', 'Lieutenant Commander (LCDR)',
    'Commander (CDR)', 'Captain (CAPT)', 'Rear Admiral Lower Half (RDML)', 'Rear Admiral (RADM)',
    'Vice Admiral (VADM)', 'Admiral (ADM)',
  ],
  'U.S. Air Force': [
    'Airman Basic (AB)', 'Airman (Amn)', 'Airman First Class (A1C)', 'Senior Airman (SrA)',
    'Staff Sergeant (SSgt)', 'Technical Sergeant (TSgt)', 'Master Sergeant (MSgt)',
    'Senior Master Sergeant (SMSgt)', 'Chief Master Sergeant (CMSgt)',
    'Second Lieutenant (2d Lt)', 'First Lieutenant (1st Lt)', 'Captain (Capt)', 'Major (Maj)',
    'Lieutenant Colonel (Lt Col)', 'Colonel (Col)', 'Brigadier General (Brig Gen)',
    'Major General (Maj Gen)', 'Lieutenant General (Lt Gen)', 'General (Gen)',
  ],
  'U.S. Marine Corps': [
    'Private (Pvt)', 'Private First Class (PFC)', 'Lance Corporal (LCpl)', 'Corporal (Cpl)',
    'Sergeant (Sgt)', 'Staff Sergeant (SSgt)', 'Gunnery Sergeant (GySgt)', 'Master Sergeant (MSgt)',
    'First Sergeant (1stSgt)', 'Master Gunnery Sergeant (MGySgt)', 'Sergeant Major (SgtMaj)',
    'Second Lieutenant (2ndLt)', 'First Lieutenant (1stLt)', 'Captain (Capt)', 'Major (Maj)',
    'Lieutenant Colonel (LtCol)', 'Colonel (Col)', 'Brigadier General (BGen)',
    'Major General (MajGen)', 'Lieutenant General (LtGen)', 'General (Gen)',
  ],
  'U.S. Coast Guard': [
    'Seaman Recruit (SR)', 'Seaman Apprentice (SA)', 'Seaman (SN)', 'Petty Officer Third Class (PO3)',
    'Petty Officer Second Class (PO2)', 'Petty Officer First Class (PO1)', 'Chief Petty Officer (CPO)',
    'Senior Chief Petty Officer (SCPO)', 'Master Chief Petty Officer (MCPO)',
    'Ensign (ENS)', 'Lieutenant Junior Grade (LTJG)', 'Lieutenant (LT)', 'Lieutenant Commander (LCDR)',
    'Commander (CDR)', 'Captain (CAPT)', 'Rear Admiral Lower Half (RDML)', 'Rear Admiral (RADM)',
    'Vice Admiral (VADM)', 'Admiral (ADM)',
  ],
  'U.S. Space Force': [
    'Specialist 1 (Spc1)', 'Specialist 2 (Spc2)', 'Specialist 3 (Spc3)', 'Specialist 4 (Spc4)',
    'Sergeant (Sgt)', 'Technical Sergeant (TSgt)', 'Master Sergeant (MSgt)',
    'Senior Master Sergeant (SMSgt)', 'Chief Master Sergeant (CMSgt)',
    'Second Lieutenant (2d Lt)', 'First Lieutenant (1st Lt)', 'Captain (Capt)', 'Major (Maj)',
    'Lieutenant Colonel (Lt Col)', 'Colonel (Col)', 'Brigadier General (Brig Gen)',
    'Major General (Maj Gen)', 'Lieutenant General (Lt Gen)', 'General (Gen)',
  ],
};

const SERVICE_STATUS = [
  'Active - Final 12 Months',
  'Veteran - Separated Within 12 Months',
];

const DOCUMENT_TYPES = [
  'Active Duty/Reservist',
  'Veteran',
  'Retiree',
];

const DOCUMENT_SUBTYPES = {
  'Active Duty/Reservist': [
    'Recent LES (within 90 days)',
    'Current Orders (issued within 1 year)',
  ],
  'Veteran': [
    'DD-214',
    'VA ID',
    'VA Benefits Letter',
    'Discharge Certificate (DD256)',
    'Driver\'s License with Veteran designation',
  ],
  'Retiree': [
    'DD-214',
    'VA ID',
    'VA Benefits Letter',
    'Retirement Certificate',
    'Retirement Orders',
  ],
};

const TEMPLATES = [
  { value: 'standard', label: 'Standard - Official military document' },
  { value: 'modern', label: 'Modern - Clean contemporary style' },
  { value: 'premium', label: 'Premium - Professional with seal' },
];

const FIRST_NAMES = [
  'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles',
  'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua',
  'Kenneth', 'Kevin', 'Brian', 'George', 'Timothy', 'Ronald', 'Edward', 'Jason', 'Jeffrey', 'Ryan',
  'Jacob', 'Gary', 'Nicholas', 'Eric', 'Jonathan', 'Stephen', 'Larry', 'Justin', 'Scott', 'Brandon',
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee',
  'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young',
  'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams',
];

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
];

export default function MilitaryServiceForm({ initialData, onSubmit, onCancel, loading }: MilitaryServiceFormProps) {
  const [branch, setBranch] = useState(initialData?.service_branch || 'U.S. Army');
  const [documentType, setDocumentType] = useState(initialData?.document_type || 'Active Duty/Reservist');
  const [record, setRecord] = useState<MilitaryServiceRecord>(initialData ? { ...initialData } : {
    service_member_name: '',
    rank: '',
    service_branch: 'U.S. Army',
    service_number: '',
    date_of_birth: '',
    date_of_entry: '',
    date_of_separation: '',
    status: 'Active - Final 12 Months',
    document_type: 'Active Duty/Reservist',
    document_subtype: 'Recent LES (within 90 days)',
    document_number: '',
    issue_date: new Date().toISOString().split('T')[0],
    expiration_date: '',
    issuing_authority: 'U.S. Department of Defense',
    template: 'standard',
    home_address: '',
    home_city: '',
    home_state: '',
    home_postal_code: '',
    phone: '',
    email: '',
  });

  const handleChange = (field: keyof MilitaryServiceRecord, value: string) => {
    if (field === 'service_branch') {
      setBranch(value);
      setRecord(prev => ({ ...prev, [field]: value, rank: '' }));
    } else if (field === 'document_type') {
      setDocumentType(value);
      const subtypes = DOCUMENT_SUBTYPES[value as keyof typeof DOCUMENT_SUBTYPES];
      setRecord(prev => ({ ...prev, [field]: value, document_subtype: subtypes[0] }));
    } else {
      setRecord(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRecord(prev => ({
          ...prev,
          logo_url: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setRecord(prev => ({
      ...prev,
      logo_url: undefined
    }));
  };

  const generateRandom = () => {
    const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const randomBranch = SERVICE_BRANCHES[Math.floor(Math.random() * SERVICE_BRANCHES.length)];
    const ranks = MILITARY_RANKS[randomBranch as keyof typeof MILITARY_RANKS];
    const randomRank = ranks[Math.floor(Math.random() * ranks.length)];
    const randomStatus = SERVICE_STATUS[Math.floor(Math.random() * SERVICE_STATUS.length)];
    const randomDocType = DOCUMENT_TYPES[Math.floor(Math.random() * DOCUMENT_TYPES.length)];
    const subtypes = DOCUMENT_SUBTYPES[randomDocType as keyof typeof DOCUMENT_SUBTYPES];
    const randomDocSubtype = subtypes[Math.floor(Math.random() * subtypes.length)];

    const entryDate = new Date(2016 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 12), 1 + Math.floor(Math.random() * 28));
    const separationDate = new Date(2025, Math.floor(Math.random() * 6), 1 + Math.floor(Math.random() * 28));
    const issueDate = new Date();
    const expirationDate = new Date(issueDate);
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);

    const randomState = US_STATES[Math.floor(Math.random() * US_STATES.length)];

    setBranch(randomBranch);
    setDocumentType(randomDocType);
    setRecord({
      service_member_name: `${firstName} ${lastName}`,
      rank: randomRank,
      service_branch: randomBranch,
      service_number: `${Math.floor(Math.random() * 9000000) + 1000000}`,
      date_of_birth: new Date(1980 + Math.floor(Math.random() * 20), Math.floor(Math.random() * 12), 1 + Math.floor(Math.random() * 28)).toISOString().split('T')[0],
      date_of_entry: entryDate.toISOString().split('T')[0],
      date_of_separation: separationDate.toISOString().split('T')[0],
      status: randomStatus,
      document_type: randomDocType,
      document_subtype: randomDocSubtype,
      document_number: `DOD-${Math.floor(Math.random() * 900000) + 100000}`,
      issue_date: issueDate.toISOString().split('T')[0],
      expiration_date: expirationDate.toISOString().split('T')[0],
      issuing_authority: 'U.S. Department of Defense',
      template: 'standard',
      home_address: `${Math.floor(Math.random() * 9999) + 1} ${['Main', 'Oak', 'Pine', 'Maple', 'Cedar'][Math.floor(Math.random() * 5)]} Street`,
      home_city: ['Washington', 'Arlington', 'Norfolk', 'San Diego', 'Tampa'][Math.floor(Math.random() * 5)],
      home_state: randomState,
      home_postal_code: `${Math.floor(Math.random() * 90000) + 10000}`,
      phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(record);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Military Service Verification</h2>
        <button
          type="button"
          onClick={generateRandom}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          Generate Random
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Service Member Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={record.service_member_name}
              onChange={(e) => handleChange('service_member_name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Branch</label>
            <select
              value={record.service_branch}
              onChange={(e) => handleChange('service_branch', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              {SERVICE_BRANCHES.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rank</label>
            <select
              value={record.rank}
              onChange={(e) => handleChange('rank', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select Rank</option>
              {MILITARY_RANKS[branch as keyof typeof MILITARY_RANKS].map(rank => (
                <option key={rank} value={rank}>{rank}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Number</label>
            <input
              type="text"
              value={record.service_number}
              onChange={(e) => handleChange('service_number', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              value={record.date_of_birth}
              onChange={(e) => handleChange('date_of_birth', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Status</label>
            <select
              value={record.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              {SERVICE_STATUS.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
            <select
              value={record.document_type}
              onChange={(e) => handleChange('document_type', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              {DOCUMENT_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Document Subtype</label>
            <select
              value={record.document_subtype}
              onChange={(e) => handleChange('document_subtype', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              {DOCUMENT_SUBTYPES[documentType as keyof typeof DOCUMENT_SUBTYPES].map(subtype => (
                <option key={subtype} value={subtype}>{subtype}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Entry</label>
            <input
              type="date"
              value={record.date_of_entry}
              onChange={(e) => handleChange('date_of_entry', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Separation</label>
            <input
              type="date"
              value={record.date_of_separation}
              onChange={(e) => handleChange('date_of_separation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Logo Upload (Optional)</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Military Branch Logo or Unit Insignia
            </label>
            <p className="text-xs text-gray-500 mb-3">
              Upload a logo image (PNG, JPG, SVG). Recommended size: 200x200px
            </p>

            {record.logo_url ? (
              <div className="flex items-start gap-4">
                <div className="w-32 h-32 border-2 border-gray-300 rounded-lg p-2 flex items-center justify-center bg-white">
                  <img
                    src={record.logo_url}
                    alt="Logo preview"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <button
                  type="button"
                  onClick={removeLogo}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Remove Logo
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer">
                  <Upload className="w-4 h-4" />
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
                <span className="text-sm text-gray-500">No file chosen</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Document Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Document Number</label>
            <input
              type="text"
              value={record.document_number}
              onChange={(e) => handleChange('document_number', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
            <input
              type="date"
              value={record.issue_date}
              onChange={(e) => handleChange('issue_date', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
            <input
              type="date"
              value={record.expiration_date}
              onChange={(e) => handleChange('expiration_date', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Authority</label>
            <input
              type="text"
              value={record.issuing_authority}
              onChange={(e) => handleChange('issuing_authority', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Template</label>
            <select
              value={record.template}
              onChange={(e) => handleChange('template', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {TEMPLATES.map(template => (
                <option key={template.value} value={template.value}>{template.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Contact Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Home Address</label>
            <input
              type="text"
              value={record.home_address}
              onChange={(e) => handleChange('home_address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              type="text"
              value={record.home_city}
              onChange={(e) => handleChange('home_city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <select
              value={record.home_state}
              onChange={(e) => handleChange('home_state', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select State</option>
              {US_STATES.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
            <input
              type="text"
              value={record.home_postal_code}
              onChange={(e) => handleChange('home_postal_code', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={record.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={record.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save & Preview'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
