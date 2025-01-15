'use client';

import { Contact } from '@/types/contact';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ContactDetailProps {
  contact: Contact;
}

export default function ContactDetail({ contact: initialContact }: ContactDetailProps) {
  const router = useRouter();
  const [contact, setContact] = useState(initialContact);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialContact);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:5000/api/contacts/${contact.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update contact');
      
      const updatedContact = await response.json();
      setContact(updatedContact);
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Contact Details</h2>
      
      {isEditing ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block mb-1">Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Phone:</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="space-x-2">
            <button 
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button 
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <p><strong>Name:</strong> {contact.name}</p>
          <p><strong>Email:</strong> {contact.email}</p>
          <p><strong>Phone:</strong> {contact.phone}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Contact
          </button>
        </div>
      )}
    </div>
  );
}