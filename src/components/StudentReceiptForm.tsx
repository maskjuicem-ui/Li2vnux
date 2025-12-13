import { useState } from 'react';
import { StudentReceipt, FeeItem } from '../lib/supabase';
import { Sparkles, Plus, X } from 'lucide-react';

interface StudentReceiptFormProps {
  initialData?: StudentReceipt;
  onSubmit: (receipt: StudentReceipt) => void;
  onCancel: () => void;
}

const COUNTRIES = [
  { code: 'USA', name: 'United States', currency: 'USD' },
  { code: 'CAN', name: 'Canada', currency: 'CAD' },
  { code: 'GBR', name: 'United Kingdom', currency: 'GBP' },
  { code: 'AUS', name: 'Australia', currency: 'AUD' },
  { code: 'NZL', name: 'New Zealand', currency: 'NZD' },
  { code: 'IND', name: 'India', currency: 'INR' },
  { code: 'SGP', name: 'Singapore', currency: 'SGD' },
  { code: 'MYS', name: 'Malaysia', currency: 'MYR' },
  { code: 'IDN', name: 'Indonesia', currency: 'IDR' },
  { code: 'PHL', name: 'Philippines', currency: 'PHP' },
];

const USA_SCHOOLS = [
  { name: 'Santa Fe College', city: 'Gainesville', state: 'FL', address: '3000 NW 83rd Street', postal: '32606', phone: '(352) 395-5000', website: 'www.sfcollege.edu' },
  { name: 'University of Florida', city: 'Gainesville', state: 'FL', address: '201 Criser Hall', postal: '32611', phone: '(352) 392-3261', website: 'www.ufl.edu' },
  { name: 'Miami Dade College', city: 'Miami', state: 'FL', address: '300 NE 2nd Avenue', postal: '33132', phone: '(305) 237-8888', website: 'www.mdc.edu' },
  { name: 'Valencia College', city: 'Orlando', state: 'FL', address: '701 N Econlockhatchee Trail', postal: '32825', phone: '(407) 299-5000', website: 'www.valenciacollege.edu' },
  { name: 'Florida State College', city: 'Jacksonville', state: 'FL', address: '501 W State Street', postal: '32202', phone: '(904) 646-2300', website: 'www.fscj.edu' },
  { name: 'Broward College', city: 'Fort Lauderdale', state: 'FL', address: '111 E Las Olas Blvd', postal: '33301', phone: '(954) 201-7350', website: 'www.broward.edu' },
  { name: 'Harvard University', city: 'Cambridge', state: 'MA', address: 'Massachusetts Hall', postal: '02138', phone: '(617) 495-1000', website: 'www.harvard.edu' },
  { name: 'Stanford University', city: 'Stanford', state: 'CA', address: '450 Serra Mall', postal: '94305', phone: '(650) 723-2300', website: 'www.stanford.edu' },
  { name: 'MIT', city: 'Cambridge', state: 'MA', address: '77 Massachusetts Avenue', postal: '02139', phone: '(617) 253-1000', website: 'www.mit.edu' },
  { name: 'Yale University', city: 'New Haven', state: 'CT', address: '38 Hillhouse Avenue', postal: '06511', phone: '(203) 432-4771', website: 'www.yale.edu' },
  { name: 'Princeton University', city: 'Princeton', state: 'NJ', address: 'Nassau Hall', postal: '08544', phone: '(609) 258-3000', website: 'www.princeton.edu' },
  { name: 'Columbia University', city: 'New York', state: 'NY', address: '116th St & Broadway', postal: '10027', phone: '(212) 854-1754', website: 'www.columbia.edu' },
  { name: 'UC Berkeley', city: 'Berkeley', state: 'CA', address: '200 California Hall', postal: '94720', phone: '(510) 642-6000', website: 'www.berkeley.edu' },
  { name: 'UCLA', city: 'Los Angeles', state: 'CA', address: '405 Hilgard Avenue', postal: '90095', phone: '(310) 825-4321', website: 'www.ucla.edu' },
  { name: 'University of Texas Austin', city: 'Austin', state: 'TX', address: '110 Inner Campus Drive', postal: '78712', phone: '(512) 471-3434', website: 'www.utexas.edu' },
  { name: 'University of Michigan', city: 'Ann Arbor', state: 'MI', address: '500 S State Street', postal: '48109', phone: '(734) 764-1817', website: 'www.umich.edu' },
  { name: 'NYU', city: 'New York', state: 'NY', address: '70 Washington Square South', postal: '10012', phone: '(212) 998-1212', website: 'www.nyu.edu' },
  { name: 'Northwestern University', city: 'Evanston', state: 'IL', address: '633 Clark Street', postal: '60208', phone: '(847) 491-3741', website: 'www.northwestern.edu' },
  { name: 'Duke University', city: 'Durham', state: 'NC', address: '2138 Campus Drive', postal: '27708', phone: '(919) 684-8111', website: 'www.duke.edu' },
  { name: 'Boston University', city: 'Boston', state: 'MA', address: '1 Silber Way', postal: '02215', phone: '(617) 353-2000', website: 'www.bu.edu' },
];

const INTERNATIONAL_SCHOOLS = [
  { name: 'University of Toronto', city: 'Toronto', state: 'ON', country: 'CAN', address: '27 Kings College Circle', postal: 'M5S 1A1', phone: '+1 (416) 978-2011', website: 'www.utoronto.ca' },
  { name: 'University of British Columbia', city: 'Vancouver', state: 'BC', country: 'CAN', address: '2329 West Mall', postal: 'V6T 1Z4', phone: '+1 (604) 822-2211', website: 'www.ubc.ca' },
  { name: 'McGill University', city: 'Montreal', state: 'QC', country: 'CAN', address: '845 Sherbrooke Street West', postal: 'H3A 0G4', phone: '+1 (514) 398-4455', website: 'www.mcgill.ca' },
  { name: 'University of Oxford', city: 'Oxford', state: 'Oxfordshire', country: 'GBR', address: 'Wellington Square', postal: 'OX1 2JD', phone: '+44 1865 270000', website: 'www.ox.ac.uk' },
  { name: 'University of Cambridge', city: 'Cambridge', state: 'Cambridgeshire', country: 'GBR', address: 'The Old Schools, Trinity Lane', postal: 'CB2 1TN', phone: '+44 1223 337733', website: 'www.cam.ac.uk' },
  { name: 'Imperial College London', city: 'London', state: 'Greater London', country: 'GBR', address: 'South Kensington Campus', postal: 'SW7 2AZ', phone: '+44 20 7589 5111', website: 'www.imperial.ac.uk' },
  { name: 'University of Sydney', city: 'Sydney', state: 'NSW', country: 'AUS', address: 'Camperdown', postal: '2006', phone: '+61 2 9351 2222', website: 'www.sydney.edu.au' },
  { name: 'University of Melbourne', city: 'Melbourne', state: 'VIC', country: 'AUS', address: 'Parkville', postal: '3010', phone: '+61 3 9035 5511', website: 'www.unimelb.edu.au' },
  { name: 'National University of Singapore', city: 'Singapore', state: 'Singapore', country: 'SGP', address: '21 Lower Kent Ridge Road', postal: '119077', phone: '+65 6516 6666', website: 'www.nus.edu.sg' },
  { name: 'Nanyang Technological University', city: 'Singapore', state: 'Singapore', country: 'SGP', address: '50 Nanyang Avenue', postal: '639798', phone: '+65 6791 1744', website: 'www.ntu.edu.sg' },
  { name: 'University of Auckland', city: 'Auckland', state: 'Auckland', country: 'NZL', address: '12 Grafton Road', postal: '1010', phone: '+64 9 373 7999', website: 'www.auckland.ac.nz' },
  { name: 'IIT Bombay', city: 'Mumbai', state: 'Maharashtra', country: 'IND', address: 'Powai', postal: '400076', phone: '+91 22 2572 2545', website: 'www.iitb.ac.in' },
  { name: 'IIT Delhi', city: 'New Delhi', state: 'Delhi', country: 'IND', address: 'Hauz Khas', postal: '110016', phone: '+91 11 2659 1749', website: 'www.iitd.ac.in' },
  { name: 'University of Malaya', city: 'Kuala Lumpur', state: 'Wilayah Persekutuan', country: 'MYS', address: 'Jalan Universiti', postal: '50603', phone: '+60 3 7967 3000', website: 'www.um.edu.my' },
  { name: 'Universitas Indonesia', city: 'Depok', state: 'Jawa Barat', country: 'IDN', address: 'Kampus UI Depok', postal: '16424', phone: '+62 21 7867222', website: 'www.ui.ac.id' },
  { name: 'University of the Philippines', city: 'Quezon City', state: 'Metro Manila', country: 'PHL', address: 'Diliman', postal: '1101', phone: '+63 2 8981 8500', website: 'www.up.edu.ph' },
];

const PAYMENT_METHODS = [
  'Credit Card', 'Debit Card', 'Bank Transfer', 'Check', 'Cash',
  'Online Payment', 'Wire Transfer', 'Financial Aid', 'Scholarship'
];

const TERMS = [
  'Fall 2024', 'Spring 2025', 'Summer 2025', 'Fall 2025', 'Spring 2026',
  'Summer 2026', 'Fall 2026', 'Winter 2025', 'Winter 2026'
];

const FIRST_NAMES = [
  'James', 'Emma', 'Michael', 'Olivia', 'William', 'Ava', 'Alexander', 'Sophia', 'Benjamin', 'Isabella',
  'Ethan', 'Mia', 'Daniel', 'Charlotte', 'Matthew', 'Amelia', 'David', 'Harper', 'Joseph', 'Evelyn',
  'Christopher', 'Abigail', 'Andrew', 'Emily', 'Joshua', 'Madison', 'Ryan', 'Ella', 'Nicholas', 'Scarlett',
  'Jacob', 'Grace', 'Tyler', 'Chloe', 'Brandon', 'Victoria', 'Zachary', 'Riley', 'Samuel', 'Aria',
  'Nathan', 'Lily', 'Justin', 'Hannah', 'Kevin', 'Layla', 'Jonathan', 'Zoey', 'Christian', 'Penelope',
  'Austin', 'Nora', 'Dylan', 'Lillian', 'Thomas', 'Addison', 'Gabriel', 'Aubrey', 'Caleb', 'Eleanor',
  'Mason', 'Stella', 'Luke', 'Natalie', 'Hunter', 'Hazel', 'Henry', 'Luna', 'Owen', 'Aurora',
  'Isaac', 'Savannah', 'Jackson', 'Audrey', 'Logan', 'Brooklyn', 'Sebastian', 'Bella', 'Jack', 'Claire',
  'Aiden', 'Skylar', 'Carter', 'Lucy', 'Jayden', 'Paisley', 'Liam', 'Everly', 'Connor', 'Anna',
  'Noah', 'Caroline', 'Elijah', 'Nova', 'Oliver', 'Genesis', 'Lucas', 'Emilia', 'Aaron', 'Kennedy',
  'Raj', 'Priya', 'Arjun', 'Ananya', 'Aarav', 'Diya', 'Rohan', 'Aisha', 'Vikram', 'Kavya',
  'Wei', 'Mei', 'Chen', 'Lin', 'Jun', 'Xin', 'Lei', 'Ying', 'Ming', 'Li',
  'Hassan', 'Fatima', 'Ali', 'Aisha', 'Omar', 'Zainab', 'Yusuf', 'Maryam', 'Ahmed', 'Sarah',
  'Lucas', 'Sofia', 'Miguel', 'Isabella', 'Diego', 'Valentina', 'Carlos', 'Camila', 'Juan', 'Lucia',
  'Felix', 'Hannah', 'Max', 'Lena', 'Paul', 'Mia', 'Lukas', 'Emma', 'Leon', 'Anna',
  'Pierre', 'Amelie', 'Louis', 'Chloe', 'Hugo', 'Lea', 'Jules', 'Manon', 'Gabriel', 'Emma',
  'Luca', 'Giulia', 'Marco', 'Sofia', 'Alessandro', 'Aurora', 'Matteo', 'Giorgia', 'Lorenzo', 'Martina'
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee',
  'White', 'Harris', 'Thompson', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King',
  'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker',
  'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts', 'Phillips', 'Evans', 'Turner', 'Parker',
  'Collins', 'Edwards', 'Stewart', 'Morris', 'Rogers', 'Reed', 'Cook', 'Morgan', 'Bell', 'Murphy',
  'Bailey', 'Cooper', 'Richardson', 'Cox', 'Howard', 'Ward', 'Peterson', 'Gray', 'James', 'Watson',
  'Brooks', 'Kelly', 'Sanders', 'Price', 'Bennett', 'Wood', 'Barnes', 'Ross', 'Henderson', 'Coleman',
  'Jenkins', 'Perry', 'Powell', 'Long', 'Patterson', 'Hughes', 'Flores', 'Washington', 'Butler', 'Simmons',
  'Foster', 'Gonzales', 'Bryant', 'Alexander', 'Russell', 'Griffin', 'Diaz', 'Hayes', 'Myers', 'Ford',
  'Patel', 'Kumar', 'Singh', 'Sharma', 'Gupta', 'Reddy', 'Rao', 'Desai', 'Mehta', 'Joshi',
  'Wang', 'Li', 'Zhang', 'Liu', 'Chen', 'Yang', 'Huang', 'Zhao', 'Wu', 'Zhou',
  'Khan', 'Ahmed', 'Ali', 'Hassan', 'Hussein', 'Rahman', 'Abdullah', 'Ibrahim', 'Mahmoud', 'Youssef',
  'Gonzalez', 'Fernandez', 'Ramirez', 'Cruz', 'Morales', 'Ortiz', 'Gutierrez', 'Chavez', 'Ramos', 'Castillo',
  'Mueller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann',
  'Dubois', 'Leroy', 'Moreau', 'Simon', 'Laurent', 'Lefebvre', 'Michel', 'Garcia', 'David', 'Bertrand',
  'Rossi', 'Russo', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Colombo', 'Ricci', 'Marino', 'Greco',
  'Tan', 'Lim', 'Wong', 'Ong', 'Chan', 'Ng', 'Teo', 'Goh', 'Chua', 'Koh'
];

export default function StudentReceiptForm({ initialData, onSubmit, onCancel }: StudentReceiptFormProps) {
  const [country, setCountry] = useState(initialData?.school_country || 'USA');
  const [receipt, setReceipt] = useState<StudentReceipt>(initialData ? { ...initialData } : {
    student_name: '',
    student_id: '',
    student_email: '',
    student_phone: '',
    school_name: '',
    school_address: '',
    school_city: '',
    school_state: '',
    school_country: 'USA',
    school_postal_code: '',
    school_phone: '',
    school_website: '',
    receipt_number: '',
    date_issued: new Date().toISOString().split('T')[0],
    term: '',
    academic_year: '',
    fee_items: [{ description: 'Tuition Fee', amount: 0 }],
    total_amount: 0,
    currency: 'USD',
    payment_method: '',
    payment_date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const allSchools = country === 'USA' ? USA_SCHOOLS : INTERNATIONAL_SCHOOLS.filter(s => s.country === country);

  const handleSchoolSelect = (schoolName: string) => {
    const school = allSchools.find(s => s.name === schoolName);
    if (school) {
      setReceipt({
        ...receipt,
        school_name: school.name,
        school_address: school.address,
        school_city: school.city,
        school_state: school.state,
        school_postal_code: school.postal,
        school_phone: school.phone,
        school_website: school.website,
        school_country: country,
      });
    }
  };

  const handleCountryChange = (countryCode: string) => {
    const selectedCountry = COUNTRIES.find(c => c.code === countryCode);
    setCountry(countryCode);
    setReceipt({
      ...receipt,
      school_country: countryCode,
      currency: selectedCountry?.currency || 'USD',
      school_name: '',
      school_address: '',
      school_city: '',
      school_state: '',
      school_postal_code: '',
      school_phone: '',
      school_website: '',
    });
  };

  const addFeeItem = () => {
    setReceipt({
      ...receipt,
      fee_items: [...receipt.fee_items, { description: '', amount: 0 }],
    });
  };

  const removeFeeItem = (index: number) => {
    setReceipt({
      ...receipt,
      fee_items: receipt.fee_items.filter((_, i) => i !== index),
    });
  };

  const updateFeeItem = (index: number, field: keyof FeeItem, value: string | number) => {
    const newFeeItems = [...receipt.fee_items];
    newFeeItems[index] = { ...newFeeItems[index], [field]: value };
    setReceipt({ ...receipt, fee_items: newFeeItems });
  };

  const calculateTotal = () => {
    const total = receipt.fee_items.reduce((sum, item) => sum + (item.amount || 0), 0);
    setReceipt({ ...receipt, total_amount: total });
  };

  const generateRandomData = () => {
    const randomSchool = allSchools[Math.floor(Math.random() * allSchools.length)];
    const randomFirstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const randomLastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];

    const middleNames = ['', 'A.', 'B.', 'C.', 'D.', 'E.', 'J.', 'K.', 'L.', 'M.', 'R.', 'S.', 'T.'];
    const hasMiddleName = Math.random() > 0.6;
    const middleName = hasMiddleName ? middleNames[Math.floor(Math.random() * middleNames.length)] : '';
    const fullName = middleName ? `${randomFirstName} ${middleName} ${randomLastName}` : `${randomFirstName} ${randomLastName}`;

    const studentIdFormats = [
      () => Math.floor(1000000 + Math.random() * 9000000).toString(),
      () => `${Math.floor(10000 + Math.random() * 90000)}`,
      () => `S${Math.floor(100000 + Math.random() * 900000)}`,
      () => `${new Date().getFullYear()}${Math.floor(10000 + Math.random() * 90000)}`,
      () => `U${Math.floor(1000000 + Math.random() * 9000000)}`,
      () => `${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}`,
    ];
    const studentId = studentIdFormats[Math.floor(Math.random() * studentIdFormats.length)]();

    const receiptNumFormats = [
      () => Math.floor(100000 + Math.random() * 900000).toString(),
      () => `R${Math.floor(100000 + Math.random() * 900000)}`,
      () => `${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
      () => `REC-${Math.floor(100000 + Math.random() * 900000)}`,
      () => `TU-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(100 + Math.random() * 900)}`,
    ];
    const receiptNum = receiptNumFormats[Math.floor(Math.random() * receiptNumFormats.length)]();

    const credits = Math.floor(9 + Math.random() * 10);
    const creditRate = Math.floor(100 + Math.random() * 400);
    const tuitionAmount = credits * creditRate;

    const allPossibleFees = [
      { description: 'Student Services Fee', minAmount: 100, maxAmount: 600 },
      { description: 'Technology Fee', minAmount: 50, maxAmount: 300 },
      { description: 'Lab Fee', minAmount: 30, maxAmount: 250 },
      { description: 'Library Fee', minAmount: 40, maxAmount: 180 },
      { description: 'Activity Fee', minAmount: 60, maxAmount: 200 },
      { description: 'Health Services Fee', minAmount: 80, maxAmount: 350 },
      { description: 'Athletic Fee', minAmount: 50, maxAmount: 220 },
      { description: 'Parking Fee', minAmount: 90, maxAmount: 400 },
      { description: 'Registration Fee', minAmount: 25, maxAmount: 150 },
      { description: 'Course Materials Fee', minAmount: 100, maxAmount: 450 },
      { description: 'Facility Fee', minAmount: 70, maxAmount: 300 },
      { description: 'Student Union Fee', minAmount: 45, maxAmount: 180 },
      { description: 'Transportation Fee', minAmount: 80, maxAmount: 350 },
      { description: 'Insurance Fee', minAmount: 200, maxAmount: 800 },
      { description: 'Graduation Fee', minAmount: 50, maxAmount: 200 },
      { description: 'International Student Fee', minAmount: 150, maxAmount: 600 },
    ];

    const numAdditionalFees = Math.floor(2 + Math.random() * 5);
    const shuffledFees = [...allPossibleFees].sort(() => Math.random() - 0.5);
    const selectedFees = shuffledFees.slice(0, numAdditionalFees);

    const feeItems: FeeItem[] = [
      { description: `Tuition Fee (${credits} Credits)`, amount: tuitionAmount },
      ...selectedFees.map(fee => ({
        description: fee.description,
        amount: Math.floor(fee.minAmount + Math.random() * (fee.maxAmount - fee.minAmount))
      }))
    ];

    const total = feeItems.reduce((sum, item) => sum + item.amount, 0);

    const currentYear = new Date().getFullYear();
    const academicYearOptions = [
      `${currentYear}-${currentYear + 1}`,
      `${currentYear - 1}-${currentYear}`,
      `${currentYear + 1}-${currentYear + 2}`,
    ];

    const emailDomains = ['student.edu', 'edu', 'mail.edu', 'university.edu', 'college.edu', 'school.edu'];
    const randomDomain = emailDomains[Math.floor(Math.random() * emailDomains.length)];

    const phoneFormats = [
      () => `(${Math.floor(100 + Math.random() * 900)}) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      () => `${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      () => `+1 ${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(1000 + Math.random() * 9000)}`,
      () => `${Math.floor(100 + Math.random() * 900)}.${Math.floor(100 + Math.random() * 900)}.${Math.floor(1000 + Math.random() * 9000)}`,
      () => `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    ];
    const studentPhone = phoneFormats[Math.floor(Math.random() * phoneFormats.length)]();

    const daysAgo = Math.floor(Math.random() * 90);
    const dateIssued = new Date();
    dateIssued.setDate(dateIssued.getDate() - daysAgo);
    const formattedDateIssued = dateIssued.toISOString().split('T')[0];

    const paymentDateOffset = Math.floor(Math.random() * 30);
    const paymentDate = new Date(dateIssued);
    paymentDate.setDate(paymentDate.getDate() + paymentDateOffset);
    const formattedPaymentDate = paymentDate.toISOString().split('T')[0];

    setReceipt({
      ...receipt,
      student_name: fullName,
      student_id: studentId,
      student_email: `${randomFirstName.toLowerCase()}.${randomLastName.toLowerCase()}@${randomDomain}`,
      student_phone: studentPhone,
      school_name: randomSchool.name,
      school_address: randomSchool.address,
      school_city: randomSchool.city,
      school_state: randomSchool.state,
      school_postal_code: randomSchool.postal,
      school_phone: randomSchool.phone,
      school_website: randomSchool.website,
      school_country: country,
      receipt_number: receiptNum,
      date_issued: formattedDateIssued,
      term: TERMS[Math.floor(Math.random() * TERMS.length)],
      academic_year: academicYearOptions[Math.floor(Math.random() * academicYearOptions.length)],
      fee_items: feeItems,
      total_amount: total,
      currency: receipt.currency,
      payment_method: PAYMENT_METHODS[Math.floor(Math.random() * PAYMENT_METHODS.length)],
      payment_date: formattedPaymentDate,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(receipt);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={generateRandomData}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
        >
          <Sparkles className="w-5 h-5" />
          Generate Random Data
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Country & School Selection</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Country</label>
            <select
              value={country}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Select School</label>
            <select
              value={receipt.school_name}
              onChange={(e) => handleSchoolSelect(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose a school...</option>
              {allSchools.map((school) => (
                <option key={school.name} value={school.name}>
                  {school.name} - {school.city}, {school.state}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8">
        <h3 className="text-lg font-bold text-slate-900 mb-6">School Information</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">School Name</label>
            <input
              type="text"
              value={receipt.school_name}
              onChange={(e) => setReceipt({ ...receipt, school_name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Address</label>
            <input
              type="text"
              value={receipt.school_address}
              onChange={(e) => setReceipt({ ...receipt, school_address: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
            <input
              type="text"
              value={receipt.school_city}
              onChange={(e) => setReceipt({ ...receipt, school_city: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">State/Province</label>
            <input
              type="text"
              value={receipt.school_state}
              onChange={(e) => setReceipt({ ...receipt, school_state: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Postal Code</label>
            <input
              type="text"
              value={receipt.school_postal_code}
              onChange={(e) => setReceipt({ ...receipt, school_postal_code: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
            <input
              type="text"
              value={receipt.school_phone}
              onChange={(e) => setReceipt({ ...receipt, school_phone: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Website</label>
            <input
              type="text"
              value={receipt.school_website}
              onChange={(e) => setReceipt({ ...receipt, school_website: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Student Information</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Student Name</label>
            <input
              type="text"
              value={receipt.student_name}
              onChange={(e) => setReceipt({ ...receipt, student_name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Student ID</label>
            <input
              type="text"
              value={receipt.student_id}
              onChange={(e) => setReceipt({ ...receipt, student_id: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
            <input
              type="email"
              value={receipt.student_email}
              onChange={(e) => setReceipt({ ...receipt, student_email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
            <input
              type="text"
              value={receipt.student_phone}
              onChange={(e) => setReceipt({ ...receipt, student_phone: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Receipt Details</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Receipt Number</label>
            <input
              type="text"
              value={receipt.receipt_number}
              onChange={(e) => setReceipt({ ...receipt, receipt_number: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Date Issued</label>
            <input
              type="date"
              value={receipt.date_issued}
              onChange={(e) => setReceipt({ ...receipt, date_issued: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Term</label>
            <select
              value={receipt.term}
              onChange={(e) => setReceipt({ ...receipt, term: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select term...</option>
              {TERMS.map(term => (
                <option key={term} value={term}>{term}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Academic Year</label>
            <input
              type="text"
              value={receipt.academic_year}
              onChange={(e) => setReceipt({ ...receipt, academic_year: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="2025-2026"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900">Fee Items</h3>
          <button
            type="button"
            onClick={addFeeItem}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Fee
          </button>
        </div>
        <div className="space-y-4">
          {receipt.fee_items.map((item, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="flex-1">
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => updateFeeItem(index, 'description', e.target.value)}
                  placeholder="Fee description"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="w-48">
                <input
                  type="number"
                  step="0.01"
                  value={item.amount}
                  onChange={(e) => updateFeeItem(index, 'amount', parseFloat(e.target.value) || 0)}
                  placeholder="Amount"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              {receipt.fee_items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFeeItem(index)}
                  className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={calculateTotal}
          className="mt-6 w-full py-3 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition-colors"
        >
          Calculate Total
        </button>
        <div className="mt-4 p-4 bg-slate-100 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-slate-900">Total Amount:</span>
            <span className="text-2xl font-bold text-blue-600">
              {receipt.currency} {receipt.total_amount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Payment Information</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Payment Method</label>
            <select
              value={receipt.payment_method}
              onChange={(e) => setReceipt({ ...receipt, payment_method: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select method...</option>
              {PAYMENT_METHODS.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Payment Date</label>
            <input
              type="date"
              value={receipt.payment_date}
              onChange={(e) => setReceipt({ ...receipt, payment_date: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Notes (Optional)</label>
            <textarea
              value={receipt.notes}
              onChange={(e) => setReceipt({ ...receipt, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Additional notes..."
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
        >
          {initialData?.id ? 'Update Receipt' : 'Generate Receipt'}
        </button>
      </div>
    </form>
  );
}
