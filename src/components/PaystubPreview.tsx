import { Paystub } from '../lib/supabase';
import PaystubPreviewModern from './PaystubPreviewModern';
import PaystubPreviewClassic from './PaystubPreviewClassic';
import PaystubPreviewBeaverton from './PaystubPreviewBeaverton';
import PaystubPreviewProfessional from './PaystubPreviewProfessional';
import PaystubPreviewCorporate from './PaystubPreviewCorporate';
import PaystubPreviewGovernment from './PaystubPreviewGovernment';
import PaystubPreviewTech from './PaystubPreviewTech';
import PaystubPreviewHealthcare from './PaystubPreviewHealthcare';
import PaystubPreviewMinimalist from './PaystubPreviewMinimalist';
import PaystubPreviewExecutive from './PaystubPreviewExecutive';
import PaystubPreviewRetail from './PaystubPreviewRetail';
import PaystubPreviewCreative from './PaystubPreviewCreative';
import PaystubPreviewFinancial from './PaystubPreviewFinancial';
import PaystubPreviewIndustrial from './PaystubPreviewIndustrial';
import PaystubPreviewNonprofit from './PaystubPreviewNonprofit';

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
    case 'minimalist':
      return <PaystubPreviewMinimalist paystub={paystub} />;
    case 'executive':
      return <PaystubPreviewExecutive paystub={paystub} />;
    case 'retail':
      return <PaystubPreviewRetail paystub={paystub} />;
    case 'creative':
      return <PaystubPreviewCreative paystub={paystub} />;
    case 'financial':
      return <PaystubPreviewFinancial paystub={paystub} />;
    case 'industrial':
      return <PaystubPreviewIndustrial paystub={paystub} />;
    case 'nonprofit':
      return <PaystubPreviewNonprofit paystub={paystub} />;
    case 'modern':
    default:
      return <PaystubPreviewModern paystub={paystub} />;
  }
}
