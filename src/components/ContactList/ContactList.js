import { createSelector } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import ContactItem from "../ContactItem/ContactItem";
import {
  getContacts,
  getFilter,
} from "../../redux/Contacts/contacts-selectors";
import { deleteContact } from "../../redux/Contacts/contacts-actions";
import { useSelector } from "react-redux";

function ContactList() {
  const dispatch = useDispatch();

  const getFilteredArray = createSelector(
    [getContacts, getFilter],
    (contacts, filter) => {
      const normalizedFilter = filter.toLowerCase();
      return contacts.filter((contact) =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
    }
  );

  const filteredArray = useSelector(getFilteredArray);

  const onDeleteContact = (id) => dispatch(deleteContact(id));

  return (
    <ul>
      {filteredArray.map((contact) => {
        return (
          <ContactItem
            key={contact.id}
            contact={contact}
            deleteContact={onDeleteContact}
          />
        );
      })}
    </ul>
  );
}

export default ContactList;
