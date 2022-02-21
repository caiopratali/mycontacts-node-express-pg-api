const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;

    const contacts = await ContactsRepository.findAll(orderBy);

    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) return response.status(404).json({ error: 'Contact not found' });

    response.json(contact);
  }

  async store(request, response) {
    const {
      name,
      email,
      phone,
      category_id,
    } = request.body;

    if (!name || !email) return response.status(400).json({ error: 'Name and email is required!' });

    const contactAlreadyExists = await ContactsRepository.findByEmail(email);

    if (contactAlreadyExists) return response.status(400).json({ error: 'Contact already exists' });

    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    response.status(201).json(contact);
  }

  async update(request, response) {
    const { id } = request.params;

    const {
      name,
      email,
      phone,
      category_id,
    } = request.body;

    if (email) {
      const contactAlreadyExists = await ContactsRepository.findByEmail(email);

      if (contactAlreadyExists) return response.status(400).json({ error: 'Contact already exists' });
    }

    const contact = await ContactsRepository.findById(id);

    if (!contact) return response.status(404).json({ error: 'Contact not found' });

    const updateContact = {
      name: name || contact.name,
      email: email || contact.email,
      phone: phone || contact.phone,
      category_id: category_id || contact.category_id,
    };

    const updatedContact = await ContactsRepository.update(id, updateContact);

    response.json(updatedContact);
  }

  async delete(request, response) {
    const { id } = request.params;

    await ContactsRepository.delete(id);

    response.sendStatus(204);
  }
}

// Singleton
module.exports = new ContactController();
