import { useSelector } from "react-redux";
import { getFilter } from "../../redux/Contacts/contacts-selectors";
import { Field } from "./Filter.styled";
import { changeFilter } from "../../redux/Contacts/contacts-actions";
import { useDispatch } from "react-redux";

function Filter() {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  return (
    <Field>
      <span>Find contacts by name</span>
      <input
        type="search"
        name="filter"
        onChange={(event) => {
          const { value } = event.currentTarget;
          dispatch(changeFilter(value));
        }}
        value={filter}
      />
    </Field>
  );
}

export default Filter;
