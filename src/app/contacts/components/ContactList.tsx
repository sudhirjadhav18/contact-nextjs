'use client';

import { useState } from 'react';
import { Contact } from '@/types/contact';
import Link from 'next/link';

interface ContactListProps {
  initialContacts: Contact[];
}

export default function ContactList({ initialContacts }: ContactListProps) {
  const [contacts] = useState<Contact[]>(initialContacts);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Contact List</h2>
      <div className="grid gap-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="border p-4 rounded-lg">
            <h3 className="font-medium">{contact.name}</h3>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
            <Link 
              href={`/contacts/${contact.id}`}
              className="text-blue-500 hover:text-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}