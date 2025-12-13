import { Paystub } from '../lib/supabase';
import PaystubPreviewModern from './PaystubPreviewModern';
import PaystubPreviewClassic from './PaystubPreviewClassic';
import PaystubPreviewBeaverton from './PaystubPreviewBeaverton';
import PaystubPreviewProfessional from './PaystubPreviewProfessional';
import PaystubPreviewCorporate from './PaystubPreviewCorporate';
import PaystubPreviewGovernment from './PaystubPreviewGovernment';
import PaystubPreviewTech from './PaystubPreviewTech';
import PaystubPreviewHealthcare from './PaystubPreviewHealthcare';

interface PaystubPreviewProps {
  paystub: Paystub;
}

export default function PaystubPreview({ paystub }: PaystubPreviewProps) {
  const template = paystub.template || 'modern';

  switch (template) {
    case 'classic':
      return <PaystubPreviewClassic paystub={paystub} />;
    case 'beaverton':
      return <PaystubPreviewBeaverton paystub={paystub} />;
    case 'professional':
      return <PaystubPreviewProfessional paystub={paystub} />;
    case 'corporate':
      return <PaystubPreviewCorporate paystub={paystub} />;
    case 'government':
      return <PaystubPreviewGovernment paystub={paystub} />;
    case 'tech':
      return <PaystubPreviewTech paystub={paystub} />;
    case 'healthcare':
      return <PaystubPreviewHealthcare paystub={paystub} />;
    case 'modern':
    default:
      return <PaystubPreviewModern paystub={paystub} />;
  }
}
