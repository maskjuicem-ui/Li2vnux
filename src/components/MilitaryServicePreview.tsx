import { MilitaryServiceRecord } from '../lib/supabase';

interface MilitaryServicePreviewProps {
  record: MilitaryServiceRecord;
}

export default function MilitaryServicePreview({ record }: MilitaryServicePreviewProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="bg-white p-12 max-w-4xl mx-auto shadow-2xl" style={{ fontFamily: 'Times New Roman, serif' }}>
      <div className="border-8 border-double border-blue-900 p-8">
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-blue-900 mb-2">DEPARTMENT OF DEFENSE</div>
          <div className="text-xl font-semibold text-gray-700 mb-4">United States of America</div>
          <div className="text-2xl font-bold text-blue-900 mb-6 border-t-2 border-b-2 border-blue-900 py-3">
            MILITARY SERVICE VERIFICATION
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-blue-50 border-l-4 border-blue-900 p-4 mb-6">
            <div className="text-sm font-semibold text-blue-900 mb-1">DOCUMENT NUMBER</div>
            <div className="text-lg font-bold text-gray-800">{record.document_number}</div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-1">ISSUE DATE</div>
              <div className="text-sm font-medium text-gray-800">{formatDate(record.issue_date)}</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-1">EXPIRATION DATE</div>
              <div className="text-sm font-medium text-gray-800">{formatDate(record.expiration_date)}</div>
            </div>
          </div>
        </div>

        <div className="mb-8 pb-6 border-b-2 border-gray-300">
          <div className="text-lg font-bold text-blue-900 mb-4 uppercase">Service Member Information</div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-3">
              <div className="text-xs font-semibold text-gray-600 mb-1">FULL NAME</div>
              <div className="text-base font-bold text-gray-800 uppercase">{record.service_member_name}</div>
            </div>
            <div className="mb-3">
              <div className="text-xs font-semibold text-gray-600 mb-1">SERVICE NUMBER</div>
              <div className="text-base font-medium text-gray-800">{record.service_number}</div>
            </div>
            <div className="mb-3">
              <div className="text-xs font-semibold text-gray-600 mb-1">DATE OF BIRTH</div>
              <div className="text-base font-medium text-gray-800">{formatDate(record.date_of_birth)}</div>
            </div>
            <div className="mb-3">
              <div className="text-xs font-semibold text-gray-600 mb-1">SERVICE BRANCH</div>
              <div className="text-base font-bold text-blue-900">{record.service_branch}</div>
            </div>
            <div className="mb-3">
              <div className="text-xs font-semibold text-gray-600 mb-1">RANK/GRADE</div>
              <div className="text-base font-bold text-gray-800">{record.rank}</div>
            </div>
            <div className="mb-3">
              <div className="text-xs font-semibold text-gray-600 mb-1">SERVICE STATUS</div>
              <div className="text-base font-bold text-green-700">{record.status}</div>
            </div>
            <div className="mb-3">
              <div className="text-xs font-semibold text-gray-600 mb-1">DOCUMENT TYPE</div>
              <div className="text-base font-bold text-gray-800">{record.document_type}</div>
            </div>
            <div className="mb-3">
              <div className="text-xs font-semibold text-gray-600 mb-1">DOCUMENT SUBTYPE</div>
              <div className="text-base font-bold text-gray-800">{record.document_subtype}</div>
            </div>
          </div>
        </div>

        <div className="mb-8 pb-6 border-b-2 border-gray-300">
          <div className="text-lg font-bold text-blue-900 mb-4 uppercase">Service Dates</div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-1">DATE OF ENTRY</div>
              <div className="text-base font-medium text-gray-800">{formatDate(record.date_of_entry)}</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-1">DATE OF SEPARATION</div>
              <div className="text-base font-medium text-gray-800">{formatDate(record.date_of_separation)}</div>
            </div>
          </div>
        </div>

        {(record.home_address || record.home_city || record.home_state) && (
          <div className="mb-8 pb-6 border-b-2 border-gray-300">
            <div className="text-lg font-bold text-blue-900 mb-4 uppercase">Contact Information</div>

            <div className="grid grid-cols-1 gap-2">
              {record.home_address && (
                <div>
                  <div className="text-xs font-semibold text-gray-600 mb-1">HOME ADDRESS</div>
                  <div className="text-sm font-medium text-gray-800">{record.home_address}</div>
                </div>
              )}
              <div className="grid grid-cols-3 gap-4">
                {record.home_city && (
                  <div>
                    <div className="text-xs font-semibold text-gray-600 mb-1">CITY</div>
                    <div className="text-sm font-medium text-gray-800">{record.home_city}</div>
                  </div>
                )}
                {record.home_state && (
                  <div>
                    <div className="text-xs font-semibold text-gray-600 mb-1">STATE</div>
                    <div className="text-sm font-medium text-gray-800">{record.home_state}</div>
                  </div>
                )}
                {record.home_postal_code && (
                  <div>
                    <div className="text-xs font-semibold text-gray-600 mb-1">ZIP CODE</div>
                    <div className="text-sm font-medium text-gray-800">{record.home_postal_code}</div>
                  </div>
                )}
              </div>
              {record.phone && (
                <div>
                  <div className="text-xs font-semibold text-gray-600 mb-1">PHONE</div>
                  <div className="text-sm font-medium text-gray-800">{record.phone}</div>
                </div>
              )}
              {record.email && (
                <div>
                  <div className="text-xs font-semibold text-gray-600 mb-1">EMAIL</div>
                  <div className="text-sm font-medium text-gray-800">{record.email}</div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4">
            <div className="text-xs font-bold text-yellow-900 mb-2">VERIFICATION STATEMENT</div>
            <div className="text-xs text-gray-700 leading-relaxed">
              This document certifies that the above-named individual is a member of the {record.service_branch} and
              {record.status === 'Active - Final 12 Months'
                ? ' is currently within their final 12 months of military service.'
                : ' has separated from military service within the past 12 months.'}
              This verification is issued for employment, educational, or benefit eligibility purposes and is valid
              until {formatDate(record.expiration_date)}.
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t-2 border-gray-300">
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-2">ISSUING AUTHORITY</div>
              <div className="text-sm font-bold text-gray-800">{record.issuing_authority}</div>
            </div>
            <div className="text-right">
              <div className="w-48 border-t-2 border-gray-800 pt-2">
                <div className="text-xs font-semibold text-gray-600">AUTHORIZED SIGNATURE</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="text-xs text-gray-500 italic">
            This document contains official U.S. Government information and should be treated as confidential.
          </div>
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-gray-400">
        Document ID: {record.document_number} | Issued: {formatDate(record.issue_date)}
      </div>
    </div>
  );
}
