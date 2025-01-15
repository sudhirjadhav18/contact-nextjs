import { getContact } from '@/app/api/contacts';
import ContactDetail from './components/ContactDetail';

export default async function ContactDetailPage({ params }: { params: { id: string } }) {
  const contact = await getContact(params.id);
  
  return <ContactDetail contact={contact} />;
}