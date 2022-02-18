const { v4: uuidv4 } = require('uuid');

const contacts = [
  {
    id: uuidv4(),
    name: 'Caio Pratali',
    email: 'caio@pratali.com.br',
    phone: '77777777',
    category_id: uuidv4(),
  },
  {
    id: uuidv4(),
    name: 'Lilian Pratali',
    email: 'lilian@pratali.com.br',
    phone: '77777777',
    category_id: uuidv4(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }

  findById(id) {
    const contact = contacts.find((item) => item.id === id);

    return new Promise((resolve) => resolve(contact));
  }

  findByEmail(email) {
    const contact = contacts.find((item) => item.email === email);

    return new Promise((resolve) => resolve(contact));
  }

  create({
    name,
    email,
    phone,
    category_id,
  }) {
    return new Promise((resolve) => {
      const newContact = {
        id: uuidv4(),
        name,
        email,
        phone,
        category_id,
      };

      contacts.push(newContact);

      resolve(newContact);
    });
  }

  update(id, updateContact) {
    return new Promise((resolve) => {
      const contactIndex = contacts.findIndex((item) => item.id === id);

      const updatedContact = Object.assign(contacts[contactIndex], updateContact);

      resolve(updatedContact);
    });
  }

  delete(id) {
    const contactIndex = contacts.findIndex((item) => item.id === id);

    return new Promise((resolve) => resolve(
      contacts.splice(contactIndex, 1),
    ));
  }
}

module.exports = new ContactsRepository();
