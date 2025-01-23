"use client";

import { useState, useEffect } from "react";
import { createContact, getContact } from "@/app/api/contacts";

interface ContactFormProps {
  contactId?: number;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function ContactForm({
  contactId,
  onSubmit,
  onCancel,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    async function loadContact() {
      if (contactId) {
        try {
          const contact = await getContact(contactId.toString());
          setFormData({
            name: contact.name,
            phone: contact.phone,
            email: contact.email,
          });
        } catch (error) {
          console.error("Error loading contact:", error);
          onCancel();
        }
      }
    }
    loadContact();
  }, [contactId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (contactId) {
        await fetch(`http://localhost:5000/api/contacts/${contactId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        await createContact(formData);
      }
      onSubmit();
    } catch (error) {
      console.error(error);
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4">
        {contactId ? "Edit Contact" : "Add Contact"}
      </h2>
      <div>
        <label className="block mb-1">Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Phone:</label>
        <input
          type="text"
          value={formData.phone}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, phone: e.target.value }))
          }
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Access
          </span>
        </label>
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          {contactId ? "Save Changes" : "Add Contact"}
        </button>
      </div>
    </form>
  );
}
