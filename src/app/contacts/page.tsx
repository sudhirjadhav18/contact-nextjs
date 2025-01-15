import { getContacts } from '../api/contacts';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';

export default async function ContactsPage() {
  const contacts = await getContacts();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contacts</h1>
      <ContactForm />
      <ContactList initialContacts={contacts} />
    </div>
  );
}