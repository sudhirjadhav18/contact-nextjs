import ContactList from "@/app/contacts/components/ContactList";
import { getContacts } from "@/app/api/contacts";


export default async function ContactsPage() {
  const initialContacts = await getContacts();
  
  return (
    <main className="max-w-4xl mx-auto">
      <ContactList initialContacts={initialContacts} />
    </main>
  );
}