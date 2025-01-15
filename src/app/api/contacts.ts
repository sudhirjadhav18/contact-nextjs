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
