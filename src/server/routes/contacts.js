import express from "express"; // Correct default import
const router = express.Router();

let contacts = [{
  id: 1,
  name: "John Doe",
  phone: "1234567890",
  email: "john.doe@example.com"
},
{
  id: 2,
  name: "Jane Smith",
  phone: "0987654321",
  email: "jane.smith@example.com"
}]; // In-memory data store for demonstration purposes

// Utility functions for contacts array
const ContactsManager = {
  getAll: () => contacts,
  
  getById: (id) => contacts.find((c) => c.id === parseInt(id)),
  
  create: (contactData) => {
    const id = contacts.length + 1;
    const newContact = { id, ...contactData };
    contacts.push(newContact);
    return newContact;
  },
  
  update: (id, updateData) => {
    const contact = contacts.find((c) => c.id === parseInt(id));
    if (!contact) return null;
    Object.assign(contact, updateData);
    return contact;
  },
  
  delete: (id) => {
    const index = contacts.findIndex((c) => c.id === parseInt(id));
    if (index === -1) return false;
    contacts.splice(index, 1);
    return true;
  },
  
  clear: () => {
    contacts = [];
  }
};

// Create
router.post("/", (req, res) => {
  const { name, phone, email } = req.body;
  const contact = ContactsManager.create({ name, phone, email });
  res.status(201).json(contact);
});

// Read All
router.get("/", (req, res) => {
  res.json(ContactsManager.getAll());
});

// Read One
router.get("/:id", (req, res) => {
  const contact = contacts.find((c) => c.id === parseInt(req.params.id));
  if (!contact) return res.status(404).send("Contact not found");
  res.json(contact);
});

// Update
router.put("/:id", (req, res) => {
  const contact = ContactsManager.getById(req.params.id);
  if (!contact) return res.status(404).send("Contact not found");
  res.json(contact);
});

// Delete
router.delete("/:id", (req, res) => {
  const index = ContactsManager.delete(req.params.id);
  if (index === -1) return res.status(404).send("Contact not found");

  contacts.splice(index, 1);
  res.status(204).send();
});

export default router;
