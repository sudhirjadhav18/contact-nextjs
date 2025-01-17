import { Contact } from "@/types/contact";

export async function getContacts() {
  const res = await fetch("http://localhost:5000/api/contacts", {
    cache: "no-store", // Disable caching for real-time data
  });

  if (!res.ok) throw new Error("Failed to fetch contacts");
  return res.json();
}

export async function getContact(id: string) {
  const res = await fetch(`http://localhost:5000/api/contacts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch contact");
  return res.json();
}

export async function deleteContact(id: string) {
  const res = await fetch(`http://localhost:5000/api/contacts/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete contact");
  return true; // Just return success, don't try to parse JSON
}

export async function createContact(contact: Omit<Contact, "id">) {
  const res = await fetch("http://localhost:5000/api/contacts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });

  if (!res.ok) throw new Error("Failed to create contact");
  return res.json();
}

