import express from "express"; // Correct default import
const router = express.Router();

let contacts = []; // In-memory data store for demonstration purposes

// Create
router.post("/", (req, res) => {
  const { name, phone, email } = req.body;
  const id = contacts.length + 1;
  const contact = { id, name, phone, email };
  contacts.push(contact);
  res.status(201).json(contact);
});

// Read All
router.get("/", (req, res) => {
  res.json(contacts);
});

// Read One
router.get("/:id", (req, res) => {
  const contact = contacts.find((c) => c.id === parseInt(req.params.id));
  if (!contact) return res.status(404).send("Contact not found");
  res.json(contact);
});

// Update
router.put("/:id", (req, res) => {
  const contact = contacts.find((c) => c.id === parseInt(req.params.id));
  if (!contact) return res.status(404).send("Contact not found");

  const { name, phone, email } = req.body;
  contact.name = name;
  contact.phone = phone;
  contact.email = email;

  res.json(contact);
});

// Delete
router.delete("/:id", (req, res) => {
  const index = contacts.findIndex((c) => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Contact not found");

  contacts.splice(index, 1);
  res.status(204).send();
});

export default router;
