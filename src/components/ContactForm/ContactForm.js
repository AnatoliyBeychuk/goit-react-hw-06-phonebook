import { useState } from "react";
import { Container, Field } from "./ContactForm.styled";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/Contacts/contacts-actions";
import { getContacts } from "../../redux/Contacts/contacts-selectors";

function ContactForm() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleChange = (value, name) => {
    switch (name) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const findDuplicateContact = (array, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return array.some(
      (contact) => contact.name.toLowerCase() === normalizedFilter
    );
  };

  //action
  const onAddContact = () => {
    const filteredArray = findDuplicateContact(contacts, name);
    if (filteredArray) {
      alert(`${name} is already in contacts.`);
      return;
    }
    dispatch(addContact(name, number));
    setName("");
    setNumber("");
  };

  const isInputNameEmpty = !name;
  const isInputNumberEmpty = !number;

  return (
    <Container>
      <Field>
        <label>Name</label>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={(event) => {
            const { value, name } = event.currentTarget;
            handleChange(value, name);
          }}
          value={name}
        />
      </Field>

      <Field>
        <label>Number</label>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={(event) => {
            const { value, name } = event.currentTarget;
            handleChange(value, name);
          }}
          value={number}
        />
      </Field>

      <button
        type="button"
        name="add"
        onClick={() => onAddContact()}
        disabled={isInputNameEmpty || isInputNumberEmpty}
      >
        Add contact
      </button>
    </Container>
  );
}

export default ContactForm;
