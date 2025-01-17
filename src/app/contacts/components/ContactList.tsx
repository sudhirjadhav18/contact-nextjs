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

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Access
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr
                key={contact.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {contact.name}
                </th>
                <td className="px-6 py-4">{contact.phone}</td>
                <td className="px-6 py-4">{contact.email}</td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4 text-right">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() =>
                      setSelectedContact({
                        isOpen: true,
                        contactId: contact.id,
                      })
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
