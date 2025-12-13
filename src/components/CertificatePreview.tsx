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
      <div className="border-8 border-double border-slate-800 p-12 relative">
        <div className="absolute top-8 right-8 bg-slate-100 border-4 border-slate-300 rounded-full p-4 shadow-lg">
          <div className="w-16 h-16 flex items-center justify-center">
            <svg className="w-12 h-12 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">{certificate.university_name.toUpperCase()}</h1>
          <p className="text-xl text-slate-700 font-semibold">{certificate.school_department}</p>
        </div>

        <div className="text-center mb-10 bg-gradient-to-r from-red-600 via-red-700 to-red-600 text-white py-4 px-6 rounded-lg shadow-lg">
          <h2 className="text-4xl font-extrabold tracking-wide uppercase drop-shadow-md">
            {certificate.certificate_type}
          </h2>
          <p className="text-sm font-semibold mt-2 text-red-100 uppercase tracking-widest">Official Certification Document</p>
        </div>

        <div className="text-center mb-8">
          <p className="text-base italic text-slate-600 mb-4 font-medium">This is to certify that</p>
          <div className="bg-blue-50 border-l-4 border-r-4 border-blue-600 py-4 px-6 mb-6 mx-auto rounded-lg shadow-md" style={{ maxWidth: '500px' }}>
            <p className="text-xs text-blue-700 font-bold uppercase tracking-wider mb-2">Certificate Holder</p>
            <h3 className="text-3xl font-extrabold text-slate-900 leading-tight">{certificate.recipient_name}</h3>
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
          <div className="bg-green-50 border-l-4 border-green-600 py-3 px-6 mx-auto rounded-r-lg shadow-sm inline-block">
            <p className="text-xs text-green-700 font-bold uppercase tracking-wider mb-1">Date of Certification</p>
            <p className="text-lg font-extrabold text-slate-900">{formatDate(certificate.issue_date)}</p>
          </div>
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

        <div className="text-center mt-8 bg-slate-100 py-4 px-6 rounded-lg border border-slate-300">
          <p className="text-xs text-slate-600 font-bold uppercase tracking-wider mb-1">
            Official Certificate Number
          </p>
          <p className="text-base font-extrabold text-slate-900 font-mono tracking-wide">
            {certificate.certificate_number}
          </p>
          <p className="text-xs text-slate-500 italic mt-2">
            This is an official certification document issued by {certificate.university_name}
          </p>
        </div>
      </div>
    </div>
  );
}
