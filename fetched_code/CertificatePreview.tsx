import { Certificate } from '../lib/supabase';
import { generateSignatureStyle } from '../lib/signatureGenerator';

interface CertificatePreviewProps {
  certificate: Certificate;
}

export default function CertificatePreview({ certificate }: CertificatePreviewProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  return (
    <div className="bg-white shadow-2xl p-16 max-w-4xl mx-auto" style={{ fontFamily: 'Georgia, serif' }}>
      <div className="border-8 border-double border-slate-800 p-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{certificate.university_name}</h1>
          <p className="text-lg text-slate-700">{certificate.school_department}</p>
        </div>

        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-red-600 tracking-wide uppercase">
            {certificate.certificate_type}
          </h2>
        </div>

        <div className="text-center mb-8">
          <p className="text-sm italic text-slate-600 mb-4">This is to certify that</p>
          <div className="border-b-2 border-slate-800 pb-2 mb-6 mx-auto" style={{ maxWidth: '400px' }}>
            <h3 className="text-3xl font-bold text-slate-900">{certificate.recipient_name}</h3>
          </div>
        </div>

        <div className="text-center mb-8 px-8">
          <p className="text-base leading-relaxed text-slate-700">
            {certificate.description} at {certificate.university_name}.
          </p>
        </div>

        <div className="mb-8 px-8">
          <div className="mb-4">
            <p className="text-sm font-semibold text-slate-800 mb-2">Areas of Specialization:</p>
            <ul className="list-none space-y-1 ml-4">
              {certificate.specializations.map((spec, index) => (
                <li key={index} className="text-sm text-slate-700">• {spec}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm text-slate-700">
              <span className="font-semibold">Position:</span> {certificate.position_title}
            </p>
          </div>
        </div>

        <div className="mb-8 text-center">
          <p className="text-sm text-slate-700">
            This certification is granted in accordance with the standards of {certificate.university_name}.
          </p>
        </div>

        <div className="mb-6 text-center">
          <p className="text-sm font-semibold text-slate-800">
            Date of Certification: <span className="font-normal">{formatDate(certificate.issue_date)}</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-12">
          <div className="text-center">
            <div className="border-t-2 border-slate-400 pt-2 mb-1 mx-auto" style={{ maxWidth: '200px' }}>
              <p style={generateSignatureStyle(certificate.dean_name)} className="mb-1">
                {certificate.dean_name}
              </p>
            </div>
            <p className="text-xs font-semibold text-slate-800">{certificate.dean_name}</p>
            <p className="text-xs text-slate-600">{certificate.dean_title}</p>
          </div>

          <div className="text-center">
            <div className="border-t-2 border-slate-400 pt-2 mb-1 mx-auto" style={{ maxWidth: '200px' }}>
              <p style={generateSignatureStyle(certificate.principal_name)} className="mb-1">
                {certificate.principal_name}
              </p>
            </div>
            <p className="text-xs font-semibold text-slate-800">{certificate.principal_name}</p>
            <p className="text-xs text-slate-600">{certificate.principal_title}</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-slate-500">
            Certificate No: {certificate.certificate_number}
          </p>
        </div>
      </div>
    </div>
  );
}
