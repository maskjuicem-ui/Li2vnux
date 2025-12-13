import { StudentReceipt } from '../lib/supabase';
import StudentReceiptPreviewAcademic from './StudentReceiptPreviewAcademic';
import StudentReceiptPreviewModern from './StudentReceiptPreviewModern';
import StudentReceiptPreviewPremium from './StudentReceiptPreviewPremium';
import StudentReceiptPreviewCorporate from './StudentReceiptPreviewCorporate';
import StudentReceiptPreviewMinimalist from './StudentReceiptPreviewMinimalist';
import StudentReceiptPreviewColorful from './StudentReceiptPreviewColorful';

interface StudentReceiptPreviewProps {
  receipt: StudentReceipt;
}

export default function StudentReceiptPreview({ receipt }: StudentReceiptPreviewProps) {
  const template = receipt.template || 'academic';

  switch (template) {
    case 'modern':
      return <StudentReceiptPreviewModern receipt={receipt} />;
    case 'premium':
      return <StudentReceiptPreviewPremium receipt={receipt} />;
    case 'corporate':
      return <StudentReceiptPreviewCorporate receipt={receipt} />;
    case 'minimalist':
      return <StudentReceiptPreviewMinimalist receipt={receipt} />;
    case 'colorful':
      return <StudentReceiptPreviewColorful receipt={receipt} />;
    case 'academic':
    default:
      return <StudentReceiptPreviewAcademic receipt={receipt} />;
  }
}
