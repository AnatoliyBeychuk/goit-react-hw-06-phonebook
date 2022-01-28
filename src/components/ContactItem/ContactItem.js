import PropTypes from "prop-types";
import { Item } from "./ContactItem.styled";

function ContactItem({ contact: { id, name, number }, deleteContact }) {
  return (
    <Item>
      {name}: {number}
      <button type="button" onClick={() => deleteContact(id)}>
        Delete
      </button>
    </Item>
  );
}

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactItem;
