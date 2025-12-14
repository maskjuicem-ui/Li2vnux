import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Deduction {
  description: string;
  current: string;
  ytd: string;
}

export interface Paystub {
  id?: string;
  check_number: string;
  pay_date: string;
  period_start: string;
  period_end: string;
  pay_period_start?: string;
  pay_period_end?: string;
  school_name: string;
  school_location: string;
  school_code: string;
  employer_name?: string;
  employer_address?: string;
  employer_ein: string;
  employee_name: string;
  employee_id?: string;
  employee_ssn: string;
  position: string;
  department?: string;
  file_number: string;
  hire_date: string;
  salary_rate: number;
  regular_earnings?: number;
  overtime_hours?: number;
  overtime_rate?: number;
  overtime_earnings?: number;
  bonus?: number;
  gross_pay_current: number;
  gross_pay_ytd: number;
  deductions: Deduction[];
  federal_tax?: number;
  state_tax?: number;
  social_security?: number;
  medicare?: number;
  health_insurance?: number;
  retirement_401k?: number;
  total_deductions_current: number;
  total_deductions_ytd: number;
  net_pay_current: number;
  net_pay_ytd: number;
  payment_method: string;
  template?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Certificate {
  id?: string;
  certificate_number: string;
  issue_date: string;
  recipient_name: string;
  university_name: string;
  school_department: string;
  certificate_type: string;
  field_of_study: string;
  specializations: string[];
  position_title: string;
  description: string;
  dean_name: string;
  dean_title: string;
  principal_name: string;
  principal_title: string;
  created_at?: string;
  updated_at?: string;
}

export interface FeeItem {
  description: string;
  amount: number;
}

export interface StudentReceipt {
  id?: string;
  student_name: string;
  student_id: string;
  student_email: string;
  student_phone: string;
  school_name: string;
  school_address: string;
  school_city: string;
  school_state: string;
  school_country: string;
  school_postal_code: string;
  school_phone: string;
  school_website: string;
  receipt_number: string;
  date_issued: string;
  term: string;
  academic_year: string;
  fee_items: FeeItem[];
  total_amount: number;
  currency: string;
  payment_method: string;
  payment_date: string;
  notes: string;
  template?: string;
  created_at?: string;
  updated_at?: string;
}

export async function saveStudentReceipt(receipt: StudentReceipt) {
  const { data, error } = await supabase
    .from('student_receipts')
    .insert([receipt])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getStudentReceipts() {
  const { data, error } = await supabase
    .from('student_receipts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as StudentReceipt[];
}

export async function deleteStudentReceipt(id: string) {
  const { error } = await supabase
    .from('student_receipts')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export interface MilitaryServiceRecord {
  id?: string;
  service_member_name: string;
  rank: string;
  service_branch: string;
  service_number: string;
  date_of_birth: string;
  date_of_entry: string;
  date_of_separation: string;
  status: string;
  document_type: string;
  document_subtype: string;
  document_number: string;
  issue_date: string;
  expiration_date: string;
  issuing_authority: string;
  template?: string;
  home_address: string;
  home_city: string;
  home_state: string;
  home_postal_code: string;
  phone: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

export async function saveMilitaryServiceRecord(record: MilitaryServiceRecord) {
  const { data, error } = await supabase
    .from('military_service_records')
    .insert([record])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getMilitaryServiceRecords() {
  const { data, error } = await supabase
    .from('military_service_records')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as MilitaryServiceRecord[];
}

export async function deleteMilitaryServiceRecord(id: string) {
  const { error } = await supabase
    .from('military_service_records')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
