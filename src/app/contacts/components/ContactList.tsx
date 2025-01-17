"use client";

import { useState } from "react";
import { Contact } from "@/types/contact";
import {
  deleteContact as deleteContactApi,
  getContacts,
  getContact,
} from "@/app/api/contacts";
import Dialog from "@/app/contacts/components/Dialog";
import ContactForm from "@/app/contacts/components/ContactForm";

interface ContactListProps {
  initialContacts: Contact[];
}

export default function ContactList({ initialContacts }: ContactListProps) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [selectedContact, setSelectedContact] = useState<{
    isOpen: boolean;
    contactId?: number;
  }>({
    isOpen: false,
    contactId: undefined,
  });

  async function deleteContact(id: number) {
    await deleteContactApi(id.toString());
    const updatedContacts = await getContacts();
    setContacts(updatedContacts);
  }

  async function handleSubmit() {
    setSelectedContact({ isOpen: false, contactId: undefined });
    const updatedContacts = await getContacts();
    setContacts(updatedContacts);
  }

  return (
    <div className="mt-6">
      <button
        className="text-blue-500 hover:text-blue-700 mr-4"
        onClick={() => setSelectedContact({ isOpen: true })}
      >
        Add Contact
      </button>

      <div className="grid gap-4 mt-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="border p-4 rounded-lg">
            <h3 className="font-medium">{contact.name}</h3>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
            <div className="mt-2 space-x-4">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() =>
                  setSelectedContact({ isOpen: true, contactId: contact.id })
                }
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => deleteContact(contact.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedContact.isOpen && (
        <Dialog
          isOpen={selectedContact.isOpen}
          onClose={() =>
            setSelectedContact({ isOpen: false, contactId: undefined })
          }
        >
          <ContactForm
            contactId={selectedContact.contactId}
            onSubmit={handleSubmit}
            onCancel={() =>
              setSelectedContact({ isOpen: false, contactId: undefined })
            }
          />
        </Dialog>
      )}
    </div>
  );
}
