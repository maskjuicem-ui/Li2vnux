import { useState, useEffect } from 'react';
import { Plus, List, Sparkles, Download, Eye, Trash2, Award, FileText, Receipt, Pencil } from 'lucide-react';
import PaystubForm from './components/PaystubForm';
import PaystubPreview from './components/PaystubPreview';
import PaystubPreviewClassic from './components/PaystubPreviewClassic';
import PaystubPreviewBeaverton from './components/PaystubPreviewBeaverton';
import CertificateForm from './components/CertificateForm';
import CertificatePreview from './components/CertificatePreview';
import StudentReceiptForm from './components/StudentReceiptForm';
import StudentReceiptPreview from './components/StudentReceiptPreview';
import { supabase, Paystub, Certificate, StudentReceipt, saveStudentReceipt, getStudentReceipts, deleteStudentReceipt } from './lib/supabase';
import { generateRandomPaystub } from './lib/randomGenerator';
import { generateRandomCertificate } from './lib/randomCertificateGenerator';
import { generatePDF } from './lib/pdfGenerator';

type Mode = 'paystub' | 'certificate' | 'student';
type View = 'list' | 'create' | 'preview';

function App() {
  const [mode, setMode] = useState<Mode>('paystub');
  const [view, setView] = useState<View>('list');
  const [paystubs, setPaystubs] = useState<Paystub[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [studentReceipts, setStudentReceipts] = useState<StudentReceipt[]>([]);
  const [currentPaystub, setCurrentPaystub] = useState<Paystub | null>(null);
  const [currentCertificate, setCurrentCertificate] = useState<Certificate | null>(null);
  const [currentStudentReceipt, setCurrentStudentReceipt] = useState<StudentReceipt | null>(null);
  const [loading, setLoading] = useState(false);
  const [bulkQuantity, setBulkQuantity] = useState<number>(10);

  useEffect(() => {
    if (mode === 'paystub') {
      loadPaystubs();
    } else if (mode === 'certificate') {
      loadCertificates();
    } else {
      loadStudentReceipts();
    }
  }, [mode]);

  async function loadPaystubs() {
    setLoading(true);
    const { data, error } = await supabase
      .from('paystubs')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPaystubs(data);
    }
    setLoading(false);
  }

  async function loadCertificates() {
    setLoading(true);
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setCertificates(data);
    }
    setLoading(false);
  }

  async function loadStudentReceipts() {
    setLoading(true);
    try {
      const data = await getStudentReceipts();
      setStudentReceipts(data);
    } catch (error) {
      console.error('Error loading student receipts:', error);
    }
    setLoading(false);
  }

  async function handleSavePaystub(data: Paystub) {
    setLoading(true);
    let savedData;
    let error;

    if (data.id) {
      const result = await supabase
        .from('paystubs')
        .update(data)
        .eq('id', data.id)
        .select()
        .single();
      savedData = result.data;
      error = result.error;
    } else {
      const result = await supabase
        .from('paystubs')
        .insert([data])
        .select()
        .single();
      savedData = result.data;
      error = result.error;
    }

    if (!error && savedData) {
      await loadPaystubs();
      setCurrentPaystub(savedData);
      setView('preview');
    }
    setLoading(false);
  }

  async function handleSaveCertificate(data: Certificate) {
    setLoading(true);
    let savedData;
    let error;

    if (data.id) {
      const result = await supabase
        .from('certificates')
        .update(data)
        .eq('id', data.id)
        .select()
        .single();
      savedData = result.data;
      error = result.error;
    } else {
      const result = await supabase
        .from('certificates')
        .insert([data])
        .select()
        .single();
      savedData = result.data;
      error = result.error;
    }

    if (!error && savedData) {
      await loadCertificates();
      setCurrentCertificate(savedData);
      setView('preview');
    }
    setLoading(false);
  }

  async function handleSaveStudentReceipt(data: StudentReceipt) {
    setLoading(true);
    try {
      let savedData;
      if (data.id) {
        const { data: result, error } = await supabase
          .from('student_receipts')
          .update(data)
          .eq('id', data.id)
          .select()
          .single();
        if (error) throw error;
        savedData = result;
      } else {
        savedData = await saveStudentReceipt(data);
      }
      await loadStudentReceipts();
      setCurrentStudentReceipt(savedData);
      setView('preview');
    } catch (error) {
      console.error('Error saving student receipt:', error);
    }
    setLoading(false);
  }

  async function handleDeletePaystub(id: string) {
    if (!confirm('Are you sure you want to delete this paystub?')) return;

    setLoading(true);
    const { error } = await supabase
      .from('paystubs')
      .delete()
      .eq('id', id);

    if (!error) {
      await loadPaystubs();
    }
    setLoading(false);
  }

  async function handleDeleteCertificate(id: string) {
    if (!confirm('Are you sure you want to delete this certificate?')) return;

    setLoading(true);
    const { error } = await supabase
      .from('certificates')
      .delete()
      .eq('id', id);

    if (!error) {
      await loadCertificates();
    }
    setLoading(false);
  }

  async function handleDeleteStudentReceipt(id: string) {
    if (!confirm('Are you sure you want to delete this student receipt?')) return;

    setLoading(true);
    try {
      await deleteStudentReceipt(id);
      await loadStudentReceipts();
    } catch (error) {
      console.error('Error deleting student receipt:', error);
    }
    setLoading(false);
  }

  async function handleDeleteAllPaystubs() {
    if (!confirm(`Are you sure you want to delete all ${paystubs.length} paystubs? This action cannot be undone!`)) return;

    setLoading(true);
    const { error } = await supabase
      .from('paystubs')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (!error) {
      await loadPaystubs();
    }
    setLoading(false);
  }

  async function handleDeleteAllCertificates() {
    if (!confirm(`Are you sure you want to delete all ${certificates.length} certificates? This action cannot be undone!`)) return;

    setLoading(true);
    const { error } = await supabase
      .from('certificates')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (!error) {
      await loadCertificates();
    }
    setLoading(false);
  }

  async function handleDeleteAllStudentReceipts() {
    if (!confirm(`Are you sure you want to delete all ${studentReceipts.length} student receipts? This action cannot be undone!`)) return;

    setLoading(true);
    const { error } = await supabase
      .from('student_receipts')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (!error) {
      await loadStudentReceipts();
    }
    setLoading(false);
  }

  async function handleGenerateRandomPaystub() {
    setLoading(true);
    const randomData = await generateRandomPaystub();
    setCurrentPaystub(randomData);
    setView('create');
    setLoading(false);
  }

  async function handleGenerateRandomCertificate() {
    setLoading(true);
    const randomData = await generateRandomCertificate();
    setCurrentCertificate(randomData);
    setView('create');
    setLoading(false);
  }

  async function handleBulkGeneratePaystubs() {
    if (bulkQuantity < 1 || bulkQuantity > 100) {
      alert('Please enter a quantity between 1 and 100');
      return;
    }

    setLoading(true);
    const paystubsToInsert = [];

    for (let i = 0; i < bulkQuantity; i++) {
      const randomData = await generateRandomPaystub();
      paystubsToInsert.push(randomData);
    }

    const { error } = await supabase
      .from('paystubs')
      .insert(paystubsToInsert);

    if (!error) {
      await loadPaystubs();
      alert(`Successfully generated ${bulkQuantity} paystubs!`);
    }
    setLoading(false);
  }

  async function handleBulkGenerateCertificates() {
    if (bulkQuantity < 1 || bulkQuantity > 100) {
      alert('Please enter a quantity between 1 and 100');
      return;
    }

    setLoading(true);
    const certificatesToInsert = [];

    for (let i = 0; i < bulkQuantity; i++) {
      const randomData = await generateRandomCertificate();
      certificatesToInsert.push(randomData);
    }

    const { error } = await supabase
      .from('certificates')
      .insert(certificatesToInsert);

    if (!error) {
      await loadCertificates();
      alert(`Successfully generated ${bulkQuantity} certificates!`);
    }
    setLoading(false);
  }

  async function handleDownloadPDF() {
    if (mode === 'paystub' && currentPaystub) {
      await generatePDF('document-preview', `paystub-${currentPaystub.check_number}.pdf`);
    } else if (mode === 'certificate' && currentCertificate) {
      await generatePDF('document-preview', `certificate-${currentCertificate.certificate_number}.pdf`);
    } else if (mode === 'student' && currentStudentReceipt) {
      await generatePDF('document-preview', `tuition-receipt-${currentStudentReceipt.receipt_number}.pdf`);
    }
  }

  function handleModeChange(newMode: Mode) {
    setMode(newMode);
    setView('list');
    setCurrentPaystub(null);
    setCurrentCertificate(null);
    setCurrentStudentReceipt(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            School Document Generator
          </h1>
          <p className="text-slate-600">Create paystubs, certificates, and student tuition receipts</p>
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => handleModeChange('paystub')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              mode === 'paystub'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            Paystubs
          </button>
          <button
            onClick={() => handleModeChange('certificate')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              mode === 'certificate'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Award className="w-4 h-4" />
            Certificates
          </button>
          <button
            onClick={() => handleModeChange('student')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              mode === 'student'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Receipt className="w-4 h-4" />
            Student Receipts
          </button>
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setView('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              view === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
            }`}
          >
            <List className="w-4 h-4" />
            All {mode === 'paystub' ? 'Paystubs' : mode === 'certificate' ? 'Certificates' : 'Student Receipts'}
          </button>
          <button
            onClick={() => {
              setCurrentPaystub(null);
              setCurrentCertificate(null);
              setCurrentStudentReceipt(null);
              setView('create');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              view === 'create' && (mode === 'paystub' ? !currentPaystub : mode === 'certificate' ? !currentCertificate : !currentStudentReceipt)
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Plus className="w-4 h-4" />
            Create Manual
          </button>
          {mode !== 'student' && (
            <>
              <button
                onClick={mode === 'paystub' ? handleGenerateRandomPaystub : handleGenerateRandomCertificate}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 transition-colors disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                Generate Random
              </button>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-300">
                <label className="text-sm text-slate-700 font-medium">Bulk:</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={bulkQuantity}
                  onChange={(e) => setBulkQuantity(parseInt(e.target.value) || 1)}
                  className="w-16 px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={mode === 'paystub' ? handleBulkGeneratePaystubs : handleBulkGenerateCertificates}
                  disabled={loading}
                  className="flex items-center gap-2 px-3 py-1 rounded bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 transition-colors disabled:opacity-50 text-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  Generate
                </button>
              </div>
            </>
          )}
        </div>

        {view === 'list' && mode === 'paystub' && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Saved Paystubs</h2>
              {paystubs.length > 0 && (
                <button
                  onClick={handleDeleteAllPaystubs}
                  disabled={loading}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete All ({paystubs.length})
                </button>
              )}
            </div>
            <div className="divide-y divide-slate-200">
              {loading ? (
                <div className="px-6 py-12 text-center text-slate-500">Loading...</div>
              ) : paystubs.length === 0 ? (
                <div className="px-6 py-12 text-center text-slate-500">
                  No paystubs yet. Create your first one!
                </div>
              ) : (
                paystubs.map((paystub) => (
                  <div
                    key={paystub.id}
                    className="px-6 py-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-slate-900">{paystub.employee_name}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            paystub.template === 'classic'
                              ? 'bg-slate-100 text-slate-700'
                              : paystub.template === 'beaverton'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {paystub.template === 'classic' ? 'Classic' : paystub.template === 'beaverton' ? 'Beaverton' : 'Modern'}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600">
                          {paystub.position} • Check #{paystub.check_number}
                        </p>
                        <p className="text-sm text-slate-500">
                          Pay Date: {new Date(paystub.pay_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right mr-4">
                          <p className="text-lg font-semibold text-emerald-600">
                            ${paystub.net_pay_current.toFixed(2)}
                          </p>
                          <p className="text-xs text-slate-500">Net Pay</p>
                        </div>
                        <button
                          onClick={() => {
                            setCurrentPaystub(paystub);
                            setView('preview');
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setCurrentPaystub(paystub);
                            setView('create');
                          }}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeletePaystub(paystub.id!)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {view === 'list' && mode === 'certificate' && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Saved Certificates</h2>
              {certificates.length > 0 && (
                <button
                  onClick={handleDeleteAllCertificates}
                  disabled={loading}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete All ({certificates.length})
                </button>
              )}
            </div>
            <div className="divide-y divide-slate-200">
              {loading ? (
                <div className="px-6 py-12 text-center text-slate-500">Loading...</div>
              ) : certificates.length === 0 ? (
                <div className="px-6 py-12 text-center text-slate-500">
                  No certificates yet. Create your first one!
                </div>
              ) : (
                certificates.map((certificate) => (
                  <div
                    key={certificate.id}
                    className="px-6 py-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900">{certificate.recipient_name}</h3>
                        <p className="text-sm text-slate-600">
                          {certificate.certificate_type} • {certificate.field_of_study}
                        </p>
                        <p className="text-sm text-slate-500">
                          {certificate.university_name} • Cert #{certificate.certificate_number}
                        </p>
                        <p className="text-sm text-slate-500">
                          Issue Date: {new Date(certificate.issue_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setCurrentCertificate(certificate);
                            setView('preview');
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setCurrentCertificate(certificate);
                            setView('create');
                          }}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCertificate(certificate.id!)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {view === 'list' && mode === 'student' && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Saved Student Receipts</h2>
              {studentReceipts.length > 0 && (
                <button
                  onClick={handleDeleteAllStudentReceipts}
                  disabled={loading}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete All ({studentReceipts.length})
                </button>
              )}
            </div>
            <div className="divide-y divide-slate-200">
              {loading ? (
                <div className="px-6 py-12 text-center text-slate-500">Loading...</div>
              ) : studentReceipts.length === 0 ? (
                <div className="px-6 py-12 text-center text-slate-500">
                  No student receipts yet. Create your first one!
                </div>
              ) : (
                studentReceipts.map((receipt) => (
                  <div
                    key={receipt.id}
                    className="px-6 py-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-slate-900">{receipt.student_name}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                            {receipt.school_country}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600">
                          {receipt.school_name} • Receipt #{receipt.receipt_number}
                        </p>
                        <p className="text-sm text-slate-500">
                          Term: {receipt.term} • Issued: {new Date(receipt.date_issued).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right mr-4">
                          <p className="text-lg font-semibold text-emerald-600">
                            {receipt.currency} {receipt.total_amount.toFixed(2)}
                          </p>
                          <p className="text-xs text-slate-500">Total Paid</p>
                        </div>
                        <button
                          onClick={() => {
                            setCurrentStudentReceipt(receipt);
                            setView('preview');
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setCurrentStudentReceipt(receipt);
                            setView('create');
                          }}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteStudentReceipt(receipt.id!)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {view === 'create' && mode === 'paystub' && (
          <PaystubForm
            initialData={currentPaystub || undefined}
            onSubmit={handleSavePaystub}
            onCancel={() => setView('list')}
          />
        )}

        {view === 'create' && mode === 'certificate' && (
          <CertificateForm
            initialData={currentCertificate || undefined}
            onSubmit={handleSaveCertificate}
            onCancel={() => setView('list')}
          />
        )}

        {view === 'create' && mode === 'student' && (
          <StudentReceiptForm
            initialData={currentStudentReceipt || undefined}
            onSubmit={handleSaveStudentReceipt}
            onCancel={() => setView('list')}
          />
        )}

        {view === 'preview' && mode === 'paystub' && currentPaystub && (
          <div>
            <div className="flex justify-end mb-4">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
            <div id="document-preview">
              {currentPaystub.template === 'classic' ? (
                <PaystubPreviewClassic paystub={currentPaystub} />
              ) : currentPaystub.template === 'beaverton' ? (
                <PaystubPreviewBeaverton paystub={currentPaystub} />
              ) : (
                <PaystubPreview paystub={currentPaystub} />
              )}
            </div>
          </div>
        )}

        {view === 'preview' && mode === 'certificate' && currentCertificate && (
          <div>
            <div className="flex justify-end mb-4">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
            <div id="document-preview">
              <CertificatePreview certificate={currentCertificate} />
            </div>
          </div>
        )}

        {view === 'preview' && mode === 'student' && currentStudentReceipt && (
          <div>
            <div className="flex justify-end mb-4">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
            <div id="document-preview">
              <StudentReceiptPreview receipt={currentStudentReceipt} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;